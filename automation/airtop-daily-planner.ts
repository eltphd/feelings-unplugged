export async function main(wf: IWorkflow) {
  const params = await wf.getAutomationParameters();
  const session = await wf.getAirtopSession();
  const window = await wf.getAirtopWindow();

  const {
    priorityContacts,
    commandCenterUrl,
    weeklyPrioritiesDatabaseUrl,
    includeWorkOpportunities = true,
    minimumMeetingBuffer = 5,
    deepWorkBlockMinutes = 120,
    maxQuickWinTasks = 5,
  } = params;

  await wf.log({ label: 'INIT', message: 'Daily Context Architect starting', withData: { priorityContacts } });

  try {
    // STEP 1: Get today's date and format it
    const today = new Date();
    const dayOfWeek = today.toLocaleDateString('en-US', { weekday: 'long' });
    const monthDate = today.toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
    const dateStr = `${dayOfWeek}, ${monthDate}`;
    await wf.log({ label: 'Date', message: `Today is ${dateStr}` });

    // STEP 2: Extract calendar events
    await wf.log({ label: 'Calendar', message: 'Extracting calendar events from Google Calendar' });
    const calendarResponse = await session.service({
      services: ['google-calendar'],
      prompt: `Get all calendar events for today's date (${dateStr}). Return the event title, start time, end time, duration in minutes, and list of attendee email addresses for each event.`,
      outputSchema: {
        $schema: 'http://json-schema.org/draft-07/schema#',
        type: 'object',
        additionalProperties: false,
        properties: {
          events: {
            type: 'array',
            items: {
              type: 'object',
              additionalProperties: false,
              properties: {
                title: { type: 'string' },
                startTime: { type: 'string' },
                endTime: { type: 'string' },
                durationMinutes: { type: 'number' },
                attendees: {
                  type: 'array',
                  items: { type: 'string' },
                },
              },
              required: ['title', 'startTime', 'endTime', 'durationMinutes', 'attendees'],
            },
          },
        },
        required: ['events'],
      },
    });

    const calendarData = JSON.parse(calendarResponse.data.response);
    const events = calendarData.events || [];
    await wf.log({ label: 'Calendar', message: `Found ${events.length} events`, withData: { events } });

    // STEP 3: Analyze calendar for gaps and back-to-back meetings
    const processedEvents = processCalendarEvents(events, minimumMeetingBuffer, deepWorkBlockMinutes);
    await wf.log({ label: 'Analysis', message: 'Calendar analysis complete', withData: { processedEvents } });

    // STEP 4: Extract unread emails from Gmail
    await wf.log({ label: 'Gmail', message: 'Navigating to Gmail inbox' });
    await window.loadUrl('https://mail.google.com/mail/u/0/#inbox');
    await window.waitForPage();

    // Check if user is signed in to Gmail
    await wf.log({ label: 'Gmail', message: 'Verifying Gmail sign-in status' });
    const signInCheckResponse = await window.pageQuery(
      'Is the user currently signed in to Gmail? Look for user name, profile picture, logout button, or inbox interface.',
      {
        configuration: {
          outputSchema: {
            $schema: 'http://json-schema.org/draft-07/schema#',
            type: 'object',
            additionalProperties: false,
            properties: {
              isSignedIn: { type: 'boolean' },
              indicators: { type: 'string' },
            },
            required: ['isSignedIn'],
          },
        },
      }
    );
    const signInResult = JSON.parse(signInCheckResponse.data.modelResponse);

    if (!signInResult.isSignedIn) {
      await wf.log({ label: 'Gmail', message: 'User is not signed in to Gmail', level: 'error' });
      wf.halt({
        status: 'login-required',
        resultMessage: 'You are not signed in to Gmail. Please sign in to your Gmail account before running this automation.',
      });
      return;
    }

    const unreadEmails = await extractUnreadEmails(
      window,
      wf,
      priorityContacts,
      includeWorkOpportunities
    );
    await wf.log({ label: 'Gmail', message: `Found ${unreadEmails.length} unread emails from priority contacts`, withData: { unreadEmails } });

    // STEP 5: Extract tasks from Notion
    await wf.log({ label: 'Notion', message: 'Navigating to Notion Weekly Priorities database' });
    await window.loadUrl(weeklyPrioritiesDatabaseUrl);
    await window.waitForPage();

    // Check if user is signed in to Notion
    await wf.log({ label: 'Notion', message: 'Verifying Notion sign-in status' });
    const notionSignInCheckResponse = await window.pageQuery(
      'Is the user currently signed in to Notion? Look for the database interface, user profile, or any sign-in prompts.',
      {
        configuration: {
          outputSchema: {
            $schema: 'http://json-schema.org/draft-07/schema#',
            type: 'object',
            additionalProperties: false,
            properties: {
              isSignedIn: { type: 'boolean' },
              indicators: { type: 'string' },
            },
            required: ['isSignedIn'],
          },
        },
      }
    );
    const notionSignInResult = JSON.parse(notionSignInCheckResponse.data.modelResponse);

    if (!notionSignInResult.isSignedIn) {
      await wf.log({ label: 'Notion', message: 'User is not signed in to Notion', level: 'error' });
      wf.halt({
        status: 'login-required',
        resultMessage: 'You are not signed in to Notion. Please sign in to your Notion account before running this automation.',
      });
      return;
    }

    const allTasks = await extractAllNotionTasks(window, wf);
    await wf.log({ label: 'Notion', message: `Extracted ${allTasks.length} tasks from Notion`, withData: { tasksCount: allTasks.length } });

    // STEP 6: Score and prioritize tasks
    const scoredTasks = scoreTasks(allTasks, today);
    const mustDoTasks = scoredTasks.slice(0, 3);
    const quickWinTasks = scoredTasks.slice(3).filter(t => t.priority === 'Medium').slice(0, maxQuickWinTasks);
    const waitTasks = scoredTasks.slice(3).filter(t => t.priority !== 'Medium').slice(0, 5);

    await wf.log({ label: 'Prioritize', message: 'Tasks prioritized', withData: { mustDoTasks, quickWinTasks, waitTasks } });

    // STEP 7: Create daily plan page in Notion
    await wf.log({ label: 'Notion', message: 'Creating daily plan page in Command Center' });
    await window.loadUrl(commandCenterUrl);
    await window.waitForPage();

    const pageTitle = `Daily Plan - ${dateStr}`;
    await createDailyPlanPage(
      window,
      wf,
      pageTitle,
      dateStr,
      mustDoTasks,
      processedEvents,
      quickWinTasks,
      waitTasks
    );

    await wf.log({ label: 'Notion', message: 'Daily plan page created and populated', withData: { pageTitle } });

    // STEP 8: Summary and completion
    const summary = {
      date: dateStr,
      calendarEvents: events.length,
      unreadEmails: unreadEmails.length,
      totalTasks: allTasks.length,
      mustDoTasks: mustDoTasks.length,
      quickWins: quickWinTasks.length,
      status: 'complete',
    };

    await wf.log({ label: 'Complete', message: 'Daily Context Architect completed successfully', withData: summary });

    wf.halt({
      status: 'success',
      resultMessage: `Daily plan created for ${dateStr}. ${events.length} calendar events, ${unreadEmails.length} priority emails, and 3 must-do tasks identified.`,
      resultData: JSON.stringify(summary),
    });
  } catch (error) {
    await wf.log({ label: 'Error', message: 'Automation failed', level: 'error', withError: error });
    wf.halt({
      status: 'failure',
      resultMessage: `Error creating daily plan: ${error instanceof Error ? error.message : String(error)}`,
    });
  }
}

// Helper function: Process calendar events to identify gaps and back-to-back meetings
function processCalendarEvents(
  events: any[],
  minimumBuffer: number,
  deepWorkMinutes: number
): any[] {
  // Sort events by start time first
  const sortedEvents = [...events].sort((a, b) => {
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime();
  });

  const processedEvents = sortedEvents.map((event: any) => ({
    ...event,
    isBackToBack: false,
    hasDeepWorkAfter: false,
  }));

  for (let i = 0; i < processedEvents.length - 1; i++) {
    const currentEnd = new Date(processedEvents[i].endTime).getTime();
    const nextStart = new Date(processedEvents[i + 1].startTime).getTime();
    const gapMinutes = (nextStart - currentEnd) / (1000 * 60);

    if (gapMinutes < minimumBuffer) {
      processedEvents[i].isBackToBack = true;
      processedEvents[i + 1].isBackToBack = true;
    }

    if (gapMinutes >= deepWorkMinutes) {
      processedEvents[i].hasDeepWorkAfter = true;
    }
  }

  return processedEvents;
}

// Helper function: Extract unread emails from Gmail
async function extractUnreadEmails(
  window: any,
  wf: IWorkflow,
  priorityContacts: string[],
  includeWorkOpportunities: boolean
): Promise<any[]> {
  const allEmails: any[] = [];

  // Search for each priority contact
  for (const contact of priorityContacts) {
    try {
      await wf.log({ label: 'Gmail Search', message: `Searching for unread emails from ${contact}` });

      // Navigate back to inbox before each search
      await window.loadUrl('https://mail.google.com/mail/u/0/#inbox');
      await window.waitForPage();

      // Click search field
      await window.click('the search mail field at the top');
      await window.waitForPage();

      // Type search query
      const searchQuery = `from:${contact} is:unread`;
      await window.type(searchQuery, { clearInputField: true });
      await window.waitForPage();

      // **FIX: Press Enter to execute the search**
      await window.press('Enter');
      await window.waitForPage();

      // Wait a moment for search results to load
      await new Promise(resolve => setTimeout(resolve, 1500));

      const emailResponse = await window.pageQuery(
        'Look at the email inbox list. Extract information about unread emails (those with a bold sender name). For each unread email, provide: sender name, email address if visible, subject line, and time received.',
        {
          configuration: {
            outputSchema: {
              $schema: 'http://json-schema.org/draft-07/schema#',
              type: 'object',
              additionalProperties: false,
              properties: {
                unreadEmails: {
                  type: 'array',
                  items: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                      senderName: { type: 'string' },
                      senderEmail: { type: 'string' },
                      subject: { type: 'string' },
                      timeReceived: { type: 'string' },
                    },
                    required: ['senderName', 'senderEmail', 'subject', 'timeReceived'],
                  },
                },
              },
              required: ['unreadEmails'],
            },
          },
        }
      );

      const emailData = JSON.parse(emailResponse.data.modelResponse);
      allEmails.push(...(emailData.unreadEmails || []));
    } catch (error) {
      await wf.log({
        label: 'Gmail Error',
        message: `Failed to search for emails from ${contact}`,
        level: 'warn',
        withError: error,
      });
    }
  }

  // Search for work opportunities if enabled
  if (includeWorkOpportunities) {
    try {
      await wf.log({ label: 'Gmail Search', message: 'Searching for unread work/business opportunity emails' });

      // Navigate back to inbox
      await window.loadUrl('https://mail.google.com/mail/u/0/#inbox');
      await window.waitForPage();

      // Click search field
      await window.click('the search mail field at the top');
      await window.waitForPage();

      // Type search query
      const searchQuery = 'is:unread (subject:work OR subject:business OR subject:opportunity)';
      await window.type(searchQuery, { clearInputField: true });
      await window.waitForPage();

      // **FIX: Press Enter to execute the search**
      await window.press('Enter');
      await window.waitForPage();

      // Wait for search results
      await new Promise(resolve => setTimeout(resolve, 1500));

      const emailResponse = await window.pageQuery(
        'Look at the email inbox list. Extract information about unread emails related to work or business. For each unread email, provide: sender name, email address if visible, subject line, and time received.',
        {
          configuration: {
            outputSchema: {
              $schema: 'http://json-schema.org/draft-07/schema#',
              type: 'object',
              additionalProperties: false,
              properties: {
                unreadEmails: {
                  type: 'array',
                  items: {
                    type: 'object',
                    additionalProperties: false,
                    properties: {
                      senderName: { type: 'string' },
                      senderEmail: { type: 'string' },
                      subject: { type: 'string' },
                      timeReceived: { type: 'string' },
                    },
                    required: ['senderName', 'senderEmail', 'subject', 'timeReceived'],
                  },
                },
              },
              required: ['unreadEmails'],
            },
          },
        }
      );

      const emailData = JSON.parse(emailResponse.data.modelResponse);
      allEmails.push(...(emailData.unreadEmails || []));
    } catch (error) {
      await wf.log({
        label: 'Gmail Error',
        message: 'Failed to search for work/business opportunity emails',
        level: 'warn',
        withError: error,
      });
    }
  }

  return allEmails;
}

// Helper function: Extract all tasks from Notion
async function extractAllNotionTasks(window: any, wf: IWorkflow): Promise<any[]> {
  try {
    await wf.log({ label: 'Extract', message: 'Querying Notion database for all tasks' });

    const taskResponse = await window.pageQuery(
      'Extract all tasks from this Notion database. For each task, provide the task name, due date, priority level, and status. Include all rows in the table, even if the table appears empty.',
      {
        configuration: {
          outputSchema: {
            $schema: 'http://json-schema.org/draft-07/schema#',
            type: 'object',
            additionalProperties: false,
            properties: {
              tasks: {
                type: 'array',
                items: {
                  type: 'object',
                  additionalProperties: false,
                  properties: {
                    taskName: { type: 'string' },
                    dueDate: { type: 'string' },
                    priority: { type: 'string' },
                    status: { type: 'string' },
                  },
                  required: ['taskName', 'dueDate', 'priority', 'status'],
                },
              },
            },
            required: ['tasks'],
          },
        },
      }
    );

    const taskData = JSON.parse(taskResponse.data.modelResponse);
    return taskData.tasks || [];
  } catch (error) {
    await wf.log({
      label: 'Notion Error',
      message: 'Failed to extract tasks from Notion database',
      level: 'error',
      withError: error,
    });
    return [];
  }
}

// Helper function: Score tasks based on priority algorithm
function scoreTasks(tasks: any[], today: Date): any[] {
  const todayStr = today.toISOString().split('T')[0];

  const scoredTasks = tasks.map(task => {
    let score = 0;

    // Critical priority = 10 points
    if (task.priority === 'Critical') {
      score += 10;
    } else if (task.priority === 'High') {
      score += 7;
    } else if (task.priority === 'Medium') {
      score += 3;
    }

    // Due today = +5 points
    if (task.dueDate === todayStr) {
      score += 5;
    }

    // Overdue = +10 points
    if (task.dueDate && task.dueDate < todayStr) {
      score += 10;
    }

    return {
      ...task,
      score,
    };
  });

  return scoredTasks.sort((a, b) => b.score - a.score);
}

// **FIX: New helper function to create Notion page with proper formatting**
async function createDailyPlanPage(
  window: any,
  wf: IWorkflow,
  pageTitle: string,
  dateStr: string,
  mustDoTasks: any[],
  processedEvents: any[],
  quickWinTasks: any[],
  waitTasks: any[]
): Promise<void> {
  try {
    // Create new page
    await window.click('the New button in the top right');
    await window.waitForPage();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Type title
    await window.type(pageTitle);
    await window.waitForPage();

    // Press Enter to move to content area
    await window.press('Enter');
    await window.waitForPage();
    await new Promise(resolve => setTimeout(resolve, 500));

    // Add heading: Today's 3 Wins
    await window.type(`🔥 Today's 3 Wins (${dateStr})`);
    await window.press('Enter');
    await window.waitForPage();

    // Add blank line
    await window.press('Enter');

    // MUST DO section
    await window.type('✅ MUST DO (Non-negotiable)');
    await window.press('Enter');

    for (const [idx, task] of mustDoTasks.entries()) {
      const timeBlock = suggestTimeBlock(processedEvents, idx);
      const reason = getTaskReason(task);
      await window.type(`${idx + 1}. ${task.taskName} — ${timeBlock} — Why: ${reason}`);
      await window.press('Enter');
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Blank line
    await window.press('Enter');

    // CALENDAR section
    await window.type('📅 CALENDAR (Protected zones)');
    await window.press('Enter');

    for (const event of processedEvents) {
      const startTime = new Date(event.startTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });
      const endTime = new Date(event.endTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      });

      let eventLine = `${event.title} — ${startTime} to ${endTime}`;
      if (event.isBackToBack) {
        eventLine += ' ⚠️ Back-to-back';
      }
      if (event.hasDeepWorkAfter) {
        eventLine += ' 🔒';
      }
      await window.type(eventLine);
      await window.press('Enter');
      await new Promise(resolve => setTimeout(resolve, 200));
    }

    // Blank line
    await window.press('Enter');

    // QUICK WINS section
    await window.type('⚡ IF YOU HAVE 15 MIN (Quick wins)');
    await window.press('Enter');

    if (quickWinTasks.length === 0) {
      await window.type('No Medium priority tasks available today.');
      await window.press('Enter');
    } else {
      for (const task of quickWinTasks) {
        await window.type(`- ${task.taskName}`);
        await window.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    // Blank line
    await window.press('Enter');

    // WHAT CAN WAIT section
    await window.type('🛑 WHAT CAN WAIT');
    await window.press('Enter');

    if (waitTasks.length === 0) {
      await window.type('No lower priority tasks available.');
      await window.press('Enter');
    } else {
      for (const task of waitTasks) {
        await window.type(`- ${task.taskName} (${task.priority})`);
        await window.press('Enter');
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    // Blank line
    await window.press('Enter');

    // ENERGY CHECK-IN section
    await window.type('🧘‍♀️ ENERGY CHECK-IN');
    await window.press('Enter');
    await window.type('How are you feeling right now? If overwhelmed, start with the 15-min tasks to build momentum, not #1.');
    await window.press('Enter');

    await wf.log({ label: 'Notion', message: 'Daily plan content added successfully' });
  } catch (error) {
    await wf.log({
      label: 'Notion Error',
      message: 'Failed to create daily plan page',
      level: 'error',
      withError: error,
    });
    throw error;
  }
}

// Helper function: Suggest time blocks based on calendar gaps
function suggestTimeBlock(processedEvents: any[], taskIndex: number): string {
  if (processedEvents.length === 0) {
    return 'Flexible time available';
  }

  // For now, suggest general time blocks based on task index
  const timeBlocks = [
    'Morning (before first meeting)',
    'Midday (between meetings)',
    'Late afternoon (after meetings)',
  ];

  return timeBlocks[taskIndex] || 'Flexible';
}

// Helper function: Get reason for task priority
function getTaskReason(task: any): string {
  const reasons: string[] = [];

  if (task.priority === 'Critical') {
    reasons.push('Critical priority');
  }
  if (task.dueDate) {
    const dueDate = new Date(task.dueDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);

    if (dueDate.getTime() === today.getTime()) {
      reasons.push('due today');
    } else if (dueDate < today) {
      reasons.push('overdue');
    }
  }

  return reasons.length > 0 ? reasons.join(', ') : 'Important task';
}

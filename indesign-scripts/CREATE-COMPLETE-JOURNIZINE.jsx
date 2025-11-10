// ALTERED.EARTH JOURNIZINE VOL. 1 - MASTER BUILDER
// This script creates the complete 120-page journizine with all content
// Template: 6 pages (Cover, TOC 2-3, Content pages 01-03)

#target indesign

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;

    if (doc.pages.length < 6) {
        alert("This script expects a 6-page template:\n" +
              "• Page 1: Cover\n" +
              "• Pages 2-3: Table of Contents\n" +
              "• Pages 4-6: Content template pages (01-03)\n\n" +
              "Your document has " + doc.pages.length + " pages.");
        return;
    }

    // Confirm structure
    var proceed = confirm(
        "ALTERED.EARTH JOURNIZINE VOL. 1 - MASTER BUILDER\n\n" +
        "This script will create:\n" +
        "• 46 magazine article pages (8 articles with full content)\n" +
        "• 76 journal pages (30 daily spreads + weekly deep dives)\n\n" +
        "TOTAL: 120+ pages with complete content\n\n" +
        "Your current template:\n" +
        "• Page 1: Cover (preserved)\n" +
        "• Pages 2-3: Table of Contents (preserved)\n" +
        "• Pages 4-6: Content templates\n\n" +
        "Ready to build?"
    );

    if (!proceed) return;

    // Ask which content page to use as template
    var templateNum = prompt(
        "Which content page (4, 5, or 6) should I use as the template?\n\n" +
        "This page's design will be duplicated for all new pages.",
        "4"
    );

    if (templateNum === null) return;
    templateNum = parseInt(templateNum);

    if (templateNum < 4 || templateNum > 6) {
        alert("Please enter 4, 5, or 6");
        return;
    }

    var templatePage;
    try {
        templatePage = doc.pages.item(templateNum - 1);
        if (!templatePage.isValid) {
            alert("Template page is not valid.");
            return;
        }
    } catch (e) {
        alert("Error accessing template page: " + e.message);
        return;
    }

    // Track progress
    var stats = {
        pagesCreated: 0,
        textInserted: 0,
        errors: []
    };

    // Helper function to parse content into structured sections
    function parseContentIntoSections(content) {
        var sections = [];

        // Split by double line breaks to get blocks
        var blocks = content.split("\n\n");

        // First block is always the title
        if (blocks.length > 0) {
            sections.push(blocks[0]);
        }

        // Second block might be subtitle (if short) or body content
        if (blocks.length > 1 && blocks[1]) {
            var secondBlock = String(blocks[1]);
            // If it's short (< 80 chars) and doesn't have bullets/lists, it's probably a subtitle
            if (secondBlock.length < 80 && secondBlock.indexOf("•") === -1 && secondBlock.indexOf("\n") === -1) {
                sections.push(secondBlock); // Subtitle
            } else {
                sections.push(""); // No subtitle, leave frame empty
                blocks.unshift("", secondBlock); // Put second block back for processing
                blocks.shift(); // Remove the empty we just added
                blocks.shift(); // Remove title
            }
        }

        // Process remaining blocks - look for headers vs body text
        for (var i = 2; i < blocks.length; i++) {
            // Safety check - ensure block is a string
            if (!blocks[i] || typeof blocks[i] !== 'string') continue;

            var block = String(blocks[i]).replace(/^\s+|\s+$/g, ''); // Manual trim for ExtendScript
            if (!block) continue;

            // Check if this looks like a header:
            // - All caps OR
            // - Short (< 60 chars) and ends without period OR
            // - Starts with a number followed by period
            var isHeader = false;
            var lines = block.split("\n");
            var firstLine = lines[0];

            if (firstLine === firstLine.toUpperCase() && firstLine.length < 100) {
                isHeader = true;
            } else if (firstLine.length < 60 && !firstLine.match(/\.\s*$/)) {
                isHeader = true;
            } else if (firstLine.match(/^\d+\./)) {
                isHeader = true;
            }

            if (isHeader && lines.length === 1) {
                // It's a standalone header
                sections.push(block);
            } else if (isHeader && lines.length > 1) {
                // Header with body text after it
                sections.push(firstLine); // Header in one frame
                sections.push(lines.slice(1).join("\n")); // Body in next frame
            } else {
                // It's body text - chunk it if too long
                var words = block.split(/\s+/);
                if (words.length > 200) {
                    // Split into ~150-word chunks
                    var chunk = "";
                    var wordCount = 0;
                    for (var w = 0; w < words.length; w++) {
                        chunk += words[w] + " ";
                        wordCount++;
                        if (wordCount >= 150 && w < words.length - 1) {
                            var trimmedChunk = String(chunk).replace(/^\s+|\s+$/g, '');
                            sections.push(trimmedChunk);
                            chunk = "";
                            wordCount = 0;
                        }
                    }
                    var finalChunk = String(chunk).replace(/^\s+|\s+$/g, '');
                    if (finalChunk) {
                        sections.push(finalChunk);
                    }
                } else {
                    sections.push(block);
                }
            }
        }

        return sections;
    }

    // Helper function to create page with content
    function createContentPage(label, content) {
        try {
            // Create new page
            var newPage = doc.pages.add(LocationOptions.AT_END);

            // Copy all page items from template
            for (var j = 0; j < templatePage.allPageItems.length; j++) {
                templatePage.allPageItems[j].duplicate(newPage);
            }

            // Copy master page if applied
            if (templatePage.appliedMaster) {
                newPage.appliedMaster = templatePage.appliedMaster;
            }

            // Label the page
            try {
                newPage.label = label;
            } catch (e) {
                // Labels not supported
            }

            // Insert content intelligently across multiple structured text frames
            if (content && newPage.textFrames.length > 0) {
                try {
                    // Parse content into structured sections
                    var sections = parseContentIntoSections(content);

                    // Insert into available text frames
                    var frameIndex = 0;
                    for (var s = 0; s < sections.length && frameIndex < newPage.textFrames.length; s++) {
                        if (sections[s]) {
                            newPage.textFrames[frameIndex].contents = sections[s];
                            frameIndex++;
                            stats.textInserted++;
                        }
                    }

                } catch (e) {
                    stats.errors.push("Text insertion failed on: " + label + " - " + e.message);
                }
            }

            stats.pagesCreated++;
            return true;

        } catch (err) {
            stats.errors.push("Page creation failed: " + label + " - " + err.message);
            return false;
        }
    }

    // ========================================
    // MAGAZINE ARTICLES (46 pages total)
    // ========================================

    var articles = [
        {
            name: "Welcome to Feelings Unplugged",
            pages: [
                "WELCOME TO YOUR ALTERED EARTH\n\nLetter from Dr. Tartt\n\nThis is for kids who feel BIG feelings. You don't have to hide them. You don't have to only feel happy.\n\nYour feelings are not too much.\n\nThis journizine is for the ones who feel everything deeply. If you've ever been told to 'just think positive' when you felt sad, this is for you.\n\nHow to use this:\nThere are no rules. Just tools.\n\n• Read the articles to understand your brain\n• Use the journal prompts when you need them\n• Skip days if you want\n• Draw instead of write\n• Make it yours\n\nYour feelings matter. Even the hard ones.",

                "WHO THIS IS FOR\n\n✓ Kids who feel things deeply\n✓ Kids who get told they're 'too sensitive'\n✓ Kids who have big emotions and don't know what to do with them\n✓ Kids who are tired of being told to 'just be happy'\n\nWHY THIS EXISTS\n\nBecause your feelings deserve attention. Because shadow work isn't just for adults. Because you deserve tools that actually work.\n\nWHAT YOU'LL FIND HERE\n\n• Brain science (made simple)\n• Daily journal prompts\n• Ways to understand your emotions\n• Permission to feel everything\n• Crisis resources when you need more help\n\nYou're not broken. You're growing.",

                "HOW TO USE THIS JOURNIZINE\n\nNO RULES:\n• You don't have to journal every day\n• You can skip prompts that don't fit\n• You can doodle instead of write\n• You can rip out pages\n• You can start anywhere\n\nPRIVACY:\nYour thoughts are yours alone. Keep this somewhere safe. You don't have to show anyone.\n\nTIPS:\n• Write in pen (it's more permanent, more real)\n• Use stickers, colors, anything that helps\n• Be honest (no one's grading this)\n• If it hurts to write, that means it's working\n\nREMEMBER:\nJournaling is a tool, not a cure. If you're struggling, talk to someone you trust.",

                "A NOTE ABOUT FEELINGS\n\nFeelings aren't good or bad. They just ARE.\n\n• Anger isn't bad. It tells you when something's wrong.\n• Sadness isn't weakness. It means you care.\n• Fear isn't failure. It's trying to protect you.\n• Joy isn't 'fake happy.' It's real.\n\nYour job isn't to fix your feelings.\nYour job is to FEEL them.\n\nThen decide what to do next.\n\nThat's the work.\n\nLet's begin.\n\n— Dr. Tartt"
            ]
        },

        {
            name: "Your Brain Is Changing",
            pages: [
                "YOUR BRAIN IS CHANGING (AND THAT'S COOL)\n\nYour brain is like a house being remodeled.\n\nRight now, your brain is growing super fast. Especially the part that feels emotions.\n\nThe teenage brain is EXTRA sensitive to emotions. That's normal!\n\nThat's why you might feel like crying one minute and laughing the next.\n\nIt's not your fault. It's your brain.",

                "WHAT'S HAPPENING IN YOUR BRAIN\n\nYour brain has different parts:\n\nEMOTION CENTER (Amygdala)\n• Feels everything FIRST\n• Reacts to danger, fear, excitement\n• Is BIGGER and more active in teens\n\nLOGIC CENTER (Prefrontal Cortex)\n• Thinks things through\n• Makes plans\n• Says 'wait, let's think about this'\n• Still under construction until age 25\n\nThat's why feelings can feel HUGE.\n\nThe emotion center is fully online.\nThe logic center is still being built.\n\nYou're not broken. You're growing.",

                "WHY FEELINGS FEEL SO BIG\n\n1. Your emotion center is working overtime\n2. Your logic center is still developing\n3. Your hormones are changing\n4. Your body is growing\n5. Your social world is expanding\n\nAll of this happening at once = BIG FEELINGS.\n\nDID YOU KNOW?\n• Teen brains are wired to take risks (that's how you learn)\n• You feel peer rejection more intensely (that's evolution)\n• You need more sleep (9-10 hours!) because of brain growth\n• Music hits different (your brain is super responsive to it)\n\nThis is all NORMAL.",

                "WHAT THIS MEANS FOR YOU\n\nWhen you feel like your emotions are too much:\nRemember: Your brain is doing exactly what it's supposed to do.\n\nWhen you can't focus:\nRemember: Your prefrontal cortex is under construction.\n\nWhen you feel things deeply:\nRemember: That's your superpower. Don't shut it off.\n\nYour brain is changing. That's not a bug. That's a feature.\n\nYou're learning how to be human.\nIt's messy. It's hard. It's supposed to be.\n\nYou're doing great.",

                "YOUR BRAIN RIGHT NOW\n[Simple diagram description]\n\nEMOTION CENTER\n↓\nFEELS EVERYTHING FIRST\nBig • Fast • Intense\n\nLOGIC CENTER\n↓\nSTILL UNDER CONSTRUCTION\nSlow • Learning • Growing\n\nMEMORY CENTER\n↓\nREMEMBERS EMOTIONS STRONGLY\nEspecially strong feelings\n\nThis is why:\n• You feel first, think later\n• Emotions feel overwhelming\n• You remember emotional moments vividly\n\nIt's all working perfectly.\nYou're just learning how to use it.",

                "THE BOTTOM LINE\n\nYour brain is remodeling itself.\nIt's loud. It's chaotic. It's beautiful.\n\nYou're not:\n✗ Too emotional\n✗ Too sensitive\n✗ Broken\n✗ Wrong\n\nYou are:\n✓ Growing\n✓ Learning\n✓ Feeling\n✓ Becoming\n\nThis journizine will help you understand what's happening.\nAnd give you tools to work with your brain, not against it.\n\nReady?\n\nLet's go."
            ]
        },

        {
            name: "Meet the Academy",
            pages: [
                "MEET THE ACADEMY: WHICH ONE ARE YOU?\n\nEveryone has a way they show up in the world.\n\nThese are the 5 Academy Archetypes.\n\nYou might be one. You might be a mix.\nThere's no right answer.\n\nThis is just a way to understand yourself better.\n\nLet's meet them:",

                "THE CATALYST (Change-Maker)\n\nYou see things that need to change. You speak up when others stay quiet.\n\nYour Strengths:\n• You're brave\n• You tell the truth\n• You stand up for what's right\n• You make things happen\n\nYour Shadow:\n• You get SO mad when things don't change fast enough\n• You might burn out trying to fix everything\n• You can feel alone when no one else speaks up\n\nYour Reminder:\nYou can't change everything. But you can change something. That matters.\n\nIcon: ⚡ Lightning bolt\nColor: Terracotta",

                "THE LUMINARY (Creative Light)\n\nYou love to create and share your ideas. You have big dreams and big feelings.\n\nYour Strengths:\n• You're creative\n• You inspire others\n• You see beauty everywhere\n• You express yourself freely\n\nYour Shadow:\n• You worry you're 'too much'\n• You pretend to be fine when you're not\n• You feel like you have to perform happiness\n\nYour Reminder:\nYou don't have to shine all the time. You're allowed to rest in the dark.\n\nIcon: ☀️ Sun\nColor: Amber gold",

                "THE GUARDIAN (Protector)\n\nYou take care of people. You're the friend everyone comes to for help.\n\nYour Strengths:\n• You're dependable\n• You listen deeply\n• You make people feel safe\n• You remember what matters\n\nYour Shadow:\n• You take care of everyone else but forget yourself\n• You say 'I'm fine' when you're not\n• You feel guilty when you need help\n\nYour Reminder:\nYou can't pour from an empty cup. Taking care of yourself isn't selfish.\n\nIcon: 🛡️ Shield\nColor: Forest green",

                "THE MAVERICK (Free Spirit)\n\nYou like to do things your own way. You don't follow the crowd.\n\nYour Strengths:\n• You're independent\n• You think differently\n• You're not afraid to be alone\n• You trust yourself\n\nYour Shadow:\n• You push people away when you need them\n• You think asking for help means you're weak\n• You feel lonely but won't admit it\n\nYour Reminder:\nIndependence isn't the same as isolation. You can be strong AND connected.\n\nIcon: → Arrow\nColor: Sage green",

                "THE WEAVER (Connector)\n\nYou make friends easily. You help people get along. You hate when people fight.\n\nYour Strengths:\n• You see all sides\n• You bring people together\n• You're empathetic\n• You make peace\n\nYour Shadow:\n• You lose yourself trying to make everyone happy\n• You avoid conflict even when it's needed\n• You don't know what YOU want\n\nYour Reminder:\nYou can't hold everyone together. Sometimes people need to fall apart to grow.\n\nIcon: ○○ Interlocking circles\nColor: Cream",

                "WHICH ONE ARE YOU?\n\nQuiz:\n\n1. When your friend is sad, you:\na) Give them advice on how to fix it\nb) Make them laugh\nc) Just listen\nd) Give them space\n\n2. When something feels unfair, you:\na) Speak up immediately\nb) Create something about it\nc) Help the person who was hurt\nd) Walk away from the situation\n\n3. Your biggest fear is:\na) Nothing changing\nb) Being forgotten\nc) Letting people down\nd) Being trapped\n\n[Scoring guide would be on next page]\n\nRemember: You might be MORE than one!\nThat's totally okay.",

                "YOUR ARCHETYPE MATTERS\n\nWhy does this help?\n\nBecause when you understand your archetype, you understand:\n• Why certain things bother you\n• Why you react the way you do\n• What your strengths are\n• Where your shadows hide\n\nThis isn't a box to fit into.\nIt's a mirror to see yourself more clearly.\n\nThroughout this journal, you'll explore your archetype more deeply.\n\nFor now, just notice:\nWhich one felt most like home?\n\nThat's your starting point."
            ]
        },

        {
            name: "Shadow Work for Beginners",
            pages: [
                "SHADOW WORK FOR BEGINNERS\n\nWhat is a shadow?\n\nYour shadow is the part of you that you hide.\n\nMaybe you hide your anger.\nMaybe you hide your sadness.\nMaybe you hide that you're scared.\n\nYour shadow isn't bad.\nIt's trying to keep you safe.",

                "WHY DO WE HAVE SHADOWS?\n\nYou learned early: some feelings aren't 'okay.'\n\nMaybe you got in trouble for being angry.\nSo you learned to hide your anger.\n\nMaybe you got told 'boys don't cry.'\nSo you learned to hide your sadness.\n\nMaybe people said you were 'too much.'\nSo you learned to hide your bigness.\n\nYour shadow helped you survive.\n\nBut now? It might be holding you back.",

                "SHADOW WORK ISN'T SCARY\n\nIt's like cleaning out a closet.\n\nYou're just looking at what you stuffed in there.\n\nYou're not broken.\nYou're not bad.\nYou just have parts of yourself you've been hiding.\n\nShadow work means:\n• Looking at those hidden parts\n• Saying 'It's okay. I see you.'\n• Deciding if you still need to hide them\n\nThat's it.",

                "SHADOW EXAMPLES (Age-Appropriate)\n\nThe Catalyst's shadow:\n→ Getting SO mad when things don't change fast enough\n→ Feeling like everyone else is too slow\n\nThe Luminary's shadow:\n→ Acting like everything is fine when you're really sad\n→ Performing happiness even when you're hurting\n\nThe Guardian's shadow:\n→ Taking care of everyone else but forgetting about yourself\n→ Saying 'I'm fine' when you're not\n\nThe Maverick's shadow:\n→ Pushing people away when you actually need help\n→ Being alone even when you're lonely\n\nThe Weaver's shadow:\n→ Losing yourself trying to make everyone happy\n→ Not knowing what YOU want",

                "HOW TO WORK WITH YOUR SHADOW\n\nStep 1: Notice it\n'I'm hiding my anger right now.'\n\nStep 2: Don't judge it\n'It's okay that I'm angry.'\n\nStep 3: Ask why\n'What is this anger protecting me from?'\n\nStep 4: Decide\n'Do I need to keep hiding this? Or can I let it out safely?'\n\nYour shadow isn't your enemy.\nIt's a part of you that needs attention.\n\nIn this journal, you'll meet your shadow.\nNot to fight it.\nTo understand it.",

                "REMEMBER\n\nYour shadow:\n✓ Helped you survive\n✓ Is trying to protect you\n✓ Deserves compassion\n✓ Can be integrated, not eliminated\n\nYou don't have to fix your shadow.\nYou just have to see it.\n\nThat's the work.\n\nAre you ready?\n\nYour Shadow Isn't Your Enemy."
            ]
        },

        {
            name: "When Journaling Isn't Enough",
            pages: [
                "WHEN JOURNALING ISN'T ENOUGH\n\nThis journal can help you understand your feelings.\n\nBut if you're feeling really, really bad, talk to an adult you trust.\n\nJournaling is a tool, not a cure.",

                "WHAT THERAPY ACTUALLY IS\n\nTherapy is like having a feelings coach.\n\nThey help you:\n• Understand your brain\n• Work through hard stuff\n• Learn tools that actually work\n• Feel less alone\n\nTherapy isn't for 'crazy people.'\nIt's for people who want help.\n\nThat's strength, not weakness.",

                "WARNING SIGNS (When to ask for help)\n\n☑️ I think about hurting myself\n☑️ I don't want to be alive anymore\n☑️ I feel sad or scared every day\n☑️ I can't eat or sleep\n☑️ I can't focus on anything\n☑️ I feel numb all the time\n\nIf you checked ANY of these:\nPlease talk to someone you trust.\n\nYou deserve help.",

                "CRISIS RESOURCES\n\n🆘 988 Suicide & Crisis Lifeline\nCall or text: 988\nAvailable 24/7\n\n🏳️‍🌈 Trevor Project (LGBTQ+ youth)\nCall: 1-866-488-7386\nText 'START' to 678-678\n\n🖤 BlackLine (for Black & BIPOC youth)\nCall: 1-800-604-5841\n\n💬 Crisis Text Line\nText 'HELLO' to 741741\n\nYou are not alone.\nYou deserve help.\nYou deserve to be here."
            ]
        },

        {
            name: "Playlist as Medicine",
            pages: [
                "PLAYLIST AS MEDICINE\n\nHow music changes your mood (and how to use it)\n\nHave you ever felt sad, then played a song that made you cry even more—and somehow, you felt better?\n\nOr maybe you were nervous before a big game, so you put on your pump-up playlist and felt braver?\n\nThat's not magic. That's your brain.\n\nMusic is medicine for your feelings.\n\nAnd the best part? You already know how to use it.",

                "YOUR BRAIN ON MUSIC\n\nWhen you listen to music, your brain releases chemicals that change how you feel.\n\nHere's what happens:\n\nWhen you listen to a song you love:\n• Your brain releases dopamine (the 'feel-good' chemical)\n• Your heart rate can slow down or speed up\n• Your body relaxes or gets energized\n\nWhen you listen to sad music when you're sad:\n• It's called 'matching your mood'\n• Your brain feels understood\n• Crying to music can help you feel better\n\nWhen you listen to upbeat music:\n• Your brain gets energized\n• You might feel more confident\n• It helps you focus or move your body\n\nMusic can:\n• Lower stress\n• Give you energy\n• Help you remember things\n• Make you feel less alone",

                "BUILD YOUR EMOTIONAL TOOLKIT\n\nThink of playlists like a first-aid kit—but for your feelings.\n\nThe 5 playlists everyone should have:\n\n1. MAD PLAYLIST - When you're angry and need to let it out\n2. SAD PLAYLIST - When you need to cry or feel your feelings\n3. HAPPY PLAYLIST - When you want to celebrate or feel good\n4. CALM PLAYLIST - When you need to breathe and slow down\n5. HYPED PLAYLIST - When you need energy or confidence",

                "MAD PLAYLIST\nWhen I'm angry and need to let it out\n\nSong 1: _________________________________\nSong 2: _________________________________\nSong 3: _________________________________\nSong 4: _________________________________\nSong 5: _________________________________\nSong 6: _________________________________\nSong 7: _________________________________\nSong 8: _________________________________\nSong 9: _________________________________\nSong 10: _________________________________\n\nSAD PLAYLIST\nWhen I need to cry or feel my feelings\n\nSong 1: _________________________________\nSong 2: _________________________________\nSong 3: _________________________________\nSong 4: _________________________________\nSong 5: _________________________________\nSong 6: _________________________________\nSong 7: _________________________________\nSong 8: _________________________________\nSong 9: _________________________________\nSong 10: _________________________________",

                "HAPPY PLAYLIST\nWhen I want to celebrate or feel good\n\nSong 1: _________________________________\nSong 2: _________________________________\nSong 3: _________________________________\nSong 4: _________________________________\nSong 5: _________________________________\nSong 6: _________________________________\nSong 7: _________________________________\nSong 8: _________________________________\nSong 9: _________________________________\nSong 10: _________________________________\n\nCALM PLAYLIST\nWhen I need to breathe and slow down\n\nSong 1: _________________________________\nSong 2: _________________________________\nSong 3: _________________________________\nSong 4: _________________________________\nSong 5: _________________________________\nSong 6: _________________________________\nSong 7: _________________________________\nSong 8: _________________________________\nSong 9: _________________________________\nSong 10: _________________________________",

                "HYPED PLAYLIST\nWhen I need energy or confidence\n\nSong 1: _________________________________\nSong 2: _________________________________\nSong 3: _________________________________\nSong 4: _________________________________\nSong 5: _________________________________\nSong 6: _________________________________\nSong 7: _________________________________\nSong 8: _________________________________\nSong 9: _________________________________\nSong 10: _________________________________\n\nHOW TO USE YOUR PLAYLISTS\n\nStep 1: Name your emotion\nStep 2: Pick the matching playlist\nStep 3: Let the music do its work\nStep 4: Notice how you feel after\n\nREMEMBER:\nMusic isn't a cure—it's a tool.\n\n'Your feelings deserve a soundtrack.'"
            ]
        },

        {
            name: "Glossary of Feelings",
            pages: [
                "GLOSSARY OF FEELINGS\n\nSometimes we don't have words for what we feel.\n\nThis is a guide to help you name it.\n\nBecause naming a feeling gives you power over it.",

                "EMOTION WHEEL\n\n[Center emotions]\nMAD • SAD • HAPPY • SCARED • CONFUSED\n\nMAD can mean:\n• Angry • Frustrated • Annoyed • Furious • Irritated\n\nSAD can mean:\n• Lonely • Hurt • Disappointed • Heartbroken • Hopeless\n\nHAPPY can mean:\n• Excited • Proud • Grateful • Content • Joyful\n\nSCARED can mean:\n• Anxious • Worried • Terrified • Nervous • Overwhelmed\n\nCONFUSED can mean:\n• Lost • Uncertain • Stuck • Numb • Conflicted",

                "FEELING WORDS WITH DEFINITIONS\n\nANXIOUS\nYour body feels shaky or jumpy. You worry about what might happen.\n\nOVERWHELMED\nToo many things at once. Your brain feels full.\n\nNUMB\nYou don't feel anything. Like your emotions are turned off.\n\nGUILTY\nYou feel bad about something you did (or didn't do).\n\nASHAMED\nYou feel bad about who you are.\n\nLONELY\nYou feel alone, even if people are around.\n\nHOPEFUL\nYou believe things can get better.\n\nPROUD\nYou did something hard and you know it.",

                "WHERE DO YOU FEEL IT?\n\n[Body map with descriptions]\n\nHEAD:\n• Headaches when stressed\n• Brain fog when overwhelmed\n\nTHROAT:\n• Lump in throat when sad\n• Tightness when you can't speak\n\nCHEST:\n• Heavy when sad\n• Tight when anxious\n• Warm when happy\n\nSTOMACH:\n• Butterflies when nervous\n• Knots when worried\n• Empty when sad\n\nHANDS:\n• Shaky when scared\n• Clenched when angry\n\nFEELINGS LIVE IN YOUR BODY.\nNotice where you feel them."
            ]
        },

        {
            name: "How to Use This Journal",
            pages: [
                "HOW TO USE THIS JOURNAL\n\nNO RULES\n\nYou can:\n• Skip days\n• Doodle instead of write\n• Use stickers\n• Rip out pages if you want\n• Start anywhere\n• Do it your way\n\nThis is YOURS.",

                "TIPS\n\n• Write in pen (it feels more permanent, more real)\n• Be honest (no one's grading this)\n• If it hurts to write, that means it's working\n• Your thoughts are private. Keep this somewhere safe.\n\nREMEMBER:\nYou don't have to show anyone.\n\nThis is your space.\n\nUse it however you need."
            ]
        },

        {
            name: "Resource Directory",
            pages: [
                "RESOURCE DIRECTORY\n\nHOTLINES\n\n🆘 988 Suicide & Crisis Lifeline\nCall or text: 988\n\n🏳️‍🌈 Trevor Project\n1-866-488-7386\n\n🖤 BlackLine\n1-800-604-5841\n\n💬 Crisis Text Line\nText 'HELLO' to 741741",

                "MENTAL HEALTH APPS FOR TEENS\n\n• Calm (meditation, sleep)\n• Headspace (mindfulness)\n• Finch (self-care pet)\n• Sanvello (mood tracking)\n• Wysa (AI therapy chatbot)\n• Mindshift (anxiety management)",

                "BOOKS\n\n• The Anxiety Workbook for Teens\n• Mindfulness for Teen Anxiety\n• The Self-Care Handbook for Teens\n• You Are Not Alone\n• This Book Is Anti-Racist",

                "WEBSITES\n\n• BEAM (Black Emotional and Mental Health Collective)\n• Trevor Project (LGBTQ+ youth)\n• Trans Lifeline\n• JED Foundation (teen mental health)\n• Active Minds (youth mental health)",

                "REMEMBER\n\nAsking for help is brave.\nYou deserve support.\nYou are not alone.",

                "EMERGENCY CONTACTS\n\nWrite down people you can call:\n\nTrusted Adult:\n_______________________________\n\nFriend:\n_______________________________\n\nFamily Member:\n_______________________________\n\nTherapist/Counselor:\n_______________________________\n\nYou matter.\nYou deserve to be here."
            ]
        }
    ];

    // Create all magazine article pages
    for (var a = 0; a < articles.length; a++) {
        var article = articles[a];
        for (var p = 0; p < article.pages.length; p++) {
            var pageLabel = article.name + " - Page " + (p + 1);
            createContentPage(pageLabel, article.pages[p]);
        }
    }

    // ========================================
    // JOURNAL PROMPTS (76 pages total)
    // ========================================

    // Morning prompts (rotating)
    var morningPrompts = [
        "MORNING RITUAL\n\nHow do I feel right now?\n😊 😐 😢 😡 😰 [Circle one]\n\nIn my body, I feel:\n_________________________________",
        "MORNING RITUAL\n\nToday, my energy feels like:\n[Battery icon: Color it in from empty to full]\n\nOne thing I need today:\n_________________________________",
        "MORNING RITUAL\n\nToday, I want to feel:\n_________________________________\n[Calm / Happy / Brave / Creative / Rested]\n\nTo feel that way, I will:\n_________________________________",
        "MORNING RITUAL\n\nOne small thing that's okay today:\n_________________________________\n\n(It's okay if nothing feels good. That's real too.)",
        "MORNING RITUAL\n\nToday, I give myself permission to:\n_________________________________\n\n[Examples: rest, say no, feel sad, be proud]",
        "MORNING RITUAL\n\nIf my mood was weather, it would be:\n[Sun / Clouds / Rain / Storm / Rainbow - circle one]\n\nBecause:\n_________________________________",
        "MORNING RITUAL\n\nMy body is telling me:\n☑️ I'm tired\n☑️ I'm hungry\n☑️ I'm tense\n☑️ I'm energized\n☑️ I'm calm",
        "MORNING RITUAL\n\nToday, I am:\n_________________________________\n\n[Suggestions: enough, learning, trying, brave, healing]",
        "MORNING RITUAL\n\nToday feels hard because:\n_________________________________\n\n(It's okay to name what's hard.)",
        "MORNING RITUAL\n\nToday, I feel like:\n[Catalyst / Luminary / Guardian / Maverick / Weaver]\n\nBecause:\n_________________________________"
    ];

    // Midday prompts (rotating)
    var middayPrompts = [
        "MIDDAY CHECK-IN\n\nRight now, I feel:\n_________________________________\n\n[Word bank: happy, sad, mad, scared, confused, excited, tired, numb]",
        "MIDDAY CHECK-IN\n\nSomething that bothered me today:\n_________________________________\n\nIt made me feel:\n_________________________________",
        "MIDDAY CHECK-IN\n\nWhere do I feel this emotion in my body?\n\n[Draw or color on the body outline where you feel it]",
        "MIDDAY CHECK-IN\n\nA thought that keeps coming back:\n_________________________________\n\nIs it true? Is it kind? Is it helpful?\n[Circle: Yes / No / Maybe]",
        "MIDDAY CHECK-IN\n\nWhen I feel bad, I usually:\n☑️ Listen to music\n☑️ Talk to someone\n☑️ Be alone\n☑️ Move my body\n☑️ Cry\n☑️ Sleep\n\nDid it help? [Circle: Yes / No / A little]",
        "MIDDAY CHECK-IN\n\nToday, did someone cross a boundary?\n[Circle: Yes / No]\n\nIf yes, what happened?\n_________________________________",
        "MIDDAY CHECK-IN\n\nDid I compare myself to someone today?\n[Circle: Yes / No]\n\nIf yes, how did it make me feel?\n_________________________________",
        "MIDDAY CHECK-IN\n\nDid I pretend to be okay when I wasn't?\n[Circle: Yes / No]\n\nIf yes, why?\n_________________________________",
        "MIDDAY CHECK-IN\n\nOne thing that made me smile today:\n_________________________________\n\n(Even small things count!)",
        "MIDDAY CHECK-IN\n\nDo I need help right now?\n[Circle: Yes / No / Not sure]\n\nIf yes, who can I talk to?\n_________________________________"
    ];

    // Evening prompts (rotating)
    var eveningPrompts = [
        "EVENING REFLECTION\n\n🌹 Rose (something good):\n_________________________________\n\n🌵 Thorn (something hard):\n_________________________________\n\n🌱 Bud (something to look forward to):\n_________________________________",
        "EVENING REFLECTION\n\nToday, I learned that I:\n_________________________________\n\n[Examples: am stronger than I thought, need more rest, can ask for help]",
        "EVENING REFLECTION\n\nOne thing I wish I'd done differently:\n_________________________________\n\n(No shame. Just noticing.)\n\nTomorrow, I'll try:\n_________________________________",
        "EVENING REFLECTION\n\nBefore I sleep, I let go of:\n_________________________________\n\n[Write it, then imagine it floating away like a balloon.]",
        "EVENING REFLECTION\n\nTomorrow, I hope:\n_________________________________\n\n[Small star icon to color in]",
        "EVENING REFLECTION\n\nToday, I felt connected to:\n[Circle: Myself / Friends / Family / No one]\n\nIf 'no one,' that's okay. Tomorrow is a new day.",
        "EVENING REFLECTION\n\nA part of myself I hid today:\n_________________________________\n\nWhy?\n_________________________________\n\n(Your shadow is trying to protect you.)",
        "EVENING REFLECTION\n\nOn a scale of 1-10, today's energy was:\n[1 2 3 4 5 6 7 8 9 10 - circle one]\n\nTomorrow, I want it to be: ___",
        "EVENING REFLECTION\n\nOne kind thing I can say to myself tonight:\n_________________________________\n\n[Examples: You tried your best, It's okay to rest, You matter]",
        "EVENING REFLECTION\n\nDOODLE YOUR DAY\n\n[Blank space]\n\nDraw, scribble, or color how today felt."
    ];

    // Create 30 daily spreads (60 pages)
    for (var day = 1; day <= 30; day++) {
        var morningIndex = (day - 1) % morningPrompts.length;
        var middayIndex = (day - 1) % middayPrompts.length;
        var eveningIndex = (day - 1) % eveningPrompts.length;

        // Left page: Morning + Midday
        var leftContent = "DAY " + day + "\n\n" + morningPrompts[morningIndex] + "\n\n---\n\n" + middayPrompts[middayIndex];
        createContentPage("Day " + day + " - Left", leftContent);

        // Right page: Evening
        var rightContent = "DAY " + day + "\n\n" + eveningPrompts[eveningIndex];
        createContentPage("Day " + day + " - Right", rightContent);

        // Add weekly deep dive after every 7 days (4 total)
        if (day % 7 === 0 && day <= 28) {
            var weekNum = day / 7;
            var weeklyPrompts = [
                "WEEK 1 DEEP DIVE: THE CATALYST\n\nWhen do you feel the most like YOU?\n_________________________________\n_________________________________\n\nWhat makes you want to speak up?\n_________________________________\n_________________________________\n\nWhen have you changed something that felt unfair?\n_________________________________\n_________________________________",
                "WEEK 2 DEEP DIVE: THE LUMINARY\n\nWhat do you love to create?\n_________________________________\n_________________________________\n\nWhen do you feel like you shine?\n_________________________________\n_________________________________\n\nDo you ever feel like you're 'too much'? When?\n_________________________________\n_________________________________",
                "WEEK 3 DEEP DIVE: THE GUARDIAN\n\nWho do you take care of?\n_________________________________\n_________________________________\n\nWhen was the last time YOU needed care?\n_________________________________\n_________________________________\n\nWhat would it feel like to let someone help you?\n_________________________________\n_________________________________",
                "WEEK 4 DEEP DIVE: SHADOW WORK\n\nWhat part of yourself do you hide from others?\n_________________________________\n_________________________________\n\n(This is normal. We all do it.)\n\nWhat would happen if you showed that part?\n_________________________________\n_________________________________"
            ];

            createContentPage("Week " + weekNum + " Deep Dive - Left", weeklyPrompts[weekNum - 1]);
            createContentPage("Week " + weekNum + " Deep Dive - Right", "[Blank space for reflection, drawing, or continued writing]");
        }
    }

    // Creative sections (18 pages)
    var creativeSections = [
        {name: "Playlist Builder - Mad", content: "MY MAD PLAYLIST\n\nSongs for when I need to let anger out:\n\n1. _________________________________\n2. _________________________________\n3. _________________________________\n4. _________________________________\n5. _________________________________\n6. _________________________________\n7. _________________________________\n8. _________________________________\n9. _________________________________\n10. _________________________________"},
        {name: "Playlist Builder - Sad", content: "MY SAD PLAYLIST\n\nSongs for when I need to cry:\n\n1. _________________________________\n2. _________________________________\n3. _________________________________\n4. _________________________________\n5. _________________________________\n6. _________________________________\n7. _________________________________\n8. _________________________________\n9. _________________________________\n10. _________________________________"},
        {name: "Playlist Builder - Happy", content: "MY HAPPY PLAYLIST\n\nSongs that make me feel good:\n\n1. _________________________________\n2. _________________________________\n3. _________________________________\n4. _________________________________\n5. _________________________________\n6. _________________________________\n7. _________________________________\n8. _________________________________\n9. _________________________________\n10. _________________________________"},
        {name: "Playlist Builder - Calm", content: "MY CALM PLAYLIST\n\nSongs for when I need to breathe:\n\n1. _________________________________\n2. _________________________________\n3. _________________________________\n4. _________________________________\n5. _________________________________\n6. _________________________________\n7. _________________________________\n8. _________________________________\n9. _________________________________\n10. _________________________________"},
        {name: "Playlist Builder - Hyped", content: "MY HYPED PLAYLIST\n\nSongs for when I need energy:\n\n1. _________________________________\n2. _________________________________\n3. _________________________________\n4. _________________________________\n5. _________________________________\n6. _________________________________\n7. _________________________________\n8. _________________________________\n9. _________________________________\n10. _________________________________"},
        {name: "Emotion Tracker - Week 1", content: "EMOTION TRACKER\nWeek 1\n\nColor in each day with how you felt:\n🔴 Red = Mad\n🔵 Blue = Sad\n🟡 Yellow = Happy\n🟢 Green = Calm\n🟣 Purple = Mixed\n\nMon: ___\nTue: ___\nWed: ___\nThu: ___\nFri: ___\nSat: ___\nSun: ___"},
        {name: "Emotion Tracker - Week 2", content: "EMOTION TRACKER\nWeek 2\n\nMon: ___\nTue: ___\nWed: ___\nThu: ___\nFri: ___\nSat: ___\nSun: ___"},
        {name: "Emotion Tracker - Week 3", content: "EMOTION TRACKER\nWeek 3\n\nMon: ___\nTue: ___\nWed: ___\nThu: ___\nFri: ___\nSat: ___\nSun: ___"},
        {name: "Emotion Tracker - Week 4", content: "EMOTION TRACKER\nWeek 4\n\nMon: ___\nTue: ___\nWed: ___\nThu: ___\nFri: ___\nSat: ___\nSun: ___"},
        {name: "Doodle Page 1", content: "DOODLE PAGE\n\nDraw how you feel.\n\n[Blank space for drawing]"},
        {name: "Doodle Page 2", content: "DOODLE PAGE\n\nDraw your safe place.\n\n[Blank space for drawing]"},
        {name: "Doodle Page 3", content: "DOODLE PAGE\n\nDraw your shadow.\n\n[Blank space for drawing]"},
        {name: "Doodle Page 4", content: "DOODLE PAGE\n\nDraw your future self.\n\n[Blank space for drawing]"},
        {name: "Doodle Page 5", content: "DOODLE PAGE\n\nFree space. Draw anything.\n\n[Blank space for drawing]"},
        {name: "Collage Page 1", content: "COLLAGE PAGE\n\nPaste things that make you feel alive.\n\n[Blank space for collage]"},
        {name: "Collage Page 2", content: "COLLAGE PAGE\n\nPaste your dreams.\n\n[Blank space for collage]"},
        {name: "Letter to Future Self", content: "LETTER TO MY FUTURE SELF\n\nDear Future Me,\n\nIn 30 days, I hope you feel:\n_________________________________\n_________________________________\n_________________________________\n_________________________________\n_________________________________\n_________________________________\n\nLove,\nPresent Me"},
        {name: "Letter to Shadow", content: "LETTER TO MY SHADOW\n\nDear Shadow,\n\nI see you. You helped me survive.\n\nThank you for:\n_________________________________\n_________________________________\n_________________________________\n_________________________________\n_________________________________\n\nI'm ready to integrate you now.\n\nWith compassion,\nMe"}
    ];

    for (var c = 0; c < creativeSections.length; c++) {
        createContentPage(creativeSections[c].name, creativeSections[c].content);
    }

    // Final stats
    var errorReport = "";
    if (stats.errors.length > 0) {
        errorReport = "\n\nErrors encountered:\n" + stats.errors.join("\n");
    }

    alert(
        "✅ JOURNIZINE COMPLETE!\n\n" +
        "Pages created: " + stats.pagesCreated + "\n" +
        "Text frames filled: " + stats.textInserted + "\n" +
        "Total pages in document: " + doc.pages.length + "\n" +
        errorReport + "\n\n" +
        "Next steps:\n" +
        "• Review all pages\n" +
        "• Adjust text formatting as needed\n" +
        "• Add images/graphics\n" +
        "• Update Table of Contents (pages 2-3)\n" +
        "• Export to PDF when ready"
    );
}

main();

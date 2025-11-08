# InDesign MCP Server Setup for Claude Code

## Overview
This guide will help you set up an InDesign MCP server so Claude Code can help you edit InDesign documents directly from the terminal.

---

## Option 1: chris-enea/indesign-mcp (Python - Recommended for Simplicity)

### Requirements
- Adobe InDesign 2025 (tested version)
- macOS (uses osascript for InDesign communication)
- Python 3.x
- Claude Code (terminal version)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/chris-enea/indesign-mcp.git
cd indesign-mcp
```

2. **Install dependencies:**
```bash
pip install -r requirements.txt
```

3. **Configure Claude Code to use the MCP server:**

Edit your Claude Code MCP configuration file:
```bash
# Location: ~/.config/claude-code/mcp.json (or similar)
```

Add this server configuration:
```json
{
  "mcpServers": {
    "indesign": {
      "command": "python",
      "args": ["/path/to/indesign-mcp/server.py"],
      "env": {}
    }
  }
}
```

### Available Tools (4 total)
1. **Add Text** - Add text to active InDesign document
2. **Find and Replace Text** - Search and replace text
3. **Remove Text** - Delete specific text
4. **Get All Text** - Retrieve all text content from document

### Usage Example
Once configured, in Claude Code terminal:
```
User: "Add the title 'Altered.Earth Journizine Vol. 1' to my InDesign document"
Claude: [Uses indesign MCP to add text to active document]
```

---

## Option 2: nilasa-indesign-mcp (Node.js - More Features)

### Requirements
- Adobe InDesign 2025 v20.3.1+ (tested version)
- macOS (uses ExtendScript automation via AppleScript)
- Node.js 18+
- Claude Code (terminal version)

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/nilasa/indesign-mcp.git
cd indesign-mcp
```

2. **Install dependencies:**
```bash
npm install
```

3. **Build the server:**
```bash
npm run build
```

4. **Configure Claude Code:**

Edit your MCP configuration:
```json
{
  "mcpServers": {
    "indesign-advanced": {
      "command": "node",
      "args": ["/path/to/indesign-mcp/build/index.js"],
      "env": {}
    }
  }
}
```

### Available Tools (35 total across 8 categories)

**Categories:**
1. **Text Operations** - Add, find/replace, format text
2. **Style Management** - Apply paragraph/character styles
3. **Layout Control** - Adjust spacing, alignment
4. **Page Management** - Add, remove, navigate pages
5. **Document Operations** - Save, export, close documents
6. **Image/Graphics** - Place images, manage graphics
7. **Table Operations** - Create/edit tables
8. **Color Management** - Apply colors, manage swatches

### Usage Example
```
User: "Apply the 'Heading 1' paragraph style to all chapter titles"
Claude: [Uses indesign MCP to batch apply styles]
```

---

## Which One Should You Choose?

### Choose chris-enea/indesign-mcp IF:
- ✅ You mainly need text editing (add, replace, remove)
- ✅ You want simple, quick setup
- ✅ You're new to MCP servers

### Choose nilasa-indesign-mcp IF:
- ✅ You need advanced layout control (styles, pages, images)
- ✅ You're comfortable with Node.js
- ✅ You want to automate complex InDesign tasks

---

## Testing Your Setup

1. **Open InDesign** and create/open a document
2. **In Claude Code terminal, ask:**
   ```
   "Can you add the text 'Test' to my InDesign document?"
   ```
3. **If successful:** Text appears in InDesign
4. **If failed:** Check MCP server logs and ensure InDesign is active

---

## Troubleshooting

**Error: "InDesign not responding"**
- Ensure InDesign is open and a document is active
- Check macOS permissions (System Preferences → Security → Automation)
- Grant Terminal/Claude Code permission to control InDesign

**Error: "MCP server not found"**
- Verify the path in mcp.json is correct
- Restart Claude Code after config changes

**Error: "ExtendScript error"**
- Update InDesign to 2025 version
- Check InDesign preferences → Scripting → Enable ExtendScript

---

## Additional Resources

- **MCP Documentation:** https://docs.claude.com/en/docs/claude-code/mcp
- **InDesign Scripting Guide:** https://www.adobe.com/devnet/indesign/scripting.html
- **Chris Enea's InDesign MCP:** https://github.com/chris-enea/indesign-mcp
- **Nilasa's InDesign MCP:** https://github.com/nilasa/indesign-mcp

---

## For Altered.Earth Journizine Workflow

**Recommended Workflow:**
1. **Design template in InDesign** (set up master pages, styles, grids)
2. **Use Claude Code + MCP to:**
   - Bulk import journal prompts
   - Apply consistent text styles
   - Find/replace placeholder text with finalized content
   - Export spreads for review

**Example Prompt for Claude:**
```
"Using the InDesign MCP, apply the 'Body Text 4th Grade' paragraph style
to all journal prompts on pages 20-50, then replace all instances of
'[PROMPT]' with the simplified prompts from prompts-simplified.md"
```

This way, you can design visually in InDesign but get editing help from Claude Code!

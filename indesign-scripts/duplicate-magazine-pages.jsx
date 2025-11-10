// ALTERED.EARTH JOURNIZINE - Duplicate Magazine Article Pages
// This script duplicates a template page to create all magazine article pages
// Based on FEELINGS-UNPLUGGED-CONTENT-PLAN.md

#target indesign

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;

    if (doc.pages.length === 0) {
        alert("This document has no pages. Please create at least one page first.");
        return;
    }

    // Ask user which page to use as template
    var pageNum = prompt("Which page number should I use as the template?\n(Enter a number between 1 and " + doc.pages.length + ")", "1");

    if (pageNum === null) return; // User cancelled

    pageNum = parseInt(pageNum);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > doc.pages.length) {
        alert("Invalid page number. Please enter a number between 1 and " + doc.pages.length);
        return;
    }

    var templatePage = doc.pages[pageNum - 1]; // Convert to 0-indexed

    // Magazine articles structure (article name: page count)
    var articles = [
        {name: "Welcome to Feelings Unplugged", pages: 4},
        {name: "Your Brain Is Changing", pages: 6},
        {name: "Meet the Academy", pages: 8},
        {name: "Shadow Work for Beginners", pages: 6},
        {name: "When Journaling Isn't Enough", pages: 4},
        {name: "Playlist as Medicine", pages: 6},
        {name: "Glossary of Feelings", pages: 4},
        {name: "How to Use This Journal", pages: 2},
        {name: "Resource Directory", pages: 6}
    ];

    // Calculate total pages needed
    var totalPages = 0;
    for (var i = 0; i < articles.length; i++) {
        totalPages += articles[i].pages;
    }

    // Confirm with user
    var userConfirm = confirm(
        "This will duplicate page " + pageNum + " to create " + totalPages + " pages for magazine articles.\n\n" +
        "Articles to create:\n" +
        "• Welcome to Feelings Unplugged (4 pages)\n" +
        "• Your Brain Is Changing (6 pages)\n" +
        "• Meet the Academy (8 pages)\n" +
        "• Shadow Work for Beginners (6 pages)\n" +
        "• When Journaling Isn't Enough (4 pages)\n" +
        "• Playlist as Medicine (6 pages)\n" +
        "• Glossary of Feelings (4 pages)\n" +
        "• How to Use This Journal (2 pages)\n" +
        "• Resource Directory (6 pages)\n\n" +
        "Total: " + totalPages + " pages\n\n" +
        "Continue?"
    );

    if (!userConfirm) return;

    // Duplicate pages for each article
    var pageCounter = 0;

    for (var i = 0; i < articles.length; i++) {
        var article = articles[i];

        for (var p = 0; p < article.pages; p++) {
            try {
                // Duplicate the template page at the end of the document
                var newPage = doc.pages.add(LocationOptions.AT_END);

                // Copy all page items from template to new page
                for (var j = 0; j < templatePage.allPageItems.length; j++) {
                    templatePage.allPageItems[j].duplicate(newPage);
                }

                // Copy applied master spread if any
                if (templatePage.appliedMaster) {
                    newPage.appliedMaster = templatePage.appliedMaster;
                }

                pageCounter++;

                // Add a label to the page (helps with organization)
                try {
                    newPage.label = article.name + " - Page " + (p + 1);
                } catch (e) {
                    // Some InDesign versions don't support page labels
                }
            } catch (err) {
                alert("Error duplicating page: " + err.message + "\nLine: " + err.line);
                return;
            }
        }
    }

    alert("Success!\n\nCreated " + pageCounter + " new pages for magazine articles.\n\nPages are labeled by article name in the Pages panel.");
}

main();

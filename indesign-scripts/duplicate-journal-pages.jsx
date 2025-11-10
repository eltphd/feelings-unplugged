// ALTERED.EARTH JOURNIZINE - Duplicate Journal Spread Pages
// This script creates all daily journal spreads (2-page layouts)
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

    // Show current page count
    var totalExistingPages = doc.pages.length;

    // Ask user which page to use as template
    var pageNum = prompt("Your document has " + totalExistingPages + " pages.\n\n" +
                        "Which page number should I use as the template?\n" +
                        "(Enter a number between 1 and " + totalExistingPages + ")", "1");

    if (pageNum === null) return; // User cancelled

    pageNum = parseInt(pageNum);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > totalExistingPages) {
        alert("Invalid page number. Please enter a number between 1 and " + totalExistingPages);
        return;
    }

    // Get the template page with error handling
    var templatePage;
    try {
        templatePage = doc.pages.item(pageNum - 1);
        if (!templatePage.isValid) {
            alert("Page " + pageNum + " is not valid. Please try a different page.");
            return;
        }
    } catch (e) {
        alert("Error accessing page " + pageNum + ": " + e.message + "\n\nPlease try a different page number.");
        return;
    }

    // Journal structure
    var dailySpreads = 30; // 30 days × 2 pages = 60 pages
    var weeklyDeepDives = 8; // 8 weeks × 2 pages = 16 pages
    var creativeSections = [
        {name: "Playlist Builder", pages: 5},
        {name: "Emotion Tracker", pages: 4},
        {name: "Doodle Pages", pages: 5},
        {name: "Collage Pages", pages: 2},
        {name: "Letter to Future Self", pages: 1},
        {name: "Letter to Shadow", pages: 1}
    ];

    // Calculate totals
    var dailyPages = dailySpreads * 2;
    var weeklyPages = weeklyDeepDives * 2;
    var creativePages = 0;
    for (var i = 0; i < creativeSections.length; i++) {
        creativePages += creativeSections[i].pages;
    }
    var totalPages = dailyPages + weeklyPages + creativePages;

    // Confirm with user
    var userConfirm = confirm(
        "This will create the JOURNAL section pages:\n\n" +
        "DAILY SPREADS:\n" +
        "• 30 days × 2 pages = " + dailyPages + " pages\n\n" +
        "WEEKLY DEEP DIVES:\n" +
        "• 8 weeks × 2 pages = " + weeklyPages + " pages\n\n" +
        "CREATIVE SECTIONS:\n" +
        "• Playlist Builder (5 pages)\n" +
        "• Emotion Tracker (4 pages)\n" +
        "• Doodle Pages (5 pages)\n" +
        "• Collage Pages (2 pages)\n" +
        "• Letters (2 pages)\n" +
        "= " + creativePages + " pages\n\n" +
        "TOTAL: " + totalPages + " journal pages\n\n" +
        "Continue?"
    );

    if (!userConfirm) return;

    var pageCounter = 0;

    // Helper function to create a new page from template
    function createPageFromTemplate(label) {
        try {
            var newPage = doc.pages.add(LocationOptions.AT_END);

            // Copy all page items from template
            for (var j = 0; j < templatePage.allPageItems.length; j++) {
                templatePage.allPageItems[j].duplicate(newPage);
            }

            // Copy applied master spread if any
            if (templatePage.appliedMaster) {
                newPage.appliedMaster = templatePage.appliedMaster;
            }

            // Add label
            try {
                newPage.label = label;
            } catch (e) {
                // Some versions don't support labels
            }

            return newPage;
        } catch (err) {
            alert("Error creating page: " + err.message);
            return null;
        }
    }

    // Create daily spreads (30 days)
    for (var day = 1; day <= dailySpreads; day++) {
        // Left page (Morning + Midday)
        if (createPageFromTemplate("Day " + day + " - Left (Morning/Midday)")) {
            pageCounter++;
        }

        // Right page (Evening + Doodle)
        if (createPageFromTemplate("Day " + day + " - Right (Evening/Doodle)")) {
            pageCounter++;
        }

        // Add weekly deep dive after every 7 days
        if (day % 7 === 0 && day <= 28) {
            var weekNum = Math.floor(day / 7);

            // Weekly deep dive spread (2 pages)
            if (createPageFromTemplate("Week " + weekNum + " Deep Dive - Left")) {
                pageCounter++;
            }
            if (createPageFromTemplate("Week " + weekNum + " Deep Dive - Right")) {
                pageCounter++;
            }
        }
    }

    // Create creative section pages
    for (var i = 0; i < creativeSections.length; i++) {
        var section = creativeSections[i];

        for (var p = 0; p < section.pages; p++) {
            if (createPageFromTemplate(section.name + " - Page " + (p + 1))) {
                pageCounter++;
            }
        }
    }

    alert("Success!\n\nCreated " + pageCounter + " journal pages.\n\nBreakdown:\n" +
           "• " + (dailySpreads * 2) + " daily spread pages\n" +
           "• " + (weeklyDeepDives * 2) + " weekly deep dive pages\n" +
           "• " + creativePages + " creative section pages\n\n" +
           "All pages are labeled in the Pages panel.");
}

main();

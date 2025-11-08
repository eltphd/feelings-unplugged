// ALTERED.EARTH JOURNIZINE - Delete Extra Pages
// This script deletes pages after a specified page number

#target indesign

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;
    var totalPages = doc.pages.length;

    if (totalPages === 0) {
        alert("This document has no pages.");
        return;
    }

    // Ask user which page to keep up to
    var keepUpTo = prompt("Your document has " + totalPages + " pages.\n\n" +
                         "Enter the LAST page number you want to KEEP.\n" +
                         "All pages after this will be DELETED.\n\n" +
                         "For example, enter '3' to keep pages 1-3 and delete everything else.", "3");

    if (keepUpTo === null) return; // User cancelled

    keepUpTo = parseInt(keepUpTo);
    if (isNaN(keepUpTo) || keepUpTo < 1 || keepUpTo >= totalPages) {
        alert("Invalid page number. Please enter a number between 1 and " + (totalPages - 1));
        return;
    }

    var pagesToDelete = totalPages - keepUpTo;

    var userConfirm = confirm("This will DELETE " + pagesToDelete + " pages.\n\n" +
                             "You will keep pages 1-" + keepUpTo + "\n" +
                             "Pages " + (keepUpTo + 1) + "-" + totalPages + " will be DELETED.\n\n" +
                             "This cannot be undone!\n\n" +
                             "Continue?");

    if (!userConfirm) return;

    // Delete pages from the end backwards (safer)
    var deletedCount = 0;
    for (var i = totalPages - 1; i >= keepUpTo; i--) {
        try {
            doc.pages[i].remove();
            deletedCount++;
        } catch (err) {
            alert("Error deleting page " + (i + 1) + ": " + err.message);
            break;
        }
    }

    alert("Success!\n\nDeleted " + deletedCount + " pages.\n" +
          "Your document now has " + doc.pages.length + " pages.");
}

main();

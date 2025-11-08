// ALTERED.EARTH JOURNIZINE - Insert "Playlist as Medicine" Article
// This script inserts the article content into selected text frames
// Based on article-playlist-as-medicine.md

#target indesign

function main() {
    if (app.documents.length === 0) {
        alert("Please open a document first.");
        return;
    }

    var doc = app.activeDocument;

    // Article content organized by page
    var articlePages = [
        // PAGE 1: TITLE & INTRO
        "PLAYLIST AS MEDICINE\n" +
        "How music changes your mood (and how to use it)\n\n" +
        "Have you ever felt sad, then played a song that made you cry even more—and somehow, you felt better?\n\n" +
        "Or maybe you were nervous before a big game, so you put on your pump-up playlist and felt braver?\n\n" +
        "That's not magic. That's your brain.\n\n" +
        "Music is medicine for your feelings.\n\n" +
        "And the best part? You already know how to use it.",

        // PAGE 2: THE SCIENCE
        "YOUR BRAIN ON MUSIC\n\n" +
        "When you listen to music, your brain releases chemicals that change how you feel.\n\n" +
        "Here's what happens:\n\n" +
        "When you listen to a song you love:\n" +
        "• Your brain releases dopamine (the "feel-good" chemical)\n" +
        "• Your heart rate can slow down or speed up (depending on the beat)\n" +
        "• Your body relaxes or gets energized\n\n" +
        "When you listen to sad music when you're sad:\n" +
        "• It's called "matching your mood"\n" +
        "• Your brain feels understood (like someone gets it)\n" +
        "• Crying to music can actually help you feel better\n\n" +
        "When you listen to upbeat music:\n" +
        "• Your brain gets energized\n" +
        "• You might feel more confident\n" +
        "• It can help you focus or move your body\n\n" +
        "DID YOU KNOW?\n\n" +
        "Music can:\n" +
        "• Lower stress (slow songs help you calm down)\n" +
        "• Give you energy (fast songs pump you up)\n" +
        "• Help you remember things (that's why songs get stuck in your head)\n" +
        "• Make you feel less alone (lyrics that say what you feel)",

        // PAGE 3: THE 5 PLAYLISTS
        "BUILD YOUR EMOTIONAL TOOLKIT\n\n" +
        "Think of playlists like a first-aid kit—but for your feelings.\n\n" +
        "When you feel a big emotion, you can pick the playlist that matches.\n\n" +
        "Here are the 5 playlists everyone should have:\n\n" +
        "1. MAD PLAYLIST - When you're angry and need to let it out\n" +
        "Songs that have loud guitars or drums, match your anger (don't fight it, feel it), and help you scream or move your body.\n" +
        "Why it works: Your brain needs to release the anger. Music gives it a safe place to go.\n\n" +
        "2. SAD PLAYLIST - When you need to cry or feel your feelings\n" +
        "Songs that are slow and soft, have lyrics that say what you feel, and make you cry (and that's okay).\n" +
        "Why it works: Crying releases stress hormones. Sad music helps you let it out.\n\n" +
        "3. HAPPY PLAYLIST - When you want to celebrate or feel good\n" +
        "Songs that make you want to dance, have happy lyrics, and remind you of good times.\n" +
        "Why it works: Upbeat music boosts dopamine (the happy chemical).\n\n" +
        "4. CALM PLAYLIST - When you need to breathe and slow down\n" +
        "Songs that are gentle and quiet, have no lyrics (or soft ones), and feel like a warm blanket.\n" +
        "Why it works: Slow music lowers your heart rate and helps your body relax.\n\n" +
        "5. HYPED PLAYLIST - When you need energy or confidence\n" +
        "Songs that have a strong beat, make you feel like a superhero, and pump you up before something big.\n" +
        "Why it works: Fast music gets your adrenaline going. It tricks your brain into feeling braver.",

        // PAGE 4: TEMPLATES (MAD + SAD)
        "MAD PLAYLIST\n" +
        "When I'm angry and need to let it out\n\n" +
        "Song 1: _________________________________\n" +
        "Song 2: _________________________________\n" +
        "Song 3: _________________________________\n" +
        "Song 4: _________________________________\n" +
        "Song 5: _________________________________\n" +
        "Song 6: _________________________________\n" +
        "Song 7: _________________________________\n" +
        "Song 8: _________________________________\n" +
        "Song 9: _________________________________\n" +
        "Song 10: _________________________________\n\n" +
        "SAD PLAYLIST\n" +
        "When I need to cry or feel my feelings\n\n" +
        "Song 1: _________________________________\n" +
        "Song 2: _________________________________\n" +
        "Song 3: _________________________________\n" +
        "Song 4: _________________________________\n" +
        "Song 5: _________________________________\n" +
        "Song 6: _________________________________\n" +
        "Song 7: _________________________________\n" +
        "Song 8: _________________________________\n" +
        "Song 9: _________________________________\n" +
        "Song 10: _________________________________",

        // PAGE 5: TEMPLATES (HAPPY + CALM)
        "HAPPY PLAYLIST\n" +
        "When I want to celebrate or feel good\n\n" +
        "Song 1: _________________________________\n" +
        "Song 2: _________________________________\n" +
        "Song 3: _________________________________\n" +
        "Song 4: _________________________________\n" +
        "Song 5: _________________________________\n" +
        "Song 6: _________________________________\n" +
        "Song 7: _________________________________\n" +
        "Song 8: _________________________________\n" +
        "Song 9: _________________________________\n" +
        "Song 10: _________________________________\n\n" +
        "CALM PLAYLIST\n" +
        "When I need to breathe and slow down\n\n" +
        "Song 1: _________________________________\n" +
        "Song 2: _________________________________\n" +
        "Song 3: _________________________________\n" +
        "Song 4: _________________________________\n" +
        "Song 5: _________________________________\n" +
        "Song 6: _________________________________\n" +
        "Song 7: _________________________________\n" +
        "Song 8: _________________________________\n" +
        "Song 9: _________________________________\n" +
        "Song 10: _________________________________",

        // PAGE 6: HYPED + HOW TO USE
        "HYPED PLAYLIST\n" +
        "When I need energy or confidence\n\n" +
        "Song 1: _________________________________\n" +
        "Song 2: _________________________________\n" +
        "Song 3: _________________________________\n" +
        "Song 4: _________________________________\n" +
        "Song 5: _________________________________\n" +
        "Song 6: _________________________________\n" +
        "Song 7: _________________________________\n" +
        "Song 8: _________________________________\n" +
        "Song 9: _________________________________\n" +
        "Song 10: _________________________________\n\n" +
        "HOW TO USE YOUR PLAYLISTS\n\n" +
        "Step 1: Name your emotion\n" +
        "Ask yourself: "How do I feel right now?"\n\n" +
        "Step 2: Pick the matching playlist\n" +
        "Don't try to "fix" your emotion. Match it first.\n\n" +
        "Step 3: Let the music do its work\n" +
        "Listen. Cry. Dance. Scream into a pillow. Move your body. It's all okay.\n\n" +
        "Step 4: Notice how you feel after\n" +
        "Did it help? Do you feel lighter? If yes, add more songs to that playlist.\n\n" +
        "REMEMBER:\n\n" +
        "There's no "right" music. Whatever helps YOU feel better is the right choice.\n\n" +
        "You can update these anytime. Songs that help you today might change next month. That's normal.\n\n" +
        "Music isn't a cure—it's a tool. If you're feeling really bad every day, talk to an adult you trust. Music can help, but sometimes you need more support. And that's okay.\n\n" +
        '"Your feelings deserve a soundtrack."'
    ];

    // Find pages labeled "Playlist as Medicine"
    var playlistPages = [];
    for (var i = 0; i < doc.pages.length; i++) {
        var page = doc.pages[i];
        if (page.label && page.label.indexOf("Playlist as Medicine") !== -1) {
            playlistPages.push(page);
        }
    }

    if (playlistPages.length === 0) {
        alert("No pages found with 'Playlist as Medicine' label.\n\n" +
              "Please make sure you've run the duplicate-magazine-pages script first,\n" +
              "or manually label the pages you want to use.");
        return;
    }

    if (playlistPages.length < 6) {
        var proceed = confirm("Found only " + playlistPages.length + " pages labeled 'Playlist as Medicine'.\n" +
                             "The article has 6 pages of content.\n\n" +
                             "Continue anyway?");
        if (!proceed) return;
    }

    // Insert content into text frames
    var pagesProcessed = 0;
    var framesProcessed = 0;

    for (var i = 0; i < playlistPages.length && i < articlePages.length; i++) {
        var page = playlistPages[i];
        var content = articlePages[i];

        // Get all text frames on this page
        var textFrames = page.textFrames;

        if (textFrames.length === 0) {
            alert("Page " + (i + 1) + " (" + page.label + ") has no text frames.\n" +
                  "Please add a text frame to this page first.");
            continue;
        }

        // Insert content into the first text frame on the page
        try {
            textFrames[0].contents = content;
            pagesProcessed++;
            framesProcessed++;
        } catch (err) {
            alert("Error inserting content on page " + (i + 1) + ": " + err.message);
        }
    }

    alert("Success!\n\n" +
          "Inserted article content into " + pagesProcessed + " pages.\n" +
          "Text frames updated: " + framesProcessed + "\n\n" +
          "Note: You may need to adjust formatting, text size, and layout manually.");
}

main();

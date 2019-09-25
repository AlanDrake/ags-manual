var SEARCH_CHECK_MS = 600;
var search_input;
var search_results;
var search_check;
var previous_query;

window.onload = function() { init(); }

function init() {
    search_input = document.getElementById('search_input');
    search_results = document.getElementById('search_results');
    previous_search = search_input.value;
    search_check = setInterval(search, SEARCH_CHECK_MS);
}

function search() {
    var query = search_input.value;

    if (query !== previous_query) {
        previous_query = query;
        update_results(query.split(/\s+/))
    }
}

function update_results(words) {
    //remove exiting entries
    while (search_results.firstChild) {
        search_results.removeChild(search_results.firstChild);
    }

    var track = { "total": Object.create(null), "which": Object.create(null) }

    words.forEach(word => {
        if (word in meta.keywords) {
            var max = Object.keys(meta.keywords[word]).length;

            for (var i = 0; i < max; i ++) {
            Object.keys(meta.keywords[word][i]).forEach(docname => {
                    // add counts for multiple hits
                    if (docname in track.total) {
                        track.total[docname] += meta.keywords[word][i][docname];
                    } else {
                        track.total[docname] = meta.keywords[word][i][docname];
                    }

                    // track which search words were found
                    if (!(docname in track.which)) {
                        track.which[docname] = {}
                    }

                    track.which[docname][word] = meta.keywords[word][i][docname]
               })
            }
        }
    });

    if (Object.keys(track.total).length === 0 && words[0] !== '') {
        var li = document.createElement('li');
        li.innerHTML = 'No match';
        li.className = 'search-nomatch';
        search_results.appendChild(li);
        return;
    }

    Object.keys(track.total).sort(function(a, b) {return track.total[b] - track.total[a]}).forEach(docname => {
        var found_by = Object.keys(track.which[docname])
        var title = meta.titles[docname] + ' ' + JSON.stringify(track.which[docname])

        var a = document.createElement('a');
        a.appendChild(document.createTextNode(title));
        a.title = title;
        a.href = docname + '.html?highlight=' + encodeURIComponent(found_by.join(' '))

        var li = document.createElement('li');
        li.appendChild(a);
        li.className = 'search-match';
        search_results.appendChild(li);
    });
}

var meta = {
  "titles": {
    "EventTypes": "Event Types",
    "Room": "Room functions and properties",
    "AudioClip": "AudioClip functions and properties",
    "Tumbleweed_door": "Door functions",
    "TemplateVerbcoin": "VerbCoin template",
    "SystemRequirements": "System Requirements",
    "Tumbleweed_player": "Player functions",
    "IntegrationWithWindows": "Integration with Windows",
    "Plugins": "Plugins",
    "UpgradeTo335": "Upgrading to AGS 3.3.5",
    "CustomDialogOptions": "Custom dialog options rendering",
    "Parser": "Parser functions",
    "Tumbleweed_movement": "Semi-blocking movement functions",
    "Multimedia": "Multimedia functions",
    "UpgradeTo350": "Upgrading to 3.5.0",
    "Object": "Object functions and properties",
    "RuntimeEngine": "The run-time engine",
    "Globalfunctions_Room": "Global functions: room actions",
    "Debuggingfeatures": "Debugging features",
    "GUI": "GUI functions and properties",
    "Globalfunctions_Message": "Global functions: Message Display",
    "Pointers": "Pointers in AGS",
    "ScriptingTutorialPart1": "Scripting Tutorial",
    "UpgradeTo30": "Upgrading to AGS 3.0",
    "UpgradeTo33": "Upgrading to AGS 3.3",
    "TemplateBASS": "BASS template",
    "EditorInventoryItems": "Inventory Items Editor",
    "Mouse": "Mouse functions and properties",
    "EditorSprite": "Sprite Manager",
    "Button": "Button functions and properties",
    "Tumbleweed": "Tumbleweed",
    "EditorCharacter": "Character Editor",
    "ASCIIcodes": "ASCII code table",
    "ListBox": "ListBox functions and properties",
    "AdvancedRoomFeatures": "Advanced room features",
    "InventoryItem": "InventoryItem functions and properties",
    "GUIControl": "GUIControl functions and properties",
    "BlockingScripts": "Understanding blocking scripts",
    "EditorView": "View Editor",
    "Credits": "Credits",
    "SystemLimits": "System limits",
    "acintro": "Editor Tutorial",
    "StartingOff": "Starting off",
    "MusicAndSound": "Music and sound",
    "Maths": "Maths functions and properties",
    "Hotspot": "Hotspot functions and properties",
    "File": "File functions and properties",
    "TextScriptEvents": "Predefined global script functions",
    "acintro8": "Getting Started with AGS - Part 8",
    "TheScriptHeader": "The script header",
    "InvWindow": "InvWindow functions and properties",
    "FAQ": "Frequently Asked Questions",
    "Speech": "Speech functions and properties",
    "UpgradeTo32": "Upgrading to AGS 3.2",
    "ViewFrame": "ViewFrame functions and properties",
    "Translations": "Translations",
    "acintro1": "Getting Started with AGS",
    "DynamicArrays": "Dynamic Arrays",
    "EditorRoom": "Room Editor",
    "GlobalVariables": "Global variables",
    "Character": "Character functions and properties",
    "Set": "Set Functions and Properties",
    "Tumbleweed_extensions": "Extensions",
    "UpgradeTo31": "Upgrading to AGS 3.1",
    "acintro3": "Getting Started with AGS - Part 3",
    "DialogOptionsRenderingInfo": "DialogOptionsRenderingInfo functions and properties",
    "Screen": "Screen Functions and Properties",
    "EditingGUIs": "Editing the GUIs",
    "Scripting": "Scripting API",
    "Game": "Game functions",
    "Tutorial": "Tutorial",
    "TroubleshootingWindowsZoneID": "Troubleshooting Windows Zone Identifier",
    "acintro5": "Getting Started with AGS - Part 5",
    "Viewport": "Viewport functions and properties",
    "Templates": "New Game templates",
    "DateTime": "DateTime functions and properties",
    "UpgradingTo271": "Upgrading to AGS 2.71",
    "ContactingTheDevelopers": "Contacting the developers",
    "Gamevariables": "Game variables",
    "UpgradingFromPreviousVersion": "Upgrading from a previous version",
    "System": "System functions and properties",
    "Slider": "Slider properties",
    "Settingupthegame": "Setting up the game",
    "AutonumberSpeechFiles": "Auto-number speech files",
    "Copyright": "Copyright and terms of use",
    "GraphicsDriver": "Graphics driver selection",
    "OtherFeatures": "Other Features",
    "Region": "Region functions and properties",
    "Reference": "Reference",
    "AnonymousUsageInfo": "Anonymous usage information",
    "acintro2": "Getting Started with AGS - Part 2",
    "BackingUpYourGame": "Backing up your game",
    "RepExec": "repeatedly_execute (_always)",
    "StandardEnums": "Standard Enumerated Types",
    "Overlay": "Overlay functions and properties",
    "Preprocessor": "Preprocessor",
    "TemplateSierraStyle": "Sierra-style template",
    "Label": "Label functions and properties",
    "Dictionary": "Dictionary Functions and Properties",
    "ScriptingLanguage": "Scripting Language",
    "acintro6": "Getting Started with AGS - Part 6",
    "SourceControl": "Source Control integration",
    "StandardTypes": "Standard Types",
    "CustomProperties": "Custom Properties",
    "Tumbleweed_unhandled": "Unhandled Events",
    "Camera": "Camera functions and properties",
    "Dialog": "Dialog functions and properties",
    "OOProgramming": "Object Oriented Programming",
    "TextWindowGUI": "TextWindowGUI functions and properties",
    "TextParser": "The text parser",
    "acintro7": "Getting Started with AGS - Part 7",
    "Globalfunctions_General": "Global functions: general section",
    "DynamicSprite": "DynamicSprite functions and properties",
    "acintro9": "Getting Started with AGS - Part 9",
    "Setup": "Run-time engine setup",
    "Tumbleweed_helper": "Math and Helper Functions",
    "ScriptingTutorialPart2": "Text Scripting Tutorial - Part 2",
    "DistGame": "Distributing your game",
    "KeyboardShortcuts": "Keyboard Shortcuts",
    "AudioChannel": "AudioChannel functions and properties",
    "TextBox": "TextBox functions and properties",
    "DrawingSurfaceFunctions": "DrawingSurface functions and properties",
    "Globalfunctions_Screen": "Global functions: Screen Effects",
    "CallingGlobalFunctions": "Calling global functions from local scripts",
    "Globalfunctions_Palette": "Global functions: Palette Operations",
    "UpgradeTo34": "Upgrading to AGS 3.4",
    "String": "String functions",
    "Tumbleweed_actions": "Action Functions",
    "ScriptModules": "Multiple Scripts",
    "Lipsync": "Lip sync",
    "Introduction": "Introduction",
    "Tumbleweed_translation": "Translation",
    "ScriptKeywords": "Script language keywords",
    "UpgradingTo27": "Upgrading to AGS 2.7",
    "StringFormats": "String formatting",
    "UpgradeTo341": "Upgrading to AGS 3.4.1",
    "ExtenderFunctions": "Extender functions",
    "acintro4": "Getting Started with AGS - Part 4"
  },
  "keywords": {
    "-verb": {
      "0": { "Tumbleweed": 1 }
    },
    "A": {
      "0": { "File": 1 }
    },
    "A's": {
      "0": { "FAQ": 1 }
    },
    "a-key": {
      "0": { "Dictionary": 2 }
    },
    "a-value": {
      "0": { "Dictionary": 2 }
    },
    "a-z": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "A-Z": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "AAAAARRRRGGGGHHHHHH": {
      "0": { "ExtenderFunctions": 1 }
    },
    "aAftermath": {
      "0": { "AudioClip": 2 }
    },
    "AARRRGGGHHH": {
      "0": { "ExtenderFunctions": 1 }
    },
    "AB": {
      "0": { "File": 1 }
    },
    "aback": {
      "0": { "UpgradeTo30": 1 }
    },
    "ability": {
      "0": { "ScriptKeywords": 1 }
    },
    "able": {
      "0": { "Settingupthegame": 5 },
      "1": { "Multimedia": 3 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "UpgradeTo31": 1 }
    },
    "abort": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "Abort": {
      "0": { "Gamevariables": 1 }
    },
    "aborted": {
      "0": { "Globalfunctions_General": 1 }
    },
    "AbortGame": {
      "0": { "Globalfunctions_General": 4 }
    },
    "aborting": {
      "0": { "ScriptKeywords": 1 }
    },
    "Aborts": {
      "0": { "Globalfunctions_General": 1 }
    },
    "about": {
      "0": { "acintro8": 7 },
      "1": { "Settingupthegame": 6 },
      "2": { "Globalfunctions_Room": 4 },
      "3": { "Character": 3 },
      "4": { "Overlay": 2 },
      "5": { "acintro4": 1 }
    },
    "Above": {
      "0": { "Screen": 1 }
    },
    "above": {
      "0": { "Character": 7 },
      "1": { "Settingupthegame": 6 },
      "2": { "MusicAndSound": 2 },
      "3": { "TextWindowGUI": 1 }
    },
    "AbsInt": {
      "0": { "ExtenderFunctions": 3 }
    },
    "absolute": {
      "0": { "Settingupthegame": 2 },
      "1": { "InventoryItem": 1 }
    },
    "absolutely": {
      "0": { "Room": 1 }
    },
    "absorbs": {
      "0": { "GUIControl": 1 }
    },
    "abstauber": {
      "0": { "Credits": 2 }
    },
    "Abstauber": {
      "0": { "Tumbleweed": 1 }
    },
    "accelerated": {
      "0": { "GraphicsDriver": 2 }
    },
    "acceleration": {
      "0": { "System": 2 },
      "1": { "Setup": 1 }
    },
    "accept": {
      "0": { "Settingupthegame": 3 },
      "1": { "UpgradeTo31": 1 }
    },
    "acceptable": {
      "0": { "GUIControl": 1 }
    },
    "accepted": {
      "0": { "Speech": 2 }
    },
    "accepts": {
      "0": { "Settingupthegame": 2 },
      "1": { "Preprocessor": 1 }
    },
    "access": {
      "0": { "ScriptKeywords": 7 },
      "1": { "UpgradingTo27": 4 },
      "2": { "MusicAndSound": 3 },
      "3": { "acintro1": 2 },
      "4": { "Copyright": 1 }
    },
    "Access": {
      "0": { "OOProgramming": 2 }
    },
    "accessed": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Pointers": 1 }
    },
    "accesses": {
      "0": { "DateTime": 1 }
    },
    "accessible": {
      "0": { "Character": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Accessing": {
      "0": { "ScriptKeywords": 1 }
    },
    "accessing": {
      "0": { "GUI": 1 }
    },
    "accessors": {
      "0": { "OOProgramming": 1 }
    },
    "accident": {
      "0": { "Game": 1 }
    },
    "accidentally": {
      "0": { "Pointers": 2 }
    },
    "accompanied": {
      "0": { "UpgradeTo33": 1 }
    },
    "accomplish": {
      "0": { "UpgradeTo350": 1 }
    },
    "according": {
      "0": { "GUIControl": 1 }
    },
    "accordingly": {
      "0": { "Character": 1 }
    },
    "account": {
      "0": { "Viewport": 3 },
      "1": { "Screen": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "accounting": {
      "0": { "System": 4 }
    },
    "Accuracy": {
      "0": { "ScriptKeywords": 1 }
    },
    "accuracy": {
      "0": { "Lipsync": 1 }
    },
    "accurate": {
      "0": { "RepExec": 1 }
    },
    "accurately": {
      "0": { "UpgradeTo32": 1 }
    },
    "achieve": {
      "0": { "Mouse": 1 }
    },
    "achievements": {
      "0": { "Settingupthegame": 1 }
    },
    "achieving": {
      "0": { "MusicAndSound": 1 }
    },
    "acknowledge": {
      "0": { "DistGame": 1 }
    },
    "acolor": {
      "0": { "CustomDialogOptions": 4 }
    },
    "across": {
      "0": { "RepExec": 2 },
      "1": { "acintro2": 1 }
    },
    "acsetup": {
      "0": { "UpgradeTo341": 1 }
    },
    "ACSPRSET": {
      "0": { "Templates": 1 }
    },
    "acsprset": {
      "0": { "UpgradeTo350": 1 }
    },
    "act": {
      "0": { "Tumbleweed_door": 4 },
      "1": { "Region": 1 }
    },
    "action": {
      "0": { "Tumbleweed_actions": 13 },
      "1": { "Tumbleweed_movement": 6 },
      "2": { "Tumbleweed_extensions": 5 },
      "3": { "TemplateVerbcoin": 4 },
      "4": { "Settingupthegame": 3 },
      "5": { "Tumbleweed_helper": 2 },
      "6": { "TemplateBASS": 1 }
    },
    "Action": {
      "0": { "Tumbleweed_actions": 7 },
      "1": { "Tumbleweed": 1 }
    },
    "ActionLabel": {
      "0": { "TemplateBASS": 3 }
    },
    "actions": {
      "0": { "Tumbleweed": 3 },
      "1": { "Scripting": 2 },
      "2": { "Region": 1 }
    },
    "activate": {
      "0": { "Character": 1 }
    },
    "activated": {
      "0": { "Settingupthegame": 2 },
      "1": { "Region": 1 }
    },
    "activating": {
      "0": { "Character": 1 }
    },
    "activation": {
      "0": { "acintro5": 1 }
    },
    "active": {
      "0": { "EditorInventoryItems": 5 },
      "1": { "System": 4 },
      "2": { "DialogOptionsRenderingInfo": 3 },
      "3": { "acintro9": 2 },
      "4": { "EditorSprite": 1 }
    },
    "Active": {
      "0": { "InventoryItem": 1 }
    },
    "activeinv": {
      "0": { "Character": 1 }
    },
    "ActiveInventory": {
      "0": { "Character": 3 },
      "1": { "EventTypes": 2 }
    },
    "ActiveOptionID": {
      "0": { "CustomDialogOptions": 12 },
      "1": { "DialogOptionsRenderingInfo": 5 }
    },
    "acts": {
      "0": { "Character": 1 }
    },
    "actual": {
      "0": { "Settingupthegame": 7 },
      "1": { "ScriptKeywords": 4 },
      "2": { "OOProgramming": 3 },
      "3": { "Speech": 2 },
      "4": { "ExtenderFunctions": 1 }
    },
    "Actually": {
      "0": { "Settingupthegame": 1 }
    },
    "actually": {
      "0": { "Settingupthegame": 5 },
      "1": { "Tumbleweed_movement": 3 },
      "2": { "UpgradingTo27": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "ACWIN": {
      "0": { "Game": 1 }
    },
    "adapt": {
      "0": { "EditorRoom": 1 }
    },
    "add": {
      "0": { "EditingGUIs": 8 },
      "1": { "Settingupthegame": 7 },
      "2": { "ScriptKeywords": 6 },
      "3": { "CustomDialogOptions": 5 },
      "4": { "Tumbleweed": 4 },
      "5": { "acintro7": 3 },
      "6": { "SourceControl": 2 },
      "7": { "Dictionary": 1 }
    },
    "Add": {
      "0": { "Set": 9 },
      "1": { "EditingGUIs": 4 },
      "2": { "CustomProperties": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "addAtIndex": {
      "0": { "Character": 2 }
    },
    "added": {
      "0": { "EditorView": 3 },
      "1": { "ScriptKeywords": 2 },
      "2": { "acintro5": 1 }
    },
    "AddExtension": {
      "0": { "Tumbleweed_extensions": 3 }
    },
    "Adding": {
      "0": { "acintro2": 1 }
    },
    "adding": {
      "0": { "Set": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "AddInvAndPlaySound": {
      "0": { "ScriptKeywords": 2 }
    },
    "addinventory": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "AddInventory": {
      "0": { "Character": 8 },
      "1": { "InventoryItem": 4 },
      "2": { "ScriptingTutorialPart1": 3 },
      "3": { "ScriptKeywords": 2 },
      "4": { "acintro5": 1 }
    },
    "AddInventoryToCharacter": {
      "0": { "Character": 1 }
    },
    "AddItem": {
      "0": { "ListBox": 13 },
      "1": { "EditingGUIs": 1 }
    },
    "addition": {
      "0": { "EditorRoom": 2 },
      "1": { "TextWindowGUI": 1 }
    },
    "additional": {
      "0": { "Screen": 2 },
      "1": { "Parser": 1 }
    },
    "Additionally": {
      "0": { "StandardEnums": 1 }
    },
    "additionally": {
      "0": { "ScriptKeywords": 1 }
    },
    "additions": {
      "0": { "UpgradingTo27": 2 },
      "1": { "acintro3": 1 }
    },
    "AddNumbers": {
      "0": { "ScriptModules": 3 }
    },
    "address": {
      "0": { "ScriptKeywords": 2 }
    },
    "addressed": {
      "0": { "UpgradingTo271": 1 }
    },
    "addressing": {
      "0": { "MusicAndSound": 1 }
    },
    "adds": {
      "0": { "Tumbleweed_extensions": 1 }
    },
    "Adds": {
      "0": { "ListBox": 1 }
    },
    "AddWaypoint": {
      "0": { "Character": 6 }
    },
    "Adjust": {
      "0": { "Character": 2 }
    },
    "adjust": {
      "0": { "AudioChannel": 5 },
      "1": { "Screen": 1 }
    },
    "adjusted": {
      "0": { "Character": 8 },
      "1": { "Slider": 2 },
      "2": { "AudioChannel": 1 }
    },
    "AdjustGUIText": {
      "0": { "Tumbleweed_translation": 4 }
    },
    "adjusting": {
      "0": { "EventTypes": 1 }
    },
    "AdjustLanguage": {
      "0": { "Tumbleweed_translation": 5 },
      "1": { "Tumbleweed_actions": 1 }
    },
    "adjustment": {
      "0": { "Globalfunctions_General": 1 }
    },
    "adjustments": {
      "0": { "Character": 1 }
    },
    "adjusts": {
      "0": { "TextWindowGUI": 1 }
    },
    "Adjusts": {
      "0": { "GUIControl": 1 }
    },
    "administrative": {
      "0": { "UpgradeTo335": 1 }
    },
    "administrator": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "ado": {
      "0": { "acintro1": 1 }
    },
    "advance": {
      "0": { "acintro8": 1 }
    },
    "Advanced": {
      "0": { "Setup": 3 },
      "1": { "Tutorial": 1 }
    },
    "advanced": {
      "0": { "ScriptingTutorialPart1": 4 },
      "1": { "Setup": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "advantage": {
      "0": { "ScriptKeywords": 1 }
    },
    "advantages": {
      "0": { "UpgradingTo27": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "ADVENTURE": {
      "0": { "Copyright": 1 }
    },
    "adventure": {
      "0": { "acintro1": 2 },
      "1": { "acintro8": 1 }
    },
    "Adventure": {
      "0": { "Introduction": 2 },
      "1": { "acintro1": 1 }
    },
    "adventuregamestudio": {
      "0": { "ContactingTheDevelopers": 2 },
      "1": { "Copyright": 1 }
    },
    "adventurer": {
      "0": { "Hotspot": 1 }
    },
    "advisable": {
      "0": { "Pointers": 1 }
    },
    "advise": {
      "0": { "Game": 1 }
    },
    "advised": {
      "0": { "Mouse": 1 }
    },
    "ADVISED": {
      "0": { "Copyright": 1 }
    },
    "aExplosion": {
      "0": { "AudioChannel": 18 },
      "1": { "AudioClip": 16 },
      "2": { "MusicAndSound": 6 },
      "3": { "UpgradeTo32": 1 }
    },
    "affect": {
      "0": { "Gamevariables": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "affected": {
      "0": { "Character": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "affecting": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "affects": {
      "0": { "Speech": 2 },
      "1": { "TextBox": 1 }
    },
    "AFTER": {
      "0": { "EventTypes": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "After": {
      "0": { "ScriptKeywords": 2 },
      "1": { "DateTime": 1 }
    },
    "after": {
      "0": { "Globalfunctions_General": 7 },
      "1": { "Character": 6 },
      "2": { "Game": 5 },
      "3": { "Tumbleweed": 3 },
      "4": { "Globalfunctions_Screen": 2 },
      "5": { "BlockingScripts": 1 }
    },
    "Afterwards": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "afterwards": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "AudioClip": 1 }
    },
    "aFunnyTalk": {
      "0": { "AudioChannel": 2 }
    },
    "AGA": {
      "0": { "Credits": 2 }
    },
    "again": {
      "0": { "Globalfunctions_Room": 6 },
      "1": { "Settingupthegame": 4 },
      "2": { "Globalfunctions_Screen": 3 },
      "3": { "Mouse": 2 },
      "4": { "GUIControl": 1 }
    },
    "against": {
      "0": { "ScriptKeywords": 3 },
      "1": { "acintro2": 1 }
    },
    "age-old": {
      "0": { "acintro4": 1 }
    },
    "ages": {
      "0": { "Globalfunctions_General": 1 }
    },
    "AGF": {
      "0": { "DistGame": 1 }
    },
    "AGHAST": {
      "0": { "Character": 2 }
    },
    "agree": {
      "0": { "UpgradingTo27": 1 }
    },
    "ags": {
      "0": { "EditorSprite": 1 }
    },
    "AGS": {
      "0": { "Character": 40 },
      "1": { "Settingupthegame": 31 },
      "2": { "ScriptKeywords": 28 },
      "3": { "Game": 26 },
      "4": { "System": 23 },
      "5": { "Globalfunctions_General": 21 },
      "6": { "Pointers": 17 },
      "7": { "UpgradeTo30": 16 },
      "8": { "UpgradeTo32": 14 },
      "9": { "DynamicSprite": 13 },
      "10": { "acintro1": 12 },
      "11": { "acintro9": 11 },
      "12": { "AudioClip": 10 },
      "13": { "UpgradeTo34": 9 },
      "14": { "ContactingTheDevelopers": 8 },
      "15": { "acintro8": 7 },
      "16": { "UpgradeTo341": 6 },
      "17": { "Scripting": 5 },
      "18": { "Hotspot": 4 },
      "19": { "ScriptingTutorialPart2": 3 },
      "20": { "Gamevariables": 2 },
      "21": { "Viewport": 1 }
    },
    "ags-help": {
      "0": { "TroubleshootingWindowsZoneID": 2 }
    },
    "agscircle": {
      "0": { "Plugins": 1 }
    },
    "AGSEditor": {
      "0": { "acintro1": 1 }
    },
    "AGSFNT": {
      "0": { "BackingUpYourGame": 2 }
    },
    "agssave": {
      "0": { "ListBox": 1 }
    },
    "AGT": {
      "0": { "Templates": 1 }
    },
    "ahead": {
      "0": { "Globalfunctions_General": 1 }
    },
    "aid": {
      "0": { "UpgradingTo27": 1 }
    },
    "aim": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "aims": {
      "0": { "DialogOptionsRenderingInfo": 1 }
    },
    "aInventorySound": {
      "0": { "ScriptKeywords": 1 }
    },
    "air": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "alarm": {
      "0": { "Tumbleweed": 1 }
    },
    "ALFont": {
      "0": { "Credits": 1 }
    },
    "algorithm": {
      "0": { "Setup": 1 }
    },
    "Alias": {
      "0": { "Gamevariables": 1 }
    },
    "alias": {
      "0": { "Settingupthegame": 1 }
    },
    "align": {
      "0": { "Gamevariables": 3 },
      "1": { "Speech": 2 },
      "2": { "UpgradeTo33": 1 }
    },
    "aligned": {
      "0": { "Gamevariables": 3 },
      "1": { "Speech": 2 },
      "2": { "Label": 1 }
    },
    "Aligning": {
      "0": { "UpgradeTo31": 1 }
    },
    "Alignment": {
      "0": { "StandardEnums": 6 },
      "1": { "Character": 2 },
      "2": { "Speech": 1 }
    },
    "alignment": {
      "0": { "ListBox": 1 }
    },
    "alignments": {
      "0": { "StandardEnums": 1 }
    },
    "aligns": {
      "0": { "Character": 1 }
    },
    "alive": {
      "0": { "Tumbleweed_unhandled": 1 }
    },
    "ALL": {
      "0": { "TheScriptHeader": 1 }
    },
    "All": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "EditorSprite": 2 },
      "2": { "FAQ": 1 }
    },
    "all": {
      "0": { "Settingupthegame": 25 },
      "1": { "Game": 16 },
      "2": { "UpgradingTo27": 12 },
      "3": { "Globalfunctions_Room": 10 },
      "4": { "Multimedia": 9 },
      "5": { "EditorView": 8 },
      "6": { "ScriptKeywords": 7 },
      "7": { "TextParser": 6 },
      "8": { "acintro1": 5 },
      "9": { "CustomDialogOptions": 4 },
      "10": { "UpgradeTo30": 3 },
      "11": { "ContactingTheDevelopers": 2 },
      "12": { "Parser": 1 }
    },
    "all-users": {
      "0": { "UpgradeTo335": 1 }
    },
    "alleg": {
      "0": { "Credits": 1 }
    },
    "Allegro": {
      "0": { "Credits": 1 }
    },
    "allocated": {
      "0": { "acintro6": 1 }
    },
    "Allow": {
      "0": { "Settingupthegame": 2 },
      "1": { "DrawingSurfaceFunctions": 1 }
    },
    "allow": {
      "0": { "Settingupthegame": 7 },
      "1": { "Globalfunctions_General": 4 },
      "2": { "EditorSprite": 3 },
      "3": { "Debuggingfeatures": 2 },
      "4": { "SourceControl": 1 }
    },
    "allowable": {
      "0": { "String": 2 },
      "1": { "ListBox": 1 }
    },
    "allowed": {
      "0": { "GUI": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "allowing": {
      "0": { "Scripting": 3 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "allows": {
      "0": { "Settingupthegame": 15 },
      "1": { "GUIControl": 11 },
      "2": { "File": 9 },
      "3": { "DynamicSprite": 8 },
      "4": { "Globalfunctions_Room": 6 },
      "5": { "acintro1": 5 },
      "6": { "EventTypes": 4 },
      "7": { "Debuggingfeatures": 3 },
      "8": { "UpgradeTo32": 2 },
      "9": { "SourceControl": 1 }
    },
    "Allows": {
      "0": { "Character": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "almost": {
      "0": { "Tumbleweed": 1 }
    },
    "alogg": {
      "0": { "Credits": 1 }
    },
    "alone": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Along": {
      "0": { "UpgradeTo34": 1 }
    },
    "along": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "GUIControl": 1 }
    },
    "alpha": {
      "0": { "Settingupthegame": 12 },
      "1": { "DynamicSprite": 7 },
      "2": { "UpgradeTo33": 6 },
      "3": { "DialogOptionsRenderingInfo": 2 },
      "4": { "Introduction": 1 }
    },
    "Alpha": {
      "0": { "Settingupthegame": 1 }
    },
    "alpha-blended": {
      "0": { "Settingupthegame": 2 },
      "1": { "IntegrationWithWindows": 1 }
    },
    "alphabet": {
      "0": { "String": 2 }
    },
    "alphabetic": {
      "0": { "Credits": 1 }
    },
    "alphabetical": {
      "0": { "EditorRoom": 1 }
    },
    "already": {
      "0": { "ListBox": 2 },
      "1": { "EditorSprite": 1 }
    },
    "Also": {
      "0": { "Character": 78 },
      "1": { "Globalfunctions_General": 49 },
      "2": { "Object": 35 },
      "3": { "Game": 33 },
      "4": { "GUI": 23 },
      "5": { "DynamicSprite": 21 },
      "6": { "Mouse": 20 },
      "7": { "File": 17 },
      "8": { "System": 16 },
      "9": { "Button": 15 },
      "10": { "Globalfunctions_Room": 14 },
      "11": { "Region": 13 },
      "12": { "Viewport": 12 },
      "13": { "AudioChannel": 11 },
      "14": { "Speech": 9 },
      "15": { "DateTime": 8 },
      "16": { "ViewFrame": 7 },
      "17": { "Screen": 6 },
      "18": { "Parser": 4 },
      "19": { "Globalfunctions_Palette": 3 },
      "20": { "Tumbleweed": 2 },
      "21": { "EditorInventoryItems": 1 }
    },
    "also": {
      "0": { "Settingupthegame": 16 },
      "1": { "Character": 13 },
      "2": { "Tumbleweed_movement": 11 },
      "3": { "DynamicSprite": 9 },
      "4": { "ScriptKeywords": 8 },
      "5": { "Tumbleweed_actions": 6 },
      "6": { "Tumbleweed_helper": 4 },
      "7": { "Globalfunctions_Room": 3 },
      "8": { "Camera": 2 },
      "9": { "UpgradeTo31": 1 }
    },
    "alt": {
      "0": { "Tumbleweed_actions": 1 }
    },
    "Alt": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "ASCIIcodes": 1 }
    },
    "alter": {
      "0": { "GUIControl": 1 }
    },
    "altered": {
      "0": { "UpgradeTo34": 1 }
    },
    "alternate": {
      "0": { "TroubleshootingWindowsZoneID": 10 },
      "1": { "Globalfunctions_General": 1 }
    },
    "alternative": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "alternatively": {
      "0": { "Settingupthegame": 1 }
    },
    "Alternatively": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro2": 1 }
    },
    "Although": {
      "0": { "acintro1": 1 }
    },
    "although": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "always": {
      "0": { "RepExec": 21 },
      "1": { "Character": 13 },
      "2": { "Settingupthegame": 7 },
      "3": { "TextScriptEvents": 4 },
      "4": { "ScriptModules": 3 },
      "5": { "Tumbleweed": 2 },
      "6": { "GUIControl": 1 }
    },
    "ALWAYS": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Always": {
      "0": { "Globalfunctions_General": 1 }
    },
    "ALWAYSSPEECH": {
      "0": { "Globalfunctions_General": 1 }
    },
    "am": {
      "0": { "ScriptKeywords": 4 },
      "1": { "Character": 1 }
    },
    "aMachine": {
      "0": { "AudioChannel": 2 }
    },
    "Ambient": {
      "0": { "UpgradeTo32": 1 }
    },
    "ambient": {
      "0": { "Character": 6 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "UpgradeTo32": 1 }
    },
    "ambiera": {
      "0": { "Credits": 1 }
    },
    "amendments": {
      "0": { "BlockingScripts": 1 }
    },
    "American": {
      "0": { "TextParser": 1 }
    },
    "Among": {
      "0": { "Tumbleweed_actions": 1 }
    },
    "amongst": {
      "0": { "EditingGUIs": 1 }
    },
    "Amount": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "amount": {
      "0": { "Globalfunctions_Room": 2 },
      "1": { "TextWindowGUI": 1 }
    },
    "AMOUNT": {
      "0": { "Globalfunctions_Screen": 2 },
      "1": { "Region": 1 }
    },
    "aMusicX": {
      "0": { "UpgradeTo32": 1 }
    },
    "an": {
      "0": { "Settingupthegame": 32 },
      "1": { "Character": 18 },
      "2": { "DynamicSprite": 17 },
      "3": { "Globalfunctions_General": 16 },
      "4": { "ScriptingTutorialPart1": 15 },
      "5": { "MusicAndSound": 13 },
      "6": { "Tumbleweed": 12 },
      "7": { "File": 11 },
      "8": { "UpgradingTo27": 9 },
      "9": { "UpgradeTo32": 8 },
      "10": { "IntegrationWithWindows": 7 },
      "11": { "DateTime": 6 },
      "12": { "acintro8": 5 },
      "13": { "acintro6": 4 },
      "14": { "ContactingTheDevelopers": 3 },
      "15": { "DynamicArrays": 2 },
      "16": { "Slider": 1 }
    },
    "An": {
      "0": { "File": 4 },
      "1": { "OOProgramming": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "analogue": {
      "0": { "System": 1 }
    },
    "angle": {
      "0": { "Maths": 29 },
      "1": { "DynamicSprite": 4 },
      "2": { "Tumbleweed_extensions": 1 }
    },
    "angled": {
      "0": { "Tumbleweed": 1 }
    },
    "anim": {
      "0": { "Gamevariables": 1 }
    },
    "animate": {
      "0": { "Settingupthegame": 6 },
      "1": { "EditorView": 5 },
      "2": { "Object": 4 },
      "3": { "AdvancedRoomFeatures": 3 },
      "4": { "Button": 2 },
      "5": { "acintro4": 1 }
    },
    "Animate": {
      "0": { "Character": 19 },
      "1": { "Object": 13 },
      "2": { "StandardEnums": 7 },
      "3": { "UpgradingTo27": 2 },
      "4": { "ScriptingTutorialPart2": 1 }
    },
    "AnimateButton": {
      "0": { "Button": 1 }
    },
    "AnimateCharacter": {
      "0": { "Character": 1 }
    },
    "AnimateCharacterEx": {
      "0": { "Character": 1 }
    },
    "animated": {
      "0": { "Button": 6 },
      "1": { "acintro9": 1 }
    },
    "AnimateObject": {
      "0": { "Object": 1 }
    },
    "AnimateObjectEx": {
      "0": { "UpgradingTo27": 2 },
      "1": { "Object": 1 }
    },
    "AnimateOnlyOnHotspot": {
      "0": { "acintro9": 1 }
    },
    "AnimateOnlyOnHotspots": {
      "0": { "Settingupthegame": 1 }
    },
    "AnimateOnlyWhenMoving": {
      "0": { "acintro9": 1 }
    },
    "Animates": {
      "0": { "Button": 1 }
    },
    "animates": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro9": 1 }
    },
    "animating": {
      "0": { "Object": 5 },
      "1": { "Character": 4 },
      "2": { "AdvancedRoomFeatures": 2 },
      "3": { "Mouse": 1 }
    },
    "Animating": {
      "0": { "Object": 9 },
      "1": { "Character": 7 },
      "2": { "Button": 5 },
      "3": { "AdvancedRoomFeatures": 1 }
    },
    "animating-background": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "animation": {
      "0": { "Character": 67 },
      "1": { "Settingupthegame": 17 },
      "2": { "Button": 11 },
      "3": { "EditorView": 10 },
      "4": { "Speech": 8 },
      "5": { "acintro7": 6 },
      "6": { "Multimedia": 5 },
      "7": { "UpgradeTo33": 4 },
      "8": { "ScriptingTutorialPart2": 2 },
      "9": { "Globalfunctions_General": 1 }
    },
    "Animation": {
      "0": { "Settingupthegame": 2 },
      "1": { "EditorView": 1 }
    },
    "Animations": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro6": 1 }
    },
    "animations": {
      "0": { "acintro7": 8 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "Settingupthegame": 4 },
      "3": { "Globalfunctions_Message": 1 }
    },
    "AnimationSpeed": {
      "0": { "Character": 5 }
    },
    "AnimationStopTimeMargin": {
      "0": { "Speech": 4 },
      "1": { "UpgradeTo33": 1 }
    },
    "animspeed": {
      "0": { "Character": 1 }
    },
    "annoyance": {
      "0": { "UpgradeTo31": 1 }
    },
    "annoyed": {
      "0": { "UpgradeTo350": 1 }
    },
    "annoying": {
      "0": { "Globalfunctions_General": 1 }
    },
    "anonymous": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "Anonymous": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "another": {
      "0": { "Settingupthegame": 6 },
      "1": { "ScriptKeywords": 3 },
      "2": { "EventTypes": 2 },
      "3": { "acintro5": 1 }
    },
    "Another": {
      "0": { "UpgradeTo350": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "answer": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "answered": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "answers": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "Anti": {
      "0": { "Settingupthegame": 1 }
    },
    "Anti-alias": {
      "0": { "Globalfunctions_General": 1 }
    },
    "anti-aliased": {
      "0": { "Settingupthegame": 1 }
    },
    "anti-aliasing": {
      "0": { "Settingupthegame": 3 },
      "1": { "Credits": 1 }
    },
    "Anti-glide": {
      "0": { "Character": 1 }
    },
    "anti-virus": {
      "0": { "DistGame": 1 }
    },
    "antialiased": {
      "0": { "Settingupthegame": 1 }
    },
    "ANTIALIASFONTS": {
      "0": { "Globalfunctions_General": 1 }
    },
    "antialiasing": {
      "0": { "Gamevariables": 1 }
    },
    "Any": {
      "0": { "Room": 3 },
      "1": { "Character": 2 },
      "2": { "TextScriptEvents": 1 }
    },
    "ANY": {
      "0": { "Copyright": 7 }
    },
    "any": {
      "0": { "Settingupthegame": 14 },
      "1": { "Character": 12 },
      "2": { "ScriptKeywords": 9 },
      "3": { "Multimedia": 8 },
      "4": { "File": 6 },
      "5": { "UpgradeTo34": 5 },
      "6": { "Object": 4 },
      "7": { "UpgradingTo27": 3 },
      "8": { "BlockingScripts": 2 },
      "9": { "SourceControl": 1 }
    },
    "AnyClick": {
      "0": { "Tumbleweed_door": 6 },
      "1": { "Tumbleweed": 1 }
    },
    "AnyClickMove": {
      "0": { "Tumbleweed_movement": 6 }
    },
    "AnyClickSpecial": {
      "0": { "Tumbleweed_door": 5 }
    },
    "AnyClickUseInv": {
      "0": { "Tumbleweed_movement": 4 }
    },
    "AnyClickWalk": {
      "0": { "Tumbleweed_movement": 6 }
    },
    "AnyClickWalkLook": {
      "0": { "Tumbleweed_movement": 5 }
    },
    "AnyClickWalkLookPick": {
      "0": { "Tumbleweed_movement": 3 }
    },
    "anymore": {
      "0": { "Tumbleweed": 1 }
    },
    "Anything": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "acintro3": 1 }
    },
    "anything": {
      "0": { "UpgradingTo27": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "anytime": {
      "0": { "UpgradeTo350": 2 },
      "1": { "Camera": 1 }
    },
    "Anyway": {
      "0": { "acintro5": 1 }
    },
    "anyway": {
      "0": { "Gamevariables": 1 }
    },
    "anywhere": {
      "0": { "acintro4": 2 },
      "1": { "CustomDialogOptions": 1 }
    },
    "anyword": {
      "0": { "TextParser": 2 }
    },
    "Apart": {
      "0": { "Globalfunctions_General": 1 }
    },
    "apart": {
      "0": { "EventTypes": 2 }
    },
    "APEG": {
      "0": { "Credits": 1 }
    },
    "API": {
      "0": { "Scripting": 7 },
      "1": { "ScriptKeywords": 5 },
      "2": { "UpgradeTo341": 4 },
      "3": { "Settingupthegame": 3 },
      "4": { "UpgradeTo350": 1 }
    },
    "APIs": {
      "0": { "Settingupthegame": 1 }
    },
    "Apologies": {
      "0": { "UpgradingTo271": 1 }
    },
    "app": {
      "0": { "File": 1 }
    },
    "APPDATADIR": {
      "0": { "File": 6 },
      "1": { "UpgradeTo335": 4 },
      "2": { "ListBox": 1 }
    },
    "appear": {
      "0": { "Settingupthegame": 3 },
      "1": { "acintro4": 2 },
      "2": { "TemplateBASS": 1 }
    },
    "appearance": {
      "0": { "Mouse": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "GUIControl": 1 }
    },
    "appeared": {
      "0": { "acintro2": 1 }
    },
    "appearing": {
      "0": { "Lipsync": 1 }
    },
    "appears": {
      "0": { "Settingupthegame": 3 },
      "1": { "EditingGUIs": 1 }
    },
    "Append": {
      "0": { "String": 8 },
      "1": { "UpgradingTo271": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "AppendChar": {
      "0": { "String": 6 }
    },
    "appended": {
      "0": { "ListBox": 1 }
    },
    "Appends": {
      "0": { "String": 2 }
    },
    "Apple": {
      "0": { "ScriptKeywords": 17 }
    },
    "apple": {
      "0": { "ScriptKeywords": 20 },
      "1": { "TextParser": 2 },
      "2": { "EditorInventoryItems": 1 }
    },
    "apples": {
      "0": { "ScriptKeywords": 2 }
    },
    "applicable": {
      "0": { "GUI": 1 }
    },
    "APPLICATION": {
      "0": { "Copyright": 1 }
    },
    "application": {
      "0": { "Lipsync": 4 },
      "1": { "TroubleshootingWindowsZoneID": 2 },
      "2": { "acintro9": 1 }
    },
    "applications": {
      "0": { "File": 2 },
      "1": { "SourceControl": 1 }
    },
    "applied": {
      "0": { "System": 4 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "Screen": 2 },
      "3": { "GUIControl": 1 }
    },
    "applies": {
      "0": { "EventTypes": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "Applies": {
      "0": { "GUIControl": 14 }
    },
    "apply": {
      "0": { "DynamicSprite": 2 },
      "1": { "acintro1": 1 }
    },
    "applying": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "approach": {
      "0": { "GUIControl": 1 }
    },
    "approaching": {
      "0": { "Tumbleweed_door": 1 }
    },
    "appropriate": {
      "0": { "Character": 7 },
      "1": { "Speech": 2 },
      "2": { "ScriptingTutorialPart1": 1 }
    },
    "appropriately": {
      "0": { "acintro2": 1 }
    },
    "approved": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "approximate": {
      "0": { "Setup": 1 }
    },
    "Arabic": {
      "0": { "Settingupthegame": 1 }
    },
    "arbitrary": {
      "0": { "GUI": 1 }
    },
    "arc-cosine": {
      "0": { "Maths": 2 }
    },
    "arc-sine": {
      "0": { "Maths": 2 }
    },
    "arc-tan": {
      "0": { "Maths": 3 }
    },
    "arcade": {
      "0": { "TemplateSierraStyle": 1 }
    },
    "ArcCos": {
      "0": { "Maths": 4 }
    },
    "archive": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "ArcSin": {
      "0": { "Maths": 5 }
    },
    "ArcTan": {
      "0": { "Maths": 6 }
    },
    "arctangent": {
      "0": { "Maths": 1 }
    },
    "AREA": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "area": {
      "0": { "Globalfunctions_Room": 24 },
      "1": { "acintro2": 22 },
      "2": { "Character": 17 },
      "3": { "DialogOptionsRenderingInfo": 15 },
      "4": { "AdvancedRoomFeatures": 8 },
      "5": { "EditorRoom": 7 },
      "6": { "Object": 5 },
      "7": { "DynamicSprite": 4 },
      "8": { "FAQ": 3 },
      "9": { "EditorSprite": 2 },
      "10": { "acintro3": 1 }
    },
    "AREA's": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "areanum": {
      "0": { "Globalfunctions_Room": 2 }
    },
    "AREANUM": {
      "0": { "Globalfunctions_Room": 2 }
    },
    "Areas": {
      "0": { "AdvancedRoomFeatures": 2 },
      "1": { "acintro2": 1 }
    },
    "areas": {
      "0": { "acintro2": 14 },
      "1": { "Character": 10 },
      "2": { "Object": 6 },
      "3": { "AdvancedRoomFeatures": 5 },
      "4": { "Settingupthegame": 4 },
      "5": { "acintro3": 3 },
      "6": { "Globalfunctions_General": 2 },
      "7": { "Region": 1 }
    },
    "AreCharactersColliding": {
      "0": { "Character": 1 }
    },
    "AreCharObjColliding": {
      "0": { "Character": 1 }
    },
    "aren't": {
      "0": { "Globalfunctions_General": 1 }
    },
    "AreObjectsColliding": {
      "0": { "Object": 1 }
    },
    "AreThingsOverlapping": {
      "0": { "Globalfunctions_Room": 3 },
      "1": { "Character": 2 },
      "2": { "Object": 1 }
    },
    "argument": {
      "0": { "StringFormats": 1 }
    },
    "arguments": {
      "0": { "Globalfunctions_Palette": 1 }
    },
    "Ariis": {
      "0": { "Credits": 1 }
    },
    "ARISING": {
      "0": { "Copyright": 1 }
    },
    "arithmetic": {
      "0": { "ScriptKeywords": 1 }
    },
    "arose": {
      "0": { "SystemLimits": 1 }
    },
    "around": {
      "0": { "Character": 6 },
      "1": { "UpgradeTo350": 5 },
      "2": { "Settingupthegame": 4 },
      "3": { "Globalfunctions_Room": 3 },
      "4": { "acintro3": 2 },
      "5": { "Tumbleweed_movement": 1 }
    },
    "arrange": {
      "0": { "GUIControl": 1 }
    },
    "arranged": {
      "0": { "Set": 1 }
    },
    "arrangement": {
      "0": { "Globalfunctions_General": 1 }
    },
    "array": {
      "0": { "DynamicArrays": 6 },
      "1": { "Dictionary": 5 },
      "2": { "ScriptKeywords": 4 },
      "3": { "UpgradingTo27": 3 },
      "4": { "Camera": 2 },
      "5": { "Globalfunctions_General": 1 }
    },
    "arrays": {
      "0": { "ScriptKeywords": 3 },
      "1": { "DynamicArrays": 2 },
      "2": { "OOProgramming": 1 }
    },
    "Arrays": {
      "0": { "DynamicArrays": 3 },
      "1": { "ScriptKeywords": 2 },
      "2": { "ScriptingLanguage": 1 }
    },
    "arrives": {
      "0": { "Debuggingfeatures": 1 }
    },
    "arrow": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "InvWindow": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "arrows": {
      "0": { "ListBox": 8 },
      "1": { "CustomDialogOptions": 2 },
      "2": { "InvWindow": 1 }
    },
    "Arrows": {
      "0": { "ListBox": 2 }
    },
    "art": {
      "0": { "Credits": 1 }
    },
    "article": {
      "0": { "acintro3": 1 }
    },
    "artist": {
      "0": { "Settingupthegame": 1 }
    },
    "artist's": {
      "0": { "Settingupthegame": 1 }
    },
    "Artistic": {
      "0": { "Copyright": 1 }
    },
    "AS-IS": {
      "0": { "Copyright": 1 }
    },
    "AsButton": {
      "0": { "GUIControl": 2 },
      "1": { "GUI": 1 }
    },
    "ASC": {
      "0": { "ScriptModules": 1 }
    },
    "asc": {
      "0": { "Tumbleweed": 2 },
      "1": { "KeyboardShortcuts": 1 }
    },
    "aScaryMusic": {
      "0": { "Game": 1 }
    },
    "ASCII": {
      "0": { "ASCIIcodes": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "AsFloat": {
      "0": { "String": 5 }
    },
    "ASH": {
      "0": { "ScriptModules": 1 }
    },
    "ash": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "AsInt": {
      "0": { "String": 5 },
      "1": { "Game": 1 }
    },
    "AsInvWindow": {
      "0": { "GUIControl": 1 }
    },
    "ASK": {
      "0": { "Globalfunctions_General": 2 }
    },
    "ask": {
      "0": { "Pointers": 2 },
      "1": { "acintro8": 1 }
    },
    "Asked": {
      "0": { "FAQ": 1 }
    },
    "asked": {
      "0": { "FAQ": 1 }
    },
    "asking": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "ContactingTheDevelopers": 2 },
      "2": { "Game": 1 }
    },
    "asks": {
      "0": { "acintro1": 1 }
    },
    "AsLabel": {
      "0": { "GUIControl": 1 }
    },
    "AsListBox": {
      "0": { "GUI": 2 },
      "1": { "GUIControl": 1 }
    },
    "aSoundX": {
      "0": { "UpgradeTo32": 1 }
    },
    "aSpecialScoreSound": {
      "0": { "ScriptingTutorialPart2": 2 }
    },
    "aspect": {
      "0": { "Setup": 3 },
      "1": { "Tumbleweed": 1 }
    },
    "aspects": {
      "0": { "Mouse": 1 }
    },
    "asset": {
      "0": { "UpgradeTo350": 5 },
      "1": { "DrawingSurfaceFunctions": 1 }
    },
    "assets": {
      "0": { "UpgradeTo350": 1 }
    },
    "assign": {
      "0": { "UpgradingTo271": 2 },
      "1": { "Pointers": 1 }
    },
    "assigned": {
      "0": { "GUI": 3 },
      "1": { "TextWindowGUI": 2 },
      "2": { "EditorSprite": 1 }
    },
    "assignment": {
      "0": { "Settingupthegame": 1 }
    },
    "assigns": {
      "0": { "ScriptKeywords": 1 }
    },
    "Assigns": {
      "0": { "TemplateSierraStyle": 4 },
      "1": { "TemplateBASS": 2 },
      "2": { "Dictionary": 1 }
    },
    "assist": {
      "0": { "ScriptKeywords": 1 }
    },
    "assistance": {
      "0": { "acintro1": 1 }
    },
    "AsSlider": {
      "0": { "GUIControl": 1 }
    },
    "associated": {
      "0": { "BlockingScripts": 1 }
    },
    "association": {
      "0": { "Lipsync": 1 }
    },
    "associations": {
      "0": { "IntegrationWithWindows": 3 },
      "1": { "Lipsync": 1 }
    },
    "assume": {
      "0": { "ScriptKeywords": 1 }
    },
    "assumes": {
      "0": { "TextWindowGUI": 1 }
    },
    "assuming": {
      "0": { "TextWindowGUI": 1 }
    },
    "Assuming": {
      "0": { "ScriptingTutorialPart1": 2 }
    },
    "asterisk": {
      "0": { "Pointers": 2 }
    },
    "AsTextBox": {
      "0": { "GUIControl": 1 }
    },
    "AsTextWindow": {
      "0": { "GUI": 3 },
      "1": { "TextWindowGUI": 1 }
    },
    "AsType": {
      "0": { "GUIControl": 1 }
    },
    "ate": {
      "0": { "RepExec": 1 }
    },
    "attach": {
      "0": { "System": 1 }
    },
    "attached": {
      "0": { "Room": 1 }
    },
    "attachment": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "attempt": {
      "0": { "Game": 3 },
      "1": { "DynamicSprite": 2 },
      "2": { "UpgradeTo335": 1 }
    },
    "attempting": {
      "0": { "UpgradingTo27": 1 }
    },
    "attempts": {
      "0": { "Mouse": 1 }
    },
    "attribute": {
      "0": { "OOProgramming": 16 },
      "1": { "ScriptKeywords": 3 },
      "2": { "EditingGUIs": 1 }
    },
    "attributes": {
      "0": { "OOProgramming": 3 },
      "1": { "EditingGUIs": 1 }
    },
    "au": {
      "0": { "Lipsync": 1 }
    },
    "audio": {
      "0": { "AudioChannel": 34 },
      "1": { "AudioClip": 27 },
      "2": { "Multimedia": 25 },
      "3": { "MusicAndSound": 24 },
      "4": { "UpgradeTo32": 22 },
      "5": { "System": 5 },
      "6": { "Lipsync": 4 },
      "7": { "DistGame": 3 },
      "8": { "Game": 2 },
      "9": { "ScriptKeywords": 1 }
    },
    "Audio": {
      "0": { "MusicAndSound": 10 },
      "1": { "UpgradeTo32": 7 },
      "2": { "Multimedia": 3 },
      "3": { "System": 2 }
    },
    "AUDIO": {
      "0": { "DistGame": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "audio-related": {
      "0": { "Settingupthegame": 1 }
    },
    "AudioCache": {
      "0": { "MusicAndSound": 4 },
      "1": { "UpgradeTo32": 3 },
      "2": { "UpgradeTo341": 1 }
    },
    "AudioChannel": {
      "0": { "AudioChannel": 36 },
      "1": { "AudioClip": 7 },
      "2": { "System": 5 },
      "3": { "Game": 3 },
      "4": { "Multimedia": 2 },
      "5": { "UpgradeTo32": 1 }
    },
    "AudioChannelCount": {
      "0": { "System": 4 },
      "1": { "AudioClip": 1 }
    },
    "AudioChannels": {
      "0": { "System": 4 },
      "1": { "AudioChannel": 2 },
      "2": { "Game": 1 }
    },
    "audiochannels": {
      "0": { "Game": 1 }
    },
    "AudioClip": {
      "0": { "AudioClip": 21 },
      "1": { "Multimedia": 5 },
      "2": { "StandardEnums": 4 },
      "3": { "Game": 2 },
      "4": { "MusicAndSound": 1 }
    },
    "audioclip": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "AudioClipCount": {
      "0": { "Game": 4 }
    },
    "AudioClips": {
      "0": { "Game": 4 },
      "1": { "AudioClip": 3 }
    },
    "AudioFileType": {
      "0": { "AudioClip": 1 }
    },
    "AudioFunction": {
      "0": { "Multimedia": 1 }
    },
    "AudioPriority": {
      "0": { "AudioClip": 3 },
      "1": { "StandardEnums": 1 }
    },
    "AudioType": {
      "0": { "Multimedia": 7 },
      "1": { "AudioClip": 2 }
    },
    "AudioTypes": {
      "0": { "Multimedia": 1 }
    },
    "authentic": {
      "0": { "acintro1": 1 }
    },
    "authenticate": {
      "0": { "OOProgramming": 1 }
    },
    "author": {
      "0": { "Plugins": 1 }
    },
    "author's": {
      "0": { "Setup": 1 }
    },
    "authority": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "AUTHORS": {
      "0": { "Copyright": 1 }
    },
    "authors": {
      "0": { "UpgradeTo30": 1 }
    },
    "auto": {
      "0": { "Gamevariables": 1 }
    },
    "Auto": {
      "0": { "Setup": 1 }
    },
    "auto-complete": {
      "0": { "UpgradingTo27": 2 },
      "1": { "ScriptingTutorialPart1": 1 }
    },
    "Auto-number": {
      "0": { "AutonumberSpeechFiles": 2 },
      "1": { "OtherFeatures": 1 }
    },
    "auto-numbered": {
      "0": { "AutonumberSpeechFiles": 1 }
    },
    "auto-tracking": {
      "0": { "Camera": 1 }
    },
    "autocomplete": {
      "0": { "UpgradingTo27": 2 }
    },
    "Autocomplete": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "AUTOCOMPLETEIGNORE": {
      "0": { "OOProgramming": 2 }
    },
    "automated": {
      "0": { "EventTypes": 1 }
    },
    "automatic": {
      "0": { "Camera": 4 },
      "1": { "acintro9": 2 },
      "2": { "Pointers": 1 }
    },
    "Automatic": {
      "0": { "acintro9": 1 }
    },
    "Automatically": {
      "0": { "Settingupthegame": 2 }
    },
    "automatically": {
      "0": { "Character": 11 },
      "1": { "DynamicSprite": 10 },
      "2": { "Globalfunctions_General": 4 },
      "3": { "StandardEnums": 3 },
      "4": { "Settingupthegame": 2 },
      "5": { "Pointers": 1 }
    },
    "AutoSizeViewportOnRoomLoad": {
      "0": { "Viewport": 7 },
      "1": { "Camera": 5 },
      "2": { "Screen": 2 }
    },
    "AutoTracking": {
      "0": { "Camera": 6 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "autotracking": {
      "0": { "Camera": 1 }
    },
    "available": {
      "0": { "Settingupthegame": 15 },
      "1": { "AudioClip": 6 },
      "2": { "Setup": 5 },
      "3": { "acintro4": 3 },
      "4": { "Copyright": 2 },
      "5": { "EditorCharacter": 1 }
    },
    "average": {
      "0": { "Character": 1 }
    },
    "AVI": {
      "0": { "Multimedia": 6 }
    },
    "avoid": {
      "0": { "Character": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "Avtalion": {
      "0": { "Credits": 1 }
    },
    "awarding": {
      "0": { "Game": 1 }
    },
    "aware": {
      "0": { "ScriptKeywords": 1 }
    },
    "away": {
      "0": { "Character": 9 },
      "1": { "TextParser": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "Pointers": 1 }
    },
    "awful": {
      "0": { "StringFormats": 1 }
    },
    "AX-Icons": {
      "0": { "DistGame": 1 }
    },
    "axialis": {
      "0": { "DistGame": 1 }
    },
    "axis": {
      "0": { "Character": 1 }
    },
    "B": {
      "0": { "File": 1 }
    },
    "Back": {
      "0": { "acintro1": 1 }
    },
    "back": {
      "0": { "File": 10 },
      "1": { "Object": 4 },
      "2": { "acintro7": 3 },
      "3": { "Mouse": 2 },
      "4": { "Region": 1 }
    },
    "BACK": {
      "0": { "Globalfunctions_Message": 2 }
    },
    "backcolor": {
      "0": { "Globalfunctions_Message": 1 }
    },
    "background": {
      "0": { "AdvancedRoomFeatures": 15 },
      "1": { "DynamicSprite": 14 },
      "2": { "DrawingSurfaceFunctions": 13 },
      "3": { "acintro2": 10 },
      "4": { "Room": 9 },
      "5": { "EditorRoom": 8 },
      "6": { "Globalfunctions_Room": 7 },
      "7": { "Gamevariables": 6 },
      "8": { "Globalfunctions_General": 5 },
      "9": { "acintro4": 4 },
      "10": { "acintro1": 3 },
      "11": { "Globalfunctions_Screen": 2 },
      "12": { "SystemLimits": 1 }
    },
    "Background": {
      "0": { "acintro2": 3 },
      "1": { "acintro1": 1 }
    },
    "background's": {
      "0": { "Room": 1 }
    },
    "BackgroundAnimationDelay": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "BackgroundColor": {
      "0": { "GUI": 5 },
      "1": { "TemplateVerbcoin": 2 }
    },
    "BackgroundGraphic": {
      "0": { "GUI": 7 },
      "1": { "Slider": 4 }
    },
    "backgroundNumber": {
      "0": { "Room": 1 }
    },
    "backgrounds": {
      "0": { "AdvancedRoomFeatures": 5 },
      "1": { "Settingupthegame": 4 },
      "2": { "acintro6": 3 },
      "3": { "Globalfunctions_Room": 2 },
      "4": { "acintro4": 1 }
    },
    "BackgroundTransparency": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "backing": {
      "0": { "MusicAndSound": 1 }
    },
    "Backing": {
      "0": { "BackingUpYourGame": 1 }
    },
    "Backspace": {
      "0": { "ASCIIcodes": 1 }
    },
    "backspace": {
      "0": { "EditingGUIs": 1 }
    },
    "backup": {
      "0": { "DrawingSurfaceFunctions": 6 },
      "1": { "DistGame": 1 }
    },
    "backward": {
      "0": { "UpgradeTo350": 1 }
    },
    "backwards": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "Backwards": {
      "0": { "ScriptKeywords": 1 }
    },
    "backwards-compatibility": {
      "0": { "File": 1 }
    },
    "backwards-compatible": {
      "0": { "UpgradeTo31": 1 }
    },
    "bad": {
      "0": { "Character": 1 }
    },
    "badGuyHealth": {
      "0": { "ScriptKeywords": 1 }
    },
    "badly": {
      "0": { "acintro1": 1 }
    },
    "badWord": {
      "0": { "Parser": 3 }
    },
    "BakeCake": {
      "0": { "ScriptKeywords": 3 }
    },
    "Baker": {
      "0": { "Credits": 1 }
    },
    "balance": {
      "0": { "AudioChannel": 2 }
    },
    "ball": {
      "0": { "ScriptKeywords": 6 }
    },
    "bar": {
      "0": { "Globalfunctions_Message": 10 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "Lipsync": 3 },
      "3": { "TemplateBASS": 2 },
      "4": { "Tumbleweed_translation": 1 }
    },
    "bar's": {
      "0": { "Globalfunctions_Message": 2 }
    },
    "bare": {
      "0": { "acintro3": 1 }
    },
    "base": {
      "0": { "Maths": 5 },
      "1": { "Pointers": 1 }
    },
    "based": {
      "0": { "Pointers": 2 },
      "1": { "DialogOptionsRenderingInfo": 1 }
    },
    "Based": {
      "0": { "ScriptKeywords": 1 }
    },
    "baseline": {
      "0": { "Character": 7 },
      "1": { "acintro2": 5 },
      "2": { "acintro4": 2 },
      "3": { "Globalfunctions_Room": 1 }
    },
    "BASELINE": {
      "0": { "Globalfunctions_Room": 4 }
    },
    "Baseline": {
      "0": { "Object": 6 },
      "1": { "Character": 5 },
      "2": { "acintro4": 2 },
      "3": { "acintro2": 1 }
    },
    "baselines": {
      "0": { "Character": 2 },
      "1": { "acintro4": 1 }
    },
    "basic": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "Basic": {
      "0": { "Settingupthegame": 1 }
    },
    "Basic-style": {
      "0": { "UpgradingTo27": 1 }
    },
    "Basically": {
      "0": { "Pointers": 1 }
    },
    "basically": {
      "0": { "Pointers": 1 }
    },
    "basics": {
      "0": { "acintro9": 1 }
    },
    "Basics": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "BASS": {
      "0": { "TemplateBASS": 2 },
      "1": { "Credits": 1 }
    },
    "battery": {
      "0": { "EventTypes": 2 }
    },
    "battle": {
      "0": { "MusicAndSound": 1 }
    },
    "Bear": {
      "0": { "acintro2": 1 }
    },
    "bear": {
      "0": { "GUIControl": 1 }
    },
    "beat": {
      "0": { "AudioChannel": 2 }
    },
    "beauty": {
      "0": { "TextParser": 1 }
    },
    "became": {
      "0": { "UpgradeTo350": 2 },
      "1": { "DistGame": 1 }
    },
    "because": {
      "0": { "Settingupthegame": 8 },
      "1": { "Game": 4 },
      "2": { "MusicAndSound": 3 },
      "3": { "acintro8": 2 },
      "4": { "Viewport": 1 }
    },
    "Because": {
      "0": { "Pointers": 3 },
      "1": { "UpgradingTo27": 2 },
      "2": { "ExtenderFunctions": 1 }
    },
    "become": {
      "0": { "GUI": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "becomes": {
      "0": { "BlockingScripts": 1 }
    },
    "becoming": {
      "0": { "Settingupthegame": 2 }
    },
    "bed": {
      "0": { "DateTime": 1 }
    },
    "been": {
      "0": { "Tumbleweed_movement": 11 },
      "1": { "UpgradeTo30": 7 },
      "2": { "Globalfunctions_General": 6 },
      "3": { "UpgradingTo27": 5 },
      "4": { "UpgradingTo271": 4 },
      "5": { "UpgradeTo33": 3 },
      "6": { "Object": 2 },
      "7": { "Region": 1 }
    },
    "before": {
      "0": { "Character": 20 },
      "1": { "Settingupthegame": 8 },
      "2": { "System": 7 },
      "3": { "Object": 4 },
      "4": { "Speech": 3 },
      "5": { "DrawingSurfaceFunctions": 2 },
      "6": { "acintro3": 1 }
    },
    "BEFORE": {
      "0": { "EventTypes": 1 }
    },
    "Before": {
      "0": { "Character": 1 }
    },
    "begin": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro1": 1 }
    },
    "Beginners": {
      "0": { "FAQ": 2 },
      "1": { "acintro9": 1 }
    },
    "beginning": {
      "0": { "File": 2 },
      "1": { "Screen": 1 }
    },
    "begins": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "behave": {
      "0": { "Character": 1 }
    },
    "behaves": {
      "0": { "AudioClip": 2 },
      "1": { "GUI": 1 }
    },
    "behavior": {
      "0": { "GUI": 3 },
      "1": { "Camera": 2 },
      "2": { "Room": 1 }
    },
    "behaviors": {
      "0": { "TemplateBASS": 1 }
    },
    "behind": {
      "0": { "Character": 6 },
      "1": { "acintro2": 5 },
      "2": { "Object": 4 },
      "3": { "GUIControl": 3 },
      "4": { "acintro4": 2 },
      "5": { "GUI": 1 }
    },
    "being": {
      "0": { "Character": 6 },
      "1": { "Object": 4 },
      "2": { "System": 3 },
      "3": { "GUI": 2 },
      "4": { "UpgradingTo271": 1 }
    },
    "belonging": {
      "0": { "DialogOptionsRenderingInfo": 1 }
    },
    "belongs": {
      "0": { "ScriptKeywords": 2 }
    },
    "below": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Settingupthegame": 4 },
      "2": { "File": 3 },
      "3": { "EditorInventoryItems": 2 },
      "4": { "CustomDialogOptions": 1 }
    },
    "Ben": {
      "0": { "Credits": 1 }
    },
    "bending": {
      "0": { "Character": 1 }
    },
    "bending-down": {
      "0": { "acintro7": 1 }
    },
    "benefit": {
      "0": { "ScriptKeywords": 1 }
    },
    "benefits": {
      "0": { "UpgradingTo27": 2 }
    },
    "Benjamin": {
      "0": { "Credits": 1 }
    },
    "Benoit": {
      "0": { "Credits": 1 }
    },
    "Benutze": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "Bernhard": {
      "0": { "Credits": 1 }
    },
    "berries": {
      "0": { "ScriptKeywords": 3 }
    },
    "beside": {
      "0": { "TextParser": 1 }
    },
    "Besides": {
      "0": { "UpgradeTo34": 1 }
    },
    "best": {
      "0": { "FAQ": 1 }
    },
    "beta": {
      "0": { "Credits": 1 }
    },
    "better": {
      "0": { "Settingupthegame": 3 },
      "1": { "UpgradingTo27": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "between": {
      "0": { "Globalfunctions_General": 13 },
      "1": { "Settingupthegame": 8 },
      "2": { "Character": 4 },
      "3": { "GUI": 3 },
      "4": { "UpgradeTo350": 2 },
      "5": { "Region": 1 }
    },
    "Between": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "beware": {
      "0": { "Settingupthegame": 1 }
    },
    "beyond": {
      "0": { "ScriptKeywords": 1 }
    },
    "BFAQ": {
      "0": { "FAQ": 1 }
    },
    "bgspeech": {
      "0": { "Gamevariables": 2 },
      "1": { "Character": 1 }
    },
    "big": {
      "0": { "acintro2": 1 }
    },
    "bigarray": {
      "0": { "ScriptKeywords": 2 }
    },
    "bigger": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "acintro2": 1 }
    },
    "billions": {
      "0": { "UpgradeTo350": 1 }
    },
    "binary": {
      "0": { "File": 1 }
    },
    "bird": {
      "0": { "RepExec": 6 }
    },
    "birthday": {
      "0": { "Settingupthegame": 1 }
    },
    "bit": {
      "0": { "acintro5": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "bitmap": {
      "0": { "Settingupthegame": 2 },
      "1": { "UpgradeTo34": 1 }
    },
    "bits": {
      "0": { "Translations": 2 }
    },
    "bitwise": {
      "0": { "StandardEnums": 1 }
    },
    "Bitwise": {
      "0": { "ScriptKeywords": 5 }
    },
    "Bjorn": {
      "0": { "Credits": 1 }
    },
    "black": {
      "0": { "Globalfunctions_Screen": 7 },
      "1": { "System": 3 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "UpgradeTo32": 1 }
    },
    "blacks": {
      "0": { "Gamevariables": 1 }
    },
    "blank": {
      "0": { "Game": 6 },
      "1": { "Translations": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "TextBox": 1 }
    },
    "Blank": {
      "0": { "Credits": 1 }
    },
    "blended": {
      "0": { "Settingupthegame": 4 },
      "1": { "System": 1 }
    },
    "blending": {
      "0": { "Settingupthegame": 6 },
      "1": { "UpgradeTo33": 5 },
      "2": { "GraphicsDriver": 2 },
      "3": { "System": 1 }
    },
    "Blimey": {
      "0": { "UpgradingTo27": 1 }
    },
    "blink": {
      "0": { "Character": 3 }
    },
    "Blinking": {
      "0": { "Settingupthegame": 1 }
    },
    "blinking": {
      "0": { "Character": 9 },
      "1": { "Settingupthegame": 2 }
    },
    "BlinkInterval": {
      "0": { "Character": 6 },
      "1": { "Settingupthegame": 1 }
    },
    "BlinkView": {
      "0": { "Character": 8 }
    },
    "BlinkWhileThinking": {
      "0": { "Character": 4 }
    },
    "block": {
      "0": { "Object": 5 },
      "1": { "ScriptKeywords": 3 },
      "2": { "ScriptingTutorialPart1": 2 },
      "3": { "acintro3": 1 }
    },
    "blocked": {
      "0": { "BlockingScripts": 4 },
      "1": { "TroubleshootingWindowsZoneID": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Blocking": {
      "0": { "Character": 1 }
    },
    "blocking": {
      "0": { "Character": 18 },
      "1": { "Object": 11 },
      "2": { "Globalfunctions_General": 8 },
      "3": { "BlockingScripts": 5 },
      "4": { "TextScriptEvents": 4 },
      "5": { "Game": 3 },
      "6": { "Globalfunctions_Message": 2 },
      "7": { "GUIControl": 1 }
    },
    "BlockingHeight": {
      "0": { "Character": 5 }
    },
    "BlockingStyle": {
      "0": { "Character": 16 },
      "1": { "Object": 4 },
      "2": { "StandardEnums": 1 }
    },
    "BlockingWidth": {
      "0": { "Character": 5 }
    },
    "blocks": {
      "0": { "Character": 1 }
    },
    "BLUE": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Region": 1 }
    },
    "Blue": {
      "0": { "Character": 1 }
    },
    "blue": {
      "0": { "Lipsync": 3 },
      "1": { "Region": 2 },
      "2": { "Tumbleweed": 1 }
    },
    "blurred": {
      "0": { "Settingupthegame": 1 }
    },
    "BMP": {
      "0": { "DynamicSprite": 2 },
      "1": { "acintro1": 1 }
    },
    "bmp": {
      "0": { "DynamicSprite": 21 }
    },
    "board": {
      "0": { "Plugins": 1 }
    },
    "Bob": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "body": {
      "0": { "ScriptKeywords": 1 }
    },
    "bold": {
      "0": { "Gamevariables": 1 }
    },
    "bolt": {
      "0": { "Settingupthegame": 2 },
      "1": { "EventTypes": 1 }
    },
    "bolted-on": {
      "0": { "UpgradeTo31": 1 }
    },
    "bonus": {
      "0": { "acintro4": 1 }
    },
    "book": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "bookshelf": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "bool": {
      "0": { "Character": 20 },
      "1": { "Object": 11 },
      "2": { "System": 9 },
      "3": { "String": 7 },
      "4": { "ListBox": 5 },
      "5": { "Tumbleweed_movement": 4 },
      "6": { "Viewport": 3 },
      "7": { "Region": 2 },
      "8": { "DrawingSurfaceFunctions": 1 }
    },
    "boolean": {
      "0": { "ScriptKeywords": 1 }
    },
    "Boolean": {
      "0": { "Room": 2 }
    },
    "boost": {
      "0": { "Setup": 1 }
    },
    "border": {
      "0": { "ListBox": 5 },
      "1": { "Globalfunctions_Message": 3 },
      "2": { "GUI": 2 },
      "3": { "Speech": 1 }
    },
    "Border": {
      "0": { "ListBox": 3 },
      "1": { "TextBox": 1 }
    },
    "bordercolor": {
      "0": { "Globalfunctions_Message": 1 }
    },
    "BorderColor": {
      "0": { "GUI": 5 },
      "1": { "TemplateVerbcoin": 2 }
    },
    "borders": {
      "0": { "System": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "Borders": {
      "0": { "EditingGUIs": 3 }
    },
    "borderwidth": {
      "0": { "Globalfunctions_Message": 1 }
    },
    "BorderWidth": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "bored": {
      "0": { "acintro8": 1 }
    },
    "boring": {
      "0": { "acintro3": 1 }
    },
    "Both": {
      "0": { "MusicAndSound": 1 }
    },
    "both": {
      "0": { "UpgradeTo350": 4 },
      "1": { "Screen": 3 },
      "2": { "ScriptKeywords": 2 },
      "3": { "Multimedia": 1 }
    },
    "bothered": {
      "0": { "acintro2": 1 }
    },
    "Bottom": {
      "0": { "Game": 1 }
    },
    "bottom": {
      "0": { "acintro2": 4 },
      "1": { "Character": 3 },
      "2": { "EditorRoom": 2 },
      "3": { "ListBox": 1 }
    },
    "bottom-right": {
      "0": { "Mouse": 1 }
    },
    "BottomEdge": {
      "0": { "Room": 6 }
    },
    "BottomEdgeY": {
      "0": { "EditorRoom": 1 }
    },
    "BOTTOMLINE": {
      "0": { "Globalfunctions_General": 1 }
    },
    "bound": {
      "0": { "ScriptKeywords": 1 }
    },
    "boundaries": {
      "0": { "DynamicSprite": 1 }
    },
    "bounding": {
      "0": { "Mouse": 2 }
    },
    "bounds": {
      "0": { "Viewport": 2 },
      "1": { "Mouse": 1 }
    },
    "bowl": {
      "0": { "InventoryItem": 2 }
    },
    "Box": {
      "0": { "Scripting": 2 }
    },
    "box": {
      "0": { "ListBox": 26 },
      "1": { "TextBox": 9 },
      "2": { "Settingupthegame": 8 },
      "3": { "Gamevariables": 5 },
      "4": { "Templates": 4 },
      "5": { "acintro1": 3 },
      "6": { "Dialog": 2 },
      "7": { "acintro4": 1 }
    },
    "box's": {
      "0": { "ListBox": 4 },
      "1": { "TextBox": 2 },
      "2": { "Parser": 1 }
    },
    "Box-art": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "box-out": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "Boxes": {
      "0": { "EditingGUIs": 2 }
    },
    "boxes": {
      "0": { "Lipsync": 3 },
      "1": { "ListBox": 2 },
      "2": { "acintro9": 1 }
    },
    "Brace": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "bracket": {
      "0": { "Tumbleweed_extensions": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "brackets": {
      "0": { "ScriptingTutorialPart1": 8 },
      "1": { "ScriptKeywords": 2 },
      "2": { "acintro3": 1 }
    },
    "branch": {
      "0": { "MusicAndSound": 1 }
    },
    "BREACHING": {
      "0": { "Copyright": 1 }
    },
    "break": {
      "0": { "ScriptKeywords": 17 },
      "1": { "acintro2": 1 }
    },
    "breaking": {
      "0": { "UpgradeTo341": 1 }
    },
    "breakpoint": {
      "0": { "Debuggingfeatures": 2 }
    },
    "Breakpoint": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "breaks": {
      "0": { "Character": 1 }
    },
    "breeze": {
      "0": { "Settingupthegame": 1 }
    },
    "brick": {
      "0": { "TextParser": 4 }
    },
    "briefly": {
      "0": { "acintro9": 2 },
      "1": { "acintro1": 1 }
    },
    "Briefly": {
      "0": { "Settingupthegame": 1 }
    },
    "bright": {
      "0": { "EditingGUIs": 1 }
    },
    "brightening": {
      "0": { "Character": 1 }
    },
    "brighter": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "brightness": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "AdvancedRoomFeatures": 1 }
    },
    "bring": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "EditorSprite": 1 }
    },
    "Brings": {
      "0": { "GUIControl": 1 }
    },
    "brings": {
      "0": { "UpgradingTo27": 1 }
    },
    "BringToFront": {
      "0": { "GUIControl": 6 }
    },
    "British": {
      "0": { "TextParser": 1 }
    },
    "browse": {
      "0": { "FAQ": 1 }
    },
    "Browse": {
      "0": { "Scripting": 1 }
    },
    "browsers": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "browsing": {
      "0": { "EditingGUIs": 1 }
    },
    "btn": {
      "0": { "Tumbleweed_actions": 1 }
    },
    "btnBigButton": {
      "0": { "GUIControl": 4 }
    },
    "btnConfirm": {
      "0": { "GUIControl": 10 }
    },
    "btnController": {
      "0": { "Button": 3 }
    },
    "btnDeathAnim": {
      "0": { "Button": 4 }
    },
    "btnInteract": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "btnInvDown": {
      "0": { "InvWindow": 2 }
    },
    "btnInvUp": {
      "0": { "InvWindow": 2 }
    },
    "btnLook": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "btnOK": {
      "0": { "Button": 4 },
      "1": { "UpgradingTo271": 1 }
    },
    "btnPickup": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "btnPlay": {
      "0": { "Button": 4 }
    },
    "btnPlay's": {
      "0": { "Button": 4 }
    },
    "btnRestart": {
      "0": { "Button": 2 }
    },
    "btnSave": {
      "0": { "ScriptModules": 1 }
    },
    "btnSaveGame": {
      "0": { "GUIControl": 6 }
    },
    "btnScrnshot": {
      "0": { "DynamicSprite": 4 }
    },
    "btnScrollUp": {
      "0": { "InvWindow": 3 }
    },
    "btnTalk": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "bubble": {
      "0": { "Character": 6 },
      "1": { "Gamevariables": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "buffer": {
      "0": { "File": 4 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "UpgradingTo271": 1 }
    },
    "bug": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Credits": 1 }
    },
    "buggy": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "bugs": {
      "0": { "System": 1 }
    },
    "Build": {
      "0": { "UpgradeTo30": 3 },
      "1": { "FAQ": 2 },
      "2": { "acintro2": 1 }
    },
    "build": {
      "0": { "DistGame": 5 },
      "1": { "MusicAndSound": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Building": {
      "0": { "UpgradeTo34": 1 }
    },
    "Builds": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "builds": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "built": {
      "0": { "Multimedia": 1 }
    },
    "Built": {
      "0": { "UpgradeTo34": 1 }
    },
    "built-in": {
      "0": { "Settingupthegame": 7 },
      "1": { "UpgradeTo34": 5 },
      "2": { "Pointers": 3 },
      "3": { "ListBox": 2 },
      "4": { "acintro5": 1 }
    },
    "Bukin": {
      "0": { "Credits": 1 }
    },
    "bullet": {
      "0": { "Settingupthegame": 3 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "bunch": {
      "0": { "UpgradingTo27": 1 }
    },
    "bundled": {
      "0": { "AudioClip": 1 }
    },
    "busy": {
      "0": { "BlockingScripts": 2 },
      "1": { "AudioClip": 1 }
    },
    "BUTTON": {
      "0": { "TextScriptEvents": 2 },
      "1": { "Mouse": 1 }
    },
    "button": {
      "0": { "Button": 33 },
      "1": { "Settingupthegame": 16 },
      "2": { "EditingGUIs": 15 },
      "3": { "GUIControl": 13 },
      "4": { "FAQ": 8 },
      "5": { "Globalfunctions_General": 7 },
      "6": { "acintro3": 6 },
      "7": { "Mouse": 5 },
      "8": { "Tumbleweed_translation": 4 },
      "9": { "acintro6": 3 },
      "10": { "Debuggingfeatures": 2 },
      "11": { "EditorSprite": 1 }
    },
    "Button": {
      "0": { "Button": 61 },
      "1": { "GUIControl": 18 },
      "2": { "StandardEnums": 3 },
      "3": { "GUI": 2 },
      "4": { "ListBox": 1 }
    },
    "button's": {
      "0": { "Button": 18 }
    },
    "Button's": {
      "0": { "Button": 1 }
    },
    "ButtonAutoDisable": {
      "0": { "TemplateVerbcoin": 3 }
    },
    "buttons": {
      "0": { "Tumbleweed_translation": 6 },
      "1": { "EditingGUIs": 5 },
      "2": { "Tumbleweed_actions": 3 },
      "3": { "Mouse": 2 },
      "4": { "GUIControl": 1 }
    },
    "buttonSprite": {
      "0": { "DynamicSprite": 8 }
    },
    "buttonValue": {
      "0": { "UpgradingTo271": 1 }
    },
    "buy": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "bypassed": {
      "0": { "Tumbleweed_actions": 1 }
    },
    "bypassing": {
      "0": { "Game": 1 }
    },
    "byte": {
      "0": { "ScriptKeywords": 1 }
    },
    "bytecode": {
      "0": { "SystemLimits": 1 }
    },
    "bytes": {
      "0": { "File": 7 }
    },
    "C-style": {
      "0": { "Pointers": 2 }
    },
    "cache": {
      "0": { "DynamicSprite": 7 },
      "1": { "Setup": 3 }
    },
    "Cache": {
      "0": { "DynamicSprite": 1 }
    },
    "cached": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "CaesarCub": {
      "0": { "Credits": 1 }
    },
    "calculate": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "acintro4": 1 }
    },
    "calculated": {
      "0": { "Speech": 2 }
    },
    "Calculates": {
      "0": { "Maths": 12 },
      "1": { "Globalfunctions_General": 1 }
    },
    "calculates": {
      "0": { "Maths": 15 }
    },
    "calculation": {
      "0": { "Game": 1 }
    },
    "calculations": {
      "0": { "Character": 1 }
    },
    "call": {
      "0": { "Globalfunctions_General": 19 },
      "1": { "DynamicSprite": 18 },
      "2": { "Character": 15 },
      "3": { "UpgradingTo27": 5 },
      "4": { "ScriptingTutorialPart2": 4 },
      "5": { "CallingGlobalFunctions": 3 },
      "6": { "Globalfunctions_Room": 2 },
      "7": { "Tumbleweed": 1 }
    },
    "Call": {
      "0": { "Tumbleweed_door": 1 }
    },
    "callback": {
      "0": { "UpgradeTo34": 1 }
    },
    "callbacks": {
      "0": { "UpgradeTo34": 1 }
    },
    "called": {
      "0": { "TextScriptEvents": 10 },
      "1": { "Settingupthegame": 8 },
      "2": { "UpgradeTo34": 7 },
      "3": { "Tumbleweed": 6 },
      "4": { "CustomDialogOptions": 5 },
      "5": { "EditingGUIs": 4 },
      "6": { "acintro2": 3 },
      "7": { "UpgradeTo32": 2 },
      "8": { "Viewport": 1 }
    },
    "Called": {
      "0": { "TextScriptEvents": 10 }
    },
    "caller": {
      "0": { "ScriptKeywords": 1 }
    },
    "Calling": {
      "0": { "ListBox": 1 }
    },
    "calling": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "ScriptKeywords": 2 },
      "2": { "TextWindowGUI": 1 }
    },
    "CallRoomScript": {
      "0": { "TextParser": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "Gamevariables": 1 }
    },
    "Calls": {
      "0": { "Globalfunctions_General": 1 }
    },
    "calls": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "StandardEnums": 1 }
    },
    "calm": {
      "0": { "MusicAndSound": 1 }
    },
    "came": {
      "0": { "UpgradeTo32": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "Camera": {
      "0": { "Camera": 60 },
      "1": { "Game": 14 },
      "2": { "UpgradeTo350": 12 },
      "3": { "Viewport": 8 },
      "4": { "Globalfunctions_Room": 4 },
      "5": { "Screen": 2 }
    },
    "camera": {
      "0": { "Camera": 21 },
      "1": { "UpgradeTo350": 10 },
      "2": { "Viewport": 9 },
      "3": { "Screen": 5 },
      "4": { "Game": 4 },
      "5": { "Globalfunctions_Room": 3 },
      "6": { "AdvancedRoomFeatures": 1 }
    },
    "camera's": {
      "0": { "Camera": 10 },
      "1": { "UpgradeTo350": 3 },
      "2": { "Screen": 2 }
    },
    "Camera's": {
      "0": { "UpgradeTo350": 1 }
    },
    "CameraCount": {
      "0": { "Game": 4 }
    },
    "cameras": {
      "0": { "Camera": 5 },
      "1": { "Game": 3 },
      "2": { "Viewport": 1 }
    },
    "Cameras": {
      "0": { "Camera": 6 },
      "1": { "Game": 5 },
      "2": { "Screen": 1 }
    },
    "Can": {
      "0": { "ScriptModules": 1 }
    },
    "can": {
      "0": { "Settingupthegame": 73 },
      "1": { "Character": 53 },
      "2": { "ScriptingTutorialPart1": 29 },
      "3": { "Globalfunctions_General": 26 },
      "4": { "ScriptKeywords": 23 },
      "5": { "EditingGUIs": 21 },
      "6": { "DialogOptionsRenderingInfo": 19 },
      "7": { "acintro7": 18 },
      "8": { "AdvancedRoomFeatures": 17 },
      "9": { "MusicAndSound": 15 },
      "10": { "acintro9": 13 },
      "11": { "acintro3": 12 },
      "12": { "acintro8": 11 },
      "13": { "acintro1": 10 },
      "14": { "Speech": 9 },
      "15": { "ScriptingTutorialPart2": 8 },
      "16": { "UpgradingTo27": 7 },
      "17": { "TextScriptEvents": 6 },
      "18": { "UpgradingTo271": 5 },
      "19": { "Scripting": 4 },
      "20": { "Templates": 3 },
      "21": { "StringFormats": 2 },
      "22": { "UpgradeTo31": 1 }
    },
    "can't": {
      "0": { "DistGame": 2 },
      "1": { "Debuggingfeatures": 1 }
    },
    "CanBeAttackedHere": {
      "0": { "Room": 2 }
    },
    "cancel": {
      "0": { "Tumbleweed_movement": 2 }
    },
    "Cancel": {
      "0": { "Game": 3 }
    },
    "cancelled": {
      "0": { "Tumbleweed_movement": 11 },
      "1": { "Multimedia": 1 }
    },
    "cane": {
      "0": { "EditorView": 1 }
    },
    "cannot": {
      "0": { "Object": 6 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "Room": 4 },
      "3": { "Pointers": 3 },
      "4": { "acintro7": 2 },
      "5": { "Region": 1 }
    },
    "CANNOT": {
      "0": { "Character": 1 }
    },
    "canvas": {
      "0": { "DynamicSprite": 1 }
    },
    "capabilities": {
      "0": { "GlobalVariables": 1 }
    },
    "capable": {
      "0": { "UpgradeTo34": 1 }
    },
    "capital": {
      "0": { "UpgradingTo271": 1 }
    },
    "capped": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Caps": {
      "0": { "System": 2 }
    },
    "CAPS": {
      "0": { "System": 1 }
    },
    "CapsLock": {
      "0": { "System": 5 }
    },
    "caption": {
      "0": { "Globalfunctions_Message": 4 }
    },
    "captions": {
      "0": { "Speech": 1 }
    },
    "capture": {
      "0": { "Camera": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Captured": {
      "0": { "Camera": 1 }
    },
    "captures": {
      "0": { "Camera": 1 }
    },
    "card": {
      "0": { "GraphicsDriver": 4 },
      "1": { "Speech": 1 }
    },
    "cards": {
      "0": { "GraphicsDriver": 2 },
      "1": { "acintro1": 1 }
    },
    "care": {
      "0": { "Tumbleweed_helper": 1 }
    },
    "careful": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "ScriptingTutorialPart2": 1 }
    },
    "carriage": {
      "0": { "File": 1 }
    },
    "carries": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "carry": {
      "0": { "acintro5": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "carrying": {
      "0": { "acintro5": 1 }
    },
    "case": {
      "0": { "Character": 26 },
      "1": { "ScriptKeywords": 16 },
      "2": { "String": 10 },
      "3": { "Object": 6 },
      "4": { "ScriptingTutorialPart1": 5 },
      "5": { "Settingupthegame": 4 },
      "6": { "Set": 3 },
      "7": { "EditorSprite": 2 },
      "8": { "BlockingScripts": 1 }
    },
    "case-insensitive": {
      "0": { "Set": 2 },
      "1": { "Dictionary": 1 }
    },
    "case-sensitive": {
      "0": { "Dictionary": 2 }
    },
    "cases": {
      "0": { "UpgradeTo34": 3 },
      "1": { "Character": 2 },
      "2": { "acintro4": 1 }
    },
    "caseSensitive": {
      "0": { "String": 8 }
    },
    "cast": {
      "0": { "GUI": 1 }
    },
    "categorical": {
      "0": { "EditorRoom": 1 }
    },
    "category": {
      "0": { "EditorRoom": 1 }
    },
    "catnap": {
      "0": { "Lipsync": 1 }
    },
    "cause": {
      "0": { "IntegrationWithWindows": 2 },
      "1": { "TroubleshootingWindowsZoneID": 1 }
    },
    "caused": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "causes": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "causing": {
      "0": { "UpgradeTo350": 3 },
      "1": { "Tumbleweed_actions": 1 }
    },
    "cave": {
      "0": { "Tumbleweed": 1 }
    },
    "cBird": {
      "0": { "RepExec": 6 }
    },
    "cBman": {
      "0": { "Tumbleweed": 2 }
    },
    "cChar": {
      "0": { "EditorInventoryItems": 2 },
      "1": { "Tumbleweed_unhandled": 1 }
    },
    "cd": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "CD": {
      "0": { "Multimedia": 12 },
      "1": { "Credits": 1 }
    },
    "CD-ROM": {
      "0": { "Multimedia": 4 }
    },
    "CDAudio": {
      "0": { "Multimedia": 4 },
      "1": { "StandardEnums": 1 }
    },
    "cEgo": {
      "0": { "Character": 96 },
      "1": { "ScriptKeywords": 16 },
      "2": { "Globalfunctions_General": 8 },
      "3": { "ScriptingTutorialPart1": 5 },
      "4": { "ScriptingTutorialPart2": 3 },
      "5": { "Tumbleweed_player": 2 },
      "6": { "TextWindowGUI": 1 }
    },
    "cells": {
      "0": { "InvWindow": 2 },
      "1": { "acintro6": 1 }
    },
    "center": {
      "0": { "Screen": 1 }
    },
    "centered": {
      "0": { "Screen": 1 }
    },
    "central": {
      "0": { "Character": 1 }
    },
    "centre": {
      "0": { "DrawingSurfaceFunctions": 5 },
      "1": { "GUI": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Centre": {
      "0": { "GUI": 5 }
    },
    "centre-bottom": {
      "0": { "Character": 2 }
    },
    "centred": {
      "0": { "Gamevariables": 2 },
      "1": { "Globalfunctions_Message": 1 }
    },
    "CentreGUI": {
      "0": { "GUI": 1 }
    },
    "Centres": {
      "0": { "GUI": 1 }
    },
    "certain": {
      "0": { "Game": 2 },
      "1": { "GUIControl": 1 }
    },
    "certainly": {
      "0": { "Pointers": 1 }
    },
    "certificate": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "cfg": {
      "0": { "UpgradeTo341": 1 }
    },
    "ch": {
      "0": { "Tumbleweed_player": 1 }
    },
    "CHA": {
      "0": { "Settingupthegame": 1 }
    },
    "chain": {
      "0": { "Globalfunctions_General": 1 }
    },
    "chainsaw": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "chan": {
      "0": { "MusicAndSound": 2 }
    },
    "chance": {
      "0": { "Plugins": 1 }
    },
    "chances": {
      "0": { "SystemLimits": 1 }
    },
    "Change": {
      "0": { "acintro1": 1 }
    },
    "change": {
      "0": { "Character": 48 },
      "1": { "Object": 22 },
      "2": { "Settingupthegame": 17 },
      "3": { "Mouse": 16 },
      "4": { "Game": 9 },
      "5": { "Button": 8 },
      "6": { "Globalfunctions_General": 6 },
      "7": { "UpgradeTo30": 5 },
      "8": { "Camera": 4 },
      "9": { "acintro1": 3 },
      "10": { "Gamevariables": 2 },
      "11": { "DynamicArrays": 1 }
    },
    "ChangeCanvasSize": {
      "0": { "DynamicSprite": 5 }
    },
    "ChangeCharacterView": {
      "0": { "Character": 1 }
    },
    "ChangeCursorGraphic": {
      "0": { "Mouse": 1 }
    },
    "ChangeCursorHotspot": {
      "0": { "Mouse": 1 }
    },
    "Changed": {
      "0": { "Game": 1 }
    },
    "changed": {
      "0": { "Character": 7 },
      "1": { "String": 6 },
      "2": { "Object": 5 },
      "3": { "UpgradingTo27": 4 },
      "4": { "Settingupthegame": 3 },
      "5": { "Room": 2 },
      "6": { "ScriptKeywords": 1 }
    },
    "ChangeModeGraphic": {
      "0": { "Mouse": 8 },
      "1": { "StandardEnums": 1 }
    },
    "ChangeModeHotspot": {
      "0": { "Mouse": 5 },
      "1": { "StandardEnums": 1 }
    },
    "ChangeModeView": {
      "0": { "Mouse": 5 }
    },
    "ChangeRoom": {
      "0": { "Character": 9 },
      "1": { "Globalfunctions_General": 4 },
      "2": { "Tumbleweed_player": 1 }
    },
    "ChangeRoomAutoPosition": {
      "0": { "Character": 4 }
    },
    "CHANGES": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "Changes": {
      "0": { "Character": 6 },
      "1": { "Mouse": 4 },
      "2": { "Globalfunctions_General": 3 },
      "3": { "Globalfunctions_Room": 2 },
      "4": { "Region": 1 }
    },
    "changes": {
      "0": { "UpgradeTo30": 5 },
      "1": { "UpgradeTo32": 3 },
      "2": { "Room": 2 },
      "3": { "UpgradeTo350": 1 }
    },
    "ChangeTranslation": {
      "0": { "Game": 4 },
      "1": { "Globalfunctions_General": 1 }
    },
    "ChangeView": {
      "0": { "Character": 10 }
    },
    "ChangeVolumeType": {
      "0": { "Multimedia": 2 }
    },
    "Changing": {
      "0": { "Speech": 1 }
    },
    "changing": {
      "0": { "Character": 6 },
      "1": { "System": 2 },
      "2": { "Screen": 1 }
    },
    "channel": {
      "0": { "AudioChannel": 47 },
      "1": { "DynamicSprite": 7 },
      "2": { "System": 4 },
      "3": { "UpgradeTo32": 3 },
      "4": { "AudioClip": 2 },
      "5": { "CustomDialogOptions": 1 }
    },
    "Channel": {
      "0": { "System": 2 }
    },
    "channel's": {
      "0": { "AudioChannel": 2 }
    },
    "channels": {
      "0": { "AudioClip": 4 },
      "1": { "System": 3 },
      "2": { "MusicAndSound": 2 },
      "3": { "SystemLimits": 1 }
    },
    "Channels": {
      "0": { "MusicAndSound": 2 },
      "1": { "System": 1 }
    },
    "chaotic": {
      "0": { "UpgradeTo32": 1 }
    },
    "Chapter": {
      "0": { "MusicAndSound": 2 },
      "1": { "ScriptingTutorialPart1": 1 }
    },
    "chapter": {
      "0": { "MusicAndSound": 1 }
    },
    "chapters": {
      "0": { "EditorView": 1 }
    },
    "char": {
      "0": { "Tumbleweed_extensions": 3 },
      "1": { "ScriptKeywords": 2 },
      "2": { "DynamicArrays": 1 }
    },
    "character": {
      "0": { "Character": 263 },
      "1": { "Settingupthegame": 65 },
      "2": { "acintro7": 24 },
      "3": { "Globalfunctions_General": 22 },
      "4": { "EventTypes": 16 },
      "5": { "Tumbleweed_movement": 15 },
      "6": { "String": 14 },
      "7": { "UpgradingTo27": 13 },
      "8": { "EditorView": 12 },
      "9": { "acintro2": 11 },
      "10": { "AdvancedRoomFeatures": 9 },
      "11": { "acintro8": 8 },
      "12": { "ScriptingTutorialPart1": 7 },
      "13": { "Globalfunctions_Room": 6 },
      "14": { "Speech": 5 },
      "15": { "acintro5": 4 },
      "16": { "acintro1": 3 },
      "17": { "Region": 2 },
      "18": { "DynamicArrays": 1 }
    },
    "Character": {
      "0": { "Character": 333 },
      "1": { "StandardEnums": 18 },
      "2": { "Settingupthegame": 16 },
      "3": { "Globalfunctions_General": 11 },
      "4": { "Tumbleweed_movement": 5 },
      "5": { "Region": 4 },
      "6": { "Hotspot": 3 },
      "7": { "UpgradeTo34": 2 },
      "8": { "Pointers": 1 }
    },
    "CHARACTER": {
      "0": { "Character": 1 }
    },
    "character's": {
      "0": { "Character": 96 },
      "1": { "Settingupthegame": 13 },
      "2": { "Speech": 5 },
      "3": { "ScriptingTutorialPart1": 3 },
      "4": { "AdvancedRoomFeatures": 2 },
      "5": { "ScriptKeywords": 1 }
    },
    "Character's": {
      "0": { "Character": 1 }
    },
    "character-specific": {
      "0": { "TextWindowGUI": 1 }
    },
    "CharacterCount": {
      "0": { "Game": 3 },
      "1": { "ScriptKeywords": 2 },
      "2": { "DynamicArrays": 1 }
    },
    "CharacterDirection": {
      "0": { "Character": 2 },
      "1": { "StandardEnums": 1 }
    },
    "characterHealth": {
      "0": { "DynamicArrays": 2 }
    },
    "CHARACTERS": {
      "0": { "UpgradeTo30": 1 }
    },
    "Characters": {
      "0": { "Settingupthegame": 6 },
      "1": { "acintro7": 4 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "Pointers": 1 }
    },
    "characters": {
      "0": { "Character": 19 },
      "1": { "Settingupthegame": 8 },
      "2": { "EditorRoom": 7 },
      "3": { "String": 6 },
      "4": { "Game": 5 },
      "5": { "UpgradeTo350": 4 },
      "6": { "Translations": 3 },
      "7": { "EditorInventoryItems": 2 },
      "8": { "SystemLimits": 1 }
    },
    "CharacterToUse": {
      "0": { "InvWindow": 3 }
    },
    "CHARGED": {
      "0": { "Copyright": 1 }
    },
    "CHARID": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Character": 4 },
      "2": { "Globalfunctions_Room": 1 }
    },
    "charid": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "charidtogoto": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "charidwhogoes": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "Chars": {
      "0": { "String": 6 }
    },
    "chars": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "CHARTOFOLLOW": {
      "0": { "Character": 8 }
    },
    "chartofollow": {
      "0": { "Character": 1 }
    },
    "chasing": {
      "0": { "Character": 1 }
    },
    "cheat": {
      "0": { "Debuggingfeatures": 1 }
    },
    "check": {
      "0": { "Settingupthegame": 4 },
      "1": { "SourceControl": 3 },
      "2": { "EditorView": 2 },
      "3": { "acintro6": 1 }
    },
    "Check": {
      "0": { "Globalfunctions_General": 1 }
    },
    "check-box": {
      "0": { "Settingupthegame": 1 }
    },
    "check-boxes": {
      "0": { "acintro8": 1 }
    },
    "Checkbox": {
      "0": { "EditorView": 1 }
    },
    "checkbox": {
      "0": { "GUI": 2 },
      "1": { "FAQ": 1 }
    },
    "checkboxes": {
      "0": { "Settingupthegame": 1 }
    },
    "CheckDefaultAction": {
      "0": { "Tumbleweed_actions": 4 },
      "1": { "Tumbleweed_extensions": 2 }
    },
    "checked": {
      "0": { "Character": 6 },
      "1": { "Room": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "UpgradeTo335": 1 }
    },
    "checkers": {
      "0": { "DistGame": 1 }
    },
    "Checking": {
      "0": { "Preprocessor": 2 },
      "1": { "ScriptingTutorialPart1": 1 }
    },
    "checking": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Pointers": 1 }
    },
    "Checkins": {
      "0": { "SourceControl": 1 }
    },
    "checklist": {
      "0": { "Settingupthegame": 1 }
    },
    "Checks": {
      "0": { "Character": 6 },
      "1": { "Object": 4 },
      "2": { "File": 3 },
      "3": { "Globalfunctions_Room": 2 },
      "4": { "GUIControl": 1 }
    },
    "checks": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Tumbleweed_actions": 2 },
      "2": { "Character": 1 }
    },
    "chicken": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "chm": {
      "0": { "TroubleshootingWindowsZoneID": 2 }
    },
    "choice": {
      "0": { "Settingupthegame": 2 },
      "1": { "UpgradeTo34": 1 }
    },
    "choices": {
      "0": { "Settingupthegame": 10 },
      "1": { "acintro1": 1 }
    },
    "choose": {
      "0": { "Settingupthegame": 16 },
      "1": { "Setup": 7 },
      "2": { "EditingGUIs": 4 },
      "3": { "acintro1": 3 },
      "4": { "Translations": 2 },
      "5": { "DistGame": 1 }
    },
    "Choose": {
      "0": { "acintro2": 1 }
    },
    "chooses": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Choosing": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "choosing": {
      "0": { "Settingupthegame": 3 },
      "1": { "Tumbleweed": 1 }
    },
    "chose": {
      "0": { "acintro6": 1 }
    },
    "chosen": {
      "0": { "Dialog": 10 },
      "1": { "acintro1": 2 },
      "2": { "Character": 1 }
    },
    "CHRIS": {
      "0": { "Copyright": 1 }
    },
    "Chris": {
      "0": { "Copyright": 4 },
      "1": { "Credits": 2 },
      "2": { "Introduction": 1 }
    },
    "chunks": {
      "0": { "DistGame": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "chwhogoes": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "circle": {
      "0": { "DrawingSurfaceFunctions": 3 },
      "1": { "TemplateVerbcoin": 1 }
    },
    "circumstances": {
      "0": { "GUI": 1 }
    },
    "CJ": {
      "0": { "UpgradingTo27": 1 }
    },
    "cJack": {
      "0": { "InvWindow": 1 }
    },
    "cJoe": {
      "0": { "FAQ": 1 }
    },
    "cJohn": {
      "0": { "ScriptKeywords": 4 },
      "1": { "ExtenderFunctions": 1 }
    },
    "ClaimEvent": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "ScriptModules": 1 }
    },
    "clarify": {
      "0": { "Settingupthegame": 1 }
    },
    "class": {
      "0": { "UpgradeTo33": 5 }
    },
    "classed": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "classic": {
      "0": { "Tumbleweed": 1 }
    },
    "Classic": {
      "0": { "Settingupthegame": 1 }
    },
    "classics": {
      "0": { "Introduction": 1 }
    },
    "clause": {
      "0": { "ScriptKeywords": 1 }
    },
    "clauses": {
      "0": { "GlobalVariables": 1 }
    },
    "clean": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "cleaner": {
      "0": { "UpgradingTo27": 1 }
    },
    "clear": {
      "0": { "ScriptKeywords": 2 },
      "1": { "TextBox": 1 }
    },
    "Clear": {
      "0": { "ListBox": 7 },
      "1": { "DrawingSurfaceFunctions": 3 },
      "2": { "Dictionary": 2 },
      "3": { "DialogOptionsRenderingInfo": 1 }
    },
    "cleared": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "clearer": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "clears": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "Clears": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "clever": {
      "0": { "Tumbleweed_door": 1 }
    },
    "cleverer": {
      "0": { "Lipsync": 1 }
    },
    "Click": {
      "0": { "GUI": 7 },
      "1": { "Mouse": 3 },
      "2": { "EditingGUIs": 2 },
      "3": { "FAQ": 1 }
    },
    "click": {
      "0": { "Settingupthegame": 15 },
      "1": { "BlockingScripts": 8 },
      "2": { "Globalfunctions_General": 7 },
      "3": { "acintro1": 6 },
      "4": { "CustomProperties": 5 },
      "5": { "TemplateVerbcoin": 4 },
      "6": { "EditorSprite": 3 },
      "7": { "Character": 2 },
      "8": { "Tumbleweed_translation": 1 }
    },
    "clickable": {
      "0": { "GUI": 4 },
      "1": { "GUIControl": 2 },
      "2": { "Tumbleweed_player": 1 }
    },
    "Clickable": {
      "0": { "GUIControl": 7 },
      "1": { "GUI": 6 },
      "2": { "Object": 4 },
      "3": { "Settingupthegame": 2 },
      "4": { "FAQ": 1 }
    },
    "Clicked": {
      "0": { "Object": 1 }
    },
    "clicked": {
      "0": { "Settingupthegame": 5 },
      "1": { "Tumbleweed": 2 },
      "2": { "InventoryItem": 1 }
    },
    "clicking": {
      "0": { "FAQ": 4 },
      "1": { "EditorRoom": 3 },
      "2": { "EditorInventoryItems": 2 },
      "3": { "EditorSprite": 1 }
    },
    "Clicking": {
      "0": { "Tumbleweed": 3 },
      "1": { "Tumbleweed_extensions": 1 }
    },
    "Clicks": {
      "0": { "EventTypes": 1 }
    },
    "clicks": {
      "0": { "EventTypes": 15 },
      "1": { "Globalfunctions_General": 7 },
      "2": { "EditingGUIs": 4 },
      "3": { "Settingupthegame": 3 },
      "4": { "Mouse": 2 },
      "5": { "InventoryItem": 1 }
    },
    "climbed": {
      "0": { "Globalfunctions_General": 4 }
    },
    "clip": {
      "0": { "AudioClip": 28 },
      "1": { "AudioChannel": 19 },
      "2": { "MusicAndSound": 6 },
      "3": { "ViewFrame": 2 },
      "4": { "Speech": 1 }
    },
    "Clip": {
      "0": { "MusicAndSound": 1 }
    },
    "clip's": {
      "0": { "AudioChannel": 3 }
    },
    "clipboard": {
      "0": { "acintro6": 1 }
    },
    "ClipImage": {
      "0": { "Button": 5 }
    },
    "clipped": {
      "0": { "EditingGUIs": 1 }
    },
    "clips": {
      "0": { "Multimedia": 9 },
      "1": { "AudioClip": 4 },
      "2": { "MusicAndSound": 3 },
      "3": { "UpgradeTo341": 2 },
      "4": { "AudioChannel": 1 }
    },
    "Clips": {
      "0": { "UpgradeTo32": 1 }
    },
    "clipViewport": {
      "0": { "Viewport": 6 }
    },
    "clock": {
      "0": { "DateTime": 1 }
    },
    "clockwise": {
      "0": { "DynamicSprite": 3 }
    },
    "Close": {
      "0": { "File": 20 },
      "1": { "Pointers": 2 },
      "2": { "EditorSprite": 1 }
    },
    "close": {
      "0": { "File": 8 },
      "1": { "Speech": 2 },
      "2": { "AudioChannel": 1 }
    },
    "close-up": {
      "0": { "Speech": 2 },
      "1": { "acintro4": 1 }
    },
    "closed": {
      "0": { "Tumbleweed_door": 8 },
      "1": { "Multimedia": 1 }
    },
    "closer": {
      "0": { "Tumbleweed_translation": 2 },
      "1": { "AudioChannel": 1 }
    },
    "Closes": {
      "0": { "File": 1 }
    },
    "closesound": {
      "0": { "Tumbleweed_door": 2 }
    },
    "closest": {
      "0": { "acintro7": 1 }
    },
    "closevalue": {
      "0": { "Tumbleweed_door": 2 }
    },
    "closing": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "clothes": {
      "0": { "Character": 1 }
    },
    "cluttered": {
      "0": { "Settingupthegame": 1 }
    },
    "cMan": {
      "0": { "Character": 15 }
    },
    "cMary": {
      "0": { "ScriptKeywords": 4 }
    },
    "cMerchant": {
      "0": { "acintro8": 2 }
    },
    "cMichael": {
      "0": { "MusicAndSound": 1 }
    },
    "cNPC": {
      "0": { "Character": 1 }
    },
    "co": {
      "0": { "ContactingTheDevelopers": 2 },
      "1": { "Character": 1 }
    },
    "co-ordinate": {
      "0": { "Object": 10 },
      "1": { "Character": 7 },
      "2": { "UpgradeTo31": 4 },
      "3": { "Hotspot": 2 },
      "4": { "Globalfunctions_Message": 1 }
    },
    "co-ordinates": {
      "0": { "DrawingSurfaceFunctions": 14 },
      "1": { "GUI": 11 },
      "2": { "Game": 8 },
      "3": { "Globalfunctions_Room": 7 },
      "4": { "Region": 4 },
      "5": { "Globalfunctions_General": 3 },
      "6": { "Mouse": 2 },
      "7": { "acintro9": 1 }
    },
    "code": {
      "0": { "ScriptKeywords": 8 },
      "1": { "Preprocessor": 7 },
      "2": { "Globalfunctions_General": 6 },
      "3": { "RepExec": 5 },
      "4": { "Debuggingfeatures": 4 },
      "5": { "ScriptModules": 3 },
      "6": { "ExtenderFunctions": 2 },
      "7": { "OOProgramming": 1 }
    },
    "Code": {
      "0": { "StringFormats": 1 }
    },
    "codec": {
      "0": { "Multimedia": 1 }
    },
    "codecs": {
      "0": { "Multimedia": 1 }
    },
    "coded": {
      "0": { "acintro9": 1 }
    },
    "codes": {
      "0": { "ASCIIcodes": 4 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "Game": 1 }
    },
    "coding": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "UpgradingTo27": 1 }
    },
    "Coin": {
      "0": { "InventoryItem": 1 }
    },
    "collaborative": {
      "0": { "Credits": 1 }
    },
    "Collavini": {
      "0": { "Credits": 1 }
    },
    "colliding": {
      "0": { "Character": 7 },
      "1": { "Object": 2 }
    },
    "collisions": {
      "0": { "Character": 1 }
    },
    "colon": {
      "0": { "Settingupthegame": 1 }
    },
    "color": {
      "0": { "ScriptKeywords": 6 },
      "1": { "Gamevariables": 5 },
      "2": { "CustomDialogOptions": 4 },
      "3": { "TextWindowGUI": 3 },
      "4": { "TemplateVerbcoin": 2 },
      "5": { "TextBox": 1 }
    },
    "Color": {
      "0": { "Gamevariables": 2 }
    },
    "COLOR": {
      "0": { "Globalfunctions_Message": 4 },
      "1": { "DrawingSurfaceFunctions": 2 },
      "2": { "Overlay": 1 }
    },
    "ColorDepth": {
      "0": { "System": 5 },
      "1": { "Room": 3 },
      "2": { "DrawingSurfaceFunctions": 1 }
    },
    "colormodes": {
      "0": { "Settingupthegame": 1 }
    },
    "colors": {
      "0": { "TextWindowGUI": 1 }
    },
    "COLOUR": {
      "0": { "DrawingSurfaceFunctions": 2 }
    },
    "colour": {
      "0": { "DrawingSurfaceFunctions": 18 },
      "1": { "Settingupthegame": 15 },
      "2": { "acintro1": 12 },
      "3": { "AdvancedRoomFeatures": 6 },
      "4": { "Globalfunctions_General": 5 },
      "5": { "acintro6": 4 },
      "6": { "Gamevariables": 3 },
      "7": { "Game": 2 },
      "8": { "Label": 1 }
    },
    "Colour": {
      "0": { "Settingupthegame": 3 },
      "1": { "acintro1": 2 },
      "2": { "EditingGUIs": 1 }
    },
    "colours": {
      "0": { "Settingupthegame": 13 },
      "1": { "acintro1": 11 },
      "2": { "Globalfunctions_Palette": 6 },
      "3": { "acintro6": 4 },
      "4": { "AdvancedRoomFeatures": 2 },
      "5": { "acintro5": 1 }
    },
    "Colours": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro1": 1 }
    },
    "ColourType": {
      "0": { "acintro1": 1 }
    },
    "column": {
      "0": { "Settingupthegame": 3 },
      "1": { "UpgradeTo31": 1 }
    },
    "com": {
      "0": { "Credits": 1 }
    },
    "COM": {
      "0": { "Pointers": 1 }
    },
    "combination": {
      "0": { "StandardEnums": 2 },
      "1": { "Tumbleweed_extensions": 1 }
    },
    "combinations": {
      "0": { "Lipsync": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "combine": {
      "0": { "EventTypes": 1 }
    },
    "combined": {
      "0": { "UpgradeTo33": 1 }
    },
    "combo": {
      "0": { "EditorRoom": 1 }
    },
    "combobox": {
      "0": { "acintro2": 3 },
      "1": { "EditorSprite": 1 }
    },
    "come": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Tumbleweed_unhandled": 1 }
    },
    "comes": {
      "0": { "acintro1": 3 },
      "1": { "AutonumberSpeechFiles": 1 }
    },
    "comfortable": {
      "0": { "Settingupthegame": 1 }
    },
    "comma": {
      "0": { "TextParser": 3 }
    },
    "Command": {
      "0": { "EditingGUIs": 1 }
    },
    "COMMAND": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "Multimedia": 1 }
    },
    "command": {
      "0": { "Character": 48 },
      "1": { "Globalfunctions_General": 22 },
      "2": { "Object": 19 },
      "3": { "ScriptingTutorialPart1": 16 },
      "4": { "DynamicSprite": 15 },
      "5": { "UpgradeTo30": 9 },
      "6": { "Settingupthegame": 8 },
      "7": { "DrawingSurfaceFunctions": 7 },
      "8": { "UpgradeTo32": 6 },
      "9": { "Region": 5 },
      "10": { "Hotspot": 4 },
      "11": { "EditingGUIs": 3 },
      "12": { "DynamicArrays": 2 },
      "13": { "Slider": 1 }
    },
    "commands": {
      "0": { "Settingupthegame": 13 },
      "1": { "UpgradingTo27": 10 },
      "2": { "DynamicSprite": 9 },
      "3": { "Character": 6 },
      "4": { "UpgradeTo32": 5 },
      "5": { "Globalfunctions_General": 3 },
      "6": { "DrawingSurfaceFunctions": 2 },
      "7": { "Region": 1 }
    },
    "Commands": {
      "0": { "UpgradingTo27": 1 }
    },
    "commas": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "commences": {
      "0": { "Globalfunctions_General": 1 }
    },
    "comment": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "comments": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "ContactingTheDevelopers": 1 }
    },
    "commits": {
      "0": { "File": 1 }
    },
    "Commits": {
      "0": { "Globalfunctions_Palette": 1 }
    },
    "common": {
      "0": { "GUIControl": 1 }
    },
    "Common": {
      "0": { "Settingupthegame": 1 }
    },
    "Commonly": {
      "0": { "Speech": 1 }
    },
    "commonly": {
      "0": { "ScriptKeywords": 3 },
      "1": { "UpgradeTo350": 1 }
    },
    "commonly-used": {
      "0": { "acintro7": 1 }
    },
    "community": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "comparable": {
      "0": { "OOProgramming": 1 }
    },
    "Compare": {
      "0": { "Dictionary": 2 }
    },
    "compare": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Pointers": 1 }
    },
    "compared": {
      "0": { "Pointers": 1 }
    },
    "compares": {
      "0": { "ScriptingTutorialPart1": 5 }
    },
    "Compares": {
      "0": { "ScriptKeywords": 1 }
    },
    "compareStyle": {
      "0": { "Dictionary": 1 }
    },
    "CompareStyle": {
      "0": { "Dictionary": 3 }
    },
    "CompareTo": {
      "0": { "String": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "comparison": {
      "0": { "Viewport": 1 }
    },
    "comparisons": {
      "0": { "TemplateBASS": 1 }
    },
    "COMPAT": {
      "0": { "ScriptKeywords": 2 }
    },
    "compatibility": {
      "0": { "Settingupthegame": 6 },
      "1": { "UpgradingTo271": 2 },
      "2": { "UpgradeTo335": 1 }
    },
    "Compatibility": {
      "0": { "Character": 28 },
      "1": { "Game": 15 },
      "2": { "Object": 13 },
      "3": { "AudioChannel": 12 },
      "4": { "System": 10 },
      "5": { "AudioClip": 8 },
      "6": { "GUI": 7 },
      "7": { "Maths": 6 },
      "8": { "Globalfunctions_General": 5 },
      "9": { "File": 4 },
      "10": { "Slider": 3 },
      "11": { "Region": 2 },
      "12": { "GUIControl": 1 }
    },
    "COMPATIBILITY": {
      "0": { "CustomDialogOptions": 1 }
    },
    "compatible": {
      "0": { "UpgradingTo27": 1 }
    },
    "compensate": {
      "0": { "Gamevariables": 2 }
    },
    "compilation": {
      "0": { "Settingupthegame": 3 },
      "1": { "UpgradeTo341": 2 },
      "2": { "UpgradeTo33": 1 }
    },
    "Compile": {
      "0": { "Translations": 1 }
    },
    "compile": {
      "0": { "UpgradeTo30": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "compile-time": {
      "0": { "Preprocessor": 1 }
    },
    "compiled": {
      "0": { "UpgradeTo341": 5 },
      "1": { "ScriptKeywords": 2 },
      "2": { "Translations": 1 }
    },
    "Compiled": {
      "0": { "UpgradeTo341": 8 },
      "1": { "DistGame": 5 },
      "2": { "Translations": 1 }
    },
    "compiler": {
      "0": { "Settingupthegame": 3 },
      "1": { "ScriptingTutorialPart1": 1 }
    },
    "Compiler": {
      "0": { "UpgradeTo34": 1 }
    },
    "compiling": {
      "0": { "acintro1": 1 }
    },
    "complete": {
      "0": { "MusicAndSound": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "completed": {
      "0": { "Gamevariables": 1 }
    },
    "completely": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "complex": {
      "0": { "ScriptKeywords": 1 }
    },
    "complexity": {
      "0": { "SystemRequirements": 1 }
    },
    "complicated": {
      "0": { "acintro1": 1 }
    },
    "comply": {
      "0": { "DistGame": 1 }
    },
    "component": {
      "0": { "Gamevariables": 3 },
      "1": { "Credits": 1 }
    },
    "components": {
      "0": { "Globalfunctions_Palette": 2 },
      "1": { "Game": 1 }
    },
    "Compress": {
      "0": { "Settingupthegame": 1 }
    },
    "COMPRESS": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "compressed": {
      "0": { "Settingupthegame": 1 }
    },
    "compression": {
      "0": { "MusicAndSound": 1 }
    },
    "computer": {
      "0": { "TroubleshootingWindowsZoneID": 4 },
      "1": { "EventTypes": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "computers": {
      "0": { "acintro1": 1 }
    },
    "concept": {
      "0": { "UpgradeTo350": 3 }
    },
    "concepts": {
      "0": { "Tumbleweed": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "Conceptually": {
      "0": { "UpgradeTo335": 1 }
    },
    "concerned": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "concludes": {
      "0": { "Pointers": 1 }
    },
    "Conclusion": {
      "0": { "MusicAndSound": 1 }
    },
    "Conclusions": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "Concurrency": {
      "0": { "UpgradeTo30": 1 }
    },
    "condition": {
      "0": { "ScriptingTutorialPart2": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "conditional": {
      "0": { "ScriptKeywords": 1 }
    },
    "conditionally": {
      "0": { "Settingupthegame": 1 }
    },
    "conditions": {
      "0": { "GUI": 3 },
      "1": { "ScriptingTutorialPart2": 2 },
      "2": { "Tumbleweed_helper": 1 }
    },
    "config": {
      "0": { "UpgradeTo335": 4 },
      "1": { "UpgradeTo341": 3 },
      "2": { "Settingupthegame": 1 }
    },
    "configurable": {
      "0": { "acintro3": 1 }
    },
    "configuration": {
      "0": { "Settingupthegame": 2 },
      "1": { "Mouse": 1 }
    },
    "configurations": {
      "0": { "SystemRequirements": 1 }
    },
    "configure": {
      "0": { "EditorCharacter": 1 }
    },
    "configured": {
      "0": { "MusicAndSound": 1 }
    },
    "confined": {
      "0": { "acintro5": 1 }
    },
    "confirm": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Confirm": {
      "0": { "acintro1": 1 }
    },
    "conflict": {
      "0": { "Settingupthegame": 2 },
      "1": { "UpgradeTo34": 1 }
    },
    "confuse": {
      "0": { "UpgradeTo350": 1 }
    },
    "confused": {
      "0": { "GUI": 1 }
    },
    "confusing": {
      "0": { "System": 2 },
      "1": { "Pointers": 1 }
    },
    "confusion": {
      "0": { "Multimedia": 1 }
    },
    "conjunction": {
      "0": { "GUIControl": 3 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "connect": {
      "0": { "Tumbleweed_door": 2 }
    },
    "connected": {
      "0": { "acintro2": 1 }
    },
    "connection": {
      "0": { "Lipsync": 1 }
    },
    "CONNECTION": {
      "0": { "Copyright": 1 }
    },
    "connects": {
      "0": { "Tumbleweed_actions": 1 }
    },
    "CONSEQUENTIAL": {
      "0": { "Copyright": 1 }
    },
    "conserving": {
      "0": { "ScriptKeywords": 1 }
    },
    "Consider": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "ScriptingTutorialPart2": 1 }
    },
    "consider": {
      "0": { "Screen": 1 }
    },
    "considered": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "OOProgramming": 1 }
    },
    "considering": {
      "0": { "TextParser": 1 }
    },
    "consistency": {
      "0": { "FAQ": 1 }
    },
    "consistent": {
      "0": { "OOProgramming": 1 }
    },
    "consists": {
      "0": { "StandardEnums": 1 }
    },
    "const": {
      "0": { "Hotspot": 3 },
      "1": { "Game": 2 },
      "2": { "TextWindowGUI": 1 }
    },
    "constant": {
      "0": { "ScriptKeywords": 1 }
    },
    "Constants": {
      "0": { "ScriptKeywords": 1 }
    },
    "constants": {
      "0": { "ScriptKeywords": 1 }
    },
    "constrained": {
      "0": { "AudioChannel": 1 }
    },
    "construction": {
      "0": { "ScriptKeywords": 1 }
    },
    "consult": {
      "0": { "FAQ": 1 }
    },
    "contact": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "Contacting": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "contacts": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "contain": {
      "0": { "BackingUpYourGame": 3 },
      "1": { "Viewport": 2 },
      "2": { "DistGame": 1 }
    },
    "contained": {
      "0": { "Set": 2 },
      "1": { "InvWindow": 1 }
    },
    "containers": {
      "0": { "Dictionary": 1 }
    },
    "containing": {
      "0": { "DynamicSprite": 3 },
      "1": { "Tumbleweed_door": 2 },
      "2": { "Preprocessor": 1 }
    },
    "Contains": {
      "0": { "Set": 5 },
      "1": { "Dictionary": 3 },
      "2": { "ListBox": 1 }
    },
    "contains": {
      "0": { "GUIControl": 5 },
      "1": { "ScriptingTutorialPart1": 3 },
      "2": { "TroubleshootingWindowsZoneID": 2 },
      "3": { "DistGame": 1 }
    },
    "contemporary": {
      "0": { "Settingupthegame": 1 }
    },
    "content": {
      "0": { "Preprocessor": 4 },
      "1": { "UpgradeTo34": 2 }
    },
    "contents": {
      "0": { "File": 4 },
      "1": { "ScriptKeywords": 2 },
      "2": { "EditorSprite": 1 }
    },
    "context": {
      "0": { "UpgradeTo33": 1 }
    },
    "Context": {
      "0": { "EditorView": 3 }
    },
    "continually": {
      "0": { "CustomDialogOptions": 1 }
    },
    "Continue": {
      "0": { "acintro1": 1 }
    },
    "continue": {
      "0": { "Globalfunctions_General": 7 },
      "1": { "ScriptKeywords": 6 },
      "2": { "UpgradeTo31": 4 },
      "3": { "Character": 3 },
      "4": { "UpgradeTo32": 2 },
      "5": { "Globalfunctions_Screen": 1 }
    },
    "continues": {
      "0": { "Character": 5 },
      "1": { "ScriptKeywords": 2 },
      "2": { "Multimedia": 1 }
    },
    "continuing": {
      "0": { "Multimedia": 2 },
      "1": { "Dialog": 1 }
    },
    "continuous": {
      "0": { "Globalfunctions_Room": 3 }
    },
    "continuously": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Character": 2 },
      "2": { "acintro9": 1 }
    },
    "contrary": {
      "0": { "RepExec": 1 }
    },
    "contributors": {
      "0": { "Copyright": 4 },
      "1": { "Introduction": 1 }
    },
    "CONTRIBUTORS": {
      "0": { "Copyright": 1 }
    },
    "Control": {
      "0": { "SourceControl": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "GUIControl": 1 }
    },
    "control": {
      "0": { "GUIControl": 41 },
      "1": { "SourceControl": 10 },
      "2": { "Settingupthegame": 8 },
      "3": { "Character": 7 },
      "4": { "EditorRoom": 6 },
      "5": { "System": 4 },
      "6": { "ScriptKeywords": 3 },
      "7": { "Game": 2 },
      "8": { "ScriptingTutorialPart1": 1 }
    },
    "control's": {
      "0": { "GUIControl": 5 },
      "1": { "Mouse": 1 }
    },
    "ControlCount": {
      "0": { "GUI": 4 },
      "1": { "GUIControl": 1 }
    },
    "ControlEnabled": {
      "0": { "Mouse": 5 }
    },
    "controlled": {
      "0": { "DynamicSprite": 7 },
      "1": { "Mouse": 5 },
      "2": { "TemplateSierraStyle": 1 }
    },
    "controlling": {
      "0": { "UpgradeTo32": 2 },
      "1": { "Character": 1 }
    },
    "CONTROLPANEL": {
      "0": { "GUI": 1 }
    },
    "Controls": {
      "0": { "GUI": 5 },
      "1": { "GUIControl": 2 },
      "2": { "UpgradeTo33": 1 }
    },
    "controls": {
      "0": { "GUIControl": 16 },
      "1": { "GUI": 7 },
      "2": { "Settingupthegame": 4 },
      "3": { "UpgradingTo27": 3 },
      "4": { "CustomDialogOptions": 2 },
      "5": { "Game": 1 }
    },
    "convenience": {
      "0": { "Screen": 1 }
    },
    "convenient": {
      "0": { "Object": 1 }
    },
    "convention": {
      "0": { "EditorInventoryItems": 2 },
      "1": { "UpgradeTo32": 1 }
    },
    "converge": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "conversation": {
      "0": { "Dialog": 11 },
      "1": { "Settingupthegame": 8 },
      "2": { "acintro8": 4 },
      "3": { "DialogOptionsRenderingInfo": 1 }
    },
    "conversations": {
      "0": { "Settingupthegame": 3 },
      "1": { "acintro8": 2 },
      "2": { "acintro7": 1 }
    },
    "Conversations": {
      "0": { "acintro8": 2 },
      "1": { "acintro": 1 }
    },
    "conversion": {
      "0": { "Screen": 4 },
      "1": { "UpgradeTo350": 3 },
      "2": { "Viewport": 2 }
    },
    "conversions": {
      "0": { "Maths": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "convert": {
      "0": { "Maths": 11 },
      "1": { "String": 2 },
      "2": { "DistGame": 1 }
    },
    "converted": {
      "0": { "Translations": 1 }
    },
    "converter": {
      "0": { "Multimedia": 1 }
    },
    "converting": {
      "0": { "UpgradeTo31": 1 }
    },
    "Converts": {
      "0": { "Maths": 4 },
      "1": { "String": 2 },
      "2": { "GUIControl": 1 }
    },
    "converts": {
      "0": { "Mouse": 1 }
    },
    "Cool": {
      "0": { "Game": 3 }
    },
    "cool": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "coordinate": {
      "0": { "Character": 4 },
      "1": { "Speech": 2 },
      "2": { "Globalfunctions_Message": 1 }
    },
    "coordinates": {
      "0": { "Viewport": 10 },
      "1": { "InventoryItem": 8 },
      "2": { "Screen": 5 },
      "3": { "Tumbleweed_movement": 4 },
      "4": { "Camera": 3 },
      "5": { "Game": 2 },
      "6": { "Mouse": 1 }
    },
    "coordination": {
      "0": { "Mouse": 1 }
    },
    "cope": {
      "0": { "Character": 1 }
    },
    "copied": {
      "0": { "EditorView": 2 },
      "1": { "DistGame": 1 }
    },
    "Copies": {
      "0": { "DynamicSprite": 1 }
    },
    "copies": {
      "0": { "MusicAndSound": 1 }
    },
    "copy": {
      "0": { "DynamicSprite": 13 },
      "1": { "DrawingSurfaceFunctions": 5 },
      "2": { "MusicAndSound": 3 },
      "3": { "ScriptKeywords": 2 },
      "4": { "Plugins": 1 }
    },
    "Copy": {
      "0": { "String": 3 },
      "1": { "KeyboardShortcuts": 1 }
    },
    "copying": {
      "0": { "ScriptKeywords": 1 }
    },
    "Copyright": {
      "0": { "Copyright": 5 },
      "1": { "Introduction": 1 }
    },
    "copyright": {
      "0": { "acintro9": 1 }
    },
    "CopyTransparencyMask": {
      "0": { "DynamicSprite": 3 }
    },
    "core": {
      "0": { "MusicAndSound": 1 }
    },
    "Core": {
      "0": { "Templates": 1 }
    },
    "corner": {
      "0": { "EditingGUIs": 6 },
      "1": { "Character": 4 },
      "2": { "DynamicSprite": 3 },
      "3": { "DialogOptionsRenderingInfo": 2 },
      "4": { "GUIControl": 1 }
    },
    "corners": {
      "0": { "DrawingSurfaceFunctions": 2 },
      "1": { "EditingGUIs": 1 }
    },
    "Cornjob": {
      "0": { "Credits": 1 }
    },
    "corp": {
      "0": { "Copyright": 1 }
    },
    "corporation": {
      "0": { "Copyright": 1 }
    },
    "correct": {
      "0": { "Settingupthegame": 4 },
      "1": { "GUIControl": 1 }
    },
    "correctly": {
      "0": { "Screen": 2 },
      "1": { "Object": 1 }
    },
    "correspond": {
      "0": { "Lipsync": 2 },
      "1": { "DialogOptionsRenderingInfo": 1 }
    },
    "corresponding": {
      "0": { "Screen": 2 },
      "1": { "Translations": 1 }
    },
    "correspondingly": {
      "0": { "Settingupthegame": 1 }
    },
    "corresponds": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "Cos": {
      "0": { "Maths": 15 }
    },
    "Cosh": {
      "0": { "Maths": 5 }
    },
    "cosine": {
      "0": { "Maths": 9 }
    },
    "cost": {
      "0": { "Settingupthegame": 1 }
    },
    "could": {
      "0": { "ScriptKeywords": 7 },
      "1": { "Globalfunctions_General": 6 },
      "2": { "Game": 5 },
      "3": { "ScriptingTutorialPart2": 4 },
      "4": { "Templates": 3 },
      "5": { "UpgradeTo350": 2 },
      "6": { "String": 1 }
    },
    "couldn't": {
      "0": { "UpgradeTo31": 1 }
    },
    "Count": {
      "0": { "OOProgramming": 3 }
    },
    "COUNT": {
      "0": { "OOProgramming": 5 }
    },
    "count": {
      "0": { "Game": 3 },
      "1": { "ListBox": 2 }
    },
    "counter": {
      "0": { "ScriptingTutorialPart2": 10 },
      "1": { "ScriptKeywords": 5 },
      "2": { "Globalfunctions_Message": 4 },
      "3": { "ScriptingTutorialPart1": 3 },
      "4": { "Globalfunctions_General": 2 }
    },
    "counterpart": {
      "0": { "RepExec": 1 }
    },
    "counting": {
      "0": { "Pointers": 1 }
    },
    "counts": {
      "0": { "File": 3 }
    },
    "couple": {
      "0": { "Settingupthegame": 3 },
      "1": { "acintro9": 2 },
      "2": { "UpgradeTo30": 1 }
    },
    "course": {
      "0": { "ScriptingTutorialPart2": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "courtesy": {
      "0": { "Credits": 1 }
    },
    "cover": {
      "0": { "Screen": 1 }
    },
    "covered": {
      "0": { "ScriptingTutorialPart2": 2 },
      "1": { "OtherFeatures": 1 }
    },
    "covering": {
      "0": { "UpgradeTo350": 1 }
    },
    "covers": {
      "0": { "Globalfunctions_General": 1 }
    },
    "crash": {
      "0": { "MusicAndSound": 1 }
    },
    "crashed": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "Create": {
      "0": { "Dictionary": 7 },
      "1": { "Set": 5 },
      "2": { "StandardEnums": 4 },
      "3": { "Screen": 3 },
      "4": { "CustomDialogOptions": 2 },
      "5": { "Settingupthegame": 1 }
    },
    "create": {
      "0": { "Settingupthegame": 18 },
      "1": { "Game": 7 },
      "2": { "Overlay": 5 },
      "3": { "acintro9": 4 },
      "4": { "CustomProperties": 3 },
      "5": { "acintro1": 2 },
      "6": { "UpgradeTo32": 1 }
    },
    "CreateCopy": {
      "0": { "DrawingSurfaceFunctions": 3 }
    },
    "created": {
      "0": { "Settingupthegame": 6 },
      "1": { "ScriptKeywords": 4 },
      "2": { "File": 3 },
      "3": { "Camera": 2 },
      "4": { "Dictionary": 1 }
    },
    "CreateFromBackground": {
      "0": { "DynamicSprite": 3 }
    },
    "CreateFromDrawingSurface": {
      "0": { "DynamicSprite": 3 }
    },
    "CreateFromExistingSprite": {
      "0": { "DynamicSprite": 10 }
    },
    "CreateFromFile": {
      "0": { "DynamicSprite": 16 }
    },
    "CreateFromSaveGame": {
      "0": { "DynamicSprite": 5 },
      "1": { "Game": 1 }
    },
    "CreateFromScreenShot": {
      "0": { "DynamicSprite": 8 }
    },
    "CreateGraphical": {
      "0": { "Overlay": 4 }
    },
    "CreateGraphicOverlay": {
      "0": { "Overlay": 1 }
    },
    "creates": {
      "0": { "DynamicSprite": 7 },
      "1": { "DialogOptionsRenderingInfo": 5 },
      "2": { "Overlay": 3 },
      "3": { "ScriptKeywords": 1 }
    },
    "Creates": {
      "0": { "DynamicSprite": 5 },
      "1": { "Dictionary": 3 },
      "2": { "Set": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "CreateTextOverlay": {
      "0": { "Overlay": 1 }
    },
    "CreateTextual": {
      "0": { "Overlay": 16 },
      "1": { "StandardEnums": 1 }
    },
    "CreateYellowApple": {
      "0": { "ScriptKeywords": 2 }
    },
    "creating": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Character": 1 }
    },
    "Creating": {
      "0": { "acintro1": 4 },
      "1": { "acintro": 2 },
      "2": { "Translations": 1 }
    },
    "creation": {
      "0": { "UpgradeTo34": 1 }
    },
    "Credits": {
      "0": { "Credits": 1 }
    },
    "credits": {
      "0": { "Copyright": 1 }
    },
    "Cristian": {
      "0": { "Credits": 1 }
    },
    "crm": {
      "0": { "UpgradeTo350": 1 }
    },
    "CRM": {
      "0": { "BackingUpYourGame": 2 },
      "1": { "DistGame": 1 }
    },
    "cRoger": {
      "0": { "Settingupthegame": 1 }
    },
    "Crop": {
      "0": { "DynamicSprite": 7 }
    },
    "crop": {
      "0": { "DynamicSprite": 1 }
    },
    "Crops": {
      "0": { "DynamicSprite": 1 }
    },
    "cross": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "cross-hair": {
      "0": { "Settingupthegame": 1 }
    },
    "Cross-Platform": {
      "0": { "System": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "crosses": {
      "0": { "acintro3": 1 }
    },
    "Crossfade": {
      "0": { "Globalfunctions_General": 1 }
    },
    "CROSSFADEMUSIC": {
      "0": { "Globalfunctions_General": 1 }
    },
    "crosshair": {
      "0": { "acintro5": 3 },
      "1": { "EditorInventoryItems": 1 }
    },
    "cry": {
      "0": { "ExtenderFunctions": 1 }
    },
    "cSomeguy": {
      "0": { "Character": 3 }
    },
    "ctrl": {
      "0": { "ASCIIcodes": 2 },
      "1": { "FAQ": 1 }
    },
    "Ctrl": {
      "0": { "ASCIIcodes": 26 },
      "1": { "KeyboardShortcuts": 23 },
      "2": { "Debuggingfeatures": 4 },
      "3": { "acintro2": 2 },
      "4": { "Globalfunctions_General": 1 }
    },
    "Ctrl-A": {
      "0": { "Settingupthegame": 1 }
    },
    "Ctrl-D": {
      "0": { "Settingupthegame": 1 }
    },
    "Ctrl-Q": {
      "0": { "RuntimeEngine": 1 }
    },
    "Ctrl-S": {
      "0": { "Settingupthegame": 1 }
    },
    "Ctrl-X": {
      "0": { "Settingupthegame": 1 }
    },
    "cue": {
      "0": { "Game": 3 }
    },
    "cues": {
      "0": { "Settingupthegame": 1 }
    },
    "Cugniere": {
      "0": { "Credits": 1 }
    },
    "cunningly": {
      "0": { "acintro4": 1 }
    },
    "Cup": {
      "0": { "Tumbleweed": 3 },
      "1": { "Tumbleweed_extensions": 2 }
    },
    "cup": {
      "0": { "Tumbleweed": 6 },
      "1": { "acintro4": 2 }
    },
    "cupboard": {
      "0": { "Game": 1 }
    },
    "curly": {
      "0": { "acintro3": 1 }
    },
    "current": {
      "0": { "Character": 46 },
      "1": { "Globalfunctions_General": 22 },
      "2": { "Object": 19 },
      "3": { "DrawingSurfaceFunctions": 15 },
      "4": { "Mouse": 12 },
      "5": { "DynamicSprite": 9 },
      "6": { "ScriptKeywords": 8 },
      "7": { "Globalfunctions_Room": 7 },
      "8": { "AudioChannel": 6 },
      "9": { "Region": 5 },
      "10": { "DateTime": 4 },
      "11": { "ScriptingTutorialPart1": 3 },
      "12": { "Gamevariables": 2 },
      "13": { "Viewport": 1 }
    },
    "Current": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Currently": {
      "0": { "Globalfunctions_General": 1 }
    },
    "currently": {
      "0": { "Character": 17 },
      "1": { "Object": 16 },
      "2": { "Multimedia": 10 },
      "3": { "AudioChannel": 9 },
      "4": { "Globalfunctions_General": 5 },
      "5": { "Mouse": 4 },
      "6": { "Settingupthegame": 3 },
      "7": { "Region": 2 },
      "8": { "Globalfunctions_Room": 1 }
    },
    "cursor": {
      "0": { "Mouse": 55 },
      "1": { "Settingupthegame": 23 },
      "2": { "acintro9": 13 },
      "3": { "EventTypes": 12 },
      "4": { "InventoryItem": 9 },
      "5": { "EditorInventoryItems": 6 },
      "6": { "Character": 5 },
      "7": { "TemplateBASS": 4 },
      "8": { "Room": 3 },
      "9": { "Region": 2 },
      "10": { "Label": 1 }
    },
    "Cursor": {
      "0": { "TextScriptEvents": 6 },
      "1": { "EditorInventoryItems": 2 },
      "2": { "acintro9": 1 }
    },
    "cursor's": {
      "0": { "Mouse": 4 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "CursorGraphic": {
      "0": { "InventoryItem": 6 },
      "1": { "Mouse": 1 }
    },
    "CursorMode": {
      "0": { "Mouse": 5 },
      "1": { "InventoryItem": 2 },
      "2": { "GUI": 1 }
    },
    "cursors": {
      "0": { "acintro9": 10 },
      "1": { "Game": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "acintro6": 1 }
    },
    "Cursors": {
      "0": { "acintro9": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "GUI": 1 }
    },
    "curved": {
      "0": { "acintro2": 1 }
    },
    "custom": {
      "0": { "Settingupthegame": 8 },
      "1": { "InventoryItem": 6 },
      "2": { "Hotspot": 5 },
      "3": { "CustomProperties": 4 },
      "4": { "TextWindowGUI": 2 },
      "5": { "DynamicArrays": 1 }
    },
    "Custom": {
      "0": { "Settingupthegame": 6 },
      "1": { "UpgradeTo34": 4 },
      "2": { "CustomProperties": 2 },
      "3": { "OtherFeatures": 1 }
    },
    "CustomAnimation": {
      "0": { "Globalfunctions_General": 2 }
    },
    "CustomAvatar": {
      "0": { "DynamicSprite": 20 }
    },
    "customizable": {
      "0": { "ListBox": 1 }
    },
    "customization": {
      "0": { "Game": 1 }
    },
    "Customizations": {
      "0": { "Gamevariables": 1 }
    },
    "customize": {
      "0": { "Tumbleweed_translation": 3 },
      "1": { "UpgradeTo33": 1 }
    },
    "customized": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "Customized": {
      "0": { "EditingGUIs": 1 }
    },
    "CustomPortraitPlacement": {
      "0": { "Speech": 6 }
    },
    "cut": {
      "0": { "MusicAndSound": 1 }
    },
    "Cut": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "cutscene": {
      "0": { "Globalfunctions_General": 14 },
      "1": { "Game": 8 },
      "2": { "Settingupthegame": 3 },
      "3": { "GUIControl": 2 },
      "4": { "Globalfunctions_Room": 1 }
    },
    "cutscenes": {
      "0": { "Game": 2 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "Cutscenes": {
      "0": { "acintro7": 1 }
    },
    "CutsceneSkipType": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "StandardEnums": 1 }
    },
    "cycle": {
      "0": { "Settingupthegame": 3 },
      "1": { "Globalfunctions_Palette": 1 }
    },
    "cycled": {
      "0": { "acintro9": 1 }
    },
    "CyclePalette": {
      "0": { "Globalfunctions_Palette": 4 },
      "1": { "Globalfunctions_Screen": 2 },
      "2": { "AdvancedRoomFeatures": 1 }
    },
    "cycles": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "Globalfunctions_Screen": 2 },
      "2": { "Button": 1 }
    },
    "cycling": {
      "0": { "Mouse": 2 },
      "1": { "acintro9": 1 }
    },
    "d-bit": {
      "0": { "System": 1 }
    },
    "dagger": {
      "0": { "ScriptKeywords": 1 }
    },
    "damage": {
      "0": { "OOProgramming": 30 },
      "1": { "ScriptKeywords": 7 }
    },
    "DAMAGE": {
      "0": { "Copyright": 1 }
    },
    "Damage": {
      "0": { "OOProgramming": 11 },
      "1": { "ScriptKeywords": 3 }
    },
    "DAMAGES": {
      "0": { "Copyright": 2 }
    },
    "dance": {
      "0": { "ScriptingTutorialPart2": 4 }
    },
    "dark": {
      "0": { "Globalfunctions_Message": 1 }
    },
    "darken": {
      "0": { "Globalfunctions_General": 1 }
    },
    "darkening": {
      "0": { "AdvancedRoomFeatures": 2 },
      "1": { "Region": 1 }
    },
    "darker": {
      "0": { "AdvancedRoomFeatures": 2 }
    },
    "Darkness": {
      "0": { "Room": 2 }
    },
    "Das": {
      "0": { "Credits": 1 }
    },
    "DAT": {
      "0": { "Lipsync": 1 }
    },
    "dat": {
      "0": { "File": 15 },
      "1": { "Lipsync": 3 },
      "2": { "Pointers": 1 }
    },
    "data": {
      "0": { "File": 12 },
      "1": { "TroubleshootingWindowsZoneID": 8 },
      "2": { "Settingupthegame": 5 },
      "3": { "Globalfunctions_General": 3 },
      "4": { "UpgradeTo335": 2 },
      "5": { "UpgradeTo350": 1 }
    },
    "DATA": {
      "0": { "TextScriptEvents": 9 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "TroubleshootingWindowsZoneID": 1 }
    },
    "Data": {
      "0": { "ScriptKeywords": 1 }
    },
    "date": {
      "0": { "DateTime": 3 },
      "1": { "ScriptKeywords": 1 }
    },
    "DateTime": {
      "0": { "DateTime": 44 },
      "1": { "Scripting": 1 }
    },
    "daunting": {
      "0": { "Pointers": 1 }
    },
    "Davis": {
      "0": { "Credits": 1 }
    },
    "day": {
      "0": { "DateTime": 2 }
    },
    "Day": {
      "0": { "Settingupthegame": 1 }
    },
    "day-to-night": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "DayOfMonth": {
      "0": { "DateTime": 4 }
    },
    "days": {
      "0": { "Region": 1 }
    },
    "dDialogName": {
      "0": { "acintro8": 1 }
    },
    "DE": {
      "0": { "Tumbleweed": 2 }
    },
    "deal": {
      "0": { "acintro1": 1 }
    },
    "death": {
      "0": { "Button": 1 }
    },
    "DEBUG": {
      "0": { "ScriptKeywords": 2 }
    },
    "Debug": {
      "0": { "Debuggingfeatures": 6 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "acintro1": 1 }
    },
    "debug": {
      "0": { "Settingupthegame": 3 },
      "1": { "System": 2 },
      "2": { "acintro1": 1 }
    },
    "Debugger": {
      "0": { "KeyboardShortcuts": 2 },
      "1": { "UpgradeTo30": 1 }
    },
    "debugger": {
      "0": { "Debuggingfeatures": 3 },
      "1": { "System": 2 },
      "2": { "acintro2": 1 }
    },
    "Debugging": {
      "0": { "ScriptKeywords": 1 }
    },
    "debugging": {
      "0": { "Debuggingfeatures": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "decent": {
      "0": { "Setup": 1 }
    },
    "decide": {
      "0": { "Settingupthegame": 3 },
      "1": { "MusicAndSound": 2 },
      "2": { "Globalfunctions_Room": 1 }
    },
    "decided": {
      "0": { "acintro1": 1 }
    },
    "decides": {
      "0": { "acintro6": 1 }
    },
    "decimal": {
      "0": { "ScriptKeywords": 1 }
    },
    "decision": {
      "0": { "acintro1": 1 }
    },
    "decisions": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "declaration": {
      "0": { "ScriptKeywords": 7 },
      "1": { "ExtenderFunctions": 1 }
    },
    "declarations": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "declare": {
      "0": { "ScriptKeywords": 9 },
      "1": { "ScriptingTutorialPart1": 3 },
      "2": { "Pointers": 1 }
    },
    "declared": {
      "0": { "ScriptKeywords": 4 },
      "1": { "Pointers": 3 },
      "2": { "Settingupthegame": 1 }
    },
    "declares": {
      "0": { "ScriptKeywords": 4 },
      "1": { "SystemLimits": 1 }
    },
    "Declares": {
      "0": { "ScriptKeywords": 5 }
    },
    "declaring": {
      "0": { "Pointers": 1 }
    },
    "Declaring": {
      "0": { "ScriptKeywords": 1 }
    },
    "Decoder": {
      "0": { "acintro9": 1 }
    },
    "decoder": {
      "0": { "Credits": 3 },
      "1": { "DistGame": 2 }
    },
    "decrease": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "deep": {
      "0": { "SystemLimits": 1 }
    },
    "def": {
      "0": { "Tumbleweed_actions": 1 }
    },
    "default": {
      "0": { "Character": 28 },
      "1": { "Gamevariables": 15 },
      "2": { "Settingupthegame": 13 },
      "3": { "ScriptKeywords": 10 },
      "4": { "Object": 7 },
      "5": { "Speech": 6 },
      "6": { "Tumbleweed": 5 },
      "7": { "EditingGUIs": 4 },
      "8": { "Camera": 3 },
      "9": { "Viewport": 2 },
      "10": { "UpgradingTo27": 1 }
    },
    "Default": {
      "0": { "Gamevariables": 9 },
      "1": { "UpgradeTo341": 5 },
      "2": { "UpgradeTo350": 2 },
      "3": { "UpgradeTo33": 1 }
    },
    "defaults": {
      "0": { "AudioClip": 1 }
    },
    "Defaults": {
      "0": { "Settingupthegame": 1 }
    },
    "DefaultVolume": {
      "0": { "Multimedia": 2 },
      "1": { "AudioChannel": 1 }
    },
    "define": {
      "0": { "Tumbleweed_translation": 6 },
      "1": { "ScriptKeywords": 4 },
      "2": { "Settingupthegame": 3 },
      "3": { "Preprocessor": 2 },
      "4": { "Room": 1 }
    },
    "Define": {
      "0": { "Preprocessor": 1 }
    },
    "Defined": {
      "0": { "ScriptKeywords": 10 },
      "1": { "Tumbleweed_translation": 1 }
    },
    "defined": {
      "0": { "ScriptKeywords": 8 },
      "1": { "Character": 5 },
      "2": { "Settingupthegame": 4 },
      "3": { "UpgradeTo350": 3 },
      "4": { "Maths": 2 },
      "5": { "Region": 1 }
    },
    "Defines": {
      "0": { "Tumbleweed_helper": 1 }
    },
    "defines": {
      "0": { "Settingupthegame": 12 },
      "1": { "Tumbleweed_translation": 3 },
      "2": { "Globalfunctions_Message": 2 },
      "3": { "Globalfunctions_General": 1 }
    },
    "Defining": {
      "0": { "OOProgramming": 1 }
    },
    "defining": {
      "0": { "ScriptKeywords": 1 }
    },
    "definition": {
      "0": { "ScriptKeywords": 2 },
      "1": { "OOProgramming": 1 }
    },
    "definitions": {
      "0": { "ScriptModules": 1 }
    },
    "deformed": {
      "0": { "Setup": 1 }
    },
    "defview": {
      "0": { "Character": 1 }
    },
    "degree": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "degrees": {
      "0": { "Maths": 23 },
      "1": { "DynamicSprite": 3 }
    },
    "DegreesToRadians": {
      "0": { "Maths": 26 }
    },
    "delay": {
      "0": { "Character": 8 },
      "1": { "EditorView": 7 },
      "2": { "Speech": 6 },
      "3": { "UpgradeTo33": 5 },
      "4": { "Settingupthegame": 3 },
      "5": { "Object": 2 },
      "6": { "Globalfunctions_Screen": 1 }
    },
    "DELAY": {
      "0": { "Character": 5 },
      "1": { "Object": 2 },
      "2": { "Globalfunctions_Screen": 1 }
    },
    "Delay": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "delays": {
      "0": { "Game": 1 }
    },
    "Delete": {
      "0": { "DynamicSprite": 46 },
      "1": { "File": 4 },
      "2": { "Camera": 3 },
      "3": { "Screen": 2 },
      "4": { "EditingGUIs": 1 }
    },
    "delete": {
      "0": { "Settingupthegame": 3 },
      "1": { "Pointers": 1 }
    },
    "deleted": {
      "0": { "Screen": 1 }
    },
    "Deletes": {
      "0": { "Globalfunctions_General": 1 }
    },
    "deletes": {
      "0": { "DynamicSprite": 1 }
    },
    "DeleteSaveSlot": {
      "0": { "Globalfunctions_General": 4 }
    },
    "DeleteSprite": {
      "0": { "DynamicSprite": 1 }
    },
    "deleting": {
      "0": { "Lipsync": 1 }
    },
    "Demo": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "demo": {
      "0": { "Tumbleweed": 1 }
    },
    "demonstrate": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "demonstrates": {
      "0": { "acintro1": 1 }
    },
    "demonstrations": {
      "0": { "Mouse": 1 }
    },
    "DemoQuestSave": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "Densming": {
      "0": { "acintro": 1 }
    },
    "depend": {
      "0": { "ListBox": 1 }
    },
    "depending": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "Game": 3 },
      "2": { "Dialog": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "depends": {
      "0": { "AudioChannel": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "deploy": {
      "0": { "UpgradeTo34": 1 }
    },
    "deploying": {
      "0": { "UpgradeTo34": 1 }
    },
    "Deprecated": {
      "0": { "UpgradeTo350": 1 }
    },
    "deprecated": {
      "0": { "UpgradeTo350": 2 },
      "1": { "UpgradeTo34": 1 }
    },
    "deprecating": {
      "0": { "UpgradeTo350": 1 }
    },
    "depth": {
      "0": { "DynamicSprite": 6 },
      "1": { "acintro1": 4 },
      "2": { "Settingupthegame": 2 },
      "3": { "Globalfunctions_General": 1 }
    },
    "Depth": {
      "0": { "Settingupthegame": 3 }
    },
    "depths": {
      "0": { "Globalfunctions_General": 1 }
    },
    "describe": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "described": {
      "0": { "Settingupthegame": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "describes": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "describing": {
      "0": { "EventTypes": 1 }
    },
    "description": {
      "0": { "Character": 7 },
      "1": { "Room": 6 },
      "2": { "Hotspot": 5 },
      "3": { "Game": 3 },
      "4": { "CustomProperties": 2 },
      "5": { "EventTypes": 1 }
    },
    "DESCRIPTION": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Description": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Hotspot": 2 },
      "2": { "StringFormats": 1 }
    },
    "descriptions": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "TemplateVerbcoin": 1 }
    },
    "descriptive": {
      "0": { "Globalfunctions_General": 2 }
    },
    "deselect": {
      "0": { "Character": 1 }
    },
    "design": {
      "0": { "Object": 1 }
    },
    "designed": {
      "0": { "AnonymousUsageInfo": 2 },
      "1": { "Game": 1 }
    },
    "designing": {
      "0": { "EditorRoom": 1 }
    },
    "desired": {
      "0": { "acintro1": 1 }
    },
    "desktop": {
      "0": { "Setup": 1 }
    },
    "Desktop": {
      "0": { "TroubleshootingWindowsZoneID": 2 }
    },
    "destination": {
      "0": { "Tumbleweed_movement": 5 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "acintro7": 1 }
    },
    "DestinationX": {
      "0": { "Character": 3 }
    },
    "DestinationY": {
      "0": { "Character": 3 }
    },
    "destroyed": {
      "0": { "ScriptKeywords": 2 }
    },
    "destroys": {
      "0": { "Button": 1 }
    },
    "detail": {
      "0": { "ScriptingTutorialPart1": 3 },
      "1": { "CustomDialogOptions": 1 }
    },
    "detailed": {
      "0": { "acintro1": 1 }
    },
    "details": {
      "0": { "ScriptKeywords": 2 },
      "1": { "acintro7": 1 }
    },
    "deteciton": {
      "0": { "Globalfunctions_General": 1 }
    },
    "detected": {
      "0": { "EditorInventoryItems": 1 }
    },
    "detection": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "acintro1": 1 }
    },
    "detects": {
      "0": { "InventoryItem": 1 }
    },
    "determine": {
      "0": { "GUI": 2 },
      "1": { "Character": 1 }
    },
    "determined": {
      "0": { "Character": 2 },
      "1": { "File": 1 }
    },
    "Determines": {
      "0": { "ListBox": 1 }
    },
    "determines": {
      "0": { "Character": 13 },
      "1": { "Settingupthegame": 10 },
      "2": { "Object": 2 },
      "3": { "GUIControl": 1 }
    },
    "determining": {
      "0": { "CustomDialogOptions": 1 }
    },
    "develop": {
      "0": { "FAQ": 1 }
    },
    "developed": {
      "0": { "Credits": 1 }
    },
    "developer": {
      "0": { "Plugins": 1 }
    },
    "Developer": {
      "0": { "Settingupthegame": 1 }
    },
    "developer's": {
      "0": { "Plugins": 1 }
    },
    "developers": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "developing": {
      "0": { "acintro1": 1 }
    },
    "development": {
      "0": { "acintro2": 1 }
    },
    "device": {
      "0": { "EditingGUIs": 1 }
    },
    "devices": {
      "0": { "Settingupthegame": 1 }
    },
    "devoted": {
      "0": { "UpgradingTo27": 1 }
    },
    "dFisherman": {
      "0": { "Dialog": 9 }
    },
    "diagnostic": {
      "0": { "AudioClip": 1 }
    },
    "Diagonal": {
      "0": { "Settingupthegame": 1 }
    },
    "diagonal": {
      "0": { "Character": 3 },
      "1": { "DrawingSurfaceFunctions": 1 }
    },
    "DiagonalLoops": {
      "0": { "Character": 3 }
    },
    "diagonally": {
      "0": { "Settingupthegame": 5 },
      "1": { "acintro7": 1 }
    },
    "dialog": {
      "0": { "DialogOptionsRenderingInfo": 65 },
      "1": { "Settingupthegame": 43 },
      "2": { "Dialog": 36 },
      "3": { "CustomDialogOptions": 33 },
      "4": { "acintro8": 22 },
      "5": { "UpgradeTo34": 13 },
      "6": { "Gamevariables": 12 },
      "7": { "Globalfunctions_General": 10 },
      "8": { "UpgradeTo30": 6 },
      "9": { "MusicAndSound": 4 },
      "10": { "FAQ": 3 },
      "11": { "AutonumberSpeechFiles": 2 },
      "12": { "ScriptKeywords": 1 }
    },
    "Dialog": {
      "0": { "Dialog": 32 },
      "1": { "Settingupthegame": 5 },
      "2": { "DialogOptionsRenderingInfo": 3 },
      "3": { "Globalfunctions_General": 2 },
      "4": { "Scripting": 1 }
    },
    "DIALOG": {
      "0": { "Settingupthegame": 6 },
      "1": { "Dialog": 2 }
    },
    "dialog-only": {
      "0": { "acintro8": 1 }
    },
    "DialogCount": {
      "0": { "Game": 4 }
    },
    "DIALOGNUMBERED": {
      "0": { "Globalfunctions_General": 1 }
    },
    "dialogoption": {
      "0": { "Gamevariables": 2 }
    },
    "DialogOptionSayStyle": {
      "0": { "Dialog": 2 },
      "1": { "StandardEnums": 1 }
    },
    "DIALOGOPTIONSGAP": {
      "0": { "Globalfunctions_General": 1 }
    },
    "DIALOGOPTIONSGUI": {
      "0": { "Globalfunctions_General": 1 }
    },
    "DialogOptionsRenderingInfo": {
      "0": { "DialogOptionsRenderingInfo": 42 },
      "1": { "CustomDialogOptions": 9 },
      "2": { "UpgradeTo33": 1 }
    },
    "DialogOptionState": {
      "0": { "Dialog": 2 },
      "1": { "StandardEnums": 1 }
    },
    "DIALOGOPTS": {
      "0": { "ScriptKeywords": 1 }
    },
    "dialogs": {
      "0": { "Game": 5 },
      "1": { "acintro8": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "Dialogs": {
      "0": { "acintro8": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "DialogToRender": {
      "0": { "CustomDialogOptions": 12 },
      "1": { "DialogOptionsRenderingInfo": 2 }
    },
    "dialogue": {
      "0": { "Parser": 1 }
    },
    "dialogues": {
      "0": { "FAQ": 1 }
    },
    "DIALOGUPWARDS": {
      "0": { "Globalfunctions_General": 1 }
    },
    "dictionaries": {
      "0": { "Dictionary": 2 }
    },
    "Dictionary": {
      "0": { "Dictionary": 41 },
      "1": { "Set": 2 },
      "2": { "Scripting": 1 }
    },
    "dictionary": {
      "0": { "Dictionary": 13 },
      "1": { "Parser": 5 },
      "2": { "SystemLimits": 1 }
    },
    "did": {
      "0": { "ScriptingTutorialPart1": 4 },
      "1": { "EditingGUIs": 2 },
      "2": { "acintro2": 1 }
    },
    "didn't": {
      "0": { "Settingupthegame": 1 }
    },
    "difference": {
      "0": { "Settingupthegame": 2 },
      "1": { "Pointers": 1 }
    },
    "differences": {
      "0": { "GraphicsDriver": 1 }
    },
    "Different": {
      "0": { "Multimedia": 1 }
    },
    "different": {
      "0": { "Settingupthegame": 8 },
      "1": { "Tumbleweed": 7 },
      "2": { "UpgradeTo350": 6 },
      "3": { "ScriptingTutorialPart1": 5 },
      "4": { "Globalfunctions_General": 4 },
      "5": { "acintro1": 3 },
      "6": { "Debuggingfeatures": 2 },
      "7": { "Region": 1 }
    },
    "differentiate": {
      "0": { "Dialog": 1 }
    },
    "differentiation": {
      "0": { "System": 2 }
    },
    "differently": {
      "0": { "Globalfunctions_General": 1 }
    },
    "difficult": {
      "0": { "Character": 1 }
    },
    "digging": {
      "0": { "Tumbleweed": 1 }
    },
    "Digital": {
      "0": { "Setup": 1 }
    },
    "digital": {
      "0": { "Setup": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "digitally": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "digits": {
      "0": { "StringFormats": 2 },
      "1": { "String": 1 }
    },
    "dimension": {
      "0": { "Screen": 2 }
    },
    "dimensions": {
      "0": { "DialogOptionsRenderingInfo": 17 },
      "1": { "CustomDialogOptions": 3 },
      "2": { "Camera": 1 }
    },
    "dinner": {
      "0": { "Character": 1 }
    },
    "dir": {
      "0": { "Tumbleweed_movement": 8 },
      "1": { "Tumbleweed_door": 6 },
      "2": { "Tumbleweed_player": 1 }
    },
    "direct": {
      "0": { "System": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "DirectDraw": {
      "0": { "GraphicsDriver": 4 },
      "1": { "SystemRequirements": 1 }
    },
    "Direction": {
      "0": { "Character": 1 }
    },
    "direction": {
      "0": { "Character": 34 },
      "1": { "Settingupthegame": 5 },
      "2": { "Tumbleweed_movement": 3 },
      "3": { "Tumbleweed_door": 2 },
      "4": { "Pointers": 1 }
    },
    "directional": {
      "0": { "AudioChannel": 3 },
      "1": { "EditorView": 1 }
    },
    "directions": {
      "0": { "EditorView": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "StandardEnums": 1 }
    },
    "directive": {
      "0": { "ScriptKeywords": 1 }
    },
    "directives": {
      "0": { "Preprocessor": 1 }
    },
    "Directly": {
      "0": { "Tumbleweed": 1 }
    },
    "directly": {
      "0": { "Character": 6 },
      "1": { "Tumbleweed": 3 },
      "2": { "IntegrationWithWindows": 2 },
      "3": { "Dictionary": 1 }
    },
    "directories": {
      "0": { "File": 1 }
    },
    "directory": {
      "0": { "UpgradeTo335": 6 },
      "1": { "ListBox": 3 },
      "2": { "TroubleshootingWindowsZoneID": 2 },
      "3": { "EditorSprite": 1 }
    },
    "DirectX": {
      "0": { "GraphicsDriver": 4 },
      "1": { "Character": 1 }
    },
    "dirty": {
      "0": { "Character": 1 }
    },
    "Disable": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "disable": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "GUIControl": 4 },
      "2": { "Region": 3 },
      "3": { "Gamevariables": 2 },
      "4": { "Hotspot": 1 }
    },
    "DisableCursorMode": {
      "0": { "Mouse": 1 }
    },
    "Disabled": {
      "0": { "GUIControl": 1 }
    },
    "disabled": {
      "0": { "Globalfunctions_General": 9 },
      "1": { "Settingupthegame": 4 },
      "2": { "Mouse": 3 },
      "3": { "Speech": 2 },
      "4": { "Region": 1 }
    },
    "DisableGroundLevelAreas": {
      "0": { "Globalfunctions_Room": 5 }
    },
    "DisableGui": {
      "0": { "Tumbleweed_helper": 5 }
    },
    "DisableHotspot": {
      "0": { "Hotspot": 1 }
    },
    "DisableInterface": {
      "0": { "Globalfunctions_General": 9 }
    },
    "DisableMode": {
      "0": { "Mouse": 6 },
      "1": { "StandardEnums": 1 }
    },
    "DisableRegion": {
      "0": { "Region": 1 }
    },
    "disables": {
      "0": { "GUIControl": 1 }
    },
    "Disables": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "disableTints": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "DISABLETINTS": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "disabling": {
      "0": { "GUIControl": 1 }
    },
    "disadvantage": {
      "0": { "acintro9": 1 }
    },
    "disappear": {
      "0": { "acintro4": 4 },
      "1": { "acintro2": 1 }
    },
    "disappeared": {
      "0": { "FAQ": 1 }
    },
    "disappearing": {
      "0": { "acintro7": 1 }
    },
    "disappears": {
      "0": { "acintro9": 1 }
    },
    "Discards": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "discrepancy": {
      "0": { "Region": 1 }
    },
    "discretion": {
      "0": { "GUIControl": 1 }
    },
    "discussed": {
      "0": { "acintro1": 1 }
    },
    "disk": {
      "0": { "File": 7 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Display": {
      "0": { "Game": 27 },
      "1": { "String": 21 },
      "2": { "Character": 20 },
      "3": { "ScriptingTutorialPart1": 18 },
      "4": { "System": 14 },
      "5": { "Object": 12 },
      "6": { "Hotspot": 10 },
      "7": { "Globalfunctions_General": 9 },
      "8": { "Region": 8 },
      "9": { "InventoryItem": 7 },
      "10": { "AudioChannel": 6 },
      "11": { "Pointers": 5 },
      "12": { "Globalfunctions_Room": 4 },
      "13": { "DrawingSurfaceFunctions": 3 },
      "14": { "Gamevariables": 2 },
      "15": { "UpgradeTo30": 1 }
    },
    "display": {
      "0": { "Character": 21 },
      "1": { "String": 14 },
      "2": { "System": 13 },
      "3": { "Object": 10 },
      "4": { "Globalfunctions_General": 9 },
      "5": { "Settingupthegame": 8 },
      "6": { "Globalfunctions_Message": 7 },
      "7": { "Region": 6 },
      "8": { "InvWindow": 5 },
      "9": { "Hotspot": 4 },
      "10": { "Mouse": 3 },
      "11": { "DrawingSurfaceFunctions": 2 },
      "12": { "EditorRoom": 1 }
    },
    "Display-style": {
      "0": { "Globalfunctions_General": 1 }
    },
    "displayable": {
      "0": { "Translations": 1 }
    },
    "DisplayAppleDescription": {
      "0": { "ScriptKeywords": 2 }
    },
    "DisplayAt": {
      "0": { "Globalfunctions_Message": 7 }
    },
    "DisplayAtY": {
      "0": { "Globalfunctions_Message": 5 }
    },
    "displayed": {
      "0": { "Settingupthegame": 25 },
      "1": { "Globalfunctions_General": 12 },
      "2": { "Character": 9 },
      "3": { "EditingGUIs": 6 },
      "4": { "InvWindow": 5 },
      "5": { "Viewport": 4 },
      "6": { "EditorInventoryItems": 3 },
      "7": { "acintro1": 2 },
      "8": { "Tumbleweed_translation": 1 }
    },
    "displaying": {
      "0": { "ScriptingTutorialPart1": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "InvWindow": 1 }
    },
    "DisplayMessage": {
      "0": { "Globalfunctions_Message": 6 },
      "1": { "UpgradeTo30": 1 }
    },
    "DisplayMessageAtY": {
      "0": { "Globalfunctions_Message": 4 }
    },
    "DisplayOptions": {
      "0": { "Dialog": 4 },
      "1": { "StandardEnums": 1 }
    },
    "DisplayPostTimeMs": {
      "0": { "Speech": 3 }
    },
    "displays": {
      "0": { "Character": 5 },
      "1": { "DynamicSprite": 4 },
      "2": { "Maths": 3 },
      "3": { "Hotspot": 2 },
      "4": { "Region": 1 }
    },
    "Displays": {
      "0": { "Character": 2 },
      "1": { "ScriptingTutorialPart1": 1 }
    },
    "DisplaySpeech": {
      "0": { "Character": 1 }
    },
    "DisplaySpeechAt": {
      "0": { "Character": 1 }
    },
    "DisplaySpeechBackground": {
      "0": { "Character": 1 }
    },
    "DisplayThought": {
      "0": { "Character": 1 }
    },
    "displaytime": {
      "0": { "EditorView": 1 }
    },
    "DisplayTopBar": {
      "0": { "Globalfunctions_Message": 5 },
      "1": { "Gamevariables": 1 }
    },
    "disposed": {
      "0": { "DynamicSprite": 10 },
      "1": { "ScriptKeywords": 1 }
    },
    "DIST": {
      "0": { "Character": 6 }
    },
    "dist": {
      "0": { "Character": 1 }
    },
    "distance": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Speech": 1 }
    },
    "Distance": {
      "0": { "Tumbleweed_helper": 3 }
    },
    "distinct": {
      "0": { "StandardEnums": 1 }
    },
    "distinction": {
      "0": { "MusicAndSound": 1 }
    },
    "distinguish": {
      "0": { "EventTypes": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "distribute": {
      "0": { "DistGame": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Distributed": {
      "0": { "Copyright": 1 }
    },
    "distributed": {
      "0": { "DistGame": 2 },
      "1": { "UpgradeTo34": 1 }
    },
    "Distributing": {
      "0": { "OtherFeatures": 1 }
    },
    "DISTRIBUTION": {
      "0": { "Copyright": 1 }
    },
    "distribution": {
      "0": { "Settingupthegame": 1 }
    },
    "diverted": {
      "0": { "EditingGUIs": 1 }
    },
    "divide": {
      "0": { "ScriptModules": 1 }
    },
    "Divide": {
      "0": { "ScriptKeywords": 1 }
    },
    "divided": {
      "0": { "InvWindow": 1 }
    },
    "dividing": {
      "0": { "InvWindow": 1 }
    },
    "dJoeBloggs": {
      "0": { "Dialog": 3 }
    },
    "dJoeExcited": {
      "0": { "Dialog": 4 }
    },
    "dlg": {
      "0": { "CustomDialogOptions": 12 }
    },
    "dll": {
      "0": { "Plugins": 1 }
    },
    "DLL": {
      "0": { "Plugins": 2 }
    },
    "dMerchant": {
      "0": { "Dialog": 2 },
      "1": { "acintro8": 1 }
    },
    "DO": {
      "0": { "ScriptKeywords": 1 }
    },
    "Do": {
      "0": { "Character": 7 },
      "1": { "UpgradeTo350": 3 },
      "2": { "File": 2 },
      "3": { "EventTypes": 1 }
    },
    "do": {
      "0": { "ScriptingTutorialPart2": 21 },
      "1": { "ScriptKeywords": 20 },
      "2": { "Settingupthegame": 18 },
      "3": { "Character": 15 },
      "4": { "Globalfunctions_General": 13 },
      "5": { "ScriptingTutorialPart1": 12 },
      "6": { "DynamicSprite": 9 },
      "7": { "acintro9": 8 },
      "8": { "UpgradeTo32": 6 },
      "9": { "UpgradeTo30": 5 },
      "10": { "DynamicArrays": 4 },
      "11": { "UpgradingTo27": 3 },
      "12": { "Gamevariables": 2 },
      "13": { "StringFormats": 1 }
    },
    "dock": {
      "0": { "UpgradeTo33": 1 }
    },
    "document": {
      "0": { "Tumbleweed_door": 1 }
    },
    "documentation": {
      "0": { "Globalfunctions_General": 1 }
    },
    "documented": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "Documents": {
      "0": { "Game": 2 },
      "1": { "acintro1": 1 }
    },
    "documents": {
      "0": { "Game": 1 }
    },
    "Doe": {
      "0": { "OOProgramming": 1 }
    },
    "does": {
      "0": { "Character": 16 },
      "1": { "String": 8 },
      "2": { "ScriptKeywords": 7 },
      "3": { "Region": 6 },
      "4": { "Globalfunctions_General": 5 },
      "5": { "Settingupthegame": 4 },
      "6": { "AnonymousUsageInfo": 3 },
      "7": { "SourceControl": 2 },
      "8": { "Maths": 1 }
    },
    "Does": {
      "0": { "EventTypes": 1 }
    },
    "doesn't": {
      "0": { "TroubleshootingWindowsZoneID": 3 },
      "1": { "Character": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "Dog": {
      "0": { "String": 1 }
    },
    "dog": {
      "0": { "Character": 1 }
    },
    "Doing": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "doing": {
      "0": { "Object": 4 },
      "1": { "ScriptingTutorialPart1": 2 },
      "2": { "ListBox": 1 }
    },
    "DoLaundry": {
      "0": { "ScriptKeywords": 2 }
    },
    "dOldMan": {
      "0": { "Dialog": 2 }
    },
    "Don't": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "EditorView": 2 },
      "2": { "DrawingSurfaceFunctions": 1 }
    },
    "don't": {
      "0": { "Character": 6 },
      "1": { "UpgradingTo27": 5 },
      "2": { "Settingupthegame": 4 },
      "3": { "acintro4": 3 },
      "4": { "Object": 2 },
      "5": { "EditorSprite": 1 }
    },
    "done": {
      "0": { "Character": 5 },
      "1": { "acintro8": 4 },
      "2": { "UpgradeTo32": 3 },
      "3": { "UpgradeTo335": 2 },
      "4": { "Screen": 1 }
    },
    "DONTLOSEINV": {
      "0": { "Globalfunctions_General": 1 }
    },
    "DoOnceOnly": {
      "0": { "Game": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Door": {
      "0": { "Pointers": 1 }
    },
    "door": {
      "0": { "Tumbleweed_door": 41 },
      "1": { "Hotspot": 4 },
      "2": { "Pointers": 3 },
      "3": { "Tumbleweed_unhandled": 2 },
      "4": { "FAQ": 1 }
    },
    "door's": {
      "0": { "Tumbleweed_door": 1 }
    },
    "Door's": {
      "0": { "Hotspot": 1 }
    },
    "doors": {
      "0": { "Tumbleweed_door": 2 }
    },
    "Doors": {
      "0": { "Tumbleweed_door": 10 }
    },
    "DOS": {
      "0": { "Region": 1 }
    },
    "dose": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "doStuff": {
      "0": { "ScriptKeywords": 4 }
    },
    "DoStuffOption": {
      "0": { "ScriptKeywords": 2 }
    },
    "dot": {
      "0": { "ScriptingTutorialPart1": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "Pointers": 1 }
    },
    "DoThisAndOptionallyThat": {
      "0": { "ScriptKeywords": 1 }
    },
    "dots": {
      "0": { "FAQ": 2 }
    },
    "double": {
      "0": { "TroubleshootingWindowsZoneID": 2 },
      "1": { "AudioChannel": 1 }
    },
    "Double": {
      "0": { "acintro4": 1 }
    },
    "double-click": {
      "0": { "acintro7": 3 },
      "1": { "acintro2": 2 },
      "2": { "acintro8": 1 }
    },
    "Double-click": {
      "0": { "Settingupthegame": 4 },
      "1": { "acintro8": 2 },
      "2": { "acintro1": 1 }
    },
    "Double-clicking": {
      "0": { "Lipsync": 1 }
    },
    "double-clicking": {
      "0": { "acintro1": 2 },
      "1": { "EditorCharacter": 1 }
    },
    "double-clicks": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "double-equals": {
      "0": { "ScriptingTutorialPart1": 2 }
    },
    "double-left-click": {
      "0": { "Settingupthegame": 1 }
    },
    "double-quote": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "double-quotes": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "double-slash": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "double-vertical-bar": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "doubt": {
      "0": { "BackingUpYourGame": 1 }
    },
    "Down": {
      "0": { "InvWindow": 1 }
    },
    "down": {
      "0": { "Settingupthegame": 6 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "AdvancedRoomFeatures": 4 },
      "3": { "acintro7": 3 },
      "4": { "Object": 2 },
      "5": { "String": 1 }
    },
    "down-left": {
      "0": { "Settingupthegame": 1 }
    },
    "down-right": {
      "0": { "Settingupthegame": 1 }
    },
    "DownArrow": {
      "0": { "ASCIIcodes": 1 }
    },
    "Downgrade": {
      "0": { "Setup": 1 }
    },
    "downgrading": {
      "0": { "Settingupthegame": 1 }
    },
    "Download": {
      "0": { "Lipsync": 2 },
      "1": { "Templates": 1 }
    },
    "download": {
      "0": { "TroubleshootingWindowsZoneID": 3 },
      "1": { "DistGame": 2 },
      "2": { "acintro1": 1 }
    },
    "downloaded": {
      "0": { "Templates": 2 },
      "1": { "acintro1": 1 }
    },
    "downloading": {
      "0": { "Templates": 1 }
    },
    "downscaled": {
      "0": { "UpgradeTo350": 1 }
    },
    "downwards": {
      "0": { "TemplateSierraStyle": 1 }
    },
    "dr": {
      "0": { "Dialog": 2 }
    },
    "drag": {
      "0": { "EditingGUIs": 6 },
      "1": { "UpgradeTo33": 2 },
      "2": { "acintro2": 1 }
    },
    "draggable": {
      "0": { "EditorRoom": 1 }
    },
    "dragged": {
      "0": { "acintro2": 1 }
    },
    "dragging": {
      "0": { "EditorRoom": 3 },
      "1": { "acintro4": 1 }
    },
    "draw": {
      "0": { "DrawingSurfaceFunctions": 17 },
      "1": { "DialogOptionsRenderingInfo": 8 },
      "2": { "DynamicSprite": 7 },
      "3": { "acintro2": 6 },
      "4": { "Slider": 4 },
      "5": { "Settingupthegame": 3 },
      "6": { "AdvancedRoomFeatures": 2 },
      "7": { "acintro5": 1 }
    },
    "Draw": {
      "0": { "acintro2": 2 },
      "1": { "acintro5": 1 }
    },
    "drawbacks": {
      "0": { "Settingupthegame": 1 }
    },
    "DrawCircle": {
      "0": { "DrawingSurfaceFunctions": 6 },
      "1": { "Plugins": 1 }
    },
    "DrawImage": {
      "0": { "DynamicSprite": 9 },
      "1": { "DrawingSurfaceFunctions": 6 },
      "2": { "Room": 2 }
    },
    "Drawing": {
      "0": { "UpgradeTo33": 1 }
    },
    "drawing": {
      "0": { "DrawingSurfaceFunctions": 17 },
      "1": { "UpgradeTo30": 4 },
      "2": { "Globalfunctions_General": 3 },
      "3": { "UpgradeTo33": 2 },
      "4": { "Viewport": 1 }
    },
    "DrawingColor": {
      "0": { "DrawingSurfaceFunctions": 22 },
      "1": { "CustomDialogOptions": 4 },
      "2": { "DynamicSprite": 3 },
      "3": { "Game": 2 },
      "4": { "Globalfunctions_General": 1 }
    },
    "DrawingSurface": {
      "0": { "DrawingSurfaceFunctions": 81 },
      "1": { "DynamicSprite": 19 },
      "2": { "Room": 6 },
      "3": { "StandardEnums": 4 },
      "4": { "Globalfunctions_General": 3 },
      "5": { "Game": 2 },
      "6": { "UpgradeTo350": 1 }
    },
    "DrawingSurface's": {
      "0": { "DynamicSprite": 1 }
    },
    "DrawLine": {
      "0": { "DrawingSurfaceFunctions": 13 },
      "1": { "DynamicSprite": 3 },
      "2": { "Room": 2 },
      "3": { "Game": 1 }
    },
    "DrawMessageWrapped": {
      "0": { "DrawingSurfaceFunctions": 4 },
      "1": { "Globalfunctions_General": 1 }
    },
    "drawn": {
      "0": { "Settingupthegame": 9 },
      "1": { "acintro2": 5 },
      "2": { "acintro3": 4 },
      "3": { "ListBox": 3 },
      "4": { "acintro9": 2 },
      "5": { "AdvancedRoomFeatures": 1 }
    },
    "Drawn": {
      "0": { "InventoryItem": 1 }
    },
    "DrawPixel": {
      "0": { "DrawingSurfaceFunctions": 4 },
      "1": { "DynamicSprite": 1 }
    },
    "DrawRectangle": {
      "0": { "DrawingSurfaceFunctions": 6 }
    },
    "draws": {
      "0": { "DynamicSprite": 7 },
      "1": { "DrawingSurfaceFunctions": 3 },
      "2": { "Room": 1 }
    },
    "Draws": {
      "0": { "DrawingSurfaceFunctions": 10 }
    },
    "DrawString": {
      "0": { "DrawingSurfaceFunctions": 6 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "StandardEnums": 1 }
    },
    "DrawStringWrapped": {
      "0": { "DrawingSurfaceFunctions": 5 },
      "1": { "StandardEnums": 2 }
    },
    "DrawSurface": {
      "0": { "DrawingSurfaceFunctions": 6 }
    },
    "DrawTriangle": {
      "0": { "DrawingSurfaceFunctions": 5 }
    },
    "drew": {
      "0": { "EditingGUIs": 1 }
    },
    "drive": {
      "0": { "Multimedia": 14 },
      "1": { "MusicAndSound": 1 }
    },
    "Driver": {
      "0": { "Setup": 1 }
    },
    "driver": {
      "0": { "GraphicsDriver": 8 },
      "1": { "System": 4 },
      "2": { "Object": 2 },
      "3": { "Globalfunctions_General": 1 }
    },
    "drivers": {
      "0": { "GraphicsDriver": 4 },
      "1": { "Setup": 1 }
    },
    "Drivers": {
      "0": { "System": 1 }
    },
    "drives": {
      "0": { "Multimedia": 2 }
    },
    "drop": {
      "0": { "ScriptKeywords": 2 },
      "1": { "AudioChannel": 1 }
    },
    "drop-down": {
      "0": { "acintro3": 2 },
      "1": { "acintro1": 1 }
    },
    "dropping": {
      "0": { "InventoryItem": 1 }
    },
    "droves": {
      "0": { "MusicAndSound": 1 }
    },
    "ds": {
      "0": { "DynamicSprite": 3 }
    },
    "dt": {
      "0": { "DateTime": 11 }
    },
    "Due": {
      "0": { "Character": 1 }
    },
    "due": {
      "0": { "acintro1": 1 }
    },
    "dull": {
      "0": { "Object": 1 }
    },
    "DUMB": {
      "0": { "Credits": 1 }
    },
    "dumb": {
      "0": { "Credits": 1 }
    },
    "duplicate": {
      "0": { "Set": 1 }
    },
    "Duplicate": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "duplicating": {
      "0": { "ScriptKeywords": 1 }
    },
    "during": {
      "0": { "Settingupthegame": 8 },
      "1": { "EditingGUIs": 4 },
      "2": { "Lipsync": 3 },
      "3": { "Mouse": 2 },
      "4": { "Globalfunctions_Room": 1 }
    },
    "During": {
      "0": { "acintro7": 1 }
    },
    "Dutch": {
      "0": { "Tumbleweed": 1 }
    },
    "dWares": {
      "0": { "acintro8": 5 }
    },
    "Dynamic": {
      "0": { "DynamicArrays": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "dynamic": {
      "0": { "DynamicSprite": 25 },
      "1": { "ScriptKeywords": 10 },
      "2": { "Dictionary": 3 },
      "3": { "OOProgramming": 2 },
      "4": { "DynamicArrays": 1 }
    },
    "dynamically": {
      "0": { "GUIControl": 8 },
      "1": { "GUI": 6 },
      "2": { "Mouse": 2 },
      "3": { "Character": 1 }
    },
    "DynamicSprite": {
      "0": { "DynamicSprite": 148 },
      "1": { "DrawingSurfaceFunctions": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "e'": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "e-mails": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "Each": {
      "0": { "Settingupthegame": 6 },
      "1": { "ScriptKeywords": 2 },
      "2": { "EditorSprite": 1 }
    },
    "each": {
      "0": { "Settingupthegame": 14 },
      "1": { "Lipsync": 10 },
      "2": { "UpgradeTo350": 9 },
      "3": { "AdvancedRoomFeatures": 5 },
      "4": { "ScriptingTutorialPart1": 4 },
      "5": { "Object": 3 },
      "6": { "Mouse": 2 },
      "7": { "CustomProperties": 1 }
    },
    "eagerness": {
      "0": { "Character": 1 }
    },
    "EAGERNESS": {
      "0": { "Character": 5 }
    },
    "eAlignBottomCenter": {
      "0": { "StandardEnums": 1 }
    },
    "eAlignBottomLeft": {
      "0": { "StandardEnums": 2 }
    },
    "eAlignBottomRight": {
      "0": { "StandardEnums": 1 }
    },
    "eAlignCenter": {
      "0": { "ListBox": 1 }
    },
    "eAlignCentre": {
      "0": { "Speech": 2 },
      "1": { "DrawingSurfaceFunctions": 1 }
    },
    "eAlignHasBottom": {
      "0": { "StandardEnums": 1 }
    },
    "eAlignHasHorCenter": {
      "0": { "StandardEnums": 1 }
    },
    "eAlignHasLeft": {
      "0": { "StandardEnums": 2 }
    },
    "eAlignHasRight": {
      "0": { "StandardEnums": 1 }
    },
    "eAlignHasTop": {
      "0": { "StandardEnums": 1 }
    },
    "eAlignHasVerCenter": {
      "0": { "StandardEnums": 1 }
    },
    "eAlignLeft": {
      "0": { "Character": 2 },
      "1": { "Speech": 1 }
    },
    "eAlignMiddleCenter": {
      "0": { "StandardEnums": 1 }
    },
    "eAlignMiddleLeft": {
      "0": { "StandardEnums": 2 }
    },
    "eAlignMiddleRight": {
      "0": { "StandardEnums": 1 }
    },
    "eAlignNone": {
      "0": { "StandardEnums": 1 }
    },
    "eAlignRight": {
      "0": { "Speech": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eAlignTopCenter": {
      "0": { "StandardEnums": 2 }
    },
    "eAlignTopLeft": {
      "0": { "StandardEnums": 3 }
    },
    "eAlignTopRight": {
      "0": { "StandardEnums": 2 }
    },
    "eAnywhere": {
      "0": { "Character": 3 },
      "1": { "RepExec": 2 },
      "2": { "StandardEnums": 1 }
    },
    "Earlier": {
      "0": { "UpgradeTo350": 1 }
    },
    "earlier": {
      "0": { "acintro4": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "early": {
      "0": { "Globalfunctions_Message": 1 }
    },
    "earthquake": {
      "0": { "Globalfunctions_Screen": 2 }
    },
    "ease": {
      "0": { "OOProgramming": 1 }
    },
    "easier": {
      "0": { "FAQ": 3 },
      "1": { "MusicAndSound": 2 },
      "2": { "String": 1 }
    },
    "easiest": {
      "0": { "acintro9": 1 }
    },
    "easily": {
      "0": { "SourceControl": 3 },
      "1": { "ScriptModules": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "east": {
      "0": { "Character": 1 }
    },
    "easy": {
      "0": { "Game": 2 },
      "1": { "Translations": 1 }
    },
    "easy-to-remember": {
      "0": { "UpgradingTo27": 1 }
    },
    "easy-to-use": {
      "0": { "Introduction": 1 }
    },
    "eat": {
      "0": { "TextParser": 6 }
    },
    "eAudioFileMIDI": {
      "0": { "AudioClip": 1 }
    },
    "eAudioFileMOD": {
      "0": { "StandardEnums": 1 }
    },
    "eAudioFileOGG": {
      "0": { "StandardEnums": 1 }
    },
    "eAudioFileVOC": {
      "0": { "StandardEnums": 1 }
    },
    "eAudioFileWAV": {
      "0": { "StandardEnums": 1 }
    },
    "eAudioPriorityHigh": {
      "0": { "StandardEnums": 1 }
    },
    "eAudioPriorityLow": {
      "0": { "MusicAndSound": 1 }
    },
    "eAudioPriorityNormal": {
      "0": { "StandardEnums": 1 }
    },
    "eAudioPriorityVeryHigh": {
      "0": { "StandardEnums": 1 }
    },
    "eAudioPriorityVeryLow": {
      "0": { "StandardEnums": 1 }
    },
    "eAudioTypeMusic": {
      "0": { "Multimedia": 3 },
      "1": { "AudioClip": 1 }
    },
    "eBackwards": {
      "0": { "Character": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eBlock": {
      "0": { "Character": 17 },
      "1": { "Object": 5 },
      "2": { "UpgradingTo27": 4 },
      "3": { "RepExec": 3 },
      "4": { "Hotspot": 2 },
      "5": { "Globalfunctions_General": 1 }
    },
    "eCaseInsensitive": {
      "0": { "StandardEnums": 1 }
    },
    "eCaseSensitive": {
      "0": { "StandardEnums": 1 }
    },
    "eCDAudioFunction": {
      "0": { "StandardEnums": 1 }
    },
    "eCDCloseTray": {
      "0": { "StandardEnums": 1 }
    },
    "eCDEject": {
      "0": { "StandardEnums": 1 }
    },
    "eCDGetCDDriveCount": {
      "0": { "StandardEnums": 1 }
    },
    "eCDGetNumTracks": {
      "0": { "StandardEnums": 1 }
    },
    "eCDGetPlayingStatus": {
      "0": { "StandardEnums": 1 }
    },
    "eCDIsDriverPresent": {
      "0": { "StandardEnums": 1 }
    },
    "eCDPausePlayback": {
      "0": { "StandardEnums": 1 }
    },
    "eCDPlayTrack": {
      "0": { "Multimedia": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eCDResumePlayback": {
      "0": { "StandardEnums": 1 }
    },
    "eCDSelectActiveCDDrive": {
      "0": { "StandardEnums": 1 }
    },
    "ed": {
      "0": { "Tumbleweed": 1 }
    },
    "edge": {
      "0": { "Room": 8 },
      "1": { "Character": 6 },
      "2": { "EventTypes": 4 },
      "3": { "GUIControl": 2 },
      "4": { "GUI": 1 }
    },
    "edges": {
      "0": { "EditorRoom": 7 },
      "1": { "acintro2": 4 },
      "2": { "acintro3": 2 },
      "3": { "Character": 1 }
    },
    "Edges": {
      "0": { "acintro2": 2 }
    },
    "eDir": {
      "0": { "Tumbleweed_movement": 2 },
      "1": { "Tumbleweed_player": 1 }
    },
    "eDirection": {
      "0": { "Tumbleweed_movement": 8 },
      "1": { "Tumbleweed_door": 4 },
      "2": { "Tumbleweed_player": 1 }
    },
    "eDirectionDown": {
      "0": { "StandardEnums": 1 }
    },
    "eDirectionDownLeft": {
      "0": { "StandardEnums": 1 }
    },
    "eDirectionDownRight": {
      "0": { "StandardEnums": 1 }
    },
    "eDirectionLeft": {
      "0": { "StandardEnums": 1 }
    },
    "eDirectionNone": {
      "0": { "StandardEnums": 1 }
    },
    "eDirectionRight": {
      "0": { "Character": 1 }
    },
    "eDirectionUp": {
      "0": { "StandardEnums": 1 }
    },
    "eDirectionUpLeft": {
      "0": { "StandardEnums": 1 }
    },
    "eDirectionUpRight": {
      "0": { "Character": 1 }
    },
    "edit": {
      "0": { "UpgradeTo350": 3 },
      "1": { "EditorRoom": 2 },
      "2": { "Tumbleweed_translation": 1 }
    },
    "Edit": {
      "0": { "CustomProperties": 2 },
      "1": { "acintro2": 1 }
    },
    "edited": {
      "0": { "EditorRoom": 2 },
      "1": { "EditingGUIs": 1 }
    },
    "Editing": {
      "0": { "EditingGUIs": 2 },
      "1": { "Slider": 1 }
    },
    "editing": {
      "0": { "EditingGUIs": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "editor": {
      "0": { "Character": 14 },
      "1": { "Globalfunctions_General": 7 },
      "2": { "Region": 6 },
      "3": { "UpgradeTo30": 5 },
      "4": { "acintro1": 4 },
      "5": { "Gamevariables": 3 },
      "6": { "Debuggingfeatures": 2 },
      "7": { "Tumbleweed_extensions": 1 }
    },
    "Editor": {
      "0": { "FAQ": 8 },
      "1": { "Settingupthegame": 7 },
      "2": { "EditorRoom": 6 },
      "3": { "TroubleshootingWindowsZoneID": 5 },
      "4": { "acintro1": 3 },
      "5": { "UpgradeTo30": 2 },
      "6": { "EditorCharacter": 1 }
    },
    "EDITOR": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "Editor's": {
      "0": { "Settingupthegame": 1 }
    },
    "editor's": {
      "0": { "UpgradingTo27": 1 }
    },
    "editors": {
      "0": { "acintro8": 1 }
    },
    "edu": {
      "0": { "Lipsync": 1 }
    },
    "Edward": {
      "0": { "Credits": 1 }
    },
    "Eeek": {
      "0": { "acintro7": 1 }
    },
    "eEventAddInventory": {
      "0": { "TextScriptEvents": 1 }
    },
    "eEventEnterRoomBeforeFadein": {
      "0": { "Character": 1 }
    },
    "eEventGotScore": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "eEventGUIMouseDown": {
      "0": { "TextScriptEvents": 1 }
    },
    "eEventGUIMouseUp": {
      "0": { "TextScriptEvents": 1 }
    },
    "eEventLeaveRoom": {
      "0": { "TextScriptEvents": 1 }
    },
    "eEventLoseInventory": {
      "0": { "TextScriptEvents": 1 }
    },
    "eEventRestoreGame": {
      "0": { "TextScriptEvents": 1 }
    },
    "effect": {
      "0": { "Character": 10 },
      "1": { "Mouse": 4 },
      "2": { "Camera": 3 },
      "3": { "Region": 2 },
      "4": { "AudioChannel": 1 }
    },
    "effectively": {
      "0": { "Character": 2 },
      "1": { "ListBox": 1 }
    },
    "effects": {
      "0": { "Settingupthegame": 3 },
      "1": { "Globalfunctions_Palette": 2 },
      "2": { "Region": 1 }
    },
    "Effects": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "efficiently": {
      "0": { "Set": 1 }
    },
    "eFileAppend": {
      "0": { "File": 3 },
      "1": { "StandardEnums": 1 }
    },
    "eFileRead": {
      "0": { "File": 9 },
      "1": { "StandardEnums": 1 }
    },
    "eFileWrite": {
      "0": { "File": 10 },
      "1": { "Pointers": 2 },
      "2": { "StandardEnums": 1 }
    },
    "eFlipBoth": {
      "0": { "DynamicSprite": 1 }
    },
    "eFlipDirection": {
      "0": { "DynamicSprite": 1 }
    },
    "eFlipLeftToRight": {
      "0": { "DynamicSprite": 1 }
    },
    "eFlipUpsideDown": {
      "0": { "DynamicSprite": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eFont": {
      "0": { "StandardEnums": 1 }
    },
    "eFontForeign": {
      "0": { "Label": 1 }
    },
    "eFontMain": {
      "0": { "Button": 1 }
    },
    "eFontNormal": {
      "0": { "TextBox": 1 }
    },
    "eFontSpecial": {
      "0": { "Game": 1 }
    },
    "eFontSpeech": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "ListBox": 1 }
    },
    "eFontStandard": {
      "0": { "Game": 1 }
    },
    "eFontXXXX": {
      "0": { "StandardEnums": 2 }
    },
    "eForwards": {
      "0": { "Character": 5 },
      "1": { "UpgradingTo27": 1 }
    },
    "eg": {
      "0": { "Settingupthegame": 4 },
      "1": { "AudioChannel": 2 },
      "2": { "ScriptingTutorialPart1": 1 }
    },
    "eGA": {
      "0": { "Tumbleweed": 16 },
      "1": { "Tumbleweed_translation": 4 },
      "2": { "Tumbleweed_movement": 1 }
    },
    "ego": {
      "0": { "Settingupthegame": 4 },
      "1": { "MusicAndSound": 2 }
    },
    "EGO": {
      "0": { "Character": 38 },
      "1": { "Globalfunctions_General": 8 },
      "2": { "UpgradingTo27": 6 },
      "3": { "Globalfunctions_Room": 4 },
      "4": { "ScriptKeywords": 1 }
    },
    "Ego": {
      "0": { "ScriptKeywords": 2 }
    },
    "EGO's": {
      "0": { "Character": 21 },
      "1": { "InventoryItem": 1 }
    },
    "egoHealth": {
      "0": { "ScriptKeywords": 1 }
    },
    "eGUIPopupModal": {
      "0": { "GUI": 1 }
    },
    "eGUIPopupMouseYPos": {
      "0": { "GUI": 1 }
    },
    "eGUIPopupNormal": {
      "0": { "GUI": 1 }
    },
    "eGUIPopupPersistent": {
      "0": { "GUI": 1 }
    },
    "EITHER": {
      "0": { "Globalfunctions_General": 2 }
    },
    "either": {
      "0": { "Character": 8 },
      "1": { "Settingupthegame": 5 },
      "2": { "ScriptKeywords": 3 },
      "3": { "EditingGUIs": 2 },
      "4": { "InvWindow": 1 }
    },
    "Eject": {
      "0": { "Multimedia": 1 }
    },
    "ejected": {
      "0": { "Multimedia": 1 }
    },
    "ejects": {
      "0": { "Multimedia": 1 }
    },
    "eKeepMoving": {
      "0": { "Character": 5 },
      "1": { "StandardEnums": 1 }
    },
    "eKeyA": {
      "0": { "ASCIIcodes": 2 },
      "1": { "TemplateSierraStyle": 1 }
    },
    "eKeyAmpersand": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyAsterisk": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyAt": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyB": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyBackSlash": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyBackspace": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyboardMovementModeNone": {
      "0": { "TemplateSierraStyle": 1 }
    },
    "eKeyboardMovementModePressing": {
      "0": { "TemplateSierraStyle": 2 }
    },
    "eKeyboardMovementModeTapping": {
      "0": { "TemplateSierraStyle": 1 }
    },
    "eKeyC": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCloseBracket": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCloseParenthesis": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCode": {
      "0": { "TemplateSierraStyle": 4 },
      "1": { "System": 2 },
      "2": { "Speech": 1 }
    },
    "eKeyColon": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyComma": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlA": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlB": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlC": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlD": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlE": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlF": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlG": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlH": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlI": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlJ": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlK": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlL": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlM": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlN": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlO": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlP": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlQ": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlR": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlS": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlT": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlU": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlV": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlW": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlX": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlY": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyCtrlZ": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyD": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyDelete": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyDollar": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyDoubleQuote": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyDownArrow": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyE": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyEnd": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyEquals": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyEscape": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyExclamationMark": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyF": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyForwardSlash": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyG": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyGreaterThan": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyH": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyHash": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyHome": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyHyphen": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyI": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyInsert": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyJ": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyK": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyL": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyLeftArrow": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyLessThan": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyM": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyN": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyNone": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyO": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyOpenBracket": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyOpenParenthesis": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyP": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyPageDown": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyPageUp": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyPercent": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyPeriod": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyPlus": {
      "0": { "ASCIIcodes": 2 }
    },
    "eKeyQ": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyQuestionMark": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyR": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyReturn": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyRightArrow": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyS": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeySemiColon": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeySingleQuote": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeySpace": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyT": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyTab": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyU": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyUnderscore": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyUpArrow": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyV": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyW": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyX": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyY": {
      "0": { "ASCIIcodes": 1 }
    },
    "eKeyZ": {
      "0": { "ASCIIcodes": 1 }
    },
    "el": {
      "0": { "Tumbleweed": 1 }
    },
    "eLangDE": {
      "0": { "Tumbleweed": 1 }
    },
    "eLangEN": {
      "0": { "Tumbleweed": 2 }
    },
    "eLangES": {
      "0": { "Tumbleweed": 1 }
    },
    "eLangFR": {
      "0": { "Tumbleweed": 1 }
    },
    "eLangIT": {
      "0": { "Tumbleweed": 1 }
    },
    "eLangNL": {
      "0": { "Tumbleweed": 1 }
    },
    "eLangPT": {
      "0": { "Tumbleweed": 1 }
    },
    "elapsed": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "DateTime": 2 }
    },
    "elected": {
      "0": { "Game": 1 }
    },
    "Electroshokker": {
      "0": { "Credits": 1 }
    },
    "element": {
      "0": { "EditorRoom": 10 },
      "1": { "FAQ": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "elements": {
      "0": { "GUI": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "elevated": {
      "0": { "TroubleshootingWindowsZoneID": 2 }
    },
    "eliminate": {
      "0": { "Game": 1 }
    },
    "eliminated": {
      "0": { "UpgradeTo34": 1 }
    },
    "eliminates": {
      "0": { "Setup": 1 }
    },
    "eLocationCharacter": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eLocationHotspot": {
      "0": { "Globalfunctions_General": 1 }
    },
    "eLocationNothing": {
      "0": { "Globalfunctions_General": 1 }
    },
    "eLocationObject": {
      "0": { "Globalfunctions_General": 1 }
    },
    "else": {
      "0": { "ScriptKeywords": 13 },
      "1": { "ScriptingTutorialPart2": 7 },
      "2": { "Character": 3 },
      "3": { "Viewport": 2 },
      "4": { "Debuggingfeatures": 1 }
    },
    "elsewhere": {
      "0": { "ScriptKeywords": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "emanating": {
      "0": { "AudioChannel": 1 }
    },
    "embedded": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "emergency": {
      "0": { "acintro2": 1 }
    },
    "emerges": {
      "0": { "Gamevariables": 1 }
    },
    "eMG": {
      "0": { "Tumbleweed": 1 }
    },
    "eMode": {
      "0": { "Mouse": 1 }
    },
    "eModeInteract": {
      "0": { "Object": 2 }
    },
    "eModeLookat": {
      "0": { "Hotspot": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "eModePickup": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "eModePointer": {
      "0": { "GUI": 1 }
    },
    "eModeTalk": {
      "0": { "Mouse": 1 }
    },
    "eModeTalkto": {
      "0": { "Character": 1 }
    },
    "eModeWait": {
      "0": { "Mouse": 1 }
    },
    "eModeWalkto": {
      "0": { "Mouse": 7 },
      "1": { "GUI": 1 }
    },
    "eModeXXXX": {
      "0": { "StandardEnums": 2 }
    },
    "eMouseLeft": {
      "0": { "Mouse": 3 },
      "1": { "StandardEnums": 1 }
    },
    "eMouseLeftInv": {
      "0": { "TextScriptEvents": 1 }
    },
    "eMouseMiddle": {
      "0": { "Mouse": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eMouseMiddleInv": {
      "0": { "StandardEnums": 1 }
    },
    "eMouseRight": {
      "0": { "Mouse": 3 },
      "1": { "StandardEnums": 1 }
    },
    "eMouseRightInv": {
      "0": { "StandardEnums": 1 }
    },
    "eMouseWheelNorth": {
      "0": { "StandardEnums": 1 }
    },
    "eMouseWheelSouth": {
      "0": { "StandardEnums": 1 }
    },
    "emphasis": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "emphasize": {
      "0": { "acintro3": 1 }
    },
    "empty": {
      "0": { "Settingupthegame": 3 },
      "1": { "String": 2 },
      "2": { "Multimedia": 1 }
    },
    "Empty": {
      "0": { "acintro1": 1 }
    },
    "emulate": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "EN": {
      "0": { "Tumbleweed": 1 }
    },
    "enable": {
      "0": { "Settingupthegame": 5 },
      "1": { "IntegrationWithWindows": 3 },
      "2": { "ScriptKeywords": 2 },
      "3": { "acintro8": 1 }
    },
    "Enable": {
      "0": { "TemplateVerbcoin": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "EnableCursorMode": {
      "0": { "Mouse": 1 }
    },
    "Enabled": {
      "0": { "GUIControl": 11 },
      "1": { "Hotspot": 4 },
      "2": { "GUI": 2 }
    },
    "enabled": {
      "0": { "Character": 10 },
      "1": { "Settingupthegame": 9 },
      "2": { "Mouse": 6 },
      "3": { "Speech": 4 },
      "4": { "IntegrationWithWindows": 3 },
      "5": { "Game": 2 },
      "6": { "Region": 1 }
    },
    "EnableGroundLevelAreas": {
      "0": { "Globalfunctions_Room": 4 }
    },
    "EnableGui": {
      "0": { "Tumbleweed_helper": 4 }
    },
    "EnableHotspot": {
      "0": { "Hotspot": 1 }
    },
    "EnableInterface": {
      "0": { "Globalfunctions_General": 6 }
    },
    "EnableMode": {
      "0": { "Mouse": 5 },
      "1": { "StandardEnums": 1 }
    },
    "EnableRegion": {
      "0": { "Region": 1 }
    },
    "enables": {
      "0": { "File": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "Enables": {
      "0": { "GUIControl": 1 }
    },
    "enabling": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Enabling": {
      "0": { "IntegrationWithWindows": 2 }
    },
    "encapsulate": {
      "0": { "OOProgramming": 2 }
    },
    "encapsulating": {
      "0": { "OOProgramming": 1 }
    },
    "encapsulation": {
      "0": { "OOProgramming": 1 }
    },
    "enclosed": {
      "0": { "Settingupthegame": 1 }
    },
    "enclosing": {
      "0": { "DrawingSurfaceFunctions": 2 }
    },
    "encode": {
      "0": { "MusicAndSound": 1 }
    },
    "encompass": {
      "0": { "acintro2": 1 }
    },
    "encountered": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Preprocessor": 1 }
    },
    "encounters": {
      "0": { "Globalfunctions_General": 1 }
    },
    "End": {
      "0": { "ASCIIcodes": 1 }
    },
    "end": {
      "0": { "ScriptKeywords": 3 },
      "1": { "ScriptingTutorialPart1": 2 },
      "2": { "EditorSprite": 1 }
    },
    "END": {
      "0": { "Globalfunctions_Palette": 2 }
    },
    "end-condition": {
      "0": { "ScriptKeywords": 1 }
    },
    "EndCutscene": {
      "0": { "Globalfunctions_General": 7 },
      "1": { "Game": 4 }
    },
    "ended": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "endif": {
      "0": { "Preprocessor": 6 },
      "1": { "ScriptKeywords": 5 }
    },
    "endpoint": {
      "0": { "EditorView": 1 }
    },
    "endregion": {
      "0": { "Preprocessor": 2 }
    },
    "ends": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Speech": 2 },
      "2": { "DialogOptionsRenderingInfo": 1 }
    },
    "Ends": {
      "0": { "String": 2 }
    },
    "EndsWith": {
      "0": { "String": 5 },
      "1": { "StandardEnums": 1 }
    },
    "eneath": {
      "0": { "Templates": 1 }
    },
    "energetic": {
      "0": { "Character": 1 }
    },
    "Enforce": {
      "0": { "ScriptKeywords": 3 }
    },
    "engine": {
      "0": { "System": 4 },
      "1": { "RuntimeEngine": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "UpgradeTo335": 1 }
    },
    "Engine": {
      "0": { "Plugins": 1 }
    },
    "English": {
      "0": { "Tumbleweed": 2 },
      "1": { "Translations": 1 }
    },
    "ENGLISH": {
      "0": { "Translations": 1 }
    },
    "Enhanced": {
      "0": { "IntegrationWithWindows": 4 },
      "1": { "Settingupthegame": 2 }
    },
    "enhanced": {
      "0": { "Credits": 1 }
    },
    "enhancements": {
      "0": { "UpgradeTo34": 1 }
    },
    "Enjoy": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "enjoy": {
      "0": { "UpgradingTo27": 1 }
    },
    "enlarge": {
      "0": { "DynamicSprite": 1 }
    },
    "enlarges": {
      "0": { "DynamicSprite": 1 }
    },
    "eNoBlock": {
      "0": { "Character": 10 },
      "1": { "RepExec": 2 },
      "2": { "UpgradingTo27": 1 }
    },
    "eNonSorted": {
      "0": { "StandardEnums": 1 }
    },
    "enough": {
      "0": { "Pointers": 1 }
    },
    "ensure": {
      "0": { "UpgradeTo341": 1 }
    },
    "ensures": {
      "0": { "Character": 2 },
      "1": { "Object": 1 }
    },
    "Enter": {
      "0": { "Globalfunctions_General": 1 }
    },
    "enter": {
      "0": { "Settingupthegame": 3 },
      "1": { "FAQ": 2 },
      "2": { "AdvancedRoomFeatures": 1 }
    },
    "entering": {
      "0": { "Character": 2 },
      "1": { "Tumbleweed_door": 1 }
    },
    "EnterRoom": {
      "0": { "Tumbleweed_player": 4 },
      "1": { "Tumbleweed": 1 }
    },
    "enters": {
      "0": { "EventTypes": 6 },
      "1": { "Globalfunctions_Room": 2 },
      "2": { "Character": 1 }
    },
    "Enters": {
      "0": { "Region": 2 },
      "1": { "TextScriptEvents": 1 }
    },
    "entire": {
      "0": { "Settingupthegame": 4 },
      "1": { "AdvancedRoomFeatures": 1 }
    },
    "entirely": {
      "0": { "TemplateSierraStyle": 1 }
    },
    "entrances": {
      "0": { "Tumbleweed": 1 }
    },
    "entries": {
      "0": { "Settingupthegame": 2 },
      "1": { "Scripting": 1 }
    },
    "entry": {
      "0": { "acintro8": 7 },
      "1": { "EditorCharacter": 1 }
    },
    "enum": {
      "0": { "StandardEnums": 33 },
      "1": { "ScriptKeywords": 4 },
      "2": { "UpgradingTo27": 3 }
    },
    "Enumerated": {
      "0": { "Label": 1 }
    },
    "enumerated": {
      "0": { "UpgradingTo27": 2 },
      "1": { "StandardEnums": 1 }
    },
    "enumeration": {
      "0": { "StandardEnums": 5 },
      "1": { "ScriptKeywords": 2 }
    },
    "enums": {
      "0": { "ScriptKeywords": 2 }
    },
    "environment": {
      "0": { "System": 1 }
    },
    "Environment": {
      "0": { "Settingupthegame": 1 }
    },
    "EOF": {
      "0": { "File": 6 }
    },
    "eOnce": {
      "0": { "Character": 5 },
      "1": { "Object": 2 },
      "2": { "Button": 1 }
    },
    "eOperatingSystem": {
      "0": { "System": 1 }
    },
    "eOptionOff": {
      "0": { "Dialog": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eOptionOffForever": {
      "0": { "Dialog": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eOptionOn": {
      "0": { "Dialog": 4 },
      "1": { "CustomDialogOptions": 3 },
      "2": { "StandardEnums": 1 }
    },
    "eOSAndroid": {
      "0": { "System": 1 }
    },
    "eOSDOS": {
      "0": { "System": 1 }
    },
    "eOSiOS": {
      "0": { "System": 1 }
    },
    "eOSLinux": {
      "0": { "System": 1 }
    },
    "eOSMacOS": {
      "0": { "System": 1 }
    },
    "eOSPSP": {
      "0": { "System": 1 }
    },
    "eOSWindows": {
      "0": { "System": 2 },
      "1": { "StandardEnums": 1 }
    },
    "equal": {
      "0": { "ScriptKeywords": 5 },
      "1": { "ScriptingTutorialPart1": 3 },
      "2": { "Screen": 2 },
      "3": { "Hotspot": 1 }
    },
    "equality": {
      "0": { "UpgradingTo271": 1 }
    },
    "equally": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "equals": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "equivalent": {
      "0": { "Character": 7 },
      "1": { "Object": 6 },
      "2": { "InventoryItem": 4 },
      "3": { "Maths": 2 },
      "4": { "GUIControl": 1 }
    },
    "equivalents": {
      "0": { "UpgradingTo27": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "er": {
      "0": { "Tumbleweed": 2 }
    },
    "era": {
      "0": { "UpgradeTo350": 1 }
    },
    "Eramaa": {
      "0": { "Credits": 1 }
    },
    "erase": {
      "0": { "DynamicArrays": 1 }
    },
    "erased": {
      "0": { "EditorRoom": 1 }
    },
    "eRepeat": {
      "0": { "Button": 3 },
      "1": { "Character": 2 },
      "2": { "StandardEnums": 1 }
    },
    "eRoundDown": {
      "0": { "StandardEnums": 1 }
    },
    "eRoundNearest": {
      "0": { "Maths": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eRoundUp": {
      "0": { "Maths": 2 },
      "1": { "StandardEnums": 1 }
    },
    "ERROR": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "error": {
      "0": { "File": 12 },
      "1": { "ScriptKeywords": 4 },
      "2": { "TroubleshootingWindowsZoneID": 2 },
      "3": { "GraphicsDriver": 1 }
    },
    "Error": {
      "0": { "File": 7 },
      "1": { "OOProgramming": 1 }
    },
    "error-checking": {
      "0": { "File": 1 }
    },
    "errors": {
      "0": { "ScriptKeywords": 1 }
    },
    "ES": {
      "0": { "Tumbleweed": 1 }
    },
    "eSayAlways": {
      "0": { "Dialog": 1 }
    },
    "eSayNever": {
      "0": { "Dialog": 1 }
    },
    "eSayUseOptionSetting": {
      "0": { "Dialog": 1 }
    },
    "ESC": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Multimedia": 4 },
      "2": { "ASCIIcodes": 1 }
    },
    "Escape": {
      "0": { "System": 1 }
    },
    "eSeekBegin": {
      "0": { "StandardEnums": 1 }
    },
    "eSeekCurrent": {
      "0": { "File": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eSeekEnd": {
      "0": { "StandardEnums": 1 }
    },
    "eSkipAnyKey": {
      "0": { "Globalfunctions_General": 1 }
    },
    "eSkipAnyKeyOrMouseClick": {
      "0": { "Globalfunctions_General": 1 }
    },
    "eSkipESCOnly": {
      "0": { "Globalfunctions_General": 1 }
    },
    "eSkipESCOrRightButton": {
      "0": { "Globalfunctions_General": 1 }
    },
    "eSkipKey": {
      "0": { "Speech": 1 }
    },
    "eSkipKeyMouse": {
      "0": { "Speech": 1 }
    },
    "eSkipKeyMouseTime": {
      "0": { "Speech": 1 }
    },
    "eSkipKeyTime": {
      "0": { "Speech": 1 }
    },
    "eSkipMouse": {
      "0": { "Speech": 1 }
    },
    "eSkipMouseClick": {
      "0": { "Globalfunctions_General": 1 }
    },
    "eSkipMouseTime": {
      "0": { "Speech": 1 }
    },
    "eSkipScriptOnly": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "StandardEnums": 1 }
    },
    "eSkipTime": {
      "0": { "Speech": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eSorted": {
      "0": { "StandardEnums": 1 }
    },
    "especially": {
      "0": { "UpgradeTo341": 1 }
    },
    "eSpeechFullScreen": {
      "0": { "Speech": 1 }
    },
    "eSpeechLucasarts": {
      "0": { "Speech": 1 }
    },
    "eSpeechSierra": {
      "0": { "Speech": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eSpeechSierraWithBackground": {
      "0": { "Speech": 1 }
    },
    "eSpeechStyle": {
      "0": { "Speech": 1 }
    },
    "eSpeechTextOnly": {
      "0": { "Speech": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eSpeechVoiceAndText": {
      "0": { "Speech": 3 },
      "1": { "StandardEnums": 1 }
    },
    "eSpeechVoiceOnly": {
      "0": { "Speech": 2 },
      "1": { "StandardEnums": 1 }
    },
    "essential": {
      "0": { "acintro9": 2 },
      "1": { "acintro8": 1 }
    },
    "eStopMoving": {
      "0": { "Character": 11 },
      "1": { "StandardEnums": 1 }
    },
    "etc": {
      "0": { "Character": 4 },
      "1": { "ScriptKeywords": 2 },
      "2": { "MusicAndSound": 1 }
    },
    "eTransitionBoxout": {
      "0": { "Globalfunctions_Screen": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eTransitionCrossfade": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "eTransitionDissolve": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "eTransitionFade": {
      "0": { "Globalfunctions_Screen": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eTransitionInstant": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "eu": {
      "0": { "Tumbleweed": 1 }
    },
    "evaluate": {
      "0": { "ScriptKeywords": 1 }
    },
    "evaluated": {
      "0": { "Settingupthegame": 1 }
    },
    "evaluates": {
      "0": { "ScriptKeywords": 2 }
    },
    "even": {
      "0": { "Settingupthegame": 4 },
      "1": { "Object": 3 },
      "2": { "UpgradeTo350": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "Even": {
      "0": { "Room": 1 }
    },
    "event": {
      "0": { "TextScriptEvents": 14 },
      "1": { "EventTypes": 11 },
      "2": { "Tumbleweed": 10 },
      "3": { "Character": 8 },
      "4": { "BlockingScripts": 7 },
      "5": { "Globalfunctions_Room": 6 },
      "6": { "ScriptingTutorialPart1": 5 },
      "7": { "Region": 4 },
      "8": { "TemplateVerbcoin": 3 },
      "9": { "CustomProperties": 2 },
      "10": { "acintro5": 1 }
    },
    "Event": {
      "0": { "EventTypes": 1 }
    },
    "EVENT": {
      "0": { "Region": 1 }
    },
    "events": {
      "0": { "Globalfunctions_Room": 8 },
      "1": { "EventTypes": 7 },
      "2": { "acintro3": 6 },
      "3": { "Tumbleweed": 5 },
      "4": { "acintro4": 4 },
      "5": { "acintro5": 3 },
      "6": { "acintro9": 2 },
      "7": { "Region": 1 }
    },
    "Events": {
      "0": { "acintro3": 3 },
      "1": { "acintro5": 2 },
      "2": { "EventTypes": 1 }
    },
    "EventType": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "Eventually": {
      "0": { "Tumbleweed": 1 }
    },
    "eventually": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "ever": {
      "0": { "Globalfunctions_Room": 2 },
      "1": { "Speech": 1 }
    },
    "eVerbCoinPositionEast": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "eVerbCoinPositionNorth": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "eVerbCoinPositionSouth": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "eVerbCoinPositionWest": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "eVerbGuiTemplateLanguage": {
      "0": { "Tumbleweed": 1 }
    },
    "every": {
      "0": { "Character": 5 },
      "1": { "EventTypes": 4 },
      "2": { "EditorView": 3 },
      "3": { "acintro1": 2 },
      "4": { "ScriptKeywords": 1 }
    },
    "Every": {
      "0": { "Settingupthegame": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "everyone": {
      "0": { "UpgradeTo33": 1 }
    },
    "Everything": {
      "0": { "Globalfunctions_General": 1 }
    },
    "everything": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "Tumbleweed_unhandled": 1 }
    },
    "everywhere": {
      "0": { "Mouse": 1 }
    },
    "eVideoSkipAnyKey": {
      "0": { "StandardEnums": 1 }
    },
    "eVideoSkipAnyKeyOrMouse": {
      "0": { "StandardEnums": 1 }
    },
    "eVideoSkipEscKey": {
      "0": { "Multimedia": 2 },
      "1": { "StandardEnums": 1 }
    },
    "eVideoSkipNotAllowed": {
      "0": { "StandardEnums": 1 }
    },
    "Evil": {
      "0": { "Globalfunctions_Message": 2 }
    },
    "evil": {
      "0": { "Room": 1 }
    },
    "eVoiceMode": {
      "0": { "Speech": 1 }
    },
    "eVolChangeExisting": {
      "0": { "Multimedia": 1 }
    },
    "eVolExistingAndFuture": {
      "0": { "Multimedia": 3 }
    },
    "eVolSetFutureDefault": {
      "0": { "Multimedia": 2 }
    },
    "eWalkableAreas": {
      "0": { "Hotspot": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "ex": {
      "0": { "Plugins": 1 }
    },
    "Ex": {
      "0": { "Plugins": 1 }
    },
    "exact": {
      "0": { "Lipsync": 1 }
    },
    "EXACT": {
      "0": { "ContactingTheDevelopers": 2 }
    },
    "exact-case": {
      "0": { "String": 2 }
    },
    "exactly": {
      "0": { "Character": 3 },
      "1": { "ScriptingTutorialPart2": 2 },
      "2": { "EditorInventoryItems": 1 }
    },
    "EXACTLY": {
      "0": { "Character": 2 }
    },
    "examine": {
      "0": { "acintro1": 1 }
    },
    "examined": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "example": {
      "0": { "ScriptKeywords": 31 },
      "1": { "Settingupthegame": 12 },
      "2": { "Game": 11 },
      "3": { "Globalfunctions_General": 10 },
      "4": { "UpgradingTo27": 8 },
      "5": { "TextParser": 7 },
      "6": { "File": 6 },
      "7": { "UpgradeTo350": 5 },
      "8": { "Tumbleweed": 4 },
      "9": { "Globalfunctions_Screen": 3 },
      "10": { "ExtenderFunctions": 2 },
      "11": { "UpgradeTo30": 1 }
    },
    "Example": {
      "0": { "Character": 88 },
      "1": { "Globalfunctions_General": 50 },
      "2": { "Object": 37 },
      "3": { "DynamicSprite": 21 },
      "4": { "Maths": 20 },
      "5": { "String": 19 },
      "6": { "Mouse": 18 },
      "7": { "DrawingSurfaceFunctions": 17 },
      "8": { "System": 16 },
      "9": { "GUIControl": 15 },
      "10": { "Globalfunctions_Room": 14 },
      "11": { "Hotspot": 13 },
      "12": { "Region": 12 },
      "13": { "Dialog": 11 },
      "14": { "InvWindow": 10 },
      "15": { "Globalfunctions_Screen": 9 },
      "16": { "DateTime": 8 },
      "17": { "Overlay": 7 },
      "18": { "Slider": 6 },
      "19": { "Dictionary": 5 },
      "20": { "ScriptKeywords": 4 },
      "21": { "Globalfunctions_Palette": 3 },
      "22": { "Viewport": 2 },
      "23": { "Screen": 1 }
    },
    "examples": {
      "0": { "Pointers": 3 },
      "1": { "StringFormats": 2 },
      "2": { "TemplateSierraStyle": 1 }
    },
    "Examples": {
      "0": { "System": 1 }
    },
    "exceed": {
      "0": { "UpgradeTo350": 1 }
    },
    "excellent": {
      "0": { "acintro": 1 }
    },
    "except": {
      "0": { "Character": 6 },
      "1": { "Settingupthegame": 2 },
      "2": { "AudioChannel": 1 }
    },
    "exception": {
      "0": { "UpgradeTo350": 1 }
    },
    "excluding": {
      "0": { "SystemLimits": 1 }
    },
    "exe": {
      "0": { "TroubleshootingWindowsZoneID": 3 },
      "1": { "FAQ": 2 },
      "2": { "acintro1": 1 }
    },
    "EXE": {
      "0": { "DistGame": 6 },
      "1": { "UpgradeTo30": 5 },
      "2": { "FAQ": 2 },
      "3": { "Globalfunctions_General": 1 }
    },
    "executable": {
      "0": { "Settingupthegame": 3 },
      "1": { "DistGame": 2 },
      "2": { "UpgradeTo341": 1 }
    },
    "Execute": {
      "0": { "Globalfunctions_General": 1 }
    },
    "execute": {
      "0": { "RepExec": 29 },
      "1": { "Character": 12 },
      "2": { "BlockingScripts": 5 },
      "3": { "ScriptModules": 4 },
      "4": { "Globalfunctions_General": 3 },
      "5": { "Scripting": 2 },
      "6": { "ScriptKeywords": 1 }
    },
    "executed": {
      "0": { "ScriptKeywords": 5 },
      "1": { "Mouse": 1 }
    },
    "executes": {
      "0": { "BlockingScripts": 1 }
    },
    "executing": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "ScriptKeywords": 2 },
      "2": { "Gamevariables": 1 }
    },
    "execution": {
      "0": { "ScriptKeywords": 4 },
      "1": { "ScriptingTutorialPart1": 1 }
    },
    "exerts": {
      "0": { "Character": 2 }
    },
    "exist": {
      "0": { "ScriptKeywords": 4 },
      "1": { "Game": 3 },
      "2": { "Dictionary": 2 },
      "3": { "TroubleshootingWindowsZoneID": 1 }
    },
    "existing": {
      "0": { "Settingupthegame": 4 },
      "1": { "acintro6": 3 },
      "2": { "UpgradeTo34": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "Exists": {
      "0": { "File": 5 }
    },
    "exists": {
      "0": { "File": 4 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "MusicAndSound": 1 }
    },
    "exit": {
      "0": { "Tumbleweed": 4 },
      "1": { "ScriptKeywords": 3 },
      "2": { "Tumbleweed_movement": 2 },
      "3": { "Globalfunctions_General": 1 }
    },
    "Exit": {
      "0": { "Tumbleweed": 3 }
    },
    "exited": {
      "0": { "Globalfunctions_General": 1 }
    },
    "exiting": {
      "0": { "acintro2": 1 }
    },
    "Exits": {
      "0": { "Globalfunctions_General": 1 }
    },
    "exits": {
      "0": { "Mouse": 1 }
    },
    "Exp": {
      "0": { "Maths": 6 }
    },
    "expand": {
      "0": { "acintro2": 1 }
    },
    "Expand": {
      "0": { "acintro7": 2 },
      "1": { "acintro2": 1 }
    },
    "expect": {
      "0": { "ScriptKeywords": 1 }
    },
    "expected": {
      "0": { "ScriptKeywords": 1 }
    },
    "expects": {
      "0": { "UpgradingTo271": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "expense": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro6": 1 }
    },
    "Experience": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "experience": {
      "0": { "Pointers": 1 }
    },
    "experiment": {
      "0": { "UpgradeTo34": 1 }
    },
    "experimental": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "expert": {
      "0": { "File": 1 }
    },
    "experts": {
      "0": { "File": 1 }
    },
    "expire": {
      "0": { "Globalfunctions_General": 2 }
    },
    "expired": {
      "0": { "Globalfunctions_General": 2 }
    },
    "expires": {
      "0": { "Globalfunctions_General": 1 }
    },
    "explain": {
      "0": { "acintro3": 2 },
      "1": { "ScriptingTutorialPart1": 1 }
    },
    "Explained": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "explained": {
      "0": { "Settingupthegame": 4 },
      "1": { "Tumbleweed": 2 },
      "2": { "acintro7": 1 }
    },
    "explaining": {
      "0": { "UpgradingTo27": 1 }
    },
    "explains": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "explicit": {
      "0": { "Character": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "Explicitly": {
      "0": { "Globalfunctions_General": 1 }
    },
    "explicitly": {
      "0": { "Object": 3 },
      "1": { "File": 2 },
      "2": { "GUIControl": 1 }
    },
    "Explore": {
      "0": { "EditorRoom": 1 }
    },
    "explore": {
      "0": { "BlockingScripts": 2 },
      "1": { "acintro7": 1 }
    },
    "Explorer": {
      "0": { "IntegrationWithWindows": 20 },
      "1": { "Settingupthegame": 5 },
      "2": { "TroubleshootingWindowsZoneID": 1 }
    },
    "explorer": {
      "0": { "EditorView": 1 }
    },
    "Explorer's": {
      "0": { "IntegrationWithWindows": 2 }
    },
    "Explosion": {
      "0": { "AudioClip": 2 }
    },
    "explosion": {
      "0": { "AudioChannel": 1 }
    },
    "exponent": {
      "0": { "Maths": 3 }
    },
    "exponential": {
      "0": { "Maths": 1 }
    },
    "Export": {
      "0": { "Lipsync": 1 }
    },
    "export": {
      "0": { "ScriptKeywords": 5 },
      "1": { "Settingupthegame": 3 },
      "2": { "File": 1 }
    },
    "exported": {
      "0": { "ScriptKeywords": 2 },
      "1": { "EditorCharacter": 1 }
    },
    "exports": {
      "0": { "ScriptKeywords": 1 }
    },
    "exposed": {
      "0": { "Scripting": 1 }
    },
    "EXPRESS": {
      "0": { "Copyright": 2 }
    },
    "expressed": {
      "0": { "Character": 2 }
    },
    "expression": {
      "0": { "ScriptKeywords": 25 },
      "1": { "ScriptingTutorialPart2": 3 },
      "2": { "ListBox": 1 }
    },
    "expressions": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "expValue": {
      "0": { "Maths": 1 }
    },
    "EXT": {
      "0": { "MusicAndSound": 2 }
    },
    "extend": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "extended": {
      "0": { "UpgradeTo34": 2 },
      "1": { "acintro9": 1 }
    },
    "Extended": {
      "0": { "UpgradeTo34": 1 }
    },
    "Extender": {
      "0": { "ExtenderFunctions": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "extender": {
      "0": { "ScriptKeywords": 3 },
      "1": { "ExtenderFunctions": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "extenders": {
      "0": { "OOProgramming": 1 }
    },
    "extends": {
      "0": { "Tumbleweed_door": 1 }
    },
    "extension": {
      "0": { "Tumbleweed_extensions": 14 },
      "1": { "Tumbleweed": 6 },
      "2": { "Tumbleweed_actions": 5 },
      "3": { "IntegrationWithWindows": 3 },
      "4": { "Tumbleweed_movement": 2 },
      "5": { "Globalfunctions_General": 1 }
    },
    "Extension": {
      "0": { "Tumbleweed_extensions": 3 },
      "1": { "IntegrationWithWindows": 1 }
    },
    "ExtensionEx": {
      "0": { "Tumbleweed_extensions": 3 }
    },
    "extensions": {
      "0": { "Tumbleweed_extensions": 5 },
      "1": { "Tumbleweed": 2 },
      "2": { "Tumbleweed_movement": 1 }
    },
    "Extensions": {
      "0": { "Tumbleweed": 3 },
      "1": { "Tumbleweed_extensions": 2 },
      "2": { "Tumbleweed_movement": 1 }
    },
    "extensive": {
      "0": { "FAQ": 1 }
    },
    "extent": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "external": {
      "0": { "ScriptKeywords": 2 },
      "1": { "AudioClip": 1 }
    },
    "Extra": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "extra": {
      "0": { "DynamicSprite": 8 },
      "1": { "Settingupthegame": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "extraChar": {
      "0": { "String": 1 }
    },
    "Extract": {
      "0": { "acintro9": 1 }
    },
    "extract": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "extracted": {
      "0": { "TroubleshootingWindowsZoneID": 4 },
      "1": { "Templates": 1 }
    },
    "extracting": {
      "0": { "TroubleshootingWindowsZoneID": 2 }
    },
    "EXTRACTION": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "extrapolate": {
      "0": { "OOProgramming": 1 }
    },
    "eye": {
      "0": { "Settingupthegame": 5 },
      "1": { "UpgradeTo350": 2 },
      "2": { "Camera": 1 }
    },
    "face": {
      "0": { "Character": 24 },
      "1": { "Settingupthegame": 4 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "Tumbleweed_door": 1 }
    },
    "FaceCharacter": {
      "0": { "Character": 11 },
      "1": { "Settingupthegame": 1 }
    },
    "FaceDirection": {
      "0": { "Character": 6 },
      "1": { "StandardEnums": 1 }
    },
    "FaceLocation": {
      "0": { "Character": 7 },
      "1": { "Settingupthegame": 1 }
    },
    "FaceObject": {
      "0": { "Character": 6 },
      "1": { "StandardEnums": 1 }
    },
    "faces": {
      "0": { "Character": 2 },
      "1": { "Tumbleweed_door": 1 }
    },
    "facility": {
      "0": { "Settingupthegame": 1 }
    },
    "facing": {
      "0": { "Character": 7 },
      "1": { "acintro1": 1 }
    },
    "fact": {
      "0": { "UpgradeTo32": 2 },
      "1": { "acintro2": 1 }
    },
    "factor": {
      "0": { "UpgradeTo350": 1 }
    },
    "factors": {
      "0": { "SystemRequirements": 1 }
    },
    "fade": {
      "0": { "Globalfunctions_Screen": 5 },
      "1": { "Character": 2 },
      "2": { "Credits": 1 }
    },
    "Fade": {
      "0": { "Globalfunctions_Screen": 2 },
      "1": { "EventTypes": 1 }
    },
    "fade-in": {
      "0": { "EventTypes": 2 },
      "1": { "FAQ": 1 }
    },
    "faded": {
      "0": { "EventTypes": 2 }
    },
    "faded-in": {
      "0": { "EventTypes": 1 }
    },
    "FadeIn": {
      "0": { "Globalfunctions_Screen": 8 },
      "1": { "Globalfunctions_Palette": 2 }
    },
    "FadeOut": {
      "0": { "Globalfunctions_Screen": 8 },
      "1": { "Globalfunctions_Palette": 2 }
    },
    "Fades": {
      "0": { "Globalfunctions_Screen": 2 }
    },
    "fades": {
      "0": { "Globalfunctions_Screen": 3 },
      "1": { "EventTypes": 1 }
    },
    "fading": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "fail": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "AudioClip": 1 }
    },
    "failed": {
      "0": { "DynamicSprite": 1 }
    },
    "fails": {
      "0": { "System": 1 }
    },
    "failure": {
      "0": { "Hotspot": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "fair": {
      "0": { "Character": 1 }
    },
    "fairly": {
      "0": { "Pointers": 1 }
    },
    "faith": {
      "0": { "Copyright": 1 }
    },
    "fall-through": {
      "0": { "ScriptKeywords": 1 }
    },
    "fallback": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "False": {
      "0": { "UpgradeTo33": 2 },
      "1": { "Debuggingfeatures": 1 }
    },
    "false": {
      "0": { "Character": 27 },
      "1": { "Object": 14 },
      "2": { "GUIControl": 13 },
      "3": { "Region": 9 },
      "4": { "String": 5 },
      "5": { "Game": 4 },
      "6": { "Hotspot": 3 },
      "7": { "InvWindow": 2 },
      "8": { "Speech": 1 }
    },
    "FALSE": {
      "0": { "Room": 3 },
      "1": { "Object": 2 }
    },
    "familiar": {
      "0": { "acintro1": 1 }
    },
    "family": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "fan": {
      "0": { "Pointers": 1 }
    },
    "FAQ": {
      "0": { "FAQ": 1 }
    },
    "far": {
      "0": { "acintro7": 2 },
      "1": { "acintro2": 1 }
    },
    "fast": {
      "0": { "Settingupthegame": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "DrawingSurfaceFunctions": 1 }
    },
    "fast-forward": {
      "0": { "Globalfunctions_General": 1 }
    },
    "faster": {
      "0": { "Dictionary": 2 },
      "1": { "Mouse": 1 }
    },
    "fastest": {
      "0": { "Character": 1 }
    },
    "fault": {
      "0": { "ScriptKeywords": 1 }
    },
    "favour": {
      "0": { "TemplateBASS": 1 }
    },
    "favourite": {
      "0": { "acintro2": 1 }
    },
    "fear": {
      "0": { "AutonumberSpeechFiles": 1 }
    },
    "feature": {
      "0": { "IntegrationWithWindows": 5 },
      "1": { "acintro7": 4 },
      "2": { "Lipsync": 3 },
      "3": { "AdvancedRoomFeatures": 2 },
      "4": { "Multimedia": 1 }
    },
    "featured": {
      "0": { "Setup": 1 }
    },
    "Features": {
      "0": { "OtherFeatures": 1 }
    },
    "features": {
      "0": { "Debuggingfeatures": 4 },
      "1": { "OtherFeatures": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "feedback": {
      "0": { "Tumbleweed_unhandled": 1 }
    },
    "feel": {
      "0": { "acintro1": 2 },
      "1": { "Pointers": 1 }
    },
    "Feel": {
      "0": { "acintro5": 1 }
    },
    "feeling": {
      "0": { "UpgradeTo30": 1 }
    },
    "feet": {
      "0": { "Character": 3 },
      "1": { "acintro2": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "fence": {
      "0": { "TextParser": 6 }
    },
    "Ferdinand": {
      "0": { "Credits": 1 }
    },
    "ferocious": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "ferociousness": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "few": {
      "0": { "Translations": 2 },
      "1": { "Lipsync": 1 }
    },
    "fi": {
      "0": { "Credits": 1 }
    },
    "field": {
      "0": { "acintro7": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "FAQ": 1 }
    },
    "fields": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "Figuring": {
      "0": { "EditorInventoryItems": 1 }
    },
    "FILE": {
      "0": { "Pointers": 1 }
    },
    "file": {
      "0": { "File": 71 },
      "1": { "TroubleshootingWindowsZoneID": 20 },
      "2": { "MusicAndSound": 18 },
      "3": { "Settingupthegame": 16 },
      "4": { "Lipsync": 12 },
      "5": { "UpgradeTo335": 10 },
      "6": { "Pointers": 7 },
      "7": { "Translations": 6 },
      "8": { "AudioChannel": 5 },
      "9": { "UpgradeTo350": 4 },
      "10": { "ContactingTheDevelopers": 3 },
      "11": { "EditorSprite": 2 },
      "12": { "DynamicArrays": 1 }
    },
    "File": {
      "0": { "File": 104 },
      "1": { "Pointers": 8 },
      "2": { "TroubleshootingWindowsZoneID": 3 },
      "3": { "StandardEnums": 2 },
      "4": { "MusicAndSound": 1 }
    },
    "file's": {
      "0": { "File": 3 },
      "1": { "UpgradingTo27": 1 }
    },
    "File's": {
      "0": { "File": 1 }
    },
    "FileClose": {
      "0": { "Pointers": 1 }
    },
    "FileIsEOF": {
      "0": { "File": 1 }
    },
    "FileIsError": {
      "0": { "File": 1 }
    },
    "filemask": {
      "0": { "ListBox": 1 }
    },
    "FILEMASK": {
      "0": { "ListBox": 2 }
    },
    "FileMode": {
      "0": { "StandardEnums": 1 }
    },
    "FILENAME": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "DynamicSprite": 1 }
    },
    "FileName": {
      "0": { "Game": 4 }
    },
    "filename": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Game": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "acintro9": 1 }
    },
    "filenames": {
      "0": { "ListBox": 1 }
    },
    "FileOpen": {
      "0": { "Pointers": 1 }
    },
    "filepath": {
      "0": { "UpgradeTo335": 1 }
    },
    "FileRead": {
      "0": { "File": 1 }
    },
    "FileReadInt": {
      "0": { "File": 1 }
    },
    "FileReadRawChar": {
      "0": { "File": 1 }
    },
    "FileReadRawInt": {
      "0": { "File": 1 }
    },
    "files": {
      "0": { "File": 20 },
      "1": { "MusicAndSound": 13 },
      "2": { "DistGame": 11 },
      "3": { "Settingupthegame": 10 },
      "4": { "BackingUpYourGame": 9 },
      "5": { "UpgradeTo32": 6 },
      "6": { "EditorSprite": 5 },
      "7": { "UpgradeTo341": 4 },
      "8": { "SourceControl": 3 },
      "9": { "AudioChannel": 2 },
      "10": { "OtherFeatures": 1 }
    },
    "Files": {
      "0": { "MusicAndSound": 1 }
    },
    "FileSeek": {
      "0": { "File": 2 },
      "1": { "StandardEnums": 1 }
    },
    "filesystem": {
      "0": { "UpgradeTo335": 1 }
    },
    "FileType": {
      "0": { "AudioClip": 3 },
      "1": { "AudioChannel": 2 },
      "2": { "StandardEnums": 1 }
    },
    "FileWrite": {
      "0": { "Pointers": 1 }
    },
    "FileWriteInt": {
      "0": { "File": 1 }
    },
    "FileWriteRawChar": {
      "0": { "File": 1 }
    },
    "FileWriteRawLine": {
      "0": { "File": 1 }
    },
    "Fill": {
      "0": { "acintro2": 2 },
      "1": { "acintro8": 1 }
    },
    "fill": {
      "0": { "ListBox": 3 },
      "1": { "FAQ": 2 },
      "2": { "TextBox": 1 }
    },
    "FillDirList": {
      "0": { "ListBox": 6 }
    },
    "filled": {
      "0": { "DrawingSurfaceFunctions": 3 },
      "1": { "Dictionary": 2 },
      "2": { "acintro2": 1 }
    },
    "fills": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Fills": {
      "0": { "ListBox": 2 }
    },
    "FillSaveGameList": {
      "0": { "ListBox": 9 },
      "1": { "Game": 1 }
    },
    "filter": {
      "0": { "UpgradeTo34": 1 }
    },
    "filters": {
      "0": { "Setup": 1 }
    },
    "final": {
      "0": { "acintro1": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Finally": {
      "0": { "ScriptingTutorialPart1": 3 },
      "1": { "acintro1": 2 },
      "2": { "BlockingScripts": 1 }
    },
    "finally": {
      "0": { "UpgradingTo27": 1 }
    },
    "Find": {
      "0": { "KeyboardShortcuts": 2 },
      "1": { "acintro2": 1 }
    },
    "find": {
      "0": { "Settingupthegame": 8 },
      "1": { "Globalfunctions_Room": 4 },
      "2": { "UpgradingTo27": 3 },
      "3": { "DrawingSurfaceFunctions": 2 },
      "4": { "Scripting": 1 }
    },
    "Finder": {
      "0": { "Game": 1 }
    },
    "finding": {
      "0": { "MusicAndSound": 1 }
    },
    "Finds": {
      "0": { "Dialog": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "finds": {
      "0": { "BlockingScripts": 1 }
    },
    "FindWordID": {
      "0": { "Parser": 4 }
    },
    "Fine": {
      "0": { "ScriptKeywords": 2 }
    },
    "fine": {
      "0": { "MusicAndSound": 5 },
      "1": { "Settingupthegame": 2 },
      "2": { "acintro4": 1 }
    },
    "finer": {
      "0": { "UpgradeTo32": 1 }
    },
    "finish": {
      "0": { "Character": 7 },
      "1": { "Object": 2 },
      "2": { "acintro3": 1 }
    },
    "Finish": {
      "0": { "acintro1": 1 }
    },
    "Finished": {
      "0": { "AudioChannel": 1 }
    },
    "finished": {
      "0": { "DynamicSprite": 16 },
      "1": { "Character": 5 },
      "2": { "UpgradeTo30": 3 },
      "3": { "Globalfunctions_General": 2 },
      "4": { "RepExec": 1 }
    },
    "finishes": {
      "0": { "Character": 9 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "BlockingScripts": 4 },
      "3": { "Dialog": 3 },
      "4": { "Game": 1 }
    },
    "fire": {
      "0": { "Settingupthegame": 1 }
    },
    "fired": {
      "0": { "EditingGUIs": 1 }
    },
    "Fires": {
      "0": { "Mouse": 1 }
    },
    "first": {
      "0": { "Settingupthegame": 11 },
      "1": { "Character": 7 },
      "2": { "acintro8": 6 },
      "3": { "acintro1": 4 },
      "4": { "ScriptKeywords": 3 },
      "5": { "TextScriptEvents": 2 },
      "6": { "EditorSprite": 1 }
    },
    "First": {
      "0": { "ListBox": 3 },
      "1": { "UpgradeTo34": 2 },
      "2": { "EventTypes": 1 }
    },
    "FIRST": {
      "0": { "Globalfunctions_General": 2 }
    },
    "FirstLoad": {
      "0": { "Tumbleweed_door": 1 }
    },
    "firstly": {
      "0": { "acintro4": 1 }
    },
    "Firstly": {
      "0": { "UpgradingTo27": 1 }
    },
    "firstOne": {
      "0": { "InvWindow": 2 }
    },
    "fit": {
      "0": { "Setup": 2 },
      "1": { "Set": 1 }
    },
    "FITNESS": {
      "0": { "Copyright": 1 }
    },
    "fits": {
      "0": { "Setup": 1 }
    },
    "five": {
      "0": { "Tumbleweed": 1 }
    },
    "fix": {
      "0": { "ScriptKeywords": 2 },
      "1": { "UpgradingTo271": 1 }
    },
    "fixed": {
      "0": { "ScriptingTutorialPart2": 2 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "fixed-length": {
      "0": { "Settingupthegame": 1 }
    },
    "FIXEDINVCURSOR": {
      "0": { "Globalfunctions_General": 1 }
    },
    "fixing": {
      "0": { "UpgradeTo34": 1 }
    },
    "flag": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "FLAGS": {
      "0": { "Multimedia": 1 }
    },
    "flags": {
      "0": { "Multimedia": 1 }
    },
    "flash": {
      "0": { "Tumbleweed": 1 }
    },
    "flat": {
      "0": { "Setup": 1 }
    },
    "Flaten": {
      "0": { "Credits": 1 }
    },
    "FLC": {
      "0": { "Multimedia": 3 }
    },
    "flc": {
      "0": { "Multimedia": 1 }
    },
    "FLI": {
      "0": { "Multimedia": 3 }
    },
    "FLIC": {
      "0": { "Multimedia": 1 }
    },
    "flic": {
      "0": { "Multimedia": 2 }
    },
    "flick": {
      "0": { "UpgradeTo30": 1 }
    },
    "flicker": {
      "0": { "Setup": 1 }
    },
    "FLICx": {
      "0": { "Multimedia": 2 }
    },
    "flies": {
      "0": { "RepExec": 1 }
    },
    "flip": {
      "0": { "Globalfunctions_Screen": 3 },
      "1": { "EditorView": 2 },
      "2": { "DynamicSprite": 1 }
    },
    "Flip": {
      "0": { "DynamicSprite": 7 },
      "1": { "EditorView": 2 },
      "2": { "StandardEnums": 1 }
    },
    "flipped": {
      "0": { "ViewFrame": 2 },
      "1": { "EditorView": 1 }
    },
    "Flipped": {
      "0": { "ViewFrame": 4 },
      "1": { "acintro7": 1 }
    },
    "flipping": {
      "0": { "EditorView": 1 }
    },
    "Flips": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "flips": {
      "0": { "DynamicSprite": 3 }
    },
    "FlipScreen": {
      "0": { "Globalfunctions_Screen": 3 }
    },
    "float": {
      "0": { "Maths": 56 },
      "1": { "ScriptKeywords": 4 },
      "2": { "StringFormats": 3 },
      "3": { "UpgradingTo27": 1 }
    },
    "Float": {
      "0": { "StringFormats": 2 }
    },
    "floating": {
      "0": { "ScriptKeywords": 4 },
      "1": { "Maths": 3 },
      "2": { "UpgradeTo33": 1 }
    },
    "floating-point": {
      "0": { "UpgradingTo27": 1 }
    },
    "floats": {
      "0": { "SystemLimits": 2 },
      "1": { "Camera": 1 }
    },
    "FloatToInt": {
      "0": { "Maths": 7 },
      "1": { "StandardEnums": 1 }
    },
    "floor": {
      "0": { "acintro7": 1 }
    },
    "flower": {
      "0": { "FAQ": 1 }
    },
    "flowing": {
      "0": { "Globalfunctions_Palette": 1 }
    },
    "fly": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "flying": {
      "0": { "RepExec": 2 }
    },
    "FMT": {
      "0": { "String": 1 }
    },
    "fmt": {
      "0": { "String": 1 }
    },
    "focal": {
      "0": { "acintro4": 1 }
    },
    "focus": {
      "0": { "System": 1 }
    },
    "FOLDER": {
      "0": { "TroubleshootingWindowsZoneID": 2 }
    },
    "folder": {
      "0": { "Settingupthegame": 12 },
      "1": { "MusicAndSound": 10 },
      "2": { "Templates": 9 },
      "3": { "Game": 8 },
      "4": { "UpgradeTo32": 5 },
      "5": { "EditorSprite": 4 },
      "6": { "File": 3 },
      "7": { "UpgradeTo335": 2 },
      "8": { "Translations": 1 }
    },
    "folder's": {
      "0": { "Settingupthegame": 1 }
    },
    "folders": {
      "0": { "MusicAndSound": 5 },
      "1": { "UpgradeTo32": 4 },
      "2": { "Settingupthegame": 2 },
      "3": { "Setup": 1 }
    },
    "Folders": {
      "0": { "Settingupthegame": 1 }
    },
    "folding": {
      "0": { "Preprocessor": 2 }
    },
    "Follow": {
      "0": { "StartingOff": 1 }
    },
    "follow": {
      "0": { "Character": 3 },
      "1": { "AdvancedRoomFeatures": 2 },
      "2": { "acintro": 1 }
    },
    "FOLLOW": {
      "0": { "Character": 2 }
    },
    "FollowCharacter": {
      "0": { "Character": 4 }
    },
    "FollowCharacterEx": {
      "0": { "Character": 1 }
    },
    "followed": {
      "0": { "ScriptingTutorialPart1": 6 },
      "1": { "ScriptKeywords": 2 },
      "2": { "Debuggingfeatures": 1 }
    },
    "following": {
      "0": { "ScriptKeywords": 9 },
      "1": { "Character": 6 },
      "2": { "Gamevariables": 4 },
      "3": { "String": 3 },
      "4": { "Tumbleweed_translation": 2 },
      "5": { "SystemRequirements": 1 }
    },
    "Following": {
      "0": { "UpgradeTo350": 1 }
    },
    "follows": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "Region": 1 }
    },
    "font": {
      "0": { "Settingupthegame": 24 },
      "1": { "acintro9": 22 },
      "2": { "Game": 9 },
      "3": { "Overlay": 7 },
      "4": { "Globalfunctions_General": 6 },
      "5": { "DrawingSurfaceFunctions": 4 },
      "6": { "TextBox": 2 },
      "7": { "StandardEnums": 1 }
    },
    "FONT": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Overlay": 1 }
    },
    "Font": {
      "0": { "ListBox": 9 },
      "1": { "Label": 7 },
      "2": { "acintro9": 6 },
      "3": { "StandardEnums": 4 },
      "4": { "Game": 3 },
      "5": { "UpgradeTo350": 1 }
    },
    "font's": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Settingupthegame": 2 }
    },
    "FontCount": {
      "0": { "Game": 3 }
    },
    "FontEdit": {
      "0": { "acintro9": 1 }
    },
    "Fonts": {
      "0": { "Settingupthegame": 5 },
      "1": { "acintro9": 3 },
      "2": { "Game": 2 },
      "3": { "UpgradeTo33": 1 }
    },
    "fonts": {
      "0": { "Settingupthegame": 12 },
      "1": { "acintro9": 8 },
      "2": { "Game": 3 },
      "3": { "Translations": 2 },
      "4": { "acintro8": 1 }
    },
    "FontType": {
      "0": { "DrawingSurfaceFunctions": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "TextBox": 1 }
    },
    "foot": {
      "0": { "EditorRoom": 1 }
    },
    "footstep": {
      "0": { "Settingupthegame": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "footsteps": {
      "0": { "EditorView": 1 }
    },
    "forbidden": {
      "0": { "Camera": 1 }
    },
    "force": {
      "0": { "UpgradeTo335": 1 }
    },
    "Forces": {
      "0": { "DialogOptionsRenderingInfo": 1 }
    },
    "forces": {
      "0": { "UpgradeTo33": 1 }
    },
    "forcing": {
      "0": { "OOProgramming": 1 }
    },
    "Foreground": {
      "0": { "EditingGUIs": 1 }
    },
    "Foreign": {
      "0": { "Label": 1 }
    },
    "foreign": {
      "0": { "Label": 1 }
    },
    "forever": {
      "0": { "ScriptKeywords": 1 }
    },
    "forget": {
      "0": { "Tumbleweed": 1 }
    },
    "forgetting": {
      "0": { "File": 1 }
    },
    "forgot": {
      "0": { "EditorView": 1 }
    },
    "forgotten": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "form": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Format": {
      "0": { "String": 8 },
      "1": { "ScriptKeywords": 1 }
    },
    "format": {
      "0": { "MusicAndSound": 4 },
      "1": { "DateTime": 3 },
      "2": { "acintro9": 2 },
      "3": { "SystemLimits": 1 }
    },
    "formats": {
      "0": { "MusicAndSound": 1 }
    },
    "formatted": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "formatting": {
      "0": { "Globalfunctions_Message": 3 },
      "1": { "StringFormats": 2 },
      "2": { "DrawingSurfaceFunctions": 1 }
    },
    "former": {
      "0": { "GraphicsDriver": 1 }
    },
    "Formerly": {
      "0": { "Character": 70 },
      "1": { "Object": 33 },
      "2": { "Game": 23 },
      "3": { "Mouse": 16 },
      "4": { "ListBox": 15 },
      "5": { "DrawingSurfaceFunctions": 14 },
      "6": { "String": 13 },
      "7": { "InventoryItem": 12 },
      "8": { "Hotspot": 11 },
      "9": { "ViewFrame": 9 },
      "10": { "AudioClip": 8 },
      "11": { "Speech": 7 },
      "12": { "Region": 6 },
      "13": { "InvWindow": 5 },
      "14": { "GUIControl": 4 },
      "15": { "Dialog": 3 },
      "16": { "DateTime": 2 }
    },
    "formerly": {
      "0": { "ScriptModules": 1 }
    },
    "forms": {
      "0": { "Settingupthegame": 2 },
      "1": { "UpgradeTo34": 1 }
    },
    "forth": {
      "0": { "acintro1": 2 },
      "1": { "Pointers": 1 }
    },
    "Forum": {
      "0": { "acintro9": 1 }
    },
    "forum": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "forums": {
      "0": { "ContactingTheDevelopers": 4 },
      "1": { "Pointers": 1 }
    },
    "Forums": {
      "0": { "ContactingTheDevelopers": 3 },
      "1": { "acintro1": 1 }
    },
    "forward": {
      "0": { "Lipsync": 2 },
      "1": { "UpgradeTo32": 1 }
    },
    "forwards": {
      "0": { "RepExec": 1 }
    },
    "found": {
      "0": { "Game": 4 },
      "1": { "ScriptKeywords": 2 },
      "2": { "UpgradeTo335": 1 }
    },
    "Foundation": {
      "0": { "Copyright": 2 },
      "1": { "DistGame": 1 }
    },
    "four": {
      "0": { "acintro2": 2 },
      "1": { "acintro1": 1 }
    },
    "four-point": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "fps": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "Character": 1 }
    },
    "FPS": {
      "0": { "EditorView": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "FR": {
      "0": { "Tumbleweed": 1 }
    },
    "Frame": {
      "0": { "ViewFrame": 7 },
      "1": { "Button": 6 },
      "2": { "Object": 5 },
      "3": { "Game": 1 }
    },
    "FRAME": {
      "0": { "Globalfunctions_Room": 2 }
    },
    "frame": {
      "0": { "ViewFrame": 35 },
      "1": { "Character": 30 },
      "2": { "Settingupthegame": 21 },
      "3": { "EditorView": 19 },
      "4": { "Object": 17 },
      "5": { "acintro7": 13 },
      "6": { "Lipsync": 11 },
      "7": { "Globalfunctions_Room": 8 },
      "8": { "Game": 5 },
      "9": { "DynamicSprite": 3 },
      "10": { "DrawingSurfaceFunctions": 2 },
      "11": { "Viewport": 1 }
    },
    "frame's": {
      "0": { "acintro7": 3 },
      "1": { "Settingupthegame": 2 }
    },
    "frame-linked": {
      "0": { "Character": 1 }
    },
    "frameCount": {
      "0": { "Game": 2 }
    },
    "FRAMES": {
      "0": { "UpgradeTo30": 1 }
    },
    "Frames": {
      "0": { "Debuggingfeatures": 1 }
    },
    "frames": {
      "0": { "Character": 9 },
      "1": { "Settingupthegame": 7 },
      "2": { "EditorView": 6 },
      "3": { "Lipsync": 4 },
      "4": { "Globalfunctions_General": 2 },
      "5": { "acintro6": 1 }
    },
    "Framework": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "FRAMExxx": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Francesco": {
      "0": { "Credits": 1 }
    },
    "free": {
      "0": { "DynamicSprite": 8 },
      "1": { "BlockingScripts": 2 },
      "2": { "Pointers": 1 }
    },
    "FreeAmp": {
      "0": { "Credits": 1 }
    },
    "freed": {
      "0": { "Pointers": 3 }
    },
    "freedom": {
      "0": { "UpgradeTo34": 1 }
    },
    "freehand": {
      "0": { "EditorRoom": 1 }
    },
    "Freehand": {
      "0": { "acintro2": 1 }
    },
    "freely": {
      "0": { "EditorRoom": 1 }
    },
    "FreeType": {
      "0": { "DistGame": 2 },
      "1": { "Credits": 1 }
    },
    "FreezePlayer": {
      "0": { "Tumbleweed_player": 5 }
    },
    "French": {
      "0": { "Tumbleweed": 1 }
    },
    "Frequently": {
      "0": { "FAQ": 1 }
    },
    "fresh": {
      "0": { "ScriptKeywords": 2 }
    },
    "freshness": {
      "0": { "ScriptKeywords": 6 }
    },
    "friend": {
      "0": { "Templates": 1 }
    },
    "From": {
      "0": { "DistGame": 1 }
    },
    "FROM": {
      "0": { "DrawingSurfaceFunctions": 2 },
      "1": { "Copyright": 1 }
    },
    "from": {
      "0": { "Character": 35 },
      "1": { "DynamicSprite": 26 },
      "2": { "Settingupthegame": 24 },
      "3": { "File": 22 },
      "4": { "Globalfunctions_General": 21 },
      "5": { "ScriptKeywords": 17 },
      "6": { "Object": 16 },
      "7": { "Game": 14 },
      "8": { "ListBox": 13 },
      "9": { "DrawingSurfaceFunctions": 12 },
      "10": { "Dialog": 10 },
      "11": { "Globalfunctions_Room": 9 },
      "12": { "AdvancedRoomFeatures": 8 },
      "13": { "acintro6": 7 },
      "14": { "UpgradingTo27": 6 },
      "15": { "IntegrationWithWindows": 5 },
      "16": { "UpgradeTo32": 4 },
      "17": { "CallingGlobalFunctions": 3 },
      "18": { "GraphicsDriver": 2 },
      "19": { "SourceControl": 1 }
    },
    "fromSpriteSlot": {
      "0": { "DynamicSprite": 1 }
    },
    "front": {
      "0": { "Game": 9 },
      "1": { "acintro4": 3 },
      "2": { "GUIControl": 2 },
      "3": { "GUI": 1 }
    },
    "front-most": {
      "0": { "GUI": 1 }
    },
    "full": {
      "0": { "Settingupthegame": 3 },
      "1": { "Multimedia": 2 },
      "2": { "Speech": 1 }
    },
    "full-screen": {
      "0": { "acintro2": 1 }
    },
    "Full-screen": {
      "0": { "System": 1 }
    },
    "Fullscreen": {
      "0": { "Setup": 1 }
    },
    "fullscreen": {
      "0": { "Setup": 6 },
      "1": { "Mouse": 2 },
      "2": { "System": 1 }
    },
    "fully": {
      "0": { "Character": 3 },
      "1": { "GUI": 2 },
      "2": { "GraphicsDriver": 1 }
    },
    "fully-working": {
      "0": { "acintro4": 1 }
    },
    "fumbling": {
      "0": { "Settingupthegame": 1 }
    },
    "fun": {
      "0": { "UpgradingTo27": 1 }
    },
    "function": {
      "0": { "Character": 56 },
      "1": { "ScriptKeywords": 52 },
      "2": { "Globalfunctions_General": 49 },
      "3": { "DialogOptionsRenderingInfo": 27 },
      "4": { "String": 26 },
      "5": { "Game": 25 },
      "6": { "ScriptingTutorialPart2": 21 },
      "7": { "Tumbleweed": 20 },
      "8": { "CustomDialogOptions": 16 },
      "9": { "File": 14 },
      "10": { "ScriptModules": 12 },
      "11": { "Room": 11 },
      "12": { "Tumbleweed_movement": 10 },
      "13": { "CallingGlobalFunctions": 9 },
      "14": { "Hotspot": 8 },
      "15": { "UpgradingTo27": 7 },
      "16": { "ExtenderFunctions": 6 },
      "17": { "Globalfunctions_Palette": 5 },
      "18": { "SystemLimits": 4 },
      "19": { "UpgradingTo271": 3 },
      "20": { "Gamevariables": 2 },
      "21": { "EditingGUIs": 1 }
    },
    "Function": {
      "0": { "Screen": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "function's": {
      "0": { "ScriptKeywords": 1 }
    },
    "functionalities": {
      "0": { "Scripting": 1 }
    },
    "functionality": {
      "0": { "ScriptModules": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Functions": {
      "0": { "Tumbleweed": 3 },
      "1": { "ScriptingTutorialPart2": 2 },
      "2": { "Screen": 1 }
    },
    "functions": {
      "0": { "Scripting": 45 },
      "1": { "ScriptingTutorialPart2": 10 },
      "2": { "UpgradeTo34": 7 },
      "3": { "Globalfunctions_General": 6 },
      "4": { "UpgradingTo27": 5 },
      "5": { "BlockingScripts": 4 },
      "6": { "ExtenderFunctions": 3 },
      "7": { "Globalfunctions_Screen": 2 },
      "8": { "DateTime": 1 }
    },
    "fundamental": {
      "0": { "UpgradeTo31": 1 }
    },
    "furniture": {
      "0": { "Object": 1 }
    },
    "further": {
      "0": { "Settingupthegame": 1 }
    },
    "Furthermore": {
      "0": { "UpgradeTo335": 1 }
    },
    "future": {
      "0": { "Multimedia": 3 },
      "1": { "Globalfunctions_Screen": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Gambrell": {
      "0": { "Credits": 1 }
    },
    "GAME": {
      "0": { "DistGame": 4 },
      "1": { "BackingUpYourGame": 1 }
    },
    "Game": {
      "0": { "Game": 130 },
      "1": { "Globalfunctions_General": 31 },
      "2": { "IntegrationWithWindows": 20 },
      "3": { "ViewFrame": 14 },
      "4": { "Multimedia": 13 },
      "5": { "Settingupthegame": 11 },
      "6": { "Camera": 8 },
      "7": { "acintro1": 7 },
      "8": { "DrawingSurfaceFunctions": 5 },
      "9": { "Globalfunctions_Room": 4 },
      "10": { "Gamevariables": 3 },
      "11": { "EditingGUIs": 2 },
      "12": { "Region": 1 }
    },
    "game": {
      "0": { "Globalfunctions_General": 100 },
      "1": { "Settingupthegame": 91 },
      "2": { "Game": 56 },
      "3": { "Gamevariables": 49 },
      "4": { "Setup": 37 },
      "5": { "IntegrationWithWindows": 29 },
      "6": { "System": 28 },
      "7": { "acintro1": 24 },
      "8": { "Character": 22 },
      "9": { "ScriptKeywords": 19 },
      "10": { "MusicAndSound": 18 },
      "11": { "DynamicSprite": 17 },
      "12": { "UpgradeTo341": 16 },
      "13": { "RepExec": 15 },
      "14": { "acintro7": 14 },
      "15": { "TextScriptEvents": 13 },
      "16": { "UpgradeTo34": 12 },
      "17": { "Speech": 11 },
      "18": { "UpgradeTo30": 10 },
      "19": { "Mouse": 9 },
      "20": { "Translations": 8 },
      "21": { "acintro6": 7 },
      "22": { "FAQ": 6 },
      "23": { "UpgradeTo32": 5 },
      "24": { "Camera": 4 },
      "25": { "Introduction": 3 },
      "26": { "DynamicArrays": 2 },
      "27": { "UpgradingTo27": 1 }
    },
    "game's": {
      "0": { "Settingupthegame": 14 },
      "1": { "System": 9 },
      "2": { "DistGame": 4 },
      "3": { "UpgradeTo335": 2 },
      "4": { "BackingUpYourGame": 1 }
    },
    "game-creation": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "game-making": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "game-playing": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "game-speed": {
      "0": { "EditorView": 1 }
    },
    "Game-wide": {
      "0": { "UpgradeTo33": 2 }
    },
    "game-wide": {
      "0": { "Settingupthegame": 4 },
      "1": { "acintro1": 3 },
      "2": { "acintro5": 1 }
    },
    "GameExplorer": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "GAMENAME": {
      "0": { "EditingGUIs": 1 }
    },
    "Gameplay": {
      "0": { "Setup": 1 }
    },
    "gameplay": {
      "0": { "Mouse": 1 }
    },
    "games": {
      "0": { "Settingupthegame": 22 },
      "1": { "Globalfunctions_General": 8 },
      "2": { "Setup": 6 },
      "3": { "UpgradeTo350": 5 },
      "4": { "DrawingSurfaceFunctions": 4 },
      "5": { "acintro1": 3 },
      "6": { "Region": 2 },
      "7": { "DynamicArrays": 1 }
    },
    "Games": {
      "0": { "IntegrationWithWindows": 7 },
      "1": { "Settingupthegame": 3 },
      "2": { "Game": 2 },
      "3": { "GUIControl": 1 }
    },
    "GameState": {
      "0": { "Scripting": 1 }
    },
    "Gamewide": {
      "0": { "acintro1": 1 }
    },
    "Gamma": {
      "0": { "System": 6 }
    },
    "gamma": {
      "0": { "System": 3 }
    },
    "gap": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "Settingupthegame": 1 }
    },
    "Gap": {
      "0": { "Settingupthegame": 1 }
    },
    "gave": {
      "0": { "Pointers": 1 }
    },
    "GB": {
      "0": { "UpgradeTo350": 2 }
    },
    "gBottomLine": {
      "0": { "Globalfunctions_General": 1 }
    },
    "gControlpanel": {
      "0": { "GUI": 1 }
    },
    "general": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "TemplateSierraStyle": 1 }
    },
    "General": {
      "0": { "Game": 4 },
      "1": { "DistGame": 3 },
      "2": { "IntegrationWithWindows": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "Generally": {
      "0": { "ScriptKeywords": 1 }
    },
    "generally": {
      "0": { "InvWindow": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "generate": {
      "0": { "FAQ": 1 }
    },
    "generated": {
      "0": { "StandardEnums": 2 },
      "1": { "DistGame": 1 }
    },
    "generating": {
      "0": { "Tumbleweed": 1 }
    },
    "generic": {
      "0": { "GUIControl": 1 }
    },
    "german": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "German": {
      "0": { "Game": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "get": {
      "0": { "DialogOptionsRenderingInfo": 19 },
      "1": { "OOProgramming": 11 },
      "2": { "Object": 8 },
      "3": { "Globalfunctions_General": 7 },
      "4": { "EditingGUIs": 5 },
      "5": { "FAQ": 4 },
      "6": { "Pointers": 3 },
      "7": { "Room": 2 },
      "8": { "Region": 1 }
    },
    "Get": {
      "0": { "Dictionary": 5 },
      "1": { "Globalfunctions_Message": 2 },
      "2": { "OOProgramming": 1 }
    },
    "GetAtRoomXY": {
      "0": { "Region": 9 },
      "1": { "Hotspot": 7 },
      "2": { "Globalfunctions_Room": 2 }
    },
    "GetAtScreenXY": {
      "0": { "Hotspot": 9 },
      "1": { "Object": 8 },
      "2": { "Region": 7 },
      "3": { "GUI": 6 },
      "4": { "InventoryItem": 5 },
      "5": { "GUIControl": 4 },
      "6": { "Pointers": 3 },
      "7": { "Globalfunctions_Room": 2 }
    },
    "GetBackgroundFrame": {
      "0": { "Globalfunctions_Room": 4 },
      "1": { "DynamicSprite": 1 }
    },
    "GetButtonAction": {
      "0": { "Tumbleweed_helper": 3 }
    },
    "GetButtonPic": {
      "0": { "Button": 4 }
    },
    "GetCharacterAt": {
      "0": { "Character": 1 }
    },
    "GetCharacterProperty": {
      "0": { "Character": 1 }
    },
    "GetCharacterPropertyText": {
      "0": { "Character": 1 }
    },
    "GetColorFromRGB": {
      "0": { "ListBox": 3 },
      "1": { "ScriptKeywords": 2 },
      "2": { "GUI": 1 }
    },
    "GetCurrentMusic": {
      "0": { "AudioChannel": 1 }
    },
    "GetCursorMode": {
      "0": { "Mouse": 1 }
    },
    "GetDamage": {
      "0": { "OOProgramming": 2 }
    },
    "GetDialogOption": {
      "0": { "Dialog": 1 }
    },
    "GetDoorState": {
      "0": { "Tumbleweed_door": 4 }
    },
    "GetDrawingSurface": {
      "0": { "DynamicSprite": 7 },
      "1": { "DrawingSurfaceFunctions": 2 },
      "2": { "UpgradeTo30": 1 }
    },
    "GetDrawingSurfaceForBackground": {
      "0": { "DrawingSurfaceFunctions": 20 },
      "1": { "DynamicSprite": 9 },
      "2": { "Room": 3 },
      "3": { "Globalfunctions_General": 1 }
    },
    "GetFontHeight": {
      "0": { "Globalfunctions_General": 5 }
    },
    "GetFontLineSpacing": {
      "0": { "Globalfunctions_General": 4 }
    },
    "GetFrameCountForLoop": {
      "0": { "Game": 6 },
      "1": { "Globalfunctions_General": 1 }
    },
    "GetGameOption": {
      "0": { "Globalfunctions_General": 4 }
    },
    "GetGameParameter": {
      "0": { "Game": 10 },
      "1": { "ViewFrame": 7 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "Room": 1 }
    },
    "GetGameSpeed": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "EditorView": 1 }
    },
    "GetGlobalInt": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "ScriptKeywords": 4 },
      "2": { "Region": 1 }
    },
    "GetGlobalString": {
      "0": { "Game": 1 }
    },
    "GetGraphicalVariable": {
      "0": { "Globalfunctions_General": 4 }
    },
    "GetGUIAt": {
      "0": { "GUI": 1 }
    },
    "GetGUIAtLocation": {
      "0": { "GUIControl": 1 }
    },
    "GetGUIObjectAt": {
      "0": { "GUIControl": 1 }
    },
    "GetHotspotAt": {
      "0": { "Pointers": 1 }
    },
    "GetHotspotName": {
      "0": { "Hotspot": 1 }
    },
    "GetHotspotPointX": {
      "0": { "Hotspot": 1 }
    },
    "GetHotspotPointY": {
      "0": { "Hotspot": 1 }
    },
    "GetHotspotProperty": {
      "0": { "Hotspot": 1 }
    },
    "GetHotspotPropertyText": {
      "0": { "Hotspot": 1 }
    },
    "GetHowManyTradeGoodsShopkeeperHas": {
      "0": { "ScriptKeywords": 1 }
    },
    "geti": {
      "0": { "OOProgramming": 3 }
    },
    "GetInvAt": {
      "0": { "InventoryItem": 1 }
    },
    "GetInvGraphic": {
      "0": { "InventoryItem": 1 }
    },
    "GetInvName": {
      "0": { "InventoryItem": 1 }
    },
    "GetInvProperty": {
      "0": { "InventoryItem": 1 }
    },
    "GetInvPropertyText": {
      "0": { "InventoryItem": 1 }
    },
    "GetItemAtLocation": {
      "0": { "ListBox": 3 }
    },
    "GetItemsAsArray": {
      "0": { "Set": 4 }
    },
    "GetItemText": {
      "0": { "ListBox": 1 }
    },
    "GetKeysAsArray": {
      "0": { "Dictionary": 4 }
    },
    "GetLocationName": {
      "0": { "Game": 4 },
      "1": { "Hotspot": 3 },
      "2": { "InventoryItem": 2 },
      "3": { "Region": 1 }
    },
    "GetLocationType": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "Hotspot": 2 },
      "2": { "Region": 1 }
    },
    "GetLoopCountForView": {
      "0": { "Game": 6 },
      "1": { "Globalfunctions_General": 1 }
    },
    "GetMessageText": {
      "0": { "Room": 1 }
    },
    "GetMIDIPosition": {
      "0": { "AudioChannel": 1 }
    },
    "GetModeGraphic": {
      "0": { "Mouse": 4 }
    },
    "GetMODPattern": {
      "0": { "AudioChannel": 1 }
    },
    "GetName": {
      "0": { "Hotspot": 1 }
    },
    "GetObjectAt": {
      "0": { "Object": 1 }
    },
    "GetObjectBaseline": {
      "0": { "Object": 1 }
    },
    "GetObjectGraphic": {
      "0": { "Object": 1 }
    },
    "GetObjectName": {
      "0": { "Object": 1 }
    },
    "GetObjectProperty": {
      "0": { "Object": 1 }
    },
    "GetObjectPropertyText": {
      "0": { "Object": 1 }
    },
    "GetObjectX": {
      "0": { "Object": 1 }
    },
    "GetObjectY": {
      "0": { "Object": 1 }
    },
    "GetOptionState": {
      "0": { "Dialog": 8 },
      "1": { "CustomDialogOptions": 3 },
      "2": { "DialogOptionsRenderingInfo": 2 },
      "3": { "StandardEnums": 1 }
    },
    "GetOptionText": {
      "0": { "CustomDialogOptions": 5 },
      "1": { "Dialog": 4 }
    },
    "GetPixel": {
      "0": { "DrawingSurfaceFunctions": 5 }
    },
    "GetPlayerCharacter": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "UpgradingTo27": 1 }
    },
    "GetProperty": {
      "0": { "Room": 5 },
      "1": { "UpgradeTo34": 1 }
    },
    "GetPropertyText": {
      "0": { "Character": 1 }
    },
    "GetRawTime": {
      "0": { "DateTime": 1 }
    },
    "GetRegionAt": {
      "0": { "Region": 1 }
    },
    "GetRoomProperty": {
      "0": { "Room": 1 }
    },
    "GetRoomPropertyText": {
      "0": { "Room": 1 }
    },
    "GetRunNextSettingForLoop": {
      "0": { "Game": 6 },
      "1": { "Globalfunctions_General": 1 }
    },
    "gets": {
      "0": { "ScriptKeywords": 4 },
      "1": { "Character": 3 },
      "2": { "Object": 2 },
      "3": { "GUI": 1 }
    },
    "Gets": {
      "0": { "Character": 45 },
      "1": { "Object": 21 },
      "2": { "GUI": 15 },
      "3": { "Game": 14 },
      "4": { "Button": 12 },
      "5": { "System": 11 },
      "6": { "Speech": 10 },
      "7": { "AudioChannel": 9 },
      "8": { "Region": 8 },
      "9": { "DateTime": 7 },
      "10": { "Slider": 6 },
      "11": { "Screen": 5 },
      "12": { "Mouse": 4 },
      "13": { "Dialog": 3 },
      "14": { "Globalfunctions_General": 2 },
      "15": { "File": 1 }
    },
    "GetSaveSlotDescription": {
      "0": { "Game": 4 },
      "1": { "Globalfunctions_General": 2 }
    },
    "GetScalingAt": {
      "0": { "Globalfunctions_Room": 6 }
    },
    "GetSliderValue": {
      "0": { "Slider": 1 }
    },
    "getter": {
      "0": { "OOProgramming": 4 },
      "1": { "ScriptKeywords": 1 }
    },
    "GetText": {
      "0": { "Label": 1 }
    },
    "GetTextBoxText": {
      "0": { "TextBox": 1 }
    },
    "GetTextHeight": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "CustomDialogOptions": 3 },
      "2": { "StandardEnums": 1 }
    },
    "GetTextProperty": {
      "0": { "Room": 5 }
    },
    "GetTextWidth": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "StandardEnums": 1 }
    },
    "GetTime": {
      "0": { "DateTime": 1 }
    },
    "getting": {
      "0": { "DateTime": 2 },
      "1": { "Pointers": 1 }
    },
    "Getting": {
      "0": { "acintro9": 2 },
      "1": { "acintro1": 1 }
    },
    "GetTranslation": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "Translations": 1 }
    },
    "GetTranslationName": {
      "0": { "Game": 1 }
    },
    "GetValuesAsArray": {
      "0": { "Dictionary": 4 }
    },
    "GetViewFrame": {
      "0": { "ViewFrame": 14 },
      "1": { "Game": 6 },
      "2": { "Globalfunctions_General": 1 }
    },
    "GetViewportX": {
      "0": { "UpgradeTo350": 2 }
    },
    "GetViewportY": {
      "0": { "UpgradeTo350": 2 }
    },
    "GetWalkableAreaAt": {
      "0": { "Globalfunctions_Room": 4 },
      "1": { "UpgradeTo350": 1 }
    },
    "GetWalkableAreaAtRoom": {
      "0": { "Globalfunctions_Room": 4 },
      "1": { "Region": 1 }
    },
    "GetWalkableAreaAtScreen": {
      "0": { "Globalfunctions_Room": 5 },
      "1": { "UpgradeTo350": 1 }
    },
    "gIconbar": {
      "0": { "GUI": 4 },
      "1": { "GUIControl": 1 }
    },
    "gIconBar": {
      "0": { "EditingGUIs": 2 }
    },
    "GIF": {
      "0": { "Credits": 1 }
    },
    "Gilad": {
      "0": { "Credits": 1 }
    },
    "Gilbert": {
      "0": { "Credits": 1 }
    },
    "gInventory": {
      "0": { "GUI": 8 },
      "1": { "UpgradingTo27": 1 }
    },
    "gInventoryBar": {
      "0": { "TemplateBASS": 1 }
    },
    "github": {
      "0": { "Copyright": 1 }
    },
    "give": {
      "0": { "Tumbleweed": 4 },
      "1": { "acintro5": 3 },
      "2": { "Character": 2 },
      "3": { "EditorSprite": 1 }
    },
    "Give": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "given": {
      "0": { "Tumbleweed_movement": 8 },
      "1": { "Tumbleweed_actions": 4 },
      "2": { "Room": 3 },
      "3": { "Game": 2 },
      "4": { "Tumbleweed": 1 }
    },
    "GIVEN": {
      "0": { "Copyright": 1 }
    },
    "gives": {
      "0": { "CustomProperties": 3 },
      "1": { "Game": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "GiveScore": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "Game": 2 },
      "2": { "Gamevariables": 1 }
    },
    "GiveTo": {
      "0": { "Tumbleweed": 2 }
    },
    "giving": {
      "0": { "Settingupthegame": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "Glad": {
      "0": { "UpgradeTo32": 1 }
    },
    "glad": {
      "0": { "Settingupthegame": 1 }
    },
    "gLeverPuzzle": {
      "0": { "FAQ": 1 }
    },
    "glide": {
      "0": { "Character": 1 }
    },
    "global": {
      "0": { "Globalfunctions_General": 15 },
      "1": { "Game": 12 },
      "2": { "Character": 10 },
      "3": { "BlockingScripts": 8 },
      "4": { "GlobalVariables": 7 },
      "5": { "Pointers": 6 },
      "6": { "Speech": 5 },
      "7": { "ScriptingTutorialPart2": 4 },
      "8": { "Tumbleweed": 3 },
      "9": { "Mouse": 2 },
      "10": { "Region": 1 }
    },
    "Global": {
      "0": { "Scripting": 7 },
      "1": { "GlobalVariables": 5 },
      "2": { "Game": 4 },
      "3": { "Globalfunctions_General": 3 },
      "4": { "MusicAndSound": 2 },
      "5": { "Region": 1 }
    },
    "GlobalCondition": {
      "0": { "Tumbleweed_helper": 3 }
    },
    "Globalint": {
      "0": { "ScriptKeywords": 5 }
    },
    "GlobalInt": {
      "0": { "Globalfunctions_General": 2 }
    },
    "GlobalInts": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "ScriptingTutorialPart1": 1 }
    },
    "globally": {
      "0": { "OOProgramming": 1 }
    },
    "GlobalMessages": {
      "0": { "Game": 3 }
    },
    "GlobalScript": {
      "0": { "KeyboardShortcuts": 2 },
      "1": { "RepExec": 1 }
    },
    "GlobalSpeechAnimationDelay": {
      "0": { "Speech": 4 },
      "1": { "Character": 2 },
      "2": { "UpgradeTo33": 1 }
    },
    "GlobalStrings": {
      "0": { "Game": 4 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Glory": {
      "0": { "acintro8": 1 }
    },
    "gMaingui": {
      "0": { "Tumbleweed_translation": 3 }
    },
    "gMainMenu": {
      "0": { "GUI": 2 }
    },
    "gMyGui": {
      "0": { "GUI": 3 }
    },
    "gMyTextGui": {
      "0": { "GUI": 1 }
    },
    "GNU": {
      "0": { "Copyright": 1 }
    },
    "go": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "Settingupthegame": 5 },
      "2": { "acintro4": 4 },
      "3": { "GUIControl": 2 },
      "4": { "ScriptKeywords": 1 }
    },
    "Go": {
      "0": { "Settingupthegame": 5 },
      "1": { "acintro5": 2 },
      "2": { "FAQ": 1 }
    },
    "goal": {
      "0": { "Tumbleweed_movement": 8 }
    },
    "Goes": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "goes": {
      "0": { "Character": 2 },
      "1": { "acintro2": 1 }
    },
    "going": {
      "0": { "acintro1": 5 },
      "1": { "Settingupthegame": 3 },
      "2": { "RepExec": 2 },
      "3": { "Globalfunctions_General": 1 }
    },
    "gone": {
      "0": { "UpgradeTo30": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "Gonzalez": {
      "0": { "Credits": 3 }
    },
    "Good": {
      "0": { "EditorView": 1 }
    },
    "good": {
      "0": { "FAQ": 3 },
      "1": { "ScriptKeywords": 1 }
    },
    "goodbye": {
      "0": { "String": 2 }
    },
    "Goodbye": {
      "0": { "Settingupthegame": 1 }
    },
    "Google": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "got": {
      "0": { "TextScriptEvents": 3 },
      "1": { "Pointers": 2 },
      "2": { "Translations": 1 }
    },
    "GOT": {
      "0": { "Globalfunctions_General": 1 }
    },
    "gotcha": {
      "0": { "ScriptKeywords": 1 }
    },
    "GoTo": {
      "0": { "Tumbleweed_movement": 3 }
    },
    "GOTO": {
      "0": { "Settingupthegame": 1 }
    },
    "goto-dialog": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro8": 1 }
    },
    "goto-previous": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro8": 1 }
    },
    "GoToCharacter": {
      "0": { "Tumbleweed_movement": 4 }
    },
    "GoToCharacterEx": {
      "0": { "Tumbleweed_movement": 7 }
    },
    "gp": {
      "0": { "Globalfunctions_General": 4 }
    },
    "GP": {
      "0": { "Globalfunctions_General": 7 }
    },
    "grab": {
      "0": { "DynamicSprite": 2 }
    },
    "gradually": {
      "0": { "Character": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "grants": {
      "0": { "OOProgramming": 1 }
    },
    "Graphic": {
      "0": { "DynamicSprite": 33 },
      "1": { "Button": 16 },
      "2": { "Object": 11 },
      "3": { "InventoryItem": 7 },
      "4": { "Game": 6 },
      "5": { "ViewFrame": 4 },
      "6": { "Settingupthegame": 1 }
    },
    "graphic": {
      "0": { "Settingupthegame": 13 },
      "1": { "Mouse": 6 },
      "2": { "Object": 5 },
      "3": { "System": 4 },
      "4": { "acintro6": 3 },
      "5": { "acintro4": 2 },
      "6": { "FAQ": 1 }
    },
    "graphical": {
      "0": { "Setup": 1 }
    },
    "Graphical": {
      "0": { "GlobalVariables": 2 }
    },
    "graphics": {
      "0": { "Settingupthegame": 12 },
      "1": { "acintro6": 10 },
      "2": { "GraphicsDriver": 9 },
      "3": { "EditingGUIs": 4 },
      "4": { "Tumbleweed_translation": 3 },
      "5": { "Tumbleweed": 2 },
      "6": { "acintro5": 1 }
    },
    "Graphics": {
      "0": { "GraphicsDriver": 2 },
      "1": { "System": 1 }
    },
    "grasp": {
      "0": { "acintro9": 1 }
    },
    "grass": {
      "0": { "acintro3": 1 }
    },
    "grayscale": {
      "0": { "acintro1": 1 }
    },
    "great": {
      "0": { "ScriptingLanguage": 1 }
    },
    "greater": {
      "0": { "ScriptKeywords": 2 },
      "1": { "ScriptingTutorialPart2": 1 }
    },
    "GREEN": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Region": 1 }
    },
    "green": {
      "0": { "Character": 3 },
      "1": { "Region": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Green": {
      "0": { "Region": 1 }
    },
    "greeted": {
      "0": { "acintro1": 1 }
    },
    "Greetings": {
      "0": { "acintro8": 4 },
      "1": { "ScriptKeywords": 2 }
    },
    "Grey": {
      "0": { "Gamevariables": 1 }
    },
    "grey": {
      "0": { "Globalfunctions_Message": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Greyed": {
      "0": { "EditorView": 1 }
    },
    "greyed": {
      "0": { "acintro3": 2 }
    },
    "greys": {
      "0": { "Mouse": 1 }
    },
    "Grid": {
      "0": { "MusicAndSound": 2 },
      "1": { "acintro1": 1 }
    },
    "grid": {
      "0": { "Settingupthegame": 10 },
      "1": { "acintro3": 4 },
      "2": { "acintro6": 3 },
      "3": { "acintro7": 2 },
      "4": { "acintro5": 1 }
    },
    "grids": {
      "0": { "CustomProperties": 1 }
    },
    "grind": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "ground": {
      "0": { "Character": 1 }
    },
    "ground-level": {
      "0": { "Globalfunctions_Room": 4 },
      "1": { "Character": 1 }
    },
    "Group": {
      "0": { "Parser": 1 }
    },
    "group": {
      "0": { "ScriptKeywords": 4 },
      "1": { "Settingupthegame": 1 }
    },
    "group's": {
      "0": { "UpgradeTo350": 2 }
    },
    "grouped": {
      "0": { "UpgradeTo350": 1 }
    },
    "gSettings": {
      "0": { "GUI": 1 }
    },
    "gStatusline": {
      "0": { "GUI": 2 }
    },
    "gTextGui": {
      "0": { "TextWindowGUI": 3 }
    },
    "gTextGui's": {
      "0": { "TextWindowGUI": 1 }
    },
    "guarantee": {
      "0": { "Speech": 1 }
    },
    "guarantees": {
      "0": { "Character": 1 }
    },
    "guessed": {
      "0": { "acintro4": 1 }
    },
    "guessing": {
      "0": { "UpgradingTo27": 1 }
    },
    "GUI": {
      "0": { "GUI": 148 },
      "1": { "GUIControl": 56 },
      "2": { "EditingGUIs": 35 },
      "3": { "Globalfunctions_General": 25 },
      "4": { "Settingupthegame": 18 },
      "5": { "TemplateBASS": 10 },
      "6": { "FAQ": 9 },
      "7": { "Scripting": 8 },
      "8": { "TextScriptEvents": 7 },
      "9": { "Tumbleweed": 6 },
      "10": { "Slider": 5 },
      "11": { "Gamevariables": 4 },
      "12": { "System": 3 },
      "13": { "CustomDialogOptions": 2 },
      "14": { "UpgradeTo350": 1 }
    },
    "gui": {
      "0": { "UpgradingTo27": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "GUI's": {
      "0": { "GUI": 5 },
      "1": { "Settingupthegame": 1 }
    },
    "GUI-button": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "GUI-ID": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "gui-script": {
      "0": { "Tumbleweed_door": 1 }
    },
    "GUI-script": {
      "0": { "Tumbleweed_helper": 1 }
    },
    "GUIControl": {
      "0": { "GUIControl": 59 },
      "1": { "GUI": 9 },
      "2": { "TemplateVerbcoin": 2 },
      "3": { "TextBox": 1 }
    },
    "GUIControl's": {
      "0": { "Label": 1 }
    },
    "GUICount": {
      "0": { "Game": 4 },
      "1": { "Globalfunctions_General": 1 }
    },
    "guide": {
      "0": { "acintro": 1 }
    },
    "guides": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "GUIOff": {
      "0": { "GUI": 1 }
    },
    "GUIOn": {
      "0": { "GUI": 1 }
    },
    "GUIPopupStyle": {
      "0": { "GUI": 1 }
    },
    "GUIS": {
      "0": { "UpgradeTo30": 1 }
    },
    "guis": {
      "0": { "UpgradeTo33": 1 }
    },
    "GUIs": {
      "0": { "EditingGUIs": 15 },
      "1": { "GUI": 10 },
      "2": { "Game": 4 },
      "3": { "GUIControl": 2 },
      "4": { "InventoryItem": 1 }
    },
    "guiscript": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "guy": {
      "0": { "Character": 1 }
    },
    "Guybrush": {
      "0": { "acintro7": 1 }
    },
    "gVerbCoin": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "hack": {
      "0": { "Character": 1 }
    },
    "had": {
      "0": { "UpgradeTo30": 3 },
      "1": { "UpgradingTo27": 2 },
      "2": { "Region": 1 }
    },
    "half": {
      "0": { "Character": 1 }
    },
    "half-finished": {
      "0": { "Templates": 1 }
    },
    "halfCircle": {
      "0": { "Maths": 1 }
    },
    "halo": {
      "0": { "Character": 1 }
    },
    "halt": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "Hamlet": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "hand": {
      "0": { "ScriptingTutorialPart1": 8 },
      "1": { "Character": 4 },
      "2": { "EditorInventoryItems": 3 },
      "3": { "acintro4": 2 },
      "4": { "ScriptKeywords": 1 }
    },
    "handle": {
      "0": { "Slider": 8 },
      "1": { "Pointers": 5 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "Settingupthegame": 1 }
    },
    "Handle": {
      "0": { "EventTypes": 1 }
    },
    "handle's": {
      "0": { "EditingGUIs": 1 }
    },
    "handled": {
      "0": { "Game": 2 },
      "1": { "Tumbleweed_extensions": 1 }
    },
    "HandleGraphic": {
      "0": { "Slider": 5 }
    },
    "HandleInvArrows": {
      "0": { "Tumbleweed_helper": 3 }
    },
    "HANDLEINVCLICKS": {
      "0": { "Globalfunctions_General": 1 }
    },
    "HandleOffset": {
      "0": { "Slider": 4 }
    },
    "handler": {
      "0": { "InventoryItem": 4 },
      "1": { "Hotspot": 3 },
      "2": { "Region": 2 },
      "3": { "Parser": 1 }
    },
    "handlers": {
      "0": { "Character": 4 },
      "1": { "ScriptModules": 1 }
    },
    "Handles": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "handles": {
      "0": { "File": 1 }
    },
    "handling": {
      "0": { "Tumbleweed": 2 },
      "1": { "acintro5": 1 }
    },
    "handsome": {
      "0": { "Character": 1 }
    },
    "handy": {
      "0": { "Maths": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "handywork": {
      "0": { "BackingUpYourGame": 1 }
    },
    "hang": {
      "0": { "ScriptKeywords": 1 }
    },
    "Hansen": {
      "0": { "Credits": 1 }
    },
    "happen": {
      "0": { "acintro4": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "happened": {
      "0": { "Globalfunctions_General": 1 }
    },
    "happening": {
      "0": { "BlockingScripts": 1 }
    },
    "happens": {
      "0": { "FAQ": 4 },
      "1": { "InvWindow": 2 },
      "2": { "EventTypes": 1 }
    },
    "happy": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro6": 1 }
    },
    "hard": {
      "0": { "UpgradingTo27": 2 },
      "1": { "acintro9": 1 }
    },
    "hard-coded": {
      "0": { "Settingupthegame": 1 }
    },
    "hard-wired": {
      "0": { "Tumbleweed_helper": 1 }
    },
    "harder": {
      "0": { "Tumbleweed_door": 1 }
    },
    "hardly": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "hardware": {
      "0": { "System": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "hardware-accelerated": {
      "0": { "GraphicsDriver": 1 }
    },
    "HardwareAcceleration": {
      "0": { "System": 3 },
      "1": { "GraphicsDriver": 1 }
    },
    "Hargreaves": {
      "0": { "Credits": 1 }
    },
    "Harry": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Has": {
      "0": { "UpgradeTo32": 1 }
    },
    "has": {
      "0": { "Character": 41 },
      "1": { "Tumbleweed_movement": 22 },
      "2": { "Game": 18 },
      "3": { "Globalfunctions_General": 14 },
      "4": { "Settingupthegame": 11 },
      "5": { "Dialog": 9 },
      "6": { "MusicAndSound": 8 },
      "7": { "UpgradingTo27": 7 },
      "8": { "File": 6 },
      "9": { "TextParser": 5 },
      "10": { "System": 4 },
      "11": { "ContactingTheDevelopers": 3 },
      "12": { "CustomDialogOptions": 2 },
      "13": { "DateTime": 1 }
    },
    "HasAlphaChannel": {
      "0": { "DialogOptionsRenderingInfo": 3 },
      "1": { "UpgradeTo33": 1 }
    },
    "hasAlphaChannel": {
      "0": { "DynamicSprite": 2 }
    },
    "HasExplicitLight": {
      "0": { "Character": 1 }
    },
    "HasExplicitTint": {
      "0": { "Character": 12 },
      "1": { "Object": 9 }
    },
    "HasInputFocus": {
      "0": { "System": 5 }
    },
    "HasInventory": {
      "0": { "Character": 6 },
      "1": { "Settingupthegame": 1 }
    },
    "hasn't": {
      "0": { "Tumbleweed_movement": 2 },
      "1": { "Tumbleweed_unhandled": 1 }
    },
    "HasOptionBeenChosen": {
      "0": { "Dialog": 6 }
    },
    "HasPlayerBeenInRoom": {
      "0": { "Globalfunctions_Room": 4 }
    },
    "Have": {
      "0": { "UpgradingTo27": 1 }
    },
    "have": {
      "0": { "Settingupthegame": 33 },
      "1": { "Character": 24 },
      "2": { "Globalfunctions_General": 18 },
      "3": { "Tumbleweed": 11 },
      "4": { "UpgradingTo27": 10 },
      "5": { "DistGame": 9 },
      "6": { "ScriptingTutorialPart2": 8 },
      "7": { "UpgradeTo32": 7 },
      "8": { "UpgradeTo30": 6 },
      "9": { "FAQ": 5 },
      "10": { "IntegrationWithWindows": 4 },
      "11": { "Viewport": 3 },
      "12": { "UpgradeTo341": 2 },
      "13": { "DateTime": 1 }
    },
    "haven't": {
      "0": { "acintro2": 1 }
    },
    "having": {
      "0": { "UpgradingTo27": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "Having": {
      "0": { "acintro1": 1 }
    },
    "haystack": {
      "0": { "String": 3 }
    },
    "hBrownTree": {
      "0": { "Hotspot": 2 }
    },
    "hcos": {
      "0": { "Maths": 2 }
    },
    "hDoor": {
      "0": { "Hotspot": 7 },
      "1": { "ScriptingTutorialPart1": 3 },
      "2": { "Pointers": 2 },
      "3": { "Tumbleweed_door": 1 }
    },
    "hDoor's": {
      "0": { "Hotspot": 1 }
    },
    "he": {
      "0": { "Character": 25 },
      "1": { "Settingupthegame": 4 },
      "2": { "FAQ": 3 },
      "3": { "ScriptKeywords": 2 },
      "4": { "Tumbleweed_unhandled": 1 }
    },
    "He": {
      "0": { "Tumbleweed_unhandled": 1 }
    },
    "he'll": {
      "0": { "acintro1": 1 }
    },
    "he's": {
      "0": { "acintro7": 1 }
    },
    "head": {
      "0": { "Character": 6 },
      "1": { "Settingupthegame": 2 },
      "2": { "Speech": 1 }
    },
    "headache": {
      "0": { "TextParser": 1 }
    },
    "header": {
      "0": { "ScriptKeywords": 8 },
      "1": { "TheScriptHeader": 4 },
      "2": { "OOProgramming": 3 },
      "3": { "ExtenderFunctions": 2 },
      "4": { "StandardEnums": 1 }
    },
    "Header": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "heads": {
      "0": { "MusicAndSound": 1 }
    },
    "health": {
      "0": { "ScriptKeywords": 7 },
      "1": { "String": 2 },
      "2": { "GlobalVariables": 1 }
    },
    "Health": {
      "0": { "ScriptKeywords": 3 },
      "1": { "DynamicArrays": 1 }
    },
    "hear": {
      "0": { "Pointers": 1 }
    },
    "heard": {
      "0": { "MusicAndSound": 1 }
    },
    "heavy": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "heavyweight": {
      "0": { "SourceControl": 1 }
    },
    "Hebrew": {
      "0": { "Settingupthegame": 1 }
    },
    "height": {
      "0": { "DynamicSprite": 21 },
      "1": { "Globalfunctions_General": 9 },
      "2": { "GUI": 5 },
      "3": { "System": 4 },
      "4": { "InvWindow": 3 },
      "5": { "Game": 2 },
      "6": { "Globalfunctions_Room": 1 }
    },
    "HEIGHT": {
      "0": { "DynamicSprite": 4 },
      "1": { "GUIControl": 1 }
    },
    "Height": {
      "0": { "DynamicSprite": 16 },
      "1": { "DialogOptionsRenderingInfo": 13 },
      "2": { "System": 11 },
      "3": { "Viewport": 7 },
      "4": { "DrawingSurfaceFunctions": 6 },
      "5": { "GUIControl": 5 },
      "6": { "CustomDialogOptions": 3 },
      "7": { "Screen": 2 },
      "8": { "Game": 1 }
    },
    "held": {
      "0": { "Copyright": 2 }
    },
    "Hell": {
      "0": { "String": 2 }
    },
    "hello": {
      "0": { "String": 6 }
    },
    "Hello": {
      "0": { "String": 15 },
      "1": { "Settingupthegame": 7 },
      "2": { "Globalfunctions_General": 3 },
      "3": { "ScriptKeywords": 2 },
      "4": { "acintro8": 1 }
    },
    "HelloWorld": {
      "0": { "UpgradingTo271": 1 }
    },
    "help": {
      "0": { "UpgradingTo27": 5 },
      "1": { "ContactingTheDevelopers": 4 },
      "2": { "TroubleshootingWindowsZoneID": 3 },
      "3": { "AudioClip": 2 },
      "4": { "UpgradeTo350": 1 }
    },
    "Help": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "helped": {
      "0": { "acintro9": 1 }
    },
    "Helper": {
      "0": { "Tumbleweed": 1 }
    },
    "helper": {
      "0": { "Tumbleweed_helper": 1 }
    },
    "HELPING": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "helps": {
      "0": { "BlockingScripts": 1 }
    },
    "Hemlo": {
      "0": { "String": 1 }
    },
    "hence": {
      "0": { "UpgradeTo34": 1 }
    },
    "Hence": {
      "0": { "Overlay": 1 }
    },
    "here": {
      "0": { "Globalfunctions_General": 8 },
      "1": { "Settingupthegame": 7 },
      "2": { "acintro4": 4 },
      "3": { "ScriptKeywords": 3 },
      "4": { "ScriptingTutorialPart2": 2 },
      "5": { "acintro5": 1 }
    },
    "Here": {
      "0": { "Settingupthegame": 8 },
      "1": { "Setup": 4 },
      "2": { "MusicAndSound": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "Here's": {
      "0": { "acintro8": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "here's": {
      "0": { "UpgradingTo27": 1 }
    },
    "hero": {
      "0": { "Character": 2 }
    },
    "hExit": {
      "0": { "Tumbleweed": 1 }
    },
    "hExitDoor": {
      "0": { "FAQ": 1 }
    },
    "Hey": {
      "0": { "Character": 1 }
    },
    "Hi": {
      "0": { "MusicAndSound": 3 },
      "1": { "Game": 2 }
    },
    "hi-color": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro1": 1 }
    },
    "hi-colour": {
      "0": { "Settingupthegame": 5 },
      "1": { "Character": 3 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "Region": 1 }
    },
    "Hi-colour": {
      "0": { "Credits": 1 }
    },
    "hi-res": {
      "0": { "UpgradeTo31": 7 }
    },
    "hi-score": {
      "0": { "Settingupthegame": 1 }
    },
    "hidden": {
      "0": { "ListBox": 4 },
      "1": { "GUI": 2 },
      "2": { "UpgradeTo350": 1 }
    },
    "Hidden": {
      "0": { "Viewport": 1 }
    },
    "hide": {
      "0": { "ListBox": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "HideBorder": {
      "0": { "ListBox": 3 }
    },
    "HideMouseCursor": {
      "0": { "Mouse": 1 }
    },
    "hides": {
      "0": { "Mouse": 1 }
    },
    "HideScrollArrows": {
      "0": { "ListBox": 3 }
    },
    "hiding": {
      "0": { "Mouse": 1 }
    },
    "high": {
      "0": { "Object": 3 },
      "1": { "UpgradeTo350": 2 },
      "2": { "GUIControl": 1 }
    },
    "high-colour": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "high-res": {
      "0": { "UpgradeTo350": 7 },
      "1": { "Settingupthegame": 2 }
    },
    "high-resolution": {
      "0": { "Setup": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "Higher": {
      "0": { "acintro1": 1 }
    },
    "higher": {
      "0": { "MusicAndSound": 4 },
      "1": { "System": 3 },
      "2": { "SystemRequirements": 2 },
      "3": { "GraphicsDriver": 1 }
    },
    "highest": {
      "0": { "Dialog": 5 },
      "1": { "GUIControl": 1 }
    },
    "Highest": {
      "0": { "Settingupthegame": 2 },
      "1": { "UpgradeTo341": 1 }
    },
    "highlight": {
      "0": { "ListBox": 1 }
    },
    "highlighted": {
      "0": { "Tumbleweed_translation": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "highly": {
      "0": { "acintro1": 1 }
    },
    "him": {
      "0": { "Character": 9 },
      "1": { "acintro8": 4 },
      "2": { "Settingupthegame": 3 },
      "3": { "acintro1": 1 }
    },
    "himself": {
      "0": { "acintro8": 1 }
    },
    "hint": {
      "0": { "Globalfunctions_General": 1 }
    },
    "his": {
      "0": { "Character": 31 },
      "1": { "EditorInventoryItems": 3 },
      "2": { "acintro4": 2 },
      "3": { "Settingupthegame": 1 }
    },
    "historical": {
      "0": { "ScriptKeywords": 1 }
    },
    "Historically": {
      "0": { "System": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "hit": {
      "0": { "Character": 1 }
    },
    "hits": {
      "0": { "Character": 1 }
    },
    "hitting": {
      "0": { "Character": 1 }
    },
    "Hmm": {
      "0": { "UpgradingTo27": 1 }
    },
    "Hobo": {
      "0": { "Credits": 1 }
    },
    "Hodgson": {
      "0": { "Credits": 1 }
    },
    "hold": {
      "0": { "Button": 3 },
      "1": { "Pointers": 1 }
    },
    "holding": {
      "0": { "Tumbleweed_door": 1 }
    },
    "holds": {
      "0": { "Globalfunctions_General": 1 }
    },
    "hologram": {
      "0": { "Character": 1 }
    },
    "home": {
      "0": { "Character": 1 }
    },
    "HOME": {
      "0": { "Game": 1 }
    },
    "Home": {
      "0": { "ASCIIcodes": 1 }
    },
    "hope": {
      "0": { "acintro9": 1 }
    },
    "Hopefully": {
      "0": { "Pointers": 1 }
    },
    "hopefully": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "horizontal": {
      "0": { "EditingGUIs": 3 },
      "1": { "Lipsync": 2 },
      "2": { "Speech": 1 }
    },
    "horizontal-flip": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "HorizontalAlignment": {
      "0": { "StandardEnums": 2 },
      "1": { "ListBox": 1 }
    },
    "HorizontalAlignment's": {
      "0": { "StandardEnums": 1 }
    },
    "horizontally": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "hotkey": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "hotkeys": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "hotspot": {
      "0": { "Hotspot": 40 },
      "1": { "acintro3": 19 },
      "2": { "EventTypes": 15 },
      "3": { "Pointers": 10 },
      "4": { "Settingupthegame": 9 },
      "5": { "Mouse": 6 },
      "6": { "ScriptingTutorialPart1": 4 },
      "7": { "EditorInventoryItems": 3 },
      "8": { "CustomProperties": 2 },
      "9": { "TemplateVerbcoin": 1 }
    },
    "Hotspot": {
      "0": { "Hotspot": 39 },
      "1": { "Pointers": 7 },
      "2": { "Globalfunctions_Room": 5 },
      "3": { "Region": 4 },
      "4": { "acintro3": 3 },
      "5": { "Scripting": 2 },
      "6": { "EventTypes": 1 }
    },
    "HOTSPOT": {
      "0": { "Hotspot": 1 }
    },
    "hotspot's": {
      "0": { "Hotspot": 3 },
      "1": { "acintro3": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "HOTSPOTS": {
      "0": { "ScriptKeywords": 1 }
    },
    "Hotspots": {
      "0": { "acintro3": 5 },
      "1": { "Tumbleweed_extensions": 2 },
      "2": { "Pointers": 1 }
    },
    "hotspots": {
      "0": { "acintro3": 6 },
      "1": { "UpgradeTo350": 4 },
      "2": { "acintro5": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "HotspotX": {
      "0": { "EditorInventoryItems": 2 }
    },
    "HotspotY": {
      "0": { "EditorInventoryItems": 2 }
    },
    "hour": {
      "0": { "DateTime": 2 }
    },
    "Hour": {
      "0": { "DateTime": 4 }
    },
    "hours": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "house": {
      "0": { "Globalfunctions_Message": 2 }
    },
    "hovering": {
      "0": { "ListBox": 2 },
      "1": { "DialogOptionsRenderingInfo": 1 }
    },
    "How": {
      "0": { "MusicAndSound": 4 },
      "1": { "Settingupthegame": 3 },
      "2": { "UpgradeTo32": 2 },
      "3": { "CustomProperties": 1 }
    },
    "how": {
      "0": { "Character": 9 },
      "1": { "Settingupthegame": 8 },
      "2": { "ScriptingTutorialPart2": 6 },
      "3": { "Globalfunctions_Screen": 4 },
      "4": { "ScriptingTutorialPart1": 3 },
      "5": { "DynamicArrays": 2 },
      "6": { "CustomProperties": 1 }
    },
    "however": {
      "0": { "Settingupthegame": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "acintro8": 1 }
    },
    "However": {
      "0": { "Settingupthegame": 7 },
      "1": { "ScriptKeywords": 3 },
      "2": { "AdvancedRoomFeatures": 2 },
      "3": { "Debuggingfeatures": 1 }
    },
    "hPressurePlate": {
      "0": { "Hotspot": 2 }
    },
    "Hqx": {
      "0": { "Setup": 1 }
    },
    "hs": {
      "0": { "Pointers": 3 }
    },
    "hsine": {
      "0": { "Maths": 2 }
    },
    "hTable": {
      "0": { "Hotspot": 5 }
    },
    "hTable's": {
      "0": { "Hotspot": 2 }
    },
    "htan": {
      "0": { "Maths": 2 }
    },
    "hTree": {
      "0": { "UpgradingTo27": 1 }
    },
    "http": {
      "0": { "Credits": 1 }
    },
    "https": {
      "0": { "Credits": 6 },
      "1": { "DistGame": 2 },
      "2": { "MusicAndSound": 1 }
    },
    "hundred": {
      "0": { "SystemLimits": 1 }
    },
    "hung": {
      "0": { "ScriptKeywords": 1 }
    },
    "hunger": {
      "0": { "RepExec": 2 }
    },
    "hungerTimer": {
      "0": { "RepExec": 2 }
    },
    "hungry": {
      "0": { "Tumbleweed_unhandled": 1 }
    },
    "hyperbolic": {
      "0": { "Maths": 6 }
    },
    "Hz": {
      "0": { "Setup": 2 }
    },
    "I'd": {
      "0": { "Tumbleweed": 1 }
    },
    "I'll": {
      "0": { "acintro8": 2 },
      "1": { "acintro7": 1 }
    },
    "I'm": {
      "0": { "MusicAndSound": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "acintro2": 1 }
    },
    "I've": {
      "0": { "acintro2": 5 },
      "1": { "acintro4": 2 },
      "2": { "acintro5": 1 }
    },
    "iBall": {
      "0": { "ScriptKeywords": 2 }
    },
    "iCash": {
      "0": { "Character": 2 }
    },
    "iChainsaw": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "ico": {
      "0": { "Templates": 2 },
      "1": { "DistGame": 1 }
    },
    "ICO": {
      "0": { "DistGame": 2 }
    },
    "icon": {
      "0": { "DistGame": 6 },
      "1": { "Templates": 4 },
      "2": { "EditorRoom": 3 },
      "3": { "EventTypes": 2 },
      "4": { "Globalfunctions_General": 1 }
    },
    "Icon": {
      "0": { "DistGame": 1 }
    },
    "icon-bar": {
      "0": { "EditingGUIs": 1 }
    },
    "ICONBAR": {
      "0": { "GUI": 3 },
      "1": { "GUIControl": 1 }
    },
    "icons": {
      "0": { "Credits": 1 }
    },
    "iCup": {
      "0": { "Tumbleweed": 4 }
    },
    "ID": {
      "0": { "GUIControl": 10 },
      "1": { "GUI": 7 },
      "2": { "Character": 6 },
      "3": { "InventoryItem": 5 },
      "4": { "Region": 4 },
      "5": { "EditorInventoryItems": 3 },
      "6": { "ScriptKeywords": 2 },
      "7": { "acintro5": 1 }
    },
    "id": {
      "0": { "Tumbleweed_door": 13 },
      "1": { "Globalfunctions_General": 2 }
    },
    "IDE": {
      "0": { "Introduction": 1 }
    },
    "idea": {
      "0": { "Pointers": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "ideal": {
      "0": { "RepExec": 1 }
    },
    "ideally": {
      "0": { "Globalfunctions_General": 1 }
    },
    "identical": {
      "0": { "Character": 4 },
      "1": { "UpgradingTo27": 2 },
      "2": { "Game": 1 }
    },
    "Identical": {
      "0": { "Globalfunctions_Message": 3 }
    },
    "identically": {
      "0": { "AudioClip": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "identifier": {
      "0": { "EditorSprite": 1 }
    },
    "Identifier": {
      "0": { "TroubleshootingWindowsZoneID": 8 },
      "1": { "Plugins": 2 }
    },
    "identify": {
      "0": { "acintro7": 1 }
    },
    "identifying": {
      "0": { "Pointers": 1 }
    },
    "Idle": {
      "0": { "Character": 1 }
    },
    "idle": {
      "0": { "Character": 14 },
      "1": { "Settingupthegame": 3 },
      "2": { "BlockingScripts": 2 },
      "3": { "EditorView": 1 }
    },
    "idleview": {
      "0": { "Character": 1 }
    },
    "IDLEVIEW": {
      "0": { "Character": 2 }
    },
    "IdleView": {
      "0": { "Character": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "iDoorKey": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "IDs": {
      "0": { "Parser": 1 }
    },
    "if-clause": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "ifdef": {
      "0": { "Preprocessor": 3 },
      "1": { "ScriptKeywords": 2 }
    },
    "iFirstItem": {
      "0": { "ScriptingTutorialPart2": 2 }
    },
    "ifndef": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Preprocessor": 1 }
    },
    "ifnver": {
      "0": { "Preprocessor": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "ifver": {
      "0": { "Preprocessor": 4 },
      "1": { "ScriptKeywords": 3 }
    },
    "IFVER": {
      "0": { "ScriptKeywords": 1 }
    },
    "Ignore": {
      "0": { "Parser": 1 }
    },
    "ignore": {
      "0": { "Character": 6 },
      "1": { "TextParser": 4 },
      "2": { "ScriptingTutorialPart1": 2 },
      "3": { "Globalfunctions_General": 1 }
    },
    "ignored": {
      "0": { "GUI": 5 },
      "1": { "Game": 4 },
      "2": { "DialogOptionsRenderingInfo": 3 },
      "3": { "Speech": 2 },
      "4": { "Preprocessor": 1 }
    },
    "IgnoreLighting": {
      "0": { "Character": 3 }
    },
    "ignores": {
      "0": { "Globalfunctions_General": 1 }
    },
    "IgnoreScaling": {
      "0": { "Object": 3 },
      "1": { "Character": 1 }
    },
    "IgnoreUserInputAfterTextTimeoutMs": {
      "0": { "Game": 4 },
      "1": { "Speech": 1 }
    },
    "IgnoreWalkbehinds": {
      "0": { "Character": 2 }
    },
    "ignoring": {
      "0": { "Character": 1 }
    },
    "iInvItem": {
      "0": { "EditorInventoryItems": 2 }
    },
    "iKey": {
      "0": { "Character": 7 },
      "1": { "InventoryItem": 3 },
      "2": { "ScriptKeywords": 2 },
      "3": { "Tumbleweed": 1 }
    },
    "iKeyring": {
      "0": { "InventoryItem": 1 }
    },
    "illusion": {
      "0": { "acintro7": 1 }
    },
    "image": {
      "0": { "DynamicSprite": 42 },
      "1": { "Button": 15 },
      "2": { "EditorInventoryItems": 11 },
      "3": { "acintro6": 10 },
      "4": { "Object": 6 },
      "5": { "acintro2": 5 },
      "6": { "acintro4": 4 },
      "7": { "UpgradeTo350": 3 },
      "8": { "EditorSprite": 2 },
      "9": { "Mouse": 1 }
    },
    "Image": {
      "0": { "EditorInventoryItems": 3 },
      "1": { "acintro4": 2 },
      "2": { "EditorView": 1 }
    },
    "image's": {
      "0": { "acintro6": 1 }
    },
    "imagemagick": {
      "0": { "Credits": 1 }
    },
    "images": {
      "0": { "acintro7": 3 },
      "1": { "EditorSprite": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "immediate": {
      "0": { "ScriptKeywords": 1 }
    },
    "immediately": {
      "0": { "Character": 16 },
      "1": { "Globalfunctions_General": 7 },
      "2": { "ScriptKeywords": 2 },
      "3": { "DialogOptionsRenderingInfo": 1 }
    },
    "Immediately": {
      "0": { "ScriptKeywords": 1 }
    },
    "impact": {
      "0": { "Overlay": 1 }
    },
    "implement": {
      "0": { "CustomDialogOptions": 2 },
      "1": { "Dialog": 1 }
    },
    "implementation": {
      "0": { "Screen": 1 }
    },
    "implemented": {
      "0": { "Globalfunctions_General": 1 }
    },
    "implementing": {
      "0": { "ScriptKeywords": 1 }
    },
    "implements": {
      "0": { "Tumbleweed_door": 1 }
    },
    "implications": {
      "0": { "acintro9": 1 }
    },
    "implicit": {
      "0": { "Maths": 2 }
    },
    "implicitly": {
      "0": { "ListBox": 1 }
    },
    "IMPLIED": {
      "0": { "Copyright": 1 }
    },
    "import": {
      "0": { "ScriptKeywords": 22 },
      "1": { "Settingupthegame": 19 },
      "2": { "OOProgramming": 17 },
      "3": { "acintro6": 14 },
      "4": { "EditorSprite": 6 },
      "5": { "AdvancedRoomFeatures": 5 },
      "6": { "MusicAndSound": 4 },
      "7": { "ExtenderFunctions": 3 },
      "8": { "acintro4": 2 },
      "9": { "UpgradeTo30": 1 }
    },
    "Import": {
      "0": { "EditorSprite": 6 },
      "1": { "AdvancedRoomFeatures": 2 },
      "2": { "acintro9": 1 }
    },
    "importance": {
      "0": { "Setup": 1 }
    },
    "IMPORTANT": {
      "0": { "DynamicSprite": 14 },
      "1": { "Game": 3 },
      "2": { "Viewport": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "important": {
      "0": { "ScriptingTutorialPart1": 3 },
      "1": { "MusicAndSound": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "importantly": {
      "0": { "MusicAndSound": 1 }
    },
    "imported": {
      "0": { "Settingupthegame": 6 },
      "1": { "acintro6": 5 },
      "2": { "EditorSprite": 2 },
      "3": { "UpgradeTo33": 1 }
    },
    "Imported": {
      "0": { "UpgradeTo350": 1 }
    },
    "importing": {
      "0": { "Settingupthegame": 5 },
      "1": { "UpgradeTo350": 2 },
      "2": { "EditorSprite": 1 }
    },
    "Importing": {
      "0": { "MusicAndSound": 1 }
    },
    "imports": {
      "0": { "ScriptKeywords": 1 }
    },
    "impose": {
      "0": { "GUI": 1 }
    },
    "imposes": {
      "0": { "acintro4": 1 }
    },
    "impossible": {
      "0": { "UpgradeTo350": 1 }
    },
    "improve": {
      "0": { "UpgradeTo341": 1 }
    },
    "improved": {
      "0": { "acintro9": 1 }
    },
    "improvement": {
      "0": { "UpgradingTo27": 1 }
    },
    "improves": {
      "0": { "acintro1": 1 }
    },
    "In-game": {
      "0": { "EditingGUIs": 1 }
    },
    "in-game": {
      "0": { "Settingupthegame": 2 },
      "1": { "Speech": 1 }
    },
    "inaccurate": {
      "0": { "Lipsync": 1 }
    },
    "inactivity": {
      "0": { "Character": 1 }
    },
    "Inactivity": {
      "0": { "Character": 1 }
    },
    "inappropriate": {
      "0": { "GUIControl": 1 }
    },
    "Inc": {
      "0": { "Tumbleweed": 1 }
    },
    "INCIDENTAL": {
      "0": { "Copyright": 1 }
    },
    "include": {
      "0": { "Templates": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "included": {
      "0": { "System": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "includes": {
      "0": { "UpgradeTo350": 1 }
    },
    "including": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "Tumbleweed": 1 }
    },
    "INCLUDING": {
      "0": { "Copyright": 1 }
    },
    "inclusive": {
      "0": { "Globalfunctions_General": 1 }
    },
    "incomplete": {
      "0": { "Templates": 1 }
    },
    "inconsistencies": {
      "0": { "acintro1": 1 }
    },
    "inconsistent": {
      "0": { "Globalfunctions_General": 1 }
    },
    "inconvenience": {
      "0": { "UpgradingTo271": 1 }
    },
    "inconveniences": {
      "0": { "UpgradeTo350": 1 }
    },
    "incorporated": {
      "0": { "Copyright": 1 }
    },
    "incorrect": {
      "0": { "File": 1 }
    },
    "increase": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "SystemLimits": 1 }
    },
    "increased": {
      "0": { "UpgradeTo33": 1 }
    },
    "increases": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "increasing": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "incredibly": {
      "0": { "acintro1": 1 }
    },
    "increment": {
      "0": { "RepExec": 1 }
    },
    "indeed": {
      "0": { "ScriptKeywords": 1 }
    },
    "indent": {
      "0": { "Settingupthegame": 1 }
    },
    "Indent": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "indented": {
      "0": { "Settingupthegame": 1 }
    },
    "Indented": {
      "0": { "Settingupthegame": 1 }
    },
    "indenting": {
      "0": { "Settingupthegame": 1 }
    },
    "INDEX": {
      "0": { "String": 2 },
      "1": { "ListBox": 1 }
    },
    "index": {
      "0": { "ListBox": 16 },
      "1": { "OOProgramming": 11 },
      "2": { "Game": 7 },
      "3": { "GUI": 4 },
      "4": { "ScriptKeywords": 3 },
      "5": { "Dictionary": 2 },
      "6": { "Camera": 1 }
    },
    "Index": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "indexed": {
      "0": { "EditorRoom": 1 }
    },
    "Indexes": {
      "0": { "ListBox": 1 }
    },
    "indexes": {
      "0": { "ListBox": 3 },
      "1": { "Globalfunctions_Palette": 2 },
      "2": { "Screen": 1 }
    },
    "IndexOf": {
      "0": { "String": 5 }
    },
    "indicate": {
      "0": { "TroubleshootingWindowsZoneID": 3 },
      "1": { "TextScriptEvents": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "indicated": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "indicates": {
      "0": { "Button": 2 },
      "1": { "Pointers": 1 }
    },
    "INDIRECT": {
      "0": { "Copyright": 1 }
    },
    "individual": {
      "0": { "Object": 6 },
      "1": { "Settingupthegame": 3 },
      "2": { "MusicAndSound": 2 },
      "3": { "GUIControl": 1 }
    },
    "individually": {
      "0": { "UpgradeTo32": 1 }
    },
    "inexperienced": {
      "0": { "UpgradeTo350": 1 }
    },
    "infinite": {
      "0": { "Maths": 1 }
    },
    "info": {
      "0": { "CustomDialogOptions": 65 },
      "1": { "DialogOptionsRenderingInfo": 44 },
      "2": { "Settingupthegame": 1 }
    },
    "information": {
      "0": { "Settingupthegame": 6 },
      "1": { "Globalfunctions_Message": 4 },
      "2": { "ScriptKeywords": 3 },
      "3": { "TextScriptEvents": 2 },
      "4": { "EventTypes": 1 }
    },
    "informing": {
      "0": { "acintro4": 1 }
    },
    "infringe": {
      "0": { "Copyright": 1 }
    },
    "inherit": {
      "0": { "MusicAndSound": 1 }
    },
    "Inherited": {
      "0": { "GUIControl": 14 }
    },
    "inherits": {
      "0": { "Label": 1 }
    },
    "InitGuiLanguage": {
      "0": { "Tumbleweed_helper": 3 }
    },
    "initial": {
      "0": { "EditorCharacter": 1 }
    },
    "Initialization": {
      "0": { "ScriptKeywords": 1 }
    },
    "initialization": {
      "0": { "ScriptKeywords": 6 }
    },
    "initialize": {
      "0": { "ScriptKeywords": 1 }
    },
    "initialized": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "initializing": {
      "0": { "ScriptKeywords": 1 }
    },
    "initially": {
      "0": { "EditingGUIs": 2 },
      "1": { "GUI": 1 }
    },
    "Initially": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "initiate": {
      "0": { "acintro8": 2 }
    },
    "InitObject": {
      "0": { "Tumbleweed_door": 7 }
    },
    "inner": {
      "0": { "ScriptKeywords": 1 }
    },
    "input": {
      "0": { "File": 24 },
      "1": { "Globalfunctions_General": 8 },
      "2": { "Parser": 5 },
      "3": { "Game": 4 },
      "4": { "ListBox": 3 },
      "5": { "Settingupthegame": 2 },
      "6": { "GUIControl": 1 }
    },
    "InputBox": {
      "0": { "Game": 4 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "String": 2 },
      "3": { "TextParser": 1 }
    },
    "insensitive": {
      "0": { "Dictionary": 2 },
      "1": { "Set": 1 }
    },
    "InSeperateVOX": {
      "0": { "DistGame": 1 }
    },
    "Insert": {
      "0": { "EditorView": 2 },
      "1": { "ASCIIcodes": 1 }
    },
    "insert": {
      "0": { "Character": 3 },
      "1": { "Overlay": 2 },
      "2": { "StringFormats": 1 }
    },
    "inserted": {
      "0": { "ListBox": 2 },
      "1": { "acintro8": 1 }
    },
    "InsertItemAt": {
      "0": { "ListBox": 4 }
    },
    "Inserts": {
      "0": { "ListBox": 1 }
    },
    "Inside": {
      "0": { "Tumbleweed": 1 }
    },
    "inside": {
      "0": { "ScriptKeywords": 7 },
      "1": { "ScriptingTutorialPart1": 5 },
      "2": { "DialogOptionsRenderingInfo": 3 },
      "3": { "Tumbleweed": 2 },
      "4": { "TroubleshootingWindowsZoneID": 1 }
    },
    "InSkippableCutscene": {
      "0": { "Globalfunctions_General": 4 }
    },
    "inspecting": {
      "0": { "DynamicSprite": 1 }
    },
    "install": {
      "0": { "UpgradeTo335": 1 }
    },
    "install-time": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "installation": {
      "0": { "UpgradeTo335": 5 },
      "1": { "File": 2 },
      "2": { "IntegrationWithWindows": 1 }
    },
    "INSTALLDIR": {
      "0": { "File": 3 },
      "1": { "ListBox": 1 }
    },
    "installed": {
      "0": { "GraphicsDriver": 2 },
      "1": { "SourceControl": 1 }
    },
    "installer": {
      "0": { "IntegrationWithWindows": 4 },
      "1": { "TroubleshootingWindowsZoneID": 1 }
    },
    "instance": {
      "0": { "DynamicSprite": 11 },
      "1": { "ScriptingTutorialPart1": 6 },
      "2": { "Game": 4 },
      "3": { "Pointers": 2 },
      "4": { "Screen": 1 }
    },
    "instance-based": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "instances": {
      "0": { "Pointers": 1 }
    },
    "Instances": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "instant": {
      "0": { "Gamevariables": 1 }
    },
    "Instant": {
      "0": { "Gamevariables": 1 }
    },
    "instantly": {
      "0": { "Character": 2 },
      "1": { "acintro7": 1 }
    },
    "Instead": {
      "0": { "Region": 1 }
    },
    "instead": {
      "0": { "Globalfunctions_General": 13 },
      "1": { "Character": 9 },
      "2": { "Settingupthegame": 6 },
      "3": { "Globalfunctions_Room": 5 },
      "4": { "System": 4 },
      "5": { "Tumbleweed": 3 },
      "6": { "UpgradeTo30": 2 },
      "7": { "GUIControl": 1 }
    },
    "instructions": {
      "0": { "Tumbleweed": 1 }
    },
    "int": {
      "0": { "Character": 85 },
      "1": { "Globalfunctions_General": 55 },
      "2": { "DrawingSurfaceFunctions": 43 },
      "3": { "DynamicSprite": 40 },
      "4": { "Object": 39 },
      "5": { "ScriptKeywords": 38 },
      "6": { "Tumbleweed_movement": 32 },
      "7": { "OOProgramming": 31 },
      "8": { "Globalfunctions_Room": 26 },
      "9": { "Tumbleweed_door": 24 },
      "10": { "GUI": 22 },
      "11": { "ListBox": 17 },
      "12": { "Mouse": 16 },
      "13": { "Viewport": 15 },
      "14": { "Room": 14 },
      "15": { "Globalfunctions_Screen": 13 },
      "16": { "Tumbleweed_helper": 12 },
      "17": { "Overlay": 11 },
      "18": { "Dialog": 10 },
      "19": { "CustomDialogOptions": 9 },
      "20": { "DateTime": 8 },
      "21": { "InventoryItem": 7 },
      "22": { "Globalfunctions_Palette": 6 },
      "23": { "ExtenderFunctions": 5 },
      "24": { "Tumbleweed_actions": 4 },
      "25": { "DynamicArrays": 3 },
      "26": { "Maths": 2 },
      "27": { "Tumbleweed_unhandled": 1 }
    },
    "Integer": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Region": 1 }
    },
    "integer": {
      "0": { "File": 6 },
      "1": { "ScriptKeywords": 5 },
      "2": { "Maths": 4 },
      "3": { "String": 2 },
      "4": { "EditorSprite": 1 }
    },
    "Integers": {
      "0": { "SystemLimits": 1 }
    },
    "integers": {
      "0": { "File": 1 }
    },
    "integrate": {
      "0": { "SourceControl": 2 }
    },
    "Integration": {
      "0": { "IntegrationWithWindows": 2 },
      "1": { "OtherFeatures": 1 }
    },
    "integration": {
      "0": { "IntegrationWithWindows": 4 },
      "1": { "Settingupthegame": 2 },
      "2": { "OtherFeatures": 1 }
    },
    "Intel": {
      "0": { "Copyright": 1 }
    },
    "intended": {
      "0": { "Character": 2 },
      "1": { "File": 1 }
    },
    "intentionally": {
      "0": { "Settingupthegame": 1 }
    },
    "inter-operating": {
      "0": { "AudioChannel": 1 }
    },
    "interact": {
      "0": { "acintro3": 3 },
      "1": { "acintro9": 2 },
      "2": { "EventTypes": 1 }
    },
    "Interact": {
      "0": { "EventTypes": 8 },
      "1": { "TextScriptEvents": 5 },
      "2": { "Tumbleweed": 3 },
      "3": { "Settingupthegame": 2 },
      "4": { "ScriptModules": 1 }
    },
    "interactable": {
      "0": { "Globalfunctions_General": 1 }
    },
    "interacted": {
      "0": { "Game": 1 }
    },
    "interacting": {
      "0": { "FAQ": 1 }
    },
    "interaction": {
      "0": { "Globalfunctions_General": 7 },
      "1": { "UpgradeTo30": 2 },
      "2": { "acintro2": 1 }
    },
    "Interaction": {
      "0": { "UpgradeTo30": 2 }
    },
    "interactions": {
      "0": { "UpgradeTo30": 3 },
      "1": { "acintro": 1 }
    },
    "Interactions": {
      "0": { "acintro3": 1 }
    },
    "interactivity": {
      "0": { "EditingGUIs": 1 }
    },
    "interacts": {
      "0": { "Settingupthegame": 1 }
    },
    "intercept": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "interest": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "interested": {
      "0": { "acintro2": 1 }
    },
    "interesting": {
      "0": { "EditorSprite": 1 }
    },
    "Interface": {
      "0": { "EditingGUIs": 1 }
    },
    "interface": {
      "0": { "Globalfunctions_General": 11 },
      "1": { "TemplateVerbcoin": 7 },
      "2": { "EditingGUIs": 5 },
      "3": { "GUI": 4 },
      "4": { "acintro3": 2 },
      "5": { "Globalfunctions_Message": 1 }
    },
    "INTERFACE": {
      "0": { "TextScriptEvents": 1 }
    },
    "InterfaceGui": {
      "0": { "TemplateVerbcoin": 3 }
    },
    "interfaceName": {
      "0": { "FAQ": 1 }
    },
    "InterfaceOff": {
      "0": { "GUI": 1 }
    },
    "InterfaceOn": {
      "0": { "GUI": 1 }
    },
    "interfaces": {
      "0": { "EditingGUIs": 1 }
    },
    "interfere": {
      "0": { "Speech": 1 }
    },
    "interference": {
      "0": { "Globalfunctions_General": 1 }
    },
    "intermittent": {
      "0": { "Settingupthegame": 1 }
    },
    "intermittently": {
      "0": { "Settingupthegame": 1 }
    },
    "internal": {
      "0": { "EditorInventoryItems": 1 }
    },
    "internally": {
      "0": { "UpgradeTo335": 1 }
    },
    "international": {
      "0": { "Translations": 1 }
    },
    "Internet": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "internet": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro9": 1 }
    },
    "interoperate": {
      "0": { "GUI": 2 },
      "1": { "GUIControl": 1 }
    },
    "interpolate": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "interpret": {
      "0": { "Settingupthegame": 1 }
    },
    "interpreted": {
      "0": { "Globalfunctions_General": 1 }
    },
    "interpreter": {
      "0": { "EventTypes": 1 }
    },
    "interrupt": {
      "0": { "AudioClip": 3 },
      "1": { "Game": 1 }
    },
    "interrupted": {
      "0": { "Globalfunctions_General": 3 }
    },
    "interrupts": {
      "0": { "MusicAndSound": 1 }
    },
    "intersperse": {
      "0": { "StringFormats": 1 }
    },
    "interval": {
      "0": { "Character": 2 }
    },
    "intervals": {
      "0": { "Settingupthegame": 1 }
    },
    "intimidating": {
      "0": { "acintro3": 1 }
    },
    "Intro": {
      "0": { "Multimedia": 1 }
    },
    "intro": {
      "0": { "Globalfunctions_Room": 4 },
      "1": { "Globalfunctions_General": 1 }
    },
    "introduce": {
      "0": { "Pointers": 1 }
    },
    "introduced": {
      "0": { "acintro": 1 }
    },
    "introduces": {
      "0": { "UpgradeTo34": 1 }
    },
    "introducing": {
      "0": { "UpgradeTo341": 1 }
    },
    "Introduction": {
      "0": { "acintro": 1 }
    },
    "introduction": {
      "0": { "Pointers": 1 }
    },
    "IntToFloat": {
      "0": { "Maths": 4 },
      "1": { "Mouse": 1 }
    },
    "intuitive": {
      "0": { "UpgradingTo27": 3 },
      "1": { "UpgradingTo271": 1 }
    },
    "INV": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "inv": {
      "0": { "InvWindow": 4 },
      "1": { "InventoryItem": 3 },
      "2": { "Gamevariables": 2 },
      "3": { "Globalfunctions_General": 1 }
    },
    "Inv": {
      "0": { "InventoryItem": 2 },
      "1": { "EventTypes": 1 }
    },
    "invalid": {
      "0": { "Game": 4 },
      "1": { "Region": 3 },
      "2": { "Hotspot": 2 },
      "3": { "GUI": 1 }
    },
    "invaluable": {
      "0": { "StandardEnums": 1 }
    },
    "inventories": {
      "0": { "Settingupthegame": 1 }
    },
    "inventory": {
      "0": { "InventoryItem": 31 },
      "1": { "Settingupthegame": 29 },
      "2": { "InvWindow": 28 },
      "3": { "EditorInventoryItems": 25 },
      "4": { "Character": 24 },
      "5": { "acintro5": 21 },
      "6": { "EventTypes": 17 },
      "7": { "TextScriptEvents": 15 },
      "8": { "Globalfunctions_General": 10 },
      "9": { "acintro4": 8 },
      "10": { "Tumbleweed": 7 },
      "11": { "TemplateVerbcoin": 6 },
      "12": { "BlockingScripts": 5 },
      "13": { "acintro9": 4 },
      "14": { "Gamevariables": 3 },
      "15": { "Tumbleweed_helper": 2 },
      "16": { "TemplateSierraStyle": 1 }
    },
    "INVENTORY": {
      "0": { "GUI": 4 }
    },
    "Inventory": {
      "0": { "Settingupthegame": 12 },
      "1": { "acintro5": 5 },
      "2": { "InventoryItem": 4 },
      "3": { "Mouse": 3 },
      "4": { "EditorInventoryItems": 2 },
      "5": { "Game": 1 }
    },
    "InventoryGui": {
      "0": { "TemplateBASS": 3 }
    },
    "InventoryItem": {
      "0": { "InventoryItem": 31 },
      "1": { "Character": 5 },
      "2": { "CustomProperties": 4 },
      "3": { "ScriptingTutorialPart1": 3 },
      "4": { "StandardEnums": 2 },
      "5": { "ScriptKeywords": 1 }
    },
    "InventoryItemCount": {
      "0": { "Game": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "InventoryQuantity": {
      "0": { "Character": 4 },
      "1": { "Globalfunctions_General": 2 }
    },
    "InventoryScreen": {
      "0": { "Globalfunctions_General": 2 }
    },
    "invisible": {
      "0": { "GUIControl": 2 },
      "1": { "InvWindow": 1 }
    },
    "invMain": {
      "0": { "InvWindow": 24 },
      "1": { "GUIControl": 2 }
    },
    "INVNS": {
      "0": { "Settingupthegame": 1 }
    },
    "invoke": {
      "0": { "acintro9": 1 }
    },
    "involved": {
      "0": { "UpgradeTo31": 1 }
    },
    "involves": {
      "0": { "Character": 2 },
      "1": { "DynamicSprite": 1 }
    },
    "INVSHR": {
      "0": { "Settingupthegame": 1 }
    },
    "invWeights": {
      "0": { "ScriptKeywords": 1 }
    },
    "InvWindow": {
      "0": { "InvWindow": 29 },
      "1": { "GUIControl": 15 },
      "2": { "EditingGUIs": 2 },
      "3": { "Scripting": 1 }
    },
    "iPinkPoster": {
      "0": { "UpgradingTo27": 1 }
    },
    "iPoster": {
      "0": { "Character": 2 },
      "1": { "Dialog": 1 }
    },
    "iposter": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "irritate": {
      "0": { "Mouse": 1 }
    },
    "irrKlang": {
      "0": { "Credits": 1 }
    },
    "irrklang": {
      "0": { "Credits": 1 }
    },
    "IsAction": {
      "0": { "Tumbleweed_actions": 3 }
    },
    "IsAudioPlaying": {
      "0": { "Multimedia": 4 },
      "1": { "AudioClip": 1 }
    },
    "IsAvailable": {
      "0": { "AudioClip": 3 },
      "1": { "Multimedia": 1 }
    },
    "IsButtonDown": {
      "0": { "Mouse": 4 },
      "1": { "StandardEnums": 1 }
    },
    "IsChannelPlaying": {
      "0": { "AudioChannel": 1 }
    },
    "IsCollidingWithChar": {
      "0": { "Character": 4 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "IsCollidingWithObject": {
      "0": { "Character": 6 },
      "1": { "Object": 3 },
      "2": { "Globalfunctions_Room": 2 }
    },
    "iSecondItem": {
      "0": { "ScriptingTutorialPart2": 2 }
    },
    "IsEnabled": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "ISFRAMEFLIPPED": {
      "0": { "Globalfunctions_General": 1 }
    },
    "IsGamePaused": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "ScriptingTutorialPart1": 3 },
      "2": { "System": 2 },
      "3": { "GUI": 1 }
    },
    "IsGuiDisabled": {
      "0": { "Tumbleweed_helper": 5 }
    },
    "IsGUIOn": {
      "0": { "GUI": 1 }
    },
    "iShovel": {
      "0": { "InventoryItem": 1 }
    },
    "IsInteractionAvailable": {
      "0": { "Globalfunctions_General": 7 },
      "1": { "Hotspot": 5 },
      "2": { "Room": 1 }
    },
    "IsInterfaceEnabled": {
      "0": { "Globalfunctions_General": 5 }
    },
    "IsInventoryInteractionAvailable": {
      "0": { "InventoryItem": 1 }
    },
    "IsKeyPressed": {
      "0": { "Globalfunctions_General": 9 },
      "1": { "ScriptKeywords": 2 },
      "2": { "Mouse": 1 }
    },
    "Island": {
      "0": { "acintro3": 1 }
    },
    "IsModeEnabled": {
      "0": { "Mouse": 5 },
      "1": { "StandardEnums": 1 }
    },
    "IsMusicPlaying": {
      "0": { "Multimedia": 1 }
    },
    "IsMusicVoxAvailable": {
      "0": { "AudioClip": 1 }
    },
    "isn't": {
      "0": { "FAQ": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "IsNullOrEmpty": {
      "0": { "String": 4 },
      "1": { "OOProgramming": 1 }
    },
    "IsObjectAnimating": {
      "0": { "Object": 1 }
    },
    "IsObjectMoving": {
      "0": { "Object": 1 }
    },
    "IsObjectOn": {
      "0": { "Object": 1 }
    },
    "IsOpen": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "IsOverlayValid": {
      "0": { "Overlay": 1 }
    },
    "IsPlaying": {
      "0": { "AudioChannel": 3 }
    },
    "IsPluginLoaded": {
      "0": { "Game": 4 }
    },
    "ISRUNNEXTLOOP": {
      "0": { "Globalfunctions_General": 1 }
    },
    "IsSoundPlaying": {
      "0": { "Multimedia": 1 }
    },
    "IsSpeechVoxAvailable": {
      "0": { "Multimedia": 3 },
      "1": { "Speech": 1 }
    },
    "issue": {
      "0": { "SystemLimits": 1 }
    },
    "issued": {
      "0": { "Character": 1 }
    },
    "issues": {
      "0": { "UpgradeTo30": 1 }
    },
    "IsTimerExpired": {
      "0": { "Globalfunctions_General": 5 }
    },
    "iStone": {
      "0": { "InventoryItem": 1 }
    },
    "IsTranslationAvailable": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "Label": 2 }
    },
    "IsValid": {
      "0": { "Character": 1 }
    },
    "IsVoxAvailable": {
      "0": { "Multimedia": 1 }
    },
    "it'll": {
      "0": { "acintro2": 1 }
    },
    "It's": {
      "0": { "ScriptingTutorialPart1": 5 },
      "1": { "acintro1": 3 },
      "2": { "FAQ": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "it's": {
      "0": { "Tumbleweed_movement": 11 },
      "1": { "UpgradingTo27": 5 },
      "2": { "acintro1": 4 },
      "3": { "Settingupthegame": 3 },
      "4": { "acintro8": 2 },
      "5": { "DynamicSprite": 1 }
    },
    "Italian": {
      "0": { "Tumbleweed": 1 }
    },
    "Item": {
      "0": { "EditorInventoryItems": 2 },
      "1": { "ListBox": 1 }
    },
    "item": {
      "0": { "ListBox": 41 },
      "1": { "InventoryItem": 29 },
      "2": { "Character": 21 },
      "3": { "Settingupthegame": 19 },
      "4": { "acintro5": 17 },
      "5": { "EditorInventoryItems": 15 },
      "6": { "InvWindow": 11 },
      "7": { "Tumbleweed": 10 },
      "8": { "Set": 8 },
      "9": { "EventTypes": 7 },
      "10": { "TextScriptEvents": 6 },
      "11": { "Tumbleweed_movement": 5 },
      "12": { "ScriptKeywords": 4 },
      "13": { "Tumbleweed_extensions": 3 },
      "14": { "Mouse": 2 },
      "15": { "UpgradeTo32": 1 }
    },
    "ITEM": {
      "0": { "ListBox": 2 }
    },
    "item's": {
      "0": { "Character": 3 },
      "1": { "UpgradeTo350": 2 },
      "2": { "ListBox": 1 }
    },
    "item-specific": {
      "0": { "acintro1": 1 }
    },
    "ItemAtIndex": {
      "0": { "InvWindow": 4 }
    },
    "ItemCapacity": {
      "0": { "Object": 2 }
    },
    "ItemCount": {
      "0": { "ListBox": 9 },
      "1": { "InvWindow": 8 },
      "2": { "Dictionary": 6 },
      "3": { "Set": 4 }
    },
    "ItemGiven": {
      "0": { "Tumbleweed": 4 }
    },
    "ItemHeight": {
      "0": { "InvWindow": 7 }
    },
    "ITEMS": {
      "0": { "ScriptKeywords": 2 }
    },
    "Items": {
      "0": { "ListBox": 7 },
      "1": { "EditorInventoryItems": 2 },
      "2": { "Pointers": 1 }
    },
    "items": {
      "0": { "InvWindow": 15 },
      "1": { "ListBox": 14 },
      "2": { "acintro5": 8 },
      "3": { "Dictionary": 7 },
      "4": { "Globalfunctions_General": 5 },
      "5": { "UpgradeTo33": 4 },
      "6": { "Character": 3 },
      "7": { "ScriptKeywords": 2 },
      "8": { "CustomProperties": 1 }
    },
    "ItemsPerRow": {
      "0": { "InvWindow": 8 }
    },
    "ItemWidth": {
      "0": { "InvWindow": 7 }
    },
    "iterate": {
      "0": { "Game": 7 },
      "1": { "Dialog": 1 }
    },
    "iteration": {
      "0": { "ScriptKeywords": 7 },
      "1": { "Tumbleweed": 1 }
    },
    "Iteration": {
      "0": { "ScriptKeywords": 1 }
    },
    "iterations": {
      "0": { "ScriptKeywords": 1 }
    },
    "its": {
      "0": { "Settingupthegame": 16 },
      "1": { "Object": 15 },
      "2": { "DynamicSprite": 13 },
      "3": { "Globalfunctions_General": 10 },
      "4": { "MusicAndSound": 8 },
      "5": { "Button": 7 },
      "6": { "GUIControl": 6 },
      "7": { "Game": 5 },
      "8": { "Setup": 4 },
      "9": { "ScriptModules": 3 },
      "10": { "UpgradeTo34": 2 },
      "11": { "Dictionary": 1 }
    },
    "Its": {
      "0": { "Set": 1 }
    },
    "itself": {
      "0": { "ScriptKeywords": 6 },
      "1": { "Maths": 2 },
      "2": { "Tumbleweed_unhandled": 1 }
    },
    "Ivan": {
      "0": { "Credits": 1 }
    },
    "iWrench": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "JACK's": {
      "0": { "InvWindow": 1 }
    },
    "Janet": {
      "0": { "Credits": 1 }
    },
    "January": {
      "0": { "DateTime": 1 }
    },
    "JASC": {
      "0": { "Settingupthegame": 1 }
    },
    "Java": {
      "0": { "Pointers": 6 },
      "1": { "UpgradingTo271": 1 }
    },
    "Javier": {
      "0": { "Credits": 3 }
    },
    "Jibble": {
      "0": { "CustomProperties": 1 }
    },
    "jibble": {
      "0": { "Button": 1 }
    },
    "jibble'": {
      "0": { "Button": 1 }
    },
    "Jim": {
      "0": { "Credits": 1 }
    },
    "job": {
      "0": { "acintro2": 1 }
    },
    "Jochen": {
      "0": { "Credits": 1 }
    },
    "Joe": {
      "0": { "Game": 2 },
      "1": { "Credits": 1 }
    },
    "John": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Credits": 1 }
    },
    "joined": {
      "0": { "acintro2": 1 }
    },
    "joining": {
      "0": { "String": 1 }
    },
    "JONES": {
      "0": { "Copyright": 1 }
    },
    "Jones": {
      "0": { "Copyright": 3 },
      "1": { "Credits": 1 }
    },
    "Journey": {
      "0": { "Globalfunctions_General": 1 }
    },
    "judged": {
      "0": { "UpgradeTo31": 1 }
    },
    "jukebox": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Julien": {
      "0": { "Credits": 1 }
    },
    "jumping": {
      "0": { "Character": 1 }
    },
    "jumpy": {
      "0": { "Globalfunctions_General": 1 }
    },
    "just": {
      "0": { "ScriptingTutorialPart2": 7 },
      "1": { "Character": 6 },
      "2": { "ScriptingTutorialPart1": 5 },
      "3": { "UpgradingTo27": 4 },
      "4": { "UpgradeTo30": 3 },
      "5": { "Debuggingfeatures": 2 },
      "6": { "File": 1 }
    },
    "Just": {
      "0": { "UpgradingTo27": 3 },
      "1": { "acintro7": 1 }
    },
    "KB": {
      "0": { "SystemLimits": 1 }
    },
    "KB's": {
      "0": { "SystemLimits": 1 }
    },
    "keep": {
      "0": { "DynamicSprite": 7 },
      "1": { "Character": 6 },
      "2": { "Settingupthegame": 3 },
      "3": { "ScriptKeywords": 2 },
      "4": { "Gamevariables": 1 }
    },
    "Keep": {
      "0": { "DialogOptionsRenderingInfo": 1 }
    },
    "keeping": {
      "0": { "Globalfunctions_General": 1 }
    },
    "keeps": {
      "0": { "Tumbleweed": 1 }
    },
    "kept": {
      "0": { "DateTime": 1 }
    },
    "Key": {
      "0": { "ASCIIcodes": 2 },
      "1": { "acintro4": 1 }
    },
    "key": {
      "0": { "Globalfunctions_General": 25 },
      "1": { "Dictionary": 24 },
      "2": { "acintro4": 22 },
      "3": { "Speech": 12 },
      "4": { "acintro7": 9 },
      "5": { "Game": 7 },
      "6": { "ASCIIcodes": 6 },
      "7": { "CustomDialogOptions": 5 },
      "8": { "Multimedia": 4 },
      "9": { "Gamevariables": 3 },
      "10": { "UpgradeTo34": 2 },
      "11": { "acintro6": 1 }
    },
    "key's": {
      "0": { "InventoryItem": 2 },
      "1": { "acintro7": 1 }
    },
    "key-controlled": {
      "0": { "CustomDialogOptions": 1 }
    },
    "Keyboard": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "keyboard": {
      "0": { "TemplateSierraStyle": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "Speech": 1 }
    },
    "Keyboard-Shortcut": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "KeyboardMovement": {
      "0": { "TemplateSierraStyle": 15 }
    },
    "KeyboardMovementMode": {
      "0": { "TemplateSierraStyle": 1 }
    },
    "KeyCode": {
      "0": { "ASCIIcodes": 1 }
    },
    "keycode": {
      "0": { "CustomDialogOptions": 5 },
      "1": { "System": 4 },
      "2": { "Globalfunctions_General": 3 },
      "3": { "ASCIIcodes": 2 },
      "4": { "DialogOptionsRenderingInfo": 1 }
    },
    "KEYCODE": {
      "0": { "TextScriptEvents": 1 }
    },
    "keycodes": {
      "0": { "Globalfunctions_General": 2 }
    },
    "KeyDown": {
      "0": { "TemplateSierraStyle": 3 }
    },
    "KeyLeft": {
      "0": { "TemplateSierraStyle": 3 }
    },
    "keypad": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "System": 1 }
    },
    "keypress": {
      "0": { "Game": 2 },
      "1": { "TextScriptEvents": 1 }
    },
    "keypresses": {
      "0": { "EditingGUIs": 1 }
    },
    "KeyRight": {
      "0": { "TemplateSierraStyle": 3 }
    },
    "keys": {
      "0": { "Dictionary": 9 },
      "1": { "Settingupthegame": 3 },
      "2": { "Speech": 1 }
    },
    "KeyUp": {
      "0": { "TemplateSierraStyle": 3 }
    },
    "Keyword": {
      "0": { "Preprocessor": 1 }
    },
    "keyword": {
      "0": { "ScriptKeywords": 18 },
      "1": { "ScriptingTutorialPart2": 5 },
      "2": { "Pointers": 4 },
      "3": { "OOProgramming": 2 },
      "4": { "Settingupthegame": 1 }
    },
    "keywords": {
      "0": { "ScriptKeywords": 2 },
      "1": { "ScriptingLanguage": 1 }
    },
    "kill": {
      "0": { "TextParser": 2 }
    },
    "kind": {
      "0": { "ScriptKeywords": 1 }
    },
    "KIND": {
      "0": { "Copyright": 2 }
    },
    "King's": {
      "0": { "Settingupthegame": 1 }
    },
    "Klaus": {
      "0": { "Credits": 1 }
    },
    "know": {
      "0": { "Settingupthegame": 3 },
      "1": { "DynamicArrays": 2 },
      "2": { "GUIControl": 1 }
    },
    "knowing": {
      "0": { "AnonymousUsageInfo": 3 },
      "1": { "MusicAndSound": 1 }
    },
    "knowledge": {
      "0": { "acintro2": 1 }
    },
    "known": {
      "0": { "Character": 64 },
      "1": { "Object": 33 },
      "2": { "Mouse": 16 },
      "3": { "ListBox": 15 },
      "4": { "DrawingSurfaceFunctions": 14 },
      "5": { "GUI": 13 },
      "6": { "System": 12 },
      "7": { "Hotspot": 11 },
      "8": { "AudioClip": 8 },
      "9": { "Speech": 7 },
      "10": { "Region": 6 },
      "11": { "TextBox": 5 },
      "12": { "GUIControl": 4 },
      "13": { "Dialog": 3 },
      "14": { "ViewFrame": 2 },
      "15": { "UpgradeTo350": 1 }
    },
    "knows": {
      "0": { "Object": 1 }
    },
    "Kwest": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "ky": {
      "0": { "Templates": 1 }
    },
    "Label": {
      "0": { "GUIControl": 15 },
      "1": { "TemplateBASS": 3 },
      "2": { "StandardEnums": 2 },
      "3": { "ListBox": 1 }
    },
    "label": {
      "0": { "ScriptKeywords": 6 },
      "1": { "Label": 5 },
      "2": { "EditingGUIs": 4 },
      "3": { "DrawingSurfaceFunctions": 1 }
    },
    "label's": {
      "0": { "Label": 3 }
    },
    "labeled": {
      "0": { "acintro7": 1 }
    },
    "labels": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "Labels": {
      "0": { "ScriptKeywords": 1 }
    },
    "lame": {
      "0": { "acintro1": 1 }
    },
    "lamp": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "lang": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "Language": {
      "0": { "Tumbleweed": 1 }
    },
    "LANGUAGE": {
      "0": { "Tumbleweed": 2 }
    },
    "language": {
      "0": { "Tumbleweed": 7 },
      "1": { "UpgradingTo27": 4 },
      "2": { "ScriptKeywords": 2 },
      "3": { "acintro8": 1 }
    },
    "languages": {
      "0": { "Tumbleweed_translation": 2 },
      "1": { "Pointers": 1 }
    },
    "laptop": {
      "0": { "EventTypes": 1 }
    },
    "large": {
      "0": { "ScriptingTutorialPart1": 4 },
      "1": { "Object": 3 },
      "2": { "ScriptKeywords": 2 },
      "3": { "acintro4": 1 }
    },
    "largely": {
      "0": { "acintro5": 1 }
    },
    "larger": {
      "0": { "Settingupthegame": 6 },
      "1": { "Camera": 4 },
      "2": { "Button": 2 },
      "3": { "acintro6": 1 }
    },
    "largest": {
      "0": { "InvWindow": 2 }
    },
    "last": {
      "0": { "Gamevariables": 4 },
      "1": { "String": 3 },
      "2": { "Tumbleweed": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "Last": {
      "0": { "Settingupthegame": 1 }
    },
    "lasts": {
      "0": { "Mouse": 1 }
    },
    "late": {
      "0": { "RepExec": 8 },
      "1": { "Character": 4 },
      "2": { "TextScriptEvents": 2 },
      "3": { "ScriptModules": 1 }
    },
    "later": {
      "0": { "Character": 33 },
      "1": { "Game": 16 },
      "2": { "Object": 13 },
      "3": { "AudioChannel": 12 },
      "4": { "System": 10 },
      "5": { "AudioClip": 9 },
      "6": { "Settingupthegame": 8 },
      "7": { "GUI": 7 },
      "8": { "Button": 6 },
      "9": { "Speech": 5 },
      "10": { "Mouse": 4 },
      "11": { "Region": 3 },
      "12": { "GraphicsDriver": 2 },
      "13": { "EditorSprite": 1 }
    },
    "latest": {
      "0": { "Scripting": 2 },
      "1": { "acintro3": 1 }
    },
    "latter": {
      "0": { "Credits": 1 }
    },
    "launch": {
      "0": { "IntegrationWithWindows": 2 },
      "1": { "acintro2": 1 }
    },
    "launched": {
      "0": { "Globalfunctions_General": 1 }
    },
    "launches": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "launching": {
      "0": { "Globalfunctions_General": 1 }
    },
    "lawsuit": {
      "0": { "TemplateBASS": 1 }
    },
    "Layer": {
      "0": { "EditorRoom": 2 }
    },
    "layer": {
      "0": { "EditorRoom": 14 },
      "1": { "Globalfunctions_Screen": 1 }
    },
    "layers": {
      "0": { "EditorRoom": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "layout": {
      "0": { "UpgradeTo33": 1 }
    },
    "Lazy": {
      "0": { "UpgradeTo341": 1 }
    },
    "lblAction": {
      "0": { "TemplateBASS": 1 }
    },
    "lblDescription": {
      "0": { "Game": 2 }
    },
    "lblLabel": {
      "0": { "UpgradingTo271": 1 }
    },
    "lblStatus": {
      "0": { "Label": 6 }
    },
    "lead": {
      "0": { "File": 1 }
    },
    "leading": {
      "0": { "MusicAndSound": 2 },
      "1": { "DialogOptionsRenderingInfo": 1 }
    },
    "leaning": {
      "0": { "UpgradeTo335": 1 }
    },
    "learn": {
      "0": { "UpgradingTo27": 1 }
    },
    "learned": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "learning": {
      "0": { "TemplateSierraStyle": 1 }
    },
    "least": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Screen": 2 },
      "2": { "DialogOptionsRenderingInfo": 1 }
    },
    "leave": {
      "0": { "Tumbleweed": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "acintro5": 1 }
    },
    "leaves": {
      "0": { "EventTypes": 3 },
      "1": { "Region": 2 },
      "2": { "Room": 1 }
    },
    "Leaves": {
      "0": { "TextScriptEvents": 1 }
    },
    "leaving": {
      "0": { "MusicAndSound": 1 }
    },
    "LEC": {
      "0": { "Credits": 1 }
    },
    "Lee": {
      "0": { "Credits": 1 }
    },
    "left": {
      "0": { "Settingupthegame": 12 },
      "1": { "Character": 7 },
      "2": { "DynamicSprite": 6 },
      "3": { "DrawingSurfaceFunctions": 5 },
      "4": { "acintro6": 4 },
      "5": { "acintro2": 3 },
      "6": { "Mouse": 2 },
      "7": { "Translations": 1 }
    },
    "LEFT": {
      "0": { "TextScriptEvents": 1 }
    },
    "Left": {
      "0": { "ASCIIcodes": 2 },
      "1": { "Tumbleweed_player": 1 }
    },
    "left-click": {
      "0": { "TemplateBASS": 3 },
      "1": { "Tumbleweed_extensions": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "Left-click": {
      "0": { "acintro7": 1 }
    },
    "left-clicking": {
      "0": { "TemplateBASS": 2 },
      "1": { "EditorInventoryItems": 1 }
    },
    "left-hand": {
      "0": { "GUI": 1 }
    },
    "left-padded": {
      "0": { "StringFormats": 1 }
    },
    "left-right": {
      "0": { "acintro7": 1 }
    },
    "Left-to-right": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "left-to-right": {
      "0": { "ScriptKeywords": 1 }
    },
    "LeftArrow": {
      "0": { "ASCIIcodes": 1 }
    },
    "LeftEdge": {
      "0": { "Room": 6 }
    },
    "LeftEdgeX": {
      "0": { "EditorRoom": 1 }
    },
    "leftwards": {
      "0": { "Globalfunctions_Palette": 1 }
    },
    "legacy": {
      "0": { "GUI": 2 },
      "1": { "GUIControl": 1 }
    },
    "leksutin": {
      "0": { "Credits": 1 }
    },
    "Length": {
      "0": { "String": 9 }
    },
    "LENGTH": {
      "0": { "Globalfunctions_Screen": 2 }
    },
    "length": {
      "0": { "String": 6 },
      "1": { "Game": 4 },
      "2": { "Speech": 2 },
      "3": { "Globalfunctions_Screen": 1 }
    },
    "LengthMs": {
      "0": { "AudioChannel": 4 }
    },
    "lengths": {
      "0": { "Character": 1 }
    },
    "lengthy": {
      "0": { "Game": 1 }
    },
    "less": {
      "0": { "Settingupthegame": 5 },
      "1": { "ScriptKeywords": 3 },
      "2": { "UpgradeTo350": 2 },
      "3": { "Button": 1 }
    },
    "Lesser": {
      "0": { "Copyright": 1 }
    },
    "let": {
      "0": { "acintro4": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "let's": {
      "0": { "acintro8": 5 },
      "1": { "acintro4": 4 },
      "2": { "MusicAndSound": 2 },
      "3": { "Pointers": 1 }
    },
    "Let's": {
      "0": { "BlockingScripts": 3 },
      "1": { "Pointers": 2 },
      "2": { "OOProgramming": 1 }
    },
    "lets": {
      "0": { "Settingupthegame": 3 },
      "1": { "ScriptKeywords": 1 }
    },
    "Lets": {
      "0": { "Setup": 2 }
    },
    "letter": {
      "0": { "Tumbleweed_extensions": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "Letter": {
      "0": { "Lipsync": 1 }
    },
    "letterbox": {
      "0": { "System": 1 }
    },
    "letters": {
      "0": { "Lipsync": 4 },
      "1": { "MusicAndSound": 1 }
    },
    "letting": {
      "0": { "acintro4": 2 }
    },
    "level": {
      "0": { "Character": 23 },
      "1": { "Object": 14 },
      "2": { "Globalfunctions_General": 8 },
      "3": { "Region": 7 },
      "4": { "AdvancedRoomFeatures": 5 },
      "5": { "System": 2 },
      "6": { "OOProgramming": 1 }
    },
    "Level": {
      "0": { "UpgradeTo34": 2 },
      "1": { "Region": 1 }
    },
    "levels": {
      "0": { "Character": 5 },
      "1": { "Globalfunctions_General": 4 },
      "2": { "AdvancedRoomFeatures": 3 },
      "3": { "Globalfunctions_Room": 2 },
      "4": { "Region": 1 }
    },
    "lever": {
      "0": { "FAQ": 1 }
    },
    "Leverton": {
      "0": { "Credits": 1 }
    },
    "levitate": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "levitates": {
      "0": { "Character": 1 }
    },
    "LIABILITY": {
      "0": { "Copyright": 1 }
    },
    "LIABLE": {
      "0": { "Copyright": 1 }
    },
    "libagsdrawcircle": {
      "0": { "Plugins": 1 }
    },
    "libcda": {
      "0": { "Credits": 1 }
    },
    "libellous": {
      "0": { "Copyright": 1 }
    },
    "libraries": {
      "0": { "DistGame": 1 }
    },
    "library": {
      "0": { "Credits": 1 }
    },
    "license": {
      "0": { "DistGame": 2 },
      "1": { "Copyright": 1 }
    },
    "License": {
      "0": { "DistGame": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "licenses": {
      "0": { "MusicAndSound": 1 }
    },
    "Licensing": {
      "0": { "DistGame": 1 }
    },
    "lie": {
      "0": { "Globalfunctions_General": 1 }
    },
    "lies": {
      "0": { "Slider": 2 }
    },
    "life": {
      "0": { "StringFormats": 9 }
    },
    "Life": {
      "0": { "StringFormats": 1 }
    },
    "Light": {
      "0": { "AdvancedRoomFeatures": 2 },
      "1": { "Region": 1 }
    },
    "light": {
      "0": { "Character": 17 },
      "1": { "Object": 16 },
      "2": { "Globalfunctions_General": 12 },
      "3": { "Region": 8 },
      "4": { "AdvancedRoomFeatures": 3 },
      "5": { "Globalfunctions_Room": 2 },
      "6": { "Globalfunctions_Message": 1 }
    },
    "lighted": {
      "0": { "Character": 1 }
    },
    "lightened": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "lighting": {
      "0": { "Character": 3 },
      "1": { "Region": 2 },
      "2": { "EditorCharacter": 1 }
    },
    "Lighting": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "LightLevel": {
      "0": { "Region": 7 },
      "1": { "Object": 5 },
      "2": { "Character": 4 },
      "3": { "Globalfunctions_General": 1 }
    },
    "lightning": {
      "0": { "Settingupthegame": 2 },
      "1": { "EventTypes": 1 }
    },
    "Lightweight": {
      "0": { "Credits": 1 }
    },
    "Like": {
      "0": { "DialogOptionsRenderingInfo": 1 }
    },
    "like": {
      "0": { "ScriptKeywords": 18 },
      "1": { "ScriptingTutorialPart1": 10 },
      "2": { "Tumbleweed": 9 },
      "3": { "ScriptingTutorialPart2": 8 },
      "4": { "UpgradeTo32": 7 },
      "5": { "acintro3": 6 },
      "6": { "Pointers": 5 },
      "7": { "acintro8": 4 },
      "8": { "Mouse": 3 },
      "9": { "StringFormats": 2 },
      "10": { "CustomProperties": 1 }
    },
    "likely": {
      "0": { "System": 2 },
      "1": { "TroubleshootingWindowsZoneID": 1 }
    },
    "liking": {
      "0": { "Settingupthegame": 1 }
    },
    "limit": {
      "0": { "UpgradeTo350": 6 },
      "1": { "SystemLimits": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "LIMITATION": {
      "0": { "Copyright": 1 }
    },
    "limitation": {
      "0": { "ScriptKeywords": 1 }
    },
    "limitations": {
      "0": { "Globalfunctions_General": 1 }
    },
    "limited": {
      "0": { "UpgradeTo34": 4 },
      "1": { "Character": 3 },
      "2": { "File": 1 }
    },
    "limits": {
      "0": { "SystemLimits": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "Line": {
      "0": { "acintro2": 3 }
    },
    "line": {
      "0": { "Character": 11 },
      "1": { "Settingupthegame": 10 },
      "2": { "Globalfunctions_General": 8 },
      "3": { "ScriptingTutorialPart1": 7 },
      "4": { "Debuggingfeatures": 6 },
      "5": { "Translations": 5 },
      "6": { "File": 4 },
      "7": { "Tumbleweed": 3 },
      "8": { "StringFormats": 2 },
      "9": { "Gamevariables": 1 }
    },
    "lined": {
      "0": { "acintro2": 1 }
    },
    "lines": {
      "0": { "Settingupthegame": 6 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "acintro8": 4 },
      "3": { "acintro2": 3 },
      "4": { "KeyboardShortcuts": 2 },
      "5": { "Debuggingfeatures": 1 }
    },
    "LINES": {
      "0": { "Translations": 1 }
    },
    "LineSpacing": {
      "0": { "Settingupthegame": 1 }
    },
    "link": {
      "0": { "Lipsync": 2 },
      "1": { "Gamevariables": 1 }
    },
    "Linked": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "linked": {
      "0": { "Viewport": 4 },
      "1": { "Camera": 3 },
      "2": { "ViewFrame": 2 },
      "3": { "Character": 1 }
    },
    "LinkedAudio": {
      "0": { "ViewFrame": 4 }
    },
    "links": {
      "0": { "Pointers": 1 }
    },
    "Linux": {
      "0": { "Plugins": 3 },
      "1": { "DistGame": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Linux-related": {
      "0": { "UpgradeTo34": 1 }
    },
    "lip": {
      "0": { "Lipsync": 7 },
      "1": { "Speech": 1 }
    },
    "Lip": {
      "0": { "Lipsync": 7 },
      "1": { "OtherFeatures": 1 }
    },
    "lip-sync": {
      "0": { "Game": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "lipsync": {
      "0": { "Gamevariables": 1 }
    },
    "LIPSYNCTEXT": {
      "0": { "Globalfunctions_General": 1 }
    },
    "list": {
      "0": { "ListBox": 46 },
      "1": { "Settingupthegame": 15 },
      "2": { "acintro3": 5 },
      "3": { "TextParser": 4 },
      "4": { "acintro4": 3 },
      "5": { "ScriptKeywords": 2 },
      "6": { "acintro5": 1 }
    },
    "List": {
      "0": { "ListBox": 3 },
      "1": { "EditingGUIs": 2 },
      "2": { "acintro5": 1 }
    },
    "listbox": {
      "0": { "ListBox": 10 },
      "1": { "GUI": 1 }
    },
    "ListBox": {
      "0": { "ListBox": 84 },
      "1": { "GUIControl": 16 },
      "2": { "UpgradeTo33": 5 },
      "3": { "EditingGUIs": 4 },
      "4": { "StandardEnums": 2 },
      "5": { "UpgradeTo350": 1 }
    },
    "Listbox": {
      "0": { "ListBox": 1 }
    },
    "listbox's": {
      "0": { "ListBox": 2 }
    },
    "ListBoxAdd": {
      "0": { "ListBox": 1 }
    },
    "ListBoxClear": {
      "0": { "ListBox": 1 }
    },
    "ListBoxDirList": {
      "0": { "ListBox": 1 }
    },
    "ListBoxGetItemText": {
      "0": { "ListBox": 1 }
    },
    "ListBoxGetNumItems": {
      "0": { "ListBox": 1 }
    },
    "ListBoxGetSelected": {
      "0": { "ListBox": 1 }
    },
    "ListBoxRemove": {
      "0": { "ListBox": 1 }
    },
    "ListBoxSaveGameList": {
      "0": { "ListBox": 1 }
    },
    "ListBoxSetSelected": {
      "0": { "ListBox": 1 }
    },
    "ListBoxSetTopItem": {
      "0": { "ListBox": 1 }
    },
    "listed": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Settingupthegame": 3 },
      "2": { "ScriptingTutorialPart1": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "listen": {
      "0": { "Lipsync": 1 }
    },
    "listing": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "lists": {
      "0": { "ASCIIcodes": 1 }
    },
    "literal": {
      "0": { "ScriptKeywords": 1 }
    },
    "little": {
      "0": { "Tumbleweed_extensions": 3 },
      "1": { "Globalfunctions_Screen": 2 },
      "2": { "acintro1": 1 }
    },
    "lo": {
      "0": { "String": 1 }
    },
    "Load": {
      "0": { "FAQ": 2 }
    },
    "load": {
      "0": { "DynamicSprite": 8 },
      "1": { "DistGame": 4 },
      "2": { "Parser": 2 },
      "3": { "Globalfunctions_General": 1 }
    },
    "loaded": {
      "0": { "DynamicSprite": 4 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "Screen": 2 },
      "3": { "Camera": 1 }
    },
    "LoadImageFile": {
      "0": { "DynamicSprite": 1 }
    },
    "Loading": {
      "0": { "DistGame": 1 }
    },
    "loading": {
      "0": { "DistGame": 1 }
    },
    "loads": {
      "0": { "DynamicSprite": 7 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Loads": {
      "0": { "DynamicSprite": 2 }
    },
    "LoadSaveSlotScreenshot": {
      "0": { "DynamicSprite": 1 }
    },
    "local": {
      "0": { "CallingGlobalFunctions": 3 },
      "1": { "ScriptKeywords": 2 },
      "2": { "BlockingScripts": 1 }
    },
    "locally": {
      "0": { "Settingupthegame": 2 },
      "1": { "GlobalVariables": 1 }
    },
    "located": {
      "0": { "Viewport": 2 },
      "1": { "UpgradeTo341": 1 }
    },
    "location": {
      "0": { "UpgradeTo335": 7 },
      "1": { "GUI": 6 },
      "2": { "Character": 5 },
      "3": { "Tumbleweed_extensions": 4 },
      "4": { "TroubleshootingWindowsZoneID": 2 },
      "5": { "MusicAndSound": 1 }
    },
    "locations": {
      "0": { "UpgradeTo335": 2 },
      "1": { "GlobalVariables": 1 }
    },
    "LocationType": {
      "0": { "Globalfunctions_General": 1 }
    },
    "LOCK": {
      "0": { "System": 3 },
      "1": { "Debuggingfeatures": 1 }
    },
    "lock": {
      "0": { "Globalfunctions_Room": 3 },
      "1": { "acintro2": 1 }
    },
    "Lock": {
      "0": { "System": 7 },
      "1": { "Globalfunctions_General": 1 }
    },
    "lock-ups": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "LockDifficulty": {
      "0": { "Hotspot": 2 }
    },
    "Locked": {
      "0": { "EditorRoom": 2 }
    },
    "locked": {
      "0": { "Setup": 4 },
      "1": { "UpgradeTo350": 3 },
      "2": { "Character": 2 },
      "3": { "acintro4": 1 }
    },
    "Locking": {
      "0": { "EditorRoom": 1 }
    },
    "locks": {
      "0": { "Character": 3 }
    },
    "Locks": {
      "0": { "Globalfunctions_Room": 2 }
    },
    "LockView": {
      "0": { "Character": 17 },
      "1": { "RepExec": 1 }
    },
    "LockViewAligned": {
      "0": { "Character": 6 },
      "1": { "StandardEnums": 1 }
    },
    "LockViewFrame": {
      "0": { "Character": 3 },
      "1": { "StandardEnums": 1 }
    },
    "LockViewOffset": {
      "0": { "Character": 5 }
    },
    "Log": {
      "0": { "Maths": 7 }
    },
    "log": {
      "0": { "File": 4 }
    },
    "logarithm": {
      "0": { "Maths": 3 }
    },
    "logic": {
      "0": { "Character": 1 }
    },
    "logical": {
      "0": { "Screen": 2 }
    },
    "Logical": {
      "0": { "ScriptKeywords": 2 }
    },
    "logo": {
      "0": { "Globalfunctions_Palette": 1 }
    },
    "logs": {
      "0": { "File": 1 }
    },
    "logVal": {
      "0": { "Maths": 2 }
    },
    "long": {
      "0": { "ScriptKeywords": 5 },
      "1": { "Mouse": 2 },
      "2": { "Tumbleweed_translation": 1 }
    },
    "long-lasting": {
      "0": { "Room": 1 }
    },
    "longer": {
      "0": { "DynamicSprite": 8 },
      "1": { "UpgradeTo350": 5 },
      "2": { "UpgradeTo341": 3 },
      "3": { "UpgradingTo27": 2 },
      "4": { "ScriptKeywords": 1 }
    },
    "longest": {
      "0": { "Lipsync": 1 }
    },
    "Longest": {
      "0": { "Globalfunctions_General": 1 }
    },
    "longWindedSound": {
      "0": { "MusicAndSound": 4 }
    },
    "LOOK": {
      "0": { "Tumbleweed": 1 }
    },
    "Look": {
      "0": { "EventTypes": 7 },
      "1": { "TextScriptEvents": 5 },
      "2": { "acintro5": 4 },
      "3": { "Settingupthegame": 3 },
      "4": { "acintro3": 2 },
      "5": { "MusicAndSound": 1 }
    },
    "look": {
      "0": { "TextParser": 13 },
      "1": { "Settingupthegame": 10 },
      "2": { "ScriptingTutorialPart1": 8 },
      "3": { "Tumbleweed": 7 },
      "4": { "acintro6": 5 },
      "5": { "EventTypes": 4 },
      "6": { "Pointers": 3 },
      "7": { "Character": 2 },
      "8": { "SourceControl": 1 }
    },
    "LookAt": {
      "0": { "Tumbleweed": 2 },
      "1": { "Tumbleweed_unhandled": 1 }
    },
    "lookat": {
      "0": { "Tumbleweed_movement": 2 }
    },
    "lookForText": {
      "0": { "String": 7 }
    },
    "looking": {
      "0": { "ScriptingTutorialPart1": 4 },
      "1": { "FAQ": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Looking": {
      "0": { "ScriptingTutorialPart1": 2 }
    },
    "Looks": {
      "0": { "Parser": 1 }
    },
    "looks": {
      "0": { "Settingupthegame": 9 },
      "1": { "ScriptingTutorialPart1": 3 },
      "2": { "Mouse": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "loop": {
      "0": { "Character": 24 },
      "1": { "ScriptKeywords": 18 },
      "2": { "EditorView": 17 },
      "3": { "Object": 12 },
      "4": { "Settingupthegame": 9 },
      "5": { "Game": 8 },
      "6": { "acintro7": 7 },
      "7": { "ScriptingTutorialPart2": 5 },
      "8": { "UpgradeTo34": 3 },
      "9": { "Lipsync": 2 },
      "10": { "SystemLimits": 1 }
    },
    "Loop": {
      "0": { "Settingupthegame": 8 },
      "1": { "ViewFrame": 7 },
      "2": { "Button": 6 },
      "3": { "Character": 5 },
      "4": { "acintro7": 1 }
    },
    "LOOP": {
      "0": { "Character": 4 },
      "1": { "Object": 3 },
      "2": { "UpgradeTo30": 1 }
    },
    "looped": {
      "0": { "Character": 1 }
    },
    "loops": {
      "0": { "Settingupthegame": 11 },
      "1": { "Character": 9 },
      "2": { "Globalfunctions_General": 5 },
      "3": { "Game": 4 },
      "4": { "Speech": 3 },
      "5": { "acintro7": 2 },
      "6": { "SystemLimits": 1 }
    },
    "Loops": {
      "0": { "EditorView": 6 },
      "1": { "Settingupthegame": 1 }
    },
    "LOOPS": {
      "0": { "UpgradeTo30": 1 }
    },
    "loosened": {
      "0": { "SystemLimits": 1 }
    },
    "lose": {
      "0": { "Globalfunctions_General": 1 }
    },
    "LoseInventory": {
      "0": { "Character": 8 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "LoseInventoryFromCharacter": {
      "0": { "Character": 1 }
    },
    "losing": {
      "0": { "OOProgramming": 1 }
    },
    "LOSS": {
      "0": { "Copyright": 1 }
    },
    "loss": {
      "0": { "Mouse": 1 }
    },
    "lost": {
      "0": { "TextScriptEvents": 2 },
      "1": { "Room": 1 }
    },
    "lostmarble": {
      "0": { "Lipsync": 1 }
    },
    "lot": {
      "0": { "Settingupthegame": 2 },
      "1": { "AdvancedRoomFeatures": 1 }
    },
    "lots": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "louder": {
      "0": { "Character": 1 }
    },
    "loudest": {
      "0": { "Multimedia": 2 }
    },
    "love": {
      "0": { "TextParser": 2 }
    },
    "low": {
      "0": { "MusicAndSound": 1 }
    },
    "low-res": {
      "0": { "UpgradeTo350": 7 },
      "1": { "UpgradeTo31": 4 },
      "2": { "Settingupthegame": 2 },
      "3": { "Game": 1 }
    },
    "low-resolution": {
      "0": { "Settingupthegame": 3 },
      "1": { "Setup": 2 },
      "2": { "DrawingSurfaceFunctions": 1 }
    },
    "lower": {
      "0": { "Settingupthegame": 3 },
      "1": { "GUI": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Lower": {
      "0": { "Globalfunctions_General": 1 }
    },
    "lower-left": {
      "0": { "Object": 1 }
    },
    "LowerCase": {
      "0": { "String": 4 }
    },
    "lowercased": {
      "0": { "String": 2 }
    },
    "lowering": {
      "0": { "UpgradeTo34": 1 }
    },
    "lowest": {
      "0": { "acintro2": 1 }
    },
    "LRPRECEDENCE": {
      "0": { "ScriptKeywords": 1 }
    },
    "lstChoices": {
      "0": { "ListBox": 4 }
    },
    "lstNoteBook": {
      "0": { "ListBox": 2 }
    },
    "lstOptions": {
      "0": { "ListBox": 6 }
    },
    "lstSaveGames": {
      "0": { "ListBox": 16 },
      "1": { "GUIControl": 1 }
    },
    "lstSaves": {
      "0": { "GUIControl": 7 },
      "1": { "UpgradingTo27": 2 }
    },
    "lstTest": {
      "0": { "ListBox": 7 },
      "1": { "UpgradingTo27": 1 }
    },
    "Lucas-Arts": {
      "0": { "Speech": 1 }
    },
    "LucasArts": {
      "0": { "Settingupthegame": 3 },
      "1": { "AdvancedRoomFeatures": 1 }
    },
    "LucasArts-style": {
      "0": { "Settingupthegame": 4 },
      "1": { "acintro9": 3 },
      "2": { "EventTypes": 2 },
      "3": { "Speech": 1 }
    },
    "LucasArts-type": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "Ludwig": {
      "0": { "Credits": 1 }
    },
    "luminance": {
      "0": { "Region": 3 },
      "1": { "Character": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "LUMINANCE": {
      "0": { "Globalfunctions_General": 1 }
    },
    "lunges": {
      "0": { "Room": 1 }
    },
    "LW": {
      "0": { "Templates": 1 }
    },
    "lying": {
      "0": { "acintro4": 1 }
    },
    "machine": {
      "0": { "Parser": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "MacOS": {
      "0": { "System": 2 },
      "1": { "Game": 1 }
    },
    "Macro": {
      "0": { "Preprocessor": 4 }
    },
    "macro": {
      "0": { "Preprocessor": 4 },
      "1": { "ScriptKeywords": 1 }
    },
    "macros": {
      "0": { "ScriptKeywords": 1 }
    },
    "Macros": {
      "0": { "Globalfunctions_General": 1 }
    },
    "made": {
      "0": { "UpgradeTo350": 3 },
      "1": { "UpgradeTo341": 2 },
      "2": { "UpgradeTo31": 1 }
    },
    "magic": {
      "0": { "acintro4": 1 }
    },
    "Magick": {
      "0": { "Credits": 1 }
    },
    "Main": {
      "0": { "Button": 1 }
    },
    "main": {
      "0": { "Settingupthegame": 13 },
      "1": { "acintro1": 6 },
      "2": { "ScriptingTutorialPart1": 5 },
      "3": { "Globalfunctions_Room": 4 },
      "4": { "EditingGUIs": 3 },
      "5": { "acintro3": 2 },
      "6": { "UpgradeTo30": 1 }
    },
    "mainBackground": {
      "0": { "DrawingSurfaceFunctions": 3 }
    },
    "mainly": {
      "0": { "Settingupthegame": 2 },
      "1": { "Dialog": 1 }
    },
    "maintain": {
      "0": { "UpgradingTo271": 1 }
    },
    "maintains": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "major": {
      "0": { "UpgradeTo31": 2 },
      "1": { "UpgradeTo33": 1 }
    },
    "majority": {
      "0": { "TemplateSierraStyle": 2 },
      "1": { "Character": 1 }
    },
    "make": {
      "0": { "Character": 19 },
      "1": { "Settingupthegame": 11 },
      "2": { "FAQ": 6 },
      "3": { "Object": 5 },
      "4": { "acintro1": 4 },
      "5": { "Pointers": 3 },
      "6": { "Tumbleweed": 2 },
      "7": { "Debuggingfeatures": 1 }
    },
    "Make": {
      "0": { "DynamicSprite": 7 },
      "1": { "acintro3": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "FAQ": 1 }
    },
    "makes": {
      "0": { "TemplateSierraStyle": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "Makes": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "MakeWider": {
      "0": { "Globalfunctions_General": 2 }
    },
    "Making": {
      "0": { "Introduction": 1 }
    },
    "making": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "acintro1": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "mammoth": {
      "0": { "UpgradeTo31": 1 }
    },
    "MAN": {
      "0": { "Character": 6 }
    },
    "man": {
      "0": { "Settingupthegame": 5 },
      "1": { "Globalfunctions_General": 1 }
    },
    "MAN's": {
      "0": { "Character": 2 }
    },
    "manage": {
      "0": { "Screen": 1 }
    },
    "Managed": {
      "0": { "ScriptKeywords": 2 }
    },
    "managed": {
      "0": { "ScriptKeywords": 15 },
      "1": { "UpgradeTo34": 3 },
      "2": { "StandardTypes": 2 },
      "3": { "Settingupthegame": 1 }
    },
    "management": {
      "0": { "Pointers": 2 }
    },
    "Manager": {
      "0": { "acintro6": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "acintro4": 1 }
    },
    "manager": {
      "0": { "EditorSprite": 4 },
      "1": { "acintro7": 2 },
      "2": { "acintro4": 1 }
    },
    "manager's": {
      "0": { "Overlay": 1 }
    },
    "manages": {
      "0": { "DynamicSprite": 1 }
    },
    "managing": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "Managing": {
      "0": { "acintro": 1 }
    },
    "mandatory": {
      "0": { "ScriptKeywords": 1 }
    },
    "manipulate": {
      "0": { "UpgradingTo271": 1 }
    },
    "manipulates": {
      "0": { "Settingupthegame": 1 }
    },
    "manner": {
      "0": { "Pointers": 1 }
    },
    "manual": {
      "0": { "ScriptingTutorialPart1": 5 },
      "1": { "ContactingTheDevelopers": 4 },
      "2": { "ScriptingTutorialPart2": 2 },
      "3": { "Pointers": 1 }
    },
    "manually": {
      "0": { "Character": 4 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "ManualScaling": {
      "0": { "Character": 6 }
    },
    "manufactured": {
      "0": { "GraphicsDriver": 1 }
    },
    "many": {
      "0": { "Settingupthegame": 3 },
      "1": { "StringFormats": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "Many": {
      "0": { "UpgradingTo27": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "map": {
      "0": { "ListBox": 1 }
    },
    "mapping": {
      "0": { "UpgradeTo32": 1 }
    },
    "margin": {
      "0": { "Speech": 1 }
    },
    "mark": {
      "0": { "Globalfunctions_General": 1 }
    },
    "marked": {
      "0": { "acintro1": 2 },
      "1": { "DistGame": 1 }
    },
    "Marker": {
      "0": { "Settingupthegame": 1 }
    },
    "marker": {
      "0": { "Settingupthegame": 2 }
    },
    "markers": {
      "0": { "EditingGUIs": 1 }
    },
    "marks": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Marks": {
      "0": { "Globalfunctions_General": 2 }
    },
    "Martin": {
      "0": { "Credits": 1 }
    },
    "Mary": {
      "0": { "ScriptKeywords": 2 }
    },
    "Mask": {
      "0": { "Settingupthegame": 1 }
    },
    "mask": {
      "0": { "UpgradeTo350": 7 },
      "1": { "AdvancedRoomFeatures": 3 },
      "2": { "DynamicSprite": 2 },
      "3": { "acintro2": 1 }
    },
    "MaskResolution": {
      "0": { "UpgradeTo350": 1 }
    },
    "masks": {
      "0": { "UpgradeTo350": 7 },
      "1": { "EditorRoom": 4 },
      "2": { "Settingupthegame": 2 },
      "3": { "StandardEnums": 1 }
    },
    "massive": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "master": {
      "0": { "System": 1 }
    },
    "masterkey": {
      "0": { "Tumbleweed_door": 1 }
    },
    "match": {
      "0": { "String": 11 },
      "1": { "ScriptKeywords": 7 },
      "2": { "TextParser": 6 },
      "3": { "Screen": 1 }
    },
    "Match": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "matched": {
      "0": { "Globalfunctions_General": 2 }
    },
    "matches": {
      "0": { "Screen": 2 },
      "1": { "Lipsync": 1 }
    },
    "matching": {
      "0": { "ScriptKeywords": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "material": {
      "0": { "Copyright": 1 }
    },
    "Math": {
      "0": { "Tumbleweed": 1 }
    },
    "Maths": {
      "0": { "Maths": 115 },
      "1": { "ExtenderFunctions": 3 },
      "2": { "StringFormats": 2 },
      "3": { "Scripting": 1 }
    },
    "matter": {
      "0": { "ScriptKeywords": 1 }
    },
    "Matthew": {
      "0": { "Credits": 2 }
    },
    "max": {
      "0": { "Globalfunctions_General": 1 }
    },
    "MAX": {
      "0": { "ScriptKeywords": 6 },
      "1": { "OOProgramming": 4 },
      "2": { "EditingGUIs": 3 },
      "3": { "Globalfunctions_General": 2 },
      "4": { "Slider": 1 }
    },
    "Max": {
      "0": { "Slider": 8 },
      "1": { "Setup": 1 }
    },
    "MaxChannels": {
      "0": { "MusicAndSound": 1 }
    },
    "Maxim": {
      "0": { "Credits": 1 }
    },
    "maximal": {
      "0": { "UpgradeTo34": 2 },
      "1": { "Object": 1 }
    },
    "Maximum": {
      "0": { "Gamevariables": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "maximum": {
      "0": { "ScriptKeywords": 4 },
      "1": { "Slider": 3 },
      "2": { "EditingGUIs": 2 },
      "3": { "Globalfunctions_Message": 1 }
    },
    "maximums": {
      "0": { "SystemLimits": 1 }
    },
    "MAY": {
      "0": { "Copyright": 1 }
    },
    "may": {
      "0": { "Settingupthegame": 22 },
      "1": { "UpgradeTo350": 16 },
      "2": { "ScriptKeywords": 12 },
      "3": { "Camera": 10 },
      "4": { "Viewport": 9 },
      "5": { "Game": 8 },
      "6": { "ScriptingTutorialPart2": 6 },
      "7": { "Globalfunctions_General": 5 },
      "8": { "acintro1": 4 },
      "9": { "DistGame": 3 },
      "10": { "Globalfunctions_Room": 2 },
      "11": { "Region": 1 }
    },
    "May": {
      "0": { "Settingupthegame": 1 }
    },
    "maybe": {
      "0": { "EditorInventoryItems": 1 }
    },
    "Mb": {
      "0": { "DistGame": 1 }
    },
    "MB-sized": {
      "0": { "Settingupthegame": 1 }
    },
    "McCrea": {
      "0": { "Credits": 1 }
    },
    "ME": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "me": {
      "0": { "Tumbleweed": 2 },
      "1": { "Character": 1 }
    },
    "mean": {
      "0": { "Character": 6 },
      "1": { "ScriptKeywords": 2 },
      "2": { "UpgradingTo271": 1 }
    },
    "meaning": {
      "0": { "StringFormats": 4 },
      "1": { "Character": 2 },
      "2": { "Region": 1 }
    },
    "meaningless": {
      "0": { "Character": 5 }
    },
    "meanings": {
      "0": { "Settingupthegame": 1 }
    },
    "means": {
      "0": { "Character": 11 },
      "1": { "Settingupthegame": 10 },
      "2": { "ScriptingTutorialPart1": 7 },
      "3": { "EditingGUIs": 4 },
      "4": { "Object": 3 },
      "5": { "Globalfunctions_Room": 2 },
      "6": { "EditorView": 1 }
    },
    "meant": {
      "0": { "Settingupthegame": 3 },
      "1": { "Pointers": 1 }
    },
    "Meanwhile": {
      "0": { "OOProgramming": 1 }
    },
    "meanwhile": {
      "0": { "Character": 1 }
    },
    "measurements": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "mechanics": {
      "0": { "Templates": 1 }
    },
    "mechanism": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "Media": {
      "0": { "Multimedia": 2 }
    },
    "medium": {
      "0": { "Globalfunctions_General": 1 }
    },
    "meets": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "member": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Pointers": 1 }
    },
    "members": {
      "0": { "ScriptKeywords": 5 },
      "1": { "OOProgramming": 3 },
      "2": { "Pointers": 1 }
    },
    "memory": {
      "0": { "DynamicSprite": 31 },
      "1": { "Pointers": 4 },
      "2": { "ScriptKeywords": 3 },
      "3": { "TroubleshootingWindowsZoneID": 2 },
      "4": { "Globalfunctions_Room": 1 }
    },
    "mention": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "mentioned": {
      "0": { "Tumbleweed_player": 1 }
    },
    "mentioning": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "Menu": {
      "0": { "EditorView": 3 },
      "1": { "MusicAndSound": 1 }
    },
    "menu": {
      "0": { "SourceControl": 2 },
      "1": { "ScriptingTutorialPart2": 1 }
    },
    "MERCHANT": {
      "0": { "acintro8": 1 }
    },
    "Merchant": {
      "0": { "acintro8": 4 }
    },
    "merchant's": {
      "0": { "acintro8": 1 }
    },
    "MERCHANTABILITY": {
      "0": { "Copyright": 1 }
    },
    "merge": {
      "0": { "Object": 1 }
    },
    "merged": {
      "0": { "Object": 2 }
    },
    "MergeIntoBackground": {
      "0": { "Object": 3 }
    },
    "MergeObject": {
      "0": { "Object": 1 }
    },
    "Merges": {
      "0": { "Object": 1 }
    },
    "merrily": {
      "0": { "Debuggingfeatures": 1 }
    },
    "mess": {
      "0": { "TextParser": 1 }
    },
    "Message": {
      "0": { "Room": 2 },
      "1": { "Tumbleweed_movement": 1 }
    },
    "message": {
      "0": { "Globalfunctions_Message": 30 },
      "1": { "Character": 15 },
      "2": { "Game": 13 },
      "3": { "System": 9 },
      "4": { "Globalfunctions_General": 8 },
      "5": { "Room": 7 },
      "6": { "Region": 6 },
      "7": { "StringFormats": 5 },
      "8": { "Gamevariables": 4 },
      "9": { "Parser": 3 },
      "10": { "Overlay": 2 },
      "11": { "Mouse": 1 }
    },
    "MESSAGE": {
      "0": { "Character": 3 },
      "1": { "Globalfunctions_Message": 1 }
    },
    "messagebox": {
      "0": { "Templates": 1 }
    },
    "Messages": {
      "0": { "Room": 3 },
      "1": { "Game": 1 }
    },
    "messages": {
      "0": { "AutonumberSpeechFiles": 3 },
      "1": { "Tumbleweed_door": 2 },
      "2": { "ContactingTheDevelopers": 1 }
    },
    "messy": {
      "0": { "Pointers": 2 },
      "1": { "ScriptingTutorialPart2": 1 }
    },
    "met": {
      "0": { "ScriptKeywords": 1 }
    },
    "method": {
      "0": { "Setup": 3 },
      "1": { "DrawingSurfaceFunctions": 2 },
      "2": { "Pointers": 1 }
    },
    "methods": {
      "0": { "OOProgramming": 3 },
      "1": { "Pointers": 2 },
      "2": { "ListBox": 1 }
    },
    "MI-Style": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "mice": {
      "0": { "Settingupthegame": 1 }
    },
    "michael": {
      "0": { "MusicAndSound": 2 }
    },
    "Michael": {
      "0": { "Credits": 2 }
    },
    "Microsoft": {
      "0": { "Copyright": 1 }
    },
    "MIDDLE": {
      "0": { "TextScriptEvents": 1 }
    },
    "middle": {
      "0": { "DrawingSurfaceFunctions": 5 },
      "1": { "acintro2": 3 },
      "2": { "Globalfunctions_Message": 2 },
      "3": { "UpgradeTo350": 1 }
    },
    "middle-left": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "MIDI": {
      "0": { "AudioChannel": 6 },
      "1": { "MusicAndSound": 3 }
    },
    "might": {
      "0": { "MusicAndSound": 9 },
      "1": { "Game": 6 },
      "2": { "Settingupthegame": 5 },
      "3": { "ScriptKeywords": 3 },
      "4": { "Tumbleweed": 2 },
      "5": { "acintro5": 1 }
    },
    "migrated": {
      "0": { "UpgradeTo341": 1 }
    },
    "milliseconds": {
      "0": { "AudioChannel": 6 },
      "1": { "Game": 2 },
      "2": { "EventTypes": 1 }
    },
    "mimic": {
      "0": { "Globalfunctions_General": 1 }
    },
    "MIN": {
      "0": { "Globalfunctions_Room": 4 },
      "1": { "EditingGUIs": 3 },
      "2": { "Slider": 1 }
    },
    "min": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "Min": {
      "0": { "Slider": 8 }
    },
    "mind": {
      "0": { "GUIControl": 1 }
    },
    "mine": {
      "0": { "Tumbleweed": 1 }
    },
    "mini-CPU": {
      "0": { "BlockingScripts": 1 }
    },
    "mini-crosshair": {
      "0": { "Settingupthegame": 1 }
    },
    "mini-game": {
      "0": { "Globalfunctions_General": 1 }
    },
    "mini-program": {
      "0": { "ScriptingLanguage": 1 }
    },
    "mini-screenshot": {
      "0": { "Settingupthegame": 1 }
    },
    "minimal": {
      "0": { "Gamevariables": 1 }
    },
    "Minimum": {
      "0": { "Gamevariables": 1 }
    },
    "minimum": {
      "0": { "Slider": 3 },
      "1": { "AnonymousUsageInfo": 1 }
    },
    "MinimumTextDisplayTimeMs": {
      "0": { "Game": 5 }
    },
    "minor": {
      "0": { "acintro1": 1 }
    },
    "minus": {
      "0": { "String": 2 },
      "1": { "ListBox": 1 }
    },
    "minute": {
      "0": { "DateTime": 2 }
    },
    "Minute": {
      "0": { "DateTime": 4 }
    },
    "minutes": {
      "0": { "RepExec": 1 }
    },
    "mirrored": {
      "0": { "acintro7": 1 }
    },
    "misbehavior": {
      "0": { "Settingupthegame": 1 }
    },
    "Misj": {
      "0": { "Credits": 1 }
    },
    "mismatch": {
      "0": { "Globalfunctions_General": 1 }
    },
    "missed": {
      "0": { "acintro7": 1 }
    },
    "missing": {
      "0": { "ScriptKeywords": 1 }
    },
    "mistake": {
      "0": { "Setup": 1 }
    },
    "mistakes": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "Pointers": 1 }
    },
    "misuse": {
      "0": { "UpgradeTo350": 1 }
    },
    "MIT": {
      "0": { "Tumbleweed": 1 }
    },
    "mitigate": {
      "0": { "UpgradeTo30": 1 }
    },
    "MOD": {
      "0": { "AudioChannel": 2 },
      "1": { "Credits": 1 }
    },
    "modal": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Mode": {
      "0": { "Mouse": 15 },
      "1": { "acintro9": 6 },
      "2": { "Settingupthegame": 5 },
      "3": { "TemplateSierraStyle": 3 },
      "4": { "Debuggingfeatures": 2 },
      "5": { "Globalfunctions_General": 1 }
    },
    "MODE": {
      "0": { "Mouse": 5 },
      "1": { "Globalfunctions_General": 4 },
      "2": { "File": 2 },
      "3": { "Hotspot": 1 }
    },
    "mode": {
      "0": { "Mouse": 27 },
      "1": { "EventTypes": 22 },
      "2": { "Settingupthegame": 18 },
      "3": { "Globalfunctions_General": 14 },
      "4": { "Gamevariables": 6 },
      "5": { "Setup": 5 },
      "6": { "System": 4 },
      "7": { "acintro4": 3 },
      "8": { "AdvancedRoomFeatures": 2 },
      "9": { "Region": 1 }
    },
    "mode's": {
      "0": { "Mouse": 3 }
    },
    "modern": {
      "0": { "acintro1": 2 },
      "1": { "GUIControl": 1 }
    },
    "modes": {
      "0": { "Settingupthegame": 4 },
      "1": { "Mouse": 3 },
      "2": { "EventTypes": 2 },
      "3": { "Tumbleweed": 1 }
    },
    "Modes": {
      "0": { "Settingupthegame": 1 }
    },
    "modification": {
      "0": { "OOProgramming": 1 }
    },
    "modified": {
      "0": { "ScriptKeywords": 2 },
      "1": { "TemplateBASS": 1 }
    },
    "modifier": {
      "0": { "ScriptKeywords": 1 }
    },
    "modifiers": {
      "0": { "OOProgramming": 1 }
    },
    "modifies": {
      "0": { "Settingupthegame": 3 },
      "1": { "Speech": 1 }
    },
    "modify": {
      "0": { "Character": 5 },
      "1": { "Room": 2 },
      "2": { "Scripting": 1 }
    },
    "modifying": {
      "0": { "Globalfunctions_General": 1 }
    },
    "module": {
      "0": { "ScriptKeywords": 3 },
      "1": { "TemplateVerbcoin": 2 },
      "2": { "UpgradeTo30": 1 }
    },
    "module's": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Modules": {
      "0": { "ScriptModules": 1 }
    },
    "modules": {
      "0": { "Game": 8 },
      "1": { "Tumbleweed": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Mogilko": {
      "0": { "Credits": 1 }
    },
    "moment": {
      "0": { "acintro2": 2 },
      "1": { "GUIControl": 1 }
    },
    "monash": {
      "0": { "Lipsync": 1 }
    },
    "MONEY": {
      "0": { "Copyright": 1 }
    },
    "monitor": {
      "0": { "System": 1 }
    },
    "monitor's": {
      "0": { "System": 1 }
    },
    "monitors": {
      "0": { "Setup": 2 }
    },
    "Monkey": {
      "0": { "acintro3": 1 }
    },
    "monster": {
      "0": { "Room": 1 }
    },
    "month": {
      "0": { "DateTime": 4 },
      "1": { "AnonymousUsageInfo": 1 }
    },
    "Month": {
      "0": { "DateTime": 4 }
    },
    "months": {
      "0": { "ScriptKeywords": 1 }
    },
    "Morales": {
      "0": { "Credits": 1 }
    },
    "more": {
      "0": { "Settingupthegame": 13 },
      "1": { "ScriptingTutorialPart1": 7 },
      "2": { "UpgradingTo27": 6 },
      "3": { "Character": 5 },
      "4": { "UpgradeTo32": 4 },
      "5": { "FAQ": 3 },
      "6": { "acintro5": 2 },
      "7": { "SystemRequirements": 1 }
    },
    "More": {
      "0": { "MusicAndSound": 1 }
    },
    "Morgan": {
      "0": { "Credits": 1 }
    },
    "most": {
      "0": { "Settingupthegame": 5 },
      "1": { "ScriptKeywords": 2 },
      "2": { "Translations": 1 }
    },
    "Most": {
      "0": { "Settingupthegame": 3 },
      "1": { "UpgradingTo27": 2 },
      "2": { "SourceControl": 1 }
    },
    "mostly": {
      "0": { "UpgradeTo30": 1 }
    },
    "Mostly": {
      "0": { "EditorInventoryItems": 1 }
    },
    "motion": {
      "0": { "EditorView": 1 }
    },
    "mouse": {
      "0": { "Mouse": 79 },
      "1": { "Globalfunctions_General": 21 },
      "2": { "Settingupthegame": 17 },
      "3": { "CustomDialogOptions": 14 },
      "4": { "GUIControl": 11 },
      "5": { "InventoryItem": 10 },
      "6": { "acintro9": 9 },
      "7": { "Speech": 8 },
      "8": { "Pointers": 6 },
      "9": { "Object": 5 },
      "10": { "Region": 4 },
      "11": { "EditorInventoryItems": 3 },
      "12": { "Viewport": 2 },
      "13": { "TemplateVerbcoin": 1 }
    },
    "Mouse": {
      "0": { "Mouse": 59 },
      "1": { "StandardEnums": 8 },
      "2": { "Hotspot": 3 },
      "3": { "Setup": 2 },
      "4": { "EditorInventoryItems": 1 }
    },
    "mouse's": {
      "0": { "TextScriptEvents": 1 }
    },
    "mouse-cursor": {
      "0": { "EditorInventoryItems": 1 }
    },
    "mouse-over": {
      "0": { "Button": 4 }
    },
    "MouseButton": {
      "0": { "Mouse": 2 },
      "1": { "CustomDialogOptions": 1 }
    },
    "mouseclick": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "MouseCursorCount": {
      "0": { "Game": 3 }
    },
    "mouseover": {
      "0": { "GUIControl": 1 }
    },
    "MouseOverGraphic": {
      "0": { "Button": 7 }
    },
    "mouseOverHotspot": {
      "0": { "Pointers": 7 }
    },
    "MOUSEWHEEL": {
      "0": { "Globalfunctions_General": 1 }
    },
    "MouseYPos": {
      "0": { "GUI": 2 }
    },
    "mouth": {
      "0": { "Gamevariables": 2 },
      "1": { "Speech": 1 }
    },
    "move": {
      "0": { "Character": 26 },
      "1": { "GUIControl": 8 },
      "2": { "Settingupthegame": 7 },
      "3": { "TemplateSierraStyle": 6 },
      "4": { "Object": 5 },
      "5": { "TroubleshootingWindowsZoneID": 3 },
      "6": { "ScriptKeywords": 2 },
      "7": { "File": 1 }
    },
    "Move": {
      "0": { "Character": 17 },
      "1": { "Object": 6 },
      "2": { "StandardEnums": 4 },
      "3": { "ScriptKeywords": 2 },
      "4": { "acintro2": 1 }
    },
    "MoveCharacter": {
      "0": { "Character": 3 },
      "1": { "ScriptKeywords": 2 }
    },
    "MoveCharacterBlocking": {
      "0": { "Character": 1 }
    },
    "MoveCharacterDirect": {
      "0": { "Character": 1 }
    },
    "MoveCharacterPath": {
      "0": { "Character": 1 }
    },
    "MoveCharacterStraight": {
      "0": { "Character": 1 }
    },
    "MoveCharacterToHotspot": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "Hotspot": 2 }
    },
    "MoveCharacterToObject": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "Character": 2 }
    },
    "moved": {
      "0": { "UpgradeTo350": 3 },
      "1": { "Mouse": 1 }
    },
    "movement": {
      "0": { "Tumbleweed_movement": 11 },
      "1": { "Character": 9 },
      "2": { "Settingupthegame": 5 },
      "3": { "Mouse": 4 },
      "4": { "Globalfunctions_General": 2 },
      "5": { "RepExec": 1 }
    },
    "movement-linked": {
      "0": { "Character": 1 }
    },
    "MovementLinkedToAnimation": {
      "0": { "Character": 4 }
    },
    "MovementSpeed": {
      "0": { "Settingupthegame": 1 }
    },
    "MoveObject": {
      "0": { "Object": 3 }
    },
    "MoveObjectDirect": {
      "0": { "Object": 1 }
    },
    "MoveOverlay": {
      "0": { "Overlay": 2 }
    },
    "movePlayer": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "MovePlayer": {
      "0": { "Tumbleweed_movement": 7 }
    },
    "MovePlayerEx": {
      "0": { "Tumbleweed_movement": 7 }
    },
    "Moves": {
      "0": { "Character": 3 },
      "1": { "Tumbleweed_movement": 2 },
      "2": { "GUIControl": 1 }
    },
    "moves": {
      "0": { "Character": 6 },
      "1": { "GUI": 3 },
      "2": { "EventTypes": 2 },
      "3": { "Globalfunctions_Room": 1 }
    },
    "MoveToWalkableArea": {
      "0": { "Character": 1 }
    },
    "moving": {
      "0": { "Character": 27 },
      "1": { "Object": 9 },
      "2": { "UpgradingTo27": 4 },
      "3": { "UpgradeTo350": 3 },
      "4": { "Globalfunctions_General": 2 },
      "5": { "UpgradeTo341": 1 }
    },
    "Moving": {
      "0": { "Character": 11 },
      "1": { "Object": 7 },
      "2": { "ScriptKeywords": 4 },
      "3": { "Mouse": 1 }
    },
    "MPG": {
      "0": { "Multimedia": 2 }
    },
    "mpg": {
      "0": { "Multimedia": 2 }
    },
    "ms": {
      "0": { "AudioChannel": 3 }
    },
    "MSCCI": {
      "0": { "SourceControl": 1 }
    },
    "Much": {
      "0": { "ScriptKeywords": 1 }
    },
    "much": {
      "0": { "acintro6": 4 },
      "1": { "UpgradingTo27": 3 },
      "2": { "MusicAndSound": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "multi-character": {
      "0": { "UpgradingTo27": 1 }
    },
    "multi-language": {
      "0": { "Tumbleweed": 1 }
    },
    "multilayer": {
      "0": { "UpgradeTo350": 1 }
    },
    "multimedia": {
      "0": { "Scripting": 1 }
    },
    "Multimedia": {
      "0": { "Multimedia": 1 }
    },
    "Multiple": {
      "0": { "ScriptingLanguage": 1 }
    },
    "multiple": {
      "0": { "Settingupthegame": 3 },
      "1": { "ScriptKeywords": 2 },
      "2": { "ScriptModules": 1 }
    },
    "MULTIPLEINV": {
      "0": { "Globalfunctions_General": 1 }
    },
    "multiplied": {
      "0": { "Maths": 2 }
    },
    "multiplier": {
      "0": { "Setup": 3 }
    },
    "Multiply": {
      "0": { "ScriptKeywords": 1 }
    },
    "music": {
      "0": { "MusicAndSound": 13 },
      "1": { "Multimedia": 6 },
      "2": { "Game": 5 },
      "3": { "acintro4": 4 },
      "4": { "UpgradeTo32": 3 },
      "5": { "Globalfunctions_General": 2 },
      "6": { "SourceControl": 1 }
    },
    "Music": {
      "0": { "MusicAndSound": 5 },
      "1": { "UpgradeTo32": 3 },
      "2": { "Multimedia": 1 }
    },
    "musical": {
      "0": { "Game": 1 }
    },
    "MusicOnLoad": {
      "0": { "Room": 3 }
    },
    "MusicVolumeAdjustment": {
      "0": { "acintro4": 1 }
    },
    "must": {
      "0": { "Settingupthegame": 11 },
      "1": { "Globalfunctions_General": 10 },
      "2": { "DynamicSprite": 6 },
      "3": { "File": 5 },
      "4": { "IntegrationWithWindows": 4 },
      "5": { "Game": 3 },
      "6": { "Maths": 2 },
      "7": { "Slider": 1 }
    },
    "MUST": {
      "0": { "DynamicSprite": 7 },
      "1": { "ScriptKeywords": 2 },
      "2": { "ScriptingTutorialPart2": 1 }
    },
    "Mutable": {
      "0": { "UpgradeTo34": 1 }
    },
    "mute": {
      "0": { "Multimedia": 1 }
    },
    "muted": {
      "0": { "Multimedia": 2 }
    },
    "My": {
      "0": { "Game": 5 },
      "1": { "Character": 2 },
      "2": { "TextWindowGUI": 1 }
    },
    "my": {
      "0": { "ScriptKeywords": 18 },
      "1": { "Globalfunctions_Message": 5 },
      "2": { "Settingupthegame": 4 },
      "3": { "acintro3": 2 },
      "4": { "TextWindowGUI": 1 }
    },
    "my-key": {
      "0": { "Dictionary": 3 }
    },
    "my-value": {
      "0": { "Dictionary": 2 }
    },
    "MyAccount": {
      "0": { "TroubleshootingWindowsZoneID": 2 }
    },
    "myCounter": {
      "0": { "ScriptingTutorialPart1": 28 }
    },
    "myDictionary": {
      "0": { "Dictionary": 17 }
    },
    "MYDOCS": {
      "0": { "Game": 3 }
    },
    "MyGame": {
      "0": { "Globalfunctions_General": 2 }
    },
    "myless": {
      "0": { "Lipsync": 1 }
    },
    "MyMethod": {
      "0": { "ScriptKeywords": 5 }
    },
    "myOverlay": {
      "0": { "Overlay": 12 }
    },
    "MySay": {
      "0": { "TextWindowGUI": 3 }
    },
    "mySet": {
      "0": { "Set": 11 }
    },
    "mystring": {
      "0": { "String": 16 }
    },
    "myString": {
      "0": { "String": 8 }
    },
    "MyStruct": {
      "0": { "ScriptKeywords": 4 }
    },
    "mytext": {
      "0": { "String": 17 }
    },
    "myValue": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Dictionary": 2 }
    },
    "myVariable": {
      "0": { "GlobalVariables": 5 }
    },
    "myViewport": {
      "0": { "Viewport": 2 }
    },
    "n-th": {
      "0": { "Tumbleweed_extensions": 1 }
    },
    "naive": {
      "0": { "CustomDialogOptions": 1 }
    },
    "name": {
      "0": { "Settingupthegame": 20 },
      "1": { "ScriptingTutorialPart1": 18 },
      "2": { "ScriptKeywords": 15 },
      "3": { "Game": 14 },
      "4": { "Character": 9 },
      "5": { "Globalfunctions_General": 8 },
      "6": { "acintro3": 7 },
      "7": { "UpgradingTo27": 6 },
      "8": { "FAQ": 5 },
      "9": { "acintro1": 4 },
      "10": { "acintro4": 3 },
      "11": { "Tumbleweed": 2 },
      "12": { "CustomProperties": 1 }
    },
    "NAME": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "Name": {
      "0": { "Game": 7 },
      "1": { "InventoryItem": 5 },
      "2": { "Character": 4 },
      "3": { "Hotspot": 3 },
      "4": { "ScriptKeywords": 2 },
      "5": { "acintro3": 1 }
    },
    "named": {
      "0": { "OOProgramming": 4 },
      "1": { "DistGame": 2 },
      "2": { "Translations": 1 }
    },
    "names": {
      "0": { "OOProgramming": 3 },
      "1": { "UpgradingTo27": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "Names": {
      "0": { "OOProgramming": 5 },
      "1": { "Gamevariables": 1 }
    },
    "naming": {
      "0": { "ScriptingTutorialPart2": 2 },
      "1": { "UpgradeTo32": 1 }
    },
    "Naming": {
      "0": { "acintro2": 1 }
    },
    "NARR": {
      "0": { "Gamevariables": 1 }
    },
    "Narrate": {
      "0": { "Settingupthegame": 1 }
    },
    "narration": {
      "0": { "Settingupthegame": 1 }
    },
    "NARRATOR": {
      "0": { "Gamevariables": 1 }
    },
    "narrator": {
      "0": { "Settingupthegame": 5 },
      "1": { "Gamevariables": 2 }
    },
    "nasty": {
      "0": { "Globalfunctions_General": 1 }
    },
    "native": {
      "0": { "UpgradeTo31": 7 },
      "1": { "System": 6 },
      "2": { "Setup": 3 },
      "3": { "Screen": 2 },
      "4": { "Settingupthegame": 1 }
    },
    "natural": {
      "0": { "Maths": 2 }
    },
    "Naturally": {
      "0": { "Setup": 1 }
    },
    "naturally": {
      "0": { "ScriptKeywords": 1 }
    },
    "nature": {
      "0": { "ScriptKeywords": 1 }
    },
    "navigate": {
      "0": { "acintro1": 1 }
    },
    "navigated": {
      "0": { "EditorRoom": 1 }
    },
    "navigating": {
      "0": { "MusicAndSound": 1 }
    },
    "navigation": {
      "0": { "UpgradeTo350": 2 }
    },
    "ncolor": {
      "0": { "CustomDialogOptions": 4 }
    },
    "nearest": {
      "0": { "Maths": 2 },
      "1": { "GUIControl": 1 }
    },
    "nearest-neighbor": {
      "0": { "Setup": 2 }
    },
    "neat": {
      "0": { "Multimedia": 1 }
    },
    "neater": {
      "0": { "ScriptKeywords": 1 }
    },
    "necessarily": {
      "0": { "acintro8": 1 }
    },
    "necessary": {
      "0": { "Maths": 2 },
      "1": { "Mouse": 1 }
    },
    "necessity": {
      "0": { "Settingupthegame": 1 }
    },
    "need": {
      "0": { "Game": 20 },
      "1": { "Settingupthegame": 13 },
      "2": { "ScriptKeywords": 11 },
      "3": { "Tumbleweed": 8 },
      "4": { "Globalfunctions_General": 7 },
      "5": { "acintro4": 6 },
      "6": { "acintro1": 5 },
      "7": { "UpgradeTo34": 4 },
      "8": { "EditingGUIs": 3 },
      "9": { "UpgradingTo271": 2 },
      "10": { "ContactingTheDevelopers": 1 }
    },
    "needed": {
      "0": { "ScriptKeywords": 2 },
      "1": { "EditorView": 1 }
    },
    "needing": {
      "0": { "acintro2": 1 }
    },
    "NEEDLE": {
      "0": { "String": 1 }
    },
    "needle": {
      "0": { "String": 5 }
    },
    "needs": {
      "0": { "acintro2": 4 },
      "1": { "ScriptingTutorialPart1": 3 },
      "2": { "acintro4": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "negative": {
      "0": { "Settingupthegame": 2 },
      "1": { "Region": 1 }
    },
    "Neil": {
      "0": { "Credits": 1 }
    },
    "Neither": {
      "0": { "Copyright": 2 }
    },
    "neither": {
      "0": { "Character": 1 }
    },
    "nerdy": {
      "0": { "Settingupthegame": 1 }
    },
    "nested": {
      "0": { "ScriptKeywords": 1 }
    },
    "Net": {
      "0": { "Credits": 1 }
    },
    "NET": {
      "0": { "SystemRequirements": 2 },
      "1": { "Credits": 1 }
    },
    "net": {
      "0": { "Credits": 2 }
    },
    "Never": {
      "0": { "acintro2": 1 }
    },
    "never": {
      "0": { "Settingupthegame": 2 },
      "1": { "DialogOptionsRenderingInfo": 1 }
    },
    "NEVER": {
      "0": { "Mouse": 1 }
    },
    "new": {
      "0": { "Character": 34 },
      "1": { "DynamicSprite": 20 },
      "2": { "Settingupthegame": 18 },
      "3": { "String": 17 },
      "4": { "UpgradingTo27": 14 },
      "5": { "acintro8": 13 },
      "6": { "ScriptKeywords": 11 },
      "7": { "UpgradeTo32": 9 },
      "8": { "UpgradeTo350": 8 },
      "9": { "UpgradeTo30": 7 },
      "10": { "Globalfunctions_General": 6 },
      "11": { "Object": 5 },
      "12": { "UpgradeTo34": 4 },
      "13": { "DynamicArrays": 3 },
      "14": { "Gamevariables": 2 },
      "15": { "StringFormats": 1 }
    },
    "NEW": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Globalfunctions_General": 2 }
    },
    "New": {
      "0": { "EditingGUIs": 5 },
      "1": { "Settingupthegame": 4 },
      "2": { "acintro8": 3 },
      "3": { "UpgradingTo27": 2 },
      "4": { "Translations": 1 }
    },
    "new-String": {
      "0": { "ScriptKeywords": 1 }
    },
    "new-style": {
      "0": { "ScriptKeywords": 3 },
      "1": { "UpgradingTo271": 1 }
    },
    "newbies": {
      "0": { "Pointers": 1 }
    },
    "NEWCHAR": {
      "0": { "String": 1 }
    },
    "newChar": {
      "0": { "String": 1 }
    },
    "NEWCOLOR": {
      "0": { "Character": 1 }
    },
    "newer": {
      "0": { "UpgradeTo34": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "Setup": 1 }
    },
    "newest": {
      "0": { "UpgradeTo341": 1 }
    },
    "newitem": {
      "0": { "ListBox": 2 }
    },
    "NEWITEM": {
      "0": { "ListBox": 2 }
    },
    "newline": {
      "0": { "File": 1 }
    },
    "newly": {
      "0": { "Settingupthegame": 1 }
    },
    "newPosition": {
      "0": { "Character": 3 }
    },
    "NewRoom": {
      "0": { "Character": 1 }
    },
    "newRoom": {
      "0": { "Tumbleweed_player": 1 }
    },
    "NewRoomEx": {
      "0": { "Character": 1 }
    },
    "NewRoomNPC": {
      "0": { "Character": 1 }
    },
    "newSprite": {
      "0": { "DynamicSprite": 2 }
    },
    "newstring": {
      "0": { "String": 3 }
    },
    "newTranslationName": {
      "0": { "Game": 2 }
    },
    "newWidth": {
      "0": { "Globalfunctions_General": 3 }
    },
    "next": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "Settingupthegame": 4 },
      "2": { "ScriptKeywords": 3 },
      "3": { "acintro8": 2 },
      "4": { "acintro4": 1 }
    },
    "Next": {
      "0": { "acintro1": 2 },
      "1": { "acintro2": 1 }
    },
    "nic": {
      "0": { "Credits": 1 }
    },
    "nice": {
      "0": { "EditingGUIs": 1 }
    },
    "Nick": {
      "0": { "Credits": 1 }
    },
    "niftier": {
      "0": { "GUIControl": 1 }
    },
    "niggly": {
      "0": { "Character": 1 }
    },
    "nightBackground": {
      "0": { "DrawingSurfaceFunctions": 3 }
    },
    "nimm": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "NL": {
      "0": { "Tumbleweed": 1 }
    },
    "NNN": {
      "0": { "UpgradeTo350": 1 }
    },
    "No-Block": {
      "0": { "BlockingScripts": 1 }
    },
    "NOBODY": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "node": {
      "0": { "Settingupthegame": 10 },
      "1": { "acintro2": 5 },
      "2": { "acintro8": 4 },
      "3": { "acintro7": 3 },
      "4": { "MusicAndSound": 2 },
      "5": { "Translations": 1 }
    },
    "noloopcheck": {
      "0": { "ScriptKeywords": 8 }
    },
    "non": {
      "0": { "Character": 1 }
    },
    "non-accelerated": {
      "0": { "System": 1 }
    },
    "non-blocking": {
      "0": { "Game": 3 },
      "1": { "Tumbleweed_movement": 2 },
      "2": { "CustomDialogOptions": 1 }
    },
    "Non-Clickable": {
      "0": { "GUI": 1 }
    },
    "non-clickable": {
      "0": { "Tumbleweed_door": 1 }
    },
    "non-deprecated": {
      "0": { "Settingupthegame": 1 }
    },
    "non-English": {
      "0": { "Translations": 1 }
    },
    "non-player": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "non-room": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Game": 1 }
    },
    "non-selected": {
      "0": { "ListBox": 1 }
    },
    "non-state": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "non-text": {
      "0": { "Room": 2 }
    },
    "non-textwindow": {
      "0": { "Settingupthegame": 1 }
    },
    "non-voice": {
      "0": { "Lipsync": 1 }
    },
    "non-walkable": {
      "0": { "Character": 1 }
    },
    "non-zero": {
      "0": { "Maths": 2 }
    },
    "None": {
      "0": { "Setup": 1 }
    },
    "none": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "ASCIIcodes": 1 }
    },
    "Nope": {
      "0": { "UpgradingTo27": 1 }
    },
    "nor": {
      "0": { "Copyright": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "norm": {
      "0": { "Settingupthegame": 1 }
    },
    "Normal": {
      "0": { "EditingGUIs": 2 },
      "1": { "Globalfunctions_Message": 1 }
    },
    "normal": {
      "0": { "Character": 22 },
      "1": { "Settingupthegame": 11 },
      "2": { "GUI": 8 },
      "3": { "DynamicSprite": 7 },
      "4": { "Globalfunctions_Room": 5 },
      "5": { "acintro9": 4 },
      "6": { "StringFormats": 2 },
      "7": { "Game": 1 }
    },
    "NormalFont": {
      "0": { "Game": 4 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "acintro9": 1 }
    },
    "NormalGraphic": {
      "0": { "Button": 12 },
      "1": { "DynamicSprite": 3 },
      "2": { "GUIControl": 2 },
      "3": { "Label": 1 }
    },
    "normally": {
      "0": { "Settingupthegame": 7 },
      "1": { "Globalfunctions_General": 4 },
      "2": { "ScriptKeywords": 3 },
      "3": { "Game": 2 },
      "4": { "AudioChannel": 1 }
    },
    "Normally": {
      "0": { "Settingupthegame": 6 },
      "1": { "Gamevariables": 2 },
      "2": { "GUIControl": 1 }
    },
    "NormalView": {
      "0": { "Character": 5 },
      "1": { "EditorCharacter": 1 }
    },
    "north": {
      "0": { "TextScriptEvents": 1 }
    },
    "notably": {
      "0": { "Setup": 1 }
    },
    "notation": {
      "0": { "DynamicArrays": 1 }
    },
    "NOTE": {
      "0": { "Character": 31 },
      "1": { "Globalfunctions_General": 30 },
      "2": { "Object": 22 },
      "3": { "Game": 15 },
      "4": { "Region": 12 },
      "5": { "String": 11 },
      "6": { "DrawingSurfaceFunctions": 10 },
      "7": { "DynamicSprite": 8 },
      "8": { "Speech": 7 },
      "9": { "ScriptKeywords": 6 },
      "10": { "Mouse": 5 },
      "11": { "AudioChannel": 4 },
      "12": { "acintro6": 3 },
      "13": { "UpgradeTo350": 2 },
      "14": { "EventTypes": 1 }
    },
    "note": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "Note": {
      "0": { "Settingupthegame": 9 },
      "1": { "Globalfunctions_General": 7 },
      "2": { "Character": 5 },
      "3": { "Room": 4 },
      "4": { "System": 3 },
      "5": { "UpgradeTo350": 2 },
      "6": { "DateTime": 1 }
    },
    "noted": {
      "0": { "Setup": 1 }
    },
    "Notepad": {
      "0": { "File": 1 }
    },
    "notes": {
      "0": { "UpgradeTo341": 1 }
    },
    "Nothing": {
      "0": { "acintro2": 1 }
    },
    "nothing": {
      "0": { "Globalfunctions_General": 9 },
      "1": { "TextScriptEvents": 5 },
      "2": { "Settingupthegame": 3 },
      "3": { "InvWindow": 2 },
      "4": { "acintro3": 1 }
    },
    "Notice": {
      "0": { "acintro4": 2 },
      "1": { "acintro2": 1 }
    },
    "notice": {
      "0": { "acintro7": 3 },
      "1": { "UpgradeTo31": 2 },
      "2": { "acintro5": 1 }
    },
    "noticeable": {
      "0": { "Multimedia": 1 }
    },
    "noticeably": {
      "0": { "Multimedia": 1 }
    },
    "noticed": {
      "0": { "Settingupthegame": 3 },
      "1": { "acintro8": 2 },
      "2": { "Translations": 1 }
    },
    "NOW": {
      "0": { "Globalfunctions_General": 1 }
    },
    "now": {
      "0": { "Character": 70 },
      "1": { "Object": 33 },
      "2": { "Game": 26 },
      "3": { "Mouse": 17 },
      "4": { "ListBox": 16 },
      "5": { "File": 15 },
      "6": { "AudioChannel": 13 },
      "7": { "UpgradingTo27": 12 },
      "8": { "Button": 11 },
      "9": { "ViewFrame": 9 },
      "10": { "UpgradeTo350": 8 },
      "11": { "Speech": 7 },
      "12": { "UpgradeTo32": 6 },
      "13": { "UpgradeTo30": 5 },
      "14": { "ScriptKeywords": 4 },
      "15": { "Translations": 3 },
      "16": { "Slider": 2 },
      "17": { "BlockingScripts": 1 }
    },
    "Now": {
      "0": { "DateTime": 19 },
      "1": { "acintro8": 7 },
      "2": { "BlockingScripts": 3 },
      "3": { "acintro5": 2 },
      "4": { "ScriptKeywords": 1 }
    },
    "NOWALKMODE": {
      "0": { "Globalfunctions_General": 1 }
    },
    "NPC": {
      "0": { "acintro3": 1 }
    },
    "NPCfacesplayer": {
      "0": { "Tumbleweed_movement": 3 }
    },
    "NPCGoToCharacter": {
      "0": { "Tumbleweed_movement": 4 }
    },
    "nr": {
      "0": { "Tumbleweed_door": 12 }
    },
    "NTFS": {
      "0": { "TroubleshootingWindowsZoneID": 4 }
    },
    "NULL": {
      "0": { "OOProgramming": 1 }
    },
    "null": {
      "0": { "DynamicSprite": 8 },
      "1": { "Pointers": 7 },
      "2": { "GUI": 6 },
      "3": { "Viewport": 5 },
      "4": { "GUIControl": 4 },
      "5": { "Game": 3 },
      "6": { "ScriptKeywords": 2 },
      "7": { "Screen": 1 }
    },
    "Null": {
      "0": { "GUI": 1 }
    },
    "num": {
      "0": { "InvWindow": 1 }
    },
    "NUM": {
      "0": { "System": 1 }
    },
    "Num": {
      "0": { "System": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "number": {
      "0": { "Character": 35 },
      "1": { "Settingupthegame": 22 },
      "2": { "Globalfunctions_General": 17 },
      "3": { "File": 12 },
      "4": { "Dialog": 11 },
      "5": { "InventoryItem": 9 },
      "6": { "Globalfunctions_Room": 8 },
      "7": { "DrawingSurfaceFunctions": 7 },
      "8": { "AudioChannel": 6 },
      "9": { "EditingGUIs": 5 },
      "10": { "ViewFrame": 4 },
      "11": { "UpgradeTo350": 3 },
      "12": { "UpgradingTo27": 2 },
      "13": { "UpgradeTo341": 1 }
    },
    "Number": {
      "0": { "Hotspot": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "NUMBER": {
      "0": { "Globalfunctions_Room": 2 },
      "1": { "DrawingSurfaceFunctions": 1 }
    },
    "number-based": {
      "0": { "Region": 1 }
    },
    "numbered": {
      "0": { "Game": 3 },
      "1": { "GUI": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Numbers": {
      "0": { "Character": 1 }
    },
    "numbers": {
      "0": { "ScriptKeywords": 4 },
      "1": { "Settingupthegame": 3 },
      "2": { "acintro7": 2 },
      "3": { "TroubleshootingWindowsZoneID": 1 }
    },
    "NUMCHARACTERS": {
      "0": { "Globalfunctions_General": 1 }
    },
    "numeric": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Hotspot": 1 }
    },
    "numerical": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "NUMFRAMES": {
      "0": { "Globalfunctions_General": 1 }
    },
    "numguis": {
      "0": { "Globalfunctions_General": 1 }
    },
    "NUMINVITEMS": {
      "0": { "Globalfunctions_General": 1 }
    },
    "numItems": {
      "0": { "ListBox": 1 }
    },
    "NumLock": {
      "0": { "System": 5 }
    },
    "NUMLOOPS": {
      "0": { "Globalfunctions_General": 1 }
    },
    "numobjects": {
      "0": { "Globalfunctions_General": 1 }
    },
    "NumPad": {
      "0": { "ASCIIcodes": 1 }
    },
    "nutshell": {
      "0": { "RepExec": 1 }
    },
    "o": {
      "0": { "String": 3 }
    },
    "O'Connor": {
      "0": { "Credits": 1 }
    },
    "O-Name": {
      "0": { "Character": 3 },
      "1": { "UpgradingTo27": 1 }
    },
    "obey": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "obeying": {
      "0": { "Character": 1 }
    },
    "OBJ": {
      "0": { "Character": 1 }
    },
    "obj": {
      "0": { "Character": 1 }
    },
    "OBJECT": {
      "0": { "Character": 1 }
    },
    "object": {
      "0": { "Object": 154 },
      "1": { "acintro4": 16 },
      "2": { "ScriptKeywords": 15 },
      "3": { "Globalfunctions_General": 12 },
      "4": { "EventTypes": 11 },
      "5": { "Settingupthegame": 10 },
      "6": { "DateTime": 8 },
      "7": { "EditorRoom": 7 },
      "8": { "Pointers": 6 },
      "9": { "Game": 5 },
      "10": { "FAQ": 4 },
      "11": { "Tumbleweed_extensions": 3 },
      "12": { "Mouse": 2 },
      "13": { "Region": 1 }
    },
    "Object": {
      "0": { "Object": 164 },
      "1": { "Character": 14 },
      "2": { "StandardEnums": 7 },
      "3": { "Settingupthegame": 5 },
      "4": { "CustomProperties": 4 },
      "5": { "Region": 3 },
      "6": { "ScriptKeywords": 2 },
      "7": { "EventTypes": 1 }
    },
    "object's": {
      "0": { "Object": 29 },
      "1": { "DrawingSurfaceFunctions": 1 }
    },
    "Object's": {
      "0": { "Object": 1 }
    },
    "object-based": {
      "0": { "UpgradingTo27": 7 },
      "1": { "ScriptingTutorialPart1": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "object-ized": {
      "0": { "UpgradeTo34": 1 }
    },
    "ObjectCount": {
      "0": { "Room": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "objectID": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "objective": {
      "0": { "acintro4": 1 }
    },
    "ObjectOff": {
      "0": { "Object": 1 }
    },
    "ObjectOn": {
      "0": { "Object": 1 }
    },
    "OBJECTS": {
      "0": { "ScriptKeywords": 1 }
    },
    "objects": {
      "0": { "AdvancedRoomFeatures": 6 },
      "1": { "EditorRoom": 5 },
      "2": { "UpgradeTo350": 4 },
      "3": { "Settingupthegame": 3 },
      "4": { "FAQ": 2 },
      "5": { "SystemLimits": 1 }
    },
    "Objects": {
      "0": { "acintro4": 4 },
      "1": { "acintro3": 2 },
      "2": { "AdvancedRoomFeatures": 1 }
    },
    "OBSOLETE": {
      "0": { "Globalfunctions_General": 1 }
    },
    "obsolete": {
      "0": { "Character": 72 },
      "1": { "Object": 35 },
      "2": { "Game": 24 },
      "3": { "ListBox": 17 },
      "4": { "Mouse": 16 },
      "5": { "System": 15 },
      "6": { "GUI": 14 },
      "7": { "AudioChannel": 13 },
      "8": { "Hotspot": 11 },
      "9": { "ViewFrame": 9 },
      "10": { "Globalfunctions_General": 8 },
      "11": { "Speech": 7 },
      "12": { "Region": 6 },
      "13": { "InvWindow": 5 },
      "14": { "Screen": 4 },
      "15": { "Dialog": 3 },
      "16": { "Slider": 2 },
      "17": { "GlobalVariables": 1 }
    },
    "Obsolete": {
      "0": { "TextScriptEvents": 1 }
    },
    "obsoleted": {
      "0": { "UpgradeTo32": 1 }
    },
    "obtain": {
      "0": { "Game": 1 }
    },
    "oBullet": {
      "0": { "Character": 3 }
    },
    "obvious": {
      "0": { "UpgradingTo27": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "obviously": {
      "0": { "BackingUpYourGame": 1 }
    },
    "Obviously": {
      "0": { "acintro2": 1 }
    },
    "occasions": {
      "0": { "Mouse": 1 }
    },
    "occur": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Pointers": 1 }
    },
    "occurred": {
      "0": { "Object": 1 }
    },
    "occurs": {
      "0": { "EventTypes": 35 },
      "1": { "Slider": 2 },
      "2": { "TextScriptEvents": 1 }
    },
    "oCup": {
      "0": { "Tumbleweed": 3 }
    },
    "oddity": {
      "0": { "UpgradeTo32": 1 }
    },
    "oDoor": {
      "0": { "Object": 8 },
      "1": { "DrawingSurfaceFunctions": 2 },
      "2": { "UpgradingTo27": 1 }
    },
    "oDoor's": {
      "0": { "Object": 3 }
    },
    "off": {
      "0": { "EventTypes": 9 },
      "1": { "Settingupthegame": 8 },
      "2": { "Globalfunctions_General": 7 },
      "3": { "EditingGUIs": 6 },
      "4": { "acintro3": 5 },
      "5": { "String": 4 },
      "6": { "acintro7": 3 },
      "7": { "Globalfunctions_Screen": 2 },
      "8": { "Region": 1 }
    },
    "OFF": {
      "0": { "UpgradeTo350": 1 }
    },
    "offensive": {
      "0": { "Copyright": 1 }
    },
    "offer": {
      "0": { "MusicAndSound": 1 }
    },
    "offered": {
      "0": { "EditorRoom": 1 }
    },
    "offering": {
      "0": { "EditorRoom": 1 }
    },
    "offers": {
      "0": { "EditorRoom": 1 }
    },
    "official": {
      "0": { "UpgradeTo34": 1 }
    },
    "officially": {
      "0": { "UpgradeTo34": 1 }
    },
    "offscreen": {
      "0": { "Viewport": 2 }
    },
    "offset": {
      "0": { "File": 8 },
      "1": { "AudioChannel": 4 },
      "2": { "UpgradeTo350": 3 },
      "3": { "Tumbleweed_movement": 2 },
      "4": { "Speech": 1 }
    },
    "Offset": {
      "0": { "Tumbleweed_helper": 3 },
      "1": { "Gamevariables": 2 }
    },
    "offsets": {
      "0": { "Character": 1 }
    },
    "oFlower": {
      "0": { "FAQ": 1 }
    },
    "Often": {
      "0": { "Settingupthegame": 1 }
    },
    "often": {
      "0": { "ScriptKeywords": 2 },
      "1": { "acintro5": 1 }
    },
    "Ogg": {
      "0": { "Credits": 2 },
      "1": { "DistGame": 1 }
    },
    "OGG": {
      "0": { "MusicAndSound": 7 },
      "1": { "AudioChannel": 4 },
      "2": { "Lipsync": 3 },
      "3": { "Credits": 2 },
      "4": { "DistGame": 1 }
    },
    "OGV": {
      "0": { "Multimedia": 1 }
    },
    "oh": {
      "0": { "BlockingScripts": 1 }
    },
    "Ohannessian": {
      "0": { "Credits": 1 }
    },
    "OK": {
      "0": { "acintro3": 3 },
      "1": { "acintro4": 2 },
      "2": { "acintro2": 1 }
    },
    "Okay": {
      "0": { "Tumbleweed": 1 }
    },
    "oKey": {
      "0": { "acintro7": 1 }
    },
    "oLamp": {
      "0": { "Object": 1 }
    },
    "Olav": {
      "0": { "Credits": 1 }
    },
    "old": {
      "0": { "Settingupthegame": 6 },
      "1": { "UpgradeTo30": 5 },
      "2": { "UpgradeTo32": 4 },
      "3": { "UpgradeTo350": 3 },
      "4": { "File": 2 },
      "5": { "Region": 1 }
    },
    "Old": {
      "0": { "String": 8 }
    },
    "old-fashioned": {
      "0": { "UpgradeTo32": 1 }
    },
    "old-school": {
      "0": { "Game": 1 }
    },
    "old-style": {
      "0": { "Settingupthegame": 4 },
      "1": { "UpgradingTo271": 3 },
      "2": { "ScriptKeywords": 2 },
      "3": { "UpgradeTo32": 1 }
    },
    "Old-style": {
      "0": { "UpgradeTo33": 1 }
    },
    "older": {
      "0": { "UpgradeTo350": 3 },
      "1": { "CustomDialogOptions": 2 },
      "2": { "acintro5": 1 }
    },
    "oMachine": {
      "0": { "AudioChannel": 3 }
    },
    "ominous": {
      "0": { "ScriptingTutorialPart1": 4 }
    },
    "omitted": {
      "0": { "Game": 1 }
    },
    "on-screen": {
      "0": { "Character": 3 },
      "1": { "acintro4": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "OnActivate": {
      "0": { "Parser": 1 }
    },
    "Once": {
      "0": { "Translations": 3 },
      "1": { "acintro3": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "once": {
      "0": { "Character": 5 },
      "1": { "Settingupthegame": 4 },
      "2": { "ScriptKeywords": 3 },
      "3": { "MusicAndSound": 2 },
      "4": { "SourceControl": 1 }
    },
    "OnChange": {
      "0": { "EditingGUIs": 1 }
    },
    "OnClick": {
      "0": { "GUI": 2 },
      "1": { "Button": 1 }
    },
    "one": {
      "0": { "Settingupthegame": 18 },
      "1": { "Character": 17 },
      "2": { "Globalfunctions_General": 15 },
      "3": { "ScriptKeywords": 8 },
      "4": { "acintro8": 7 },
      "5": { "ScriptingTutorialPart2": 6 },
      "6": { "TextParser": 5 },
      "7": { "UpgradeTo32": 4 },
      "8": { "UpgradingTo27": 3 },
      "9": { "CustomDialogOptions": 2 },
      "10": { "AudioChannel": 1 }
    },
    "One": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "one's": {
      "0": { "Setup": 1 }
    },
    "one-tenth": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "ones": {
      "0": { "UpgradingTo271": 2 },
      "1": { "Tumbleweed_translation": 1 }
    },
    "onGui": {
      "0": { "GUIControl": 2 }
    },
    "only": {
      "0": { "Character": 36 },
      "1": { "Settingupthegame": 24 },
      "2": { "ScriptKeywords": 18 },
      "3": { "Globalfunctions_General": 14 },
      "4": { "Speech": 12 },
      "5": { "Object": 10 },
      "6": { "UpgradeTo350": 9 },
      "7": { "Mouse": 7 },
      "8": { "Setup": 6 },
      "9": { "DynamicSprite": 5 },
      "10": { "Debuggingfeatures": 4 },
      "11": { "Viewport": 3 },
      "12": { "UpgradeTo34": 2 },
      "13": { "Tumbleweed_unhandled": 1 }
    },
    "Only": {
      "0": { "File": 3 },
      "1": { "DynamicSprite": 2 },
      "2": { "EditorRoom": 1 }
    },
    "ONLY": {
      "0": { "EventTypes": 1 }
    },
    "OnSelectionChanged": {
      "0": { "EditingGUIs": 1 }
    },
    "onto": {
      "0": { "DrawingSurfaceFunctions": 16 },
      "1": { "DynamicSprite": 15 },
      "2": { "UpgradeTo30": 6 },
      "3": { "Region": 3 },
      "4": { "EventTypes": 2 },
      "5": { "Globalfunctions_General": 1 }
    },
    "onWalkable": {
      "0": { "Tumbleweed_player": 1 }
    },
    "onwards": {
      "0": { "GraphicsDriver": 1 }
    },
    "opacity": {
      "0": { "Region": 1 }
    },
    "opaque": {
      "0": { "DynamicSprite": 2 },
      "1": { "Character": 1 }
    },
    "Open": {
      "0": { "File": 29 },
      "1": { "Pointers": 4 },
      "2": { "KeyboardShortcuts": 3 },
      "3": { "TemplateVerbcoin": 2 },
      "4": { "StandardEnums": 1 }
    },
    "open": {
      "0": { "File": 14 },
      "1": { "Settingupthegame": 7 },
      "2": { "TemplateVerbcoin": 4 },
      "3": { "MusicAndSound": 3 },
      "4": { "UpgradeTo335": 2 },
      "5": { "acintro5": 1 }
    },
    "OpenClose": {
      "0": { "Tumbleweed_extensions": 1 }
    },
    "OpenCloseExtension": {
      "0": { "Tumbleweed_extensions": 3 },
      "1": { "Tumbleweed_door": 1 }
    },
    "opened": {
      "0": { "Tumbleweed_door": 4 },
      "1": { "TemplateVerbcoin": 1 }
    },
    "openedDoor": {
      "0": { "ScriptingTutorialPart2": 2 }
    },
    "OpenGL": {
      "0": { "GraphicsDriver": 4 },
      "1": { "System": 3 },
      "2": { "Setup": 1 }
    },
    "opening": {
      "0": { "File": 3 },
      "1": { "UpgradeTo335": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "opens": {
      "0": { "acintro6": 1 }
    },
    "Opens": {
      "0": { "File": 1 }
    },
    "opensound": {
      "0": { "Tumbleweed_door": 2 }
    },
    "operate": {
      "0": { "Camera": 1 }
    },
    "operated": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Operating": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "operating": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "System": 1 }
    },
    "OperatingSystem": {
      "0": { "System": 3 },
      "1": { "StandardEnums": 1 }
    },
    "operation": {
      "0": { "DynamicSprite": 2 },
      "1": { "ScriptingTutorialPart1": 1 }
    },
    "Operations": {
      "0": { "Globalfunctions_Palette": 1 }
    },
    "operations": {
      "0": { "ScriptKeywords": 1 }
    },
    "operator": {
      "0": { "ScriptingTutorialPart2": 5 },
      "1": { "Pointers": 3 },
      "2": { "Settingupthegame": 2 }
    },
    "Operator": {
      "0": { "ScriptKeywords": 1 }
    },
    "operators": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "Operators": {
      "0": { "ScriptKeywords": 1 }
    },
    "opposed": {
      "0": { "Speech": 1 }
    },
    "opposite": {
      "0": { "Character": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "OPT": {
      "0": { "Globalfunctions_General": 25 }
    },
    "opt": {
      "0": { "CustomDialogOptions": 12 }
    },
    "optimize": {
      "0": { "Game": 1 }
    },
    "option": {
      "0": { "Settingupthegame": 55 },
      "1": { "Dialog": 44 },
      "2": { "acintro8": 12 },
      "3": { "Setup": 10 },
      "4": { "CustomDialogOptions": 8 },
      "5": { "EditingGUIs": 5 },
      "6": { "UpgradeTo30": 4 },
      "7": { "IntegrationWithWindows": 3 },
      "8": { "UpgradeTo31": 2 },
      "9": { "EditorSprite": 1 }
    },
    "Option": {
      "0": { "Globalfunctions_General": 1 }
    },
    "OPTION": {
      "0": { "Dialog": 5 },
      "1": { "Globalfunctions_General": 3 }
    },
    "option's": {
      "0": { "Dialog": 1 }
    },
    "option-off": {
      "0": { "acintro8": 1 }
    },
    "option-off-forever": {
      "0": { "Dialog": 1 }
    },
    "option-on": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro8": 1 }
    },
    "Optional": {
      "0": { "Character": 6 },
      "1": { "Region": 1 }
    },
    "optional": {
      "0": { "Character": 23 },
      "1": { "DynamicSprite": 11 },
      "2": { "Object": 7 },
      "3": { "DrawingSurfaceFunctions": 6 },
      "4": { "ScriptKeywords": 5 },
      "5": { "String": 4 },
      "6": { "Multimedia": 3 },
      "7": { "MusicAndSound": 2 },
      "8": { "Region": 1 }
    },
    "optionally": {
      "0": { "DynamicSprite": 1 }
    },
    "Optionally": {
      "0": { "CustomDialogOptions": 3 },
      "1": { "DynamicSprite": 2 },
      "2": { "SourceControl": 1 }
    },
    "OptionCount": {
      "0": { "Dialog": 4 }
    },
    "OPTIONs": {
      "0": { "Globalfunctions_General": 1 }
    },
    "OPTIONS": {
      "0": { "Multimedia": 1 }
    },
    "Options": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "options": {
      "0": { "DialogOptionsRenderingInfo": 62 },
      "1": { "CustomDialogOptions": 34 },
      "2": { "Settingupthegame": 27 },
      "3": { "UpgradeTo34": 13 },
      "4": { "acintro8": 12 },
      "5": { "Dialog": 10 },
      "6": { "Gamevariables": 9 },
      "7": { "Globalfunctions_General": 8 },
      "8": { "Setup": 6 },
      "9": { "acintro1": 5 },
      "10": { "UpgradingTo27": 3 },
      "11": { "acintro6": 2 },
      "12": { "AutonumberSpeechFiles": 1 }
    },
    "options's": {
      "0": { "DialogOptionsRenderingInfo": 1 }
    },
    "optionText": {
      "0": { "Dialog": 2 }
    },
    "OR'ed": {
      "0": { "TextParser": 1 }
    },
    "orange": {
      "0": { "Lipsync": 5 }
    },
    "oranges": {
      "0": { "ScriptKeywords": 2 }
    },
    "order": {
      "0": { "DialogOptionsRenderingInfo": 7 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "Dictionary": 4 },
      "3": { "Settingupthegame": 3 },
      "4": { "DrawingSurfaceFunctions": 2 },
      "5": { "UpgradeTo30": 1 }
    },
    "ordered": {
      "0": { "EditorView": 1 }
    },
    "ordering": {
      "0": { "GUI": 1 }
    },
    "ordinates": {
      "0": { "Character": 1 }
    },
    "Org": {
      "0": { "Copyright": 1 }
    },
    "org": {
      "0": { "Credits": 4 },
      "1": { "DistGame": 2 },
      "2": { "MusicAndSound": 1 }
    },
    "organize": {
      "0": { "MusicAndSound": 1 }
    },
    "organized": {
      "0": { "ScriptKeywords": 1 }
    },
    "Ori": {
      "0": { "Credits": 1 }
    },
    "Oriented": {
      "0": { "ScriptKeywords": 1 }
    },
    "origin": {
      "0": { "File": 4 },
      "1": { "TroubleshootingWindowsZoneID": 2 },
      "2": { "Maths": 1 }
    },
    "Original": {
      "0": { "String": 4 }
    },
    "ORIGINAL": {
      "0": { "Translations": 1 }
    },
    "original": {
      "0": { "String": 10 },
      "1": { "UpgradeTo32": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Originally": {
      "0": { "UpgradeTo350": 1 }
    },
    "originally": {
      "0": { "Credits": 2 },
      "1": { "Speech": 1 }
    },
    "originated": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "originates": {
      "0": { "TroubleshootingWindowsZoneID": 2 }
    },
    "oRock": {
      "0": { "Object": 5 }
    },
    "os": {
      "0": { "System": 1 }
    },
    "oSmallrock": {
      "0": { "Object": 1 }
    },
    "oTable": {
      "0": { "Object": 2 }
    },
    "Other": {
      "0": { "UpgradeTo350": 2 },
      "1": { "OtherFeatures": 1 }
    },
    "other": {
      "0": { "Character": 15 },
      "1": { "Settingupthegame": 14 },
      "2": { "DialogOptionsRenderingInfo": 9 },
      "3": { "DynamicSprite": 8 },
      "4": { "ScriptModules": 6 },
      "5": { "EventTypes": 5 },
      "6": { "ScriptKeywords": 4 },
      "7": { "acintro9": 3 },
      "8": { "GraphicsDriver": 2 },
      "9": { "ContactingTheDevelopers": 1 }
    },
    "otherChar": {
      "0": { "Character": 1 }
    },
    "OTHERCHAR": {
      "0": { "Character": 1 }
    },
    "OtherClick": {
      "0": { "Tumbleweed": 1 }
    },
    "otherman": {
      "0": { "Settingupthegame": 4 }
    },
    "others": {
      "0": { "acintro1": 1 }
    },
    "Otherwise": {
      "0": { "Object": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "OTHERWISE": {
      "0": { "Copyright": 1 }
    },
    "otherwise": {
      "0": { "ScriptKeywords": 10 },
      "1": { "Globalfunctions_General": 6 },
      "2": { "ScriptingTutorialPart1": 3 },
      "3": { "Viewport": 2 },
      "4": { "Hotspot": 1 }
    },
    "Our": {
      "0": { "acintro8": 3 },
      "1": { "ScriptingTutorialPart1": 2 },
      "2": { "acintro7": 1 }
    },
    "our": {
      "0": { "ScriptingTutorialPart1": 9 },
      "1": { "acintro4": 6 },
      "2": { "acintro8": 5 },
      "3": { "OOProgramming": 4 },
      "4": { "acintro5": 3 },
      "5": { "acintro3": 2 },
      "6": { "Pointers": 1 }
    },
    "Out": {
      "0": { "Gamevariables": 1 }
    },
    "OUT": {
      "0": { "Copyright": 1 }
    },
    "out": {
      "0": { "EditingGUIs": 6 },
      "1": { "Gamevariables": 5 },
      "2": { "Object": 4 },
      "3": { "GUI": 3 },
      "4": { "Debuggingfeatures": 2 },
      "5": { "Pointers": 1 }
    },
    "outdated": {
      "0": { "Settingupthegame": 1 }
    },
    "outer": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "outline": {
      "0": { "acintro9": 5 },
      "1": { "Settingupthegame": 2 }
    },
    "Outlines": {
      "0": { "acintro9": 1 }
    },
    "outlines": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro9": 1 }
    },
    "OutlineStyle": {
      "0": { "Settingupthegame": 1 }
    },
    "outlining": {
      "0": { "acintro9": 2 }
    },
    "output": {
      "0": { "File": 40 },
      "1": { "Settingupthegame": 2 },
      "2": { "System": 1 }
    },
    "outro": {
      "0": { "acintro7": 1 }
    },
    "outside": {
      "0": { "DrawingSurfaceFunctions": 3 },
      "1": { "Overlay": 2 },
      "2": { "File": 1 }
    },
    "OUTSIDE": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "over": {
      "0": { "Character": 7 },
      "1": { "Pointers": 5 },
      "2": { "acintro9": 4 },
      "3": { "Mouse": 3 },
      "4": { "Tumbleweed": 2 },
      "5": { "Region": 1 }
    },
    "Overall": {
      "0": { "MusicAndSound": 1 }
    },
    "overall": {
      "0": { "Settingupthegame": 4 },
      "1": { "System": 3 },
      "2": { "MusicAndSound": 2 },
      "3": { "SystemLimits": 1 }
    },
    "overflow": {
      "0": { "Maths": 1 }
    },
    "overhead": {
      "0": { "acintro4": 2 }
    },
    "OVERHOTSPOT": {
      "0": { "EditingGUIs": 1 }
    },
    "overlap": {
      "0": { "Viewport": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "overlapping": {
      "0": { "Globalfunctions_Room": 5 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Overlay": {
      "0": { "Overlay": 47 },
      "1": { "Character": 3 },
      "2": { "StandardEnums": 2 },
      "3": { "Scripting": 1 }
    },
    "overlay": {
      "0": { "Overlay": 33 },
      "1": { "Character": 3 },
      "2": { "GUI": 1 }
    },
    "overlays": {
      "0": { "Overlay": 6 },
      "1": { "AdvancedRoomFeatures": 1 }
    },
    "Overlays": {
      "0": { "UpgradeTo350": 2 },
      "1": { "Scripting": 1 }
    },
    "overloading": {
      "0": { "EditorView": 1 }
    },
    "overlook": {
      "0": { "acintro9": 1 }
    },
    "overridden": {
      "0": { "Tumbleweed_actions": 1 }
    },
    "override": {
      "0": { "Settingupthegame": 2 },
      "1": { "Region": 1 }
    },
    "Override": {
      "0": { "Settingupthegame": 1 }
    },
    "overrides": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "GUIControl": 1 }
    },
    "OVERRIDES": {
      "0": { "Character": 1 }
    },
    "overriding": {
      "0": { "Gamevariables": 1 }
    },
    "overwrite": {
      "0": { "Settingupthegame": 4 },
      "1": { "acintro6": 2 },
      "2": { "acintro9": 1 }
    },
    "overwritten": {
      "0": { "AutonumberSpeechFiles": 1 }
    },
    "oWall": {
      "0": { "Object": 2 }
    },
    "oWaterfall": {
      "0": { "UpgradingTo27": 1 }
    },
    "Own": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "own": {
      "0": { "Settingupthegame": 13 },
      "1": { "acintro5": 6 },
      "2": { "ScriptingTutorialPart2": 5 },
      "3": { "acintro6": 3 },
      "4": { "UpgradingTo27": 2 },
      "5": { "UpgradeTo32": 1 }
    },
    "owning": {
      "0": { "GUIControl": 2 }
    },
    "OwningGUI": {
      "0": { "GUIControl": 8 }
    },
    "pack": {
      "0": { "Multimedia": 3 },
      "1": { "Speech": 1 }
    },
    "Pack": {
      "0": { "acintro9": 1 }
    },
    "package": {
      "0": { "acintro2": 2 },
      "1": { "acintro1": 1 }
    },
    "packages": {
      "0": { "acintro2": 1 }
    },
    "packed": {
      "0": { "UpgradeTo350": 1 }
    },
    "padding": {
      "0": { "TextWindowGUI": 1 }
    },
    "padlock": {
      "0": { "EditorRoom": 1 }
    },
    "page": {
      "0": { "ScriptKeywords": 2 },
      "1": { "TroubleshootingWindowsZoneID": 1 }
    },
    "PageDown": {
      "0": { "ASCIIcodes": 1 }
    },
    "pages": {
      "0": { "UpgradeTo30": 1 }
    },
    "PageUp": {
      "0": { "ASCIIcodes": 1 }
    },
    "PAID": {
      "0": { "Copyright": 1 }
    },
    "pain": {
      "0": { "UpgradeTo31": 2 },
      "1": { "UpgradingTo27": 1 }
    },
    "painstakingly": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "paint": {
      "0": { "acintro2": 3 },
      "1": { "acintro1": 1 }
    },
    "painted": {
      "0": { "acintro2": 1 }
    },
    "painting": {
      "0": { "UpgradeTo350": 1 }
    },
    "pair": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "pairs": {
      "0": { "Dictionary": 4 }
    },
    "pal": {
      "0": { "Settingupthegame": 1 }
    },
    "PAL": {
      "0": { "Settingupthegame": 3 }
    },
    "Palette": {
      "0": { "Settingupthegame": 4 },
      "1": { "Globalfunctions_Palette": 3 },
      "2": { "Character": 2 },
      "3": { "acintro1": 1 }
    },
    "palette": {
      "0": { "Settingupthegame": 18 },
      "1": { "Globalfunctions_Palette": 12 },
      "2": { "Gamevariables": 7 },
      "3": { "AdvancedRoomFeatures": 6 },
      "4": { "acintro1": 5 },
      "5": { "acintro6": 3 },
      "6": { "Game": 1 }
    },
    "palette-based": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro1": 1 }
    },
    "palette-cycling": {
      "0": { "acintro1": 1 }
    },
    "PAM": {
      "0": { "Lipsync": 1 }
    },
    "pam": {
      "0": { "Lipsync": 2 }
    },
    "PAMELA": {
      "0": { "Lipsync": 4 }
    },
    "pamela": {
      "0": { "Lipsync": 3 }
    },
    "Pamela": {
      "0": { "Lipsync": 5 }
    },
    "pan": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "Pane": {
      "0": { "RepExec": 2 }
    },
    "pane": {
      "0": { "Settingupthegame": 8 },
      "1": { "Room": 5 },
      "2": { "Game": 4 },
      "3": { "EditingGUIs": 3 },
      "4": { "UpgradeTo341": 2 },
      "5": { "DistGame": 1 }
    },
    "Panel": {
      "0": { "System": 1 }
    },
    "panel": {
      "0": { "EditorCharacter": 3 },
      "1": { "UpgradeTo350": 1 }
    },
    "panels": {
      "0": { "acintro4": 1 }
    },
    "panes": {
      "0": { "UpgradeTo33": 1 }
    },
    "Panning": {
      "0": { "AudioChannel": 4 },
      "1": { "UpgradeTo32": 1 }
    },
    "panning": {
      "0": { "AudioChannel": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "Papagayo": {
      "0": { "Lipsync": 7 }
    },
    "papagayo": {
      "0": { "Lipsync": 1 }
    },
    "par": {
      "0": { "Settingupthegame": 1 }
    },
    "paragraphs": {
      "0": { "EditorInventoryItems": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "PARAM": {
      "0": { "Multimedia": 4 }
    },
    "param": {
      "0": { "ScriptKeywords": 6 },
      "1": { "ScriptingTutorialPart2": 1 }
    },
    "Parameter": {
      "0": { "Dictionary": 1 }
    },
    "parameter": {
      "0": { "Character": 23 },
      "1": { "ScriptingTutorialPart1": 15 },
      "2": { "Globalfunctions_General": 7 },
      "3": { "ScriptKeywords": 5 },
      "4": { "DrawingSurfaceFunctions": 4 },
      "5": { "DynamicSprite": 3 },
      "6": { "Tumbleweed_translation": 2 },
      "7": { "Region": 1 }
    },
    "PARAMETER": {
      "0": { "TextScriptEvents": 1 }
    },
    "Parameters": {
      "0": { "Tumbleweed_door": 1 }
    },
    "parameters": {
      "0": { "ScriptingTutorialPart1": 6 },
      "1": { "ScriptingTutorialPart2": 5 },
      "2": { "ScriptKeywords": 4 },
      "3": { "CallingGlobalFunctions": 3 },
      "4": { "Tumbleweed_movement": 2 },
      "5": { "Region": 1 }
    },
    "parent": {
      "0": { "GUIControl": 2 }
    },
    "Parental": {
      "0": { "IntegrationWithWindows": 2 }
    },
    "parentheses": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "parenthesis": {
      "0": { "ScriptingTutorialPart2": 3 },
      "1": { "ScriptingTutorialPart1": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "Park": {
      "0": { "Tumbleweed": 1 }
    },
    "parse": {
      "0": { "Set": 1 }
    },
    "Parser": {
      "0": { "Parser": 19 },
      "1": { "TextParser": 10 },
      "2": { "ScriptKeywords": 3 },
      "3": { "Settingupthegame": 1 }
    },
    "PARSER": {
      "0": { "Dialog": 2 }
    },
    "parser": {
      "0": { "DialogOptionsRenderingInfo": 12 },
      "1": { "TextParser": 8 },
      "2": { "Parser": 4 },
      "3": { "Globalfunctions_General": 2 },
      "4": { "ScriptKeywords": 1 }
    },
    "ParserTextBoxWidth": {
      "0": { "DialogOptionsRenderingInfo": 6 },
      "1": { "CustomDialogOptions": 1 }
    },
    "ParserTextBoxX": {
      "0": { "DialogOptionsRenderingInfo": 7 },
      "1": { "CustomDialogOptions": 1 }
    },
    "ParserTextBoxY": {
      "0": { "DialogOptionsRenderingInfo": 7 },
      "1": { "CustomDialogOptions": 1 }
    },
    "ParseText": {
      "0": { "Parser": 10 },
      "1": { "TextParser": 3 },
      "2": { "Dialog": 2 },
      "3": { "Settingupthegame": 1 }
    },
    "parsing": {
      "0": { "Parser": 1 }
    },
    "part": {
      "0": { "Game": 11 },
      "1": { "ViewFrame": 7 },
      "2": { "ScriptingTutorialPart1": 4 },
      "3": { "ScriptingTutorialPart2": 3 },
      "4": { "acintro6": 2 },
      "5": { "Region": 1 }
    },
    "Part": {
      "0": { "StartingOff": 9 },
      "1": { "acintro2": 1 }
    },
    "partially": {
      "0": { "Screen": 1 }
    },
    "particular": {
      "0": { "Settingupthegame": 3 },
      "1": { "Lipsync": 2 },
      "2": { "FAQ": 1 }
    },
    "PARTICULAR": {
      "0": { "Copyright": 1 }
    },
    "particularly": {
      "0": { "Character": 1 }
    },
    "partition": {
      "0": { "Setup": 1 }
    },
    "parts": {
      "0": { "UpgradeTo350": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "Parts": {
      "0": { "acintro2": 2 }
    },
    "pass": {
      "0": { "Character": 12 },
      "1": { "Globalfunctions_General": 9 },
      "2": { "Multimedia": 3 },
      "3": { "Mouse": 2 },
      "4": { "ScriptKeywords": 1 }
    },
    "Pass": {
      "0": { "Globalfunctions_Room": 4 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "Globalfunctions_Screen": 1 }
    },
    "passed": {
      "0": { "Preprocessor": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "DialogOptionsRenderingInfo": 1 }
    },
    "Passed": {
      "0": { "StandardEnums": 2 }
    },
    "passes": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "Passing": {
      "0": { "Character": 2 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "passing": {
      "0": { "Character": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "password": {
      "0": { "System": 1 }
    },
    "past": {
      "0": { "UpgradeTo350": 2 },
      "1": { "acintro2": 1 }
    },
    "paste": {
      "0": { "RepExec": 3 },
      "1": { "acintro6": 1 }
    },
    "Paste": {
      "0": { "EditorView": 2 },
      "1": { "KeyboardShortcuts": 1 }
    },
    "pasted": {
      "0": { "EditorView": 1 }
    },
    "pasting": {
      "0": { "RepExec": 1 }
    },
    "path": {
      "0": { "Settingupthegame": 6 },
      "1": { "UpgradeTo335": 4 },
      "2": { "Character": 3 },
      "3": { "Object": 2 },
      "4": { "EditorSprite": 1 }
    },
    "path-finder": {
      "0": { "Globalfunctions_General": 1 }
    },
    "path-finding": {
      "0": { "UpgradeTo350": 1 }
    },
    "pathfinder": {
      "0": { "SystemLimits": 1 }
    },
    "pathing": {
      "0": { "GUIControl": 1 }
    },
    "paths": {
      "0": { "Settingupthegame": 3 },
      "1": { "Game": 1 }
    },
    "Patronizing": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "pattern": {
      "0": { "AudioChannel": 2 }
    },
    "Paul": {
      "0": { "Credits": 1 }
    },
    "pause": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Settingupthegame": 1 }
    },
    "paused": {
      "0": { "Globalfunctions_General": 9 },
      "1": { "Multimedia": 3 },
      "2": { "GUI": 1 }
    },
    "PauseGame": {
      "0": { "Globalfunctions_General": 7 },
      "1": { "System": 1 }
    },
    "Pauses": {
      "0": { "Globalfunctions_General": 3 }
    },
    "pauses": {
      "0": { "System": 1 }
    },
    "pausing": {
      "0": { "Character": 1 }
    },
    "payments": {
      "0": { "MusicAndSound": 1 }
    },
    "PC": {
      "0": { "GraphicsDriver": 3 },
      "1": { "System": 1 }
    },
    "PCs": {
      "0": { "Setup": 1 }
    },
    "PCX": {
      "0": { "DynamicSprite": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "pcx": {
      "0": { "Globalfunctions_General": 1 }
    },
    "pen": {
      "0": { "CustomProperties": 1 }
    },
    "Pending": {
      "0": { "SourceControl": 1 }
    },
    "Penney": {
      "0": { "Credits": 1 }
    },
    "Pentium": {
      "0": { "Copyright": 1 }
    },
    "PEOPLE": {
      "0": { "OOProgramming": 5 }
    },
    "People": {
      "0": { "OOProgramming": 4 }
    },
    "people": {
      "0": { "AnonymousUsageInfo": 6 },
      "1": { "Pointers": 2 },
      "2": { "OOProgramming": 1 }
    },
    "Per": {
      "0": { "Credits": 1 }
    },
    "per": {
      "0": { "SystemLimits": 7 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "EditorView": 4 },
      "3": { "ScriptKeywords": 3 },
      "4": { "UpgradeTo350": 2 },
      "5": { "AdvancedRoomFeatures": 1 }
    },
    "PER": {
      "0": { "UpgradeTo30": 2 }
    },
    "percent": {
      "0": { "StringFormats": 2 },
      "1": { "Region": 1 }
    },
    "percentage": {
      "0": { "Character": 1 }
    },
    "perfect": {
      "0": { "Lipsync": 1 }
    },
    "perfectly": {
      "0": { "ScriptKeywords": 2 },
      "1": { "GraphicsDriver": 1 }
    },
    "perfomance": {
      "0": { "Settingupthegame": 1 }
    },
    "Perforce": {
      "0": { "SourceControl": 2 }
    },
    "perform": {
      "0": { "Character": 6 },
      "1": { "ScriptingTutorialPart1": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "performance": {
      "0": { "Settingupthegame": 1 }
    },
    "PERFORMANCE": {
      "0": { "Copyright": 1 }
    },
    "performed": {
      "0": { "Multimedia": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "performing": {
      "0": { "Globalfunctions_General": 1 }
    },
    "performs": {
      "0": { "ScriptKeywords": 1 }
    },
    "perhaps": {
      "0": { "Character": 1 }
    },
    "permanent": {
      "0": { "Region": 2 },
      "1": { "Globalfunctions_Palette": 1 }
    },
    "Permanently": {
      "0": { "Mouse": 1 }
    },
    "permanently": {
      "0": { "Object": 3 },
      "1": { "Character": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "permission": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "PERMISSION": {
      "0": { "Copyright": 1 }
    },
    "permissions": {
      "0": { "TroubleshootingWindowsZoneID": 2 }
    },
    "persist": {
      "0": { "Gamevariables": 1 }
    },
    "persisted": {
      "0": { "File": 1 }
    },
    "Persistent": {
      "0": { "GUI": 1 }
    },
    "persistent": {
      "0": { "Camera": 1 }
    },
    "person": {
      "0": { "TextParser": 2 },
      "1": { "acintro8": 1 }
    },
    "personal": {
      "0": { "Settingupthegame": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "Personally": {
      "0": { "acintro1": 1 }
    },
    "perspective": {
      "0": { "acintro4": 1 }
    },
    "Peter": {
      "0": { "Credits": 1 }
    },
    "pgo": {
      "0": { "Lipsync": 1 }
    },
    "phenome": {
      "0": { "Lipsync": 1 }
    },
    "phenomes": {
      "0": { "Lipsync": 4 }
    },
    "phoneme": {
      "0": { "Lipsync": 1 }
    },
    "phonemes": {
      "0": { "Lipsync": 7 }
    },
    "phrase": {
      "0": { "Lipsync": 1 }
    },
    "Pi": {
      "0": { "Maths": 7 },
      "1": { "StringFormats": 5 }
    },
    "PI": {
      "0": { "Maths": 1 }
    },
    "pick": {
      "0": { "acintro4": 4 },
      "1": { "acintro7": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "Pick": {
      "0": { "TextScriptEvents": 3 },
      "1": { "CustomProperties": 1 }
    },
    "picked": {
      "0": { "Tumbleweed_movement": 2 },
      "1": { "EventTypes": 1 }
    },
    "picker": {
      "0": { "EditorRoom": 2 }
    },
    "picking": {
      "0": { "acintro7": 2 },
      "1": { "EditorView": 1 }
    },
    "picks": {
      "0": { "CallingGlobalFunctions": 1 }
    },
    "pickup": {
      "0": { "Tumbleweed_helper": 1 }
    },
    "PickUp": {
      "0": { "Tumbleweed": 2 }
    },
    "PICKUP": {
      "0": { "Tumbleweed": 1 }
    },
    "picture": {
      "0": { "EditingGUIs": 4 },
      "1": { "Settingupthegame": 3 },
      "2": { "AnonymousUsageInfo": 1 }
    },
    "picture's": {
      "0": { "acintro4": 1 }
    },
    "picture-based": {
      "0": { "CustomDialogOptions": 1 }
    },
    "pictures": {
      "0": { "GUIControl": 1 }
    },
    "piece": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "pieces": {
      "0": { "UpgradeTo32": 1 }
    },
    "Pierre": {
      "0": { "Credits": 1 }
    },
    "pillar": {
      "0": { "acintro2": 2 }
    },
    "pillars": {
      "0": { "acintro2": 1 }
    },
    "Pink": {
      "0": { "acintro4": 1 }
    },
    "pink": {
      "0": { "Lipsync": 4 },
      "1": { "DrawingSurfaceFunctions": 1 }
    },
    "Piotr": {
      "0": { "Credits": 1 }
    },
    "pipe": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "Pires": {
      "0": { "Credits": 1 }
    },
    "pitch": {
      "0": { "System": 1 }
    },
    "Pixel": {
      "0": { "Globalfunctions_General": 1 }
    },
    "pixel": {
      "0": { "DrawingSurfaceFunctions": 9 },
      "1": { "Settingupthegame": 2 },
      "2": { "Mouse": 1 }
    },
    "pixel-perfect": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Object": 1 }
    },
    "Pixel-perfect": {
      "0": { "acintro1": 1 }
    },
    "pixel-precise": {
      "0": { "Settingupthegame": 2 }
    },
    "pixelated": {
      "0": { "System": 1 }
    },
    "PIXELPERFECT": {
      "0": { "Globalfunctions_General": 3 }
    },
    "pixels": {
      "0": { "Character": 11 },
      "1": { "DynamicSprite": 9 },
      "2": { "Object": 7 },
      "3": { "Settingupthegame": 6 },
      "4": { "Globalfunctions_General": 5 },
      "5": { "DialogOptionsRenderingInfo": 4 },
      "6": { "TemplateBASS": 3 },
      "7": { "Screen": 2 },
      "8": { "TextWindowGUI": 1 }
    },
    "PKZIP": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "place": {
      "0": { "ScriptKeywords": 4 },
      "1": { "TheScriptHeader": 3 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "Camera": 1 }
    },
    "Place": {
      "0": { "EditorRoom": 2 },
      "1": { "Plugins": 1 }
    },
    "placed": {
      "0": { "Character": 4 },
      "1": { "UpgradeTo341": 3 },
      "2": { "Object": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "placeholders": {
      "0": { "UpgradeTo350": 1 }
    },
    "placement": {
      "0": { "EventTypes": 1 }
    },
    "PlaceOnWalkableArea": {
      "0": { "Character": 3 }
    },
    "places": {
      "0": { "Maths": 14 },
      "1": { "acintro2": 3 },
      "2": { "DynamicSprite": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "Places": {
      "0": { "Character": 1 }
    },
    "placing": {
      "0": { "UpgradeTo31": 1 }
    },
    "Placing": {
      "0": { "EditorRoom": 2 }
    },
    "plain": {
      "0": { "File": 2 },
      "1": { "IntegrationWithWindows": 1 }
    },
    "planned": {
      "0": { "acintro8": 2 }
    },
    "plans": {
      "0": { "UpgradeTo34": 1 }
    },
    "plate": {
      "0": { "Hotspot": 1 }
    },
    "platform": {
      "0": { "UpgradeTo34": 1 }
    },
    "platforms": {
      "0": { "Settingupthegame": 2 },
      "1": { "Credits": 1 }
    },
    "Play": {
      "0": { "AudioClip": 15 },
      "1": { "AudioChannel": 14 },
      "2": { "MusicAndSound": 6 },
      "3": { "Multimedia": 4 },
      "4": { "Game": 2 },
      "5": { "ScriptKeywords": 1 }
    },
    "play": {
      "0": { "Character": 12 },
      "1": { "MusicAndSound": 9 },
      "2": { "Multimedia": 8 },
      "3": { "AudioClip": 4 },
      "4": { "Settingupthegame": 3 },
      "5": { "ScriptKeywords": 2 },
      "6": { "Tumbleweed_unhandled": 1 }
    },
    "playability": {
      "0": { "acintro1": 1 }
    },
    "playable": {
      "0": { "Settingupthegame": 1 }
    },
    "PlayAmbientSound": {
      "0": { "UpgradeTo32": 2 },
      "1": { "AudioClip": 1 }
    },
    "playback": {
      "0": { "AudioChannel": 3 },
      "1": { "Multimedia": 2 },
      "2": { "Setup": 1 }
    },
    "played": {
      "0": { "AudioClip": 7 },
      "1": { "Character": 5 },
      "2": { "Settingupthegame": 3 },
      "3": { "Tumbleweed_door": 2 },
      "4": { "Globalfunctions_General": 1 }
    },
    "player": {
      "0": { "Settingupthegame": 57 },
      "1": { "Character": 54 },
      "2": { "Globalfunctions_General": 45 },
      "3": { "EventTypes": 36 },
      "4": { "Game": 24 },
      "5": { "Globalfunctions_Room": 23 },
      "6": { "ScriptKeywords": 20 },
      "7": { "Dialog": 19 },
      "8": { "acintro8": 18 },
      "9": { "Tumbleweed_movement": 17 },
      "10": { "acintro3": 15 },
      "11": { "acintro7": 14 },
      "12": { "Tumbleweed": 13 },
      "13": { "ScriptingTutorialPart2": 12 },
      "14": { "Mouse": 11 },
      "15": { "System": 10 },
      "16": { "Speech": 9 },
      "17": { "Setup": 8 },
      "18": { "acintro9": 7 },
      "19": { "Credits": 6 },
      "20": { "TemplateSierraStyle": 5 },
      "21": { "MusicAndSound": 4 },
      "22": { "UpgradingTo27": 3 },
      "23": { "Tumbleweed_unhandled": 2 },
      "24": { "Debuggingfeatures": 1 }
    },
    "Player": {
      "0": { "Globalfunctions_Room": 6 },
      "1": { "Region": 5 },
      "2": { "Character": 3 },
      "3": { "TextScriptEvents": 2 },
      "4": { "Tumbleweed": 1 }
    },
    "player's": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Settingupthegame": 4 },
      "2": { "ScriptKeywords": 2 },
      "3": { "Camera": 1 }
    },
    "player-friendly": {
      "0": { "acintro3": 1 }
    },
    "PlayerCharacterView": {
      "0": { "acintro4": 1 }
    },
    "players": {
      "0": { "Speech": 1 }
    },
    "Players": {
      "0": { "Settingupthegame": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "PlayerStartsWithItem": {
      "0": { "acintro5": 1 }
    },
    "PlayFlic": {
      "0": { "Multimedia": 5 }
    },
    "PlayFrom": {
      "0": { "AudioClip": 6 },
      "1": { "StandardEnums": 1 }
    },
    "Playing": {
      "0": { "MusicAndSound": 1 }
    },
    "playing": {
      "0": { "AudioChannel": 33 },
      "1": { "Multimedia": 17 },
      "2": { "MusicAndSound": 12 },
      "3": { "Character": 7 },
      "4": { "AudioClip": 6 },
      "5": { "UpgradeTo32": 3 },
      "6": { "Button": 2 },
      "7": { "SystemRequirements": 1 }
    },
    "PlayingClip": {
      "0": { "AudioChannel": 4 },
      "1": { "AudioClip": 1 }
    },
    "PlayMusic": {
      "0": { "UpgradeTo32": 4 },
      "1": { "AudioClip": 1 }
    },
    "PlayMusicOnRoomLoad": {
      "0": { "acintro4": 1 }
    },
    "PlayMusicQueued": {
      "0": { "AudioClip": 1 }
    },
    "PlayQueued": {
      "0": { "AudioClip": 5 },
      "1": { "StandardEnums": 1 }
    },
    "plays": {
      "0": { "AudioClip": 5 },
      "1": { "Multimedia": 4 },
      "2": { "ViewFrame": 2 },
      "3": { "Room": 1 }
    },
    "Plays": {
      "0": { "AudioClip": 3 },
      "1": { "Multimedia": 2 },
      "2": { "Game": 1 }
    },
    "PlaySilentMIDI": {
      "0": { "Multimedia": 2 }
    },
    "PlaySound": {
      "0": { "UpgradeTo32": 6 },
      "1": { "AudioClip": 1 }
    },
    "PlaySoundEx": {
      "0": { "AudioClip": 1 }
    },
    "PlayVideo": {
      "0": { "Multimedia": 6 },
      "1": { "StandardEnums": 1 }
    },
    "PlayVoiceClip": {
      "0": { "Game": 2 }
    },
    "PLEASE": {
      "0": { "ContactingTheDevelopers": 3 }
    },
    "Please": {
      "0": { "ScriptKeywords": 2 },
      "1": { "ContactingTheDevelopers": 1 }
    },
    "please": {
      "0": { "ContactingTheDevelopers": 4 },
      "1": { "Settingupthegame": 2 },
      "2": { "CustomDialogOptions": 1 }
    },
    "plowing": {
      "0": { "Debuggingfeatures": 1 }
    },
    "Plugin": {
      "0": { "Copyright": 1 }
    },
    "plugin": {
      "0": { "Plugins": 14 },
      "1": { "Game": 5 },
      "2": { "TroubleshootingWindowsZoneID": 2 },
      "3": { "SystemLimits": 1 }
    },
    "plugins": {
      "0": { "Plugins": 2 },
      "1": { "Game": 1 }
    },
    "Plugins": {
      "0": { "Plugins": 4 },
      "1": { "Copyright": 3 },
      "2": { "OtherFeatures": 1 }
    },
    "PLUS": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "Plus": {
      "0": { "ASCIIcodes": 1 }
    },
    "plus": {
      "0": { "DistGame": 1 }
    },
    "PM": {
      "0": { "Tumbleweed": 1 }
    },
    "PNG": {
      "0": { "acintro2": 1 }
    },
    "png": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "Point": {
      "0": { "Viewport": 6 },
      "1": { "StandardTypes": 5 },
      "2": { "Screen": 4 },
      "3": { "UpgradeTo350": 1 }
    },
    "point": {
      "0": { "Globalfunctions_General": 12 },
      "1": { "DynamicSprite": 7 },
      "2": { "Hotspot": 6 },
      "3": { "ScriptKeywords": 5 },
      "4": { "Maths": 4 },
      "5": { "acintro5": 3 },
      "6": { "Screen": 2 },
      "7": { "Mouse": 1 }
    },
    "point-and-click": {
      "0": { "acintro1": 1 }
    },
    "point-version": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Pointer": {
      "0": { "Pointers": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "pointer": {
      "0": { "ScriptKeywords": 14 },
      "1": { "Pointers": 11 },
      "2": { "DynamicSprite": 7 },
      "3": { "File": 4 },
      "4": { "Game": 2 },
      "5": { "OOProgramming": 1 }
    },
    "Pointers": {
      "0": { "Pointers": 6 },
      "1": { "ScriptKeywords": 2 },
      "2": { "ScriptingLanguage": 1 }
    },
    "pointers": {
      "0": { "Pointers": 13 },
      "1": { "ScriptKeywords": 1 }
    },
    "pointers-to-pointers": {
      "0": { "Pointers": 1 }
    },
    "pointing": {
      "0": { "DynamicSprite": 7 },
      "1": { "Pointers": 1 }
    },
    "points": {
      "0": { "Settingupthegame": 4 },
      "1": { "Gamevariables": 3 },
      "2": { "Pointers": 2 },
      "3": { "ScriptingTutorialPart1": 1 }
    },
    "Poison": {
      "0": { "ScriptKeywords": 1 }
    },
    "pool": {
      "0": { "ScriptKeywords": 3 }
    },
    "poor": {
      "0": { "Settingupthegame": 1 }
    },
    "pop": {
      "0": { "StandardEnums": 1 }
    },
    "pop-up": {
      "0": { "Settingupthegame": 3 },
      "1": { "EditingGUIs": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "popped": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "pops": {
      "0": { "UpgradingTo27": 2 }
    },
    "Pops": {
      "0": { "Game": 1 }
    },
    "popular": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "populate": {
      "0": { "ListBox": 1 }
    },
    "Popup": {
      "0": { "GUI": 1 }
    },
    "popup": {
      "0": { "TemplateBASS": 2 },
      "1": { "acintro9": 1 }
    },
    "Popup-YP": {
      "0": { "EditingGUIs": 1 }
    },
    "PopupDistance": {
      "0": { "TemplateBASS": 4 }
    },
    "PopupProportional": {
      "0": { "TemplateBASS": 5 }
    },
    "PopupStyle": {
      "0": { "GUI": 3 },
      "1": { "StandardEnums": 1 }
    },
    "PopupYPos": {
      "0": { "GUI": 6 }
    },
    "portable": {
      "0": { "ScriptKeywords": 1 }
    },
    "portion": {
      "0": { "DynamicSprite": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "portions": {
      "0": { "DynamicSprite": 1 }
    },
    "portrait": {
      "0": { "Speech": 10 },
      "1": { "Settingupthegame": 4 },
      "2": { "Globalfunctions_General": 1 }
    },
    "portrait's": {
      "0": { "Speech": 1 }
    },
    "PORTRAITPOSITION": {
      "0": { "Globalfunctions_General": 1 }
    },
    "portraits": {
      "0": { "Speech": 2 }
    },
    "PortraitXOffset": {
      "0": { "Speech": 5 }
    },
    "PortraitY": {
      "0": { "Speech": 5 }
    },
    "ports": {
      "0": { "Credits": 1 }
    },
    "Portuguese": {
      "0": { "Tumbleweed": 1 }
    },
    "pos": {
      "0": { "File": 4 }
    },
    "position": {
      "0": { "Globalfunctions_General": 12 },
      "1": { "AudioChannel": 9 },
      "2": { "Viewport": 7 },
      "3": { "Mouse": 5 },
      "4": { "File": 4 },
      "5": { "GUIControl": 3 },
      "6": { "Settingupthegame": 2 },
      "7": { "Overlay": 1 }
    },
    "POSITION": {
      "0": { "String": 3 }
    },
    "Position": {
      "0": { "AudioChannel": 5 },
      "1": { "acintro2": 1 }
    },
    "Positional": {
      "0": { "EditorRoom": 1 }
    },
    "positioned": {
      "0": { "GUIControl": 3 },
      "1": { "Globalfunctions_Message": 1 }
    },
    "positioning": {
      "0": { "acintro2": 2 },
      "1": { "Globalfunctions_Message": 1 }
    },
    "positionings": {
      "0": { "Character": 2 }
    },
    "PositionMs": {
      "0": { "AudioChannel": 5 }
    },
    "positions": {
      "0": { "DialogOptionsRenderingInfo": 3 },
      "1": { "Character": 1 }
    },
    "positive": {
      "0": { "File": 3 },
      "1": { "Maths": 2 },
      "2": { "Region": 1 }
    },
    "Positive": {
      "0": { "Character": 1 }
    },
    "possibilities": {
      "0": { "acintro4": 1 }
    },
    "POSSIBILITY": {
      "0": { "Copyright": 1 }
    },
    "possibility": {
      "0": { "EditorSprite": 1 }
    },
    "possible": {
      "0": { "TextScriptEvents": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "Translations": 1 }
    },
    "Possible": {
      "0": { "TemplateSierraStyle": 1 }
    },
    "possibly": {
      "0": { "Templates": 1 }
    },
    "Post": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "post": {
      "0": { "ContactingTheDevelopers": 2 },
      "1": { "UpgradingTo27": 1 }
    },
    "poster": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "acintro4": 1 }
    },
    "posting": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "potentially": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "Potter": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Poulton": {
      "0": { "Credits": 1 }
    },
    "power": {
      "0": { "Maths": 3 }
    },
    "practice": {
      "0": { "UpgradeTo350": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "pre-AGS": {
      "0": { "Settingupthegame": 4 },
      "1": { "UpgradeTo350": 1 }
    },
    "precede": {
      "0": { "FAQ": 1 }
    },
    "preceded": {
      "0": { "Dictionary": 2 },
      "1": { "Set": 1 }
    },
    "precedence": {
      "0": { "ScriptKeywords": 6 },
      "1": { "Settingupthegame": 3 }
    },
    "precise": {
      "0": { "UpgradeTo350": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "precisely": {
      "0": { "GUIControl": 1 }
    },
    "precision": {
      "0": { "Settingupthegame": 1 }
    },
    "predefined": {
      "0": { "ScriptKeywords": 1 }
    },
    "Predefined": {
      "0": { "TextScriptEvents": 1 }
    },
    "prefer": {
      "0": { "Settingupthegame": 2 },
      "1": { "EditorRoom": 1 }
    },
    "preferable": {
      "0": { "Globalfunctions_General": 1 }
    },
    "preferably": {
      "0": { "Templates": 1 }
    },
    "preference": {
      "0": { "Tumbleweed": 1 }
    },
    "Preferences": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "preferred": {
      "0": { "EditorRoom": 1 }
    },
    "prefix": {
      "0": { "Gamevariables": 1 }
    },
    "PRELOAD": {
      "0": { "DistGame": 1 }
    },
    "prematurely": {
      "0": { "Character": 1 }
    },
    "prepended": {
      "0": { "Mouse": 1 }
    },
    "Preprocessor": {
      "0": { "Preprocessor": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "preprocessor": {
      "0": { "Preprocessor": 2 }
    },
    "present": {
      "0": { "Game": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "presented": {
      "0": { "acintro1": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "Presents": {
      "0": { "Dialog": 1 }
    },
    "preserve": {
      "0": { "Setup": 1 }
    },
    "preserveAlphaChannel": {
      "0": { "DynamicSprite": 2 }
    },
    "preserved": {
      "0": { "Globalfunctions_General": 1 }
    },
    "preset": {
      "0": { "Character": 2 }
    },
    "press": {
      "0": { "Globalfunctions_General": 8 },
      "1": { "Multimedia": 5 },
      "2": { "Settingupthegame": 3 },
      "3": { "acintro2": 2 },
      "4": { "TemplateVerbcoin": 1 }
    },
    "Press": {
      "0": { "acintro2": 1 }
    },
    "pressed": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "ASCIIcodes": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "presses": {
      "0": { "Globalfunctions_General": 11 },
      "1": { "Game": 3 },
      "2": { "ScriptKeywords": 1 }
    },
    "pressing": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "Speech": 5 },
      "2": { "Globalfunctions_Message": 1 }
    },
    "Pressing": {
      "0": { "Debuggingfeatures": 1 }
    },
    "pressure": {
      "0": { "Hotspot": 1 }
    },
    "pretty": {
      "0": { "acintro9": 1 }
    },
    "prevent": {
      "0": { "Tumbleweed_player": 1 }
    },
    "preventing": {
      "0": { "Setup": 1 }
    },
    "prevents": {
      "0": { "Globalfunctions_General": 1 }
    },
    "preview": {
      "0": { "EditorView": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "Preview": {
      "0": { "EditorView": 2 },
      "1": { "acintro2": 1 }
    },
    "previews": {
      "0": { "EditorView": 1 }
    },
    "previous": {
      "0": { "Character": 5 },
      "1": { "UpgradeTo32": 3 },
      "2": { "Mouse": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "Previous": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "PREVIOUS": {
      "0": { "Settingupthegame": 1 }
    },
    "previously": {
      "0": { "File": 5 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "UpgradeTo34": 2 },
      "3": { "Region": 1 }
    },
    "Previously": {
      "0": { "UpgradingTo27": 1 }
    },
    "PreviousRoom": {
      "0": { "Character": 3 }
    },
    "prevroom": {
      "0": { "Character": 1 }
    },
    "price": {
      "0": { "ScriptKeywords": 4 },
      "1": { "RepExec": 1 }
    },
    "Primary": {
      "0": { "Camera": 1 }
    },
    "primary": {
      "0": { "Screen": 6 },
      "1": { "Camera": 3 },
      "2": { "Game": 2 }
    },
    "principle": {
      "0": { "ScriptModules": 1 }
    },
    "principles": {
      "0": { "MusicAndSound": 1 }
    },
    "print": {
      "0": { "Room": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Print": {
      "0": { "Settingupthegame": 1 }
    },
    "printed": {
      "0": { "DrawingSurfaceFunctions": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "printf-style": {
      "0": { "StringFormats": 1 }
    },
    "printouts": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "prints": {
      "0": { "Overlay": 2 },
      "1": { "GUIControl": 1 }
    },
    "priorities": {
      "0": { "acintro2": 1 }
    },
    "Priorities": {
      "0": { "MusicAndSound": 1 }
    },
    "priority": {
      "0": { "MusicAndSound": 6 },
      "1": { "AudioClip": 5 }
    },
    "private": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "Probably": {
      "0": { "acintro8": 1 }
    },
    "probably": {
      "0": { "Character": 5 },
      "1": { "UpgradeTo30": 3 },
      "2": { "Tumbleweed": 2 },
      "3": { "File": 1 }
    },
    "problem": {
      "0": { "ContactingTheDevelopers": 4 },
      "1": { "TroubleshootingWindowsZoneID": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "problems": {
      "0": { "AdvancedRoomFeatures": 2 },
      "1": { "Debuggingfeatures": 1 }
    },
    "proceed": {
      "0": { "ScriptKeywords": 1 }
    },
    "proceedings": {
      "0": { "acintro7": 1 }
    },
    "proceeds": {
      "0": { "ScriptingTutorialPart1": 6 }
    },
    "process": {
      "0": { "EditorSprite": 2 },
      "1": { "TroubleshootingWindowsZoneID": 1 }
    },
    "ProcessClick": {
      "0": { "GUI": 7 },
      "1": { "Room": 5 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "Hotspot": 1 }
    },
    "processed": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Processes": {
      "0": { "String": 1 }
    },
    "processing": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Globalfunctions_Message": 1 }
    },
    "processor": {
      "0": { "Preprocessor": 1 }
    },
    "produce": {
      "0": { "Region": 1 }
    },
    "produced": {
      "0": { "DistGame": 1 }
    },
    "product": {
      "0": { "Credits": 1 }
    },
    "productive": {
      "0": { "Introduction": 1 }
    },
    "products": {
      "0": { "EditorInventoryItems": 1 }
    },
    "professional": {
      "0": { "acintro1": 1 }
    },
    "PROFITS": {
      "0": { "Copyright": 1 }
    },
    "Program": {
      "0": { "UpgradeTo335": 1 }
    },
    "program": {
      "0": { "Settingupthegame": 7 },
      "1": { "DistGame": 2 },
      "2": { "UpgradeTo335": 1 }
    },
    "Programming": {
      "0": { "OOProgramming": 1 }
    },
    "programming": {
      "0": { "ScriptKeywords": 3 },
      "1": { "Pointers": 2 },
      "2": { "ScriptingLanguage": 1 }
    },
    "programs": {
      "0": { "MusicAndSound": 1 }
    },
    "progress": {
      "0": { "Character": 2 },
      "1": { "Globalfunctions_Screen": 1 }
    },
    "progresses": {
      "0": { "acintro3": 1 }
    },
    "ProgZmax": {
      "0": { "Credits": 1 }
    },
    "Project": {
      "0": { "Copyright": 1 }
    },
    "project": {
      "0": { "acintro2": 5 },
      "1": { "Lipsync": 4 },
      "2": { "EditorSprite": 3 },
      "3": { "DistGame": 2 },
      "4": { "EditorCharacter": 1 }
    },
    "project's": {
      "0": { "DistGame": 1 }
    },
    "projects": {
      "0": { "UpgradeTo33": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "prolongs": {
      "0": { "Speech": 1 }
    },
    "promoted": {
      "0": { "UpgradeTo350": 1 }
    },
    "prompt": {
      "0": { "TroubleshootingWindowsZoneID": 3 },
      "1": { "acintro1": 1 }
    },
    "PROMPT": {
      "0": { "Game": 1 }
    },
    "prompted": {
      "0": { "acintro9": 1 }
    },
    "Proper": {
      "0": { "UpgradeTo33": 2 }
    },
    "proper": {
      "0": { "UpgradeTo33": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "properly": {
      "0": { "UpgradeTo31": 2 },
      "1": { "acintro2": 1 }
    },
    "Properties": {
      "0": { "EditingGUIs": 6 },
      "1": { "CustomProperties": 4 },
      "2": { "EditorRoom": 3 },
      "3": { "Screen": 1 }
    },
    "properties": {
      "0": { "Scripting": 35 },
      "1": { "Room": 11 },
      "2": { "CustomProperties": 7 },
      "3": { "Settingupthegame": 6 },
      "4": { "OOProgramming": 5 },
      "5": { "Button": 4 },
      "6": { "UpgradeTo33": 3 },
      "7": { "Region": 2 },
      "8": { "acintro3": 1 }
    },
    "Property": {
      "0": { "MusicAndSound": 2 },
      "1": { "acintro1": 1 }
    },
    "property": {
      "0": { "Character": 71 },
      "1": { "Object": 47 },
      "2": { "InventoryItem": 22 },
      "3": { "Hotspot": 20 },
      "4": { "Room": 19 },
      "5": { "Settingupthegame": 15 },
      "6": { "Region": 13 },
      "7": { "Button": 12 },
      "8": { "Game": 10 },
      "9": { "acintro4": 9 },
      "10": { "ListBox": 8 },
      "11": { "DrawingSurfaceFunctions": 7 },
      "12": { "EditingGUIs": 6 },
      "13": { "acintro2": 5 },
      "14": { "acintro3": 4 },
      "15": { "Mouse": 3 },
      "16": { "acintro5": 2 },
      "17": { "GraphicsDriver": 1 }
    },
    "PROPERTY": {
      "0": { "Room": 2 }
    },
    "property's": {
      "0": { "Room": 2 }
    },
    "proportion": {
      "0": { "TemplateBASS": 1 }
    },
    "proportions": {
      "0": { "Setup": 1 }
    },
    "prospect": {
      "0": { "Pointers": 1 }
    },
    "protect": {
      "0": { "OOProgramming": 2 }
    },
    "protected": {
      "0": { "OOProgramming": 7 },
      "1": { "ScriptKeywords": 5 },
      "2": { "UpgradingTo27": 1 }
    },
    "Protection": {
      "0": { "OOProgramming": 1 }
    },
    "protection": {
      "0": { "File": 3 },
      "1": { "OOProgramming": 1 }
    },
    "prototype": {
      "0": { "Settingupthegame": 2 }
    },
    "provide": {
      "0": { "Plugins": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "provided": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "TextParser": 2 },
      "2": { "ScriptModules": 1 }
    },
    "PROVIDED": {
      "0": { "Copyright": 1 }
    },
    "providers": {
      "0": { "SourceControl": 1 }
    },
    "provides": {
      "0": { "Screen": 1 }
    },
    "Provides": {
      "0": { "GUI": 1 }
    },
    "providing": {
      "0": { "Tumbleweed": 1 }
    },
    "prowess": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "PSP": {
      "0": { "Settingupthegame": 1 }
    },
    "pt": {
      "0": { "Viewport": 8 }
    },
    "PT": {
      "0": { "Tumbleweed": 1 }
    },
    "Public": {
      "0": { "Copyright": 1 }
    },
    "Pull": {
      "0": { "Tumbleweed": 1 }
    },
    "pull": {
      "0": { "Tumbleweed": 1 }
    },
    "punish": {
      "0": { "Settingupthegame": 1 }
    },
    "pure": {
      "0": { "EditorInventoryItems": 1 }
    },
    "purpose": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "PURPOSE": {
      "0": { "Copyright": 1 }
    },
    "purposes": {
      "0": { "acintro1": 1 }
    },
    "push": {
      "0": { "EditorRoom": 4 },
      "1": { "EventTypes": 1 }
    },
    "Push": {
      "0": { "Tumbleweed": 1 }
    },
    "pushed": {
      "0": { "Button": 7 },
      "1": { "GUIControl": 1 }
    },
    "PushedGraphic": {
      "0": { "Button": 7 }
    },
    "put": {
      "0": { "Settingupthegame": 4 },
      "1": { "ScriptKeywords": 3 },
      "2": { "ScriptingTutorialPart2": 2 },
      "3": { "SourceControl": 1 }
    },
    "Put": {
      "0": { "DialogOptionsRenderingInfo": 3 },
      "1": { "RepExec": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "Puts": {
      "0": { "Settingupthegame": 3 }
    },
    "puts": {
      "0": { "SourceControl": 1 }
    },
    "Putting": {
      "0": { "TextParser": 1 }
    },
    "putting": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "puzzle": {
      "0": { "acintro4": 1 }
    },
    "puzzles": {
      "0": { "Settingupthegame": 1 }
    },
    "QFG": {
      "0": { "File": 1 }
    },
    "qualified": {
      "0": { "Game": 1 }
    },
    "qualifies": {
      "0": { "acintro8": 1 }
    },
    "quality": {
      "0": { "MusicAndSound": 1 }
    },
    "quantity": {
      "0": { "Character": 1 }
    },
    "quarter": {
      "0": { "Mouse": 1 }
    },
    "query": {
      "0": { "System": 1 }
    },
    "Quest": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro2": 1 }
    },
    "question": {
      "0": { "ContactingTheDevelopers": 5 },
      "1": { "MusicAndSound": 1 }
    },
    "Questions": {
      "0": { "FAQ": 1 }
    },
    "questions": {
      "0": { "acintro8": 2 },
      "1": { "ContactingTheDevelopers": 1 }
    },
    "queue": {
      "0": { "AudioClip": 4 },
      "1": { "BlockingScripts": 2 },
      "2": { "Character": 1 }
    },
    "queued": {
      "0": { "Multimedia": 1 }
    },
    "queues": {
      "0": { "AudioClip": 2 }
    },
    "Quick": {
      "0": { "UpgradeTo30": 1 }
    },
    "quick": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "quickly": {
      "0": { "Character": 3 },
      "1": { "acintro4": 2 },
      "2": { "Pointers": 1 }
    },
    "quieter": {
      "0": { "Character": 1 }
    },
    "quirk": {
      "0": { "Character": 1 }
    },
    "Quit": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "quit": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Gamevariables": 1 }
    },
    "quite": {
      "0": { "ScriptingTutorialPart1": 4 },
      "1": { "Pointers": 3 },
      "2": { "acintro5": 1 }
    },
    "QuitGame": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "UpgradingTo27": 1 }
    },
    "quits": {
      "0": { "ScriptKeywords": 1 }
    },
    "Quits": {
      "0": { "Globalfunctions_General": 1 }
    },
    "quotes": {
      "0": { "TroubleshootingWindowsZoneID": 2 }
    },
    "radians": {
      "0": { "Maths": 32 }
    },
    "RadiansToDegrees": {
      "0": { "Maths": 8 }
    },
    "Radiant's": {
      "0": { "acintro9": 1 }
    },
    "radius": {
      "0": { "DrawingSurfaceFunctions": 3 },
      "1": { "TemplateVerbcoin": 1 }
    },
    "Radius": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "RADIUS": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "rain": {
      "0": { "Character": 1 }
    },
    "raise": {
      "0": { "Character": 2 }
    },
    "raised": {
      "0": { "Globalfunctions_General": 1 }
    },
    "RaiseToPower": {
      "0": { "Maths": 4 }
    },
    "ran": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "Preprocessor": 1 }
    },
    "Random": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Character": 2 }
    },
    "random": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Character": 1 }
    },
    "randomly": {
      "0": { "Character": 1 }
    },
    "range": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "acintro7": 1 }
    },
    "ranges": {
      "0": { "Multimedia": 3 },
      "1": { "acintro1": 1 }
    },
    "ranging": {
      "0": { "UpgradeTo31": 1 }
    },
    "rare": {
      "0": { "ScriptKeywords": 1 }
    },
    "rarely": {
      "0": { "FAQ": 1 }
    },
    "raster": {
      "0": { "Settingupthegame": 1 }
    },
    "rate": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "System": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "rather": {
      "0": { "Settingupthegame": 7 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "Character": 4 },
      "3": { "UpgradeTo335": 3 },
      "4": { "ScriptKeywords": 2 },
      "5": { "Hotspot": 1 }
    },
    "Rather": {
      "0": { "acintro7": 1 }
    },
    "ratio": {
      "0": { "Setup": 3 },
      "1": { "Multimedia": 1 }
    },
    "raw": {
      "0": { "File": 6 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "DistGame": 1 }
    },
    "Raw": {
      "0": { "InventoryItem": 1 }
    },
    "RawClearScreen": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawDraw": {
      "0": { "UpgradeTo30": 3 },
      "1": { "GraphicsDriver": 1 }
    },
    "RawDrawCircle": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawDrawFrameTransparent": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawDrawImage": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawDrawImageResized": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawDrawImageTransparent": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawDrawing": {
      "0": { "System": 1 }
    },
    "RawDrawLine": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawDrawRectangle": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawDrawTriangle": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawPrint": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawPrintMessageWrapped": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawRestoreScreen": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawSaveScreen": {
      "0": { "DrawingSurfaceFunctions": 2 }
    },
    "RawSetColor": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "RawSetColorRGB": {
      "0": { "Game": 1 }
    },
    "RawTime": {
      "0": { "DateTime": 5 }
    },
    "re-appears": {
      "0": { "acintro4": 1 }
    },
    "re-colourize": {
      "0": { "Globalfunctions_General": 1 }
    },
    "re-compile": {
      "0": { "TheScriptHeader": 1 }
    },
    "re-edit": {
      "0": { "Lipsync": 1 }
    },
    "re-enable": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "Re-enables": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "re-enters": {
      "0": { "Hotspot": 1 }
    },
    "re-import": {
      "0": { "acintro1": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "re-numbered": {
      "0": { "ListBox": 1 }
    },
    "re-think": {
      "0": { "Tumbleweed": 1 }
    },
    "re-write": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "re-written": {
      "0": { "MusicAndSound": 1 }
    },
    "reach": {
      "0": { "Character": 1 }
    },
    "reached": {
      "0": { "Tumbleweed_movement": 13 },
      "1": { "Character": 4 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "Lipsync": 1 }
    },
    "reaches": {
      "0": { "Tumbleweed_movement": 2 }
    },
    "react": {
      "0": { "Game": 2 }
    },
    "reaction": {
      "0": { "Tumbleweed_unhandled": 1 }
    },
    "reactions": {
      "0": { "Tumbleweed_unhandled": 1 }
    },
    "read": {
      "0": { "File": 30 },
      "1": { "DialogOptionsRenderingInfo": 6 },
      "2": { "Settingupthegame": 3 },
      "3": { "Game": 2 },
      "4": { "ScriptKeywords": 1 }
    },
    "read-only": {
      "0": { "Character": 18 },
      "1": { "Object": 11 },
      "2": { "Region": 5 },
      "3": { "AudioChannel": 2 },
      "4": { "Hotspot": 1 }
    },
    "readable": {
      "0": { "ScriptKeywords": 2 },
      "1": { "OOProgramming": 1 }
    },
    "reading": {
      "0": { "File": 10 },
      "1": { "Game": 3 },
      "2": { "UpgradeTo335": 2 },
      "3": { "Globalfunctions_Message": 1 }
    },
    "Reading": {
      "0": { "ScriptKeywords": 1 }
    },
    "ReadInt": {
      "0": { "File": 5 }
    },
    "ReadIntBack": {
      "0": { "File": 1 }
    },
    "README": {
      "0": { "Templates": 2 }
    },
    "readme": {
      "0": { "Plugins": 1 }
    },
    "readonly": {
      "0": { "Character": 24 },
      "1": { "Game": 18 },
      "2": { "System": 16 },
      "3": { "Object": 15 },
      "4": { "Room": 10 },
      "5": { "DateTime": 8 },
      "6": { "Region": 7 },
      "7": { "AudioChannel": 6 },
      "8": { "Screen": 5 },
      "9": { "Hotspot": 4 },
      "10": { "Dialog": 3 },
      "11": { "DrawingSurfaceFunctions": 2 },
      "12": { "Maths": 1 }
    },
    "ReadRawChar": {
      "0": { "File": 6 }
    },
    "ReadRawInt": {
      "0": { "File": 6 }
    },
    "ReadRawLine": {
      "0": { "File": 1 }
    },
    "ReadRawLineBack": {
      "0": { "File": 4 }
    },
    "Reads": {
      "0": { "File": 5 }
    },
    "ReadString": {
      "0": { "File": 1 }
    },
    "ReadStringBack": {
      "0": { "File": 11 }
    },
    "ready": {
      "0": { "acintro1": 1 }
    },
    "real": {
      "0": { "UpgradeTo350": 2 },
      "1": { "Multimedia": 1 }
    },
    "Real": {
      "0": { "UpgradeTo350": 1 }
    },
    "real-time": {
      "0": { "DateTime": 1 }
    },
    "reality": {
      "0": { "Character": 1 }
    },
    "realize": {
      "0": { "Multimedia": 1 }
    },
    "really": {
      "0": { "Settingupthegame": 4 },
      "1": { "acintro1": 2 },
      "2": { "acintro9": 1 }
    },
    "REALLY": {
      "0": { "Game": 1 }
    },
    "RealName": {
      "0": { "acintro7": 3 },
      "1": { "acintro8": 1 }
    },
    "rearrange": {
      "0": { "GUIControl": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "reason": {
      "0": { "Game": 7 },
      "1": { "Pointers": 2 },
      "2": { "Region": 1 }
    },
    "reasons": {
      "0": { "File": 2 },
      "1": { "Region": 1 }
    },
    "rebuild": {
      "0": { "UpgradeTo341": 2 },
      "1": { "UpgradeTo34": 1 }
    },
    "Recap": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "receive": {
      "0": { "Scripting": 1 }
    },
    "received": {
      "0": { "UpgradeTo34": 1 }
    },
    "receiving": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "recent": {
      "0": { "ListBox": 2 },
      "1": { "ContactingTheDevelopers": 1 }
    },
    "recently": {
      "0": { "Multimedia": 1 }
    },
    "recognize": {
      "0": { "TextParser": 1 }
    },
    "recognized": {
      "0": { "Character": 1 }
    },
    "recommend": {
      "0": { "Globalfunctions_General": 1 }
    },
    "recommended": {
      "0": { "Object": 3 },
      "1": { "DrawingSurfaceFunctions": 2 },
      "2": { "DynamicSprite": 1 }
    },
    "Recommended": {
      "0": { "ScriptKeywords": 1 }
    },
    "recompiled": {
      "0": { "UpgradeTo341": 1 }
    },
    "reconfigured": {
      "0": { "TemplateSierraStyle": 1 }
    },
    "recording": {
      "0": { "AutonumberSpeechFiles": 1 }
    },
    "recreate": {
      "0": { "Tumbleweed": 1 }
    },
    "recreated": {
      "0": { "Settingupthegame": 1 }
    },
    "Rectangle": {
      "0": { "acintro2": 1 }
    },
    "rectangle": {
      "0": { "EditingGUIs": 5 },
      "1": { "Object": 4 },
      "2": { "ListBox": 2 },
      "3": { "EditorRoom": 1 }
    },
    "rectangles": {
      "0": { "Settingupthegame": 1 }
    },
    "rectangular": {
      "0": { "Camera": 1 }
    },
    "recursive": {
      "0": { "SystemLimits": 2 }
    },
    "recursively": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "RED": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Region": 1 }
    },
    "red": {
      "0": { "Globalfunctions_Screen": 4 },
      "1": { "Globalfunctions_Palette": 3 },
      "2": { "Region": 2 },
      "3": { "EditorInventoryItems": 1 }
    },
    "Red": {
      "0": { "Region": 1 }
    },
    "redirect": {
      "0": { "UpgradingTo27": 1 }
    },
    "redirected": {
      "0": { "UpgradeTo335": 1 }
    },
    "Redirection": {
      "0": { "UpgradeTo335": 1 }
    },
    "redistributable": {
      "0": { "SystemRequirements": 2 }
    },
    "Redo": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "redraw": {
      "0": { "DialogOptionsRenderingInfo": 2 },
      "1": { "acintro9": 1 }
    },
    "redrawn": {
      "0": { "TextScriptEvents": 1 }
    },
    "redrew": {
      "0": { "RepExec": 1 }
    },
    "reduce": {
      "0": { "Settingupthegame": 3 },
      "1": { "Multimedia": 2 },
      "2": { "UpgradeTo350": 1 }
    },
    "reduced": {
      "0": { "Multimedia": 1 }
    },
    "reduces": {
      "0": { "Setup": 1 }
    },
    "reducing": {
      "0": { "Setup": 1 }
    },
    "Reed": {
      "0": { "Credits": 1 }
    },
    "refer": {
      "0": { "Settingupthegame": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "reference": {
      "0": { "Tumbleweed": 3 },
      "1": { "Pointers": 2 },
      "2": { "acintro8": 1 }
    },
    "Reference": {
      "0": { "GUI": 1 }
    },
    "referenced": {
      "0": { "Pointers": 1 }
    },
    "references": {
      "0": { "ListBox": 1 }
    },
    "referencing": {
      "0": { "FAQ": 1 }
    },
    "referred": {
      "0": { "Settingupthegame": 1 }
    },
    "refers": {
      "0": { "EditorRoom": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "reflect": {
      "0": { "Mouse": 1 }
    },
    "reflects": {
      "0": { "Region": 1 }
    },
    "refresh": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "System": 1 }
    },
    "refreshed": {
      "0": { "Character": 4 }
    },
    "RefreshMouse": {
      "0": { "Mouse": 1 }
    },
    "refuse": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "regardless": {
      "0": { "GUIControl": 1 }
    },
    "Region": {
      "0": { "Region": 73 },
      "1": { "Globalfunctions_Room": 5 },
      "2": { "Hotspot": 3 },
      "3": { "Scripting": 2 },
      "4": { "EventTypes": 1 }
    },
    "region": {
      "0": { "Region": 63 },
      "1": { "EventTypes": 7 },
      "2": { "Character": 5 },
      "3": { "Object": 3 },
      "4": { "Globalfunctions_General": 2 },
      "5": { "AdvancedRoomFeatures": 1 }
    },
    "region's": {
      "0": { "Region": 10 },
      "1": { "Character": 1 }
    },
    "Region's": {
      "0": { "Region": 1 }
    },
    "Regions": {
      "0": { "EditorRoom": 1 }
    },
    "regions": {
      "0": { "UpgradeTo350": 3 },
      "1": { "Globalfunctions_Room": 2 },
      "2": { "acintro1": 1 }
    },
    "REGIONS": {
      "0": { "ScriptKeywords": 1 }
    },
    "register": {
      "0": { "TemplateBASS": 2 },
      "1": { "GUIControl": 1 }
    },
    "RegisterButton": {
      "0": { "TemplateVerbcoin": 6 }
    },
    "registered": {
      "0": { "Copyright": 1 }
    },
    "registergame": {
      "0": { "IntegrationWithWindows": 4 }
    },
    "Registers": {
      "0": { "TemplateVerbcoin": 4 }
    },
    "regular": {
      "0": { "Game": 2 }
    },
    "regularly": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Reinstall": {
      "0": { "Templates": 1 }
    },
    "rejected": {
      "0": { "File": 1 }
    },
    "related": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "relates": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "relation": {
      "0": { "Object": 1 }
    },
    "Relative": {
      "0": { "Game": 1 }
    },
    "relative": {
      "0": { "Settingupthegame": 5 },
      "1": { "GUIControl": 4 },
      "2": { "Character": 3 },
      "3": { "UpgradeTo335": 2 },
      "4": { "Gamevariables": 1 }
    },
    "relatively": {
      "0": { "DynamicSprite": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "release": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Release": {
      "0": { "DrawingSurfaceFunctions": 23 },
      "1": { "DynamicSprite": 15 },
      "2": { "Room": 3 },
      "3": { "Globalfunctions_General": 1 }
    },
    "ReleaseCharacterView": {
      "0": { "Character": 1 }
    },
    "released": {
      "0": { "DynamicSprite": 7 },
      "1": { "Globalfunctions_Room": 2 },
      "2": { "Tumbleweed": 1 }
    },
    "Releases": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "releases": {
      "0": { "Room": 1 }
    },
    "ReleaseViewport": {
      "0": { "Globalfunctions_Room": 3 },
      "1": { "UpgradeTo350": 1 }
    },
    "relevant": {
      "0": { "EditingGUIs": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "reliably": {
      "0": { "System": 1 }
    },
    "relies": {
      "0": { "TextScriptEvents": 1 }
    },
    "Relight": {
      "0": { "Credits": 1 }
    },
    "rely": {
      "0": { "Character": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "Object": 1 }
    },
    "remain": {
      "0": { "Character": 3 },
      "1": { "Object": 2 },
      "2": { "Globalfunctions_Screen": 1 }
    },
    "Remainder": {
      "0": { "ScriptKeywords": 1 }
    },
    "remained": {
      "0": { "UpgradingTo27": 1 }
    },
    "remaining": {
      "0": { "acintro1": 1 }
    },
    "remains": {
      "0": { "UpgradeTo31": 1 }
    },
    "remap": {
      "0": { "Settingupthegame": 1 }
    },
    "remapped": {
      "0": { "UpgradeTo335": 1 }
    },
    "remedy": {
      "0": { "Lipsync": 1 }
    },
    "Remember": {
      "0": { "acintro5": 1 }
    },
    "remember": {
      "0": { "Pointers": 3 },
      "1": { "acintro7": 2 },
      "2": { "UpgradingTo27": 1 }
    },
    "REMEMBER": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "remembered": {
      "0": { "Pointers": 1 }
    },
    "remembers": {
      "0": { "MusicAndSound": 1 }
    },
    "REMINDER": {
      "0": { "UpgradeTo34": 1 }
    },
    "reminds": {
      "0": { "FAQ": 1 }
    },
    "remnant": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "removal": {
      "0": { "Character": 1 }
    },
    "remove": {
      "0": { "Overlay": 4 },
      "1": { "Tumbleweed": 3 },
      "2": { "IntegrationWithWindows": 2 },
      "3": { "Region": 1 }
    },
    "Remove": {
      "0": { "Overlay": 15 },
      "1": { "Set": 4 },
      "2": { "Dictionary": 3 },
      "3": { "Character": 1 }
    },
    "Removed": {
      "0": { "UpgradeTo350": 3 }
    },
    "removed": {
      "0": { "Game": 7 },
      "1": { "UpgradeTo30": 3 },
      "2": { "ScriptKeywords": 2 },
      "3": { "Tumbleweed_movement": 1 }
    },
    "RemoveExtension": {
      "0": { "Tumbleweed_extensions": 3 },
      "1": { "Tumbleweed_actions": 1 }
    },
    "RemoveItem": {
      "0": { "ListBox": 6 }
    },
    "RemoveObjectTint": {
      "0": { "Object": 1 }
    },
    "RemoveOverlay": {
      "0": { "Overlay": 1 }
    },
    "removes": {
      "0": { "Character": 3 },
      "1": { "Object": 2 },
      "2": { "File": 1 }
    },
    "Removes": {
      "0": { "ListBox": 2 },
      "1": { "Character": 1 }
    },
    "RemoveTint": {
      "0": { "Character": 8 },
      "1": { "Object": 6 }
    },
    "RemoveWalkableArea": {
      "0": { "Globalfunctions_Room": 5 },
      "1": { "Hotspot": 1 }
    },
    "removing": {
      "0": { "Set": 1 }
    },
    "rename": {
      "0": { "UpgradeTo32": 2 },
      "1": { "EditorSprite": 1 }
    },
    "renamed": {
      "0": { "Settingupthegame": 1 }
    },
    "render": {
      "0": { "DialogOptionsRenderingInfo": 12 },
      "1": { "CustomDialogOptions": 3 },
      "2": { "acintro9": 1 }
    },
    "Render": {
      "0": { "CustomDialogOptions": 2 },
      "1": { "Setup": 1 }
    },
    "RenderAtScreenResolution": {
      "0": { "System": 2 }
    },
    "rendered": {
      "0": { "Settingupthegame": 2 },
      "1": { "System": 1 }
    },
    "renderer": {
      "0": { "System": 4 },
      "1": { "Screen": 2 },
      "2": { "Setup": 1 }
    },
    "rendering": {
      "0": { "Settingupthegame": 5 },
      "1": { "UpgradeTo34": 3 },
      "2": { "UpgradeTo33": 2 },
      "3": { "TextWindowGUI": 1 }
    },
    "renders": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "repainted": {
      "0": { "Globalfunctions_General": 1 }
    },
    "repair": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "Repeat": {
      "0": { "AudioClip": 1 }
    },
    "REPEAT": {
      "0": { "Button": 1 }
    },
    "repeat": {
      "0": { "Character": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "repeated": {
      "0": { "EditingGUIs": 1 }
    },
    "repeatedly": {
      "0": { "RepExec": 28 },
      "1": { "Character": 9 },
      "2": { "BlockingScripts": 5 },
      "3": { "EventTypes": 4 },
      "4": { "ScriptKeywords": 3 },
      "5": { "ScriptingTutorialPart2": 2 },
      "6": { "Room": 1 }
    },
    "Repeatedly": {
      "0": { "EventTypes": 1 }
    },
    "repeating": {
      "0": { "AudioClip": 1 }
    },
    "RepeatStyle": {
      "0": { "Object": 4 },
      "1": { "AudioClip": 3 },
      "2": { "Button": 1 }
    },
    "repexec": {
      "0": { "CustomDialogOptions": 3 },
      "1": { "UpgradeTo34": 2 }
    },
    "RepExec": {
      "0": { "RepExec": 2 }
    },
    "REPLACE": {
      "0": { "Translations": 1 }
    },
    "Replace": {
      "0": { "String": 4 },
      "1": { "acintro6": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "acintro1": 1 }
    },
    "replace": {
      "0": { "TroubleshootingWindowsZoneID": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "ReplaceCharAt": {
      "0": { "String": 6 }
    },
    "replaced": {
      "0": { "UpgradeTo350": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "replacement": {
      "0": { "Globalfunctions_General": 1 }
    },
    "replaces": {
      "0": { "Settingupthegame": 1 }
    },
    "Replaces": {
      "0": { "Screen": 4 },
      "1": { "Overlay": 1 }
    },
    "replaceWithText": {
      "0": { "String": 2 }
    },
    "replies": {
      "0": { "acintro8": 1 }
    },
    "reply": {
      "0": { "acintro3": 1 }
    },
    "replying": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "reports": {
      "0": { "Credits": 1 }
    },
    "reposition": {
      "0": { "Overlay": 1 }
    },
    "represent": {
      "0": { "UpgradeTo32": 2 },
      "1": { "Pointers": 1 }
    },
    "represented": {
      "0": { "DateTime": 6 },
      "1": { "ViewFrame": 3 },
      "2": { "UpgradingTo27": 1 }
    },
    "representing": {
      "0": { "DateTime": 5 },
      "1": { "Region": 2 },
      "2": { "MusicAndSound": 1 }
    },
    "represents": {
      "0": { "AudioChannel": 3 },
      "1": { "ScriptKeywords": 1 }
    },
    "request": {
      "0": { "Dialog": 4 },
      "1": { "Settingupthegame": 2 },
      "2": { "Speech": 1 }
    },
    "requested": {
      "0": { "GUIControl": 1 }
    },
    "require": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Pointers": 1 }
    },
    "required": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Requirements": {
      "0": { "Introduction": 1 }
    },
    "requirements": {
      "0": { "SystemRequirements": 2 }
    },
    "requires": {
      "0": { "ScriptKeywords": 1 }
    },
    "requiring": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "rescue": {
      "0": { "MusicAndSound": 1 }
    },
    "rescued": {
      "0": { "Character": 1 }
    },
    "reserved": {
      "0": { "Settingupthegame": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "reset": {
      "0": { "Globalfunctions_Room": 5 },
      "1": { "Region": 2 },
      "2": { "Hotspot": 1 }
    },
    "ResetRoom": {
      "0": { "Globalfunctions_Room": 5 },
      "1": { "CustomProperties": 1 }
    },
    "resets": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "resizable": {
      "0": { "GUIControl": 2 }
    },
    "resize": {
      "0": { "GUIControl": 4 },
      "1": { "DrawingSurfaceFunctions": 2 },
      "2": { "Setup": 1 }
    },
    "Resize": {
      "0": { "DynamicSprite": 11 }
    },
    "resized": {
      "0": { "Screen": 4 },
      "1": { "EditingGUIs": 1 }
    },
    "Resizes": {
      "0": { "DynamicSprite": 1 }
    },
    "resizes": {
      "0": { "DynamicSprite": 1 }
    },
    "Resizing": {
      "0": { "DynamicSprite": 1 }
    },
    "resizing": {
      "0": { "DynamicSprite": 2 },
      "1": { "Setup": 1 }
    },
    "resolution": {
      "0": { "UpgradeTo350": 16 },
      "1": { "Settingupthegame": 10 },
      "2": { "System": 5 },
      "3": { "Setup": 3 },
      "4": { "UpgradeTo34": 2 },
      "5": { "AdvancedRoomFeatures": 1 }
    },
    "Resolution": {
      "0": { "acintro1": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "resolutions": {
      "0": { "acintro1": 2 },
      "1": { "UpgradeTo31": 1 }
    },
    "resource": {
      "0": { "DistGame": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "resources": {
      "0": { "Settingupthegame": 3 },
      "1": { "DistGame": 2 },
      "2": { "System": 1 }
    },
    "Resources": {
      "0": { "Plugins": 1 }
    },
    "respect": {
      "0": { "DynamicSprite": 1 }
    },
    "respected": {
      "0": { "Speech": 1 }
    },
    "respecting": {
      "0": { "Setup": 1 }
    },
    "respective": {
      "0": { "FAQ": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "respectively": {
      "0": { "TextScriptEvents": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "respects": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "respond": {
      "0": { "GUIControl": 2 },
      "1": { "EditingGUIs": 1 }
    },
    "responds": {
      "0": { "Globalfunctions_General": 1 }
    },
    "response": {
      "0": { "InvWindow": 2 },
      "1": { "TextParser": 1 }
    },
    "responses": {
      "0": { "ScriptKeywords": 1 }
    },
    "responsible": {
      "0": { "Copyright": 2 }
    },
    "responsibly": {
      "0": { "Copyright": 1 }
    },
    "responsive": {
      "0": { "Globalfunctions_General": 1 }
    },
    "rest": {
      "0": { "ScriptModules": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Rest-of-Line": {
      "0": { "TextParser": 1 }
    },
    "Restart": {
      "0": { "Globalfunctions_General": 1 }
    },
    "restart": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "ScriptKeywords": 1 }
    },
    "restarted": {
      "0": { "Globalfunctions_General": 1 }
    },
    "RestartGame": {
      "0": { "Globalfunctions_General": 4 }
    },
    "Restarts": {
      "0": { "Globalfunctions_General": 1 }
    },
    "restore": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "DrawingSurfaceFunctions": 3 },
      "2": { "Mouse": 2 },
      "3": { "Button": 1 }
    },
    "restored": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "DrawingSurfaceFunctions": 1 }
    },
    "RestoreGameDialog": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Game": 1 }
    },
    "RestoreGameSlot": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "ListBox": 2 },
      "2": { "Game": 1 }
    },
    "Restores": {
      "0": { "Globalfunctions_General": 1 }
    },
    "restores": {
      "0": { "Mouse": 1 }
    },
    "RestoreWalkableArea": {
      "0": { "Globalfunctions_Room": 5 },
      "1": { "Hotspot": 1 }
    },
    "restoring": {
      "0": { "Globalfunctions_General": 1 }
    },
    "restrained": {
      "0": { "Button": 1 }
    },
    "restrict": {
      "0": { "Mouse": 1 }
    },
    "restricted": {
      "0": { "ScriptKeywords": 1 }
    },
    "restriction": {
      "0": { "UpgradeTo350": 2 }
    },
    "restrictions": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "restrictive": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "Restricts": {
      "0": { "Mouse": 1 }
    },
    "result": {
      "0": { "ScriptKeywords": 7 },
      "1": { "ScriptingTutorialPart2": 4 },
      "2": { "DynamicSprite": 3 },
      "3": { "Maths": 2 },
      "4": { "UpgradeTo335": 1 }
    },
    "Result": {
      "0": { "ScriptKeywords": 2 }
    },
    "Resulting": {
      "0": { "Screen": 2 }
    },
    "resulting": {
      "0": { "UpgradeTo341": 1 }
    },
    "RESULTING": {
      "0": { "Copyright": 1 }
    },
    "results": {
      "0": { "Settingupthegame": 3 },
      "1": { "ScriptKeywords": 2 },
      "2": { "File": 1 }
    },
    "resume": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Character": 1 }
    },
    "Resumes": {
      "0": { "Globalfunctions_General": 1 }
    },
    "resumes": {
      "0": { "Character": 3 },
      "1": { "Object": 1 }
    },
    "retain": {
      "0": { "UpgradeTo350": 1 }
    },
    "retained": {
      "0": { "UpgradeTo30": 1 }
    },
    "retaining": {
      "0": { "Character": 1 }
    },
    "retains": {
      "0": { "Camera": 1 }
    },
    "retrace": {
      "0": { "System": 2 }
    },
    "retrieve": {
      "0": { "Room": 4 },
      "1": { "Hotspot": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "retrieved": {
      "0": { "InvWindow": 1 }
    },
    "retro": {
      "0": { "acintro1": 1 }
    },
    "RETURN": {
      "0": { "ASCIIcodes": 1 }
    },
    "return": {
      "0": { "ScriptKeywords": 13 },
      "1": { "Settingupthegame": 11 },
      "2": { "Character": 9 },
      "3": { "Globalfunctions_General": 8 },
      "4": { "Globalfunctions_Room": 7 },
      "5": { "acintro8": 6 },
      "6": { "Object": 5 },
      "7": { "Viewport": 4 },
      "8": { "CustomDialogOptions": 3 },
      "9": { "acintro4": 2 },
      "10": { "EditingGUIs": 1 }
    },
    "Return": {
      "0": { "acintro9": 1 }
    },
    "Returned": {
      "0": { "StandardEnums": 1 }
    },
    "returned": {
      "0": { "Game": 9 },
      "1": { "String": 7 },
      "2": { "Tumbleweed_movement": 5 },
      "3": { "Parser": 4 },
      "4": { "Region": 3 },
      "5": { "Character": 2 },
      "6": { "InvWindow": 1 }
    },
    "returning": {
      "0": { "Character": 2 },
      "1": { "Set": 1 }
    },
    "Returning": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "returns": {
      "0": { "Character": 11 },
      "1": { "Object": 9 },
      "2": { "File": 7 },
      "3": { "String": 6 },
      "4": { "Hotspot": 5 },
      "5": { "Globalfunctions_Room": 4 },
      "6": { "Room": 3 },
      "7": { "GUIControl": 2 },
      "8": { "Overlay": 1 }
    },
    "Returns": {
      "0": { "Game": 23 },
      "1": { "Character": 20 },
      "2": { "Globalfunctions_General": 15 },
      "3": { "String": 14 },
      "4": { "Room": 13 },
      "5": { "System": 9 },
      "6": { "Tumbleweed_movement": 6 },
      "7": { "Tumbleweed_helper": 5 },
      "8": { "DynamicSprite": 4 },
      "9": { "Region": 3 },
      "10": { "Viewport": 2 },
      "11": { "Overlay": 1 }
    },
    "reveal": {
      "0": { "EditorRoom": 1 }
    },
    "reverse": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "reversed": {
      "0": { "TemplateBASS": 2 }
    },
    "ReversedClicks": {
      "0": { "TemplateBASS": 3 }
    },
    "revert": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "reverts": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "revisit": {
      "0": { "acintro4": 1 }
    },
    "revisited": {
      "0": { "acintro3": 1 }
    },
    "rewrite": {
      "0": { "UpgradeTo350": 1 }
    },
    "RGB": {
      "0": { "Region": 8 },
      "1": { "Globalfunctions_Screen": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Right": {
      "0": { "EditorView": 3 },
      "1": { "acintro3": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "RIGHT": {
      "0": { "TextScriptEvents": 1 }
    },
    "right": {
      "0": { "Settingupthegame": 12 },
      "1": { "Character": 10 },
      "2": { "EditorView": 6 },
      "3": { "Globalfunctions_General": 5 },
      "4": { "Tumbleweed": 4 },
      "5": { "EditorSprite": 3 },
      "6": { "Speech": 2 },
      "7": { "Pointers": 1 }
    },
    "right-align": {
      "0": { "Globalfunctions_General": 1 }
    },
    "right-aligned": {
      "0": { "Gamevariables": 1 }
    },
    "Right-click": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro2": 1 }
    },
    "right-click": {
      "0": { "Settingupthegame": 9 },
      "1": { "TemplateBASS": 3 },
      "2": { "Mouse": 2 },
      "3": { "CustomProperties": 1 }
    },
    "Right-clicking": {
      "0": { "acintro6": 1 }
    },
    "right-clicking": {
      "0": { "Settingupthegame": 3 },
      "1": { "TemplateBASS": 2 },
      "2": { "Translations": 1 }
    },
    "right-clicks": {
      "0": { "CustomProperties": 1 }
    },
    "right-drag": {
      "0": { "acintro6": 1 }
    },
    "right-to-left": {
      "0": { "ScriptKeywords": 1 }
    },
    "Right-to-Left": {
      "0": { "Settingupthegame": 1 }
    },
    "Right-to-left": {
      "0": { "Globalfunctions_General": 1 }
    },
    "RightArrow": {
      "0": { "ASCIIcodes": 1 }
    },
    "Rightclick": {
      "0": { "MusicAndSound": 1 }
    },
    "RightEdge": {
      "0": { "Room": 6 }
    },
    "RightEdgeX": {
      "0": { "EditorRoom": 1 }
    },
    "rights": {
      "0": { "UpgradeTo335": 1 }
    },
    "RIGHTTOLEFT": {
      "0": { "Globalfunctions_General": 1 }
    },
    "risk": {
      "0": { "Lipsync": 1 }
    },
    "Rittenhouse": {
      "0": { "Credits": 1 }
    },
    "road": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Robert": {
      "0": { "Credits": 1 }
    },
    "Robinson": {
      "0": { "Credits": 1 }
    },
    "rock": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "Object": 1 }
    },
    "Rock": {
      "0": { "Object": 3 }
    },
    "Roger": {
      "0": { "Settingupthegame": 3 },
      "1": { "acintro8": 1 }
    },
    "Roger's": {
      "0": { "acintro1": 1 }
    },
    "rol": {
      "0": { "TextParser": 2 }
    },
    "ROLLEYES": {
      "0": { "Mouse": 2 }
    },
    "ROM": {
      "0": { "Multimedia": 1 }
    },
    "room": {
      "0": { "Character": 56 },
      "1": { "Room": 41 },
      "2": { "Globalfunctions_Room": 36 },
      "3": { "UpgradeTo350": 31 },
      "4": { "acintro2": 24 },
      "5": { "Settingupthegame": 22 },
      "6": { "Globalfunctions_General": 20 },
      "7": { "Camera": 19 },
      "8": { "Object": 17 },
      "9": { "Screen": 16 },
      "10": { "DrawingSurfaceFunctions": 13 },
      "11": { "AdvancedRoomFeatures": 12 },
      "12": { "Viewport": 11 },
      "13": { "acintro3": 10 },
      "14": { "EventTypes": 9 },
      "15": { "RepExec": 8 },
      "16": { "Tumbleweed": 7 },
      "17": { "Debuggingfeatures": 6 },
      "18": { "acintro1": 5 },
      "19": { "Gamevariables": 4 },
      "20": { "UpgradeTo33": 3 },
      "21": { "Region": 2 },
      "22": { "Tutorial": 1 }
    },
    "ROOM": {
      "0": { "DrawingSurfaceFunctions": 3 },
      "1": { "Globalfunctions_Room": 2 },
      "2": { "Region": 1 }
    },
    "Room": {
      "0": { "Room": 63 },
      "1": { "DrawingSurfaceFunctions": 21 },
      "2": { "EditorRoom": 10 },
      "3": { "DynamicSprite": 9 },
      "4": { "Character": 6 },
      "5": { "Globalfunctions_General": 5 },
      "6": { "CustomProperties": 4 },
      "7": { "UpgradeTo350": 3 },
      "8": { "Region": 2 },
      "9": { "Hotspot": 1 }
    },
    "room's": {
      "0": { "Room": 10 },
      "1": { "Object": 3 },
      "2": { "Screen": 2 },
      "3": { "Viewport": 1 }
    },
    "room-dependent": {
      "0": { "Settingupthegame": 1 }
    },
    "roomNNN": {
      "0": { "UpgradeTo350": 1 }
    },
    "roompt": {
      "0": { "UpgradeTo350": 3 }
    },
    "rooms": {
      "0": { "UpgradeTo350": 6 },
      "1": { "Settingupthegame": 4 },
      "2": { "AdvancedRoomFeatures": 3 },
      "3": { "TextScriptEvents": 2 },
      "4": { "ScriptKeywords": 1 }
    },
    "Rooms": {
      "0": { "acintro2": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "roomscript": {
      "0": { "Gamevariables": 1 }
    },
    "RoomToScreenPoint": {
      "0": { "Screen": 6 },
      "1": { "UpgradeTo350": 2 }
    },
    "roomx": {
      "0": { "UpgradeTo350": 2 },
      "1": { "Viewport": 1 }
    },
    "roomy": {
      "0": { "UpgradeTo350": 2 },
      "1": { "Viewport": 1 }
    },
    "root": {
      "0": { "Maths": 4 }
    },
    "Rosenkraenzer": {
      "0": { "Credits": 1 }
    },
    "Rotate": {
      "0": { "DynamicSprite": 6 }
    },
    "rotate": {
      "0": { "DynamicSprite": 3 },
      "1": { "Globalfunctions_Palette": 2 },
      "2": { "acintro1": 1 }
    },
    "rotated": {
      "0": { "DynamicSprite": 3 }
    },
    "RotatedAvatar": {
      "0": { "DynamicSprite": 1 }
    },
    "Rotates": {
      "0": { "DynamicSprite": 1 }
    },
    "Rotating": {
      "0": { "DynamicSprite": 1 }
    },
    "rotation": {
      "0": { "DynamicSprite": 1 }
    },
    "roughly": {
      "0": { "UpgradeTo350": 1 }
    },
    "Round": {
      "0": { "Maths": 3 }
    },
    "round": {
      "0": { "Setup": 2 },
      "1": { "EditingGUIs": 1 }
    },
    "RoundDirection": {
      "0": { "Maths": 2 },
      "1": { "StandardEnums": 1 }
    },
    "rounded": {
      "0": { "Maths": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "rounding": {
      "0": { "Character": 1 }
    },
    "route": {
      "0": { "Character": 2 }
    },
    "routine": {
      "0": { "TextScriptEvents": 2 }
    },
    "routines": {
      "0": { "Credits": 1 }
    },
    "row": {
      "0": { "ListBox": 5 },
      "1": { "InvWindow": 3 },
      "2": { "acintro1": 1 }
    },
    "RowCount": {
      "0": { "InvWindow": 8 },
      "1": { "ListBox": 3 }
    },
    "rows": {
      "0": { "ListBox": 2 },
      "1": { "acintro8": 1 }
    },
    "royalty": {
      "0": { "MusicAndSound": 1 }
    },
    "RPG-style": {
      "0": { "Settingupthegame": 1 }
    },
    "rub": {
      "0": { "RepExec": 1 }
    },
    "RUBSTOMACH": {
      "0": { "RepExec": 1 }
    },
    "Rudd": {
      "0": { "Credits": 1 }
    },
    "Rui": {
      "0": { "Credits": 1 }
    },
    "Run": {
      "0": { "UpgradeTo30": 6 },
      "1": { "Game": 3 },
      "2": { "Debuggingfeatures": 2 },
      "3": { "Settingupthegame": 1 }
    },
    "run": {
      "0": { "Globalfunctions_General": 14 },
      "1": { "BlockingScripts": 12 },
      "2": { "ScriptKeywords": 10 },
      "3": { "Settingupthegame": 8 },
      "4": { "Game": 7 },
      "5": { "Setup": 5 },
      "6": { "GraphicsDriver": 4 },
      "7": { "acintro1": 3 },
      "8": { "Region": 2 },
      "9": { "DistGame": 1 }
    },
    "RUN": {
      "0": { "Settingupthegame": 4 }
    },
    "run-as": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "run-script": {
      "0": { "TextScriptEvents": 2 },
      "1": { "UpgradeTo30": 1 }
    },
    "Run-time": {
      "0": { "Setup": 1 }
    },
    "run-time": {
      "0": { "Game": 3 },
      "1": { "Region": 1 }
    },
    "RunActiveOption": {
      "0": { "DialogOptionsRenderingInfo": 4 },
      "1": { "UpgradeTo34": 2 }
    },
    "RunAGSGame": {
      "0": { "Globalfunctions_General": 3 }
    },
    "RunCharacterInteraction": {
      "0": { "Character": 1 }
    },
    "RunDialog": {
      "0": { "Dialog": 1 }
    },
    "RunHotspotInteraction": {
      "0": { "Hotspot": 1 }
    },
    "RunInteraction": {
      "0": { "Hotspot": 7 },
      "1": { "Region": 6 },
      "2": { "StandardEnums": 4 },
      "3": { "EventTypes": 1 }
    },
    "RunInventoryInteraction": {
      "0": { "InventoryItem": 1 }
    },
    "Running": {
      "0": { "System": 1 }
    },
    "running": {
      "0": { "System": 12 },
      "1": { "GUIControl": 6 },
      "2": { "Globalfunctions_General": 5 },
      "3": { "Game": 4 },
      "4": { "Setup": 3 },
      "5": { "Tumbleweed": 2 },
      "6": { "ScriptKeywords": 1 }
    },
    "RunObjectInteraction": {
      "0": { "Object": 1 }
    },
    "RunRegionInteraction": {
      "0": { "Region": 1 }
    },
    "Runs": {
      "0": { "Region": 1 }
    },
    "runs": {
      "0": { "ScriptKeywords": 4 },
      "1": { "UpgradeTo30": 3 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "Speech": 1 }
    },
    "runtime": {
      "0": { "Settingupthegame": 2 },
      "1": { "GUIControl": 1 }
    },
    "RuntimeInfo": {
      "0": { "System": 4 },
      "1": { "Globalfunctions_General": 1 }
    },
    "rusty": {
      "0": { "InventoryItem": 1 }
    },
    "rx": {
      "0": { "Screen": 1 }
    },
    "ry": {
      "0": { "Screen": 1 }
    },
    "Ryan": {
      "0": { "Credits": 1 }
    },
    "Sadly": {
      "0": { "Tumbleweed": 1 }
    },
    "safe": {
      "0": { "UpgradeTo335": 1 }
    },
    "safely": {
      "0": { "DynamicSprite": 1 }
    },
    "safest": {
      "0": { "File": 1 }
    },
    "Said": {
      "0": { "TextParser": 10 },
      "1": { "Parser": 7 },
      "2": { "ScriptKeywords": 5 },
      "3": { "Settingupthegame": 1 }
    },
    "said": {
      "0": { "Settingupthegame": 2 },
      "1": { "Parser": 1 }
    },
    "SaidUnknownWord": {
      "0": { "Parser": 4 },
      "1": { "TextParser": 1 }
    },
    "Same": {
      "0": { "Gamevariables": 1 }
    },
    "same": {
      "0": { "Character": 15 },
      "1": { "Settingupthegame": 10 },
      "2": { "Globalfunctions_General": 8 },
      "3": { "UpgradeTo350": 6 },
      "4": { "Pointers": 5 },
      "5": { "UpgradeTo32": 4 },
      "6": { "Object": 3 },
      "7": { "Region": 2 },
      "8": { "Tumbleweed_extensions": 1 }
    },
    "sample": {
      "0": { "Tumbleweed": 2 },
      "1": { "Tumbleweed_door": 1 }
    },
    "Saturation": {
      "0": { "Region": 4 }
    },
    "saturation": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Character": 3 },
      "2": { "Region": 2 }
    },
    "SATURATION": {
      "0": { "Character": 2 },
      "1": { "DynamicSprite": 1 }
    },
    "save": {
      "0": { "Globalfunctions_General": 19 },
      "1": { "Game": 8 },
      "2": { "File": 6 },
      "3": { "IntegrationWithWindows": 5 },
      "4": { "Gamevariables": 3 },
      "5": { "acintro2": 2 },
      "6": { "AdvancedRoomFeatures": 1 }
    },
    "Save": {
      "0": { "IntegrationWithWindows": 8 },
      "1": { "Settingupthegame": 3 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "GUIControl": 1 }
    },
    "SaveCursorForLocationChange": {
      "0": { "Mouse": 1 }
    },
    "SaveCursorUntilItLeaves": {
      "0": { "Mouse": 4 }
    },
    "saved": {
      "0": { "Globalfunctions_General": 10 },
      "1": { "ListBox": 3 },
      "2": { "Mouse": 2 },
      "3": { "TroubleshootingWindowsZoneID": 1 }
    },
    "Saved": {
      "0": { "Settingupthegame": 3 },
      "1": { "IntegrationWithWindows": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "savedgames": {
      "0": { "UpgradeTo33": 1 }
    },
    "SaveGameDialog": {
      "0": { "Globalfunctions_General": 6 }
    },
    "SAVEGAMEDIR": {
      "0": { "File": 5 },
      "1": { "UpgradeTo335": 2 },
      "2": { "ListBox": 1 }
    },
    "savegameindex": {
      "0": { "ListBox": 1 }
    },
    "SAVEGAMESCREENSHOTS": {
      "0": { "Globalfunctions_General": 1 }
    },
    "SaveGameSlot": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "Game": 1 }
    },
    "SaveGameSlots": {
      "0": { "ListBox": 6 }
    },
    "SaveLoadEnabled": {
      "0": { "acintro4": 1 }
    },
    "Saves": {
      "0": { "Game": 4 },
      "1": { "Globalfunctions_General": 1 }
    },
    "saves": {
      "0": { "Settingupthegame": 5 },
      "1": { "UpgradeTo335": 4 },
      "2": { "Globalfunctions_General": 3 },
      "3": { "ListBox": 2 },
      "4": { "UpgradeTo350": 1 }
    },
    "SaveScreenShot": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "DynamicSprite": 1 }
    },
    "saveSlot": {
      "0": { "DynamicSprite": 1 }
    },
    "SAVESLOT": {
      "0": { "DynamicSprite": 1 }
    },
    "SaveToFile": {
      "0": { "DynamicSprite": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "saving": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "Saving": {
      "0": { "UpgradeTo30": 1 }
    },
    "saw": {
      "0": { "UpgradingTo27": 1 }
    },
    "Say": {
      "0": { "Character": 11 },
      "1": { "Tumbleweed": 7 },
      "2": { "Settingupthegame": 5 },
      "3": { "MusicAndSound": 3 },
      "4": { "TextWindowGUI": 2 },
      "5": { "Tumbleweed_unhandled": 1 }
    },
    "say": {
      "0": { "acintro8": 4 },
      "1": { "Settingupthegame": 3 },
      "2": { "ScriptKeywords": 2 },
      "3": { "Pointers": 1 }
    },
    "SayAt": {
      "0": { "Character": 4 }
    },
    "SayBackground": {
      "0": { "Character": 6 },
      "1": { "Overlay": 1 }
    },
    "saying": {
      "0": { "Lipsync": 1 }
    },
    "says": {
      "0": { "acintro2": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "scale": {
      "0": { "Settingupthegame": 3 },
      "1": { "Camera": 2 },
      "2": { "AudioChannel": 1 }
    },
    "scaled": {
      "0": { "Settingupthegame": 6 },
      "1": { "UpgradeTo350": 4 },
      "2": { "Character": 2 },
      "3": { "Gamevariables": 1 }
    },
    "ScaleMoveSpeed": {
      "0": { "Character": 4 }
    },
    "scalers": {
      "0": { "Credits": 1 }
    },
    "ScaleVolume": {
      "0": { "Character": 4 }
    },
    "Scaling": {
      "0": { "Character": 6 },
      "1": { "EditingGUIs": 1 }
    },
    "scaling": {
      "0": { "Character": 15 },
      "1": { "AdvancedRoomFeatures": 7 },
      "2": { "Globalfunctions_Room": 6 },
      "3": { "System": 5 },
      "4": { "Screen": 4 },
      "5": { "Settingupthegame": 3 },
      "6": { "Object": 2 },
      "7": { "Camera": 1 }
    },
    "ScalingMultiplier": {
      "0": { "UpgradeTo350": 1 }
    },
    "scan": {
      "0": { "CustomDialogOptions": 1 }
    },
    "scanned": {
      "0": { "Game": 1 }
    },
    "scanning": {
      "0": { "DistGame": 1 }
    },
    "scene": {
      "0": { "AdvancedRoomFeatures": 5 },
      "1": { "EditorInventoryItems": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "scenes": {
      "0": { "AdvancedRoomFeatures": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "schema": {
      "0": { "CustomProperties": 5 }
    },
    "Schema": {
      "0": { "CustomProperties": 2 }
    },
    "scheme": {
      "0": { "acintro1": 1 }
    },
    "Schleu": {
      "0": { "Credits": 1 }
    },
    "SCI": {
      "0": { "Settingupthegame": 9 },
      "1": { "acintro9": 6 },
      "2": { "Label": 1 }
    },
    "scintilla": {
      "0": { "Credits": 2 }
    },
    "scope": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Scope": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Score": {
      "0": { "EditingGUIs": 1 }
    },
    "score": {
      "0": { "Gamevariables": 6 },
      "1": { "Globalfunctions_General": 4 },
      "2": { "EditingGUIs": 3 },
      "3": { "TextScriptEvents": 1 }
    },
    "SCORE": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "EditingGUIs": 2 }
    },
    "scores": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "SCORETEXT": {
      "0": { "EditingGUIs": 1 }
    },
    "Scott": {
      "0": { "Credits": 2 }
    },
    "SCR": {
      "0": { "StandardEnums": 1 }
    },
    "scratch": {
      "0": { "Templates": 1 }
    },
    "Scream": {
      "0": { "ExtenderFunctions": 7 }
    },
    "screen": {
      "0": { "Globalfunctions_Screen": 25 },
      "1": { "Globalfunctions_General": 22 },
      "2": { "Viewport": 21 },
      "3": { "Character": 20 },
      "4": { "Screen": 13 },
      "5": { "Overlay": 12 },
      "6": { "DrawingSurfaceFunctions": 11 },
      "7": { "Setup": 9 },
      "8": { "Tumbleweed": 8 },
      "9": { "acintro4": 7 },
      "10": { "acintro2": 6 },
      "11": { "Mouse": 5 },
      "12": { "Gamevariables": 4 },
      "13": { "CustomDialogOptions": 3 },
      "14": { "acintro9": 2 },
      "15": { "UpgradingTo27": 1 }
    },
    "Screen": {
      "0": { "Screen": 19 },
      "1": { "System": 12 },
      "2": { "Camera": 5 },
      "3": { "UpgradeTo350": 4 },
      "4": { "Scripting": 2 },
      "5": { "Globalfunctions_Screen": 1 }
    },
    "SCREEN": {
      "0": { "DrawingSurfaceFunctions": 3 },
      "1": { "InventoryItem": 2 },
      "2": { "Region": 1 }
    },
    "screen's": {
      "0": { "Screen": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "ScreenHeight": {
      "0": { "System": 4 },
      "1": { "Screen": 1 }
    },
    "screens": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "screenshot": {
      "0": { "Gamevariables": 7 },
      "1": { "DynamicSprite": 3 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "acintro1": 1 }
    },
    "Screenshot": {
      "0": { "EditorInventoryItems": 1 }
    },
    "Screenshots": {
      "0": { "Gamevariables": 2 }
    },
    "screenshots": {
      "0": { "DynamicSprite": 2 },
      "1": { "acintro1": 1 }
    },
    "ScreenToRoomPoint": {
      "0": { "Viewport": 6 },
      "1": { "Screen": 5 },
      "2": { "UpgradeTo350": 3 }
    },
    "ScreenWidth": {
      "0": { "System": 4 },
      "1": { "Screen": 1 }
    },
    "screwed": {
      "0": { "Settingupthegame": 1 }
    },
    "SCRIPT": {
      "0": { "ScriptKeywords": 4 },
      "1": { "Settingupthegame": 1 }
    },
    "Script": {
      "0": { "UpgradeTo34": 5 },
      "1": { "UpgradeTo341": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "script": {
      "0": { "Settingupthegame": 47 },
      "1": { "ScriptKeywords": 41 },
      "2": { "Globalfunctions_General": 40 },
      "3": { "ScriptingTutorialPart1": 37 },
      "4": { "Character": 28 },
      "5": { "acintro8": 19 },
      "6": { "UpgradingTo27": 18 },
      "7": { "Game": 16 },
      "8": { "FAQ": 15 },
      "9": { "BlockingScripts": 14 },
      "10": { "ScriptModules": 13 },
      "11": { "RepExec": 12 },
      "12": { "acintro3": 11 },
      "13": { "String": 10 },
      "14": { "CallingGlobalFunctions": 9 },
      "15": { "UpgradeTo34": 8 },
      "16": { "CustomProperties": 7 },
      "17": { "UpgradeTo30": 5 },
      "18": { "ExtenderFunctions": 4 },
      "19": { "TextParser": 3 },
      "20": { "DynamicArrays": 2 },
      "21": { "Introduction": 1 }
    },
    "script's": {
      "0": { "GUIControl": 1 }
    },
    "script-only": {
      "0": { "Globalfunctions_General": 1 }
    },
    "scripted": {
      "0": { "ScriptKeywords": 1 }
    },
    "scripters": {
      "0": { "UpgradingTo27": 1 }
    },
    "scripting": {
      "0": { "Settingupthegame": 11 },
      "1": { "ScriptKeywords": 7 },
      "2": { "UpgradeTo30": 3 },
      "3": { "UpgradingTo27": 2 },
      "4": { "Scripting": 1 }
    },
    "Scripting": {
      "0": { "ScriptingLanguage": 3 },
      "1": { "ScriptingTutorialPart1": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "SCRIPTNAME": {
      "0": { "acintro8": 1 }
    },
    "ScriptName": {
      "0": { "acintro7": 1 }
    },
    "Scripts": {
      "0": { "ScriptModules": 3 },
      "1": { "ScriptingLanguage": 1 }
    },
    "scripts": {
      "0": { "ScriptModules": 14 },
      "1": { "Settingupthegame": 12 },
      "2": { "BlockingScripts": 8 },
      "3": { "ScriptKeywords": 7 },
      "4": { "UpgradingTo27": 4 },
      "5": { "UpgradeTo31": 3 },
      "6": { "UpgradeTo34": 2 },
      "7": { "UpgradeTo30": 1 }
    },
    "scroll": {
      "0": { "ListBox": 9 },
      "1": { "InvWindow": 3 },
      "2": { "CustomDialogOptions": 2 },
      "3": { "Globalfunctions_Room": 1 }
    },
    "Scroll": {
      "0": { "System": 3 },
      "1": { "ListBox": 1 }
    },
    "SCROLL": {
      "0": { "System": 1 }
    },
    "scrollable": {
      "0": { "EditingGUIs": 1 }
    },
    "ScrollDown": {
      "0": { "ListBox": 5 },
      "1": { "InvWindow": 4 },
      "2": { "EditingGUIs": 1 }
    },
    "scrolled": {
      "0": { "InvWindow": 1 }
    },
    "scrolling": {
      "0": { "DrawingSurfaceFunctions": 3 },
      "1": { "Globalfunctions_Room": 2 },
      "2": { "Screen": 1 }
    },
    "Scrolling": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "ScrollLock": {
      "0": { "System": 5 }
    },
    "Scrolls": {
      "0": { "ListBox": 2 }
    },
    "scrolls": {
      "0": { "ListBox": 1 }
    },
    "ScrollUp": {
      "0": { "ListBox": 5 },
      "1": { "InvWindow": 4 },
      "2": { "EditingGUIs": 1 }
    },
    "scrx": {
      "0": { "Viewport": 1 }
    },
    "scry": {
      "0": { "Viewport": 1 }
    },
    "SCUMM": {
      "0": { "Tumbleweed": 1 }
    },
    "se": {
      "0": { "Templates": 1 }
    },
    "Search": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "search": {
      "0": { "Dictionary": 2 },
      "1": { "ListBox": 1 }
    },
    "searchable": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "searches": {
      "0": { "AudioClip": 1 }
    },
    "searching": {
      "0": { "Dictionary": 1 }
    },
    "sec": {
      "0": { "Mouse": 2 }
    },
    "second": {
      "0": { "AudioChannel": 12 },
      "1": { "Globalfunctions_General": 6 },
      "2": { "Character": 5 },
      "3": { "Game": 4 },
      "4": { "ScriptKeywords": 3 },
      "5": { "Tumbleweed": 2 },
      "6": { "Tumbleweed_translation": 1 }
    },
    "Second": {
      "0": { "DateTime": 4 },
      "1": { "UpgradeTo34": 1 }
    },
    "secondly": {
      "0": { "acintro4": 1 }
    },
    "seconds": {
      "0": { "Character": 5 },
      "1": { "Globalfunctions_General": 4 },
      "2": { "Settingupthegame": 3 },
      "3": { "Globalfunctions_Screen": 2 },
      "4": { "Game": 1 }
    },
    "secret": {
      "0": { "Globalfunctions_General": 2 }
    },
    "section": {
      "0": { "Settingupthegame": 5 },
      "1": { "IntegrationWithWindows": 3 },
      "2": { "Character": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "sectionend": {
      "0": { "Preprocessor": 1 }
    },
    "sections": {
      "0": { "MusicAndSound": 1 }
    },
    "sectionstart": {
      "0": { "Preprocessor": 1 }
    },
    "Security": {
      "0": { "TroubleshootingWindowsZoneID": 2 },
      "1": { "Plugins": 1 }
    },
    "security": {
      "0": { "File": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "Sedlak": {
      "0": { "Credits": 1 }
    },
    "See": {
      "0": { "Character": 79 },
      "1": { "Globalfunctions_General": 47 },
      "2": { "Game": 40 },
      "3": { "Object": 36 },
      "4": { "GUI": 23 },
      "5": { "DynamicSprite": 21 },
      "6": { "Maths": 20 },
      "7": { "File": 19 },
      "8": { "DrawingSurfaceFunctions": 17 },
      "9": { "String": 16 },
      "10": { "Button": 15 },
      "11": { "Globalfunctions_Room": 14 },
      "12": { "Room": 13 },
      "13": { "Viewport": 12 },
      "14": { "InventoryItem": 11 },
      "15": { "Camera": 10 },
      "16": { "Speech": 9 },
      "17": { "DateTime": 8 },
      "18": { "Slider": 7 },
      "19": { "Settingupthegame": 6 },
      "20": { "Tumbleweed_actions": 5 },
      "21": { "Globalfunctions_Screen": 4 },
      "22": { "Globalfunctions_Palette": 3 },
      "23": { "Preprocessor": 2 },
      "24": { "DynamicArrays": 1 }
    },
    "see": {
      "0": { "Settingupthegame": 16 },
      "1": { "Character": 9 },
      "2": { "acintro4": 8 },
      "3": { "acintro2": 7 },
      "4": { "acintro1": 6 },
      "5": { "acintro3": 5 },
      "6": { "EditingGUIs": 4 },
      "7": { "UpgradingTo27": 3 },
      "8": { "EventTypes": 2 },
      "9": { "Region": 1 }
    },
    "see-through": {
      "0": { "acintro7": 1 }
    },
    "SeeAlso": {
      "0": { "Character": 9 },
      "1": { "Object": 6 },
      "2": { "Globalfunctions_General": 5 },
      "3": { "Globalfunctions_Screen": 3 },
      "4": { "MusicAndSound": 1 }
    },
    "seeing": {
      "0": { "acintro2": 2 },
      "1": { "Parser": 1 }
    },
    "seek": {
      "0": { "AudioChannel": 2 },
      "1": { "UpgradeTo32": 1 }
    },
    "Seek": {
      "0": { "File": 7 },
      "1": { "AudioClip": 3 },
      "2": { "StandardEnums": 1 }
    },
    "Seeking": {
      "0": { "MusicAndSound": 1 }
    },
    "SeekMIDIPosition": {
      "0": { "AudioChannel": 1 }
    },
    "SeekMODPattern": {
      "0": { "AudioChannel": 1 }
    },
    "Seeks": {
      "0": { "AudioChannel": 1 }
    },
    "seem": {
      "0": { "ScriptKeywords": 1 }
    },
    "seems": {
      "0": { "FAQ": 1 }
    },
    "seen": {
      "0": { "Screen": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "Multimedia": 1 }
    },
    "sees": {
      "0": { "Camera": 1 }
    },
    "Select": {
      "0": { "acintro1": 3 },
      "1": { "acintro4": 2 },
      "2": { "acintro5": 1 }
    },
    "select": {
      "0": { "Settingupthegame": 16 },
      "1": { "EditorRoom": 8 },
      "2": { "acintro7": 5 },
      "3": { "acintro4": 4 },
      "4": { "EditorSprite": 3 },
      "5": { "Translations": 2 },
      "6": { "FAQ": 1 }
    },
    "SELECTED": {
      "0": { "Dialog": 2 }
    },
    "Selected": {
      "0": { "acintro3": 1 }
    },
    "selected": {
      "0": { "ListBox": 8 },
      "1": { "acintro1": 5 },
      "2": { "DialogOptionsRenderingInfo": 4 },
      "3": { "EditorSprite": 3 },
      "4": { "Gamevariables": 2 },
      "5": { "acintro5": 1 }
    },
    "SelectedBackColor": {
      "0": { "ListBox": 5 }
    },
    "SelectedIndex": {
      "0": { "ListBox": 11 },
      "1": { "EditingGUIs": 1 }
    },
    "selectedItem": {
      "0": { "ListBox": 2 }
    },
    "selectedItemText": {
      "0": { "ListBox": 1 }
    },
    "selectedText": {
      "0": { "ListBox": 1 }
    },
    "SelectedTextColor": {
      "0": { "ListBox": 7 }
    },
    "selecting": {
      "0": { "Settingupthegame": 1 }
    },
    "Selecting": {
      "0": { "acintro2": 1 }
    },
    "selection": {
      "0": { "Settingupthegame": 4 },
      "1": { "Setup": 1 }
    },
    "Selection": {
      "0": { "acintro2": 1 }
    },
    "SelectNextMode": {
      "0": { "Mouse": 3 }
    },
    "selector": {
      "0": { "UpgradeTo34": 1 }
    },
    "SelectPreviousMode": {
      "0": { "Mouse": 2 }
    },
    "Selects": {
      "0": { "Mouse": 2 }
    },
    "selects": {
      "0": { "acintro8": 5 },
      "1": { "Tumbleweed": 1 }
    },
    "self-explanatory": {
      "0": { "acintro9": 1 }
    },
    "SELLER": {
      "0": { "Copyright": 1 }
    },
    "Selmiak": {
      "0": { "Credits": 1 }
    },
    "Semi-blocking": {
      "0": { "Tumbleweed_movement": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "semi-blocking": {
      "0": { "Tumbleweed_movement": 2 }
    },
    "semi-completed": {
      "0": { "Templates": 1 }
    },
    "semi-transparent": {
      "0": { "Character": 1 }
    },
    "Semicolon": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "semicolon": {
      "0": { "ScriptingTutorialPart1": 6 },
      "1": { "ScriptKeywords": 1 }
    },
    "semicolons": {
      "0": { "UpgradingTo27": 1 }
    },
    "send": {
      "0": { "AnonymousUsageInfo": 3 },
      "1": { "ContactingTheDevelopers": 2 },
      "2": { "Tumbleweed_door": 1 }
    },
    "sending": {
      "0": { "Templates": 1 }
    },
    "Sends": {
      "0": { "GUIControl": 1 }
    },
    "sends": {
      "0": { "AnonymousUsageInfo": 2 }
    },
    "SendToBack": {
      "0": { "GUIControl": 6 }
    },
    "sense": {
      "0": { "OOProgramming": 1 }
    },
    "sensible": {
      "0": { "acintro4": 2 },
      "1": { "acintro8": 1 }
    },
    "sensitive": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "String": 1 }
    },
    "sensitivity": {
      "0": { "String": 7 },
      "1": { "Dictionary": 1 }
    },
    "sent": {
      "0": { "Globalfunctions_General": 1 }
    },
    "sentence": {
      "0": { "Globalfunctions_General": 1 }
    },
    "sentences": {
      "0": { "Globalfunctions_General": 1 }
    },
    "separate": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "separated": {
      "0": { "TextParser": 1 }
    },
    "separately": {
      "0": { "Multimedia": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "separating": {
      "0": { "Settingupthegame": 1 }
    },
    "separator": {
      "0": { "Tumbleweed_extensions": 1 }
    },
    "sequence": {
      "0": { "acintro7": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "ScriptingTutorialPart2": 1 }
    },
    "Sequences": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "sequences": {
      "0": { "Settingupthegame": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "series": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Character": 1 }
    },
    "serious": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "server": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "serves": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Service": {
      "0": { "SystemRequirements": 1 }
    },
    "services": {
      "0": { "Globalfunctions_General": 1 }
    },
    "session": {
      "0": { "DynamicSprite": 1 }
    },
    "set": {
      "0": { "Character": 60 },
      "1": { "Settingupthegame": 40 },
      "2": { "Object": 33 },
      "3": { "Globalfunctions_General": 21 },
      "4": { "EditingGUIs": 18 },
      "5": { "Set": 12 },
      "6": { "Room": 11 },
      "7": { "Speech": 10 },
      "8": { "GUIControl": 9 },
      "9": { "Gamevariables": 8 },
      "10": { "Slider": 7 },
      "11": { "Region": 6 },
      "12": { "acintro9": 5 },
      "13": { "AudioChannel": 4 },
      "14": { "acintro1": 3 },
      "15": { "UpgradingTo27": 2 },
      "16": { "acintro6": 1 }
    },
    "Set": {
      "0": { "Set": 25 },
      "1": { "Dictionary": 12 },
      "2": { "Gamevariables": 3 },
      "3": { "StandardEnums": 2 },
      "4": { "Scripting": 1 }
    },
    "SetAction": {
      "0": { "Tumbleweed_actions": 3 }
    },
    "SetActionButtons": {
      "0": { "Tumbleweed_translation": 6 },
      "1": { "Tumbleweed_actions": 3 },
      "2": { "Tumbleweed_helper": 1 }
    },
    "SetActiveInventory": {
      "0": { "Character": 1 }
    },
    "SetAlternativeAction": {
      "0": { "Tumbleweed_actions": 3 }
    },
    "SetAmbientLightLevel": {
      "0": { "Character": 3 },
      "1": { "Region": 1 }
    },
    "SetAmbientTint": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Character": 3 },
      "2": { "Region": 2 },
      "3": { "DrawingSurfaceFunctions": 1 }
    },
    "SetApproachingChar": {
      "0": { "Tumbleweed_movement": 3 }
    },
    "SetAreaLightLevel": {
      "0": { "Region": 1 }
    },
    "SetAreaScaling": {
      "0": { "Globalfunctions_Room": 4 }
    },
    "SetAsPlayer": {
      "0": { "Character": 3 },
      "1": { "Tumbleweed_player": 1 }
    },
    "SetAt": {
      "0": { "Camera": 8 },
      "1": { "UpgradeTo350": 1 }
    },
    "SetAudioTypeSpeechVolumeDrop": {
      "0": { "Multimedia": 3 }
    },
    "SetAudioTypeVolume": {
      "0": { "Multimedia": 5 },
      "1": { "System": 1 }
    },
    "SetBackgroundFrame": {
      "0": { "Globalfunctions_Room": 5 }
    },
    "SetBounds": {
      "0": { "Mouse": 4 }
    },
    "SetButtonAction": {
      "0": { "Tumbleweed_helper": 1 }
    },
    "SetButtonPic": {
      "0": { "Button": 3 }
    },
    "SetButtonText": {
      "0": { "Button": 1 }
    },
    "SetChannelVolume": {
      "0": { "AudioChannel": 1 }
    },
    "SetCharacterBaseline": {
      "0": { "Character": 1 }
    },
    "SetCharacterBlinkView": {
      "0": { "Character": 2 }
    },
    "SetCharacterClickable": {
      "0": { "Character": 1 }
    },
    "SetCharacterFrame": {
      "0": { "Character": 1 }
    },
    "SetCharacterIdle": {
      "0": { "Character": 1 }
    },
    "SetCharacterIgnoreLight": {
      "0": { "Character": 1 }
    },
    "SetCharacterIgnoreWalkbehinds": {
      "0": { "Character": 1 }
    },
    "SetCharacterProperty": {
      "0": { "Character": 5 }
    },
    "SetCharacterSpeechView": {
      "0": { "Character": 1 }
    },
    "SetCharacterSpeed": {
      "0": { "Character": 1 }
    },
    "SetCharacterSpeedEx": {
      "0": { "Character": 1 }
    },
    "SetCharacterTransparency": {
      "0": { "Character": 1 }
    },
    "SetCharacterView": {
      "0": { "Character": 1 }
    },
    "SetCharacterViewEx": {
      "0": { "Character": 1 }
    },
    "SetCharacterViewOffset": {
      "0": { "Character": 1 }
    },
    "SetCursorMode": {
      "0": { "Mouse": 1 }
    },
    "SetDamage": {
      "0": { "OOProgramming": 3 },
      "1": { "ScriptKeywords": 2 }
    },
    "SetDefaultAction": {
      "0": { "Tumbleweed_actions": 3 }
    },
    "SetDefaultCursor": {
      "0": { "Mouse": 1 }
    },
    "SetDialogOption": {
      "0": { "Dialog": 1 }
    },
    "SetDigitalMasterVolume": {
      "0": { "System": 1 }
    },
    "SetDoorState": {
      "0": { "Tumbleweed_door": 6 }
    },
    "SetDoubleClickSpeed": {
      "0": { "Tumbleweed_helper": 3 }
    },
    "SetFadeColor": {
      "0": { "Globalfunctions_Screen": 5 }
    },
    "SetFrameSound": {
      "0": { "ViewFrame": 1 }
    },
    "SetGameOption": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Settingupthegame": 1 }
    },
    "SetGameSpeed": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "EditorView": 1 }
    },
    "SetGlobalInt": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "Game": 1 }
    },
    "SetGlobalString": {
      "0": { "Game": 1 }
    },
    "SetGraphicalVariable": {
      "0": { "Globalfunctions_General": 4 }
    },
    "SetGUIBackgroundPic": {
      "0": { "GUI": 1 }
    },
    "SetGUIClickable": {
      "0": { "GUI": 3 }
    },
    "SetGUIObjectEnabled": {
      "0": { "GUIControl": 3 }
    },
    "SetGUIObjectPosition": {
      "0": { "GUIControl": 1 }
    },
    "SetGUIObjectSize": {
      "0": { "GUIControl": 1 }
    },
    "SetGUIPosition": {
      "0": { "GUI": 1 }
    },
    "SetGUISize": {
      "0": { "GUI": 1 }
    },
    "SetGUITransparency": {
      "0": { "GUI": 1 }
    },
    "SetGUIZOrder": {
      "0": { "GUI": 1 }
    },
    "SetHasOptionBeenChosen": {
      "0": { "Dialog": 5 }
    },
    "seti": {
      "0": { "OOProgramming": 3 }
    },
    "SetIdleView": {
      "0": { "Character": 5 },
      "1": { "Settingupthegame": 1 }
    },
    "SetInvDimensions": {
      "0": { "InvWindow": 2 }
    },
    "SetInvItemName": {
      "0": { "InventoryItem": 1 }
    },
    "SetInvItemPic": {
      "0": { "InventoryItem": 1 }
    },
    "SetItemText": {
      "0": { "ListBox": 1 }
    },
    "SetLabelColor": {
      "0": { "Label": 1 }
    },
    "SetLabelFont": {
      "0": { "Label": 1 }
    },
    "SetLabelText": {
      "0": { "Label": 1 }
    },
    "SetLightLevel": {
      "0": { "Character": 8 },
      "1": { "Region": 2 }
    },
    "SetMouseBounds": {
      "0": { "Mouse": 1 }
    },
    "SetMouseCursor": {
      "0": { "Mouse": 1 }
    },
    "SetMousePosition": {
      "0": { "Mouse": 1 }
    },
    "SetMultitaskingMode": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "System": 1 }
    },
    "SetMusicMasterVolume": {
      "0": { "System": 1 }
    },
    "SetMusicRepeat": {
      "0": { "AudioClip": 1 }
    },
    "SetMusicVolume": {
      "0": { "AudioChannel": 1 }
    },
    "SetName": {
      "0": { "InventoryItem": 1 }
    },
    "SetNextCursorMode": {
      "0": { "Mouse": 1 }
    },
    "SetNextScreenTransition": {
      "0": { "Globalfunctions_Screen": 4 },
      "1": { "StandardEnums": 1 }
    },
    "SetNormalFont": {
      "0": { "Game": 1 }
    },
    "SetObjectBaseline": {
      "0": { "Object": 1 }
    },
    "SetObjectClickable": {
      "0": { "Object": 1 }
    },
    "SetObjectFrame": {
      "0": { "Object": 1 }
    },
    "SetObjectGraphic": {
      "0": { "Object": 1 }
    },
    "SetObjectIgnoreWalkbehinds": {
      "0": { "Object": 1 }
    },
    "SetObjectPosition": {
      "0": { "Object": 1 }
    },
    "SetObjectTint": {
      "0": { "Object": 1 }
    },
    "SetObjectTransparency": {
      "0": { "Object": 1 }
    },
    "SetObjectView": {
      "0": { "Object": 1 }
    },
    "SetOptionState": {
      "0": { "Dialog": 7 },
      "1": { "acintro8": 1 }
    },
    "SetPalRGB": {
      "0": { "Globalfunctions_Palette": 5 },
      "1": { "AdvancedRoomFeatures": 1 }
    },
    "SetPlayer": {
      "0": { "Tumbleweed_player": 4 }
    },
    "SetPlayerCharacter": {
      "0": { "Character": 1 }
    },
    "SetPosition": {
      "0": { "GUI": 11 },
      "1": { "GUIControl": 8 },
      "2": { "Viewport": 7 },
      "3": { "Mouse": 6 },
      "4": { "Object": 5 },
      "5": { "Screen": 1 }
    },
    "SetProperty": {
      "0": { "UpgradeTo34": 6 },
      "1": { "Room": 5 }
    },
    "SetRegionTint": {
      "0": { "Region": 1 }
    },
    "SetRestartPoint": {
      "0": { "Globalfunctions_General": 3 }
    },
    "SetRoomLocation": {
      "0": { "AudioChannel": 5 },
      "1": { "UpgradeTo32": 1 }
    },
    "sets": {
      "0": { "Character": 38 },
      "1": { "GUI": 14 },
      "2": { "ListBox": 13 },
      "3": { "Speech": 10 },
      "4": { "Slider": 9 },
      "5": { "Game": 8 },
      "6": { "Viewport": 7 },
      "7": { "InvWindow": 6 },
      "8": { "System": 5 },
      "9": { "Mouse": 4 },
      "10": { "Globalfunctions_Message": 3 },
      "11": { "ScriptKeywords": 2 },
      "12": { "Region": 1 }
    },
    "Sets": {
      "0": { "Character": 7 },
      "1": { "TemplateVerbcoin": 6 },
      "2": { "Object": 5 },
      "3": { "Globalfunctions_General": 4 },
      "4": { "Hotspot": 2 },
      "5": { "Speech": 1 }
    },
    "SetSaveGameDirectory": {
      "0": { "Game": 3 }
    },
    "SetScreenTransition": {
      "0": { "Globalfunctions_Screen": 7 },
      "1": { "StandardEnums": 1 }
    },
    "SetSize": {
      "0": { "GUIControl": 9 },
      "1": { "Camera": 7 },
      "2": { "GUI": 6 },
      "3": { "Screen": 1 }
    },
    "SetSkipSpeech": {
      "0": { "UpgradeTo33": 1 }
    },
    "SetSliderValue": {
      "0": { "Slider": 1 }
    },
    "SetSoundVolume": {
      "0": { "Multimedia": 1 }
    },
    "SetSpeechFont": {
      "0": { "Game": 1 }
    },
    "SetSpeechStyle": {
      "0": { "UpgradeTo33": 1 }
    },
    "SetSpeechVolume": {
      "0": { "Multimedia": 4 }
    },
    "Settable": {
      "0": { "Mouse": 1 }
    },
    "SetTalkingColor": {
      "0": { "Character": 1 }
    },
    "setter": {
      "0": { "OOProgramming": 4 },
      "1": { "ScriptKeywords": 1 }
    },
    "SetText": {
      "0": { "Overlay": 3 },
      "1": { "Label": 1 }
    },
    "SetTextBoxFont": {
      "0": { "TextBox": 1 }
    },
    "SetTextBoxText": {
      "0": { "TextBox": 1 }
    },
    "SetTextOverlay": {
      "0": { "Overlay": 1 }
    },
    "SetTextProperty": {
      "0": { "UpgradeTo34": 6 },
      "1": { "Room": 5 }
    },
    "SetTextWindowGUI": {
      "0": { "Globalfunctions_General": 4 }
    },
    "SetTimer": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "DateTime": 1 }
    },
    "setting": {
      "0": { "Character": 26 },
      "1": { "Object": 13 },
      "2": { "Settingupthegame": 12 },
      "3": { "Region": 6 },
      "4": { "EditingGUIs": 5 },
      "5": { "Speech": 4 },
      "6": { "Mouse": 3 },
      "7": { "Globalfunctions_Room": 2 },
      "8": { "SourceControl": 1 }
    },
    "Setting": {
      "0": { "Character": 6 },
      "1": { "GUI": 4 },
      "2": { "Settingupthegame": 3 },
      "3": { "Mouse": 2 },
      "4": { "GUIControl": 1 }
    },
    "Settings": {
      "0": { "acintro1": 6 },
      "1": { "Room": 5 },
      "2": { "Game": 4 },
      "3": { "UpgradeTo341": 3 },
      "4": { "DistGame": 2 },
      "5": { "ScriptKeywords": 1 }
    },
    "settings": {
      "0": { "Settingupthegame": 8 },
      "1": { "Setup": 4 },
      "2": { "EditorInventoryItems": 3 },
      "3": { "TroubleshootingWindowsZoneID": 2 },
      "4": { "Region": 1 }
    },
    "SETTINGS": {
      "0": { "GUI": 1 }
    },
    "setup": {
      "0": { "Settingupthegame": 15 },
      "1": { "Setup": 4 },
      "2": { "UpgradeTo335": 3 },
      "3": { "UpgradeTo341": 2 },
      "4": { "Mouse": 1 }
    },
    "Setup": {
      "0": { "UpgradeTo341": 4 },
      "1": { "UpgradeTo31": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "Translations": 1 }
    },
    "SetView": {
      "0": { "Object": 9 },
      "1": { "Settingupthegame": 2 }
    },
    "SetViewport": {
      "0": { "Globalfunctions_Room": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "SetVoiceMode": {
      "0": { "UpgradeTo33": 1 }
    },
    "SetWalkBehindBase": {
      "0": { "Globalfunctions_Room": 3 },
      "1": { "Character": 1 }
    },
    "SetWalkSpeed": {
      "0": { "Character": 8 }
    },
    "several": {
      "0": { "ScriptKeywords": 3 },
      "1": { "acintro2": 2 },
      "2": { "StandardEnums": 1 }
    },
    "Shabtay": {
      "0": { "Credits": 1 }
    },
    "Shader": {
      "0": { "GraphicsDriver": 1 }
    },
    "shading": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "shadow": {
      "0": { "Gamevariables": 2 }
    },
    "Shaham": {
      "0": { "Credits": 1 }
    },
    "shake": {
      "0": { "Globalfunctions_Screen": 9 }
    },
    "shakes": {
      "0": { "Globalfunctions_Screen": 2 }
    },
    "Shakes": {
      "0": { "Globalfunctions_Screen": 2 }
    },
    "ShakeScreen": {
      "0": { "Globalfunctions_Screen": 4 }
    },
    "ShakeScreenBackground": {
      "0": { "Globalfunctions_Screen": 4 }
    },
    "shakiness": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "shaky": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "SHALL": {
      "0": { "Copyright": 1 }
    },
    "shamelessly": {
      "0": { "acintro2": 1 }
    },
    "Shane": {
      "0": { "Credits": 1 }
    },
    "shape": {
      "0": { "UpgradeTo350": 1 }
    },
    "share": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Share": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "shared": {
      "0": { "Settingupthegame": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Shawn": {
      "0": { "Credits": 2 }
    },
    "she": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "shelf": {
      "0": { "Tumbleweed": 1 }
    },
    "Shift": {
      "0": { "ScriptKeywords": 2 },
      "1": { "EditorSprite": 1 }
    },
    "shift": {
      "0": { "ASCIIcodes": 2 },
      "1": { "acintro1": 1 }
    },
    "shift-clicking": {
      "0": { "Settingupthegame": 1 }
    },
    "shifted": {
      "0": { "Character": 2 },
      "1": { "Screen": 1 }
    },
    "short": {
      "0": { "ScriptKeywords": 3 },
      "1": { "acintro1": 1 }
    },
    "shortcut": {
      "0": { "IntegrationWithWindows": 2 },
      "1": { "Tumbleweed_extensions": 1 }
    },
    "Shortcut": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "shortcuts": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Shortcuts": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "shorten": {
      "0": { "acintro7": 1 }
    },
    "shortest": {
      "0": { "Game": 1 }
    },
    "shorthand": {
      "0": { "UpgradingTo27": 1 }
    },
    "shot": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Should": {
      "0": { "acintro1": 1 }
    },
    "should": {
      "0": { "Settingupthegame": 14 },
      "1": { "acintro1": 7 },
      "2": { "ScriptingTutorialPart1": 6 },
      "3": { "acintro2": 5 },
      "4": { "GraphicsDriver": 4 },
      "5": { "Speech": 3 },
      "6": { "Plugins": 2 },
      "7": { "Pointers": 1 }
    },
    "shouldn't": {
      "0": { "UpgradeTo30": 1 }
    },
    "shovel": {
      "0": { "InventoryItem": 1 }
    },
    "Show": {
      "0": { "acintro8": 3 },
      "1": { "TemplateBASS": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "show": {
      "0": { "Settingupthegame": 3 },
      "1": { "Gamevariables": 2 },
      "2": { "acintro5": 1 }
    },
    "ShowBorder": {
      "0": { "ListBox": 5 },
      "1": { "TextBox": 3 }
    },
    "showing": {
      "0": { "acintro7": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "ShowMouseCursor": {
      "0": { "Mouse": 1 }
    },
    "shown": {
      "0": { "GUI": 4 },
      "1": { "CustomDialogOptions": 2 },
      "2": { "EditorCharacter": 1 }
    },
    "ShowPlayerCharacter": {
      "0": { "acintro4": 1 }
    },
    "shows": {
      "0": { "acintro2": 1 }
    },
    "ShowScrollArrows": {
      "0": { "ListBox": 6 }
    },
    "ShowTextParser": {
      "0": { "Dialog": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "shrink": {
      "0": { "Settingupthegame": 1 }
    },
    "shrunk": {
      "0": { "Settingupthegame": 2 },
      "1": { "Character": 1 }
    },
    "shut": {
      "0": { "ScriptKeywords": 1 }
    },
    "side": {
      "0": { "Character": 6 },
      "1": { "EditingGUIs": 4 },
      "2": { "Tumbleweed": 3 },
      "3": { "acintro6": 2 },
      "4": { "Globalfunctions_General": 1 }
    },
    "sides": {
      "0": { "Setup": 1 }
    },
    "sierra": {
      "0": { "Gamevariables": 1 }
    },
    "Sierra": {
      "0": { "Settingupthegame": 6 },
      "1": { "EditingGUIs": 3 },
      "2": { "acintro9": 2 },
      "3": { "Globalfunctions_Message": 1 }
    },
    "Sierra's": {
      "0": { "acintro9": 1 }
    },
    "Sierra-style": {
      "0": { "Character": 5 },
      "1": { "Gamevariables": 3 },
      "2": { "Mouse": 2 },
      "3": { "acintro3": 1 }
    },
    "sierra-style": {
      "0": { "Gamevariables": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "sign": {
      "0": { "StringFormats": 1 }
    },
    "signal": {
      "0": { "Settingupthegame": 1 }
    },
    "signatures": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "signed": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "significant": {
      "0": { "UpgradeTo34": 1 }
    },
    "significantly": {
      "0": { "UpgradingTo27": 3 },
      "1": { "acintro9": 1 }
    },
    "signifies": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "signify": {
      "0": { "Settingupthegame": 3 },
      "1": { "TextParser": 1 }
    },
    "silence": {
      "0": { "Multimedia": 1 }
    },
    "silently": {
      "0": { "AudioClip": 1 }
    },
    "similar": {
      "0": { "Settingupthegame": 3 },
      "1": { "MusicAndSound": 2 },
      "2": { "InventoryItem": 1 }
    },
    "Similar": {
      "0": { "Character": 4 },
      "1": { "Tumbleweed_player": 2 },
      "2": { "Globalfunctions_Message": 1 }
    },
    "Similarly": {
      "0": { "ScriptKeywords": 1 }
    },
    "similarly": {
      "0": { "Character": 1 }
    },
    "simple": {
      "0": { "Pointers": 3 },
      "1": { "EditorRoom": 2 },
      "2": { "Tutorial": 1 }
    },
    "Simple": {
      "0": { "GlobalVariables": 1 }
    },
    "simpler": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "simplest": {
      "0": { "Setup": 1 }
    },
    "simplified": {
      "0": { "Tumbleweed": 1 }
    },
    "simplify": {
      "0": { "TemplateBASS": 1 }
    },
    "Simply": {
      "0": { "UpgradeTo33": 1 }
    },
    "simply": {
      "0": { "acintro7": 5 },
      "1": { "Tumbleweed": 3 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "acintro5": 1 }
    },
    "simulate": {
      "0": { "Mouse": 2 },
      "1": { "Room": 1 }
    },
    "simulated": {
      "0": { "Room": 1 }
    },
    "SimulateKeyPress": {
      "0": { "Game": 3 }
    },
    "Simulates": {
      "0": { "Room": 1 }
    },
    "simulates": {
      "0": { "Character": 1 }
    },
    "simultaneous": {
      "0": { "MusicAndSound": 2 }
    },
    "simultaneously": {
      "0": { "EditorRoom": 1 }
    },
    "Sin": {
      "0": { "Maths": 14 }
    },
    "Since": {
      "0": { "Character": 4 },
      "1": { "DynamicSprite": 2 },
      "2": { "UpgradeTo335": 1 }
    },
    "since": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Settingupthegame": 4 },
      "2": { "acintro4": 3 },
      "3": { "Mouse": 2 },
      "4": { "Tumbleweed_translation": 1 }
    },
    "sine": {
      "0": { "Maths": 6 }
    },
    "Single": {
      "0": { "ScriptKeywords": 1 }
    },
    "single": {
      "0": { "EditorView": 5 },
      "1": { "Gamevariables": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "Sinh": {
      "0": { "Maths": 5 }
    },
    "situation": {
      "0": { "ScriptKeywords": 1 }
    },
    "situations": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "size": {
      "0": { "Settingupthegame": 15 },
      "1": { "UpgradeTo350": 9 },
      "2": { "Camera": 7 },
      "3": { "GUI": 6 },
      "4": { "Gamevariables": 5 },
      "5": { "Screen": 4 },
      "6": { "acintro6": 3 },
      "7": { "Viewport": 2 },
      "8": { "acintro4": 1 }
    },
    "sized": {
      "0": { "Game": 2 },
      "1": { "DistGame": 1 }
    },
    "sizes": {
      "0": { "UpgradeTo350": 2 },
      "1": { "Viewport": 1 }
    },
    "skills": {
      "0": { "acintro8": 1 }
    },
    "Skip": {
      "0": { "EditorView": 1 }
    },
    "skip": {
      "0": { "Speech": 15 },
      "1": { "Multimedia": 10 },
      "2": { "Globalfunctions_General": 5 },
      "3": { "Gamevariables": 3 },
      "4": { "Settingupthegame": 2 },
      "5": { "Tumbleweed": 1 }
    },
    "SkipCutscene": {
      "0": { "Globalfunctions_General": 7 }
    },
    "SkipKey": {
      "0": { "Speech": 4 },
      "1": { "UpgradeTo33": 1 }
    },
    "skippable": {
      "0": { "Game": 1 }
    },
    "skipped": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "skipping": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "Game": 4 },
      "2": { "Speech": 1 }
    },
    "SkippingCutscene": {
      "0": { "Game": 4 },
      "1": { "Globalfunctions_General": 3 }
    },
    "Skips": {
      "0": { "Globalfunctions_General": 1 }
    },
    "skips": {
      "0": { "System": 1 }
    },
    "SkipSpeechStyle": {
      "0": { "Speech": 1 }
    },
    "SkipStyle": {
      "0": { "Speech": 4 },
      "1": { "Game": 2 },
      "2": { "StandardEnums": 1 }
    },
    "SkipUntilCharacterStops": {
      "0": { "Globalfunctions_General": 5 }
    },
    "slashes": {
      "0": { "Lipsync": 2 }
    },
    "sldHealth": {
      "0": { "Slider": 10 }
    },
    "sldHealth's": {
      "0": { "Slider": 2 }
    },
    "sldMouseSpeed": {
      "0": { "Mouse": 2 }
    },
    "sldVolume": {
      "0": { "Slider": 2 }
    },
    "slider": {
      "0": { "Slider": 12 },
      "1": { "EditingGUIs": 10 },
      "2": { "Mouse": 2 },
      "3": { "MusicAndSound": 1 }
    },
    "Slider": {
      "0": { "Slider": 16 },
      "1": { "GUIControl": 15 },
      "2": { "System": 2 },
      "3": { "EditingGUIs": 1 }
    },
    "slider's": {
      "0": { "Slider": 7 }
    },
    "Sliders": {
      "0": { "EditingGUIs": 3 },
      "1": { "Slider": 1 }
    },
    "sliders": {
      "0": { "EditingGUIs": 3 },
      "1": { "GUIControl": 1 }
    },
    "slides": {
      "0": { "Overlay": 2 }
    },
    "slightly": {
      "0": { "Settingupthegame": 2 },
      "1": { "Pointers": 1 }
    },
    "slogged": {
      "0": { "acintro2": 1 }
    },
    "slot": {
      "0": { "Globalfunctions_General": 13 },
      "1": { "Game": 10 },
      "2": { "Settingupthegame": 9 },
      "3": { "Globalfunctions_Palette": 6 },
      "4": { "DynamicSprite": 5 },
      "5": { "Mouse": 4 },
      "6": { "Gamevariables": 3 },
      "7": { "acintro6": 2 },
      "8": { "DrawingSurfaceFunctions": 1 }
    },
    "SLOT": {
      "0": { "Gamevariables": 6 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "Globalfunctions_Palette": 2 },
      "3": { "DrawingSurfaceFunctions": 1 }
    },
    "slot's": {
      "0": { "Settingupthegame": 1 }
    },
    "slots": {
      "0": { "acintro1": 6 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "Settingupthegame": 4 },
      "3": { "Tumbleweed_translation": 1 }
    },
    "slow": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "GraphicsDriver": 2 },
      "2": { "GUI": 1 }
    },
    "slow-running": {
      "0": { "Debuggingfeatures": 1 }
    },
    "slowdown": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "slowdowns": {
      "0": { "Setup": 1 }
    },
    "slower": {
      "0": { "Settingupthegame": 3 },
      "1": { "Setup": 2 },
      "2": { "AudioChannel": 1 }
    },
    "slowest": {
      "0": { "Globalfunctions_Screen": 2 }
    },
    "slowing": {
      "0": { "Settingupthegame": 1 }
    },
    "slowish": {
      "0": { "Globalfunctions_General": 1 }
    },
    "slowly": {
      "0": { "Settingupthegame": 1 }
    },
    "slows": {
      "0": { "Translations": 1 }
    },
    "small": {
      "0": { "acintro4": 2 },
      "1": { "Screen": 1 }
    },
    "Smaller": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "smaller": {
      "0": { "Camera": 5 },
      "1": { "UpgradeTo350": 4 },
      "2": { "Settingupthegame": 3 },
      "3": { "Viewport": 2 },
      "4": { "Screen": 1 }
    },
    "Smallrock": {
      "0": { "Object": 1 }
    },
    "smell": {
      "0": { "EventTypes": 1 }
    },
    "smoking": {
      "0": { "Settingupthegame": 1 }
    },
    "Smooth": {
      "0": { "Setup": 1 }
    },
    "smoother": {
      "0": { "Setup": 1 }
    },
    "smoothing": {
      "0": { "Gamevariables": 1 }
    },
    "smoothly": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "snaps": {
      "0": { "Camera": 1 }
    },
    "snippet": {
      "0": { "Globalfunctions_General": 1 }
    },
    "snow": {
      "0": { "Character": 1 }
    },
    "So": {
      "0": { "ScriptingTutorialPart1": 9 },
      "1": { "UpgradingTo27": 7 },
      "2": { "TextParser": 6 },
      "3": { "acintro1": 5 },
      "4": { "acintro7": 3 },
      "5": { "acintro4": 2 },
      "6": { "ScriptKeywords": 1 }
    },
    "so": {
      "0": { "Character": 25 },
      "1": { "Settingupthegame": 19 },
      "2": { "Globalfunctions_General": 15 },
      "3": { "ScriptingTutorialPart1": 13 },
      "4": { "UpgradingTo27": 10 },
      "5": { "Object": 9 },
      "6": { "acintro7": 7 },
      "7": { "ScriptKeywords": 6 },
      "8": { "Lipsync": 5 },
      "9": { "DistGame": 4 },
      "10": { "acintro1": 3 },
      "11": { "UpgradeTo350": 2 },
      "12": { "DynamicArrays": 1 }
    },
    "software": {
      "0": { "GraphicsDriver": 2 },
      "1": { "FAQ": 1 }
    },
    "SOFTWARE": {
      "0": { "Copyright": 2 }
    },
    "Software": {
      "0": { "Character": 1 }
    },
    "solid": {
      "0": { "Object": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "Character": 1 }
    },
    "Solid": {
      "0": { "Character": 7 },
      "1": { "Settingupthegame": 1 }
    },
    "solution": {
      "0": { "TroubleshootingWindowsZoneID": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "solve": {
      "0": { "Plugins": 1 }
    },
    "Some": {
      "0": { "OOProgramming": 7 },
      "1": { "UpgradeTo350": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "GUI": 1 }
    },
    "some": {
      "0": { "Settingupthegame": 12 },
      "1": { "Game": 10 },
      "2": { "ScriptKeywords": 9 },
      "3": { "Globalfunctions_General": 8 },
      "4": { "acintro1": 5 },
      "5": { "Debuggingfeatures": 4 },
      "6": { "UpgradingTo27": 3 },
      "7": { "UpgradeTo30": 2 },
      "8": { "CustomProperties": 1 }
    },
    "SomeApple": {
      "0": { "ScriptKeywords": 2 }
    },
    "SOMEGUY": {
      "0": { "Character": 1 }
    },
    "someone": {
      "0": { "Character": 1 }
    },
    "something": {
      "0": { "ScriptingTutorialPart1": 9 },
      "1": { "ScriptingTutorialPart2": 6 },
      "2": { "Settingupthegame": 5 },
      "3": { "ScriptKeywords": 4 },
      "4": { "Globalfunctions_General": 3 },
      "5": { "UpgradeTo30": 2 },
      "6": { "acintro5": 1 }
    },
    "Sometimes": {
      "0": { "ScriptingTutorialPart2": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "sometimes": {
      "0": { "UpgradeTo350": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "somewhat": {
      "0": { "Dictionary": 1 }
    },
    "somewhere": {
      "0": { "Pointers": 1 }
    },
    "Sonneveld": {
      "0": { "Credits": 1 }
    },
    "soon": {
      "0": { "acintro1": 1 }
    },
    "Sorry": {
      "0": { "Parser": 1 }
    },
    "Sort": {
      "0": { "MusicAndSound": 1 }
    },
    "sort": {
      "0": { "Globalfunctions_General": 1 }
    },
    "sorted": {
      "0": { "Dictionary": 3 },
      "1": { "ListBox": 1 }
    },
    "sorting": {
      "0": { "Dictionary": 2 }
    },
    "sorts": {
      "0": { "ListBox": 1 }
    },
    "sortStyle": {
      "0": { "Dictionary": 1 }
    },
    "SortStyle": {
      "0": { "Dictionary": 5 },
      "1": { "StandardEnums": 1 }
    },
    "sound": {
      "0": { "MusicAndSound": 15 },
      "1": { "AudioChannel": 10 },
      "2": { "UpgradeTo32": 7 },
      "3": { "Settingupthegame": 5 },
      "4": { "AudioClip": 3 },
      "5": { "ScriptKeywords": 2 },
      "6": { "OtherFeatures": 1 }
    },
    "Sound": {
      "0": { "UpgradeTo32": 4 },
      "1": { "MusicAndSound": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "AudioClip": 1 }
    },
    "sounds": {
      "0": { "MusicAndSound": 9 },
      "1": { "Character": 4 },
      "2": { "Gamevariables": 3 },
      "3": { "AudioClip": 1 }
    },
    "Sounds": {
      "0": { "MusicAndSound": 1 }
    },
    "SOUNDx": {
      "0": { "Settingupthegame": 2 }
    },
    "Source": {
      "0": { "SourceControl": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "source": {
      "0": { "SourceControl": 10 },
      "1": { "DynamicSprite": 5 },
      "2": { "Settingupthegame": 3 },
      "3": { "Copyright": 2 },
      "4": { "EditorSprite": 1 }
    },
    "sourceforge": {
      "0": { "Credits": 2 }
    },
    "sources": {
      "0": { "Translations": 1 }
    },
    "SourceSafe": {
      "0": { "SourceControl": 3 }
    },
    "south": {
      "0": { "TextScriptEvents": 1 }
    },
    "space": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "Settingupthegame": 2 },
      "2": { "Speech": 1 }
    },
    "Space": {
      "0": { "acintro2": 1 }
    },
    "SPACE": {
      "0": { "ASCIIcodes": 1 }
    },
    "spaces": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro3": 1 }
    },
    "spaceship": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "spacing": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "Settingupthegame": 2 }
    },
    "Spanish": {
      "0": { "Game": 4 },
      "1": { "Tumbleweed": 1 }
    },
    "spare": {
      "0": { "AudioClip": 1 }
    },
    "SPD": {
      "0": { "Character": 1 }
    },
    "Speak": {
      "0": { "EventTypes": 4 },
      "1": { "TextScriptEvents": 2 }
    },
    "speak": {
      "0": { "Settingupthegame": 3 },
      "1": { "Dialog": 2 },
      "2": { "acintro8": 1 }
    },
    "speaker": {
      "0": { "AudioChannel": 1 }
    },
    "speakers": {
      "0": { "AudioChannel": 2 }
    },
    "Speaking": {
      "0": { "Character": 9 }
    },
    "speaking": {
      "0": { "Character": 5 },
      "1": { "Settingupthegame": 1 }
    },
    "SpeakingFrame": {
      "0": { "Character": 4 }
    },
    "SpechView": {
      "0": { "EditorCharacter": 1 }
    },
    "SPECIAL": {
      "0": { "Copyright": 1 }
    },
    "special": {
      "0": { "Settingupthegame": 8 },
      "1": { "Character": 4 },
      "2": { "StringFormats": 3 },
      "3": { "ScriptKeywords": 2 },
      "4": { "Speech": 1 }
    },
    "Special": {
      "0": { "ScriptModules": 1 }
    },
    "specialized": {
      "0": { "UpgradeTo34": 1 }
    },
    "specific": {
      "0": { "Globalfunctions_General": 4 },
      "1": { "Settingupthegame": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "specifically": {
      "0": { "acintro7": 1 }
    },
    "Specifically": {
      "0": { "Game": 1 }
    },
    "specified": {
      "0": { "Character": 21 },
      "1": { "Game": 15 },
      "2": { "DynamicSprite": 12 },
      "3": { "Maths": 9 },
      "4": { "Mouse": 8 },
      "5": { "Globalfunctions_General": 7 },
      "6": { "File": 6 },
      "7": { "Globalfunctions_Screen": 5 },
      "8": { "Globalfunctions_Room": 4 },
      "9": { "Region": 3 },
      "10": { "Button": 2 },
      "11": { "TextBox": 1 }
    },
    "specifies": {
      "0": { "Settingupthegame": 5 },
      "1": { "Globalfunctions_Message": 3 },
      "2": { "GUIControl": 2 },
      "3": { "Maths": 1 }
    },
    "Specify": {
      "0": { "Multimedia": 1 }
    },
    "specify": {
      "0": { "Character": 4 },
      "1": { "DrawingSurfaceFunctions": 3 },
      "2": { "MusicAndSound": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "specifying": {
      "0": { "File": 3 },
      "1": { "ScriptKeywords": 1 }
    },
    "speech": {
      "0": { "Speech": 31 },
      "1": { "Character": 21 },
      "2": { "Gamevariables": 19 },
      "3": { "Settingupthegame": 16 },
      "4": { "Game": 14 },
      "5": { "MusicAndSound": 11 },
      "6": { "Multimedia": 9 },
      "7": { "AutonumberSpeechFiles": 7 },
      "8": { "acintro9": 5 },
      "9": { "Globalfunctions_General": 4 },
      "10": { "Overlay": 3 },
      "11": { "TextWindowGUI": 2 },
      "12": { "OtherFeatures": 1 }
    },
    "Speech": {
      "0": { "Speech": 38 },
      "1": { "UpgradeTo33": 11 },
      "2": { "MusicAndSound": 6 },
      "3": { "Character": 5 },
      "4": { "StandardEnums": 4 },
      "5": { "Game": 3 },
      "6": { "UpgradeTo341": 2 },
      "7": { "Gamevariables": 1 }
    },
    "SPEECH": {
      "0": { "MusicAndSound": 1 }
    },
    "speech-related": {
      "0": { "UpgradeTo33": 1 }
    },
    "SpeechAnimationDelay": {
      "0": { "Character": 5 },
      "1": { "Speech": 2 }
    },
    "SpeechColor": {
      "0": { "Character": 4 },
      "1": { "TextWindowGUI": 1 }
    },
    "SpeechFont": {
      "0": { "Game": 4 },
      "1": { "Overlay": 3 },
      "2": { "acintro9": 1 }
    },
    "SPEECHREF": {
      "0": { "AutonumberSpeechFiles": 1 }
    },
    "SpeechStyle": {
      "0": { "Speech": 1 }
    },
    "SpeechView": {
      "0": { "Character": 8 },
      "1": { "Settingupthegame": 1 }
    },
    "Speed": {
      "0": { "Mouse": 4 },
      "1": { "ViewFrame": 3 },
      "2": { "Settingupthegame": 1 }
    },
    "SPEED": {
      "0": { "Character": 6 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "Object": 1 }
    },
    "speed": {
      "0": { "Character": 29 },
      "1": { "Settingupthegame": 15 },
      "2": { "Globalfunctions_General": 10 },
      "3": { "Mouse": 7 },
      "4": { "Game": 4 },
      "5": { "UpgradeTo33": 2 },
      "6": { "Debuggingfeatures": 1 }
    },
    "speeds": {
      "0": { "Character": 1 }
    },
    "spill": {
      "0": { "acintro2": 1 }
    },
    "splash": {
      "0": { "Credits": 1 }
    },
    "Split": {
      "0": { "Settingupthegame": 1 }
    },
    "split": {
      "0": { "DistGame": 3 },
      "1": { "Pointers": 1 }
    },
    "Splitting": {
      "0": { "DistGame": 1 }
    },
    "Spoken": {
      "0": { "Lipsync": 1 }
    },
    "spoken": {
      "0": { "Lipsync": 3 },
      "1": { "Dialog": 1 }
    },
    "spot": {
      "0": { "Character": 5 },
      "1": { "acintro5": 3 },
      "2": { "ScriptingTutorialPart1": 2 },
      "3": { "acintro9": 1 }
    },
    "spots": {
      "0": { "Settingupthegame": 1 }
    },
    "SPR": {
      "0": { "Templates": 1 }
    },
    "spr": {
      "0": { "UpgradeTo350": 1 }
    },
    "Sprite": {
      "0": { "EditorSprite": 5 },
      "1": { "Settingupthegame": 4 },
      "2": { "Setup": 2 },
      "3": { "acintro4": 1 }
    },
    "sprite": {
      "0": { "DynamicSprite": 173 },
      "1": { "Settingupthegame": 20 },
      "2": { "Button": 16 },
      "3": { "EditorSprite": 9 },
      "4": { "Game": 7 },
      "5": { "InventoryItem": 5 },
      "6": { "Slider": 4 },
      "7": { "GUI": 3 },
      "8": { "BackingUpYourGame": 2 },
      "9": { "DrawingSurfaceFunctions": 1 }
    },
    "sprite's": {
      "0": { "DynamicSprite": 2 },
      "1": { "Mouse": 1 }
    },
    "sprite-slot": {
      "0": { "Tumbleweed_translation": 2 }
    },
    "SpriteHeight": {
      "0": { "Game": 5 },
      "1": { "Globalfunctions_General": 1 }
    },
    "spriteheight": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Sprites": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro6": 1 }
    },
    "sprites": {
      "0": { "Settingupthegame": 24 },
      "1": { "UpgradeTo350": 8 },
      "2": { "acintro6": 6 },
      "3": { "Globalfunctions_General": 5 },
      "4": { "EditorSprite": 4 },
      "5": { "EditorView": 3 },
      "6": { "DrawingSurfaceFunctions": 2 },
      "7": { "Object": 1 }
    },
    "Spriteslot": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "SpriteWidth": {
      "0": { "Game": 5 },
      "1": { "Globalfunctions_General": 1 }
    },
    "spritewidth": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Spyros": {
      "0": { "Credits": 1 }
    },
    "Sqrt": {
      "0": { "Maths": 4 }
    },
    "square": {
      "0": { "Maths": 4 },
      "1": { "UpgradeTo350": 1 }
    },
    "squares": {
      "0": { "EditingGUIs": 1 }
    },
    "stack": {
      "0": { "SystemLimits": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "stage": {
      "0": { "acintro1": 2 },
      "1": { "Object": 1 }
    },
    "stand": {
      "0": { "Character": 4 },
      "1": { "AnonymousUsageInfo": 1 }
    },
    "stand-on": {
      "0": { "Tumbleweed": 1 }
    },
    "standalone": {
      "0": { "SourceControl": 1 }
    },
    "Standard": {
      "0": { "Mouse": 2 },
      "1": { "StandardEnums": 1 }
    },
    "standard": {
      "0": { "Settingupthegame": 10 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "EditingGUIs": 2 },
      "3": { "TextWindowGUI": 1 }
    },
    "StandardMode": {
      "0": { "Settingupthegame": 1 }
    },
    "standing": {
      "0": { "Character": 11 },
      "1": { "Settingupthegame": 4 },
      "2": { "acintro7": 3 },
      "3": { "Region": 1 }
    },
    "Stands": {
      "0": { "Globalfunctions_Room": 2 }
    },
    "stands": {
      "0": { "EventTypes": 3 },
      "1": { "Region": 1 }
    },
    "START": {
      "0": { "Globalfunctions_Palette": 2 }
    },
    "Start": {
      "0": { "Dialog": 6 },
      "1": { "Templates": 3 },
      "2": { "acintro1": 2 },
      "3": { "UpgradeTo30": 1 }
    },
    "start": {
      "0": { "AudioChannel": 11 },
      "1": { "Settingupthegame": 10 },
      "2": { "acintro8": 5 },
      "3": { "Object": 4 },
      "4": { "acintro1": 3 },
      "5": { "FAQ": 2 },
      "6": { "Tumbleweed": 1 }
    },
    "start-up": {
      "0": { "acintro8": 1 }
    },
    "StartCutscene": {
      "0": { "Globalfunctions_General": 6 },
      "1": { "Game": 4 },
      "2": { "StandardEnums": 1 }
    },
    "started": {
      "0": { "Settingupthegame": 2 },
      "1": { "UpgradeTo31": 1 }
    },
    "Started": {
      "0": { "acintro9": 2 },
      "1": { "acintro1": 1 }
    },
    "starters": {
      "0": { "Tumbleweed_door": 1 }
    },
    "Starting": {
      "0": { "acintro1": 1 }
    },
    "starting": {
      "0": { "Settingupthegame": 7 },
      "1": { "File": 3 },
      "2": { "ScriptingTutorialPart1": 2 },
      "3": { "Button": 1 }
    },
    "StartingRoom": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro8": 1 }
    },
    "starts": {
      "0": { "Settingupthegame": 4 },
      "1": { "acintro7": 3 },
      "2": { "MusicAndSound": 2 },
      "3": { "Mouse": 1 }
    },
    "Starts": {
      "0": { "Character": 3 },
      "1": { "acintro7": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "StartsWith": {
      "0": { "String": 5 },
      "1": { "StandardEnums": 1 }
    },
    "startup": {
      "0": { "GraphicsDriver": 1 }
    },
    "StartX": {
      "0": { "acintro2": 1 }
    },
    "StartY": {
      "0": { "acintro2": 1 }
    },
    "state": {
      "0": { "Tumbleweed_door": 5 },
      "1": { "RepExec": 4 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "DrawingSurfaceFunctions": 1 }
    },
    "state-saving": {
      "0": { "SystemLimits": 1 }
    },
    "statement": {
      "0": { "ScriptKeywords": 11 },
      "1": { "ScriptingTutorialPart1": 3 },
      "2": { "ScriptingTutorialPart2": 1 }
    },
    "statements": {
      "0": { "ScriptKeywords": 28 },
      "1": { "ScriptingTutorialPart2": 2 },
      "2": { "Game": 1 }
    },
    "states": {
      "0": { "UpgradeTo350": 1 }
    },
    "static": {
      "0": { "Game": 50 },
      "1": { "System": 21 },
      "2": { "Room": 14 },
      "3": { "Speech": 12 },
      "4": { "Screen": 8 },
      "5": { "DynamicSprite": 7 },
      "6": { "OOProgramming": 6 },
      "7": { "Mouse": 5 },
      "8": { "Multimedia": 4 },
      "9": { "GUI": 3 },
      "10": { "Region": 2 },
      "11": { "InventoryItem": 1 }
    },
    "Static": {
      "0": { "ExtenderFunctions": 2 },
      "1": { "OOProgramming": 1 }
    },
    "statistics": {
      "0": { "Settingupthegame": 1 }
    },
    "Statistics": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "stats": {
      "0": { "File": 8 }
    },
    "status": {
      "0": { "EditingGUIs": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "status-line": {
      "0": { "EditingGUIs": 1 }
    },
    "STATUSLINE": {
      "0": { "GUI": 2 }
    },
    "stay": {
      "0": { "Speech": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "staying": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "stays": {
      "0": { "Gamevariables": 2 },
      "1": { "Tumbleweed": 1 }
    },
    "steal": {
      "0": { "acintro2": 1 }
    },
    "Steele": {
      "0": { "Credits": 1 }
    },
    "Stefano": {
      "0": { "Credits": 1 }
    },
    "Step": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "step": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Pointers": 1 }
    },
    "Stepin": {
      "0": { "Credits": 1 }
    },
    "steps": {
      "0": { "UpgradingTo27": 1 }
    },
    "stereo": {
      "0": { "AudioChannel": 1 }
    },
    "Steve": {
      "0": { "Credits": 1 }
    },
    "Steven": {
      "0": { "Credits": 1 }
    },
    "Stevens": {
      "0": { "Credits": 1 }
    },
    "stick": {
      "0": { "MusicAndSound": 3 },
      "1": { "acintro1": 1 }
    },
    "Sticking": {
      "0": { "Tumbleweed": 1 }
    },
    "sticks": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "still": {
      "0": { "Settingupthegame": 11 },
      "1": { "Character": 10 },
      "2": { "UpgradeTo350": 7 },
      "3": { "UpgradeTo32": 3 },
      "4": { "BlockingScripts": 2 },
      "5": { "Region": 1 }
    },
    "stomach": {
      "0": { "RepExec": 1 }
    },
    "Stone's": {
      "0": { "InventoryItem": 1 }
    },
    "STOP": {
      "0": { "Settingupthegame": 2 }
    },
    "stop": {
      "0": { "Character": 16 },
      "1": { "Object": 7 },
      "2": { "UpgradingTo27": 3 },
      "3": { "ScriptKeywords": 2 },
      "4": { "UpgradingTo271": 1 }
    },
    "Stop": {
      "0": { "AudioClip": 4 },
      "1": { "AudioChannel": 3 },
      "2": { "acintro": 1 }
    },
    "StopAmbientSound": {
      "0": { "AudioChannel": 1 }
    },
    "StopAnimating": {
      "0": { "Object": 5 }
    },
    "StopAudio": {
      "0": { "Multimedia": 4 },
      "1": { "AudioChannel": 1 }
    },
    "StopChannel": {
      "0": { "AudioChannel": 2 }
    },
    "StopDialog": {
      "0": { "Dialog": 4 }
    },
    "StopMovementStyle": {
      "0": { "Character": 15 },
      "1": { "StandardEnums": 1 }
    },
    "StopMoving": {
      "0": { "Character": 10 },
      "1": { "Object": 7 },
      "2": { "UpgradingTo27": 6 }
    },
    "StopMusic": {
      "0": { "Multimedia": 1 }
    },
    "StopObjectMoving": {
      "0": { "Object": 1 }
    },
    "stopped": {
      "0": { "MusicAndSound": 2 },
      "1": { "FAQ": 1 }
    },
    "stopping": {
      "0": { "Settingupthegame": 1 }
    },
    "stops": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Stops": {
      "0": { "Settingupthegame": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "StopSound": {
      "0": { "Multimedia": 1 }
    },
    "storage": {
      "0": { "Dictionary": 1 }
    },
    "store": {
      "0": { "ScriptKeywords": 7 },
      "1": { "Settingupthegame": 3 },
      "2": { "TroubleshootingWindowsZoneID": 2 },
      "3": { "EditorSprite": 1 }
    },
    "stored": {
      "0": { "Dictionary": 4 },
      "1": { "ScriptKeywords": 3 },
      "2": { "Object": 2 },
      "3": { "TroubleshootingWindowsZoneID": 1 }
    },
    "stores": {
      "0": { "ScriptKeywords": 1 }
    },
    "Stores": {
      "0": { "Parser": 1 }
    },
    "storing": {
      "0": { "OOProgramming": 1 }
    },
    "straight": {
      "0": { "Character": 9 },
      "1": { "Settingupthegame": 2 },
      "2": { "GUIControl": 1 }
    },
    "strange": {
      "0": { "Settingupthegame": 2 },
      "1": { "Pointers": 1 }
    },
    "StrCaseComp": {
      "0": { "String": 1 }
    },
    "StrCat": {
      "0": { "UpgradingTo271": 1 }
    },
    "StrComp": {
      "0": { "UpgradingTo271": 1 }
    },
    "StrContains": {
      "0": { "UpgradingTo271": 1 }
    },
    "StrCopy": {
      "0": { "UpgradingTo271": 1 }
    },
    "stream": {
      "0": { "TroubleshootingWindowsZoneID": 8 }
    },
    "streamlined": {
      "0": { "Settingupthegame": 1 }
    },
    "streams": {
      "0": { "TroubleshootingWindowsZoneID": 9 }
    },
    "Streams": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "street": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "strength": {
      "0": { "ScriptKeywords": 2 }
    },
    "stretch": {
      "0": { "DynamicSprite": 2 },
      "1": { "EditingGUIs": 1 }
    },
    "Stretch": {
      "0": { "Setup": 2 }
    },
    "stretched": {
      "0": { "Setup": 2 },
      "1": { "Object": 1 }
    },
    "stretches": {
      "0": { "Settingupthegame": 1 }
    },
    "stretching": {
      "0": { "UpgradeTo34": 1 }
    },
    "StrFormat": {
      "0": { "String": 1 }
    },
    "StrGetCharAt": {
      "0": { "String": 1 }
    },
    "strict": {
      "0": { "Settingupthegame": 3 }
    },
    "STRICT": {
      "0": { "ScriptKeywords": 4 }
    },
    "strictly": {
      "0": { "UpgradeTo34": 1 }
    },
    "sTRiN": {
      "0": { "String": 1 }
    },
    "STRING": {
      "0": { "String": 1 }
    },
    "string": {
      "0": { "String": 71 },
      "1": { "Game": 21 },
      "2": { "File": 19 },
      "3": { "Globalfunctions_General": 12 },
      "4": { "UpgradingTo271": 11 },
      "5": { "Globalfunctions_Message": 8 },
      "6": { "Settingupthegame": 6 },
      "7": { "Room": 5 },
      "8": { "Set": 4 },
      "9": { "ScriptKeywords": 3 },
      "10": { "System": 2 },
      "11": { "UpgradeTo30": 1 }
    },
    "String": {
      "0": { "String": 80 },
      "1": { "Game": 13 },
      "2": { "Dictionary": 11 },
      "3": { "OOProgramming": 7 },
      "4": { "UpgradingTo271": 6 },
      "5": { "ListBox": 5 },
      "6": { "StringFormats": 4 },
      "7": { "Settingupthegame": 3 },
      "8": { "TextBox": 2 },
      "9": { "DynamicArrays": 1 }
    },
    "string's": {
      "0": { "UpgradingTo271": 1 }
    },
    "StringCompareStyle": {
      "0": { "Dictionary": 2 },
      "1": { "StandardEnums": 1 }
    },
    "Strings": {
      "0": { "String": 6 },
      "1": { "UpgradingTo271": 2 },
      "2": { "ScriptingTutorialPart1": 1 }
    },
    "strings": {
      "0": { "UpgradingTo271": 6 },
      "1": { "Set": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "ScriptKeywords": 1 }
    },
    "STRINGS": {
      "0": { "ScriptKeywords": 3 }
    },
    "stringToCheck": {
      "0": { "String": 3 }
    },
    "StringToInt": {
      "0": { "String": 1 }
    },
    "strip": {
      "0": { "DynamicSprite": 1 }
    },
    "stripped": {
      "0": { "TextParser": 1 }
    },
    "strips": {
      "0": { "EditorView": 1 }
    },
    "StrLen": {
      "0": { "String": 1 }
    },
    "strong": {
      "0": { "Game": 1 }
    },
    "strongly": {
      "0": { "Pointers": 1 }
    },
    "StrSetCharAt": {
      "0": { "String": 1 }
    },
    "StrToLowerCase": {
      "0": { "String": 1 }
    },
    "StrToUpperCase": {
      "0": { "String": 1 }
    },
    "struct": {
      "0": { "ScriptKeywords": 28 },
      "1": { "OOProgramming": 14 },
      "2": { "Screen": 4 },
      "3": { "TextWindowGUI": 2 },
      "4": { "Pointers": 1 }
    },
    "Structs": {
      "0": { "ScriptKeywords": 2 },
      "1": { "DynamicArrays": 1 }
    },
    "structs": {
      "0": { "ScriptKeywords": 7 },
      "1": { "UpgradeTo34": 3 },
      "2": { "DynamicArrays": 2 },
      "3": { "Pointers": 1 }
    },
    "structure": {
      "0": { "acintro8": 2 },
      "1": { "OOProgramming": 1 }
    },
    "structured": {
      "0": { "ScriptKeywords": 1 }
    },
    "stub'": {
      "0": { "TemplateBASS": 1 }
    },
    "stuck": {
      "0": { "Gamevariables": 1 }
    },
    "Studio": {
      "0": { "Settingupthegame": 2 },
      "1": { "Copyright": 1 }
    },
    "STUDIO": {
      "0": { "Copyright": 1 }
    },
    "stuff": {
      "0": { "ScriptKeywords": 4 },
      "1": { "ScriptingTutorialPart2": 2 },
      "2": { "UpgradeTo34": 1 }
    },
    "stumble": {
      "0": { "UpgradeTo350": 1 }
    },
    "sturdy": {
      "0": { "Hotspot": 1 }
    },
    "Style": {
      "0": { "Speech": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "StandardEnums": 1 }
    },
    "style": {
      "0": { "GUI": 9 },
      "1": { "Settingupthegame": 7 },
      "2": { "Dictionary": 6 },
      "3": { "Speech": 3 },
      "4": { "UpgradeTo33": 2 },
      "5": { "ScriptKeywords": 1 }
    },
    "styles": {
      "0": { "CustomDialogOptions": 1 }
    },
    "sub-directory": {
      "0": { "MusicAndSound": 1 }
    },
    "sub-folder": {
      "0": { "Settingupthegame": 2 }
    },
    "sub-nodes": {
      "0": { "MusicAndSound": 1 }
    },
    "subclass": {
      "0": { "Label": 1 }
    },
    "subdirectories": {
      "0": { "DistGame": 1 }
    },
    "subfolder": {
      "0": { "DistGame": 4 },
      "1": { "EditorSprite": 3 },
      "2": { "MusicAndSound": 2 },
      "3": { "Game": 1 }
    },
    "subfolders": {
      "0": { "MusicAndSound": 2 },
      "1": { "UpgradeTo341": 1 }
    },
    "submitted": {
      "0": { "Parser": 1 }
    },
    "submodule": {
      "0": { "Tumbleweed": 1 }
    },
    "subordinate": {
      "0": { "MusicAndSound": 1 }
    },
    "subsequent": {
      "0": { "TextParser": 1 }
    },
    "substitute": {
      "0": { "Settingupthegame": 4 },
      "1": { "Translations": 1 }
    },
    "Substring": {
      "0": { "String": 7 }
    },
    "substring": {
      "0": { "String": 2 }
    },
    "subtract": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Subtract": {
      "0": { "Region": 1 }
    },
    "succeed": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "success": {
      "0": { "Dictionary": 1 }
    },
    "successful": {
      "0": { "DynamicSprite": 2 }
    },
    "successfully": {
      "0": { "Game": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "suddenly": {
      "0": { "Settingupthegame": 1 }
    },
    "suffer": {
      "0": { "acintro4": 1 }
    },
    "sufficient": {
      "0": { "Game": 1 }
    },
    "suggest": {
      "0": { "Object": 1 }
    },
    "suggested": {
      "0": { "Settingupthegame": 2 },
      "1": { "System": 1 }
    },
    "suggestions": {
      "0": { "Credits": 1 }
    },
    "suit": {
      "0": { "System": 1 }
    },
    "Suitable": {
      "0": { "EventTypes": 1 }
    },
    "suitable": {
      "0": { "Globalfunctions_General": 1 }
    },
    "suits": {
      "0": { "acintro1": 1 }
    },
    "summarize": {
      "0": { "Dictionary": 1 }
    },
    "summarized": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "Summary": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "summary": {
      "0": { "AutonumberSpeechFiles": 1 }
    },
    "summed": {
      "0": { "StandardEnums": 1 }
    },
    "Sunit": {
      "0": { "Credits": 1 }
    },
    "supersedes": {
      "0": { "ListBox": 1 }
    },
    "supplied": {
      "0": { "Maths": 5 },
      "1": { "Globalfunctions_General": 4 },
      "2": { "DrawingSurfaceFunctions": 1 }
    },
    "supplies": {
      "0": { "OOProgramming": 1 }
    },
    "supply": {
      "0": { "ScriptingTutorialPart1": 7 },
      "1": { "DynamicSprite": 6 },
      "2": { "ScriptKeywords": 2 },
      "3": { "Region": 1 }
    },
    "supplying": {
      "0": { "Character": 1 }
    },
    "support": {
      "0": { "Settingupthegame": 6 },
      "1": { "UpgradeTo31": 3 },
      "2": { "ScriptKeywords": 2 },
      "3": { "UpgradingTo271": 1 }
    },
    "Support": {
      "0": { "Multimedia": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "supported": {
      "0": { "Character": 6 },
      "1": { "Multimedia": 4 },
      "2": { "Globalfunctions_General": 3 },
      "3": { "Mouse": 2 },
      "4": { "Region": 1 }
    },
    "Supported": {
      "0": { "Character": 22 },
      "1": { "Game": 15 },
      "2": { "DialogOptionsRenderingInfo": 13 },
      "3": { "AudioChannel": 12 },
      "4": { "System": 9 },
      "5": { "AudioClip": 8 },
      "6": { "GUI": 7 },
      "7": { "Maths": 6 },
      "8": { "Speech": 5 },
      "9": { "File": 4 },
      "10": { "Mouse": 3 },
      "11": { "DrawingSurfaceFunctions": 2 },
      "12": { "Region": 1 }
    },
    "supports": {
      "0": { "UpgradingTo27": 3 },
      "1": { "ScriptKeywords": 2 },
      "2": { "DynamicSprite": 1 }
    },
    "SUPPORTS": {
      "0": { "ScriptKeywords": 1 }
    },
    "SupportsGammaControl": {
      "0": { "System": 6 }
    },
    "suppose": {
      "0": { "ScriptKeywords": 3 },
      "1": { "ScriptingTutorialPart2": 2 },
      "2": { "ScriptModules": 1 }
    },
    "Suppose": {
      "0": { "ScriptingTutorialPart1": 2 },
      "1": { "Pointers": 1 }
    },
    "supposed": {
      "0": { "ScriptKeywords": 1 }
    },
    "Supposing": {
      "0": { "MusicAndSound": 1 }
    },
    "sure": {
      "0": { "DynamicSprite": 8 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "FAQ": 4 },
      "3": { "acintro3": 3 },
      "4": { "EditorInventoryItems": 2 },
      "5": { "MusicAndSound": 1 }
    },
    "surely": {
      "0": { "CustomProperties": 1 }
    },
    "Surface": {
      "0": { "CustomDialogOptions": 8 },
      "1": { "DialogOptionsRenderingInfo": 4 },
      "2": { "Scripting": 1 }
    },
    "surface": {
      "0": { "DrawingSurfaceFunctions": 96 },
      "1": { "DynamicSprite": 49 },
      "2": { "Room": 7 },
      "3": { "DialogOptionsRenderingInfo": 5 },
      "4": { "Globalfunctions_General": 4 },
      "5": { "UpgradeTo30": 2 },
      "6": { "UpgradeTo33": 1 }
    },
    "surface's": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "surfaces": {
      "0": { "DrawingSurfaceFunctions": 4 }
    },
    "Surfaces": {
      "0": { "UpgradeTo33": 1 }
    },
    "surrounded": {
      "0": { "ScriptingTutorialPart1": 2 }
    },
    "surrounding": {
      "0": { "TextWindowGUI": 1 }
    },
    "suspects": {
      "0": { "FAQ": 1 }
    },
    "swap": {
      "0": { "acintro1": 1 }
    },
    "swaps": {
      "0": { "Settingupthegame": 1 }
    },
    "SWIMMING": {
      "0": { "Game": 10 }
    },
    "swimming": {
      "0": { "Character": 1 }
    },
    "switch": {
      "0": { "ScriptKeywords": 13 },
      "1": { "UpgradeTo34": 7 },
      "2": { "System": 5 },
      "3": { "Settingupthegame": 3 },
      "4": { "Pointers": 1 }
    },
    "switched": {
      "0": { "TemplateSierraStyle": 2 },
      "1": { "acintro4": 1 }
    },
    "switches": {
      "0": { "System": 3 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "Scripting": 1 }
    },
    "Switches": {
      "0": { "Tumbleweed_actions": 1 }
    },
    "switching": {
      "0": { "Settingupthegame": 1 }
    },
    "sword": {
      "0": { "ScriptKeywords": 6 },
      "1": { "OOProgramming": 1 }
    },
    "swordDamage": {
      "0": { "ScriptKeywords": 1 }
    },
    "swordName": {
      "0": { "ScriptKeywords": 1 }
    },
    "swordPrice": {
      "0": { "ScriptKeywords": 1 }
    },
    "swordsmanHealth": {
      "0": { "ScriptKeywords": 1 }
    },
    "sx": {
      "0": { "Screen": 1 }
    },
    "sy": {
      "0": { "Screen": 1 }
    },
    "symbol": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "symbolize": {
      "0": { "MusicAndSound": 1 }
    },
    "symbols": {
      "0": { "UpgradeTo335": 1 }
    },
    "sync": {
      "0": { "Lipsync": 10 },
      "1": { "Character": 2 },
      "2": { "Speech": 1 }
    },
    "Sync": {
      "0": { "Lipsync": 4 }
    },
    "synchronization": {
      "0": { "Setup": 1 }
    },
    "synchronize": {
      "0": { "Character": 2 }
    },
    "syncing": {
      "0": { "Lipsync": 3 },
      "1": { "UpgradeTo32": 1 }
    },
    "synonym": {
      "0": { "TextParser": 3 }
    },
    "synonyms": {
      "0": { "TextParser": 7 },
      "1": { "Parser": 1 }
    },
    "syntax": {
      "0": { "Pointers": 1 }
    },
    "System": {
      "0": { "System": 62 },
      "1": { "TroubleshootingWindowsZoneID": 4 },
      "2": { "GraphicsDriver": 2 },
      "3": { "SystemLimits": 1 }
    },
    "system": {
      "0": { "System": 17 },
      "1": { "UpgradeTo32": 5 },
      "2": { "Multimedia": 4 },
      "3": { "Copyright": 3 },
      "4": { "IntegrationWithWindows": 2 },
      "5": { "UpgradeTo30": 1 }
    },
    "systems": {
      "0": { "SourceControl": 3 },
      "1": { "DistGame": 1 }
    },
    "TAB": {
      "0": { "ASCIIcodes": 1 }
    },
    "Tab": {
      "0": { "KeyboardShortcuts": 5 }
    },
    "tab": {
      "0": { "Mouse": 3 },
      "1": { "Character": 2 },
      "2": { "InventoryItem": 1 }
    },
    "tabbed": {
      "0": { "acintro1": 1 }
    },
    "table": {
      "0": { "UpgradeTo350": 2 },
      "1": { "ASCIIcodes": 1 }
    },
    "Table's": {
      "0": { "Object": 1 }
    },
    "table's": {
      "0": { "Object": 1 }
    },
    "tables": {
      "0": { "Settingupthegame": 1 }
    },
    "tablet": {
      "0": { "TextParser": 5 }
    },
    "Tabs": {
      "0": { "Globalfunctions_General": 1 }
    },
    "tabs": {
      "0": { "Settingupthegame": 2 }
    },
    "tag": {
      "0": { "UpgradeTo335": 4 },
      "1": { "UpgradeTo350": 3 },
      "2": { "Game": 1 }
    },
    "tagged": {
      "0": { "UpgradeTo350": 3 },
      "1": { "Settingupthegame": 2 }
    },
    "tags": {
      "0": { "Settingupthegame": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "Take": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "take": {
      "0": { "Character": 5 },
      "1": { "Tumbleweed_translation": 4 },
      "2": { "Tumbleweed": 3 },
      "3": { "Settingupthegame": 2 },
      "4": { "Region": 1 }
    },
    "taken": {
      "0": { "StandardEnums": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "Takes": {
      "0": { "Tumbleweed_helper": 1 }
    },
    "takes": {
      "0": { "acintro8": 2 },
      "1": { "Region": 1 }
    },
    "taking": {
      "0": { "Screen": 2 },
      "1": { "acintro4": 1 }
    },
    "Talk": {
      "0": { "EventTypes": 4 },
      "1": { "TextScriptEvents": 3 },
      "2": { "Mouse": 1 }
    },
    "TALK": {
      "0": { "Character": 1 }
    },
    "talk": {
      "0": { "acintro8": 6 },
      "1": { "EventTypes": 3 },
      "2": { "Tumbleweed_extensions": 2 },
      "3": { "Globalfunctions_General": 1 }
    },
    "talkanim": {
      "0": { "UpgradeTo33": 1 }
    },
    "talked": {
      "0": { "acintro8": 1 }
    },
    "talkie": {
      "0": { "MusicAndSound": 1 }
    },
    "talking": {
      "0": { "Character": 19 },
      "1": { "Settingupthegame": 9 },
      "2": { "Lipsync": 8 },
      "3": { "BlockingScripts": 3 },
      "4": { "Speech": 2 },
      "5": { "acintro3": 1 }
    },
    "talks": {
      "0": { "Settingupthegame": 3 },
      "1": { "acintro8": 1 }
    },
    "TalkTo": {
      "0": { "Tumbleweed": 1 }
    },
    "talkview": {
      "0": { "Character": 1 }
    },
    "tall": {
      "0": { "Globalfunctions_General": 1 }
    },
    "taller": {
      "0": { "Object": 1 }
    },
    "Tan": {
      "0": { "Maths": 13 }
    },
    "tan": {
      "0": { "Maths": 4 }
    },
    "tangent": {
      "0": { "Maths": 2 }
    },
    "Tanh": {
      "0": { "Maths": 6 }
    },
    "tap": {
      "0": { "TemplateSierraStyle": 1 }
    },
    "target": {
      "0": { "Character": 4 },
      "1": { "StandardTypes": 3 },
      "2": { "UpgradeTo34": 2 },
      "3": { "Settingupthegame": 1 }
    },
    "task": {
      "0": { "ListBox": 1 }
    },
    "tasks": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "ScriptingTutorialPart1": 1 }
    },
    "taste": {
      "0": { "EventTypes": 1 }
    },
    "team": {
      "0": { "Credits": 2 },
      "1": { "DistGame": 1 }
    },
    "teams": {
      "0": { "SourceControl": 1 }
    },
    "tearing": {
      "0": { "System": 1 }
    },
    "Technical": {
      "0": { "Pointers": 1 }
    },
    "techno-garbage": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "technology": {
      "0": { "Settingupthegame": 1 }
    },
    "teel": {
      "0": { "Templates": 1 }
    },
    "Teemu": {
      "0": { "Credits": 1 }
    },
    "teemue": {
      "0": { "Credits": 1 }
    },
    "Teleport": {
      "0": { "Globalfunctions_General": 1 }
    },
    "teleport": {
      "0": { "acintro1": 1 }
    },
    "Tell": {
      "0": { "acintro8": 1 }
    },
    "tell": {
      "0": { "ScriptingTutorialPart1": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "UpgradeTo335": 1 }
    },
    "telling": {
      "0": { "acintro3": 2 },
      "1": { "ScriptingTutorialPart2": 1 }
    },
    "Tells": {
      "0": { "Character": 2 },
      "1": { "DrawingSurfaceFunctions": 1 }
    },
    "tells": {
      "0": { "Settingupthegame": 3 },
      "1": { "acintro8": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "temp": {
      "0": { "File": 11 },
      "1": { "Pointers": 2 }
    },
    "template": {
      "0": { "Templates": 18 },
      "1": { "Tumbleweed": 7 },
      "2": { "Credits": 5 },
      "3": { "TemplateSierraStyle": 4 },
      "4": { "acintro1": 3 },
      "5": { "Tumbleweed_extensions": 2 },
      "6": { "Tumbleweed_translation": 1 }
    },
    "Template": {
      "0": { "acintro1": 2 },
      "1": { "EditingGUIs": 1 }
    },
    "template's": {
      "0": { "Tumbleweed_translation": 2 }
    },
    "Templates": {
      "0": { "Templates": 3 }
    },
    "templates": {
      "0": { "Templates": 9 }
    },
    "TemplateSettings": {
      "0": { "Tumbleweed": 3 },
      "1": { "Tumbleweed_unhandled": 1 }
    },
    "temporarily": {
      "0": { "Mouse": 2 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "temporary": {
      "0": { "Character": 1 }
    },
    "tend": {
      "0": { "InvWindow": 1 }
    },
    "Tentacle": {
      "0": { "Settingupthegame": 1 }
    },
    "tenth": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "term": {
      "0": { "DateTime": 1 }
    },
    "terminated": {
      "0": { "ScriptKeywords": 1 }
    },
    "terms": {
      "0": { "Copyright": 3 },
      "1": { "DistGame": 2 },
      "2": { "BlockingScripts": 1 }
    },
    "TERMS": {
      "0": { "Copyright": 1 }
    },
    "Terrible": {
      "0": { "Tumbleweed": 1 }
    },
    "Test": {
      "0": { "Pointers": 2 },
      "1": { "acintro8": 1 }
    },
    "TEST": {
      "0": { "String": 1 }
    },
    "test": {
      "0": { "File": 17 },
      "1": { "String": 8 },
      "2": { "Set": 4 },
      "3": { "Globalfunctions_General": 2 },
      "4": { "UpgradeTo30": 1 }
    },
    "tested": {
      "0": { "UpgradeTo341": 1 }
    },
    "testers": {
      "0": { "Credits": 1 }
    },
    "TestFunction": {
      "0": { "ScriptKeywords": 1 }
    },
    "testing": {
      "0": { "Settingupthegame": 2 },
      "1": { "acintro": 1 }
    },
    "testOverlay": {
      "0": { "Overlay": 8 }
    },
    "Tests": {
      "0": { "Mouse": 1 }
    },
    "tests": {
      "0": { "Globalfunctions_General": 1 }
    },
    "TEXT": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Overlay": 1 }
    },
    "text": {
      "0": { "Settingupthegame": 33 },
      "1": { "Speech": 25 },
      "2": { "Game": 24 },
      "3": { "Overlay": 23 },
      "4": { "EditingGUIs": 22 },
      "5": { "Globalfunctions_General": 19 },
      "6": { "Character": 18 },
      "7": { "Gamevariables": 17 },
      "8": { "DrawingSurfaceFunctions": 14 },
      "9": { "DialogOptionsRenderingInfo": 13 },
      "10": { "File": 12 },
      "11": { "UpgradingTo271": 11 },
      "12": { "Globalfunctions_Message": 10 },
      "13": { "Button": 9 },
      "14": { "Dialog": 8 },
      "15": { "Label": 7 },
      "16": { "acintro8": 6 },
      "17": { "Lipsync": 5 },
      "18": { "acintro9": 4 },
      "19": { "CustomProperties": 3 },
      "20": { "StringFormats": 2 },
      "21": { "OtherFeatures": 1 }
    },
    "Text": {
      "0": { "Label": 7 },
      "1": { "EditingGUIs": 6 },
      "2": { "Parser": 5 },
      "3": { "UpgradingTo271": 3 },
      "4": { "Hotspot": 2 },
      "5": { "CustomProperties": 1 }
    },
    "Text-based": {
      "0": { "Lipsync": 1 }
    },
    "text-boxes": {
      "0": { "EditingGUIs": 1 }
    },
    "text-windows": {
      "0": { "Settingupthegame": 1 }
    },
    "TextAlignment": {
      "0": { "StandardEnums": 4 },
      "1": { "Speech": 3 },
      "2": { "Label": 2 },
      "3": { "UpgradeTo33": 1 }
    },
    "textbg": {
      "0": { "Gamevariables": 1 }
    },
    "textbox": {
      "0": { "DialogOptionsRenderingInfo": 3 },
      "1": { "DrawingSurfaceFunctions": 2 },
      "2": { "Region": 1 }
    },
    "TextBox": {
      "0": { "GUIControl": 15 },
      "1": { "TextBox": 12 },
      "2": { "StandardEnums": 1 }
    },
    "TextColor": {
      "0": { "ListBox": 9 },
      "1": { "TextBox": 4 },
      "2": { "TextWindowGUI": 3 },
      "3": { "GUI": 1 }
    },
    "TextPadding": {
      "0": { "TextWindowGUI": 2 }
    },
    "TextParser": {
      "0": { "Parser": 1 }
    },
    "TextReadingSpeed": {
      "0": { "Game": 7 },
      "1": { "Speech": 1 }
    },
    "textual": {
      "0": { "Globalfunctions_General": 1 }
    },
    "TextWindow": {
      "0": { "GUI": 2 },
      "1": { "TextWindowGUI": 1 }
    },
    "textwindow": {
      "0": { "TextWindowGUI": 1 }
    },
    "Textwindow": {
      "0": { "Globalfunctions_General": 1 }
    },
    "textwindow-based": {
      "0": { "Gamevariables": 2 }
    },
    "TextWindowGUI": {
      "0": { "TextWindowGUI": 5 },
      "1": { "GUI": 4 },
      "2": { "Scripting": 1 }
    },
    "Th": {
      "0": { "Lipsync": 2 }
    },
    "th": {
      "0": { "Lipsync": 1 }
    },
    "than": {
      "0": { "ScriptKeywords": 11 },
      "1": { "Globalfunctions_General": 10 },
      "2": { "ScriptingTutorialPart1": 6 },
      "3": { "UpgradeTo350": 5 },
      "4": { "IntegrationWithWindows": 4 },
      "5": { "UpgradingTo27": 3 },
      "6": { "EditingGUIs": 2 },
      "7": { "UpgradeTo341": 1 }
    },
    "thank": {
      "0": { "Tumbleweed": 1 }
    },
    "thanks": {
      "0": { "UpgradingTo27": 1 }
    },
    "Thanks": {
      "0": { "Credits": 1 }
    },
    "that's": {
      "0": { "Pointers": 2 },
      "1": { "acintro5": 1 }
    },
    "That's": {
      "0": { "Pointers": 2 },
      "1": { "ExtenderFunctions": 1 }
    },
    "theButton": {
      "0": { "GUIControl": 3 }
    },
    "theControl": {
      "0": { "GUIControl": 5 }
    },
    "theFile": {
      "0": { "Pointers": 5 }
    },
    "thegui": {
      "0": { "GUIControl": 2 }
    },
    "theGui": {
      "0": { "GUI": 4 }
    },
    "them": {
      "0": { "Settingupthegame": 10 },
      "1": { "ScriptingTutorialPart1": 9 },
      "2": { "UpgradeTo33": 7 },
      "3": { "acintro9": 6 },
      "4": { "OOProgramming": 5 },
      "5": { "Globalfunctions_General": 4 },
      "6": { "UpgradeTo30": 3 },
      "7": { "Lipsync": 2 },
      "8": { "Viewport": 1 }
    },
    "themselves": {
      "0": { "ScriptKeywords": 1 }
    },
    "theora": {
      "0": { "Multimedia": 1 }
    },
    "Theora": {
      "0": { "Multimedia": 4 },
      "1": { "Credits": 2 }
    },
    "theory": {
      "0": { "SystemLimits": 1 }
    },
    "THEORY": {
      "0": { "Copyright": 1 }
    },
    "there's": {
      "0": { "UpgradingTo27": 2 },
      "1": { "Screen": 1 }
    },
    "There's": {
      "0": { "Screen": 1 }
    },
    "thereafter": {
      "0": { "Game": 1 }
    },
    "Therefore": {
      "0": { "DynamicSprite": 7 },
      "1": { "DrawingSurfaceFunctions": 2 },
      "2": { "Globalfunctions_Room": 1 }
    },
    "therefore": {
      "0": { "Game": 6 },
      "1": { "File": 3 },
      "2": { "UpgradingTo27": 2 },
      "3": { "acintro3": 1 }
    },
    "they'd": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "they'll": {
      "0": { "MusicAndSound": 1 }
    },
    "they're": {
      "0": { "acintro2": 1 }
    },
    "They're": {
      "0": { "Pointers": 1 }
    },
    "they've": {
      "0": { "acintro9": 1 }
    },
    "thick": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "thicker": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "thickness": {
      "0": { "DrawingSurfaceFunctions": 3 }
    },
    "Thiessen": {
      "0": { "Credits": 1 }
    },
    "Thimbleweed": {
      "0": { "Tumbleweed": 1 }
    },
    "thing": {
      "0": { "GUIControl": 2 },
      "1": { "Region": 1 }
    },
    "Thing": {
      "0": { "OOProgramming": 7 }
    },
    "things": {
      "0": { "Settingupthegame": 6 },
      "1": { "UpgradingTo27": 4 },
      "2": { "acintro4": 3 },
      "3": { "Character": 2 },
      "4": { "SourceControl": 1 }
    },
    "think": {
      "0": { "BlockingScripts": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "Think": {
      "0": { "Character": 8 },
      "1": { "Settingupthegame": 1 }
    },
    "Thinking": {
      "0": { "Character": 11 }
    },
    "thinking": {
      "0": { "Character": 19 }
    },
    "ThinkingFrame": {
      "0": { "Character": 5 }
    },
    "thinks": {
      "0": { "UpgradeTo32": 1 }
    },
    "ThinkView": {
      "0": { "Character": 4 }
    },
    "thinkview": {
      "0": { "Character": 1 }
    },
    "third": {
      "0": { "acintro1": 1 }
    },
    "Third": {
      "0": { "ListBox": 2 }
    },
    "third-party": {
      "0": { "Lipsync": 1 }
    },
    "those": {
      "0": { "Character": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "Those": {
      "0": { "UpgradeTo34": 1 }
    },
    "though": {
      "0": { "Character": 3 },
      "1": { "OOProgramming": 2 },
      "2": { "GUIControl": 1 }
    },
    "Thought": {
      "0": { "Character": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "thought": {
      "0": { "Character": 5 },
      "1": { "AutonumberSpeechFiles": 1 }
    },
    "THOUGHTGUI": {
      "0": { "Globalfunctions_General": 1 }
    },
    "thoughts": {
      "0": { "Settingupthegame": 1 }
    },
    "thousand": {
      "0": { "ScriptKeywords": 1 }
    },
    "thread": {
      "0": { "BlockingScripts": 15 },
      "1": { "CustomDialogOptions": 1 }
    },
    "thread's": {
      "0": { "BlockingScripts": 1 }
    },
    "threads": {
      "0": { "BlockingScripts": 3 }
    },
    "three": {
      "0": { "acintro8": 6 },
      "1": { "FAQ": 2 },
      "2": { "Pointers": 1 }
    },
    "Three": {
      "0": { "Settingupthegame": 1 }
    },
    "threshold": {
      "0": { "TemplateBASS": 2 }
    },
    "Throne": {
      "0": { "Room": 1 }
    },
    "through": {
      "0": { "Game": 8 },
      "1": { "Object": 7 },
      "2": { "Globalfunctions_General": 5 },
      "3": { "Settingupthegame": 4 },
      "4": { "UpgradeTo30": 3 },
      "5": { "GUIControl": 2 },
      "6": { "EditingGUIs": 1 }
    },
    "throughout": {
      "0": { "acintro1": 1 }
    },
    "throw": {
      "0": { "TextParser": 3 },
      "1": { "UpgradingTo27": 1 }
    },
    "thumbnails": {
      "0": { "Settingupthegame": 1 }
    },
    "thus": {
      "0": { "Game": 10 },
      "1": { "ScriptKeywords": 2 },
      "2": { "UpgradeTo350": 1 }
    },
    "Thus": {
      "0": { "Pointers": 1 }
    },
    "tick": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "EditorView": 1 }
    },
    "tick-box": {
      "0": { "Character": 1 }
    },
    "ticked": {
      "0": { "DynamicSprite": 1 }
    },
    "ticking": {
      "0": { "Globalfunctions_General": 1 }
    },
    "tied": {
      "0": { "UpgradeTo34": 1 }
    },
    "tightly": {
      "0": { "ScriptKeywords": 1 }
    },
    "tile": {
      "0": { "acintro6": 1 }
    },
    "Tiled": {
      "0": { "acintro6": 3 }
    },
    "tiled": {
      "0": { "EditingGUIs": 1 }
    },
    "TIME": {
      "0": { "Globalfunctions_General": 3 }
    },
    "Time": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "time": {
      "0": { "DateTime": 10 },
      "1": { "Settingupthegame": 9 },
      "2": { "Game": 7 },
      "3": { "Character": 6 },
      "4": { "ScriptKeywords": 5 },
      "5": { "EventTypes": 4 },
      "6": { "Gamevariables": 3 },
      "7": { "InvWindow": 2 },
      "8": { "GUIControl": 1 }
    },
    "time-out": {
      "0": { "Speech": 3 }
    },
    "time-related": {
      "0": { "CustomDialogOptions": 1 }
    },
    "time-saver": {
      "0": { "Tumbleweed_door": 1 }
    },
    "timed": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "TIMEOUT": {
      "0": { "Globalfunctions_General": 2 }
    },
    "timeout": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Character": 1 }
    },
    "TIMER": {
      "0": { "Globalfunctions_General": 3 }
    },
    "Timer": {
      "0": { "Globalfunctions_General": 1 }
    },
    "timer": {
      "0": { "Globalfunctions_General": 11 },
      "1": { "ScriptingTutorialPart2": 8 },
      "2": { "Mouse": 4 },
      "3": { "Character": 2 },
      "4": { "Gamevariables": 1 }
    },
    "timers": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "SystemLimits": 1 }
    },
    "times": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "acintro8": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "timing": {
      "0": { "DateTime": 2 },
      "1": { "Lipsync": 1 }
    },
    "tiniest": {
      "0": { "Setup": 1 }
    },
    "tint": {
      "0": { "Character": 20 },
      "1": { "Object": 19 },
      "2": { "Region": 11 },
      "3": { "Globalfunctions_General": 7 },
      "4": { "DynamicSprite": 3 },
      "5": { "Globalfunctions_Screen": 2 },
      "6": { "Settingupthegame": 1 }
    },
    "Tint": {
      "0": { "Character": 19 },
      "1": { "Region": 15 },
      "2": { "DynamicSprite": 4 },
      "3": { "Globalfunctions_General": 3 }
    },
    "TintBlue": {
      "0": { "Region": 11 },
      "1": { "Character": 6 }
    },
    "tinted": {
      "0": { "Region": 6 },
      "1": { "AdvancedRoomFeatures": 2 },
      "2": { "Character": 1 }
    },
    "TintEnabled": {
      "0": { "Region": 17 }
    },
    "TintGreen": {
      "0": { "Region": 11 },
      "1": { "Character": 6 }
    },
    "tinting": {
      "0": { "GraphicsDriver": 2 },
      "1": { "Region": 1 }
    },
    "TintLuminance": {
      "0": { "Region": 7 },
      "1": { "Character": 6 }
    },
    "TintRed": {
      "0": { "Region": 11 },
      "1": { "Character": 6 }
    },
    "tints": {
      "0": { "Region": 4 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "Character": 1 }
    },
    "Tints": {
      "0": { "Globalfunctions_General": 1 }
    },
    "TintSaturation": {
      "0": { "Region": 10 },
      "1": { "Character": 5 }
    },
    "TintScreen": {
      "0": { "Globalfunctions_Screen": 3 }
    },
    "tiny": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "TIP": {
      "0": { "Game": 1 }
    },
    "title": {
      "0": { "Settingupthegame": 5 },
      "1": { "acintro1": 1 }
    },
    "Title": {
      "0": { "Setup": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "titled": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "titles": {
      "0": { "acintro8": 1 }
    },
    "titleText": {
      "0": { "Globalfunctions_Message": 1 }
    },
    "TITLETEXT": {
      "0": { "Globalfunctions_Message": 1 }
    },
    "TM": {
      "0": { "Tumbleweed": 1 }
    },
    "tmp": {
      "0": { "File": 9 }
    },
    "Tobias": {
      "0": { "Credits": 1 }
    },
    "today": {
      "0": { "ScriptKeywords": 1 }
    },
    "Today": {
      "0": { "Settingupthegame": 1 }
    },
    "TOFACE": {
      "0": { "Character": 1 }
    },
    "toFace": {
      "0": { "Character": 1 }
    },
    "together": {
      "0": { "ScriptKeywords": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "Toggle": {
      "0": { "UpgradeTo350": 2 }
    },
    "toggle": {
      "0": { "Settingupthegame": 3 },
      "1": { "Debuggingfeatures": 1 }
    },
    "toggles": {
      "0": { "Globalfunctions_General": 1 }
    },
    "toggling": {
      "0": { "System": 1 }
    },
    "Token": {
      "0": { "EditingGUIs": 1 }
    },
    "token": {
      "0": { "Game": 4 },
      "1": { "Settingupthegame": 2 },
      "2": { "UpgradeTo350": 1 }
    },
    "tokens": {
      "0": { "DynamicSprite": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "told": {
      "0": { "Settingupthegame": 1 }
    },
    "Tom": {
      "0": { "Credits": 1 }
    },
    "tons": {
      "0": { "ScriptKeywords": 1 }
    },
    "too": {
      "0": { "Settingupthegame": 4 },
      "1": { "Lipsync": 3 },
      "2": { "SystemLimits": 2 },
      "3": { "GUI": 1 }
    },
    "ToogleGuiStyle": {
      "0": { "Tumbleweed_actions": 2 }
    },
    "took": {
      "0": { "UpgradingTo271": 1 }
    },
    "tool": {
      "0": { "EditorRoom": 4 },
      "1": { "acintro2": 3 }
    },
    "toolbar": {
      "0": { "EditingGUIs": 2 },
      "1": { "acintro2": 1 }
    },
    "tools": {
      "0": { "acintro2": 5 }
    },
    "top": {
      "0": { "Globalfunctions_Message": 9 },
      "1": { "Settingupthegame": 6 },
      "2": { "DrawingSurfaceFunctions": 5 },
      "3": { "Globalfunctions_General": 4 },
      "4": { "acintro1": 3 },
      "5": { "Overlay": 2 },
      "6": { "Gamevariables": 1 }
    },
    "Top": {
      "0": { "Game": 1 }
    },
    "top-left": {
      "0": { "DialogOptionsRenderingInfo": 2 },
      "1": { "GUIControl": 1 }
    },
    "top-right": {
      "0": { "acintro1": 1 }
    },
    "TopEdge": {
      "0": { "Room": 6 }
    },
    "TopEdgeY": {
      "0": { "EditorRoom": 1 }
    },
    "Topic": {
      "0": { "Settingupthegame": 1 }
    },
    "topic": {
      "0": { "Settingupthegame": 14 },
      "1": { "acintro8": 10 },
      "2": { "SystemLimits": 1 }
    },
    "topic's": {
      "0": { "acintro8": 1 }
    },
    "topics": {
      "0": { "acintro8": 2 },
      "1": { "Pointers": 1 }
    },
    "Topics": {
      "0": { "Settingupthegame": 1 }
    },
    "TopItem": {
      "0": { "InvWindow": 5 },
      "1": { "ListBox": 4 }
    },
    "topmost": {
      "0": { "Screen": 1 }
    },
    "total": {
      "0": { "InvWindow": 2 },
      "1": { "Gamevariables": 1 }
    },
    "Total": {
      "0": { "UpgradeTo350": 1 }
    },
    "totally": {
      "0": { "acintro5": 2 },
      "1": { "UpgradeTo335": 1 }
    },
    "TOTALSCORE": {
      "0": { "EditingGUIs": 2 }
    },
    "touch": {
      "0": { "EditingGUIs": 1 }
    },
    "touching": {
      "0": { "Character": 3 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "towards": {
      "0": { "RepExec": 2 },
      "1": { "Screen": 1 }
    },
    "townsperson": {
      "0": { "Character": 1 }
    },
    "Toybox": {
      "0": { "Tumbleweed": 1 }
    },
    "tr": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "TRA": {
      "0": { "Translations": 1 }
    },
    "tra": {
      "0": { "Game": 1 }
    },
    "trace": {
      "0": { "FAQ": 1 }
    },
    "track": {
      "0": { "Multimedia": 7 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "tracking": {
      "0": { "Camera": 4 }
    },
    "tracks": {
      "0": { "Globalfunctions_General": 1 }
    },
    "trademark": {
      "0": { "Copyright": 3 }
    },
    "trailing": {
      "0": { "MusicAndSound": 1 }
    },
    "trans": {
      "0": { "Character": 4 }
    },
    "transfer": {
      "0": { "Settingupthegame": 1 }
    },
    "transformation": {
      "0": { "Screen": 2 }
    },
    "transformations": {
      "0": { "DynamicSprite": 1 }
    },
    "transition": {
      "0": { "Globalfunctions_Screen": 5 },
      "1": { "Gamevariables": 2 },
      "2": { "Viewport": 1 }
    },
    "transitions": {
      "0": { "Globalfunctions_Screen": 2 }
    },
    "TransitionStyle": {
      "0": { "Globalfunctions_Screen": 5 },
      "1": { "StandardEnums": 1 }
    },
    "translate": {
      "0": { "Tumbleweed": 1 }
    },
    "TranslateAction": {
      "0": { "Tumbleweed_translation": 3 },
      "1": { "Tumbleweed_actions": 1 }
    },
    "translated": {
      "0": { "Translations": 4 },
      "1": { "Tumbleweed_translation": 3 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "UpgradeTo33": 1 }
    },
    "Translated": {
      "0": { "ListBox": 2 },
      "1": { "EditingGUIs": 1 }
    },
    "translates": {
      "0": { "UpgradeTo350": 1 }
    },
    "translating": {
      "0": { "Tumbleweed": 1 }
    },
    "Translation": {
      "0": { "Tumbleweed": 2 },
      "1": { "Translations": 1 }
    },
    "translation": {
      "0": { "Game": 11 },
      "1": { "Translations": 9 },
      "2": { "Globalfunctions_General": 4 },
      "3": { "Tumbleweed": 2 },
      "4": { "Tumbleweed_translation": 1 }
    },
    "TRANSLATION": {
      "0": { "Translations": 1 }
    },
    "TranslationFilename": {
      "0": { "Game": 4 },
      "1": { "Globalfunctions_General": 1 }
    },
    "translations": {
      "0": { "Translations": 2 },
      "1": { "Tumbleweed_translation": 1 }
    },
    "Translations": {
      "0": { "Translations": 2 },
      "1": { "OtherFeatures": 1 }
    },
    "translator": {
      "0": { "Translations": 1 }
    },
    "translators": {
      "0": { "Tumbleweed": 1 }
    },
    "translucency": {
      "0": { "GUI": 2 }
    },
    "translucent": {
      "0": { "GUI": 1 }
    },
    "transparency": {
      "0": { "DrawingSurfaceFunctions": 8 },
      "1": { "Object": 5 },
      "2": { "DynamicSprite": 4 },
      "3": { "GUI": 2 },
      "4": { "EditorSprite": 1 }
    },
    "Transparency": {
      "0": { "Character": 9 },
      "1": { "Object": 8 },
      "2": { "GUI": 7 },
      "3": { "Settingupthegame": 3 },
      "4": { "DrawingSurfaceFunctions": 1 }
    },
    "transparent": {
      "0": { "Settingupthegame": 4 },
      "1": { "DrawingSurfaceFunctions": 3 },
      "2": { "Object": 2 },
      "3": { "Globalfunctions_Room": 1 }
    },
    "Transparent": {
      "0": { "acintro6": 1 }
    },
    "TRANSPARENT": {
      "0": { "DrawingSurfaceFunctions": 2 }
    },
    "transported": {
      "0": { "Character": 1 }
    },
    "trash": {
      "0": { "TextParser": 1 }
    },
    "tray": {
      "0": { "Multimedia": 2 }
    },
    "tread": {
      "0": { "Character": 1 }
    },
    "treat": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "treated": {
      "0": { "Settingupthegame": 1 }
    },
    "tree": {
      "0": { "acintro2": 5 },
      "1": { "acintro1": 4 },
      "2": { "Settingupthegame": 3 },
      "3": { "MusicAndSound": 2 },
      "4": { "Plugins": 1 }
    },
    "trees": {
      "0": { "acintro8": 1 }
    },
    "triangle": {
      "0": { "DrawingSurfaceFunctions": 3 }
    },
    "triangular": {
      "0": { "Lipsync": 1 }
    },
    "tricks": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "tricky": {
      "0": { "EditorInventoryItems": 1 }
    },
    "tries": {
      "0": { "Pointers": 1 }
    },
    "trigger": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "triggered": {
      "0": { "TextScriptEvents": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "triggering": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "triggers": {
      "0": { "GUI": 1 }
    },
    "trigonometric": {
      "0": { "Maths": 2 }
    },
    "trim": {
      "0": { "DynamicSprite": 1 }
    },
    "trouble": {
      "0": { "acintro4": 1 }
    },
    "Troubleshooting": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "Trovatore": {
      "0": { "Credits": 1 }
    },
    "TRS": {
      "0": { "BackingUpYourGame": 1 }
    },
    "true": {
      "0": { "Character": 31 },
      "1": { "Object": 12 },
      "2": { "ScriptKeywords": 10 },
      "3": { "String": 7 },
      "4": { "Game": 6 },
      "5": { "Globalfunctions_General": 5 },
      "6": { "Viewport": 4 },
      "7": { "Hotspot": 3 },
      "8": { "Region": 2 },
      "9": { "Globalfunctions_Room": 1 }
    },
    "True": {
      "0": { "acintro4": 1 }
    },
    "TRUE": {
      "0": { "InventoryItem": 3 },
      "1": { "Object": 2 },
      "2": { "GUI": 1 }
    },
    "true-colour": {
      "0": { "Settingupthegame": 2 }
    },
    "TrueType": {
      "0": { "acintro9": 1 }
    },
    "Truncate": {
      "0": { "String": 4 }
    },
    "Truncated": {
      "0": { "String": 2 }
    },
    "truncated": {
      "0": { "String": 3 },
      "1": { "Character": 1 }
    },
    "Try": {
      "0": { "acintro2": 1 }
    },
    "try": {
      "0": { "UpgradeTo335": 2 },
      "1": { "FAQ": 1 }
    },
    "Trying": {
      "0": { "acintro2": 1 }
    },
    "trying": {
      "0": { "Character": 1 }
    },
    "TTF": {
      "0": { "Settingupthegame": 7 },
      "1": { "acintro9": 4 },
      "2": { "Translations": 2 },
      "3": { "Label": 1 }
    },
    "Tumbleweed": {
      "0": { "Tumbleweed": 3 },
      "1": { "Templates": 1 }
    },
    "turn": {
      "0": { "Character": 25 },
      "1": { "Globalfunctions_General": 9 },
      "2": { "Settingupthegame": 7 },
      "3": { "EditingGUIs": 4 },
      "4": { "Object": 3 },
      "5": { "Globalfunctions_Screen": 2 },
      "6": { "Region": 1 }
    },
    "TURNBEFOREWALK": {
      "0": { "Globalfunctions_General": 1 }
    },
    "TurnBeforeWalking": {
      "0": { "Character": 3 },
      "1": { "Settingupthegame": 1 }
    },
    "turned": {
      "0": { "Character": 4 },
      "1": { "Settingupthegame": 1 }
    },
    "Turning": {
      "0": { "Character": 8 }
    },
    "turning": {
      "0": { "Character": 8 },
      "1": { "Settingupthegame": 1 }
    },
    "Turns": {
      "0": { "Settingupthegame": 3 },
      "1": { "Character": 2 }
    },
    "turns": {
      "0": { "GUIControl": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "TURNWHENFACING": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Tutorial": {
      "0": { "StartingOff": 9 },
      "1": { "ScriptingTutorialPart1": 3 },
      "2": { "acintro": 1 }
    },
    "tutorial": {
      "0": { "acintro3": 5 },
      "1": { "ScriptingTutorialPart1": 3 },
      "2": { "acintro1": 2 },
      "3": { "OtherFeatures": 1 }
    },
    "Tutorials": {
      "0": { "acintro": 1 }
    },
    "tutorials": {
      "0": { "acintro9": 3 },
      "1": { "acintro": 1 }
    },
    "TV": {
      "0": { "UpgradeTo350": 1 }
    },
    "tw": {
      "0": { "GUI": 2 }
    },
    "tweaks": {
      "0": { "Gamevariables": 1 }
    },
    "twice": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Game": 1 }
    },
    "two": {
      "0": { "ScriptingTutorialPart1": 9 },
      "1": { "Settingupthegame": 7 },
      "2": { "Globalfunctions_General": 4 },
      "3": { "acintro4": 3 },
      "4": { "Dictionary": 2 },
      "5": { "acintro3": 1 }
    },
    "Two": {
      "0": { "UpgradeTo34": 1 }
    },
    "TwoClickHandler": {
      "0": { "TemplateBASS": 16 }
    },
    "twoPi": {
      "0": { "StringFormats": 4 }
    },
    "txt": {
      "0": { "File": 5 },
      "1": { "Pointers": 2 },
      "2": { "Templates": 1 }
    },
    "TXT": {
      "0": { "Templates": 2 },
      "1": { "AutonumberSpeechFiles": 1 }
    },
    "txtInput": {
      "0": { "TextBox": 2 }
    },
    "txtParser": {
      "0": { "Parser": 1 }
    },
    "txtParserInput": {
      "0": { "Parser": 2 }
    },
    "txtUserInput": {
      "0": { "TextBox": 4 },
      "1": { "TextParser": 2 },
      "2": { "ListBox": 1 }
    },
    "Type": {
      "0": { "AudioClip": 3 },
      "1": { "ScriptKeywords": 1 }
    },
    "TYPE": {
      "0": { "TextScriptEvents": 2 }
    },
    "type": {
      "0": { "ScriptKeywords": 18 },
      "1": { "Multimedia": 12 },
      "2": { "TextParser": 10 },
      "3": { "ScriptingTutorialPart1": 9 },
      "4": { "Settingupthegame": 8 },
      "5": { "UpgradingTo27": 5 },
      "6": { "Pointers": 4 },
      "7": { "Globalfunctions_Screen": 3 },
      "8": { "Region": 2 },
      "9": { "FAQ": 1 }
    },
    "typed": {
      "0": { "TextParser": 2 },
      "1": { "Pointers": 1 }
    },
    "Types": {
      "0": { "MusicAndSound": 4 },
      "1": { "StandardTypes": 2 },
      "2": { "StandardEnums": 1 }
    },
    "types": {
      "0": { "ScriptKeywords": 5 },
      "1": { "Pointers": 4 },
      "2": { "acintro3": 2 },
      "3": { "Templates": 1 }
    },
    "TYPES": {
      "0": { "CallingGlobalFunctions": 1 }
    },
    "typical": {
      "0": { "Tumbleweed": 1 }
    },
    "typically": {
      "0": { "Settingupthegame": 2 },
      "1": { "OOProgramming": 1 }
    },
    "typing": {
      "0": { "System": 1 }
    },
    "Tzach": {
      "0": { "Credits": 1 }
    },
    "UAC": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "uh": {
      "0": { "UpgradingTo27": 1 }
    },
    "UI": {
      "0": { "acintro1": 1 }
    },
    "uk": {
      "0": { "ContactingTheDevelopers": 2 }
    },
    "un-check": {
      "0": { "acintro1": 1 }
    },
    "un-filled": {
      "0": { "Settingupthegame": 1 }
    },
    "Un-indent": {
      "0": { "KeyboardShortcuts": 1 }
    },
    "un-installing": {
      "0": { "IntegrationWithWindows": 2 }
    },
    "un-readable": {
      "0": { "Settingupthegame": 1 }
    },
    "un-scaled": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "un-select": {
      "0": { "ListBox": 1 }
    },
    "un-tick": {
      "0": { "acintro8": 1 }
    },
    "un-ticked": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "unable": {
      "0": { "Speech": 1 }
    },
    "Unable": {
      "0": { "Game": 1 }
    },
    "unaltered": {
      "0": { "Globalfunctions_General": 1 }
    },
    "unassigned": {
      "0": { "Pointers": 1 }
    },
    "unavailable": {
      "0": { "Mouse": 1 }
    },
    "unblock": {
      "0": { "TroubleshootingWindowsZoneID": 5 }
    },
    "unchanged": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "uncheck": {
      "0": { "acintro8": 1 }
    },
    "unchecked": {
      "0": { "Setup": 1 }
    },
    "unclickable": {
      "0": { "Tumbleweed_door": 1 }
    },
    "uncompressed": {
      "0": { "MusicAndSound": 1 }
    },
    "unconditionally": {
      "0": { "System": 1 }
    },
    "undefined": {
      "0": { "Dictionary": 1 }
    },
    "under": {
      "0": { "Copyright": 3 },
      "1": { "SourceControl": 2 },
      "2": { "Region": 1 }
    },
    "Under": {
      "0": { "EditingGUIs": 1 }
    },
    "underflow": {
      "0": { "Maths": 1 }
    },
    "underneath": {
      "0": { "acintro2": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "underscore": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "understand": {
      "0": { "Speech": 1 }
    },
    "understanding": {
      "0": { "Pointers": 1 }
    },
    "Understanding": {
      "0": { "ScriptingLanguage": 1 }
    },
    "undo": {
      "0": { "Tumbleweed_player": 1 }
    },
    "Undo": {
      "0": { "acintro2": 1 }
    },
    "Undoes": {
      "0": { "Character": 1 }
    },
    "unfortunate": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "Unfortunately": {
      "0": { "acintro9": 1 }
    },
    "UnfreezePlayer": {
      "0": { "Tumbleweed_player": 4 }
    },
    "unhandled": {
      "0": { "TemplateVerbcoin": 3 },
      "1": { "Tumbleweed": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Unhandled": {
      "0": { "Tumbleweed": 5 },
      "1": { "Tumbleweed_unhandled": 4 },
      "2": { "Tumbleweed_door": 1 }
    },
    "Uniform": {
      "0": { "Character": 1 }
    },
    "uniform": {
      "0": { "Character": 2 }
    },
    "unique": {
      "0": { "Dictionary": 2 },
      "1": { "acintro3": 1 }
    },
    "UNIQUE": {
      "0": { "Game": 1 }
    },
    "uniqueness": {
      "0": { "Dictionary": 1 }
    },
    "units": {
      "0": { "DynamicSprite": 5 },
      "1": { "Character": 1 }
    },
    "unless": {
      "0": { "Character": 3 },
      "1": { "acintro1": 2 },
      "2": { "Speech": 1 }
    },
    "UNLESS": {
      "0": { "Copyright": 1 }
    },
    "Unlike": {
      "0": { "GUIControl": 1 }
    },
    "unlike": {
      "0": { "ScriptKeywords": 1 }
    },
    "unlikely": {
      "0": { "Character": 1 }
    },
    "unlimited": {
      "0": { "SystemLimits": 9 },
      "1": { "EditorView": 3 }
    },
    "unlisted": {
      "0": { "Lipsync": 1 }
    },
    "unloading": {
      "0": { "Character": 2 }
    },
    "unlock": {
      "0": { "Tumbleweed_door": 2 }
    },
    "unlocked": {
      "0": { "EditorRoom": 3 },
      "1": { "Tumbleweed_door": 1 }
    },
    "UnlockView": {
      "0": { "Character": 18 },
      "1": { "RepExec": 1 }
    },
    "unofficial": {
      "0": { "Lipsync": 1 }
    },
    "unpause": {
      "0": { "Globalfunctions_General": 3 }
    },
    "UnPauseGame": {
      "0": { "Globalfunctions_General": 8 },
      "1": { "System": 1 }
    },
    "unpauses": {
      "0": { "System": 1 }
    },
    "unpin": {
      "0": { "UpgradeTo33": 1 }
    },
    "unpredictable": {
      "0": { "Tumbleweed_extensions": 1 }
    },
    "Unrated": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "unreadable": {
      "0": { "Settingupthegame": 1 }
    },
    "unregister": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "unregistergame": {
      "0": { "IntegrationWithWindows": 3 }
    },
    "unsafe": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "unsorted": {
      "0": { "Dictionary": 3 }
    },
    "unsupported": {
      "0": { "DynamicSprite": 1 }
    },
    "until": {
      "0": { "Character": 14 },
      "1": { "Globalfunctions_General": 13 },
      "2": { "DynamicSprite": 7 },
      "3": { "Object": 5 },
      "4": { "ScriptKeywords": 2 },
      "5": { "Tumbleweed_movement": 1 }
    },
    "unusable": {
      "0": { "Object": 1 }
    },
    "unwalkable": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "unwieldy": {
      "0": { "ScriptModules": 1 }
    },
    "Up": {
      "0": { "Tumbleweed": 2 },
      "1": { "InvWindow": 1 }
    },
    "up": {
      "0": { "Settingupthegame": 22 },
      "1": { "Globalfunctions_General": 11 },
      "2": { "acintro2": 9 },
      "3": { "acintro7": 8 },
      "4": { "UpgradingTo27": 6 },
      "5": { "Lipsync": 5 },
      "6": { "acintro1": 4 },
      "7": { "Parser": 3 },
      "8": { "UpgradeTo32": 2 },
      "9": { "DateTime": 1 }
    },
    "up-left": {
      "0": { "Settingupthegame": 1 }
    },
    "up-right": {
      "0": { "Character": 1 }
    },
    "UpArrow": {
      "0": { "ASCIIcodes": 1 }
    },
    "update": {
      "0": { "UpgradeTo341": 4 },
      "1": { "EditorSprite": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "Update": {
      "0": { "DialogOptionsRenderingInfo": 4 },
      "1": { "Mouse": 3 },
      "2": { "Translations": 2 },
      "3": { "UpgradeTo34": 1 }
    },
    "UpdateActionBar": {
      "0": { "Tumbleweed_actions": 3 }
    },
    "updated": {
      "0": { "Character": 3 },
      "1": { "FAQ": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "UpdateInventory": {
      "0": { "Character": 3 },
      "1": { "Globalfunctions_General": 2 }
    },
    "UpdatePalette": {
      "0": { "Globalfunctions_Palette": 4 }
    },
    "updates": {
      "0": { "UpgradeTo34": 2 },
      "1": { "acintro2": 1 }
    },
    "Updates": {
      "0": { "Mouse": 1 }
    },
    "upgrade": {
      "0": { "UpgradeTo341": 2 },
      "1": { "UpgradeTo32": 1 }
    },
    "upgrading": {
      "0": { "UpgradeTo350": 1 }
    },
    "Upgrading": {
      "0": { "UpgradingFromPreviousVersion": 11 },
      "1": { "UpgradeTo335": 1 }
    },
    "upload": {
      "0": { "DrawingSurfaceFunctions": 2 }
    },
    "upon": {
      "0": { "UpgradeTo350": 1 }
    },
    "upper": {
      "0": { "Mouse": 1 }
    },
    "upper-left": {
      "0": { "Globalfunctions_Message": 1 }
    },
    "UpperCase": {
      "0": { "String": 4 }
    },
    "uppercased": {
      "0": { "String": 2 }
    },
    "upside": {
      "0": { "DynamicSprite": 1 }
    },
    "upside-down": {
      "0": { "Globalfunctions_Screen": 2 }
    },
    "upwards": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "Settingupthegame": 2 },
      "2": { "TemplateSierraStyle": 1 }
    },
    "URL": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "us": {
      "0": { "acintro2": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "usable": {
      "0": { "File": 1 }
    },
    "usage": {
      "0": { "AnonymousUsageInfo": 2 },
      "1": { "Tumbleweed_movement": 1 }
    },
    "Usage": {
      "0": { "Tumbleweed_player": 2 }
    },
    "USB": {
      "0": { "MusicAndSound": 2 },
      "1": { "TroubleshootingWindowsZoneID": 1 }
    },
    "USE": {
      "0": { "Tumbleweed": 2 }
    },
    "use": {
      "0": { "Settingupthegame": 56 },
      "1": { "Character": 45 },
      "2": { "Globalfunctions_General": 23 },
      "3": { "Object": 21 },
      "4": { "ScriptingTutorialPart1": 17 },
      "5": { "File": 16 },
      "6": { "DrawingSurfaceFunctions": 13 },
      "7": { "ScriptKeywords": 12 },
      "8": { "Tumbleweed": 11 },
      "9": { "Maths": 10 },
      "10": { "EventTypes": 9 },
      "11": { "acintro1": 8 },
      "12": { "acintro7": 7 },
      "13": { "ScriptingTutorialPart2": 6 },
      "14": { "Room": 5 },
      "15": { "StringFormats": 4 },
      "16": { "Scripting": 3 },
      "17": { "DynamicArrays": 2 },
      "18": { "Viewport": 1 }
    },
    "Use": {
      "0": { "Settingupthegame": 8 },
      "1": { "Character": 6 },
      "2": { "Object": 5 },
      "3": { "Mouse": 4 },
      "4": { "acintro9": 3 },
      "5": { "acintro5": 2 },
      "6": { "Overlay": 1 }
    },
    "use-extension": {
      "0": { "Tumbleweed": 3 },
      "1": { "Tumbleweed_extensions": 1 }
    },
    "use-inv": {
      "0": { "Settingupthegame": 1 }
    },
    "use-with": {
      "0": { "Tumbleweed": 1 }
    },
    "UseContinuousScaling": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "Used": {
      "0": { "StandardEnums": 30 },
      "1": { "Tumbleweed_extensions": 3 },
      "2": { "Tumbleweed_helper": 1 }
    },
    "used": {
      "0": { "Settingupthegame": 35 },
      "1": { "Character": 16 },
      "2": { "Globalfunctions_General": 9 },
      "3": { "Speech": 8 },
      "4": { "ScriptKeywords": 7 },
      "5": { "Gamevariables": 6 },
      "6": { "TemplateSierraStyle": 5 },
      "7": { "Lipsync": 4 },
      "8": { "UpgradingTo27": 3 },
      "9": { "DistGame": 2 },
      "10": { "Globalfunctions_Room": 1 }
    },
    "UsedAction": {
      "0": { "Tumbleweed": 6 },
      "1": { "Tumbleweed_actions": 3 },
      "2": { "Tumbleweed_unhandled": 1 }
    },
    "UseDefaultGraphic": {
      "0": { "Mouse": 3 }
    },
    "useful": {
      "0": { "Character": 19 },
      "1": { "Globalfunctions_General": 14 },
      "2": { "Mouse": 7 },
      "3": { "Globalfunctions_Room": 5 },
      "4": { "GUI": 4 },
      "5": { "Object": 3 },
      "6": { "EditorView": 2 },
      "7": { "Viewport": 1 }
    },
    "Useful": {
      "0": { "EditingGUIs": 2 },
      "1": { "Globalfunctions_General": 1 }
    },
    "UseGlobalSpeechAnimationDelay": {
      "0": { "Speech": 5 },
      "1": { "Character": 2 }
    },
    "UseHighResCoordinates": {
      "0": { "DrawingSurfaceFunctions": 7 },
      "1": { "DynamicSprite": 1 }
    },
    "UseInv": {
      "0": { "Tumbleweed": 2 }
    },
    "useless": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "UseModeGraphic": {
      "0": { "Mouse": 8 },
      "1": { "StandardEnums": 1 }
    },
    "UseNativeCoordinates": {
      "0": { "Game": 3 }
    },
    "User": {
      "0": { "Preprocessor": 1 }
    },
    "USER": {
      "0": { "DistGame": 1 }
    },
    "user": {
      "0": { "Globalfunctions_General": 9 },
      "1": { "Game": 5 },
      "2": { "Templates": 4 },
      "3": { "EditingGUIs": 3 },
      "4": { "ScriptKeywords": 2 },
      "5": { "Settingupthegame": 1 }
    },
    "user's": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "Preprocessor": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "user-created": {
      "0": { "MusicAndSound": 1 }
    },
    "user-defined": {
      "0": { "ScriptKeywords": 1 }
    },
    "user-friendly": {
      "0": { "CustomProperties": 1 }
    },
    "user-made": {
      "0": { "Copyright": 1 }
    },
    "user-selectable": {
      "0": { "acintro9": 1 }
    },
    "user-written": {
      "0": { "Plugins": 1 }
    },
    "Usermode": {
      "0": { "Tumbleweed": 1 }
    },
    "Username": {
      "0": { "Setup": 1 }
    },
    "UseRoomAreaLighting": {
      "0": { "Settingupthegame": 1 }
    },
    "UseRoomAreaScaling": {
      "0": { "AdvancedRoomFeatures": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "users": {
      "0": { "UpgradeTo350": 3 },
      "1": { "ScriptKeywords": 1 }
    },
    "Users": {
      "0": { "TroubleshootingWindowsZoneID": 2 },
      "1": { "Setup": 1 }
    },
    "uses": {
      "0": { "Character": 5 },
      "1": { "Credits": 4 },
      "2": { "Copyright": 3 },
      "3": { "UpgradingTo27": 2 },
      "4": { "Region": 1 }
    },
    "using": {
      "0": { "Character": 25 },
      "1": { "Settingupthegame": 24 },
      "2": { "Globalfunctions_General": 14 },
      "3": { "ScriptKeywords": 12 },
      "4": { "DrawingSurfaceFunctions": 11 },
      "5": { "ScriptingTutorialPart2": 6 },
      "6": { "OOProgramming": 5 },
      "7": { "UpgradeTo32": 4 },
      "8": { "ContactingTheDevelopers": 3 },
      "9": { "UpgradeTo34": 2 },
      "10": { "Viewport": 1 }
    },
    "Using": {
      "0": { "OOProgramming": 4 },
      "1": { "MusicAndSound": 2 },
      "2": { "Tumbleweed_player": 1 }
    },
    "usual": {
      "0": { "Game": 5 },
      "1": { "Mouse": 3 },
      "2": { "GUIControl": 2 },
      "3": { "Globalfunctions_Message": 1 }
    },
    "Usually": {
      "0": { "Character": 3 },
      "1": { "EditorInventoryItems": 2 },
      "2": { "TroubleshootingWindowsZoneID": 1 }
    },
    "usually": {
      "0": { "TroubleshootingWindowsZoneID": 3 },
      "1": { "InvWindow": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "utilities": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "utility": {
      "0": { "Settingupthegame": 2 }
    },
    "utilize": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "valid": {
      "0": { "Game": 2 },
      "1": { "Pointers": 1 }
    },
    "Valid": {
      "0": { "Overlay": 6 },
      "1": { "Game": 3 },
      "2": { "Speech": 1 }
    },
    "VALUE": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "File": 2 },
      "2": { "StandardEnums": 1 }
    },
    "value": {
      "0": { "ScriptingTutorialPart1": 31 },
      "1": { "Globalfunctions_General": 24 },
      "2": { "Character": 21 },
      "3": { "Maths": 19 },
      "4": { "Object": 16 },
      "5": { "Slider": 12 },
      "6": { "Hotspot": 10 },
      "7": { "String": 9 },
      "8": { "Room": 8 },
      "9": { "TemplateBASS": 7 },
      "10": { "Region": 6 },
      "11": { "ExtenderFunctions": 5 },
      "12": { "Globalfunctions_Message": 4 },
      "13": { "StringFormats": 3 },
      "14": { "Viewport": 2 },
      "15": { "AdvancedRoomFeatures": 1 }
    },
    "Value": {
      "0": { "Slider": 7 },
      "1": { "Character": 2 },
      "2": { "Mouse": 1 }
    },
    "Values": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "values": {
      "0": { "Globalfunctions_General": 9 },
      "1": { "ScriptingTutorialPart1": 8 },
      "2": { "Character": 6 },
      "3": { "ScriptKeywords": 5 },
      "4": { "Region": 4 },
      "5": { "Gamevariables": 3 },
      "6": { "Mouse": 2 },
      "7": { "UpgradeTo341": 1 }
    },
    "Vandepoele": {
      "0": { "Credits": 1 }
    },
    "variable": {
      "0": { "ScriptKeywords": 33 },
      "1": { "ScriptingTutorialPart1": 22 },
      "2": { "Maths": 15 },
      "3": { "DynamicSprite": 14 },
      "4": { "GlobalVariables": 12 },
      "5": { "Globalfunctions_General": 10 },
      "6": { "Pointers": 6 },
      "7": { "Tumbleweed": 5 },
      "8": { "StandardEnums": 3 },
      "9": { "MusicAndSound": 2 },
      "10": { "Gamevariables": 1 }
    },
    "VARIABLE": {
      "0": { "Globalfunctions_General": 2 }
    },
    "Variable": {
      "0": { "MusicAndSound": 1 }
    },
    "variable's": {
      "0": { "StringFormats": 1 }
    },
    "VariableExtensions": {
      "0": { "Tumbleweed_extensions": 3 },
      "1": { "Tumbleweed_door": 2 }
    },
    "Variables": {
      "0": { "GlobalVariables": 6 },
      "1": { "UpgradeTo30": 1 }
    },
    "variables": {
      "0": { "ScriptKeywords": 16 },
      "1": { "Globalfunctions_General": 10 },
      "2": { "StringFormats": 9 },
      "3": { "Pointers": 5 },
      "4": { "Mouse": 4 },
      "5": { "Game": 3 },
      "6": { "Overlay": 2 },
      "7": { "OtherFeatures": 1 }
    },
    "variant": {
      "0": { "UpgradeTo34": 1 }
    },
    "variants": {
      "0": { "UpgradeTo34": 1 }
    },
    "varies": {
      "0": { "ScriptKeywords": 1 }
    },
    "Various": {
      "0": { "Pointers": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "various": {
      "0": { "acintro1": 4 },
      "1": { "CustomProperties": 3 },
      "2": { "DynamicSprite": 2 },
      "3": { "SystemLimits": 1 }
    },
    "vary": {
      "0": { "acintro1": 1 }
    },
    "varying": {
      "0": { "Character": 1 }
    },
    "vast": {
      "0": { "Character": 1 }
    },
    "vastly": {
      "0": { "GlobalVariables": 1 }
    },
    "vector": {
      "0": { "Settingupthegame": 1 }
    },
    "Vega": {
      "0": { "Credits": 1 }
    },
    "verb": {
      "0": { "Tumbleweed_actions": 6 },
      "1": { "Tumbleweed": 4 },
      "2": { "Tumbleweed_helper": 3 },
      "3": { "Tumbleweed_extensions": 2 },
      "4": { "acintro4": 1 }
    },
    "Verb": {
      "0": { "Credits": 1 }
    },
    "verb-button": {
      "0": { "Tumbleweed": 2 }
    },
    "verb-coin": {
      "0": { "InventoryItem": 1 }
    },
    "VerbCoin": {
      "0": { "TemplateVerbcoin": 62 }
    },
    "Verbcoin": {
      "0": { "Templates": 1 }
    },
    "VerbCoinPosition": {
      "0": { "TemplateVerbcoin": 1 }
    },
    "VerbGuiOptions": {
      "0": { "Tumbleweed": 1 }
    },
    "verbs": {
      "0": { "Tumbleweed_translation": 1 }
    },
    "Verbs": {
      "0": { "Tumbleweed_movement": 59 },
      "1": { "Tumbleweed_helper": 37 },
      "2": { "Tumbleweed_actions": 27 },
      "3": { "Tumbleweed_door": 20 },
      "4": { "Tumbleweed_extensions": 19 },
      "5": { "Tumbleweed": 13 },
      "6": { "Tumbleweed_player": 12 },
      "7": { "Tumbleweed_unhandled": 4 }
    },
    "verbtext": {
      "0": { "TemplateVerbcoin": 2 }
    },
    "Verisign": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "versa": {
      "0": { "UpgradeTo31": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "version": {
      "0": { "System": 8 },
      "1": { "Preprocessor": 7 },
      "2": { "Settingupthegame": 5 },
      "3": { "Globalfunctions_General": 4 },
      "4": { "ScriptKeywords": 3 },
      "5": { "GraphicsDriver": 2 },
      "6": { "TemplateBASS": 1 }
    },
    "Version": {
      "0": { "System": 3 },
      "1": { "Preprocessor": 2 },
      "2": { "ScriptKeywords": 1 }
    },
    "versions": {
      "0": { "Character": 30 },
      "1": { "Game": 15 },
      "2": { "Object": 13 },
      "3": { "AudioChannel": 12 },
      "4": { "System": 10 },
      "5": { "AudioClip": 8 },
      "6": { "GUI": 7 },
      "7": { "Globalfunctions_General": 6 },
      "8": { "Mouse": 5 },
      "9": { "File": 4 },
      "10": { "Slider": 3 },
      "11": { "Region": 2 },
      "12": { "Screen": 1 }
    },
    "vertical": {
      "0": { "EditingGUIs": 4 },
      "1": { "Settingupthegame": 2 },
      "2": { "Character": 1 }
    },
    "Vertical": {
      "0": { "System": 1 }
    },
    "vertical-flip": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "VerticalOffset": {
      "0": { "Settingupthegame": 1 }
    },
    "very": {
      "0": { "Globalfunctions_General": 5 },
      "1": { "ScriptKeywords": 4 },
      "2": { "ScriptingTutorialPart1": 3 },
      "3": { "Game": 2 },
      "4": { "Hotspot": 1 }
    },
    "Very": {
      "0": { "EditorView": 1 }
    },
    "via": {
      "0": { "Tumbleweed": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "vice": {
      "0": { "UpgradeTo31": 2 },
      "1": { "Settingupthegame": 1 }
    },
    "vice-versa": {
      "0": { "UpgradeTo350": 2 },
      "1": { "System": 1 }
    },
    "Video": {
      "0": { "acintro": 1 }
    },
    "video": {
      "0": { "Multimedia": 13 },
      "1": { "DrawingSurfaceFunctions": 2 },
      "2": { "SystemRequirements": 1 }
    },
    "videos": {
      "0": { "Multimedia": 3 },
      "1": { "acintro": 1 }
    },
    "VideoSkipStyle": {
      "0": { "Multimedia": 2 },
      "1": { "StandardEnums": 1 }
    },
    "View": {
      "0": { "Character": 9 },
      "1": { "ViewFrame": 7 },
      "2": { "Button": 6 },
      "3": { "Object": 5 },
      "4": { "EditorView": 4 },
      "5": { "acintro7": 2 },
      "6": { "Globalfunctions_Room": 1 }
    },
    "view": {
      "0": { "Character": 76 },
      "1": { "Settingupthegame": 27 },
      "2": { "Object": 20 },
      "3": { "Game": 14 },
      "4": { "ViewFrame": 7 },
      "5": { "EditorView": 6 },
      "6": { "acintro7": 5 },
      "7": { "FAQ": 2 },
      "8": { "SystemLimits": 1 }
    },
    "VIEW": {
      "0": { "Character": 5 },
      "1": { "Object": 2 },
      "2": { "UpgradeTo30": 1 }
    },
    "ViewCount": {
      "0": { "Game": 4 }
    },
    "viewed": {
      "0": { "Settingupthegame": 1 }
    },
    "viewer": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "Viewer": {
      "0": { "acintro9": 1 }
    },
    "ViewFrame": {
      "0": { "ViewFrame": 29 },
      "1": { "Game": 5 },
      "2": { "Scripting": 1 }
    },
    "viewport": {
      "0": { "Viewport": 27 },
      "1": { "Screen": 16 },
      "2": { "UpgradeTo350": 15 },
      "3": { "Camera": 8 },
      "4": { "System": 6 },
      "5": { "Globalfunctions_General": 2 },
      "6": { "Room": 1 }
    },
    "Viewport": {
      "0": { "Viewport": 58 },
      "1": { "Screen": 20 },
      "2": { "UpgradeTo350": 12 },
      "3": { "System": 10 },
      "4": { "Camera": 3 },
      "5": { "Game": 2 }
    },
    "viewport's": {
      "0": { "Viewport": 11 },
      "1": { "Screen": 2 },
      "2": { "UpgradeTo350": 1 }
    },
    "Viewport's": {
      "0": { "UpgradeTo350": 2 }
    },
    "viewport-camera": {
      "0": { "UpgradeTo350": 1 }
    },
    "ViewportCount": {
      "0": { "Screen": 4 }
    },
    "ViewportHeight": {
      "0": { "System": 2 },
      "1": { "Screen": 1 }
    },
    "viewports": {
      "0": { "Viewport": 8 },
      "1": { "Screen": 6 },
      "2": { "Camera": 2 }
    },
    "Viewports": {
      "0": { "Viewport": 7 },
      "1": { "Screen": 5 },
      "2": { "UpgradeTo350": 1 }
    },
    "ViewportWidth": {
      "0": { "System": 2 },
      "1": { "Screen": 1 }
    },
    "views": {
      "0": { "Game": 4 },
      "1": { "SystemLimits": 1 }
    },
    "Views": {
      "0": { "acintro7": 4 },
      "1": { "Settingupthegame": 2 },
      "2": { "acintro": 1 }
    },
    "VIEWS": {
      "0": { "UpgradeTo30": 1 }
    },
    "violent": {
      "0": { "TextParser": 1 }
    },
    "virtual": {
      "0": { "DrawingSurfaceFunctions": 2 },
      "1": { "ScriptKeywords": 1 }
    },
    "virtually": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "Visibility": {
      "0": { "EditingGUIs": 1 }
    },
    "visibility": {
      "0": { "UpgradeTo350": 2 },
      "1": { "GUI": 1 }
    },
    "Visible": {
      "0": { "GUI": 11 },
      "1": { "GUIControl": 6 },
      "2": { "Mouse": 5 },
      "3": { "Object": 4 },
      "4": { "Globalfunctions_General": 3 },
      "5": { "InvWindow": 2 },
      "6": { "Globalfunctions_Room": 1 }
    },
    "visible": {
      "0": { "Mouse": 3 },
      "1": { "GUI": 2 },
      "2": { "GUIControl": 1 }
    },
    "visibly": {
      "0": { "Settingupthegame": 1 }
    },
    "visited": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "Vista": {
      "0": { "IntegrationWithWindows": 5 },
      "1": { "SystemRequirements": 1 }
    },
    "Visual": {
      "0": { "SystemRequirements": 2 },
      "1": { "SourceControl": 1 }
    },
    "visual": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "visually": {
      "0": { "Settingupthegame": 1 }
    },
    "visuals": {
      "0": { "GraphicsDriver": 1 }
    },
    "vital": {
      "0": { "acintro8": 2 },
      "1": { "acintro3": 1 }
    },
    "VOC": {
      "0": { "AudioChannel": 2 },
      "1": { "MusicAndSound": 1 }
    },
    "vocabulary": {
      "0": { "Parser": 1 }
    },
    "voice": {
      "0": { "Speech": 10 },
      "1": { "MusicAndSound": 5 },
      "2": { "Gamevariables": 4 },
      "3": { "Lipsync": 3 },
      "4": { "UpgradeTo341": 2 },
      "5": { "UpgradeTo32": 1 }
    },
    "Voice": {
      "0": { "MusicAndSound": 2 }
    },
    "Voice-based": {
      "0": { "Lipsync": 1 }
    },
    "voice-over": {
      "0": { "UpgradeTo341": 1 }
    },
    "VoiceMode": {
      "0": { "Speech": 4 },
      "1": { "MusicAndSound": 1 }
    },
    "void": {
      "0": { "OOProgramming": 10 },
      "1": { "Tumbleweed_actions": 8 },
      "2": { "Tumbleweed_helper": 5 },
      "3": { "Tumbleweed_extensions": 4 },
      "4": { "Camera": 3 },
      "5": { "Tumbleweed_movement": 2 },
      "6": { "ScriptKeywords": 1 }
    },
    "VOLUME": {
      "0": { "Multimedia": 2 }
    },
    "volume": {
      "0": { "Multimedia": 16 },
      "1": { "AudioChannel": 15 },
      "2": { "MusicAndSound": 9 },
      "3": { "System": 6 },
      "4": { "UpgradeTo32": 5 },
      "5": { "Character": 4 },
      "6": { "Settingupthegame": 2 },
      "7": { "Slider": 1 }
    },
    "Volume": {
      "0": { "AudioChannel": 7 },
      "1": { "System": 5 },
      "2": { "Multimedia": 3 },
      "3": { "UpgradeTo32": 2 },
      "4": { "Slider": 1 }
    },
    "volumeReduction": {
      "0": { "Multimedia": 1 }
    },
    "VolumeReductionWhenSpeechPlaying": {
      "0": { "MusicAndSound": 1 }
    },
    "VolumeReductionWhileSpeechPlaying": {
      "0": { "Multimedia": 1 }
    },
    "volumes": {
      "0": { "MusicAndSound": 1 }
    },
    "Vorbis": {
      "0": { "Copyright": 2 },
      "1": { "Credits": 1 }
    },
    "vorbis": {
      "0": { "MusicAndSound": 1 }
    },
    "vox": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Game": 1 }
    },
    "VOX": {
      "0": { "DistGame": 3 },
      "1": { "MusicAndSound": 1 }
    },
    "vpod": {
      "0": { "Tumbleweed_player": 1 }
    },
    "vRogerWalking": {
      "0": { "FAQ": 1 }
    },
    "VSync": {
      "0": { "System": 3 },
      "1": { "Globalfunctions_General": 1 }
    },
    "vsync": {
      "0": { "System": 2 }
    },
    "vXXX": {
      "0": { "ScriptKeywords": 2 }
    },
    "wait": {
      "0": { "Character": 7 },
      "1": { "Globalfunctions_General": 6 },
      "2": { "Object": 3 },
      "3": { "Mouse": 2 },
      "4": { "Multimedia": 1 }
    },
    "Wait": {
      "0": { "Character": 10 },
      "1": { "Globalfunctions_General": 8 },
      "2": { "ScriptKeywords": 6 },
      "3": { "Object": 4 },
      "4": { "Mouse": 3 },
      "5": { "Globalfunctions_Screen": 2 },
      "6": { "Button": 1 }
    },
    "waiting": {
      "0": { "acintro1": 1 }
    },
    "WaitKey": {
      "0": { "Globalfunctions_General": 5 }
    },
    "WaitMouseKey": {
      "0": { "Globalfunctions_General": 5 }
    },
    "waits": {
      "0": { "Character": 6 },
      "1": { "UpgradeTo30": 2 },
      "2": { "AudioClip": 1 }
    },
    "WALK": {
      "0": { "Mouse": 1 }
    },
    "walk": {
      "0": { "Character": 7 },
      "1": { "acintro2": 5 },
      "2": { "acintro3": 4 },
      "3": { "Globalfunctions_Room": 3 },
      "4": { "Globalfunctions_General": 2 },
      "5": { "Tumbleweed_movement": 1 }
    },
    "Walk": {
      "0": { "Character": 24 },
      "1": { "Globalfunctions_General": 9 },
      "2": { "Settingupthegame": 6 },
      "3": { "EventTypes": 5 },
      "4": { "RepExec": 4 },
      "5": { "Hotspot": 2 },
      "6": { "Mouse": 1 }
    },
    "Walk-behind": {
      "0": { "acintro2": 2 }
    },
    "walk-behind": {
      "0": { "acintro2": 9 },
      "1": { "Character": 2 },
      "2": { "acintro3": 1 }
    },
    "walk-behinds": {
      "0": { "UpgradeTo350": 3 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "Walk-behinds": {
      "0": { "acintro2": 1 }
    },
    "Walk-to": {
      "0": { "acintro3": 2 }
    },
    "walk-to": {
      "0": { "Hotspot": 6 },
      "1": { "acintro3": 3 },
      "2": { "Globalfunctions_General": 2 },
      "3": { "Settingupthegame": 1 }
    },
    "Walkable": {
      "0": { "acintro2": 3 },
      "1": { "AdvancedRoomFeatures": 1 }
    },
    "walkable": {
      "0": { "Character": 19 },
      "1": { "Globalfunctions_Room": 17 },
      "2": { "acintro2": 10 },
      "3": { "AdvancedRoomFeatures": 9 },
      "4": { "Object": 8 },
      "5": { "UpgradeTo350": 5 },
      "6": { "Settingupthegame": 3 },
      "7": { "FAQ": 2 },
      "8": { "Globalfunctions_General": 1 }
    },
    "walkable-area": {
      "0": { "AdvancedRoomFeatures": 1 }
    },
    "walkbehind": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "walkbehinds": {
      "0": { "EditorRoom": 1 }
    },
    "walkcycles": {
      "0": { "EditorView": 3 }
    },
    "walked": {
      "0": { "Object": 3 },
      "1": { "Character": 1 }
    },
    "Walker": {
      "0": { "Credits": 1 }
    },
    "WALKING": {
      "0": { "ViewFrame": 8 }
    },
    "walking": {
      "0": { "Character": 40 },
      "1": { "Settingupthegame": 19 },
      "2": { "acintro7": 7 },
      "3": { "EditorView": 6 },
      "4": { "Tumbleweed": 4 },
      "5": { "Globalfunctions_General": 3 },
      "6": { "acintro2": 2 },
      "7": { "RepExec": 1 }
    },
    "WalkOffScreen": {
      "0": { "Tumbleweed_movement": 4 }
    },
    "WALKONLOOK": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Walks": {
      "0": { "acintro3": 2 }
    },
    "walks": {
      "0": { "EventTypes": 6 },
      "1": { "Region": 4 },
      "2": { "AdvancedRoomFeatures": 3 },
      "3": { "Settingupthegame": 2 },
      "4": { "AudioChannel": 1 }
    },
    "WalkSpeedX": {
      "0": { "Character": 5 }
    },
    "WalkSpeedY": {
      "0": { "Character": 5 }
    },
    "WalkStraight": {
      "0": { "Character": 3 },
      "1": { "StandardEnums": 1 }
    },
    "WalkTo": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "walkto": {
      "0": { "Gamevariables": 1 }
    },
    "WalkToX": {
      "0": { "Hotspot": 5 },
      "1": { "Globalfunctions_General": 1 }
    },
    "WalkToY": {
      "0": { "Hotspot": 5 },
      "1": { "Globalfunctions_General": 1 }
    },
    "walkway": {
      "0": { "acintro4": 1 }
    },
    "walkWhere": {
      "0": { "Character": 2 }
    },
    "WalkWhere": {
      "0": { "Object": 3 },
      "1": { "Character": 2 },
      "2": { "Tumbleweed_movement": 1 }
    },
    "wall": {
      "0": { "TextParser": 7 },
      "1": { "Object": 3 },
      "2": { "acintro2": 1 }
    },
    "wander": {
      "0": { "Character": 2 }
    },
    "Wang": {
      "0": { "Credits": 1 }
    },
    "want": {
      "0": { "Settingupthegame": 29 },
      "1": { "Character": 19 },
      "2": { "Globalfunctions_General": 15 },
      "3": { "ScriptingTutorialPart1": 10 },
      "4": { "ScriptingTutorialPart2": 9 },
      "5": { "acintro4": 8 },
      "6": { "acintro1": 7 },
      "7": { "acintro2": 6 },
      "8": { "acintro6": 5 },
      "9": { "UpgradeTo30": 4 },
      "10": { "GUIControl": 3 },
      "11": { "DynamicArrays": 2 },
      "12": { "Viewport": 1 }
    },
    "wanted": {
      "0": { "Pointers": 5 },
      "1": { "ScriptKeywords": 3 },
      "2": { "ExtenderFunctions": 1 }
    },
    "wants": {
      "0": { "Globalfunctions_Room": 1 }
    },
    "wares": {
      "0": { "acintro8": 3 }
    },
    "warn": {
      "0": { "System": 2 }
    },
    "warning": {
      "0": { "acintro1": 1 }
    },
    "WARNING": {
      "0": { "Speech": 1 }
    },
    "WARRANTY": {
      "0": { "Copyright": 2 }
    },
    "wasAdded": {
      "0": { "Set": 2 }
    },
    "wasn't": {
      "0": { "acintro9": 1 }
    },
    "watch": {
      "0": { "Tumbleweed": 3 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "watch-example": {
      "0": { "Tumbleweed": 1 }
    },
    "watched": {
      "0": { "Globalfunctions_General": 1 }
    },
    "watching": {
      "0": { "Character": 1 }
    },
    "water": {
      "0": { "InventoryItem": 1 }
    },
    "WAV": {
      "0": { "MusicAndSound": 4 },
      "1": { "AudioChannel": 3 },
      "2": { "Lipsync": 2 },
      "3": { "Settingupthegame": 1 }
    },
    "wav": {
      "0": { "File": 1 }
    },
    "waveform": {
      "0": { "Lipsync": 3 }
    },
    "waving": {
      "0": { "acintro7": 1 }
    },
    "way": {
      "0": { "Settingupthegame": 10 },
      "1": { "acintro2": 6 },
      "2": { "ScriptKeywords": 5 },
      "3": { "EditingGUIs": 4 },
      "4": { "AdvancedRoomFeatures": 3 },
      "5": { "EditorView": 2 },
      "6": { "SystemLimits": 1 }
    },
    "ways": {
      "0": { "Settingupthegame": 3 },
      "1": { "Debuggingfeatures": 2 },
      "2": { "GlobalVariables": 1 }
    },
    "we": {
      "0": { "ScriptingTutorialPart1": 18 },
      "1": { "acintro8": 14 },
      "2": { "acintro4": 13 },
      "3": { "acintro7": 12 },
      "4": { "acintro2": 9 },
      "5": { "acintro1": 7 },
      "6": { "acintro3": 6 },
      "7": { "RepExec": 5 },
      "8": { "acintro5": 4 },
      "9": { "ScriptKeywords": 2 },
      "10": { "Game": 1 }
    },
    "We": {
      "0": { "acintro4": 3 },
      "1": { "acintro5": 2 },
      "2": { "ContactingTheDevelopers": 1 }
    },
    "We'd": {
      "0": { "acintro8": 1 }
    },
    "we'll": {
      "0": { "acintro2": 2 },
      "1": { "acintro5": 1 }
    },
    "We'll": {
      "0": { "acintro8": 1 }
    },
    "we're": {
      "0": { "acintro8": 3 },
      "1": { "ScriptingTutorialPart1": 2 },
      "2": { "acintro1": 1 }
    },
    "We're": {
      "0": { "acintro2": 1 }
    },
    "We've": {
      "0": { "acintro7": 1 }
    },
    "we've": {
      "0": { "acintro2": 4 },
      "1": { "acintro8": 3 },
      "2": { "acintro4": 2 },
      "3": { "acintro1": 1 }
    },
    "Weapon": {
      "0": { "OOProgramming": 11 },
      "1": { "ScriptKeywords": 6 }
    },
    "Weapons": {
      "0": { "OOProgramming": 1 }
    },
    "weapons": {
      "0": { "ScriptKeywords": 8 }
    },
    "wearing": {
      "0": { "Character": 1 }
    },
    "web": {
      "0": { "TroubleshootingWindowsZoneID": 1 }
    },
    "website": {
      "0": { "AnonymousUsageInfo": 3 },
      "1": { "ContactingTheDevelopers": 2 },
      "2": { "acintro9": 1 }
    },
    "Website": {
      "0": { "IntegrationWithWindows": 1 }
    },
    "Weight": {
      "0": { "InventoryItem": 1 }
    },
    "weight": {
      "0": { "InventoryItem": 1 }
    },
    "weighted": {
      "0": { "acintro1": 1 }
    },
    "Welcome": {
      "0": { "acintro1": 1 }
    },
    "well": {
      "0": { "Settingupthegame": 3 },
      "1": { "UpgradingTo27": 2 },
      "2": { "UpgradeTo32": 1 }
    },
    "Well": {
      "0": { "MusicAndSound": 4 },
      "1": { "Pointers": 2 },
      "2": { "ScriptingTutorialPart2": 1 }
    },
    "went": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "were": {
      "0": { "UpgradeTo350": 6 },
      "1": { "Settingupthegame": 5 },
      "2": { "UpgradeTo341": 3 },
      "3": { "acintro5": 2 },
      "4": { "Region": 1 }
    },
    "weren't": {
      "0": { "File": 1 }
    },
    "WFN": {
      "0": { "UpgradeTo34": 2 },
      "1": { "BackingUpYourGame": 1 }
    },
    "WHAT": {
      "0": { "TextScriptEvents": 2 }
    },
    "what": {
      "0": { "Settingupthegame": 10 },
      "1": { "ScriptingTutorialPart1": 9 },
      "2": { "Globalfunctions_General": 8 },
      "3": { "acintro1": 7 },
      "4": { "Pointers": 6 },
      "5": { "Mouse": 4 },
      "6": { "ScriptKeywords": 3 },
      "7": { "UpgradeTo350": 2 },
      "8": { "Maths": 1 }
    },
    "What": {
      "0": { "AudioChannel": 2 },
      "1": { "acintro8": 1 }
    },
    "What's": {
      "0": { "Pointers": 1 }
    },
    "what's": {
      "0": { "UpgradeTo32": 2 },
      "1": { "acintro1": 1 }
    },
    "whatever": {
      "0": { "Dialog": 5 },
      "1": { "Game": 3 },
      "2": { "GUIControl": 2 },
      "3": { "Screen": 1 }
    },
    "Whatever": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "WHATSOEVER": {
      "0": { "Copyright": 2 }
    },
    "wheel": {
      "0": { "Settingupthegame": 3 },
      "1": { "TextScriptEvents": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "wheels": {
      "0": { "Settingupthegame": 1 }
    },
    "When": {
      "0": { "Settingupthegame": 12 },
      "1": { "Globalfunctions_General": 5 },
      "2": { "EditorView": 4 },
      "3": { "ScriptingTutorialPart1": 3 },
      "4": { "TemplateBASS": 2 },
      "5": { "Pointers": 1 }
    },
    "when": {
      "0": { "Settingupthegame": 47 },
      "1": { "Character": 26 },
      "2": { "Globalfunctions_General": 16 },
      "3": { "ScriptKeywords": 13 },
      "4": { "TextScriptEvents": 10 },
      "5": { "acintro8": 9 },
      "6": { "Mouse": 8 },
      "7": { "File": 7 },
      "8": { "acintro7": 6 },
      "9": { "Room": 5 },
      "10": { "acintro1": 4 },
      "11": { "Translations": 3 },
      "12": { "UpgradingTo27": 2 },
      "13": { "Scripting": 1 }
    },
    "Whenever": {
      "0": { "acintro6": 1 }
    },
    "whenever": {
      "0": { "Settingupthegame": 3 },
      "1": { "Character": 2 },
      "2": { "TheScriptHeader": 1 }
    },
    "WHENGUIDISABLED": {
      "0": { "Globalfunctions_General": 1 }
    },
    "where": {
      "0": { "Settingupthegame": 24 },
      "1": { "Globalfunctions_General": 11 },
      "2": { "acintro2": 9 },
      "3": { "Character": 6 },
      "4": { "Mouse": 5 },
      "5": { "MusicAndSound": 4 },
      "6": { "CustomProperties": 3 },
      "7": { "UpgradeTo32": 2 },
      "8": { "Debuggingfeatures": 1 }
    },
    "Where": {
      "0": { "acintro9": 1 }
    },
    "whereas": {
      "0": { "Tumbleweed_player": 1 }
    },
    "whereby": {
      "0": { "MusicAndSound": 1 }
    },
    "wherever": {
      "0": { "Character": 1 }
    },
    "Wherever": {
      "0": { "FAQ": 1 }
    },
    "whether": {
      "0": { "Character": 26 },
      "1": { "Settingupthegame": 23 },
      "2": { "System": 9 },
      "3": { "Game": 8 },
      "4": { "Globalfunctions_General": 7 },
      "5": { "Object": 6 },
      "6": { "GUI": 5 },
      "7": { "Globalfunctions_Room": 4 },
      "8": { "Mouse": 3 },
      "9": { "InvWindow": 2 },
      "10": { "Region": 1 }
    },
    "Whether": {
      "0": { "GUIControl": 1 }
    },
    "WHETHER": {
      "0": { "Copyright": 1 }
    },
    "Which": {
      "0": { "SourceControl": 2 },
      "1": { "UpgradingTo27": 1 }
    },
    "which": {
      "0": { "Character": 104 },
      "1": { "Settingupthegame": 53 },
      "2": { "Object": 46 },
      "3": { "Game": 32 },
      "4": { "File": 28 },
      "5": { "ListBox": 23 },
      "6": { "Mouse": 20 },
      "7": { "DrawingSurfaceFunctions": 19 },
      "8": { "Button": 18 },
      "9": { "String": 17 },
      "10": { "AudioChannel": 15 },
      "11": { "InventoryItem": 14 },
      "12": { "Speech": 13 },
      "13": { "EditingGUIs": 12 },
      "14": { "acintro7": 11 },
      "15": { "TextScriptEvents": 10 },
      "16": { "Room": 9 },
      "17": { "InvWindow": 8 },
      "18": { "Gamevariables": 7 },
      "19": { "TextBox": 6 },
      "20": { "acintro2": 5 },
      "21": { "UpgradingTo27": 4 },
      "22": { "acintro1": 3 },
      "23": { "ContactingTheDevelopers": 2 },
      "24": { "Scripting": 1 }
    },
    "whichever": {
      "0": { "EventTypes": 1 }
    },
    "While": {
      "0": { "GUIControl": 2 },
      "1": { "Globalfunctions_Message": 1 }
    },
    "while": {
      "0": { "Character": 22 },
      "1": { "ScriptKeywords": 13 },
      "2": { "EventTypes": 12 },
      "3": { "Settingupthegame": 9 },
      "4": { "Object": 6 },
      "5": { "ScriptingTutorialPart2": 5 },
      "6": { "UpgradeTo34": 4 },
      "7": { "File": 3 },
      "8": { "Mouse": 2 },
      "9": { "acintro3": 1 }
    },
    "whilst": {
      "0": { "Character": 4 }
    },
    "white": {
      "0": { "Globalfunctions_General": 1 }
    },
    "Who": {
      "0": { "acintro8": 1 }
    },
    "who": {
      "0": { "Pointers": 2 },
      "1": { "Globalfunctions_Message": 1 }
    },
    "whole": {
      "0": { "EditorView": 2 },
      "1": { "Setup": 1 }
    },
    "Whole": {
      "0": { "acintro6": 1 }
    },
    "Whole-Screen": {
      "0": { "Character": 1 }
    },
    "whose": {
      "0": { "Mouse": 1 }
    },
    "WHY": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "why": {
      "0": { "System": 2 },
      "1": { "BlockingScripts": 1 }
    },
    "Why": {
      "0": { "UpgradeTo31": 2 },
      "1": { "UpgradeTo32": 1 }
    },
    "wide": {
      "0": { "Character": 2 },
      "1": { "GUIControl": 1 }
    },
    "wider": {
      "0": { "Character": 1 }
    },
    "widescreen": {
      "0": { "System": 1 }
    },
    "WIDTH": {
      "0": { "DynamicSprite": 4 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "GUIControl": 1 }
    },
    "width": {
      "0": { "DynamicSprite": 21 },
      "1": { "Gamevariables": 9 },
      "2": { "DrawingSurfaceFunctions": 8 },
      "3": { "Globalfunctions_General": 7 },
      "4": { "Object": 5 },
      "5": { "Overlay": 4 },
      "6": { "Globalfunctions_Message": 3 },
      "7": { "DialogOptionsRenderingInfo": 2 },
      "8": { "Screen": 1 }
    },
    "Width": {
      "0": { "DynamicSprite": 15 },
      "1": { "DialogOptionsRenderingInfo": 14 },
      "2": { "System": 11 },
      "3": { "CustomDialogOptions": 8 },
      "4": { "Viewport": 7 },
      "5": { "DrawingSurfaceFunctions": 6 },
      "6": { "GUIControl": 5 },
      "7": { "Screen": 2 },
      "8": { "Game": 1 }
    },
    "Wieczorek": {
      "0": { "Credits": 1 }
    },
    "Wilkinson": {
      "0": { "Credits": 1 }
    },
    "Willcock": {
      "0": { "Credits": 1 }
    },
    "window": {
      "0": { "InvWindow": 27 },
      "1": { "Settingupthegame": 18 },
      "2": { "EditingGUIs": 12 },
      "3": { "Globalfunctions_Message": 8 },
      "4": { "Setup": 7 },
      "5": { "Game": 5 },
      "6": { "acintro5": 4 },
      "7": { "Globalfunctions_General": 3 },
      "8": { "EditorSprite": 2 },
      "9": { "UpgradeTo31": 1 }
    },
    "Window": {
      "0": { "Settingupthegame": 2 },
      "1": { "EventTypes": 1 }
    },
    "window's": {
      "0": { "EditingGUIs": 1 }
    },
    "windowed": {
      "0": { "Setup": 3 },
      "1": { "System": 2 },
      "2": { "Globalfunctions_General": 1 }
    },
    "Windowed": {
      "0": { "System": 5 },
      "1": { "Setup": 1 }
    },
    "Windows": {
      "0": { "IntegrationWithWindows": 18 },
      "1": { "TroubleshootingWindowsZoneID": 8 },
      "2": { "DistGame": 6 },
      "3": { "System": 4 },
      "4": { "GraphicsDriver": 3 },
      "5": { "Copyright": 2 },
      "6": { "OtherFeatures": 1 }
    },
    "windows": {
      "0": { "Globalfunctions_General": 3 },
      "1": { "acintro1": 2 },
      "2": { "Settingupthegame": 1 }
    },
    "Windows-based": {
      "0": { "GraphicsDriver": 2 }
    },
    "Windows-style": {
      "0": { "acintro9": 1 }
    },
    "winsetup": {
      "0": { "UpgradeTo341": 1 }
    },
    "WinZip": {
      "0": { "ContactingTheDevelopers": 1 }
    },
    "wired": {
      "0": { "FAQ": 2 }
    },
    "wiring": {
      "0": { "FAQ": 1 }
    },
    "wise": {
      "0": { "acintro2": 1 }
    },
    "wish": {
      "0": { "Settingupthegame": 1 }
    },
    "Within": {
      "0": { "EditorInventoryItems": 1 }
    },
    "within": {
      "0": { "DialogOptionsRenderingInfo": 11 },
      "1": { "Dialog": 7 },
      "2": { "Character": 6 },
      "3": { "Settingupthegame": 5 },
      "4": { "Gamevariables": 4 },
      "5": { "BlockingScripts": 3 },
      "6": { "Slider": 2 },
      "7": { "EditorView": 1 }
    },
    "withing": {
      "0": { "Templates": 1 }
    },
    "without": {
      "0": { "ScriptKeywords": 6 },
      "1": { "Game": 4 },
      "2": { "UpgradeTo335": 3 },
      "3": { "UpgradeTo34": 2 },
      "4": { "BackingUpYourGame": 1 }
    },
    "WITHOUT": {
      "0": { "Copyright": 2 }
    },
    "Without": {
      "0": { "Character": 1 }
    },
    "wizard": {
      "0": { "Globalfunctions_Message": 2 },
      "1": { "acintro1": 1 }
    },
    "Wo": {
      "0": { "String": 1 }
    },
    "won't": {
      "0": { "Character": 8 },
      "1": { "Settingupthegame": 4 },
      "2": { "acintro2": 3 },
      "3": { "acintro3": 2 },
      "4": { "EventTypes": 1 }
    },
    "wonder": {
      "0": { "Character": 1 }
    },
    "wondering": {
      "0": { "ScriptingTutorialPart2": 2 },
      "1": { "UpgradingTo27": 1 }
    },
    "wooden": {
      "0": { "TextParser": 1 }
    },
    "word": {
      "0": { "TextParser": 8 },
      "1": { "Lipsync": 5 },
      "2": { "Parser": 4 },
      "3": { "Tumbleweed_translation": 1 }
    },
    "Word": {
      "0": { "Parser": 1 }
    },
    "words": {
      "0": { "TextParser": 13 },
      "1": { "Lipsync": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "MusicAndSound": 1 }
    },
    "wordToFind": {
      "0": { "Parser": 2 }
    },
    "work": {
      "0": { "Globalfunctions_General": 7 },
      "1": { "ScriptKeywords": 5 },
      "2": { "AnonymousUsageInfo": 3 },
      "3": { "Maths": 2 },
      "4": { "Object": 1 }
    },
    "worked": {
      "0": { "Settingupthegame": 6 },
      "1": { "Character": 1 }
    },
    "working": {
      "0": { "Globalfunctions_General": 2 },
      "1": { "Scripting": 1 }
    },
    "works": {
      "0": { "Character": 10 },
      "1": { "Object": 7 },
      "2": { "Settingupthegame": 5 },
      "3": { "Globalfunctions_General": 4 },
      "4": { "UpgradeTo30": 3 },
      "5": { "Debuggingfeatures": 2 },
      "6": { "Region": 1 }
    },
    "World": {
      "0": { "String": 7 },
      "1": { "UpgradingTo271": 1 }
    },
    "world": {
      "0": { "acintro9": 2 }
    },
    "worry": {
      "0": { "UpgradeTo30": 1 }
    },
    "worst": {
      "0": { "MusicAndSound": 1 }
    },
    "worth": {
      "0": { "AnonymousUsageInfo": 1 }
    },
    "would": {
      "0": { "Pointers": 7 },
      "1": { "RepExec": 5 },
      "2": { "ScriptingTutorialPart1": 4 },
      "3": { "UpgradeTo30": 3 },
      "4": { "Region": 2 },
      "5": { "UpgradeTo32": 1 }
    },
    "wouldn't": {
      "0": { "Object": 2 },
      "1": { "OOProgramming": 1 }
    },
    "wrap": {
      "0": { "DrawingSurfaceFunctions": 2 },
      "1": { "Preprocessor": 1 }
    },
    "wrapped": {
      "0": { "Settingupthegame": 1 }
    },
    "wrapper": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "wrapping": {
      "0": { "DrawingSurfaceFunctions": 1 }
    },
    "wraps": {
      "0": { "EditingGUIs": 1 }
    },
    "writable": {
      "0": { "OOProgramming": 1 }
    },
    "WRITE": {
      "0": { "Pointers": 1 }
    },
    "write": {
      "0": { "File": 15 },
      "1": { "ScriptingTutorialPart1": 7 },
      "2": { "ScriptingTutorialPart2": 6 },
      "3": { "ScriptKeywords": 4 },
      "4": { "UpgradeTo335": 2 },
      "5": { "Dictionary": 1 }
    },
    "Write": {
      "0": { "Settingupthegame": 1 }
    },
    "WriteCustomModuleData": {
      "0": { "File": 1 }
    },
    "WriteInt": {
      "0": { "File": 10 },
      "1": { "Pointers": 1 }
    },
    "writeprotected": {
      "0": { "ScriptKeywords": 4 },
      "1": { "OOProgramming": 1 }
    },
    "WriteRawChar": {
      "0": { "File": 6 }
    },
    "WriteRawLine": {
      "0": { "File": 5 }
    },
    "Writes": {
      "0": { "File": 4 }
    },
    "writes": {
      "0": { "File": 2 },
      "1": { "UpgradeTo341": 1 }
    },
    "WriteString": {
      "0": { "File": 14 },
      "1": { "Pointers": 1 }
    },
    "writing": {
      "0": { "File": 15 },
      "1": { "Globalfunctions_General": 4 },
      "2": { "ScriptingTutorialPart1": 3 },
      "3": { "UpgradeTo335": 2 },
      "4": { "DynamicArrays": 1 }
    },
    "WRITTEN": {
      "0": { "Copyright": 1 }
    },
    "written": {
      "0": { "File": 8 },
      "1": { "UpgradeTo31": 2 },
      "2": { "UpgradeTo335": 1 }
    },
    "wrong": {
      "0": { "Globalfunctions_Screen": 1 }
    },
    "wrongly": {
      "0": { "ScriptKeywords": 1 }
    },
    "wrote": {
      "0": { "File": 2 }
    },
    "www": {
      "0": { "Credits": 5 },
      "1": { "DistGame": 2 },
      "2": { "MusicAndSound": 1 }
    },
    "www-personal": {
      "0": { "Lipsync": 1 }
    },
    "X-position": {
      "0": { "DialogOptionsRenderingInfo": 2 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "XDG": {
      "0": { "Game": 1 }
    },
    "Xf": {
      "0": { "StringFormats": 1 }
    },
    "Xiph": {
      "0": { "Copyright": 2 },
      "1": { "DistGame": 1 }
    },
    "xiph": {
      "0": { "Credits": 2 },
      "1": { "DistGame": 1 }
    },
    "XM": {
      "0": { "AudioChannel": 2 },
      "1": { "Credits": 1 }
    },
    "xoffset": {
      "0": { "Tumbleweed_movement": 2 }
    },
    "xOffset": {
      "0": { "Character": 1 }
    },
    "XOFFSET": {
      "0": { "Character": 1 }
    },
    "XOR": {
      "0": { "ScriptKeywords": 1 }
    },
    "XP": {
      "0": { "IntegrationWithWindows": 2 },
      "1": { "SystemRequirements": 1 }
    },
    "XPLevel": {
      "0": { "Character": 2 }
    },
    "xpos": {
      "0": { "Globalfunctions_General": 1 }
    },
    "XVid": {
      "0": { "Multimedia": 2 }
    },
    "XX": {
      "0": { "EditingGUIs": 1 }
    },
    "xxx": {
      "0": { "Game": 1 }
    },
    "XXX": {
      "0": { "OOProgramming": 5 }
    },
    "XXXX": {
      "0": { "MusicAndSound": 1 }
    },
    "XXXXY": {
      "0": { "MusicAndSound": 1 }
    },
    "xy": {
      "0": { "Globalfunctions_General": 1 }
    },
    "y-coordinate": {
      "0": { "EditingGUIs": 1 }
    },
    "Y-position": {
      "0": { "DialogOptionsRenderingInfo": 2 },
      "1": { "Globalfunctions_Room": 1 }
    },
    "Yay": {
      "0": { "System": 1 }
    },
    "year": {
      "0": { "DateTime": 3 }
    },
    "Year": {
      "0": { "DateTime": 4 }
    },
    "yellow": {
      "0": { "DrawingSurfaceFunctions": 4 },
      "1": { "TextBox": 1 }
    },
    "Yep": {
      "0": { "Tumbleweed": 1 }
    },
    "Yes": {
      "0": { "Multimedia": 4 },
      "1": { "Globalfunctions_General": 3 },
      "2": { "OOProgramming": 2 },
      "3": { "UpgradeTo31": 1 }
    },
    "yes": {
      "0": { "acintro4": 1 }
    },
    "yet": {
      "0": { "ScriptKeywords": 1 }
    },
    "yield": {
      "0": { "ScriptingTutorialPart1": 1 }
    },
    "YOFFSET": {
      "0": { "Character": 1 }
    },
    "yOffset": {
      "0": { "Character": 1 }
    },
    "yoffset": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "yofsset": {
      "0": { "Tumbleweed_movement": 1 }
    },
    "YOU": {
      "0": { "Copyright": 1 }
    },
    "you": {
      "0": { "Settingupthegame": 199 },
      "1": { "Character": 94 },
      "2": { "Globalfunctions_General": 74 },
      "3": { "MusicAndSound": 58 },
      "4": { "ScriptKeywords": 55 },
      "5": { "DynamicSprite": 54 },
      "6": { "ScriptingTutorialPart1": 50 },
      "7": { "acintro1": 44 },
      "8": { "Tumbleweed": 43 },
      "9": { "File": 40 },
      "10": { "Pointers": 35 },
      "11": { "ScriptingTutorialPart2": 34 },
      "12": { "EditingGUIs": 32 },
      "13": { "UpgradingTo27": 31 },
      "14": { "acintro6": 30 },
      "15": { "EditorView": 29 },
      "16": { "UpgradeTo350": 28 },
      "17": { "IntegrationWithWindows": 26 },
      "18": { "acintro9": 25 },
      "19": { "Object": 24 },
      "20": { "UpgradeTo32": 23 },
      "21": { "Templates": 22 },
      "22": { "Globalfunctions_Room": 21 },
      "23": { "DistGame": 20 },
      "24": { "GUIControl": 19 },
      "25": { "acintro2": 18 },
      "26": { "UpgradeTo34": 17 },
      "27": { "Debuggingfeatures": 16 },
      "28": { "ContactingTheDevelopers": 15 },
      "29": { "GlobalVariables": 14 },
      "30": { "UpgradeTo31": 13 },
      "31": { "Region": 12 },
      "32": { "String": 11 },
      "33": { "DynamicArrays": 10 },
      "34": { "StringFormats": 9 },
      "35": { "Viewport": 8 },
      "36": { "Scripting": 7 },
      "37": { "Translations": 6 },
      "38": { "AudioClip": 5 },
      "39": { "AnonymousUsageInfo": 4 },
      "40": { "GraphicsDriver": 3 },
      "41": { "Introduction": 2 },
      "42": { "Speech": 1 }
    },
    "You": {
      "0": { "Settingupthegame": 41 },
      "1": { "Character": 20 },
      "2": { "ScriptKeywords": 17 },
      "3": { "EditingGUIs": 14 },
      "4": { "ScriptingTutorialPart2": 12 },
      "5": { "Globalfunctions_General": 11 },
      "6": { "EditorView": 8 },
      "7": { "DrawingSurfaceFunctions": 7 },
      "8": { "UpgradeTo34": 6 },
      "9": { "acintro2": 5 },
      "10": { "Gamevariables": 4 },
      "11": { "DynamicArrays": 3 },
      "12": { "StringFormats": 2 },
      "13": { "Viewport": 1 }
    },
    "you'd": {
      "0": { "Pointers": 5 },
      "1": { "ExtenderFunctions": 1 }
    },
    "You'd": {
      "0": { "Pointers": 2 },
      "1": { "ScriptModules": 1 }
    },
    "you'll": {
      "0": { "acintro7": 4 },
      "1": { "UpgradingTo27": 3 },
      "2": { "UpgradeTo30": 2 },
      "3": { "ScriptModules": 1 }
    },
    "You'll": {
      "0": { "acintro2": 4 },
      "1": { "acintro8": 3 },
      "2": { "acintro3": 2 },
      "3": { "Translations": 1 }
    },
    "You're": {
      "0": { "TextParser": 1 }
    },
    "you're": {
      "0": { "acintro1": 5 },
      "1": { "acintro3": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "Debuggingfeatures": 1 }
    },
    "You've": {
      "0": { "ScriptingTutorialPart2": 1 }
    },
    "you've": {
      "0": { "Translations": 3 },
      "1": { "acintro6": 2 },
      "2": { "AutonumberSpeechFiles": 1 }
    },
    "Your": {
      "0": { "Multimedia": 2 },
      "1": { "acintro1": 1 }
    },
    "your": {
      "0": { "Settingupthegame": 60 },
      "1": { "ScriptKeywords": 22 },
      "2": { "Globalfunctions_General": 19 },
      "3": { "MusicAndSound": 16 },
      "4": { "DistGame": 14 },
      "5": { "UpgradeTo31": 13 },
      "6": { "UpgradeTo34": 12 },
      "7": { "IntegrationWithWindows": 11 },
      "8": { "UpgradingTo27": 9 },
      "9": { "ScriptingTutorialPart1": 8 },
      "10": { "UpgradeTo341": 7 },
      "11": { "CallingGlobalFunctions": 6 },
      "12": { "Translations": 5 },
      "13": { "InvWindow": 4 },
      "14": { "StringFormats": 3 },
      "15": { "Introduction": 2 },
      "16": { "DynamicArrays": 1 }
    },
    "yourself": {
      "0": { "Settingupthegame": 2 },
      "1": { "Screen": 1 }
    },
    "YouTube": {
      "0": { "acintro": 1 }
    },
    "Ypos": {
      "0": { "GUI": 1 }
    },
    "YPos": {
      "0": { "EditingGUIs": 1 }
    },
    "ypos": {
      "0": { "CustomDialogOptions": 9 }
    },
    "yposition": {
      "0": { "Globalfunctions_Message": 1 }
    },
    "YPOSITION": {
      "0": { "Globalfunctions_Message": 1 }
    },
    "Z-Order": {
      "0": { "EditingGUIs": 1 }
    },
    "Z-order": {
      "0": { "GUIControl": 6 },
      "1": { "EditingGUIs": 1 }
    },
    "z-order": {
      "0": { "Viewport": 2 },
      "1": { "GUI": 1 }
    },
    "zero": {
      "0": { "ScriptKeywords": 4 },
      "1": { "Globalfunctions_General": 2 },
      "2": { "Speech": 1 }
    },
    "zeroes": {
      "0": { "MusicAndSound": 1 }
    },
    "zeros": {
      "0": { "StringFormats": 1 }
    },
    "zip": {
      "0": { "IntegrationWithWindows": 2 },
      "1": { "ContactingTheDevelopers": 1 }
    },
    "zipping": {
      "0": { "Templates": 1 }
    },
    "zone": {
      "0": { "TroubleshootingWindowsZoneID": 3 }
    },
    "Zone": {
      "0": { "TroubleshootingWindowsZoneID": 10 },
      "1": { "Plugins": 2 }
    },
    "zoom": {
      "0": { "Character": 4 },
      "1": { "AdvancedRoomFeatures": 3 },
      "2": { "Settingupthegame": 2 },
      "3": { "Camera": 1 }
    },
    "Zoom": {
      "0": { "acintro6": 1 }
    },
    "zoom-in": {
      "0": { "Camera": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "zoom-out": {
      "0": { "Camera": 2 },
      "1": { "UpgradeTo350": 1 }
    },
    "zooming": {
      "0": { "UpgradeTo350": 1 }
    },
    "ZOrder": {
      "0": { "Viewport": 9 },
      "1": { "GUIControl": 7 },
      "2": { "GUI": 5 },
      "3": { "Screen": 1 }
    }
  }
}

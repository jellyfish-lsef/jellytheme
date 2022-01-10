function capacitor(gui,state) {
    var colorMap = {
        "comment":["0"],
        "depreciated":["39"],
        "invalid":["37"],
        "keyword":["1","2","3","26","38"],
        "variable":["4","5","6","7","8","9","10","11"],
        "constant":["12","13","14","15","16","17","18","37"],
        "class":["19","20","21","22"],
        "string":["23","24","25"],
        "function":["27","28","29","30","31"],
        "character":["40","41"],
        "keyword":["32","33","34","35","36"],
    }
    
    var themeState = window.themeState = {
        
        name: "My Theme",
        author: "A Script-Ware User",
        isLight: false,
        vars: {
            "accent": "#4D9CF6",
            "background": "#202225",
            "background-2": "#222",
            "background-3": "#444",
            "text": "#fff",
            "text-on-accent": "#fff"
        },
        monacoTheme: {
            base: "vs-dark",
            inherit: true,
            rules: [{
                foreground: "5c6370",
                fontStyle: " italic",
                token: "comment"
            }, {
                foreground: "b8cae8ff",
                token: "keyword.operator.class"
            }, {
                foreground: "b8cae8ff",
                token: "constant.other"
            }, {
                foreground: "b8cae8ff",
                token: "source.php.embedded.line"
            }, {
                foreground: "fa6e7c",
                token: "variable"
            }, {
                foreground: "fa6e7c",
                token: "support.other.variable"
            }, {
                foreground: "fa6e7c",
                token: "string.other.link"
            }, {
                foreground: "fa6e7c",
                token: "string.regexp"
            }, {
                foreground: "fa6e7c",
                token: "entity.name.tag"
            }, {
                foreground: "fa6e7c",
                token: "entity.other.attribute-name"
            }, {
                foreground: "fa6e7c",
                token: "meta.tag"
            }, {
                foreground: "fa6e7c",
                token: "declaration.tag"
            }, {
                foreground: "eeb164ff",
                token: "constant.numeric"
            }, {
                foreground: "eeb164ff",
                token: "constant.language"
            }, {
                foreground: "eeb164ff",
                token: "support.constant"
            }, {
                foreground: "eeb164ff",
                token: "constant.character"
            }, {
                foreground: "eeb164ff",
                token: "variable.parameter"
            }, {
                foreground: "eeb164ff",
                token: "punctuation.section.embedded"
            }, {
                foreground: "eeb164ff",
                token: "keyword.other.unit"
            }, {
                foreground: "eee280ff",
                token: "entity.name.class"
            }, {
                foreground: "eee280ff",
                token: "entity.name.type.class"
            }, {
                foreground: "eee280ff",
                token: "support.type"
            }, {
                foreground: "eee280ff",
                token: "support.class"
            }, {
                foreground: "adee7aff",
                token: "string"
            }, {
                foreground: "adee7aff",
                token: "entity.other.inherited-class"
            }, {
                foreground: "adee7aff",
                token: "markup.heading"
            }, {
                foreground: "b8cae8ff",
                token: "constant.other.color"
            }, {
                foreground: "61cbeeff",
                token: "entity.name.function"
            }, {
                foreground: "61cbeeff",
                token: "meta.function-call"
            }, {
                foreground: "61cbeeff",
                token: "support.function"
            }, {
                foreground: "61cbeeff",
                token: "keyword.other.special-method"
            }, {
                foreground: "61cbeeff",
                token: "meta.block-level"
            }, {
                foreground: "ec7beeff",
                token: "keyword"
            }, {
                foreground: "ec7beeff",
                token: "storage"
            }, {
                foreground: "ec7beeff",
                token: "storage.type"
            }, {
                foreground: "ec7beeff",
                token: "entity.name.tag.css"
            }, {
                foreground: "ec7beeff",
                token: "keyword.operator"
            }, {
                foreground: "eeeeeeff",
                background: "ee7c80ff",
                token: "invalid"
            }, {
                foreground: "b8cae8ff",
                background: "6b4f4fff",
                token: "meta.separator"
            }, {
                foreground: "243043ff",
                background: "ee864dff",
                token: "invalid.deprecated"
            }, {
                foreground: "4fe1eeff",
                token: "constant.character"
            }, {
                foreground: "4fe1eeff",
                token: "constant.other"
            }, {
                foreground: "eeb164",
                token: "number"
            }],
            colors: {
                "editor.foreground": "#BFCAE0",
                "editor.background": "#202225",
                "editor.selectionBackground": "#3D4350",
                "editorCursor.foreground": "#528BFF",
                "editorWhitespace.foreground": "#747369",
            }
        },
        customCSS: "",
        JFEdefaultColors: {
            "comment":"#5c6370",
            "depreciated":"#243043",
            "invalid": "#eeeeee",
            "keyword":"#b8cae8",
            "variable":"#fa6e7c",
            "constant":"#eeb164",
            "class":"#eee280",
            "string":"#adee7a",
            "function":"#61cbee",
            "character":"#4fe1ee",
            "keyword":"#ec7bee",
        },
        JFEbackgroundImage: {
            enabled: false,
            url: "https://source.unsplash.com/random/1920x1080",
            size: "cover",
        }
    }
    Object.assign(themeState, state);


    function preview() {
        themeState.monacoTheme.base = themeState.isLight ? "vs" : "vs-dark";
        for (var i in themeState.JFEdefaultColors) {
            for (var j of colorMap[i]) {
                themeState.monacoTheme.rules[j].foreground = themeState.JFEdefaultColors[i];
            }
        }

        themeState.customCSS = ""
        if (themeState.JFEbackgroundImage.enabled) {
            themeState.customCSS += "body { background-image: url(" + JSON.stringify(themeState.JFEbackgroundImage.url) + "); background-size: " + themeState.JFEbackgroundImage.size + ";background-position: center;}"
            themeState.customCSS += ".monaco-editor .margin, .monaco-editor, .monaco-editor-background, .monaco-editor .inputarea.ime-input { background-color: transparent;}"; 
            themeState.customCSS += "body[hash=sidebar] #tabsContainer, body[hash=sidebar] #monacoContainer { background: #0008;}"
            themeState.customCSS += "#monacoContainer { transition: 0.2s filter, 0.2s margin-left, 0.2s background; } ";
        }

        iframe.contentWindow.applyTheme(themeState);
    }

    gui.add(themeState, "name");
    gui.add(themeState, "author");
    gui.add(themeState, "isLight").onChange(preview);

    var mainapp = gui.addFolder("Base Application");
    for (var i in themeState.vars) {
        mainapp.addColor(themeState.vars, i).onChange(preview);
    }
    
    var editor = gui.addFolder("Editor");
    for (var i in themeState.monacoTheme.colors) {
        editor.addColor(themeState.monacoTheme.colors, i).onChange(preview);
    }
    

    var syntax = gui.addFolder("Syntax Highlighting");
    for (var i in themeState.JFEdefaultColors) {
        syntax.addColor(themeState.JFEdefaultColors, i).onChange(preview);
    }

    var bgimg = gui.addFolder("Background image");
    bgimg.add(themeState.JFEbackgroundImage, "enabled").onChange(preview);
    bgimg.add(themeState.JFEbackgroundImage, "url").onChange(preview);
    bgimg.add(themeState.JFEbackgroundImage, "size", ["cover","contain","tile"]).onChange(preview);

    gui.add({
        downloadTheme: () =>{
            let download = document.createElement("a");
            download.download = prompt("File name?") + ".swmtheme";
            download.href = "data:text/css;charset=utf-8," + encodeURIComponent(JSON.stringify(themeState,null,4));
            document.body.appendChild(download);
            download.click();
            alert("Place this file in Documents > Script-Ware > Themes. Don't remove the .swmtheme from the end.")
        }
    }, "downloadTheme");
    
    preview()
}
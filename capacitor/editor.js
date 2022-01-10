require.config({ paths: { 'vs': '../monaco-editor/min/vs' }});

function uriFromPath(_path) {
    var pathName = path.resolve(_path).replace(/\\/g, '/');
    if (pathName.length > 0 && pathName.charAt(0) !== '/') {
        pathName = '/' + pathName;
    }
    return encodeURI('file://' + pathName);
}


function contentChange(event) {
    var val = this.getValue().toLowerCase()
    this.modified = true
    if (val == "i<3icepools" || val == "iloveicepools" || val == "<3icepools" || val == "icepools<3") {
        (new Toast({
            title: "Redirecting...",
            description: "Redirecting to fbi.gov",
            closable: false
        })).show()
        setTimeout(function () {
            location.replace("https://fbi.gov")
        }, 1000)
    }
    if (val == "jjsploitwinning") {
        var a = new Audio("./assets/audio/jjsploit.mp3");
        (new Toast({
            title: "Virus Detected!",
            description: "<br>Location: jjsploit.exe<br>Virus name: jjsploit<br><br>Virus has been quarantined."
        })).show()
        a.play()
        setTimeout(function () {
            a.remove()
        }, 6000)
        this.setValue("��������winning")
    }
}

/**
 * Saves the script currently in the editor
 */
 function saveCurrentScript(p,ae) {
    console.log("save-script")
    var model = mainEditor.getModel()
    var uri =  model.uri._formatted || model.uri
    console.log(uri)
    if (uri.startsWith("file://")) {
        var file = uri.replace("file://","")
        fs.writeFileSync(file,model.getValue())
    } else {
        var path = ipcRenderer.sendSync("save-script",ae)
        if (!path) return;
        var value = model.getValue()
        fs.writeFileSync(path,value)
        model.dispose()
        newModel(value,path)
    }
    setTimeout(searchLocalScripts,10)
}

async function applyTabs() {
    var tabs = document.querySelector("#tabsContainer")
    tabs.innerHTML = ""
    for (var model of monaco.editor.getModels()) {
        try {
            var uri =  model.uri._formatted || model.uri
            var tab = document.createElement("div")
            tab.setAttribute("href",uri)
            tab.className = 'tab'
            if (model.isAttachedToEditor()) tab.classList.add("active")
            var icon = document.createElement('i')
            icon.className = 'material-icons'
            icon.innerText = 'description'
            tab.appendChild(icon)
            tab.appendChild(document.createTextNode(uri.split("/").pop()))
            var close = document.createElement('i')
            close.className = 'material-icons glowy'
            close.innerText = 'close'
            tab.appendChild(close)

            tab.onclick = function() {
                mainEditor.setModel(this)
                applyTabs()
            }.bind(model)

            close.onclick = function() {
                console.log(this)
                var currentModel = mainEditor.getModel()
                var inuse = this.isAttachedToEditor()
                this.dispose()
                setTimeout(function() {
                    var model = inuse ? [...monaco.editor.getModels()].pop() : currentModel
                    if (model) mainEditor.setModel(model)
                    applyTabs()
                })
                applyTabs()
            }.bind(model)

            tabs.appendChild(tab)
        } catch (e) {
            console.error(e)
        }
    }
    var add = document.createElement('i')
    add.className = 'material-icons glowy'
    add.innerText = 'add'
    add.onclick = () => {
        newModel("")
    }
    tabs.appendChild(add)
}

function newModel(text,path) {
    var uri = path ? "file://" + path : 'scriptwaretemp://unsaved ' + (docid++) + ".lua"
    if (typeof path == 'string' && path.startsWith("scriptwaretemp://")) uri = path
    var model = monaco.editor.getModel(uri)
    if (path && model) {
        mainEditor.setModel(model)
        applyTabs()
        return model
    }
    var model = monaco.editor.createModel(text, 'lua', uri)
    model.onDidChangeContent(contentChange.bind(model))
    //try { if (!mainEditor.getModel().modified) mainEditor.getModel().dispose(); } catch(e) {}
    mainEditor.setModel(model)
    applyTabs()
    return model;
}

var docid = 0
// workaround monaco-css not understanding the environment
require(['vs/editor/editor.main'], function () {
    monaco.editor.defineTheme("defaultTheme", {
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
        }],
        colors: {
            "editor.foreground": "#BFCAE0",
            "editor.background": "#202225",
            "editor.selectionBackground": "#3D4350",
            "editor.lineHighlightBackground": "#4C576730",
            "editorCursor.foreground": "#528BFF",
            "editorWhitespace.foreground": "#747369"
        }
    });
    monaco.editor.setTheme('defaultTheme');

    mainEditor = monaco.editor.create(document.getElementById('monacoContainer'), {
        automaticLayout: true,
    });
    newModel("print(\"Welcome to Script-Ware!\")")
    
    monacoA(monaco)
});
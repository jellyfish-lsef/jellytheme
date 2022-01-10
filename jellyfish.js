function jellyfish(gui,state) {
    window.themeState = state || {
        textMain:"#fff",
        textOnAccent:"#fff",
        backgroundMain:"#222",
        buttonBackground:"#444",
        buttonText:"#fff",
        accentBright:"#e5101e",
        accentDark:"#ed0717",
        accentVeryDark:"#9e0a14",
        background:"linear-gradient(to right, var(--accent-bright),var(--accent-dark))",
        fontBlack:"GothamSSm-Black",
        fontBold:"GothamSSm-Bold",
        fontMedium:"GothamSSm-Medium",
        fontLight:"GothamSSm-Book",
        hideLogo: false,
        downloadTheme: () =>{
            let download = document.createElement("a");
            download.download = prompt("File name?") + ".jellytheme.css";
            download.href = "data:text/css;charset=utf-8," + encodeURIComponent(build());
            document.body.appendChild(download);
            download.click();
            alert("Place this file in Documents > Jellyfish > Themes. Don't remove the .jellytheme.css from the end.")
        }
    }

    function build() {
        return `
        /* This contains most of the things you might want to change */
        body, body *, body > * {
            /* This changes the color of the text on the background */
            --text-main:${themeState.textMain};
            /* This changes the color of the text on the accent */
            --text-onaccent: ${themeState.textOnAccent};

            /* This changes the background color of Jellyfish. */
            --background-main: ${themeState.backgroundMain};
            
            /* This changes the color of the grey buttons on the tools page */
            --button-background: ${themeState.buttonBackground};
            --button-text: ${themeState.buttonText};



            /* These colors allow for more indepth changing of the primary color */
            --accent-bright: ${themeState.accentBright};
            --accent-dark: ${themeState.accentDark};
            --accent-verydark: ${themeState.accentVeryDark};

            /* This changes the background of the UI. */
            --background: ${themeState.background};

            /* Change the font */
            --font-black: '${themeState.fontBlack}','Montserrat',sans-serif;
            --font-bold: '${themeState.fontBold}','Montserrat',sans-serif;
            --font-medium: '${themeState.fontMedium}','Montserrat',sans-serif;
            --font-light: '${themeState.fontLight}','Montserrat',sans-serif;
        }

        ${themeState.hideLogo ? `
        .topBarBrand {
            display:none;
        }
        #topBarNavi {
            text-align: left;
        }` : ""}
`
    }
    function preview() {
        iframeDoc.querySelector("#themeApplication").innerHTML = build()
    }
    var mainapp = gui.addFolder("Base Application");
    var glowygui = gui.addFolder("Glowy Things");
    var buttons = gui.addFolder("Buttons");
    var font = gui.addFolder("Fonts");
    mainapp.addColor(themeState, "textMain").onChange(preview);
    mainapp.addColor(themeState, "backgroundMain").onChange(preview);
    buttons.addColor(themeState, "buttonBackground").onChange(preview);
    buttons.addColor(themeState, "buttonText").onChange(preview);
    glowygui.addColor(themeState, "textOnAccent").onChange(preview);
    glowygui.addColor(themeState, "accentBright").onChange(preview);
    glowygui.addColor(themeState, "accentDark").onChange(preview);
    glowygui.addColor(themeState, "accentVeryDark").onChange(preview);
    glowygui.add(themeState, "background").onChange(preview);
    font.add(themeState, "fontBlack").onChange(preview);
    font.add(themeState, "fontBold").onChange(preview);
    font.add(themeState, "fontMedium").onChange(preview);
    font.add(themeState, "fontLight").onChange(preview);

    gui.add(themeState, "hideLogo").onChange(preview);
    gui.add(themeState, "downloadTheme");
    
    preview()
}
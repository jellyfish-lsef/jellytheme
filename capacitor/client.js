// (c) 2021 theLMGN & Script-Ware Team

updateTb = () => {}

window.onerror = console.error

var monacoA
var monacoLoaded = new Promise((a)=>{monacoA = a})


location.hash = "editor"
/**
 * Opens a different page
 */
window.onhashchange = function() {
    console.log("hash change")
    var h = location.hash.replace("#","")
    document.body.setAttribute("hash",h)
    while (e = document.querySelector("#mainsidebar > .active")) e.classList.remove("active")
    if (e=(document.querySelector("#" + h + "Btn") || document.querySelector("#" + document.body.getAttribute("sidebar") + "Btn"))) {e.classList.add("active")}
    if (h == "about") updateThemes()
    if (h == "scriptLibrary") document.querySelector("#scriptLibrarySearch").focus()
    updateTb()
}


/**
 * Opens a sidebar
 * @param {String} sidebar The name of the sidebar
 */
function openSidebar(sidebar) {
    document.body.setAttribute("hash","sidebar")
    document.body.setAttribute("sidebar",sidebar)
    location.hash = "sidebar"
    if (sidebar == "files") {
        searchLocalScripts()
    }
    if (sidebar == "tool") {
        updateScriptHub()
    }
    if (sidebar == "friend") {
        applyFriendsState()
        document.querySelector("#friendsSearch").focus()
    }
    onhashchange()
}
var canMoveTooltip = true
/**
 * Updates the tooltip position
 */
onmousemove = function(e) {
    if (!canMoveTooltip) return false;
    if (e.clientX < 56 && (el = document.querySelector("#mainsidebar > a:hover"))) {
        document.body.setAttribute("tooltip","true")
        document.querySelector("#tooltip").innerText = el.getAttribute("alt")
    } else {
        document.body.removeAttribute("tooltip")
    }
    if (document.body.getAttribute("tooltip")) {
        document.querySelector("#tooltip").style.top = e.clientY
    }
}

var shj = {}

function changeontop() {
    ipcRenderer.send("set-ontop", document.querySelector("#ontop").checked)
    localStorage.setItem('ontop',document.querySelector("#ontop").checked)
}
document.querySelector('#ontop').checked = localStorage.getItem('ontop') == "true"
changeontop()

function unlockFps() {
    var ufps = document.querySelector("#unlockfps").checked
    runScript(`set_fps_cap(${ufps ? 999 : 60})`)
    localStorage.setItem('unlockfps', ufps)
}
document.querySelector('#unlockFps').checked = localStorage.getItem('unlockfps') == "true"

function autoInject() {
    var ufps = document.querySelector("#autoinj").checked
    if (!injecting && ufps) inject()
    if (!ufps) cancelledInjection = true;
    document.querySelector("#injectBtn").style.display = ufps ? "none" : ""
    localStorage.setItem('autoinj', ufps)
}
document.querySelector('#autoinj').checked = localStorage.getItem('autoinj') == "true"
setTimeout(autoInject,100)


for (var t of document.querySelectorAll(".themePreview")) {
    (function(t){
        t.onclick = function() {
            document.body.setAttribute("style", t.getAttribute("style"))
        }
    })(t)
    
}

/**
 * Shows the login password modal
 */
 function requestLogin() {
    document.querySelector("#keyBox").innerHTML = `<span class="header"><img  height="85px" width="85px" src='assets/img/logo.png' /></span>
    <h1>Login</h1>
    <input type="text" class="textbox" placeholder="Username" id="userInput"></input>
    <input type="password" class="textbox" placeholder="Password" id="passInput"></input>
    
    <button id="validateKey" class="outlinedBtn primary" onclick="finishModal()">Log in</button><a id="buyBtn" target="_blank" class="outlinedBtn" href=API_BASE + "/">Register</a>`
    document.body.classList.add("showModal")
    if (updateTb) updateTb()
    return new Promise(function(a,r)  {
        window.finishModal = a
    })
}
/**
 * Shows the 2FA/HWID change modal
 */
function requestEmailVerification() {
    document.querySelector("#keyBox").innerHTML = `<i style="font-size:85px" class="material-icons header">email</i>
    <h1>Verification required</h1>
    Since it's the first time you're logging in to Script-Ware on this computer, you'll need to verify that it's really you.<br><b>Check your email for a code</b><br>If you continue to have issues, <a href="https://dashboard.script-ware.com/support">contact support</a>
    <input type="text" class="textbox" placeholder="Code" id="codeInput" maxlength=6></input>
    
    <button id="validateKey" class="outlinedBtn" onclick="finishModal()">Verify</button>`
    document.body.classList.add("showModal")
    updateTb()
    return new Promise(function(a,r)  {
        window.finishModal = a
    })
}
/**
 * Shows the request macOS password modal
 */
function requestPassword() {
   document.querySelector("#keyBox").innerHTML = `<i style="font-size:85px" class="material-icons header">lock</i>
   <h1>Enter macOS password</h1>
   
   <input type="text" class="textbox" placeholder="Enter macOS password"  id="keyInput"></input>
   
   <button id="validateKey" class="outlinedBtn" onclick="finishModal()">Authenticate</button>`
   document.body.classList.add("showModal")
   updateTb()
   return new Promise(function(a,r)  {
       window.finishModal = a
   })
}

/**
 * Shows the onboarding modal
 * @param {String} username The username of the current user
 */
function showOnboarding(username) {
    document.querySelector("#keyBox").innerHTML = `<span class="header"><img  height="85px" width="85px" src='assets/img/logo.png' /></span>
    <h1>Welcome, ${username}</h1>
    <h3>Now you're here, let's go over what makes Script-Ware the ultimate script execution experience</h3>
    <br>
    <b>Powerful - </b> Script-Ware offers the most adaptive, inclusive and expanded scripting environment ever seen before - <a href="https://docs.script-ware.com/script-execution-engine" target="_blank">read our documentation</a> and adventure into our capabilities. 
    <br>
    <b>Script Library - </b>Script-Ware isn't complete without running scripts, explore our extensive catalogue and download scripts to your Script Centre!
    <br>
    <b>Connected - </b>Script-Ware has a built in friends system, where you can share scripts and join your friends games.
    <br>
    <b>Customisable - </b>Script-Ware M is fully customisable, with a powerful theming engine.
    <br>
    <b>Need Help? - </b> Our friendly support team will be happy to solve any issues you may have. <a href="https://dashboard.script-ware.com/support" target="_blank">Open a ticket</a>
    <br>
    <button id="validateKey" class="outlinedBtn" onclick="finishModal()">Get started!</button>`
    document.body.classList.add("showModal")
    updateTb()
    return new Promise(function(a,r)  {
        window.finishModal = ()=> {document.body.classList.remove("showModal");a()}
    })
 }

/**
 * Show unsupported injection notice
 */
 function injectionNotice() {
    document.querySelector("#keyBox").innerHTML = `<i style="font-size:85px" class="material-icons header">warning</i>
    <h1>Unsupported Injection Notice</h1>
    
    It is <b>highly recommended</b> that you click inject <b>before</b> starting Roblox. Support will be less likely to help you with any issues you do not do this.
    <br><br>
    <button id="validateKey" class="outlinedBtn" onclick="finishModal()">Ok, quit Roblox</button>
    <br>
    <a href="javascript:finishModal('ik')">Inject anyway</a>`
    document.body.classList.add("showModal")
    updateTb()
    return new Promise(function(a,r)  {
        window.finishModal = a
    })
 }
 /**
 * Show update notice
 */
  function updateNotice() {
    document.querySelector("#keyBox").innerHTML = `
    <h1>Update Available!</h1>
    
    Please visit the Script-Ware dashboard and redownload Script-Ware.
    <br><br>
    <button id="validateKey" class="outlinedBtn" onclick="require('electron').shell.openExternal('http://dashboard.script-ware.com/');">Open Dashboard</button>
    <br>
    <a href="javascript:finishModal('later')">Later</a>`
    document.body.classList.add("showModal")
    updateTb()
    return new Promise(function(a,r)  {
        window.finishModal = function(arg) {
            if (arg == "later") a()
        }
    })
 }
/**
 * Show emergency warning
 */
 function emergency() {
    document.querySelector("#keyBox").innerHTML = `<i style="font-size:85px" class="material-icons header">dangerous</i>
    <h1>Currently unavailable</h1>
    
    For the safety of our customers, Script-Ware M is currently unavailable.`
    document.body.classList.add("showModal")
    updateTb()
    return new Promise(function(a,r)  {
        window.finishModal = a
    })
 }

 function finishModal() {
    document.body.classList.remove("showModal")
 }
/**
 * Fired when the user clicks on the background of a modal.
 * @param {MouseEvent} evt
 */
 function kmbackclick(evt) {
    if (evt.target.id == "keyModal") window.finishModal()
    updateTb()
 }




 window.addEventListener('keydown', (event) => {
     if (document.body.classList.contains("showModal")) {
        if (event.key == 'Escape' && document.body.classList.contains("showModal")) finishModal()
     } else {
        var num = parseInt(event.key)
        if (event.metaKey && event.key == ',') document.querySelector("#mainSidebar > a:nth-child(1)").click()
        if (event.metaKey && event.key == 'e') document.querySelector("#mainSidebar > a:nth-child(2)").click()
        if (event.metaKey && event.key == 'b') document.querySelector("#mainSidebar > a:nth-child(3)").click()
        if (event.metaKey && event.key == 's') saveCurrentScript(event.shiftKey)
        if (event.metaKey && event.key == 'o') document.querySelector("#mainSidebar > a:nth-child(4)").click()
        if (event.metaKey && event.key == 'n') document.querySelector("#mainSidebar > a:nth-child(5)").click()
        if (event.metaKey && event.key == 'y') document.querySelector("#mainSidebar > a:nth-child(6)").click()
        if (event.key == 'F5') document.querySelector("#mainSidebar > a:nth-child(8)").click()
        if (event.ctrlKey && event.key == 'i') document.querySelector("#mainSidebar > a:nth-child(9)").click()
     }     
 })

 onhashchange()

 function showFriendDetails() {
    var a=new Audio("./assets/audio/nudge.mp3");
    a.play()
    document.body.classList.add("shake")
    setTimeout(function() { 
        document.body.classList.remove("shake")
        a.remove()
    },1070)
 }
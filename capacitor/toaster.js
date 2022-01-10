var _toaster = {
    styles: {
      fallback: function(toast) {
        var dom = document.createElement("div");
        dom.className = "toaster fallback-toast"
        dom.style = "background: #000;color: #fff;"
        dom.innerHTML = `<h1>${toast.title}</h1>
        ${toast.description}`
        if (toast.closable) {
          dom.innerHTML += "<a id='toastClose' style=\"float:right\">Close</a>"
          dom.querySelector("a#toastClose").onclick = function() {
            dom.remove()
          }
        }
        return dom
      }
    },
    /**
     * @type {HTMLDivElement}
     */
    breadbag: null
  }
  
  _toaster.createBreadBag = function() {
    if (!_toaster.breadbag && document.querySelector("#toaster_breadbag")) {
      _toaster.breadbag = document.querySelector("#toaster_breadbag")
    }
    if (!document.querySelector("#toaster_breadbag") && !_toaster.breadbag) {
      _toaster.breadbag = document.createElement("div");
      _toaster.breadbag.id = "toaster_breadbag"
      _toaster.breadbag.style = "position: fixed;bottom: 0;right: 0;z-index:999999;"
      _toaster.breadbag.align = 'right'
      document.body.appendChild(_toaster.breadbag)
    }
  }
  
  class Toast {
    title = ""
    description = ""
    style = "capacitor"
    timeout = 5000
    interval = undefined
    dom = undefined
    closable = true
    constructor(options) {
      // configuration
      for (var o in options) { this[o] = options[o] }
      _toaster.createBreadBag()
    }
    show(options) {
      if (this.dom) { 
        throw new Error("Toast already shown!")
      }
      for (var o in options) { this[o] = options[o] }
      _toaster.createBreadBag()
      var style = _toaster.styles[this.style]
      if (!style) {
        console.error("[Toaster]","Toast style not found",this)
        style = _toaster.styles["fallback"]
      }
      if (!style) {
        alert("This Toaster installation could not find the given style, or the fallback style.")
      }
      this.dom = style(this)
      _toaster.breadbag.appendChild(this.dom)
      var t = this
      if (this.timeout > 0) {
        this.interval = setTimeout(function() {
          t.dom.remove()
        },this.timeout)
      }
    }
  }
  
  _toaster.styles["capacitor"] = function(toast) {
    var dom = document.createElement("div");
    dom.className = `toaster toast toast-is-${toast.color}`
    dom.innerHTML = `
    <p class="message-header">
      ${toast.title}
    </p>
    <p class="message-body">
      ${toast.description}
    </p>`
    dom.style.transform = "translate(100%,0%)"
    dom.style.transition = "0.2s transform"
    setTimeout(function() {
      dom.style.transform = "translate(0%,0%)"
    })
    if (toast.timeout > 0) {
      setTimeout(function() {
        dom.style.transform = "translate(100%,0%)"
      },toast.timeout - 200)
    }
    if (toast.closable) {
      dom.innerHTML += `<i class="material-icons toastClose" aria-label="delete">close</i>`
      dom.querySelector(".toastClose").onclick = function() {
        dom.style.transform = "translate(100%,0%)"
        setTimeout(function() {
          dom.remove()
        },200)
      }
    }
    return dom
  }
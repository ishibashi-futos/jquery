var setBallCss = function (e, i) {
  var beforeStyles = `{animation: ball-guruguru 1s linear ${(-0.125 * i) + 0.125}s infinite;}`
  appendBeforeStyle(`.ball-${i}`, beforeStyles)
  e.style.transform = "rotate(" + (360 - (i * 45)) + "deg)"
  e.style.width = "50%";
  e.style.height = "20px";
  e.style.position = "absolute"
  e.style.top = "calc(50% - 10px)"
  e.style.transformOrigin = "100% 50%"
  e.style.left = 0;
}
var setKeyframe = function () {
  var css = document.createElement("style")
  css.className = "loading"
  css.media = "screen"
  css.type = "text/css"
  var fadeIn = "0% { width: 20px; height: 20px; capacity: 1; }"
  var fadeOut = "100% { width: 6px; height: 6px; capacity: .2; margin-left: 7px;}"
  var rules = document.createTextNode("@keyframes ball-guruguru {" + [fadeIn, fadeOut].join("\n") + "}")
  css.appendChild(rules)
  document.getElementsByTagName('head')[0].appendChild(css);
}
var appendBeforeStyle = function(className, styles) {
  var css = document.createElement("style")
  css.className = "loading"
  css.media = "screen"
  css.type = "text/css"
  var newStyle = document.createTextNode(className + "::before " + styles)
  css.appendChild(newStyle)
  document.getElementsByTagName("head")[0].appendChild(css)
}
var setBallBefore = function () {
  var styles = `{ content: ''; width: 20px; height: 20px; border-radius: 50px; background-color: #333; position: absolute; left: 0; top: 50%; transform: translateY(-50%); }`
  appendBeforeStyle(".ball", styles)
}
window.onload = () => {
  setKeyframe()
  setBallBefore()
  var rotate = document.createElement("div")
  rotate.className = "balls-guruguru"
  rotate.style.position = "absolute"
  rotate.style.left = "50%"
  rotate.style.top = "50%"
  rotate.style.width = "100px"
  rotate.style.height = "100px"
  rotate.style.transform = "translate(-50%, -50%)"
  rotate.style.backgroundColor = "#fff"
  for (var i = 1; i <= 8; i++) {
    var ball = document.createElement("span")
    ball.className = "ball ball-" + i
    setBallCss(ball, i)
    rotate.appendChild(ball)
  }
  var wrapper = document.createElement("div")
  wrapper.id = "loading"
  wrapper.className = "wrapper"
  wrapper.appendChild(rotate)
  wrapper.style.height = "100px"
  wrapper.style.position = "relative"

  document.body.appendChild(wrapper)
  // 3秒経過したら勝手に消える
  setTimeout(function () {
    document.getElementById("loading").remove()
    Array.from(document.getElementsByClassName("loading")).forEach((e) => e.remove())
  }, 3000)
}

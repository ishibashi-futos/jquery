const express = require("express")
const app = express();
const PORT = (() => {
  let port = process.env.PORT
  return isNaN(port) ? 3000 : port
})()

let server = app.listen(PORT, function() {
  console.log("Starting DevServer open http://localhost:" + server.address().port);
})

// faviconをエラーにしない
app.get("/favicon.ico", (req, res) => res.status(204))
// publicディレクトリを公開対象にする
app.use(express.static("public"))
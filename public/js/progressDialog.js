var ProgressDialog = (function () {
  var ProgressDialog = function () {
    this.e = null
  }

  var p = ProgressDialog.prototype
  var setDialog = function (e) {
    this.e = e
  }
  p.setDialog = setDialog
  var showProgressDialog = function () {
    var div = $("<div id='progressDialog'></div>").dialog({autoOpen: false})
    div.dialog({
      modal: true,
      title: "経過",
      hight: 400,
      width: 500,
      resizable: false,
      // closeOnEscape: false, // 本番ではコメントアウトを外す
      open: function () {
        $(".ui-dialog-titlebar-close").hide()
        $(this).load("./progress.html")
      },
      buttons: {
        // "中止" : function () {
          
        // }
      },
    })
    div.dialog("open")
    this.setDialog(div)
  }
  p.showProgressDialog = showProgressDialog

  var removeDialog = function () {
    this.e.dialog("destroy")
  }
  p.removeDialog = removeDialog
  return new ProgressDialog()
})()

$(function() {
  $("#button1").click(function () {
    ProgressDialog.showProgressDialog()
  });
});

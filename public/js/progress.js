$(function() {
  var max = 100
  // 何度も使うので、変数に退避
  var p = $('#progress');
  var l = $('#loading');
  p.progressbar({
    value: 0,
    // 1値の変更をラベルにも反映
    change: function() {
      l.text(p.progressbar('value') + '％');
      $("#sub_message #message").text(p.progressbar("value") + "%の進捗状況です")
    },
    // 完了時に
    complete: function() {
      window.parent.ProgressDialog.removeDialog()
    },
    max: max
  });
  var id = setInterval(function() {
    var v = p.progressbar('value');
    p.progressbar('value', ++v);
    if (v >= max) {
      clearInterval(id)
    }
  }, 100);
  // var id = setInterval(function() {
  //   var v = p.progressbar('value');
  //   p.progressbar('value', ++v);
  //   if (v >= max) { clearInterval(id) }
  // }, 100);
});

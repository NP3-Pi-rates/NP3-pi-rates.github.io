$(document).ready(function() {
    var url = "/get_viewer_count.php";
    
    setInterval(function() {
      $.get(url, function(data) {
        $("#viewer-count").text(data);
      });
    }, 5000);
  });
  
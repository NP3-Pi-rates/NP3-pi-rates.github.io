$(document).ready(function() {
    var url = "get_viewer_count.php";
    
    setInterval(function() {
      $.get(url, function(data) {
        $("viewer-count.txt").text(data);
      });
    }, 5000);
  });
  
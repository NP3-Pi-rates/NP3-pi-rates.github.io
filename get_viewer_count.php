<?php
$viewer_count_file = "viewer_count.txt";

// Read the current viewer count from a file.
if (file_exists($viewer_count_file)) {
  $viewer_count = intval(file_get_contents($viewer_count_file));
} else {
  $viewer_count = 0;
}

// Increment the viewer count and write it back to the file.
$viewer_count++;
file_put_contents($viewer_count_file, strval($viewer_count));

// Return the viewer count as plain text.
echo $viewer_count;
?>

<?php 
$good = (($_FILES["file"]["type"] == "image/gif") || ($_FILES["file"]["type"] == "image/jpeg") || ($_FILES["file"]["type"] == "image/pjpeg")) && ($_FILES["file"]["size"] < 20000);


if ( $good && $_FILES["file"]["error"] > 0 ) {
    echo "Error: " . $_FILES["file"]["error"] . "<br/>";
} else {
    echo "Upload: " . $_FILES["file"]["name"] . "<br />";
    echo "Type: " . $_FILES["file"]["type"] . "<br />";
    echo "Size: " . ($_FILES["file"]["size"] / 1024) . " Kb<br />";
    echo "Stored in: " . $_FILES["file"]["tmp_name"];
    $fname = "upload/" . $_FILES["file"]["name"];
    if( file_exists( $fname ) {
        echo $_FILES["file"]["name"] . "already exists. ";
    } else {
        move_uploaded_file( $_FILES["file"]["tmp_name"], $fname );
        echo "<script type=\"text/javascript\">var filename = $fname;</script>";
    
}
?>

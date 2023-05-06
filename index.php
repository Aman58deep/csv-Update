<?php include "script.php" ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Edit Butterfly Sketch</title>
    <link rel="stylesheet" href="./style.css">
</head>
<body>

    <div class="page">
       <div class="files">
            <?php
            $files = glob("*.json");
            foreach($files as $value){
                $value = basename($value);
                ?>
                <a href="?file=data.json"></a>
                <?php
            }
            ?>
       </div>
       
        <div class="edit-section">
            <div class="title"> Edit properties of ButterflySketch <?php @$_GET['file']?></div>
            <?php
            if(isset($_GET['file'])){
                $file = $_GET['file'];
                // echo "The file parameter is set to: " . $file;
            } else {
                // echo "The file parameter is not set";
            }
            $file = "data.json";
            $file= file_get_contents("$file");
            // echo $file;
            $dec = json_decode($file,true);
            foreach($dec as $key=> $value){
                // echo $key;
                ?>
                <form action="index.php?<?php echo $_SERVER['QUERY_STRING']?>" method="POST" >
                <label><?php echo $key ?></label>
                <input type="text" name="<?php echo $key ?>" value="<?php echo $value ?>">
                <button type="submit" name="submit" value="save">Save</button>
                </form>

                <?php
            }
            ?>
            


        </div>

    </div>  
</body>
</html>
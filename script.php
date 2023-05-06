<?php
if (isset($_POST['submit'])) {
    $data = $_POST;
    $file = "data.json";
    foreach ($data as $key => $input){
        if($key!="submit"){
            // echo $key;
            // echo $input;

            $data = file_get_contents($file);
            $data = json_decode($data, true);
            $data[$key]=$input;

            $data = json_encode($data,JSON_PRETTY_PRINT);
            $data;
            file_put_contents($file,$data);
        }
    }
}


    // if(isset($_POST['SUBMIT'])){
    //     $data = $_POST;
    //     $file = $_GET['data.json'];
    //     foreach($data as $key => $input){
    //         if($key != "submit"){
    //             $json_data = file_get_contents($file);
    //             $decoded_data = json_decode($json_data,true);
            

    //             foreach($decoded_data as $field => $value){
    //                 $decoded_data[$key]="0";
    //                 if($key == $feild){
    //                     $decoded_data[$key]=trim($input);
    //                 }
    //             }
    //         }
    //     }
    //     $enc_data = json_encode($decoded_data,JSON_PRETTY_PRINT);
    //     file_put_contents("data.json",$enc_data);
    // }
?>
<?php

function msg($msg){
    echo "<script> alert('$msg'); history.back();</script>";
    exit;
}

function msgAndGo($msg,$url){
    echo "<script> alert('$msg'); location.href = '$url';</script>";
    exit;
}


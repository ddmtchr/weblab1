<?php

function validate($x, $y, $r)
{
    if (!(is_numeric($x) && intval($x) == $x)) {
        return false;
    } elseif (!(-4 <= intval($x) && intval($x) <= 4)) {
        return false;
    }
    if (!(is_numeric($y) && floatval($y) >= -5 && floatval($y) <= 5)) {
        return false;
    }
    if (!(is_numeric($r) && in_array(trim($r), ["1", "1.5", "2", "2.5", "3"], true))) {
        return false;
    }
    return true;
}

function check_args_set()
{
    return isset($_GET["x_input"]) && isset($_GET["y_input"]) && isset($_GET["r_input"]);
}

function compute($x, $y, $r)
{
    if ($x >= 0) {
        if ($y >= 0) {
            if ($y <= $r - $x) return true;
        } else {
            if (($x ** 2 + $y ** 2) <= (($r ** 2) / 4)) return true;
        }
    } else {
        if ($x >= -$r && $y <= 0 && $y >= $r / 2) return true;
    }
    return false;
}

function prepare_response($data_array) {
    $response_string = "";
    foreach ($data_array as $arg) {
        $response_string .= "$arg&";
    }
    return $response_string;
}

$start_time = microtime(true);

$response = [];
if (check_args_set()) {
    $x = htmlspecialchars($_GET["x_input"]);
    $y = htmlspecialchars($_GET["y_input"]);
    $r = htmlspecialchars($_GET["r_input"]);
    if (validate($x, $y, $r)) {
        if (compute($x, $y, $r)) $response[] = "Hit";
        else $response[] = "Miss";
    } else {
        echo "Invalid args\n";
    }
} else {
    echo "Invalid args\n";
}

date_default_timezone_set("Europe/Moscow");
$exec_time = round((microtime(true) - $start_time) * (10 ** 6), 2)."µs";
$current_time = date('Y-m-d H:i:s');

array_push($response, $x, $y, $r, $exec_time, $current_time);

echo prepare_response($response);
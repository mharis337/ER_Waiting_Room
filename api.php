<?php
header('Content-Type: application/json');
require 'db.php';
require 'db_query.php';

$data = json_decode(file_get_contents('php://input'), true);

$action = isset($_GET['action']) ? $_GET['action'] : (isset($data['action']) ? $data['action'] : '');


error_log("action: $action");
if ($action === 'check_wait_time') {
    $name = $data['name'];
    $code = $data['code'];
    $response = check_wait_time($conn, $name, $code);
    echo json_encode($response);
}
elseif ($action === 'get_queue_data') {
    echo json_encode(fetchQueueData($conn));
} else {
    $input = json_decode(file_get_contents('php://input'), true);
    echo json_encode(addToQueue($conn, $input));
}

$conn = null;
?>

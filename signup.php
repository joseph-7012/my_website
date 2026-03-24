<?php
header("Content-Type: application/json");
include 'db.php';

$raw = file_get_contents('php://input');
$data = json_decode($raw, true); // reuse $raw, not a second read

if (!$data || !isset($data['username'], $data['password'])) {
    echo json_encode(["message" => "Invalid or missing JSON data"]);
    exit;
}

$username = $conn->real_escape_string($data['username']);
$password = $conn->real_escape_string($data['password']);

$sql = "INSERT INTO users (username, password) VALUES ('$username', '$password')";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["message" => "User added"]);
} else {
    echo json_encode(["message" => "Error: " . $conn->error]); // show actual DB error
}

$conn->close();
?>
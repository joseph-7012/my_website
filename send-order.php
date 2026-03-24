<?php
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'] ?? '';
$phone = $data['phone'] ?? '';
$order = $data['order'] ?? '';

// simulate processing delay (optional, feels real)
sleep(1);

echo json_encode([
  "success" => true,
  "message" => "Order placed successfully",
  "data" => [
    "name" => $name,
    "phone" => $phone,
    "order" => $order
  ]
]);
?>
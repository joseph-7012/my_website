<?php
$host = "sql313.infinityfree.com";  // Your InfinityFree MySQL host
$user = "if0_41448478";                  // Your InfinityFree MySQL username
$password = "3HcnZZWBkBrL";              // Your MySQL password
$database = "if0_41448478_testdb";                // Your database name
$conn = new mysqli($host, $user, $password, $database);

$port = 3306;
$conn = new mysqli($host, $user, $password, $database, $port);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
?>
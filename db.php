<?php
session_start();

$host = 'localhost';
$db = 'emergency_waitlist';
$user = 'shan';
$pass = 'your_password';
$charset = 'utf8mb4';

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

$dsn = "pgsql:host=$host;dbname=postgres";

try {
    $conn = new PDO($dsn, $user, $pass, $options);

    if (!databaseExists($conn, $db)) {
        $conn->exec("CREATE DATABASE $db");
    }

    $dsn = "pgsql:host=$host;dbname=$db";
    $conn = new PDO($dsn, $user, $pass, $options);

    if (!isset($_SESSION['db_initialized']) || !$_SESSION['db_initialized']) {
        executeSQLFile($conn, 'public/db/schema.sql');
        executeSQLFile($conn, 'public/db/seed.sql');
        $_SESSION['db_initialized'] = true;
    }
} catch (PDOException $e) {
    error_log("Database connection error: " . $e->getMessage());
    echo json_encode(['success' => false, 'error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

function databaseExists($conn, $dbname) {
    $stmt = $conn->prepare("SELECT 1 FROM pg_database WHERE datname = :dbname");
    $stmt->execute(['dbname' => $dbname]);
    return $stmt->fetch() !== false;
}

function executeSQLFile($conn, $filePath) {
    $sql = file_get_contents($filePath);
    $conn->exec($sql);
}
?>

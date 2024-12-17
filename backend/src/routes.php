<?php
function handleRequest($method, $uri) {
    switch ($uri) {
        case '/api/login':
            if ($method === 'POST') {
                // Handle login logic
                echo json_encode(['message' => 'Login successful']);
            }
            break;

        case '/api/register':
            if ($method === 'POST') {
                // Handle registration logic
                $input = json_decode(file_get_contents('php://input'), true);
                
                // Validate input data
                if (isset($input['name'], $input['email'], $input['password'], $input['userType'])) {
                    $name = $input['name'];
                    $email = $input['email'];
                    $password = password_hash($input['password'], PASSWORD_BCRYPT);
                    $userType = $input['userType'];

                    // Insert into database
                    require_once 'Database.php';
                    $database = new Database();
                    $db = $database->getConnection();

                    $query = "INSERT INTO users (name, email, password, user_type) VALUES (:name, :email, :password, :userType)";
                    $stmt = $db->prepare($query);
                    $stmt->bindParam(':name', $name);
                    $stmt->bindParam(':email', $email);
                    $stmt->bindParam(':password', $password);
                    $stmt->bindParam(':userType', $userType);

                    if ($stmt->execute()) {
                        echo json_encode(['message' => 'Registration successful']);
                    } else {
                        echo json_encode(['message' => 'Registration failed']);
                    }
                } else {
                    echo json_encode(['message' => 'Invalid input']);
                }
            }
            break;

        // Add more routes as needed

        default:
            http_response_code(404);
            echo json_encode(['message' => 'Not Found']);
            break;
    }
} 
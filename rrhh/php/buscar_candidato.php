<?php
require_once('config.php'); // Archivo para configuración de la conexión
$conexion = obtenerConexion(); // Función que devuelve la conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_candidato = $_GET['id_candidato'] ?? null; // Obtener el parámetro id_candidato

    if ($id_candidato) {
        // Consulta para buscar el candidato por ID
        $sql = "SELECT * FROM Candidatos WHERE id_candidato = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param('i', $id_candidato); // Usamos 'i' para asegurar que es un entero
        $stmt->execute();
        $resultado = $stmt->get_result();

        // Verificar si el candidato existe
        if ($candidato = $resultado->fetch_assoc()) {
            responder($candidato, true, "Candidato encontrado", $conexion);
        } else {
            responder(null, false, "No se encontró el candidato", $conexion);
        }
    } else {
        responder(null, false, "El ID del candidato es requerido", $conexion);
    }
} else {
    responder(null, false, "Método no permitido", $conexion);
}

?>

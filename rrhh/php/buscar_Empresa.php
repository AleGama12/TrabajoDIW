<?php
require_once('config.php'); // Archivo para configuración de la conexión
$conexion = obtenerConexion(); // Función que devuelve la conexión a la base de datos

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $id_empresa = $_GET['id_empresa'] ?? null; // Obtener el parámetro id_candidato

    if ($id_empresa) {
        // Consulta para buscar el candidato por ID
        $sql = "SELECT * FROM Empresas WHERE id_empresa = ?";
        $stmt = $conexion->prepare($sql);
        $stmt->bind_param('i', $id_empresa); // Usamos 'i' para asegurar que es un entero
        $stmt->execute();
        $resultado = $stmt->get_result();

        // Verificar si el candidato existe
        if ($empresa = $resultado->fetch_assoc()) {
            responder($empresa, true, "Empresa encontrada", $conexion);
        } else {
            responder(null, false, "No se encontró la empresa", $conexion);
        }
    } else {
        responder(null, false, "El ID de la empresa es requerido", $conexion);
    }
} else {
    responder(null, false, "Método no permitido", $conexion);
}

?>

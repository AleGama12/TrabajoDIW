<?php
// Incluir la configuración de la base de datos
require_once('config.php');

// Obtener la conexión a la base de datos
$conexion = obtenerConexion(); // Función que devuelve la conexión a la base de datos

// Verificar si la conexión fue exitosa
if ($conexion->connect_error) {
    die("Conexión fallida: " . $conexion->connect_error);
}

// Establecer la cabecera para enviar datos en formato JSON
header('Content-Type: application/json');

try {
    // Obtener el valor de experiencia mínima desde la solicitud POST
    $experienciaMinima = isset($_POST['txtExperiencia']) ? (int) $_POST['txtExperiencia'] : 0;

    // Consulta SQL para obtener los candidatos con la experiencia mínima
    $query = "SELECT id_candidato, nombre, experiencia, contacto, direccion FROM Candidatos WHERE experiencia >= ?";

    // Intentar preparar la consulta
    if ($stmt = $conexion->prepare($query)) {
        // Vincular el parámetro
        $stmt->bind_param('i', $experienciaMinima);

        // Ejecutar la consulta
        $stmt->execute();

        // Vincular los resultados
        $stmt->bind_result($id_candidato, $nombre, $experiencia, $contacto, $direccion);

        // Inicializar un array para almacenar los resultados
        $resultados = [];

        // Recorrer los resultados y agregarlo al array
        while ($stmt->fetch()) {
            $resultados[] = [
                'id_candidato' => $id_candidato,
                'nombre' => $nombre,
                'experiencia' => $experiencia,
                'contacto' => $contacto,
                'direccion' => $direccion
            ];
        }

        // Devolver los resultados en formato JSON
        echo json_encode($resultados);

        // Cerrar la declaración
        $stmt->close();
    } else {
        // Si no se pudo preparar la consulta, capturamos el error
        echo json_encode([
            "ok" => false,
            "mensaje" => "Error al preparar la consulta: " . $conexion->error
        ]);
    }

} catch (Exception $e) {
    // Captura de errores generales
    echo json_encode([
        "ok" => false,
        "mensaje" => $e->getMessage()
    ]);
} finally {
    // Cerrar la conexión
    $conexion->close();
}
?>

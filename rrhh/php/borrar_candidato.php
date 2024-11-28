<?php

require_once('config.php');
$conexion = obtenerConexion();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_candidato = $_POST['id_candidato'] ?? null;

    if ($id_candidato) {
        $sql = "DELETE FROM Candidatos WHERE id_candidato = ?";

        if ($stmt = $conexion->prepare($sql)) {
            $stmt->bind_param('s', $id_candidato);

            if ($stmt->execute()) {
                echo json_encode([
                    'ok' => true,
                    'mensaje' => 'Candidato borrado correctamente'
                ]);
            } else {
                echo json_encode([
                    'ok' => false,
                    'mensaje' => 'Error al borrar el candidato: ' . $stmt->error
                ]);
            }
        } else {
            echo json_encode([
                'ok' => false,
                'mensaje' => 'Error al preparar la consulta'
            ]);
        }
    } else {
        echo json_encode([
            'ok' => false,
            'mensaje' => 'Faltan datos para realizar el borrado'
        ]);
    }
} else {
    echo json_encode([
        'ok' => false,
        'mensaje' => 'Método no permitido'
    ]);
}
?>
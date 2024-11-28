<?php

require_once('config.php');
$conexion = obtenerConexion();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $id_empresa = $_POST['id_empresa'] ?? null;

    if ($id_empresa) {
        $sql = "DELETE FROM Empresas WHERE id_empresa = ?";

        if ($stmt = $conexion->prepare($sql)) {
            $stmt->bind_param('s', $id_empresa);

            if ($stmt->execute()) {
                echo json_encode([
                    'ok' => true,
                    'mensaje' => 'Empresa borrada correctamente'
                ]);
            } else {
                echo json_encode([
                    'ok' => false,
                    'mensaje' => 'Error al borrar la empresa: ' . $stmt->error
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
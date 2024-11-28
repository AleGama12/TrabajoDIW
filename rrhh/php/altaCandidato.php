<?php
header("Access-Control-Allow-Origin: *");  // Permite todos los orígenes
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization");  // Encabezados permitidos


include_once("config.php"); // Incluye el archivo para obtener conexión a la base de datos.
$conexion = obtenerConexion(); // Obtiene la conexión a la base de datos.

// Recoger datos JSON enviados mediante POST.
$candidato = json_decode($_POST['candidatos']);

// Preparar la consulta de inserción.
$sql = "INSERT INTO Candidatos (nombre, experiencia, contacto, direccion) 
        VALUES ('$candidato->nombre', $candidato->experiencia, $candidato->contacto, '$candidato->direccion');";

// Ejecutar la consulta.
mysqli_query($conexion, $sql);

// Verificar si hubo un error durante la ejecución.
if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    // Prototipo de función responder($datos, $ok, $mensaje, $conexion)
    responder(null, false, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo de función responder($datos, $ok, $mensaje, $conexion)
    responder(null, true, "Se ha insertado el candidato correctamente", $conexion);
}
?>

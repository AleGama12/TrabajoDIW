<?php
include_once("config.php");
$conexion = obtenerConexion();

// Recoger datos
$candidatos = json_decode($_POST['candidatos']);

$sql = "UPDATE Candidatos
SET nombre = '" . $candidatos->nombre . "', 
experiencia = '" .  $candidatos->experiencia . "', 
direccion = $candidatos->direccion, 
contacto = $candidatos->contacto 
WHERE id_candidato = $candidatos->id_candidato ";

mysqli_query($conexion, $sql);

if (mysqli_errno($conexion) != 0) {
    $numerror = mysqli_errno($conexion);
    $descrerror = mysqli_error($conexion);

    responder(null, true, "Se ha producido un error número $numerror que corresponde a: $descrerror <br>", $conexion);

} else {
    // Prototipo responder($datos,$error,$mensaje,$conexion)
    responder(null, false, "Se ha modificado el componente", $conexion);
}
?>

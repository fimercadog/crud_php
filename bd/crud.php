<?php
include_once '../bd/conexion.php';
$objeto = new Conexion();
$conexion = $objeto->Conectar();

// Recepción de los datos enviados mediante POST desde el JS   

$nombre = (isset($_POST['nombre'])) ? $_POST['nombre'] : '';
$pais = (isset($_POST['pais'])) ? $_POST['pais'] : '';
$edad = (isset($_POST['edad'])) ? $_POST['edad'] : '';
$opcion = (isset($_POST['opcion'])) ? $_POST['opcion'] : '';
$idpersona = (isset($_POST['idpersona'])) ? $_POST['idpersona'] : '';

$consulta = "INSERT INTO personas (nombre, pais, edad) VALUES('$nombre', '$pais', '$edad') ";			
$resultado = $conexion->prepare($consulta);
$resultado->execute(); 

$consulta = "SELECT idpersona, nombre, pais, edad FROM personas ORDER BY idpersona DESC LIMIT 1";
$resultado = $conexion->prepare($consulta);
$resultado->execute();
$data=$resultado->fetchAll(PDO::FETCH_ASSOC);

print json_encode($data, JSON_UNESCAPED_UNICODE); //enviar el array final en formato json a JS
$conexion = NULL;

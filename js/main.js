$(document).ready(function() {
    tablaPersonas = $('#tablaPersonas').DataTable({
        "columnDefs": [{
            "targets": -1,
            "data": null,
            "defaultContent": "<div class='text-center'><div class='btn-group'><button class='btn btn-primary btnEditar'>Editar</button><button class='btn btn-danger btnBorrar'>Borrar</button></div></div>"
        }],
        //para cambiar el lenguaje a español
        "language": {
            "lengthMenu": "Mostrar _MENU_ registros",
            "zeroRecords": "No se encontraron resultados",
            "info": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
            "infoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
            "infoFiltered": "(filtrado de un total de _MAX_ registros)",
            "sSearch": "Buscar:",
            "oPaginate": {
                "sFirst": "Primero",
                "sLast": "Último",
                "sNext": "Siguiente",
                "sPrevious": "Anterior"
            },
            "sProcessing": "Procesando...",
        }
    });
    $("#btnNuevo").click(function() {
        $("#formPersonas").trigger("reset");
        $(".modal-header").css("background-color", "#28a745");
        $(".modal-header").css("color", "white");
        $(".modal-title").text("Nueva Persona");
        $("#modalCRUD").modal("show");
        idpersona = null;


        $("#modalCRUD").modal("show");
    });

    $("#formPersonas").submit(function(e) {
        e.preventDefault();
        nombre = $.trim($("#nombre").val());
        pais = $.trim($("#pais").val());
        edad = $.trim($("#edad").val());
        $.ajax({
            url: "bd/crud.php",
            type: "POST",
            dataType: "json",
            data: { nombre: nombre, pais: pais, edad: edad, idpersona: idpersona },
            success: function(data) {
                console.log(data); //debug
                idpersona = data[0].idpersona;
                nombre = data[0].nombre;
                pais = data[0].pais;
                edad = data[0].edad;
                tablaPersonas.row.add([idpersona, nombre, pais, edad]).draw();
            }
        });
        $("#modalCRUD").modal('hide');
    });
});
var UsuarioActual = jQuery.parseJSON(sessionStorage.getItem('user'));

$('#IniciarSesion').click(function (event) {
    event.preventDefault();
    alerta = '';
    data = {
        username: $('#usuario').val(),
        clave: $('#pass').val()
    };
    alert('Usuario Valido');

    // alert(JSON.stringify(data));
    $.post('../../ApiREST/UsuariosCtrl/Logear',
        { datos: data },
        function (res) {
            if (res.estado == 1) {
                alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
                alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                alerta += res.mensaje + '</div>';
                sessionStorage.setItem('user', JSON.stringify(res.usuario));
                Recargar("../../FrontEnd/PanelControl/");
            } else {
                alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
                alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                alerta += res.mensaje + '</div>';
            }
            $('#alertas').html('');
            $('#alertas').append(alerta);
        }
    );
});


$('#CrearNuevoUser').click(function (event) {
    event.preventDefault();
    if (!($('#user').val() == '' || $('#passs').val() == '')) {
        alerta = '';
        data = {
            username: $('#user').val(),
            clave: $('#passs').val(),
            estado: $('#estado').val(),
            rol: $('#rol').val()
        };

        $.post('../../ApiREST/UsuariosCtrl/Registrar',
            { datos: data },
            function (res) {
                if (res.estado == 1) {
                    alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
                    alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                    alerta += res.mensaje + '</div>';
                } else {
                    alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
                    alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
                    alerta += res.mensaje + '</div>';
                }
                $('#alertass').append(alerta);
            }
        );
    }
});
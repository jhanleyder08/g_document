function listarUsers(){
	$.post('../../ApiREST/UsuariosCtrl/Listar',
		{datos: null},
		function(data) {
            // alert(JSON.stringify(data));
			if(data.estado == 1){
				$('#users').html('');
				Usuarios = data.lusuarios;
				$.each(Usuarios, function(index, val) {
					cade = '';
					cade += '<tr class="white">';
					cade += '<td>'+val.lis_usuario+'</td>';
					if(val.lis_rol == 1)
						cade += '<td>Super Administrador</td>';
					else
						cade += '<td>Administrador</td>';
					if(val.lis_estado == 1)
						cade += '<td class="edit" onclick="DesactivarUser('+index+')"><span class="glyphicon glyphicon-ok"></span> Activo</td>';
					else
						cade += '<td class="edit" onclick="ActivarUser('+index+')"><span class="glyphicon glyphicon-remove"></span> Inactivo</td>';
					cade += '<td class="edit" onclick="EditarUser('+index+')"><center><span class="glyphicon glyphicon-pencil"></span></center></td>';
					cade +='</tr>';
					$('#users').append(cade);
				});
			}
		}
	);
}

function DesactivarUser (index){
	datos = {
		username : Usuarios[index].lis_usuario,
		clave    : Usuarios[index].lis_clave,
		estado   : 2,
		rol      : Usuarios[index].lis_rol
	}
	ActualizarUser(datos);
}

function ActivarUser(index) {
	datos = {
		username : Usuarios[index].lis_usuario,
		clave    : Usuarios[index].lis_clave,
		estado   : 1,
		rol      : Usuarios[index].lis_rol
	}
	ActualizarUser(datos);
}

function ActualizarUser(datos){
	alerta = '';
	$.post('../../ApiREST/UsuariosCtrl/Actualizar', 
			{datos: datos}, 
			function(data) {
				if(data.estado == 1){
					alerta = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.mensaje+'</div>';
					$('#CrearNuevoUser').addClass('hidden');
					listarUsers();
				}else{
					alerta = '<div class="alert alert-danger alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.mensaje+'</div>';
				}

				$('#alertas_usuarios').html(alerta);
			}
		);
}

$('#agregarUser').click(function(event) {
	$('#CrearNuevoUser').removeClass('hidden');
	$('#EditarUser').addClass('hidden');
});

$('#CancelarCrearUser').click(function(event) {
	$('#CrearNuevoUser').addClass('hidden');
});

$('#CrearNuevoUser').submit(function (event) {
	if (!($('#user').val() == '' || $('#pass').val() == '')) {
		var alerta = '';
		var datos = {
			username : $('#user').val(),
			clave    : $('#pass').val(),
			estado   : $('#estado').val(),
			rol      : $('#rol').val()
		};
		$.post('../../ApiREST/UsuariosCtrl/Registrar', 
			{datos: datos}, 
			function(data) {
				if(data.estado == 1){
					alerta  = '<div class="alert alert-success alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.mensaje+'</div>';
					$('#CrearNuevoUser').addClass('hidden');
					listarUsers();
				}else{
					alerta  = '<div class="alert alert-danger alert-dismissible" role="alert">';
					alerta += '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
					alerta += data.mensaje+'</div>';
				}

				$('#alertas_usuarios').html(alerta);
			}
		);
		
		return false;
	}
});

function EditarUser(index) {
	$('#EditarUser').removeClass('hidden');
	$('#CrearNuevoUser').addClass('hidden');

	$('#edituser').val(Usuarios[index].lis_usuario);
	$('#Editpass').val(Usuarios[index].lis_clave);
	$('#Editrol').val(Usuarios[index].lis_rol);
	$('#Editestado').val(Usuarios[index].lis_estado);
}

$('#EditarUser').submit(function (event) {
	if(!($('#edituser').val() == '' || $('#editpass').val() == '' )){
		datos = {
			username : $('#edituser').val(),
			clave    : $('#editpass').val(),
			estado   : $('#editestado').val(),
			rol      : $('#editrol').val()
		}
		ActualizarUser(datos);

		$('#EditarUser').addClass('hidden');
		return false;
	}
});
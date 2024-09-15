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
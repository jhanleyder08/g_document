<?php
	/*
	* Cargamos la conexión unicamente se raliza en este archivo ya que sera el primero en cargar * el index
	*/
	require_once 'Datos/ConexionDB.php';

    class UsuariosCtrl
    {
        public $respuesta = null;
        private static $pdofull;

        function __construct($peticion)
        {
            self::$pdofull = ConexionDB::obtenerInstancia()->obtenerDB();
            switch ($peticion[0]) {
                case 'Listar':
                    return self::Listar($this);
                    break;
                case 'Registrar':
                    return self::Registrar($this);
                    break;
                case 'Actualizar':
                     return self::Actualizar($this);
                    break;
                case 'Logear':
                    return self::Logear($this);
                    break;
                default:
                    $this->repuesta = array(
                        'estado' => 2,
                        'mensaje' => 'No se reconoce el metodo del recurso'
                    );
            }
        }

        private static function Logear($obj)
        {
            $usuario     = $_POST['datos'];
            $consultaSQL = "SELECT u.usuario, u.estado FROM usuarios AS u where u.usuario = '" 
                           . $usuario['username'] . "' AND u.clave = '" . $usuario['clave'] . "' AND u.estado = 1";
            
            $sentencia   = self::$pdofull->prepare($consultaSQL);
            
            if ($sentencia->execute()) {
                $resultado = $sentencia->fetchAll( PDO::FETCH_ASSOC);
                if ($resultado) {
                    $obj->respuesta = array(
                            'estado'  => 1,
                            'mensaje' => "Bienvenid@",
                            'usuario' => $resultado
                    );
                } else {
                    $obj->respuesta = array(
                        'estado'  => 2,
                        "mensaje" => "Error en la verificación de credenciales"
                    );
                }
            } else {
                $obj->respuesta = null;
            }
        }
        
        private static function Registrar($obj) 
        {
            $usuario                   = $_POST['datos'];
            $validar_usuarios          = "SELECT u.usuario, u.clave, u.rol, u.estado FROM usuarios AS u where u.usuario = '" . $usuario['username'] . "';";
            $sentencia_validar_usuario = Self::$pdofull->prepare($validar_usuarios);
            if ($sentencia_validar_usuario->execute()) {
                $resultado_validar_usuario = $sentencia_validar_usuario->fetch(PDO::FETCH_OBJ);
                if ($resultado_validar_usuario) {
                    $obj->respuesta = array(
                        'estado'  => 2,
                        "mensaje" => "Error el usuario ya esta registrado..."
                    );
                } else {
                    $insertar  = "INSERT INTO usuarios (usuarios.usuario, usuarios.clave, usuarios.rol,  usuarios.estado) values (?,?,?,?)";
                    $sentencia = $pdo->prepare($insertar);
                    $sentencia->bindParam( 1, $usuario['username']);
                    $sentencia->bindParam( 2, $usuario['clave']);
                    $sentencia->bindParam( 3, $usuario['rol']);
                    $sentencia->bindParam( 4, $usuario['estado']);
                    
                    $resultado = $sentencia->execute();
                    if ($resultado) {
                        $obj->respuesta = array(
                            'estado'  => 1,
                            "mensaje" => "Usuario creado correctamente..."
                        );
                    }
                }
            } else {
                $obj->respuesta = array(
                    'estado'  => 3,
                    "mensaje" => "Error Inesperado..."
                );
            }
        }
        private static function Listar($obj)
        {
            $consulta = "SELECT
                        usuarios.usuario as lis_usuario,
                        usuarios.clave as lis_clave,
                        usuarios.rol as lis_rol,
                        usuarios.estado as lis_estado
                        FROM
                        usuarios";
            
            $sentencia = self::$pdofull->prepare($consulta);

            if ($sentencia->execute()){
                $resultado = $sentencia->fetchAll(PDO::FETCH_ASSOC);
                if ($resultado){
                    $obj->respuesta = array(
                        "estado"    => 1,
                        "lusuarios" => $resultado
                    );
                } else {
                    $obj->respuesta = null;
                }
            } else {
                $obj->respuesta = null;
            }
        }

		private static function Actualizar($obj){
			$usuario = $_POST['datos'];
			$comando = "UPDATE usuarios SET usuarios.Clave = ?, usuarios.Estado=?, usuarios.Rol = ? WHERE usuarios.Usuario = ?";
			$sentencia = Self::$pdofull->prepare ( $comando );
			$sentencia->bindParam ( 1, $usuario['clave'] );
			$sentencia->bindParam ( 2, $usuario['estado'] );
			$sentencia->bindParam ( 3, $usuario['rol'] );
			$sentencia->bindParam ( 4, $usuario['username'] );

			$resultado = $sentencia->execute ();
			if($resultado){
				$obj->respuesta = array(
						"estado" =>1,
						"mensaje"=>"Usuario Actualizado Con Exito"
					);
			}
		}        
    }
var ControlUsers = false;

var UsuarioActual = jQuery.parseJSON(sessionStorage.getItem('user'));

$('#CerrarSesion').click(function(event) {
    sessionStorage.removeItem('user');
    Recargar("../../FrontEnd/PanelControl/");
});


$('#ControlPanelUser').click(function(event) {
	if(!ControlUsers){
		$('#n_img').addClass('hidden');
		listarUsers();
		ControlUsers = true;
	}else{
		ControlUsers = false;
	}
});


jQuery(document).ready(function(){
    $(".oculto").hide();              
      $(".inf").click(function(){
            var nodo = $(this).attr("href");  
   
            if ($(nodo).is(":visible")){
                 $(nodo).hide();
                 return false;
            }else{
          $(".oculto").hide("slow");                             
          $(nodo).fadeToggle("fast");
          return false;
            }
      });
  });

  jQuery(document).ready(function(){
    $('.date').datetimepicker({
        format: 'YYYY-MM-DD'
    });
});
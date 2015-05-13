 var path_query="http://obvii.net/obvii/assisapp/query.php";
var MK_INTERNET=0;

var MSG_OFFLINE="No hay disponible coneccion a Internet. Algunas opciones seran limitadas";
var MSG_USER_NO="Usuario Invalido";
var MSG_NOTARJETA="Tarjeta no valida";
var MSG_SESION=false;

var CONF_FOTO=false;
var CONF_TIPO_ASIS=0;
var CONF_ASIS=false;
var CONF_TIPO_COLACION=0;
var CONF_COLACION=false;
var CONF_OFFLINE=true;
			

var path_upload="http://obvii.net/obvii/assisapp/uploadb.php";

var MK_PHOTO="";
var ASS_DATO="";
var ASS_TARJETA=0;
var ASS_USUARIO=0;
var ASS_TIPO=0;
var ASS_FILE="";


function openPopstatic(contenido)
{
	$("#cont_static").html(contenido);
	$("#myPopup_static").popup("open");
}
function inicio()
{
	
	var user=$.trim(document.getElementById("user").value);
	var clave=$.trim(document.getElementById("clave").value);
	if(user!="" && clave!="")
	{
		
		if(MK_INTERNET)
		{
			
			$.mobile.loading( 'show', {
					text: 'Validando',
					textVisible: true,
					theme: 'a',
					html: ""
				});
				
			$("#output").load(path_query, 
				{tipo:5, user:user, clave:clave} 
					,function(){	
				
					}
					);
		
		}else
			{
				for(i=0;i< USER_NAME.length;i++)
				{
					alert(USER_NAME[i]);
				}
				openPopstatic(MSG_OFFLINE);		
			}	
		
	}else
	{
		openPopstatic("Debe ingresar credenciales validas.");		
	}
}
function validar(id_usuario,nombre)
{
	
	var tipo_us=0;
	if(id_usuario==0)
	{
		tipo_us=1;
		id_usuario=document.getElementById("user").value;
		$("#output").load(path_query, 
			{tipo:10, codigo:id_usuario} 
				,function(){						
					
					
				}
	);
	}else
		{
	
			var texto="Bienvenido Usuario: <br><strong>"+nombre+"</strong><br>Seleccione una opci&oacute;n</hr><br><br>";
			texto +="<input type='button' value='Asistencia' class=bottom_coment onclick='loadAsistencia("+tipo_us+","+id_usuario+");'><br>";
			if(CONF_COLACION=='t')
			{
				texto +="<input type='button' value='Colacion' class=bottom_coment onclick='loadColacion("+tipo_us+","+id_usuario+");'><br>";
			}
			
			openPopstatic(texto);		
	}
}
function loadColacion(tipo_us,id_usuario)
{
	var texto="Marca para Colaci&oacute;n!<br><br>Seleccione una opci&oacute;n</hr><br><br>";
	texto +="<input type='button' value='Entrada' class=bottom_coment onclick='marcaColacion(0,"+tipo_us+","+id_usuario+");'><br>";
	texto +="<input type='button' value='Salida' class=bottom_coment onclick='marcaColacion(1,"+tipo_us+","+id_usuario+");'><br>";
	openPopstatic(texto);		
}
function loadAsistencia(tipo_us,id_usuario)
{
	
	var texto="Marca para Asistencia!<br><br>Seleccione una opci&oacute;n</hr><br><br>";
	texto +="<input type='button' value='Entrada' class=bottom_coment onclick='marcaAsistencia(0,"+tipo_us+","+id_usuario+");'><br>";
	texto +="<input type='button' value='Salida' class=bottom_coment onclick='marcaAsistencia(1,"+tipo_us+","+id_usuario+");'><br>";
	openPopstatic(texto);		
}
function marcaColacion(tipo,tipo_us,id_usuario)
{
	ASS_USUARIO=id_usuario;
  ASS_TIPO=tipo_us;  
  ASS_MARCA=tipo;
  ASS_TIPO_MARCA=2;
  if(CONF_FOTO)
  {
		getImage();
	}else
	{
		 $("#output").load(path_query, 
					{tipo:9, usuario:ASS_USUARIO, tipo_us:ASS_TIPO, tipo_marca:ASS_TIPO_MARCA, marca:ASS_MARCA,archivo:ASS_FILE} 
						,function(){						
							
					
					}
					);
	}
	
	
}
function marcaAsistencia(tipo,tipo_us,id_usuario)
{
	ASS_USUARIO=id_usuario;
  ASS_TIPO=tipo_us;
  ASS_MARCA=tipo;
  ASS_TIPO_MARCA=1;
	if(CONF_FOTO)
  {
		getImage();
	}else
	{
		 $("#output").load(path_query, 
					{tipo:9, usuario:ASS_USUARIO, tipo_us:ASS_TIPO, tipo_marca:ASS_TIPO_MARCA, marca:ASS_MARCA,archivo:ASS_FILE} 
						,function(){						
							
					
					}
					);
	}
	
	
}
function mensaje(texto,div)
{
	$( "#"+div ).html("<p>"+ texto+"</p>" );
                  $("#"+div).popup("close");
                  $("#"+div).popup("open");
}
function hideMensaje(div)
{
	  $("#"+div).popup("close");
}
function loadMenu()
{
	
	$("#menu_footer").load(path_query, 
			{tipo:2} 
				,function(){				
					
					$('#menu_footer').trigger('create');
					
				}
			);
}
function deviceListo()
{
	 loadBD();
	 pictureSource = navigator.camera.PictureSourceType;
   destinationType = navigator.camera.DestinationType;
   selectUserBDlocal();
   
   if(MK_INTERNET)
		{
			
			$("#output").load(path_query, 
			{tipo:6} 
				,function(){
		
					$('#output').trigger('create');	
					$.mobile.loading( 'hide');						
					
					
					
				}
			);
		}else
			{
				$("#contenido_sesion").load("login_offline.html", 
				{} 
					,function(){				
						
						$('#contenido_sesion').trigger('create');
						
					}
				);
		
				openPopstatic(MSG_OFFLINE);	
			}
			
}
function loadInitAdmin()
{
	if(MK_INTERNET)
		{
			$("#contenido_sesion").load(path_query, 
			{tipo:4} 
				,function(){			
					$('#contenido_sesion').trigger('create');	
					
					
				}
			);
		}else
			{
				openPopstatic(MSG_OFFLINE);	
			}
}
function volver()
{
	
	history.go(-1);
}
function inicioAdmin()
{
	var user=document.getElementById("user2").value;
  var clave=document.getElementById("clave2").value;
        	
		$("#contenido_sesion").load(path_query, 
			{tipo:3, user:user, clave:clave} 
				,function(){				
					
					$('#contenido_sesion').trigger('create');
					
				}
			);
	
}
function online()
{
	
	if(!MK_INTERNET)
	{
		//alert("cambio de condicion online a online");
	}
	MK_INTERNET=true;
}
function offline()
{
	if(MK_INTERNET)
	{
		
		openPopstatic(MSG_OFFLINE);
		//alert("cambio de condicion online a offline");
		var valida=false;
		for(i=0;i<USER_ESTADO.length;i++)
		{
			
			if(USER_ESTADO[i]=="0")
			{
				valida=true;
			}
		}
		if(valida)
		{
			$("#contenido_sesion").load("inicio_offline.html", 
			{} 
				,function(){				
					
					$('#contenido_sesion').trigger('create');
					
				}
			);
		}else
			{
				$("#contenido_sesion").load("login_offline.html", 
			{} 
				,function(){				
					
					$('#contenido_sesion').trigger('create');
					
				}
			);
			}
	}
	MK_INTERNET=false;
	
}
function salirAdmin()
{
	window.location="index.html";
}
function getImage() {

            // Retrieve image file location from specified source
           navigator.camera.getPicture(uploadPhoto, fail, {
        			quality: 100,
        			destinationType: destinationType.FILE_URI,
        			cameraDirection: navigator.camera.Direction.FRONT 
    			});

        }
        
        function uploadPhoto(imageURI) {
        	$.mobile.loading( 'show', {
				text: 'Marcando',
				textVisible: true,
				theme: 'a',
				html: ""
			});
        	
        	//openPopstatic("Imagen almacenada!<br>");
        	 //var photo = document.getElementById('photo');    
      		 //photo.src = "data:image/jpeg;base64," + imageURI;  
      		 newDate=new Date();
        	 ASS_FILE=ASS_USUARIO+"_"+newDate.getMinutes()+""+newDate.getSeconds();
        	 uploadPhoteServer(ASS_FILE,imageURI);
            
        }
				function uploadPhoteServer(nomFile,imageURI)
				{
					//var imageURI=document.getElementById("photo").src;
        	  //alert(imageURI);
            var options = new FileUploadOptions();
            options.fileKey="i_file";
            options.fileName=imageURI.substr(imageURI.lastIndexOf('/')+1);
            options.mimeType="image/jpeg";
						
            var params = new Object();
            params.names = nomFile;
            params.value2 = "param";
						
            options.params = params;
            options.chunkedMode = false;

            var ft = new FileTransfer();
            
            ft.upload(imageURI, path_upload, win, fail, options,true);
				}
        function win(r) {
            
            $("#output").load(path_query, 
					{tipo:9, usuario:ASS_USUARIO, tipo_us:ASS_TIPO, tipo_marca:ASS_TIPO_MARCA, marca:ASS_MARCA,archivo:ASS_FILE} 
						,function(){						
							
					
					}
					);
						
            //alert("Envio");
            
        }

        function fail(error) {
        	$.mobile.loading( 'hide');
            //alert("fallo");
        }
       
        function calcNumero(numero)
        {         
        	valor=document.getElementById("user").value;
        	valor=valor+""+numero+"";
        	document.getElementById("user").value=valor;
        }
        function cleanNumero()
        {
        	document.getElementById("user").value="";
        
        }
function loadSesion()
{
	MSG_SESION=false;
	$("#contenido_sesion").load(path_query, 
			{tipo:7} 
				,function(){				
					
					$('#contenido_sesion').trigger('create');
					
				}
			);
}
function leeMF(datos)
{
	//alert("paso::"+datos);
	ASS_DATO=datos;
	
}

function noleeMF()
{
	//alert("Nopaso");
}
function onNfc(nfcEvent)
{
	
	var tag = nfcEvent.tag;      
  ASS_TARJETA=nfc.bytesToHexString(tag.id);  
  nfc.readMifareSecBloc(1,1,validaRut,noleeMF);
  
  
}
function validaRut(dato)
{
	$("#output").load(path_query, 
			{tipo:8, rut:dato, tarjeta:ASS_TARJETA} 
				,function(){						
					
					
				}
	);
}
function failure()
{
	alert("fallo");
}
function onNdef()
{
	alert("onNdef");
}  
function salir()
{
	$("#output").load(path_query, 
			{tipo:11} 
				,function(){						
					window.location="index.html";
					
				}
	);
}

 function volverInicio()
        {
        
        	$("#contenido_sesion").load(path_query, 
					{tipo:1} 
						,function(){	
							$('#contenido_sesion').trigger('create');
							$.mobile.loading( 'hide');										
							loadMenu();
						}
						);
        }
var path_query="http://obvii.net/obvii/assisapp/query.php";

var path_interno="";
var tipo_cliente="";
var MK_INTERNET=100;

var MSG_OFFLINE="No hay disponible coneccion a Internet. Algunas opciones seran limitadas";
var MSG_USER_NO="Usuario Invalido";
var MSG_NOTARJETA="Tarjeta no valida";
var MSG_SESION=false;
var MODO_ADMIN=false;
var MODO_ENROLAR=false;

var CONF_MAIL="";
var CONF_FOTO=false;
var CONF_TIPO_ASIS=0;
var CONF_ASIS=false;
var CONF_TIPO_COLACION=0;
var CONF_COLACION=false;
var CONF_OFFLINE=true;
var ASS_DATA_MIFARE=Array();			

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
						selectUserBDlocal();
						selectEmpleadoBDlocal();   
   					selectConfBDlocal();
				
					}
					);
		
		}else
			{
				for(i=0;i< USER_NAME.length;i++)
				{
					if(USER_USER[i]==user && USER_CLAVE[i]==clave)
					{
						MSG_SESION=true;
						
						$("#contenido_sesion").load("inicio_offline.html", 
						{} 
							,function(){				
								
								$('#contenido_sesion').trigger('create');
								
								
							}
						);
					}else
						{
							openPopstatic("Credenciales no validas para modo Offline");		
						}
				}
				if(MSG_SESION)
				{
								nfc.addTagDiscoveredListener(
            		    onNfcOffline,
            		    function() {
            		        alert("Listening for non-NDEF tags.");
            		    },
            		    failure
            		);
				}
				//openPopstatic(MSG_OFFLINE);		
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
	if(MK_INTERNET)
	{
		var texto="Marca para Colaci&oacute;n!<br><br>Seleccione una opci&oacute;n</hr><br><br>";
		texto +="<input type='button' value='Entrada' class=bottom_coment onclick='marcaColacion(0,"+tipo_us+","+id_usuario+");'><br>";
		texto +="<input type='button' value='Salida' class=bottom_coment onclick='marcaColacion(1,"+tipo_us+","+id_usuario+");'><br>";
	}else
		{
			var texto="Marca para Colaci&oacute;n!<br><br>Seleccione una opci&oacute;n</hr><br><br>";
		texto +="<input type='button' value='Entrada' class=bottom_coment onclick='marcaColacionOff(0,"+tipo_us+","+id_usuario+");'><br>";
		texto +="<input type='button' value='Salida' class=bottom_coment onclick='marcaColacionOff(1,"+tipo_us+","+id_usuario+");'><br>";
		}
	openPopstatic(texto);		
}
function loadAsistencia(tipo_us,id_usuario)
{
	if(MK_INTERNET)
	{
		var texto="Marca para Asistencia!<br><br>Seleccione una opci&oacute;n</hr><br><br>";
		texto +="<input type='button' value='Entrada' class=bottom_coment onclick='marcaAsistencia(0,"+tipo_us+","+id_usuario+");'><br>";
		texto +="<input type='button' value='Salida' class=bottom_coment onclick='marcaAsistencia(1,"+tipo_us+","+id_usuario+");'><br>";
	}else
		{
			var texto="Marca para Asistencia!<br><br>Seleccione una opci&oacute;n</hr><br><br>";
			texto +="<input type='button' value='Entrada' class=bottom_coment onclick='marcaAsistenciaOff(0,"+tipo_us+","+id_usuario+");'><br>";
			texto +="<input type='button' value='Salida' class=bottom_coment onclick='marcaAsistenciaOff(1,"+tipo_us+","+id_usuario+");'><br>";
		}
	openPopstatic(texto);		
}
function marcaColacion(tipo,tipo_us,id_usuario)
{
	ASS_USUARIO=id_usuario;
  ASS_TIPO=tipo_us;  
  ASS_MARCA=2;
  ASS_TIPO_MARCA=tipo;
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
  ASS_MARCA=1;
  ASS_TIPO_MARCA=tipo;
  
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
   selectEmpleadoBDlocal();
   selectConfBDlocal();
   
   if(MK_INTERNET)
		{
			selectMarcaBDlocal();
			
				$.mobile.loading( 'show', {
				text: 'Cargando',
				textVisible: true,
				theme: 'a',
				html: ""
			});
			$("#output").load(path_query, 
			{tipo:6} 
				,function(){
		
					$('#output').trigger('create');	
					$.mobile.loading( 'hide');						
					
					
					
				}
			);
		}else
			{
					$.mobile.loading( 'show', {
				text: 'Cargando',
				textVisible: true,
				theme: 'a',
				html: ""
			});
				$("#contenido_sesion").load("login_offline.html", 
				{} 
					,function(){				
						
						$('#contenido_sesion').trigger('create');
						$.mobile.loading( 'hide');	
						
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
        selectMarcaBDlocal();	
		$("#contenido_sesion").load(path_query, 
			{tipo:3, user:user, clave:clave} 
				,function(){				
					
					$('#contenido_sesion').trigger('create');
					
				}
			);
	
}
function online()
{
	
	if(!MK_INTERNET && MK_INTERNET!=100)
	{
		
		$.mobile.loading( 'show', {
				text: 'Cargando',
				textVisible: true,
				theme: 'a',
				html: ""
			});
			$("#output").load(path_query, 
			{tipo:6} 
				,function(){
		
					$('#output').trigger('create');	
					$.mobile.loading( 'hide');						
					
					
					
				}
			);
	}
	MK_INTERNET=true;
}
function offline()
{
	if(MK_INTERNET)
	{
		MK_INTERNET=false;
		openPopstatic(MSG_OFFLINE);
		alert("cambio de condicion online a offline:"+USER_ESTADO.length);
		var valida=false;
		for(i=0;i<USER_ESTADO.length;i++)
		{
			alert(USER_ESTADO[i]);
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
			nfc.addTagDiscoveredListener(
            		    onNfcOffline,
            		    function() {
            		        alert("Listening for non-NDEF tags.");
            		    },
            		    failure
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
	alert("Nopaso");
}
function onNfc(nfcEvent)
{
	
	var tag = nfcEvent.tag;      
  ASS_TARJETA=nfc.bytesToHexString(tag.id); 
 	if(!MODO_ENROLAR)
 	{
  	nfc.readMifareSecBloc(1,1,validaRutMIfare,noleeMF);
  }else
  	{
  		$("#output2").load(path_query, 
			{tipo:13, tarjeta:ASS_TARJETA} 
				,function(){						
					
					
				}
			);
  	}
  
  
}
function onNfcOffline(nfcEvent)
{
	
	var tag = nfcEvent.tag;      
  ASS_TARJETA=nfc.bytesToHexString(tag.id); 
  //alert("offline: "+ASS_TARJETA);
  ASS_DATA_MIFARE=Array();
	nfc.readMifareSecBloc(1,1,obtieneDatos,noleeMF);
	nfc.readMifareSecBloc(1,2,obtieneDatos,noleeMF);
	nfc.readMifareSecBloc(1,3,obtieneDatos,noleeMF);
  nfc.readMifareSecBloc(1,4,obtieneDatos,noleeMF);
  validaTarjetaOffline();
}
function validaTarjetaOffline()
{
	//alert("valida tarjeta"+ASS_TARJETA);
	for(i=0;i<EMPLEADO_TARJETA.length;i++)
	{
		if(EMPLEADO_TARJETA[i]==ASS_TARJETA)
		{
			validarOffline(i);
			break;
		}
	}
}
function obtieneDatos(dato)
{
	ASS_DATA_MIFARE[ASS_DATA_MIFARE.length]=dato;
	
}
function validaRutMIfare(dato)
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
					MSG_SESION=false;				
					window.location="index.html";
					
				}
	);
}

 function volverInicio()
        {
        
				MODO_ADMIN=false;
				MODO_ENROLAR=false;
			
        	$("#contenido_sesion").load(path_query, 
					{tipo:1} 
						,function(){	
							$('#contenido_sesion').trigger('create');
							$.mobile.loading( 'hide');										
							loadMenu();
						}
						);
        }
        
function enrolar()
{
	$("#output2").html("");
	document.getElementById("nombre").value="";
	document.getElementById("app").value="";
	document.getElementById("apm").value="";
	document.getElementById("rut").value="";
	document.getElementById("dv").value="";
	document.getElementById("codigo").value="";
	$.mobile.changePage('#mod_enrolar', { role: 'dialog'});
}
function saveEnrolado()
{
	var nom=$.trim(document.getElementById("nombre").value);
	var app=$.trim(document.getElementById("app").value);
	var apm=$.trim(document.getElementById("apm").value);
	var rt=$.trim(document.getElementById("rut").value);
	var dv=$.trim(document.getElementById("dv").value);
	var cod=$.trim(document.getElementById("codigo").value);
	var slider=document.getElementById("slider2").value;
	valida=true;
	var msg="";
	if(nom=="" || app=="" || apm=="" || rt=="" || dv=="" || cod=="")
	{
		valida=false;
		msg +="Todos los campos son obligatorios.<br>";
	}
	if(!$.isNumeric(rt))
	{
		valida=false;
		msg +="Rut debe ser numerico, sin puntos ni guion.<br>";
	}
	if(!validaRut(rt+"-"+dv) || rt.length < 5)
	{
		valida=false;
		msg +="Rut es invalido.<br>";
	}
	if(valida)
		{
			$.mobile.loading( 'show', {
				text: 'Validando',
				textVisible: true,
				theme: 'a',
				html: ""
			});
			$("#output2").load(path_query, 
					{tipo:12, nom:nom, app:app, apm:apm,rt:rt, dv:dv, codigo:cod,slider:slider} 
						,function(){	
							
							
							
						}
						);
		}else
			{
				mensaje(msg,"myPopup_clave");
			}
}
	function validaRut(rut){
 var suma=0;
 var arrRut = rut.split("-");
 var rutSolo = arrRut[0];
 var verif = arrRut[1];
 var continuar = true;
 for(i=2;continuar;i++){
  suma += (rutSolo%10)*i;
  rutSolo = parseInt((rutSolo /10));
  i=(i==7)?1:i;
  continuar = (rutSolo == 0)?false:true;
 }
 resto = suma%11;
 dv = 11-resto;
 if(dv==10){
  if(verif.toUpperCase() == 'K')
   return true;
 }
 else if (dv == 11 && verif == 0)
  return true;
 else if (dv == verif)
  return true;
 else
  return false;
}

function finEnrolar()
{
	MODO_ENROLAR=false;
	$("#mod_enrolar").dialog( "close" );
}

function sincronizarEmpleados()
{
	
	if(MK_INTERNET)
	{
			$.mobile.loading( 'show', {
				text: 'Sincronizando...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
		
	 	db.transaction(function(tx) {
 			tx.executeSql('DROP TABLE IF EXISTS empleado');
 			
		}, errorCB, successCB);
		$("#output").load(path_query, 
					{tipo:14} 
						,function(){
							$.mobile.loading( 'hide');	
							selectEmpleadoBDlocal();
							openPopstatic("Empleados Sincronizados");	
							
						}
		);
		
	}
}

function validarOffline(id_usuario)
{

	var tipo_us=0;
	if(id_usuario==0)
	{
		tipo_us=1;
		id_usuario=$.trim(document.getElementById("user").value);
		var encontro="NO";
		for(i=0;i<EMPLEADO_ID.length;i++)
		{
			if(EMPLEADO_CODIGO[i]==id_usuario)
			{
				encontro=i;
			}
		}
		
		if(encontro>=0)
		{
			var texto="Bienvenido Usuario: <br><strong>"+EMPLEADO_NAME[encontro]+" "+EMPLEADO_APP[encontro]+" "+EMPLEADO_APM[encontro]+"</strong><br>Seleccione una opci&oacute;n</hr><br><br>";
			texto +="<input type='button' value='Asistencia' class=bottom_coment onclick='loadAsistencia("+tipo_us+","+EMPLEADO_ID[encontro]+");'><br>";
			if(CONF_COLACION=='t')
			{
				texto +="<input type='button' value='Colacion' class=bottom_coment onclick='loadColacion("+tipo_us+","+EMPLEADO_ID[encontro]+");'><br>";
			}
			
			openPopstatic(texto);	
			
		}else
			{
				openPopstatic(MSG_USER_NO);		
			}
		
	}else
		{
			
		
		var encontro=id_usuario;
		
		
		if(encontro>=0)
		{
			var texto="Bienvenido Usuario: <br><strong>"+EMPLEADO_NAME[encontro]+" "+EMPLEADO_APP[encontro]+" "+EMPLEADO_APM[encontro]+"</strong><br>Seleccione una opci&oacute;n</hr><br><br>";
			texto +="<input type='button' value='Asistencia' class=bottom_coment onclick='loadAsistencia("+tipo_us+","+EMPLEADO_ID[encontro]+");'><br>";
			if(CONF_COLACION=='t')
			{
				texto +="<input type='button' value='Colacion' class=bottom_coment onclick='loadColacion("+tipo_us+","+EMPLEADO_ID[encontro]+");'><br>";
			}
			
			openPopstatic(texto);	
			
		}else
			{
				openPopstatic(MSG_USER_NO);		
			}

	}
}
function marcaAsistenciaOff(tipo,tipo_us,id_usuario)
{
	var fec=new Date();
	var mes=fec.getMonth();
	if(mes <10)
	{
		mes++;
		mes="0"+mes;
	}
	var dia=fec.getDate();
	if(dia <10)
	{
		dia="0"+dia;
	}
	var hora=fec.getHours();
	if(hora <10)
	{
		hora="0"+hora;
	}
	var min=fec.getMinutes();
	if(min <10)
	{
		min="0"+min;
	}
	var sec=fec.getSeconds();
	if(sec <10)
	{
		sec="0"+sec;
	}
	var fecha=""+fec.getFullYear()+"-"+mes+"-"+dia+" "+hora+":"+min+":"+sec+"";
	addMarcaBDLocal(id_usuario, fecha, 1, tipo);
	var nombre="";
	for(i=0;i<EMPLEADO_ID.length;i++)
		{
			if(EMPLEADO_ID[i]==id_usuario)
			{
				var nombre=""+EMPLEADO_NAME[i]+" "+EMPLEADO_APP[i]+" "+EMPLEADO_APM[i]+"";
			}
		}
		tip="Salida";
		if(tipo==0)
		{
			tip="Entrada";
		}
	var texto="Marca realizada con exito<br><strong>Fecha: "+fecha+"</strong><br><strong>"+nombre+"</strong><br>Asistencia - "+tip+"<br>";
						  	
  openPopstatic(texto);
}
function marcaColacionOff(tipo,tipo_us,id_usuario)
{
	var fec=new Date();
	var mes=fec.getMonth();
	if(mes <10)
	{
		mes="0"+mes;
	}
	var dia=fec.getDate();
	if(dia <10)
	{
		dia="0"+dia;
	}
	var hora=fec.getHours();
	if(hora <10)
	{
		hora="0"+hora;
	}
	var min=fec.getMinutes();
	if(min <10)
	{
		min="0"+min;
	}
	var sec=fec.getSeconds();
	if(sec <10)
	{
		sec="0"+sec;
	}
	var fecha=""+fec.getFullYear()+"-"+mes+"-"+dia+" "+hora+":"+min+":"+sec+"";
	addMarcaBDLocal(id_usuario, fecha, 2, tipo);
	var nombre="";
	for(i=0;i<EMPLEADO_ID.length;i++)
		{
			
			if(EMPLEADO_ID[i]==id_usuario)
			{
				var nombre=""+EMPLEADO_NAME[i]+" "+EMPLEADO_APP[i]+" "+EMPLEADO_APM[i]+"";
			}
		}
		tip="Salida";
		if(tipo==0)
		{
			tip="Entrada";
		}
	var texto="Marca realizada con exito<br><strong>Fecha: "+fecha+"</strong><br><strong>"+nombre+"</strong><br>Colaci&oacute;n - "+tip+"<br>";
						  	
  openPopstatic(texto);
}


function sincronizaMarcas()
{
	if(MARCA_EMPLEADO.length>0)
	{
		openPopstatic("Marcaciones pendientes:"+MARCA_EMPLEADO.length+".<br><br><input type='button' value='Sincronizar' class=input_form onclick='sincronizaM();'>");
	}else
		{
			openPopstatic("No hay marcaciones pendientes para sincronizar");
		}
}
function sincronizaM()
{
	$.mobile.loading( 'show', {
				text: 'Sincronizando...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
		
		$("#output").load(path_query, 
					{tipo:15,ids:MARCA_EMPLEADO, fecha:MARCA_FECHA,marca:MARCA_MARCA,tipo_m:MARCA_TIPO_MARCA} 
						,function(){
							db.transaction(function(tx) {
 								tx.executeSql('DROP TABLE IF EXISTS marca');
 			
							}, errorCB, successCB);
							$.mobile.loading( 'hide');	
							selectMarcaBDlocal();
							openPopstatic("Marcas sincronizadas con exito");
							
						}
		);
}
function ultimasMarcas()
{
	$.mobile.loading( 'show', {
				text: 'Cargando...',
				textVisible: true,
				theme: 'a',
				html: ""
			});
		
		$("#contenido_marcas").load(path_query, 
					{tipo:16} 
						,function(){
							$('#contenido_marcas').trigger('create');
							$.mobile.loading( 'hide');	
							$.mobile.changePage('#mod_marcas', { role: 'dialog'});
							
							
						}
		);
}

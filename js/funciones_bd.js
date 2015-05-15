var db = openDatabase('MyDB', '1.0', 'My Sample DB', 10000 * 1024);
var USER_NAME=Array();				 	    	
var USER_ID=Array();				 	    	
var USER_USER=Array();				 	    	
var USER_CLAVE=Array();				 	    	
var USER_ESTADO=Array();	

var EMPLEADO_NAME=Array();			 	    	
var EMPLEADO_APP=Array();
var EMPLEADO_APM=Array();
var EMPLEADO_RUT=Array();
var EMPLEADO_DV=Array();
var EMPLEADO_ID=Array();
var EMPLEADO_CODIGO=Array();
var EMPLEADO_TARJETA=Array();

var MARCA_EMPLEADO=Array();
var MARCA_FECHA=Array();
var MARCA_MARCA=Array();
var MARCA_TIPO_MARCA=Array();
function loadBD()
{
	
 db.transaction(function(tx) 
 {
 	
 	 //tx.executeSql('DROP TABLE IF EXISTS usuario');
    tx.executeSql('create table if not exists usuario(id,name,user,clave,estado)');        
    tx.executeSql('create table if not exists empleado(id, name, app, apm, rut, dv, codigo, tarjeta)');    
    tx.executeSql('create table if not exists configuracion(foto, asistencia, colacion, tipo_asis, tipo_colacion)');   
    tx.executeSql('create table if not exists links(tipo,path_cliente)');   
    tx.executeSql('create table if not exists marca(empleado, fecha, marca, tipo_marca)');   
    //tx.executeSql('create table if not exists marca(id, name,lati,loni,fecha,descripc,tipo,direccion,fec_nube,fec_local)');  
	}, errorCB, successCB);    

}
function addConfiBDLocal(foto_conf, asistencia_conf, colacion_conf, tipo_asis_conf, tipo_colacion_conf)
{
	
	 db.transaction(function(tx) {
 			tx.executeSql('DROP TABLE IF EXISTS configuracion');
 			tx.executeSql('create table if not exists configuracion(foto, asistencia, colacion, tipo_asis, tipo_colacion)');   
			tx.executeSql('insert into configuracion(foto, asistencia, colacion, tipo_asis, tipo_colacion) values (?,?,?,?,?)',[foto_conf, asistencia_conf, colacion_conf, tipo_asis_conf, tipo_colacion_conf]);
	}, errorCB2, successCB2);
	
}
function addLinksBDLocal(tipo,path_interno)
{
	
	 db.transaction(function(tx) {
 			tx.executeSql('DROP TABLE IF EXISTS links');
 			tx.executeSql('create table if not exists links(tipo,path_cliente)');
			tx.executeSql('insert into links(tipo,path_cliente) values (?,?)',[tipo, path_interno]);
	}, errorCB2, successCB2);
	
}
function addUsuarioBDLocal(id_us,name_us,user_us,clave_us,estado_us)
{
	
	 db.transaction(function(tx) {
 			//tx.executeSql('DROP TABLE IF EXISTS usuario');
 			tx.executeSql('create table if not exists usuario(id,name,user,clave,estado)');
			tx.executeSql('insert into usuario(id,name,user,clave,estado) values (?,?,?,?,?)',[id_us,name_us,user_us,clave_us,estado_us]);
	}, errorCB, successCB);
	
}
function addEmpleadoBDLocal(id_emp, name_emp, app_emp, apm_emp, rut_emp, dv_emp, codigo_emp, tarjeta_emp)
{
	
	 db.transaction(function(tx) {
 			//tx.executeSql('DROP TABLE IF EXISTS empleado');
 			tx.executeSql('create table if not exists empleado(id, name, app, apm, rut, dv, codigo, tarjeta)'); 
			tx.executeSql('insert into empleado(id, name, app, apm, rut, dv, codigo, tarjeta) values (?,?,?,?,?,?,?,?)',[id_emp, name_emp, app_emp, apm_emp, rut_emp, dv_emp, codigo_emp, tarjeta_emp]);
	}, errorCB, successCB);
	
}
function selectUserBDlocal()
{
	
	db.transaction(function(tx) {  
 		tx.executeSql('SELECT * FROM usuario', [], selectUsuario, errorCB);
 		
    
	}, errorCB, successCB); 
}
function selectUsuario(tx, results)
{
	USER_NAME=Array();				 	    	
	USER_ID=Array();				 	    	
	USER_USER=Array();				 	    	
	USER_CLAVE=Array();				 	    	
	USER_ESTADO=Array();				 	    	

	if (results.rows.length < 1) 
  {
  	//alert("no hay resultados");
  	
  }  
 	for (var i = 0; i < results.rows.length; i++) 
 	{
 		
 				USER_NAME[i] = results.rows.item(i).name; 				 	    	
 	    	USER_ID[i] = results.rows.item(i).id;
 	    	USER_USER[i]= results.rows.item(i).user;
 	    	USER_CLAVE[i]= results.rows.item(i).clave;
 	    	USER_ESTADO[i]= results.rows.item(i).estado;
 	    	
 	    	
 	  }
 	    
	}
  	

function successCB(e)
{
	//alert("exitoso bd");
}
function errorCB(e)
{
	//alert("error bd "+e.code);
}
function errorCB2(e)
{
	//alert("error bd "+e.code);
}
function successCB2(e)
{
	//alert("exitoso bd");
}
function userOff()
{
	 db.transaction(function(tx) {
 			tx.executeSql("UPDATE usuario SET estado = 1");
 			window.location.href="index.html"; 
	}, errorCB, successCB);
	
	   
}

function selectEmpleadoBDlocal()
{
	
	db.transaction(function(tx) {  
 		tx.executeSql('SELECT * FROM empleado', [], selectEmpleado, errorCB);
 		
    
	}, errorCB, successCB); 
}
function selectEmpleado(tx, results)
{
EMPLEADO_NAME=Array();			 	    	
EMPLEADO_APP=Array();
EMPLEADO_APM=Array();
EMPLEADO_RUT=Array();
EMPLEADO_DV=Array();
EMPLEADO_ID=Array();
EMPLEADO_CODIGO=Array();
EMPLEADO_TARJETA=Array();				 	    	

	if (results.rows.length < 1) 
  {
  	//alert("no hay resultados");
  	
  }  
 	for (var i = 0; i < results.rows.length; i++) 
 	{
 		
 				//alert(results.rows.item(i).name);
 	    	EMPLEADO_NAME[i]=results.rows.item(i).name;			 	    	
				EMPLEADO_APP[i]=results.rows.item(i).app;
				EMPLEADO_APM[i]=results.rows.item(i).apm;
				EMPLEADO_RUT[i]=results.rows.item(i).rut;
				EMPLEADO_DV[i]=results.rows.item(i).dv;
				EMPLEADO_ID[i]=results.rows.item(i).id;
				EMPLEADO_CODIGO[i]=results.rows.item(i).codigo;
				EMPLEADO_TARJETA[i]=results.rows.item(i).tarjeta;	
 	    	
 	    	
 	  }
 	    
	}
	
function selectConfBDlocal()
{
	
	db.transaction(function(tx) {  
 		tx.executeSql('SELECT * FROM configuracion', [], selectConf, errorCB);
 		
    
	}, errorCB, successCB); 
}
function selectConf(tx, results)
{
			 	    	

	if (results.rows.length < 1) 
  {
  	//alert("no hay resultados");
  	
  }  
 	for (var i = 0; i < results.rows.length; i++) 
 	{
 		
 				//alert(results.rows.item(i).foto);
 	    	CONF_FOTO=results.rows.item(i).foto;
				CONF_TIPO_ASIS=results.rows.item(i).tipo_asis;
				CONF_ASIS=results.rows.item(i).asistencia;
				CONF_TIPO_COLACION=results.rows.item(i).tipo_colacion;
				CONF_COLACION=results.rows.item(i).colacion;
 	    	
 	  }
 	    
	}
  	
function addMarcaBDLocal(empleado_, fecha_m, marca_m, tipo_marca_m)
{
	
	 db.transaction(function(tx) {
 			tx.executeSql('create table if not exists marca(empleado, fecha, marca, tipo_marca)');   
			tx.executeSql('insert into marca(empleado, fecha, marca, tipo_marca) values (?,?,?,?)',[empleado_, fecha_m, marca_m, tipo_marca_m]);
	}, errorCB2, successCB2);
	
}  	
function selectMarcaBDlocal()
{
	
	db.transaction(function(tx) {  
		tx.executeSql('create table if not exists marca(empleado, fecha, marca, tipo_marca)');   
 		tx.executeSql('SELECT * FROM marca', [], selectMarca, errorCB);
 		
    
	}, errorCB, successCB); 
}
function selectMarca(tx, results)
{
			 	    	

  MARCA_EMPLEADO=Array();
  MARCA_FECHA=Array();
  MARCA_MARCA=Array();
  MARCA_TIPO_MARCA=Array();
	if (results.rows.length < 1) 
  {
  	//alert("no hay resultados");
  	
  }  
 	for (var i = 0; i < results.rows.length; i++) 
 	{
 		
 				//alert(results.rows.item(i).empleado);
 	    	MARCA_EMPLEADO[i]=results.rows.item(i).empleado;
  			MARCA_FECHA[i]=results.rows.item(i).fecha;
  			MARCA_MARCA[i]=results.rows.item(i).marca;
  			MARCA_TIPO_MARCA[i]=results.rows.item(i).tipo_marca;
 	    	
 	  }
 	    
}

function selectLinksBDlocal()
{
	
	db.transaction(function(tx) {  
 		tx.executeSql('SELECT * FROM links', [], selectLinks, errorCB);
 		
    
	}, errorCB, successCB); 
}
function selectLinks(tx, results)
{
	path_interno="";
	tipo_cliente="";
	if (results.rows.length < 1) 
  {
  	//alert("no hay resultados");
  	
  }  
 	for (var i = 0; i < results.rows.length; i++) 
 	{
 		
 				tipo_cliente = results.rows.item(i).tipo; 				 	    	
 	    	path_interno = results.rows.item(i).path_cliente;
 	    	
 	    	
 	    	
 	  }
 	    
	}
  	

var db = openDatabase('MyDB', '1.0', 'My Sample DB', 10000 * 1024);
var USER_NAME=Array();				 	    	
var USER_ID=Array();				 	    	
var USER_USER=Array();				 	    	
var USER_CLAVE=Array();				 	    	
var USER_ESTADO=Array();				 	    	
function loadBD()
{
	
 db.transaction(function(tx) 
 {
 	
 	 //tx.executeSql('DROP TABLE IF EXISTS usuario');
    tx.executeSql('create table if not exists usuario(id,name,user,clave,estado)');        
    //tx.executeSql('create table if not exists lugar(id, name, direccion, fecha, fav,tipo,marcacion)');    
    //tx.executeSql('create table if not exists marca(id, name,lati,loni,fecha,descripc,tipo,direccion,fec_nube,fec_local)');  
	}, errorCB, successCB);    

}
function addUsuarioBDLocal(id_us,name_us,user_us,clave_us,estado_us)
{
	
	 db.transaction(function(tx) {
 			//tx.executeSql('DROP TABLE IF EXISTS usuario');
 			tx.executeSql('create table if not exists usuario(id,name,user,clave,estado)');
			tx.executeSql('insert into usuario(id,name,user,clave,estado) values (?,?,?,?,?)',[id_us,name_us,user_us,clave_us,estado_us]);
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
  	alert("no hay resultados");
  	
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

function userOff()
{
	 db.transaction(function(tx) {
 			tx.executeSql("UPDATE usuario SET estado = 1");
 			window.location.href="index.html"; 
	}, errorCB, successCB);
	
	   
}
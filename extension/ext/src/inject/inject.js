function xenc(str, pass){
 var result = "";
 var k = 0;
	var p = 255;
	var xored = 0;
	var char_add = "";
 for (let i=0;i<str.length;i++){
	 
	xored = pass.charCodeAt(k)  ^  str.charCodeAt(i)
	
     console.log( 'p', pass.charCodeAt(k) );
	 console.log( 's', str.charCodeAt(i) );
	 console.log('xored', xored);
	 console.log('xored+p=', xored+p);
	 
	 char_add = String.fromCharCode( xored  + p );
	 console.log(  char_add );
	 
	 result = result + char_add;
	
	 
    k = k + 1; if (k === pass.length) { k = 0; }; 
};
	
	
	
 return result;
}
	

function xdenc(str, pass){
 console.log('К расшифровке XDENC строка '+str);
 console.log(str.length);
 console.log('К расшифровке XDENC пароль '+pass);
 console.log(pass.length);
 var result = "";
 var k = 0;
 	var p = 255;	
 for (let i=0;i<str.length;i++){
  
    result = result + String.fromCharCode(   pass.charCodeAt(k)    ^ (str.charCodeAt(i)-p) );
	 console.log( 'p', pass.charCodeAt(k) );
	 console.log( 's', str.charCodeAt(i));
	 console.log(  pass.charCodeAt(k) ^ (str.charCodeAt(i)-p) );
    k = k + 1; 
    if (k === pass.length) { k = 0; }; 
 }
 return result;
}

function custom_encryptor(str, pass, ciph){
    var result = str;
    switch (ciph)  {
        case 'xor' : { result = xenc(str, pass); break; } 
    }
    return result;
}

function custom_decryptor(str, pass, ciph){
    console.log('диспетчер дешифровки');
    if ( 
            'Something other' === xdenc('ĦĉĝĐăĈęĜďŎĜďěÿĀ', 'testpassword') ){
        console.log('расшифровка эталона верна');
            }
            else {
                console.log('Расшифровка эталона неверна');
            }
    var result = str;
    switch (ciph)  {
        case 'xor' : { result = xdenc(str, pass); break; } 
    }
    return result;
}


 

function decryptor(pass, ciph){
  console.log('Пытаемся расшифровать...');
  console.log('Пароль сообщен как '+pass);
  var etalon_pass='testpassword';
  window.etalon_pass=etalon_pass;
  window.pass=pass;
  if (pass===etalon_pass){
      console.log('Пароль эталонный');
  }
  else {
      console.log("Пароль не "+etalon_pass);
      for (var i=0;i<etalon_pass.length;i++){
          console.log(etalon_pass[i]+' - '+pass[i]);
          
      }
  };
  console.log('Метод шифрвки как '+ciph);
    
    
  var nodes = document.querySelectorAll('p');
  console.log(nodes.length);
  var e = "";
  for (var i=0;i<nodes.length;i++){
        e = nodes[i].innerText;
        console.log('Фрагмент '+e.substring(0, 3)); 
        if (e.substring(0, 4) === "xor|") {
            console.log('Обнаружена шифрограмма!');
           var arr = e.split('xor|');
           console.log(arr);
           var frag = arr[1];
        
            
        console.log('Шифрованное: '+frag);
        var res = custom_decryptor(frag, pass, ciph);
        console.log('Дешифровка: '+res);
        nodes[i].innerText = res;
        
            }
        }
}

 

/* SYNC OPTIONS */
/* Синхронизация с локальным хранилищем */

chrome.runtime.sendMessage({method: "sync_pass"}, function(response) {
  console.log('Синхронизирован пароль '+ response.pass);
  localStorage.setItem('pass',  response.pass);
});

chrome.runtime.sendMessage({method: "sync_ciph"}, function(response) {
  console.log('Синхронизирован метод шифрования '+response.ciph);
  localStorage.setItem('ciph', response.ciph);
});


 

/* MAIN */
 

  

chrome.extension.sendMessage({}, function(response) {
 
  

  
  
	var readyStateCheckInterval = setInterval(function() {
    
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);

		// ----------------------------------------------------------
		// This part of the script triggers when page is done loading
		console.log("(C) Encryptor Nazarov A.A., 2022, Orenburg, Russia");
		console.log("Расширение готово к работе!");

                // ----------------------------------------------------------
  
 
  
  console.log('Пароль из локального хранилища = ' + localStorage.getItem('pass') );
  var pass =  localStorage.getItem('pass')  ;
   
  var ciph = localStorage.getItem('ciph');
  console.log('Метод шифрования из локального хранилища ='+ciph); 
  
  console.log("Если совпало с настройками, можно шифровать!");
 
  decryptor(pass, ciph);
   
    
          
       
	
          
        }
    }
    , 3000);
  
 
  
  
}); 

 
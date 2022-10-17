document.forms[0].onsubmit = function(e) {
    e.preventDefault(); // Prevent submission
    var pass = document.getElementById('pass').value;
    
    var ciph = document.getElementById('ciph').value;
     
    chrome.runtime.getBackgroundPage(function(bgWindow) {
      // sync values with inject.js storage
        bgWindow.setPass(pass);
        bgWindow.setCiph(ciph);
        console.log('Options saved');
        window.close();     // Close dialog
    });
};

document.addEventListener("DOMContentLoaded", function(){
  // set UI values from localStorage
  console.log(   localStorage.getItem('pass') );
   document.getElementById('pass').value =   localStorage.getItem('pass');
   switch( localStorage.getItem('ciph')){
     case "xor" : { document.getElementById('ciph').selectedIndex = 1; break; }
     case "des" : { document.getElementById('ciph').selectedIndex = 2; break; }

        default :
     {
       document.getElementById('ciph').selectedIndex = 0; break;
     }
   };
 });
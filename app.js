let formUsuario = document.querySelectorAll('#formUsuario')
formUsuario = formUsuario[0]

let tpl = `
<form id="Formulario">
<input type="text" name="nombre" placeholder="Nombre y Apellido" id="nombre" class="field" class="inputs">
<br>
<input type="text" name="usuario" placeholder="Nombre de usuario" id="usuario" class="field" class="inputs">
<br>
<input type="password" id ="password" name="password" placeholder="Clave" class="passw" class="inputs">
<br>
<input type="password" id ="password2" name="password2" placeholder="Repetir clave"  class="passwRep" class="inputs">
<br>
<p type="claveGenerada" name="claveGenerada" class="claveGenerada"> </p>
<button type="button" onclick="generarClave()">Generar clave</button>
<button type="button" onclick="copiarClave()">Copiar</button>
<br>
<br>
<button type="button" onclick="guardarUsuario()">Guardar</button>
</form> 
` 			
formUsuario.innerHTML = tpl

let abc 	= ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
let mayus	= ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']
let num		= [0,1,2,3,4,5,6,7,8,9]
let symbol  = ['-',',','.',':',';','/','$','#','%','&','*','+','@','!','^','<','>','?','=']
let todos   = abc.concat(mayus).concat(num).concat(symbol)

let claveGenerada = document.querySelectorAll('.claveGenerada')
claveGenerada = claveGenerada[0]

// Funcion que genera una clave aleatoria con las condiciones obligatorias para la misma
let generarClave = function () {

    // Genero indices aleatorios dentro de cada grupo de caracteres 
    let randAbc     = Math.floor( Math.random() * abc.length);
    let randMayus   = Math.floor( Math.random() * mayus.length);
    let randNum     = Math.floor( Math.random() * num.length);
    let randSymbol  = Math.floor( Math.random() * symbol.length);

    // Generando clave aleatoria con digitos obligatorios
    let obliga  = [0]
    obliga      = [abc[randAbc] , mayus[randMayus] , num [randNum] , symbol [randSymbol]]
  
    // Generando resto de clave aleatoria con todo el abcedario
    let psw      = '' 
    let pswResto = [0]
    for (let i = 0; i < 4; i++) {
        let randTodos   = Math.floor( Math.random() * todos.length);// Elegir un indice aleatorio del diccionario
        pswResto [i] = todos[randTodos] // Concatenando la clave
    }
    
    // Ordenando de forma aleatoria todos los caracteres de la clave generada
    let pswNoRand = obliga.concat(pswResto); //Clave generada sin aleatorizar
    let pswFinal = ''
    for (let i = 0; i < 8; i++) {
        pswNoRandTemp = pswNoRand //variable temporal para ir restando los caracteres ya usados
        // Elegir un indice aleatorio de la clave sin aleatorizar
        let randFinal  = Math.floor( Math.random() * pswNoRand.length);
        // Concatenando la clave
        pswFinal = pswFinal + pswNoRandTemp[randFinal]
        pswNoRandTemp = pswNoRandTemp.splice(randFinal,1) // Elimino del array temporal el caracter ya utilizado 
    }
    
    claveGenerada.value = pswFinal //Resultado final del proceso, una clave generada de forma aleatoria que cumple las condiciones
    claveGenerada.innerText = pswFinal
}

    //--------------------FIN DE LA FUNCION generarClave--------------------//

//Funcion para tener un boton que permita copiar la clave generada en los campos de ingreso y reingreso de clave
let copiarClave = function () {
    password.value  = claveGenerada.value 
    password2.value = claveGenerada.value 
}

//--------------------FIN DE LA FUNCION copiarClave--------------------//

// Recolectando y verificando los datos ingresados por el usuario-
    let passw   = document.querySelectorAll('.passw')
    passw = passw[0]
    let passwRep = document.querySelectorAll('.passwRep')
    passwRep = passwRep[0]

let guardarUsuario = function () {
    
    
    let fields =  document.querySelectorAll('.field')
    let user = {}
    
    let inputs = document.querySelectorAll('input')
    let nombre = document.querySelectorAll ('#nombre')
    nombre = nombre[0]
    let usuario = document.querySelectorAll ('#usuario')
    usuario = usuario[0]
    let password = document.querySelectorAll ('#password')
    password = password[0]
    let passwordRep = document.querySelectorAll ('#passwordRep')
    passwordRep = passwordRep[0]
 
    
    let nameContent = document.getElementById("nombre").value
    let passwordContent = document.getElementById("password").value
    let usuarioContent = document.getElementById("usuario").value

        //-------------GENERACION DE ALERTAS POR ALGUN ERROR DE INGRESO-----------//

    //Evaluo si el password ingresado contiene los caracteres obligatorios y el largo correcto
    var validPass = /^(?=(?:.*\d){1})(?=(?:.*[A-Z]){1})(?=(?:.*[a-z]){1})(?=(?:.*[%,$,#,@,!,*,^,<,>,?,/,.,,,-,:,;,&,+,=]){1})\S{8,12}$/;
    let passwordContent_Ok = false
    let ingresoOk = false
    if (validPass.test(passwordContent)) {
        passwordContent_Ok = true;
    } 
        else {
            passwordContent_Ok = false;
        }
    //si queda algun campo vacio genera alerta
    if (nameContent ==""  || usuarioContent == "" || passwordContent =="") {
        alert("Debe rellenar todos los campos")
    }       
        //si el largo de la contraseña no es el correcto genera alerta
        else if (passw.value.length <= 7 || passw.value.length > 12) {
        alert("La contraseña debe tener entre 8 y 12 dígitos")	
        }

        //si las contraseñas son distintas genera alerta
        else if (passw.value != passwRep.value) {
        alert("Contraseñas deben coincidir")
        }
        
        else {
            //Dado que los datos ingresados son los correctos, carga los datos al objeto "user" y genero un Id
            if (passwordContent_Ok) {
                for (let i = 0; i < inputs.length - 1; i++) {
                    user[inputs[i].name] = inputs[i].value;			
                }
                //Generando un guid unico para el usuario
                let guid = ''
                let guidV = 4
                for (let i = 1; i < guidV +1; i++){
                    for (let i = 1; i < 5; i++) {
                        //Elegir un indice aleatorio del diccionario
                        let rand = Math.floor( Math.random() * num.length)
                        guid = guid + rand   
                    }
                    if (i < guidV) {
                        guid = guid + "-"
                    }
                }
                user.Id = guid
            } 
        alert ("Usuario " + user.usuario + " registrado correctamente")
        document.getElementById("Formulario").reset();
        claveGenerada.innerText = ""  
        claveGenerada.value = ""      
        }
}
let ingreso = "";
let nombre
let apellido 
let contraseña
let correo
let rol
let cedula
let text
let sesion_abierta = ""
let estudianteMostrar
//Estudiantes precargados
let estudiantes = [
    {cedula : 30136061, nombre : "Jose", materia1 : 20, materia2 : 19, materia3 : 12, materia4 : 14, promedio : 16.25, eficiencia : 1}
    ,{cedula : 30136615, nombre : "Franyer", materia1 : 17, materia2 : 18, materia3 : 12, materia4 : 17, promedio : 16, eficiencia : 1}
    ,{cedula : 30328423, nombre : "Gabriel V", materia1 : 11, materia2 : 17, materia3 : 10, materia4 : 12, promedio : 12.5, eficiencia : 1}
    ,{cedula : 30124461, nombre : "Gabriel H", materia1 : 12, materia2 : 16, materia3 : "Ret", materia4 : 14, promedio : 14, eficiencia : 1}
    ,{cedula : 30628742, nombre : "Gustavo", materia1 : 14, materia2 : 16, materia3 : 10, materia4 : 16, promedio : 14, eficiencia : 1} 
    ,{cedula : 30464495, nombre : "Oscar", materia1 : 14, materia2 : 17, materia3 : "Ret", materia4 : 16, promedio : 14.15, eficiencia : 1}
    ,{cedula : 30629401, nombre : "Fatima", materia1 : 13, materia2 : 12, materia3 : "Ret", materia4 : 17, promedio : 14.25, eficiencia : 1}];
let cantEstudiantes = 7;
//Profesores Historial
let profesores = [
    {profesor : 1, periodo : "I", año: 2017, asig : "Introd. a la Informáica", seccion : "C2", nivel : "Profesor"}
    ,{profesor : 1, periodo : "II", año: 2017, asig : "Introd. a la Informática", seccion : "C2", nivel : "Profesor"}
    ,{profesor : 1, periodo : "I", año: 2020, asig : "Introd. a la Informática", seccion : "C1", nivel : "Coordinador"}
    ,{profesor : 1, periodo : "I", año: 2023, asig : "Introd. a la Informática", seccion : "C1", nivel : "Coordinador"}
    ,{profesor : 2, periodo : "II", año: 2022, asig : "Introd. a la Informática", seccion : "C2", nivel : "Profesor"}
    ,{profesor : 2, periodo : "I", año: 2023, asig : "Introd. a la Informática", seccion : "C2", nivel : "Profesor"}
    ,{profesor : 3, periodo : "I", año: 2017, asig : "Introd. a la Informática", seccion : "C1", nivel : "Coordinador"}
    ,{profesor : 3, periodo : "II", año: 2017, asig : "Introd. a la Informática", seccion : "C1", nivel : "Coordinador"}
    ,{profesor : 3, periodo : "I", año: 2023, asig : "Introd. a la Informática", seccion : "C3", nivel : "Profesor"}
    ,{profesor : 4, periodo : "I", año: 2022, asig : "Matemática I", seccion : "U1", nivel : "Coordinador"}
    ,{profesor : 4, periodo : "I", año: 2023, asig : "Matemática I", seccion : "U5", nivel : "Coordinador"}
    ,{profesor : 5, periodo : "I", año: 2022, asig : "Algoritmos y Programación", seccion : "C5", nivel : "Profesor"}
    ,{profesor : 5, periodo : "I", año: 2022, asig : "Algoritmos y Programación", seccion : "C5", nivel : "Profesor"}
    ,{profesor : 6, periodo : "II", año: 2016, asig : "Matemática I", seccion : "U7", nivel : "Profesor"}
    ,{profesor : 6, periodo : "I", año: 2022, asig : "Matemática I", seccion : "U2", nivel : "Profesor"}
    ,{profesor : 6, periodo : "I", año: 2023, asig : "Matemática I", seccion : "U2", nivel : "Profesor"}
]
//Bitacora
let bitacora = "Día 1: Se ha realizado la clase con normalidad.";
let test = localStorage.getItem("bitacora_base");
if(test==null){
    localStorage.setItem("bitacora_base", bitacora)
}else{
    bitacora = test;
}
//Funciones elementales
//Funcion para redireccionar después de registro/inicio de sesión
function redireccionarRegistro () {
    window.location.href = "iniciar_sesion.html";
}
function redireccionarInicio(rol) {
    rol = rol.toLowerCase();
    if(rol=="estudiante") {
        location.href = "index_estudiante.html"; 
    }else{
        location.href = "index_profesor.html";
    }
}
//Funcion para registrarUsuario nuevo
function registrarUsuario() {
    nombre = document.getElementById("nombres").value;
    apellido = document.getElementById("apellidos").value;
    contraseña = document.getElementById("contraseñas").value;
    correo = document.getElementById("correos").value;
    rol = document.getElementById("rols").value;
    cedula = document.getElementById("cedulas").value;
    text = correo + ";" + contraseña + ";" + rol + ";" + cedula + ";" + nombre + ";" + apellido ;
    localStorage.setItem(correo, text);
    cuenta_creada = localStorage.getItem(correo);
    redireccionarRegistro();
}
//Funcion para loguear usuario
function loguearUsuario() {
    correo = document.getElementById("correos").value;
    contraseña = document.getElementById("contraseñas").value;
    let temp_correo = ""; let temp_contraseña = ""; let temp_rol = ""; let temp_cedula; let conteo=0;
    let sesion = localStorage.getItem(correo);
    if(sesion==null){
        alert("Correo Inválido o Inexistente");
    }else{
        for(i = 0; i<sesion.length; i++){
            conteo = i;
            if(sesion[i]==";")break;
            temp_correo = temp_correo + sesion[i];
        }
        for(i = conteo+1; i<sesion.length; i++){
            conteo = i;
            if(sesion[i]==";")break;
            temp_contraseña = temp_contraseña + sesion[i];
        }
        for(i = conteo+1; i<sesion.length; i++){
            conteo = i;
            if(sesion[i]==";")break;
            temp_rol = temp_rol + sesion[i];
        }
        for(i = conteo+1; i<sesion.length; i++){
            conteo = i;
            if(sesion[i]==";")break;
            sesion_abierta = sesion_abierta + sesion[i];
            temp_cedula = temp_cedula + sesion[i];
        }
        if(temp_correo==correo){
            if(temp_contraseña==contraseña){
                redireccionarInicio(temp_rol);
            }else{
                alert("Contraseña Inválida");
            }
        }
    }    
}
//Funcion para mostrarEstudiante en especifico
function mostrarUsuario(){
    estudianteMostrar = document.getElementById("Estudiante").value;
    for(i=0; i < cantEstudiantes; i++){
        if(estudianteMostrar==estudiantes[i].cedula){
            document.getElementById("estudiante").innerHTML = estudiantes[i].nombre;
            document.getElementById("notas1").innerHTML = estudiantes[i].materia1;
            document.getElementById("notas2").innerHTML = estudiantes[i].materia2;
            document.getElementById("notas3").innerHTML = estudiantes[i].materia3;
            document.getElementById("notas4").innerHTML = estudiantes[i].materia4;
            document.getElementById("promedio").innerHTML = estudiantes[i].promedio;
            document.getElementById("eficiencia").innerHTML = estudiantes[i].eficiencia;
        }
    }
}
//Funcion mostrar profesor
function mostrarProf(){
    let aMostrar = document.getElementById("profesor").value;
    let tableBody = document.getElementById('tbody');
    tableBody.innerHTML = null;

    for (let i = 0; i < profesores.length; i++) {
        if(aMostrar==profesores[i].profesor){
            let periodo = `<td>${profesores[i].periodo}</td>`;
            let año = `<td>${profesores[i].año}</td>`;
            let asig = `<td>${profesores[i].asig} </td>`;
            let seccion = `<td>${profesores[i].seccion} </td>`;
            let nivel = `<td>${profesores[i].nivel}</td>`;
            tableBody.innerHTML += `<tr>${periodo + año + asig + nivel + seccion}</tr>`;
        }     
    }
}
//Funcion para mostrar bitacora
function mostrarBitacora() {
    document.getElementById("bitacora").innerHTML = localStorage.getItem("bitacora_base");
}
//Funcion para Actualizar Bitacora
function actualizarBitacora() {
    let nuevo = document.getElementById("cuadro_texto").value;
    let temp = localStorage.getItem("bitacora_base") + "<br>" + nuevo;
    localStorage.setItem("bitacora_base", temp);
    location.reload()
}
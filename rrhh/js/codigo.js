"use strict";

var oRRHH = new rrhh();

// Candatos
const frmAltaCandidato = document.getElementById("frmAltaCandidato");
const frmListadoCandidatos = document.getElementById("frmListadoCandidatos");
const frmBorrarCandidato = document.getElementById("frmBorrarCandidato");
const frmBuscarCandidato = document.getElementById("frmBuscarCandidato");
const frmListadoCandidatosParam = document.getElementById("frmListadoCandidatosParam");
const frmModificarCandidato = document.getElementById("frmModificarCandidato");

//Empresas
const frmAltaEmpresa = document.getElementById("frmAltaEmpresa");
const frmListadoEmpresa = document.getElementById("frmListadoEmpresa");
const frmBorrarEmpresa = document.getElementById("frmBorrarEmpresa");
const frmBuscarEmpresa = document.getElementById("frmBuscarEmpresa");
//Vacantes
const frmAltaVacante = document.getElementById("frmAltaVacante");
const frmListadoVacante = document.getElementById("frmListadoVacante");
const frmBorrarVacante = document.getElementById("frmBorrarVacante");
const frmBuscarVacante = document.getElementById("frmBuscarVacante");

// Inicializar la página
inicio();

function inicio() {
    // Asignar eventos a los menús
    document.querySelector("#mnuAltaCandidato").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoCandidato").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBorrarCandidato").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarCandidato").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoParametrizado").addEventListener("click", mostrarFormulario);

    // Empresas
    document.querySelector("#mnuAltaEmpresa").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoEmpresa").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBorrarEmpresa").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarEmpresa").addEventListener("click", mostrarFormulario);

    // Vacantes
    document.querySelector("#mnuAltaVacante").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuListadoVacante").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBorrarVacante").addEventListener("click", mostrarFormulario);
    document.querySelector("#mnuBuscarVacante").addEventListener("click", mostrarFormulario);


    // Evento para el botón de Alta Candidato
    frmAltaCandidato.btnAltaCandidato.addEventListener("click", alta_Candidatos);
    frmListadoCandidatos.btnListadoCandidatos.addEventListener("click", listadoCandidatos);
    frmBorrarCandidato.btnBorrarCandidato.addEventListener("click", borrar_Candidato);
    frmBuscarCandidato.btnBuscarCandidato.addEventListener("click", buscar_candidato);
    frmListadoCandidatosParam.btnListadoCandidatosParam.addEventListener("click", listadoCandidatosParam);
    frmModificarCandidato.btnModificarCandidato.addEventListener("click", procesarModificarCandidato);

    frmAltaEmpresa.btnAltaEmpresas.addEventListener("click", alta_Empresa);
    frmListadoEmpresa.btnListadoEmpresa.addEventListener("click", listado_Empresa);
    frmBorrarEmpresa.btnBorrarEmpresa.addEventListener("click", borrar_Empresa);
    frmBuscarEmpresa.btnBuscarEmpresa.addEventListener("click", buscar_empresa);



}

// Mostrar el formulario correspondiente
function mostrarFormulario(oEvento) {
    ocultarFormularios();

    const frmModificarCandidato = document.querySelector("#frmModificarCandidato");
    if (frmModificarCandidato) {
        frmModificarCandidato.classList.add("d-none");
    }

    switch (oEvento.target.id) {

        case "mnuAltaCandidato":
            frmAltaCandidato.classList.remove("d-none");
            break;
        case "mnuListadoCandidato":
            frmListadoCandidatos.classList.remove("d-none");
            break;
        case "mnuBorrarCandidato":
            frmBorrarCandidato.classList.remove("d-none");
            break;
        case "mnuBuscarCandidato":
            frmBuscarCandidato.classList.remove("d-none");
            break;
        case "mnuListadoParametrizado":
            frmListadoCandidatosParam.classList.remove("d-none");
            break;
        case "mnuAltaEmpresa":
            frmAltaEmpresa.classList.remove("d-none");
            break;
        case "mnuListadoEmpresa":
            frmListadoEmpresa.classList.remove("d-none");
            break;
        case "mnuBorrarEmpresa":
            frmBorrarEmpresa.classList.remove("d-none");
            break;
        case "mnuBuscarEmpresa":
            frmBuscarEmpresa.classList.remove("d-none");
            break;
        case "mnuAltaVacante":
            frmAltaVacante.classList.remove("d-none");
            break;
        case "mnuListadoVacante":
            frmListadoVacante.classList.remove("d-none");
            break;
        case "mnuBorrarVacante":
            frmBorrarVacante.classList.remove("d-none");
            break;
        case "mnuBuscarVacante":
            frmBuscarVacante.classList.remove("d-none");
            break;
    }
}

// Ocultar todos los formularios
function ocultarFormularios() {
    frmAltaCandidato.classList.add("d-none");
    frmListadoCandidatos.classList.add("d-none");
    frmBorrarCandidato.classList.add("d-none");
    frmBuscarCandidato.classList.add("d-none");
    frmListadoCandidatosParam.classList.add("d-none");

    frmAltaEmpresa.classList.add("d-none");
    frmListadoEmpresa.classList.add("d-none");
    frmBorrarEmpresa.classList.add("d-none");
    frmBuscarEmpresa.classList.add("d-none");

    frmAltaVacante.classList.add("d-none");
    frmListadoVacante.classList.add("d-none");
    frmBorrarVacante.classList.add("d-none");
    frmBuscarVacante.classList.add("d-none");
}
//-------------FUNCIONES CANDIDATOS----------------
// Función para alta de candidato (puedes agregar la lógica real aquí)
async function alta_Candidatos() {
    let nombre = document.getElementById("nombre").value.trim();
    let experiencia = document.getElementById("experiencia").value;
    let contacto = document.getElementById("contacto").value;
    let direccion = document.getElementById("direccion").value.trim();

    let candidato = new Candidato(null, nombre, parseInt(experiencia), direccion, parseInt(contacto));
    console.log(candidato);

    let respuesta = await oRRHH.altaCandidato(candidato);

    alert(respuesta.mensaje);

    if (respuesta.ok) {
        frmAltaCandidato.reset();
        ocultarFormularios();
    }
}

async function listadoCandidatos() {
    const ventana = open("listado_candidatos.html");

    ventana.addEventListener("load", async () => {
        const listado = await oRRHH.listarCandidatos();
        ventana.document.querySelector("#listado").innerHTML = listado;
    });
}

async function listadoCandidatosParam() {
    const experienciaMinima = document.querySelector("#txtExperiencia").value;

    if (experienciaMinima === "") {
        alert("Por favor, ingrese una experiencia mínima.");
        return;
    }

    const ventana = open("listado_candidatos.html");

    ventana.addEventListener("load", async () => {
        const listado = await oRRHH.listarCandidatosParametrizado(experienciaMinima);
        ventana.document.querySelector("#listado").innerHTML = listado;
    });
}


// Función para borrar candidato (puedes agregar la lógica real aquí)

async function borrar_Candidato() {
    let id_candidato = frmBorrarCandidato.txtId.value;

    if (!id_candidato) {
        alert("Por favor, introduce un Id válido.");
        return;
    }
    const respuesta = await oRRHH.borrarCandidato(id_candidato);
    alert(respuesta.mensaje);

    if (respuesta.ok) {
        frmBorrarCandidato.reset();
    }
}

async function buscar_candidato() {
    let id_candidato = parseInt(frmBuscarCandidato.txtId.value.trim());

    let respuesta = await oRRHH.buscarCandidato(id_candidato);

    if (!respuesta.error) { // Si NO hay error
        let resultadoBusqueda = document.querySelector("#resultadoBusqueda");

        // Escribimos resultado
        let tablaSalida = `<table class="table table-striped table-bordered">
        <thead class="thead-dark">
            <tr>
                <th>ID Candidato</th><th>Nombre</th>
                <th>Experiencia</th><th>Contacto</th>
                <th>Dirección</th><th>Modificar</th>
            </tr>
        </thead><tbody>
            <tr>
                <td>${respuesta.datos.id_candidato}</td><td>${respuesta.datos.nombre}</td>
                <td>${respuesta.datos.experiencia}</td><td>${respuesta.datos.contacto}</td>
                <td>${respuesta.datos.direccion}<td><button id="btnMostrarModificarCandidato" class='btn btn-primary' data-candidato='${JSON.stringify(respuesta.datos)}'><i class='bi bi-pencil-square'></i></button></td>

            </tr>
            
        </tbody></table>`;

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';
        document.querySelector("#btnMostrarModificarCandidato").addEventListener("click", editarCandidato);
        document.querySelector("#btnMostrarModificarCandidato").addEventListener("click", ocultarTablaYFormulario);

    } else { // Si hay error
        alert(respuesta.mensaje);
    }


}

function ocultarTablaYFormulario() {
    const resultadoBusqueda = document.querySelector("#resultadoBusqueda");
    const frmBuscarCandidato = document.querySelector("#frmBuscarCandidato");

    // Ocultar la tabla de resultados si existe
    if (resultadoBusqueda) {
        resultadoBusqueda.classList.add("d-none");
    }

    // Ocultar el formulario de búsqueda si existe
    if (frmBuscarCandidato) {
        frmBuscarCandidato.classList.add("d-none");
    }
}

async function editarCandidato() {
    frmModificarCandidato.classList.remove("d-none");
    let candidato = JSON.parse(this.dataset.candidato);
    document.getElementById("ModnombreCandidato").value = candidato.nombre;
    document.getElementById("ModexperienciaCandidato").value = candidato.experiencia;
    document.getElementById("ModdireccionCandidato").value = candidato.contacto;
    document.getElementById("ModcontactoCandidado").value = candidato.direccion;
    document.getElementById("btnModificarCandidato").addEventListener("click", procesarModificarCandidato);
}

async function procesarModificarCandidato() {

    let nombre = document.getElementById("ModnombreCandidato").value.trim();
    let experiencia = document.getElementById("ModexperienciaCandidato").value;
    let contacto = document.getElementById("ModdireccionCandidato").value;
    let direccion = document.getElementById("ModcontactoCandidado").value.trim();

    let candidato = new Candidato(null, nombre, parseInt(experiencia), direccion, parseInt(contacto));
    console.log(candidato);

    alert(respuesta.mensaje);

    if (!respuesta.error) { // Si NO hay error
        //Resetear formulario
        frmModificarCandidato.reset();
        // Ocultar el formulario
        frmModificarCandidato.style.display = "none";
    }

}

function procesarBotonEditarCandidato(oEvento) {
    let boton = null;

    // Verificamos si han hecho clic sobre el botón o el icono
    if (oEvento.target.nodeName == "I" || oEvento.target.nodeName == "button") {
        if (oEvento.target.nodeName == "I") {
            // Pulsacion sobre el icono
            boton = oEvento.target.parentElement; // El padre es el boton
        } else {
            boton = oEvento.target;
        }

        ocultarFormularios();
        frmModificarCandidato.style.display = 'block';;
        let candidato = JSON.parse(boton.dataset.candidato);

        frmModificarCandidato.Modnombre.value = candidato.nombre;
        frmModificarCandidato.Modexperiencia.value = candidato.experiencia;
        frmModificarCandidato.Modcontacto.value = candidato.contacto;
        frmModificarCandidato.Moddireccion.value = candidato.direccion;

    }

}
//------------------FUNCIONES EMPRESAS--------------------------
//Funcion alta empresa
async function alta_Empresa() {
    let nombre = document.getElementById("nombre-empresa").value.trim();
    let sector = document.getElementById("sector-empresa").value.trim();
    let ubicacion = document.getElementById("ubicacion-empresa").value.trim();
    let email = document.getElementById("email-empresa").value.trim();
    let telefono = document.getElementById("telefono-empresa").value.trim();

    let empresa = new Empresa(null, nombre, sector, ubicacion, email, parseInt(telefono));
    console.log(empresa);
    let respuesta = await oRRHH.altaEmpresa(empresa);
    alert(respuesta.mensaje);
    if (respuesta.ok) {
        frmAltaEmpresa.reset();
        ocultarFormularios();
    }
}
//Funcion para listar empresas
async function listado_Empresa() {
    const ventana = open("listado_empresa.html");
    ventana.addEventListener("load", async () => {
        const listado = await oRRHH.listarEmpresa();
        ventana.document.querySelector("#listado").innerHTML = listado;
    });
}
//Funcion para buscar empresa
async function buscar_empresa() {
    let id_empresa = parseInt(frmBuscarEmpresa.txtIdEmpresa.value.trim());
    let respuesta = await oRRHH.buscarEmpresa(id_empresa);
    if (respuesta.ok) {
        let resultadoBusqueda = document.querySelector("#resultadoBusquedaEmpresa");
        let tablaSalida = `<table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th>ID Empresa</th><th>Nombre</th>
                    <th>Sector</th><th>Ubicación</th>
                    <th>Email</th><th>Teléfono</th>
                    <th>Modificar</th>
                </tr>
            </thead><tbody>
                <tr>
                    <td>${respuesta.datos.id_empresa}</td><td>${respuesta.datos.nombre}</td>
                    <td>${respuesta.datos.sector}</td><td>${respuesta.datos.ubicacion}</td>
                    <td>${respuesta.datos.email}</td><td>${respuesta.datos.telefono}</td>
                    <td><button id="btnMostrarModificarEmpresa" class='btn btn-primary' data-empresa='${JSON.stringify(respuesta.datos)}'><i class='bi bi-pencil-square'></i></button></td>
                </tr>
            
        </tbody></table>`;

        resultadoBusqueda.innerHTML = tablaSalida;
        resultadoBusqueda.style.display = 'block';
        document.querySelector("#btnMostrarModificarEmpresa").addEventListener("click", editarEmpresa);
        document.querySelector("#btnMostrarModificarEmpresa").addEventListener("click", ocultarTablaYFormularioEmpresa);

    } else { // Si hay error
        alert(respuesta.mensaje);
    }
}

//Funcion para ocultar formularios
function ocultarTablaYFormularioEmpresa() {
    const resultadoBusqueda = document.querySelector("#resultadoBusquedaEmpresa");
    const frmBuscarEmpresa = document.querySelector("#frmBuscarEmpresa");

    // Ocultar la tabla de resultados si existe
    if (resultadoBusqueda) {
        resultadoBusqueda.classList.add("d-none");
    }
    // Ocultar el formulario de búsqueda si existe
    if (frmBuscarEmpresa) {
        frmBuscarEmpresa.classList.add("d-none");
    }
}

//Funcion para editar empresa

async function editarEmpresa() {
    frmModificarEmpresa.classList.remove("d-none");
    let empresa = JSON.parse(this.dataset.empresa);
    document.getElementById("modnombreEmpresa").value = empresa.nombre;
    document.getElementById("modsectorEmpresa").value = empresa.sector;
    document.getElementById("modubicacionEmpresa").value = empresa.ubicacion;
    document.getElementById("modemailEmpresa").value = empresa.email;
    document.getElementById("modtelefonoEmpresa").value = empresa.telefono;
    document.getElementById("btnModificarEmpresa").addEventListener("click", procesarModificarEmpresa);
}

//Funcion para procesar la modificacion de empresa

async function procesarModificarEmpresa() {

    let nombre = document.getElementById("ModnombreEmpresa").value.trim();
    let sector = document.getElementById("ModsectorEmpresa").value.trim();
    let ubicacion = document.getElementById("ModubicacionEmpresa").value.trim();
    let email = document.getElementById("ModemailEmpresa").value.trim();
    let telefono = document.getElementById("ModtelefonoEmpresa").value.trim();

    let empresa = new Empresa(null, nombre, sector, ubicacion, email, parseInt(telefono));
    console.log(empresa);
    let respuesta = await oRRHH.modificarEmpresa(empresa);
    alert(respuesta.mensaje);
    if (respuesta.ok) {
        //Resetear formulario
        frmModificarEmpresa.reset();
        // Ocultar el formulario
        frmModificarEmpresa.style.display = "none";
    }
}

//Funcion para borrar empresa
async function borrar_Empresa() {
    let id_empresa = frmBorrarEmpresa.txtIdEmpresa.value;

    if (!id_empresa) {
        alert("Por favor, introduce un Id válido.");
        return;
    }
    let respuesta = await oRRHH.borrarEmpresa(id_empresa);
    alert(respuesta.mensaje);

    if (respuesta.ok) {
        frmBorrarEmpresa.reset();
    }
}
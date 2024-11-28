'use strict';
class Candidato {
    constructor(id_candidato, nombre, experiencia, direccion, contacto) {
        this.id_candidato = id_candidato;
        this.nombre = nombre;
        this.experiencia = experiencia;
        this.direccion = direccion;
        this.contacto = contacto;
    }

    // Método para convertir la instancia a formato JSON
    toJSON() {
        return {
            id_candidato: this.id_candidato,
            nombre: this.nombre,
            experiencia: this.experiencia,
            direccion: this.direccion,
            contacto: this.contacto
        };
    }
}

class Empresa {
    constructor(id_empresa, nombre, sector, ubicacion, email, telefono) {
        this.id_empresa = id_empresa;
        this.nombre = nombre;
        this.sector = sector;
        this.ubicacion = ubicacion;
        this.email = email;
        this.telefono = telefono;
    }
    // Método para convertir la instancia a formato JSON
    toJSON() {
        return {
            id_empresa: this.id_empresa,
            nombre: this.nombre,
            sector: this.sector,
            ubicacion: this.ubicacion,
            email: this.email,
            telefono: this.telefono
        };
    }

}

class Vacante {
    constructor(id_vacante, titulo, descripcion, requisitos, salario, correo) {
        this.id_vacante = id_vacante;
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.requisitos = requisitos;
        this.salario = salario;
        this.correo = correo;
    }
    // Método para convertir la instancia a formato JSON
    toJSON() {
        return {
            id_vacante: this.id_vacante,
            titulo: this.titulo,
            descripcion: this.descripcion,
            requisitos: this.requisitos,
            salario: this.salario,
            correo: this.correo
        };
    
    }
}

class rrhh {
        //---------------------CANDITATOS-------------------------------------
    // Método para realizar el alta del candidato
    async altaCandidato(oCandidato) {
        let datos = new FormData();
        // Convertir el objeto candidato a JSON y agregarlo al FormData
        datos.append("candidatos", JSON.stringify(oCandidato.toJSON()));

        console.log("Datos enviados:", datos);

        // Hacer la petición POST
        let respuesta = await peticionPOST("altaCandidato.php", datos);

        return respuesta;
    }

    async listarCandidatos() {
        const datos = new FormData();
    
        const respuesta = await peticionGET("listarCandidatos.php", datos);
    
        if (respuesta.ok) {
            let listado = `<h1 class="text-center my-4">Lista de Candidatos</h1>`;
    
            listado += "<table class='table table-hover table-bordered table-striped table-responsive shadow-sm'>";
            listado += "<thead class='table-dark'><tr><th>ID Candidato</th><th>Nombre</th><th>Experiencia</th><th>Contacto</th><th>Dirección</th></tr></thead>";
            listado += "<tbody>";
    
            for (let candidato of respuesta.datos) {
                listado += `<tr class='text-center'>`;
                listado += `<td>${candidato.id_candidato}</td>`;
                listado += `<td>${candidato.nombre}</td>`;
                listado += `<td>${candidato.experiencia}</td>`;
                listado += `<td>${candidato.contacto}</td>`;
                listado += `<td>${candidato.direccion}</td>`;
                listado += `</tr>`;
            }
            listado += "</tbody></table>";
    
            return listado;
        } else {
            return "<h1 class='text-danger text-center my-4'>Error al recuperar los datos</h1>";
        }
    }

    async listarCandidatosParametrizado(experienciaMinima) {
        const datos = new FormData();
        datos.append("txtExperiencia", experienciaMinima);
    
        const respuesta = await peticionPOST("listar_candidato_param.php", datos);
    
        if (respuesta.ok) {
            let listado = `<h1>LISTA DE CANDIDATOS</h1>`;
            listado += "<table class='table table-hover table-striped'>";
            listado += "<thead><tr><th>id_candidato</th><th>NOMBRE</th><th>EXPERIENCIA</th><th>CONTACTO</th><th>DIRECCION</th></tr></thead><tbody>";
    
            for (let candidato of respuesta.datos) {
                listado += `<tr><td>${candidato.id_candidato}</td>`;
                listado += `<td>${candidato.nombre}</td>`;
                listado += `<td>${candidato.experiencia}</td>`;
                listado += `<td>${candidato.contacto}</td>`;
                listado += `<td>${candidato.direccion}</td></tr>`;
            }
            listado += "</tbody></table>";
    
            return listado;
        } else {
            return `<h1>Error: ${respuesta.mensaje}</h1>`;
        }
    }
    


    // funcion para borrar candidato
    async borrarCandidato(id_candidato) {
        let datos = new FormData();
        datos.append("id_candidato", id_candidato);

        const respuesta = await peticionPOST("borrar_candidato.php", datos);

        // Procesar la respuesta
        if (respuesta.ok) {
            return { ok: true, mensaje: "Candidato borrado correctamente" };
        } else {
            return { ok: false, mensaje: "Error al borrar el candidato: " + respuesta.error };
        }
    }
    async buscarCandidato(id_candidato) {
        let datos = new FormData();

        datos.append("id_candidato", id_candidato);

        let respuesta = await peticionGET("buscar_candidato.php", datos);

        return respuesta;
    }

    async modificarCandidato(oCandidato) {
        let datos = new FormData();

        datos.append("Candidatos",JSON.stringify(oCandidato));
       
        let respuesta = await peticionPOST("modificar_candidato.php", datos);

        return respuesta;
    }


    //---------------------EMPRESAS-------------------------------------
    // Método para realizar el alta de la empresa
    async altaEmpresa(oEmpresa) {
        let datos = new FormData();
        // Convertir el objeto empresa a JSON y agregarlo al FormData
        datos.append("empresa", JSON.stringify(oEmpresa.toJSON()));
        console.log("Datos enviados:", datos);
        // Hacer la petición POST
        let respuesta = await peticionPOST("altaEmpresa.php", datos);
        return respuesta;
    }

    // Método para listar empresas
    async listarEmpresa() {
        const datos = new FormData();
        let respuesta = await peticionGET("listarEmpresa.php", datos);
        if (respuesta.ok) {
            let listado = "<h1>Listado de Empresas</h1>";

            listado += "<table class='table table-hover table-striped'>";
            listado += "<thead><tr><th>ID EMPRESA</th><th>NOMBRE</th><th>SECTOR</th><th>UBICACION</th><th>EMAIL</th><th>TELEFONO</th></tr></thead>";
            for (let empresa of respuesta.datos) {
                listado += `<tr><td>${empresa.id_empresa}</td>`;
                listado += `<td>${empresa.nombre}</td>`;
                listado += `<td>${empresa.sector}</td>`;
                listado += `<td>${empresa.ubicacion}</td>`;
                listado += `<td>${empresa.email}</td>`;
                listado += `<td>${empresa.telefono}</td></tr>`;
            }
           
            listado += "</tbody></table>";
            return listado;
            } else {
            return "<h1>Error al recuperar los datos</h1>"
        }
    }
    // Método para buscar empresas
    async buscarEmpresa(id_empresa) {
        let datos = new FormData();

        datos.append("id_empresa", id_empresa);
        
        console.log("Datos enviados:", datos);
        let respuesta = await peticionGET("buscar_Empresa.php", datos);
        return respuesta;
    }
    // Metodo para borrar empresas
    async borrarEmpresa(id_empresa) {
        let datos = new FormData();

        datos.append("id_empresa", id_empresa);

        let respuesta = await peticionPOST("borrar_Empresa.php", datos);

        // Procesar la respuesta
        if (respuesta.ok) {
            return { ok: true, mensaje: "Empresa borrada correctamente" };
        } else {
            return { ok: false, mensaje: "Error al borrar la empresa: " + respuesta.error };
        }
    }
    //---------------------VACANTES-------------------------------------
    // Método para realizar el alta de la vacante
    async altaVacante(oVacante) {
        let datos = new FormData();
        // Convertir el objeto vacante a JSON y agregarlo al FormData
        datos.append("vacantes", JSON.stringify(oVacante.toJSON()));
        console.log("Datos enviados:", datos);
        // Hacer la petición POST
        let respuesta = await peticionPOST("altaVacante.php", datos);
        return respuesta;
    }
    // Método para listar vacantes
    async listarVacantes() {
        let respuesta = await peticionGET("listarVacantes.php");
        if (respuesta.ok) {
            let listado = "<h1>Listado de Vacantes</h1>";
            listado += "<table class='table table-hover table-striped'>";
            listado += "<thead><tr><th>TITULO</th><th>DESCRIPCION</th><th>REQUISITOS</th><th>SALARIO</th><th>CORREO</th></tr></thead>";
            for (let vacante of respuesta.datos) {
                listado += `<tr><td>${vacante.titulo}</td>`;
                listado += `<td>${vacante.descripcion}</td>`;
                listado += `<td>${vacante.requisitos}</td>`;
                listado += `<td>${vacante.salario}</td>`;
                listado += `<td>${vacante.correo}</td></tr>`;
            }
            listado += "</tbody></table>";
            return listado;
            } else {
            return "<h1>Error al recuperar los datos</h1>"
            }
        }
        // Método para borrar vacantes
        async borrarVacante(id_vacante) {
            let datos = new FormData();
            datos.append("id_vacante", id_vacante);
            console.log("Datos enviados:", datos);
            let respuesta = await peticionPOST("borrar_vacante.php", datos);
            return respuesta;
        }
}


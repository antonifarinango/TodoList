import axios from 'axios'


const TAREAS = "http://localhost:8080/api/v1/tareas";
const POST = "http://localhost:8080/api/v1/crear";
const PUT = "http://localhost:8080/api/v1/actualizar";
const ID = "http://localhost:8080/api/v1/tarea";
const DELETE = "http://localhost:8080/api/v1/eliminar";
const DELETE_ALL = "http://localhost:8080/api/v1/eliminar-todo";

class Tarea {

    mostrarListaTareas (){
        return axios.get(TAREAS);
    }

    mostrarPorId(id){
        return axios.get(ID + "/" + id)
    }

    crearTarea (tarea){
        return axios.post(POST,tarea);
    }

    editarTarea (id, tarea){
        return axios.put(PUT + "/" + id, tarea);
    }

    eliminarTarea(id){
        return axios.delete(DELETE + "/" + id);
    }

    eliminarTodo(){
        return axios.delete(DELETE_ALL);
    }

}

export default new Tarea;
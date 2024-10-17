import React, { useState, useEffect } from "react";
import Tareas from "../service/Tareas";
import { useNavigate, useParams } from "react-router-dom";

function CrearTarea() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const tarea = { titulo, descripcion };


  useEffect(()=>{

    if(id){
      Tareas.mostrarPorId(id).then(response=>{
            setTitulo(response.data.titulo);
            setDescripcion(response.data.descripcion);
      }).catch(error =>{
        console.log("Error al obtener la tarea" + error);
      })
    }
    
  },[id])
  
  function aggTarea() {

    if (id) {
      Tareas.editarTarea(id, tarea).then(()=>{
        navigate("/");
        console.log("Tarea Actualizada");
      }).catch(error => {
        console.log(error);
      })

      

    } else {
      Tareas.crearTarea(tarea).then(()=>{
        navigate("/");
        console.log("Tarea Creada");
      }).catch(error =>{
        console.log(error);
      })
    }
  }

  useEffect(()=>{
    
  },[])

  return (
    <>
      <div className="container">
        <div className="mb-3">
          <label htmlFor="" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            value={titulo}
            onChange={(e) => {
              setTitulo(e.target.value);
            }}
            placeholder=""
          />

          <label htmlFor="" className="form-label">
            Descripción
          </label>
          <input
            type="text"
            className="form-control"
            name=""
            id=""
            value={descripcion}
            onChange={(e) => {
              setDescripcion(e.target.value);
            }}
            placeholder=""
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary"
          onClick={(e) => aggTarea(e)}
        >
          {id ? "Actualizar Tarea" : "Crear Tarea"}
        </button>
      </div>
    </>
  );
}

export default CrearTarea;

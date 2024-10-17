import React, { useEffect, useState } from "react";
import "../App.css"
import Tareas from "../service/Tareas";
import { Link, useNavigate, useParams } from "react-router-dom";
import borrar from "../assets/borrar.png"
import editar from "../assets/lapiz.png"

function ListaTareas() {
  const [lista, setLista] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const tarea = { titulo, descripcion };

  useEffect(() => {
    if (id) {
      Tareas.mostrarPorId(id)
        .then((response) => {
          setTitulo(response.data.titulo);
          setDescripcion(response.data.descripcion);
        })
        .catch((error) => {
          console.log("Error al obtener la tarea" + error);
        });
    }

    listaTareas();
  }, [id]);

  function handleClickTarea() {
    if (id) {
      Tareas.editarTarea(id, tarea)
        .then(() => {
          navigate("/");
          listaTareas();
          limpiar();
          console.log("Tarea Actualizada");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if(titulo != "" && descripcion != ""){
        Tareas.crearTarea(tarea)
                .then(() => {
                  navigate("/");
                  listaTareas();
                  limpiar();
                  console.log("Tarea Creada");
                })
                .catch((error) => {
                  console.log(error);
                });
        }
            
    }
  }

  function listaTareas() {
    Tareas.mostrarListaTareas().then((response) => {
      setLista(response.data);
    });
  }

  function eliminar(id) {
    Tareas.eliminarTarea(id).then(() => {
      listaTareas();
    });
  }

  function eliminarTodo() {
    Tareas.eliminarTodo()
      .then(() => {
        console.log("Se elimino todo");
        listaTareas();
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function limpiar() {
    setTitulo("");
    setDescripcion("");
  }

  function limitarTexto(){
    if(descripcion.length > 40){

      descripcion.slice(0,40);

      const des = document.getElementById("descripcion");



    }
  }


  return (
    <div className="contenedor vh-100 d-flex flex-column  align-items-center p-2">
      <div className=" mt-5 mb-5" style={{height:'50px'}}>
        
          {lista.length == 0 ? " " : (<h1 className="titulo display-1 fw-bolder">Todo List</h1>) }
        
      </div>
      <div
        className="bg-light d-flex flex-column mt-5 p-3 col-lg-6 col-md-7 col-xl-4 gap-3 col-11  rounded-3"
        style={{minHeight:"384px"}}
      >
        {/* INPUT TAREAS */}

        <div className="container d-flex flex-column justify-content-center mt-2">
          <div className="d-flex flex-column gap-1">
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

          <div className="mt-3 d-flex gap-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={(e) => handleClickTarea(e)}
            >
              {id ? "Actualizar Tarea" : "Crear Tarea"}
            </button>
            <button className="btn btn-danger" onClick={(e) => eliminarTodo(e)}>
              Borrar Todo
            </button>
          </div>
        </div>

        {/* LISTA DE TAREAS */}

        <div className="container p-3 rounded-3 col-12 " style={{background:'rgb(169, 200, 228)'}}>
          <div
            className="lista list-group gap-2"
            style={{ minHeight: "80px", maxHeight: "384px", overflowY: "scroll"}}
          >
            {lista.length == 0 ? (
              <p className=" tituloLista text-center display-1 fw-bolder">TodoList</p>
            ) :(
              lista.map((tarea) => (
                

                <div
                  key={tarea.id}
                  className="list-group-item rounded-3 list-group-item-action d-flex justify-content-between bg-danger"
                  style={{width:"100%"}}
                >
                  <div className="d-flex flex-column bg-success w-100">
                    <h5 className="">{tarea.titulo}</h5>
                    <div id="descripcion" className="descripcionTexto mb-1">{tarea.descripcion.length > 40 ? tarea.descripcion.slice(0,40) : tarea.descripcion }</div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Link
                      className=""
                      to={`/editar-tarea/${tarea.id}`}
                    >
                      <img src={editar} alt="editar" />
                    </Link>
                    <button
                      className="botonEliminar"
                      onClick={() => eliminar(tarea.id)}
                    >
                      <img src={borrar} alt="editar" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListaTareas;

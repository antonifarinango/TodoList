import React, { useEffect, useState, useRef } from "react";
import "../App.css";
import Tareas from "../service/Tareas";
import { Link, useNavigate, useParams } from "react-router-dom";
import borrar from "../assets/borrar.png";
import editar from "../assets/lapiz.png";

function ListaTareas() {
  const [lista, setLista] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [showVerMas, setShowVerMas] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const contenidoRef = useRef(null);
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);

  useEffect(() => {
    if (id) {
      Tareas.mostrarPorId(id)
        .then((response) => {
          setTitulo(response.data.titulo);
          setDescripcion(response.data.descripcion);
        })
        .catch((error) => {
          console.log("Error al obtener la tarea: " + error);
        });
    }
    listaTareas();
  }, [id]);

  function handleClickTarea() {
    const tarea = { titulo, descripcion };
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
      if (titulo !== "" && descripcion !== "") {
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
        console.log("Se eliminó todo");
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

  function limitarTexto(texto, tarea) {
    const longitudMaxima = 15;
    const textoSeguro = texto || "";
    if (textoSeguro.length > longitudMaxima) {
      console.log("ID de la tarea:", tarea.id);
      return (
        <>
          {textoSeguro.slice(0, 10)}
          <Link onClick={() => verMas(tarea.id)} className="btn-vermas">
            ...ver más
          </Link>
        </>
      );
    } else {
      return textoSeguro; 
    }
  }

  function verMas(id) {
    console.log("ID de la tarea seleccionada:", id);
    const tareaSeleccionada = lista.find((tarea) => tarea.id === id);
    if (tareaSeleccionada) {
      setTareaSeleccionada(tareaSeleccionada);
      setShowVerMas(true);
    } else {
      console.error("Tarea no encontrada con el ID:", id);
    }
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        contenidoRef.current &&
        !contenidoRef.current.contains(event.target)
      ) {
        setShowVerMas(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="contenedor vh-100 d-flex flex-column align-items-center p-2">
      <div className="mt-5 mb-5" style={{ height: "50px" }}>
        {lista.length === 0 ? (
          " "
        ) : (
          <h1 className="titulo display-1 fw-bolder text-light">Todo List</h1>
        )}
      </div>
      <div
        className="bg-light d-flex flex-column mt-5 p-3 col-lg-6 col-md-7 col-xl-4 gap-3 col-11 rounded-3"
        style={{ minHeight: "384px" }}
      >
        {/* Mostrar detalle de tarea seleccionada */}
        {showVerMas && tareaSeleccionada && (
          <div
            className={`justify-content-center align-items-center contenedor-vermas-active`}
          >
            <div
              ref={contenidoRef}
              className="contenido-vermas d-flex flex-column rounded-3 p-2"
            >
              <div>
                <span className="span-vermas fs-3 p-2">Título</span>
                <textarea
                  readOnly
                  value={tareaSeleccionada.titulo}
                  className="textarea-vermas-titulo p-2 fw-bold"
                ></textarea>
              </div>
              <div>
                <span className="span-vermas fs-3 p-2">Descripción</span>
                <textarea
                  readOnly
                  value={tareaSeleccionada.descripcion}
                  className="textarea-vermas-decripcion p-2"
                ></textarea>
              </div>
            </div>
          </div>
        )}

        {/* INPUT TAREAS */}
        <div className="container d-flex flex-column justify-content-center mt-2">
          <div className="d-flex flex-column gap-1">
            <label htmlFor="" className="form-label">
              Título
            </label>
            <textarea
              type="text"
              className="form-control"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder=""
            />
            <label htmlFor="" className="form-label">
              Descripción
            </label>
            <textarea
              type="text"
              className="form-control"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder=""
            ></textarea>
          </div>
          <div className="mt-3 d-flex gap-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={handleClickTarea}
            >
              {id ? "Actualizar Tarea" : "Crear Tarea"}
            </button>
            <button className="btn btn-danger" onClick={eliminarTodo}>
              Borrar Todo
            </button>
          </div>
        </div>

        {/* LISTA DE TAREAS */}
        <div
          className="container p-3 rounded-3 col-12"
          style={{ background: "rgb(169, 200, 228)" }}
        >
          <div className="lista list-group gap-2">
            {lista.length === 0 ? (
              <p className="tituloLista text-center display-1 fw-bolder">
                TodoList
              </p>
            ) : (
              lista.map((tarea) => (
                <div
                  key={tarea.id}
                  className="content-lista list-group-item rounded-3 list-group-item-action d-flex justify-content-between gap-3"
                >
                  <div className="div-tarea-content d-flex flex-column">
                    <div className="div-titulo-content fw-bold ">
                      {tarea.titulo && tarea.titulo.length > 15
                        ? tarea.titulo.slice(0, 20) + "..."
                        : tarea.titulo}
                    </div>
                    <div id="descripcion" className="descripcionTexto mb-1">
                      {limitarTexto(tarea.descripcion || "", tarea)}{" "}
                      {/* Aquí se aplica el recorte */}
                    </div>
                  </div>
                  <div className="d-flex align-items-center">
                    <Link className="" to={`/editar-tarea/${tarea.id}`}>
                      <img src={editar} alt="editar" />
                    </Link>
                    <button
                      className="botonEliminar"
                      onClick={() => eliminar(tarea.id)}
                    >
                      <img src={borrar} alt="borrar" />
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

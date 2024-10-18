/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.todoList.service;

import com.todoList.entities.Tarea;
import java.time.LocalDate;
import java.util.List;

/**
 *
 * @author Anthony
 */
public interface TareaService {
    
    //LISTA DE TAREAS
    List<Tarea> listaTareas();
    
    //TAREA POR ID
    Tarea traerPorId(Long id);
    
    //CREAR TAREA
    Tarea crearTarea(Tarea tarea);
    
    //ACTUALIZAR TAREA
    Tarea actualizarTarea(Long id, Tarea tarea);
    
    //ELIMINAR TAREA
    void eliminarTarea(Long id);
    
    //ELIMINAR TODO
    void eliminarTodo();
    
    //FILTRAR POR FECHA
    List<Tarea> filtrarTareaPorFecha(LocalDate fecha);
    
    
}

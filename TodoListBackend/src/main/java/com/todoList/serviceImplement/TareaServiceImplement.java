/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.todoList.serviceImplement;

import com.todoList.entities.Tarea;
import com.todoList.repository.TareaRepository;
import com.todoList.service.TareaService;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author Anthony
 */
@Service
public class TareaServiceImplement implements TareaService {
    
    @Autowired
    private TareaRepository tareaRepository;

    @Override
    public List<Tarea> listaTareas() {
        
        return tareaRepository.findAll();
        
    }

    @Override
    public Tarea traerPorId(Long id) {
        
        Tarea tareaId = tareaRepository.findById(id).orElse(null);
        
        return tareaId;
    }

    @Override
    public Tarea crearTarea(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    @Override
    public Tarea actualizarTarea(Long id, Tarea tarea) {
        
        Tarea tareaId = tareaRepository.findById(id).orElse(null);
        
        tareaId.setTitulo(tarea.getTitulo());
        tareaId.setDescripcion(tarea.getDescripcion());
        
        return tareaRepository.save(tareaId);
        
    }

    @Override
    public void eliminarTarea(Long id) {
        
        Tarea tareaId = tareaRepository.findById(id).orElse(null);
        
        if(tareaId != null){
            tareaRepository.delete(tareaId);
        }
        
        
    }

    
    @Override
    public void eliminarTodo() {
        tareaRepository.deleteAll();
    }

    @Override
    public List<Tarea> filtrarTareaPorFecha(LocalDate fecha) {
        
        List<Tarea> tareas = tareaRepository.findAll();
        
        List<Tarea> tareasFiltradas = tareas.stream()
                .filter(x->x.getFechaDeCreacion().equals(fecha))
                .collect(Collectors.toList());
        
        return tareasFiltradas;
        
    }
    
    
    
}

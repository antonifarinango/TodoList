/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.todoList.controller;

import com.todoList.entities.Tarea;
import com.todoList.serviceImplement.TareaServiceImplement;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;   
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author Anthony
 */
@CrossOrigin("http://localhost:5173/")
@RestController
@RequestMapping("/api/v1")
public class TareaController {
    
    @Autowired
    private TareaServiceImplement tareaServiceImplement;
    
    @GetMapping("/tareas")
    public List<Tarea> traerTodo(){
        return tareaServiceImplement.listaTareas();
    }
    
    @GetMapping("/tarea/{id}")
    public ResponseEntity<Tarea> traerPorId(@PathVariable Long id){
        Tarea tareaId = tareaServiceImplement.traerPorId(id);
        
        return ResponseEntity.ok(tareaId);
    }
    
    @PostMapping("/crear")
    public Tarea crearTarea(@RequestBody Tarea tarea){
        
        return tareaServiceImplement.crearTarea(tarea);
    }
    
    @PutMapping("/actualizar/{id}")
    public  ResponseEntity<Tarea> actualizarTarea(@PathVariable Long id, @RequestBody Tarea tarea){
        
            Tarea tareaActualizada = tareaServiceImplement.actualizarTarea(id, tarea);
            
            return ResponseEntity.ok(tareaActualizada);

    }
    
    
    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<Map<String,Boolean>> eliminarTarea(@PathVariable Long id){
        tareaServiceImplement.eliminarTarea(id);
        
        Map<String,Boolean> response = new HashMap<>();
        
        response.put("Borrado", Boolean.TRUE);
        
        return ResponseEntity.ok(response);
    }
    
    @DeleteMapping("/eliminar-todo")
    public ResponseEntity<Map<String,Boolean>> eliminarTodo(){
        
        tareaServiceImplement.eliminarTodo();
        
        Map<String,Boolean> response = new HashMap<>();
        
        response.put("Los Datos Fueron Borrados",Boolean.TRUE);
        
        return ResponseEntity.ok(response);
        
    }
    
}

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\AlumnoClaseController;
use App\Http\Controllers\AvisoController;
use App\Http\Controllers\TemaController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\MaterialController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Maestro
    Route::prefix('maestro')->group(function () {

        // CRUD de clases
        Route::get('/clases', [ClaseController::class, 'index']);         // Listar clases
        Route::post('/clases', [ClaseController::class, 'store']);        // Crear clase
        Route::get('/clases/{id}', [ClaseController::class, 'show']);     // Ver clase
        Route::put('/clases/{id}', [ClaseController::class, 'update']);   // Actualizar clase
        Route::delete('/clases/{id}', [ClaseController::class, 'destroy']); // Eliminar clase

        // CRUD de alumnos en clases
        Route::post('/clases/{clase_id}/agregar-alumno', [ClaseController::class, 'agregarAlumno']); // Agregar alumno a clase
        Route::get('/clases/{clase_id}/alumnos', [ClaseController::class, 'alumnosPorClase']); // Obtener alumnos de una clase
        Route::get('/alumnos/buscar', [AlumnoClaseController::class, 'buscar']); // Buscar alumnos

        // CRUD de tareas y temas
        Route::post('/temas', [TemaController::class, 'store']);
        Route::get('/clases/{clase_id}/temas', [TemaController::class, 'index']); // Obtener temas de una clase
        Route::put('/clases/{clase_id}/temas/{tema_id}', [TemaController::class, 'update']); // Actualizar tema
        Route::delete('/clases/{clase_id}/temas/{tema_id}', [TemaController::class, 'destroy']); // Eliminar tema

        Route::post('/tareas', [TareaController::class, 'store']); // Crear tarea
        Route::get('/clases/temas/{tema_id}/tareas', [TareaController::class, 'index']); // Obtener tareas de una clase
        
        // CRUD de materiales
        Route::post('/materiales', [MaterialController::class, 'store']);
        Route::get('/temas/{tema_id}/materiales', [MaterialController::class, 'index']);
    });

    // Alumno
    Route::prefix('alumno')->group(function () {
        Route::get('/', [ClaseController::class, 'clasesAlumno']);
    });

    Route::post('/avisos', [AvisoController::class, 'store']);
    Route::get('/clases/{clase_id}/avisos', [AvisoController::class, 'porClase']);
});
        
<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\AlumnoClaseController;
use App\Http\Controllers\AvisoController;
use App\Http\Controllers\TemaController;
use App\Http\Controllers\TareaController;
use App\Http\Controllers\MaterialController;
use App\Http\Controllers\TareaAlumnoController;

/* ─────────  AUTH  ───────── */
Route::post('/login',  [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get  ('/me',    [AuthController::class, 'me']);

    /* ─────────  MAESTRO  ───────── */
    Route::prefix('maestro')->group(function () {
        /* Clases */
        Route::get   ('/clases',            [ClaseController::class, 'index']);
        Route::post  ('/clases',            [ClaseController::class, 'store']);
        Route::get   ('/clases/{id}',       [ClaseController::class, 'show']);
        Route::put   ('/clases/{id}',       [ClaseController::class, 'update']);
        Route::delete('/clases/{id}',       [ClaseController::class, 'destroy']);

        /* Alumnos en clase */
        Route::post ('/clases/{clase}/agregar-alumno', [ClaseController::class, 'agregarAlumno']);
        Route::get  ('/clases/{clase}/alumnos',        [ClaseController::class, 'alumnosPorClase']);
        Route::get  ('/alumnos/buscar',                [AlumnoClaseController::class, 'buscar']);

        /* Temas & Tareas */
        Route::post   ('/temas',                         [TemaController::class,  'store']);
        Route::get    ('/clases/{clase}/temas',          [TemaController::class,  'index']);
        Route::put    ('/clases/{clase}/temas/{tema}',   [TemaController::class,  'update']);
        Route::delete ('/clases/{clase}/temas/{tema}',   [TemaController::class,  'destroy']);

        Route::post ('/tareas',                   [TareaController::class, 'store']);
        Route::get  ('/clases/temas/{tema}/tareas', [TareaController::class, 'index']);

        /* Materiales */
        Route::post('/materiales',                     [MaterialController::class, 'store']);
        Route::get ('/temas/{tema}/materiales',        [MaterialController::class, 'index']);

        /* Calificar y ver entregas */
        Route::post('/tareas-alumnos/{id}/calificar',  [TareaAlumnoController::class, 'calificar']);
        Route::get ('/tareas/{tarea}/entregas',        [TareaAlumnoController::class, 'entregasPorTarea']);
    });

    /* ─────────  ALUMNO  ───────── */
    Route::prefix('alumno')->group(function () {
        Route::get ('/',                           [ClaseController::class, 'clasesAlumno']);

        /* Tarea*/
        Route::post   ('/tareas/{tarea}/entregar', [TareaAlumnoController::class, 'entregar']);
        Route::get    ('/tareas/{tarea}/mi-entrega', [TareaAlumnoController::class, 'miEntrega']);
        Route::delete ('/tareas/{tarea}/entrega',  [TareaAlumnoController::class, 'cancelar']);
        Route::get  ('/tareas-pendientes', [TareaAlumnoController::class, 'pendientes']); 

    });

    /* Avisos, materiales*/
    Route::post('/avisos',                       [AvisoController::class, 'store']);
    Route::get ('/clases/{clase}/avisos',        [AvisoController::class, 'porClase']);
    Route::get ('/temas/{clase}',                [TemaController::class, 'index']);
    Route::get ('/tareas/show/{tarea}',          [TareaController::class, 'show']);
    Route::get ('/clases/{clase}/alumnos',       [ClaseController::class, 'alumnosDeClase']);
    Route::get ('/materiales/{id}',              [MaterialController::class, 'show']);
});

<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\AlumnoClaseController;
use App\Http\Controllers\AvisoController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Clases
    Route::post('/clases', [ClaseController::class, 'store']);
    Route::get('/alumno/clases', [ClaseController::class, 'clasesAlumno']);
    Route::get('/maestro/clases', [ClaseController::class, 'clasesMaestro']);

    // Alumnos en clase
    Route::get('/alumnos/buscar', [AlumnoClaseController::class, 'buscar']);
    Route::post('/clases/{codigo}/alumnos', [AlumnoClaseController::class, 'agregar']);

    // Avisos
    Route::post('/clases/{codigo}/avisos', [AvisoController::class, 'store']);
    Route::get('/clases/{codigo}/avisos', [AvisoController::class, 'avisosClase']);
});

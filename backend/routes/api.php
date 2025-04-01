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
    Route::post('/clases/{clase_id}/agregar-alumno', [ClaseController::class, 'agregarAlumno']);
    Route::get('/clases-alumno', [ClaseController::class, 'clasesDelAlumno']);

    // Avisos
    Route::post('/avisos', [AvisoController::class, 'store']);
    Route::get('/avisos/{clase_id}', [AvisoController::class, 'porClase']);
});
        
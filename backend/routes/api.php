<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ClaseController;
use App\Http\Controllers\AlumnoClaseController;
use App\Http\Controllers\AvisoController;

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Maestro
    Route::prefix('maestro')->group(function () {
        Route::get('/clases', [ClaseController::class, 'index']);         // Listar clases
        Route::post('/clases', [ClaseController::class, 'store']);        // Crear clase
        Route::get('/clases/{id}', [ClaseController::class, 'show']);     // Ver clase
        Route::put('/clases/{id}', [ClaseController::class, 'update']);   // Actualizar clase
        Route::delete('/clases/{id}', [ClaseController::class, 'destroy']); // Eliminar clase
        Route::post('/clases/{clase_id}/agregar-alumno', [ClaseController::class, 'agregarAlumno']);
    });

    // Alumno
    Route::prefix('alumno')->group(function () {
        Route::get('/', [ClaseController::class, 'clasesAlumno']);
    });

    Route::post('/avisos', [AvisoController::class, 'store']);
    Route::get('/clases/{clase_id}/avisos', [AvisoController::class, 'porClase']);
});
        
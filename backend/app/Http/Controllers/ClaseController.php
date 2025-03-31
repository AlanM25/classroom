<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clase;

class ClaseController extends Controller
{
    // Crear clase (solo maestro)
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required',
            'descripcion' => 'required',
            'cuatrimestre' => 'required|integer',
            'carrera_id' => 'required|exists:carreras,id',
        ]);

        $usuario = auth('api')->user();
        if ($usuario->rol != 1) {
            return response()->json(['error' => 'Solo los maestros pueden crear clases'], 403);
        }

        $clase = Clase::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'cuatrimestre' => $request->cuatrimestre,
            'carrera_id' => $request->carrera_id,
            'maestro_id' => $usuario->maestro_id,
            'fecha_creacion' => now(),
        ]);

        return response()->json($clase, 201);
    }

    // Ver clases de alumno
    public function clasesAlumno()
    {
        $usuario = auth('api')->user();

        if ($usuario->rol != 2) {
            return response()->json(['error' => 'Solo los alumnos pueden ver estas clases'], 403);
        }

        $clases = $usuario->alumno->clases()->with('maestro')->get();
        return response()->json($clases);
    }

    // Ver clases del maestro
    public function clasesMaestro()
    {
        $usuario = auth('api')->user();

        if ($usuario->rol != 1) {
            return response()->json(['error' => 'Solo los maestros pueden ver sus clases'], 403);
        }

        $clases = $usuario->maestro->clases()->with('carrera')->get();
        return response()->json($clases);
    }
}

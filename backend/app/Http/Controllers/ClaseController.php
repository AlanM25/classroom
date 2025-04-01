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
            'nombre' => 'required|string',
            'descripcion' => 'required|string',
            'cuatrimestre' => 'required|integer',
            'carrera_id' => 'required|exists:carreras,id',
            'codigo_clase' => 'required|unique:clases,codigo_clase',
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

    public function agregarAlumno(Request $request, $clase_id)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id'
        ]);

        $clase = Clase::findOrFail($clase_id);
        $clase->alumnos()->syncWithoutDetaching([$request->usuario_id]);

        return response()->json(['message' => 'Alumno agregado correctamente']);
    }

    // Ver clases del alumno
    public function clasesAlumno()
    {
        $usuario = auth('api')->user();

        if ($usuario->rol !== 'alumno') {
            return response()->json(['error' => 'Solo los alumnos pueden ver estas clases'], 403);
        }

        $clases = $usuario->clasesComoAlumno()->with('maestro')->get();
        return response()->json($clases);
    }

    // Ver clases del maestro
    public function clasesMaestro()
    {
        $usuario = auth('api')->user();

        if ($usuario->rol !== 'maestro') {
            return response()->json(['error' => 'Solo los maestros pueden ver sus clases'], 403);
        }

        $clases = $usuario->clasesComoMaestro()->with('carrera')->get();
        return response()->json($clases);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use App\Models\ClaseAlumno;

class AlumnoClaseController extends Controller
{
    public function buscar(Request $request)
    {
        $q = $request->input('q');

        $alumnos = Usuario::where('rol', 'alumno')
            ->where(function($query) use ($q) {
                $query->where('nombre', 'like', "%$q%")
                      ->orWhere('matricula', 'like', "%$q%");
            })
            ->limit(10)
            ->get();

        return response()->json($alumnos);
    }

    public function agregar(Request $request, $codigo)
    {
        $request->validate([
            'usuario_id' => 'required|exists:usuarios,id',
        ]);

        $usuarioId = $request->input('usuario_id');

        $existe = ClaseAlumno::where('clase_id', $codigo)
            ->where('usuario_id', $usuarioId)
            ->first();

        if ($existe) {
            return response()->json(['message' => 'Este alumno ya está registrado en esta clase'], 409);
        }

        $registro = ClaseAlumno::create([
            'usuario_id' => $usuarioId,
            'clase_id' => $codigo,
            'fecha_registro' => now(),
        ]);

        return response()->json($registro, 201);
    }
}


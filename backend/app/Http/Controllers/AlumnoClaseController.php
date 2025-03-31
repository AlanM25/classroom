<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Alumno;
use App\Models\ClaseAlumno;

class AlumnoClaseController extends Controller
{
    public function buscar(Request $request)
    {
        $q = $request->input('q');

        $alumnos = Alumno::where('nombre', 'like', "%$q%")
            ->orWhere('matricula', 'like', "%$q%")
            ->limit(10)
            ->get();

        return response()->json($alumnos);
    }

    public function agregar(Request $request, $codigo)
    {
        $request->validate([
            'matricula' => 'required|exists:alumnos,matricula',
        ]);

        $existe = ClaseAlumno::where('clase_codigo', $codigo)
            ->where('alumno_matricula', $request->matricula)
            ->first();

        if ($existe) {
            return response()->json(['message' => 'Este alumno ya está registrado en esta clase'], 409);
        }

        $registro = ClaseAlumno::create([
            'alumno_matricula' => $request->matricula,
            'clase_codigo' => $codigo,
            'fecha_registro' => now(),
        ]);

        return response()->json($registro, 201);
    }
}


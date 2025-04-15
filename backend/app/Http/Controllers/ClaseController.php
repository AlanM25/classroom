<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Clase;
use App\Models\Usuario;

class ClaseController extends Controller
{
    // Listar TODAS las clases del maestro
    public function index()
    {
        $usuario = auth('api')->user();

        if ($usuario->rol !== 'maestro') {
            return response()->json(['error' => 'Solo los maestros pueden ver sus clases'], 403);
        }

        $clases = $usuario->clasesComoMaestro()->with('carrera')->get();
        return response()->json($clases);
    }

    // Crear nueva clase
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string',
            'descripcion' => 'required|string',
            'cuatrimestre' => 'required|integer',
            'codigo_clase' => 'required|unique:clases,codigo_clase',
        ]);

        $usuario = auth('api')->user();
        if ($usuario->rol !== 'maestro') {
            return response()->json(['error' => 'Solo los maestros pueden crear clases'], 403);
        }

        $clase = Clase::create([
            'nombre' => $request->nombre,
            'descripcion' => $request->descripcion,
            'cuatrimestre' => $request->cuatrimestre,
            'carrera_id' => $usuario->carrera_id,
            'codigo_clase' => $request->codigo_clase,
            'maestro_id' => $usuario->id,
            'fecha_creacion' => now(),
        ]);

        return response()->json($clase, 201);
    }

    // Mostrar una clase
    public function show($id)
    {
        $clase = Clase::with(['maestro', 'carrera', 'alumnos'])->findOrFail($id);
        return response()->json($clase);
    }

    // Actualizar clase
    public function update(Request $request, $id)
    {
        $clase = Clase::findOrFail($id);
        $usuario = auth('api')->user();

        if ($usuario->id !== $clase->maestro_id) {
            return response()->json(['error' => 'No autorizado para editar esta clase'], 403);
        }

        $request->validate([
            'nombre' => 'sometimes|string',
            'descripcion' => 'sometimes|string',
            'cuatrimestre' => 'sometimes|integer',
            'carrera_id' => 'sometimes|exists:carreras,id',
        ]);

        $clase->update($request->only(['nombre', 'descripcion', 'cuatrimestre', 'carrera_id']));

        return response()->json($clase);
    }

    // Eliminar clase
    public function destroy($id)
    {
        $clase = Clase::findOrFail($id);
        $usuario = auth('api')->user();

        if ($usuario->id !== $clase->maestro_id) {
            return response()->json(['error' => 'No autorizado para eliminar esta clase'], 403);
        }

        $clase->delete();
        return response()->json(['message' => 'Clase eliminada correctamente']);
    }

    // Agregar alumno a clase
    public function agregarAlumno(Request $request, $clase_id)
    {
        $request->validate([
            'nombre' => 'required|string'
        ]);

        $usuario = Usuario::where('nombre', $request->nombre)->first();

        if (!$usuario) {
            return response()->json(['error' => 'Usuario no encontrado'], 404);
        }

        $clase = Clase::findOrFail($clase_id);
        $clase->alumnos()->syncWithoutDetaching([$usuario->id]);

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


    public function alumnosDeClase($id)
{
    $clase = Clase::with('alumnos')->findOrFail($id);
    return response()->json($clase->alumnos);
}








}

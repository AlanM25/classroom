<?php

namespace App\Http\Controllers;

use App\Models\Tema;
use App\Models\Clase;
use App\Models\ClaseAlumno;
use Illuminate\Http\Request;

class TemaController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string|max:500',
        ]);

        $usuario = auth('api')->user();

        // Validar que el usuario sea el maestro de la clase
        $clase = Clase::findOrFail($request->clase_id);
        if ($usuario->id !== $clase->maestro_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $tema = Tema::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'clase_id' => $usuario->clase_id,
        ]);

        return response()->json($tema, 201);
    }

    public function index($clase_id)
    {
        $temas = Tema::where('clase_id', $clase_id)->get();
        return response()->json($temas);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'titulo' => 'sometimes|required|string|max:255',
            'descripcion' => 'sometimes|required|string|max:500',
        ]);

        $tema = Tema::findOrFail($id);
        $tema->update($request->all());

        return response()->json($tema);
    }

    public function destroy($id)
    {
        $tema = Tema::findOrFail($id);
        $tema->delete();

        return response()->json(['message' => 'Tema eliminado']);
    }
}
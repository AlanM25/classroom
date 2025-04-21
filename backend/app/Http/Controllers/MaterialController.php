<?php

namespace App\Http\Controllers;

use App\Models\Material;
use App\Models\Tema;
use App\Models\Archivo;
use Illuminate\Http\Request;


class MaterialController extends Controller
{


    public function show($id)
{
    $material = Material::with('archivos', 'tema.clase.maestro')->findOrFail($id);

    return response()->json([
        'id'             => $material->id,
        'titulo'         => $material->titulo,
        'descripcion'    => $material->descripcion,
        'fecha_creacion' => $material->fecha_creacion,
        'archivos'       => $material->archivos,
        'profesor'       => optional($material->tema->clase->maestro)->nombre ?? 'Profesor',
    ]);
}


    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'descripcion' => 'required|string',
            'tema_id' => 'required|exists:temas,id',
            'archivos.*' => 'file|max:20480', // 20 MB
        ]);

        $tema = Tema::with('clase')->findOrFail($request->tema_id);
        $usuario = auth('api')->user();

        if ($usuario->id !== $tema->clase->maestro_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $material = Material::create([
            'titulo' => $request->titulo,
            'descripcion' => $request->descripcion,
            'tema_id' => $request->tema_id,
            'fecha_creacion' => now(),
        ]);

        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $nombreAlmacenado = $archivo->store('materiales', 'public');

                Archivo::create([
                    'nombre_original' => $archivo->getClientOriginalName(),
                    'nombre_en_storage' => $nombreAlmacenado,
                    'material_id' => $material->id,
                    'fecha_creacion' => now(),
                ]);
            }
        }

        return response()->json($material->load('archivos'), 201);
    }

    public function index($tema_id)
    {
        $materiales = Material::with('archivos')->where('tema_id', $tema_id)->get();
        return response()->json($materiales);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use App\Models\Tema;
use App\Models\Clase;
use App\Models\Archivo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TareaController extends Controller
{


    public function show($id)
    {
        $tarea = Tarea::with(['archivos', 'tema.clase.maestro'])->findOrFail($id);

        return response()->json([
            'id' => $tarea->id,
            'titulo' => $tarea->titulo,
            'instrucciones' => $tarea->instrucciones,
            'fecha_limite' => $tarea->fecha_limite,
            'fecha_creacion' => $tarea->fecha_creacion,
            'archivos' => $tarea->archivos,
            'tema' => $tarea->tema,
            'clase' => $tarea->tema->clase,
            'profesor' => $tarea->tema->clase->maestro->nombre ?? 'Profesor',
        ]);
    }



    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string',
            'instrucciones' => 'required|string',
            'fecha_limite' => 'required|date|after:now',
            'tema_id' => 'required|exists:temas,id',
            'archivos.*' => 'file|max:20480', // 20MB por archivo
        ]);

        $tema = Tema::with('clase')->findOrFail($request->tema_id);
        $usuario = auth('api')->user();

        if ($usuario->id !== $tema->clase->maestro_id) {
            return response()->json(['error' => 'No autorizado'], 403);
        }

        $tarea = Tarea::create([
            'titulo' => $request->titulo,
            'instrucciones' => $request->instrucciones,
            'fecha_limite' => $request->fecha_limite,
            'tema_id' => $request->tema_id,
            'fecha_creacion' => now(),
        ]);

        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $nombreAlmacenado = $archivo->store('tareas', 'public');

                Archivo::create([
                    'nombre_original' => $archivo->getClientOriginalName(),
                    'nombre_en_storage' => $nombreAlmacenado,
                    'tarea_id' => $tarea->id,
                    'fecha_creacion' => now(),
                ]);
            }
        }

        return response()->json($tarea->load('archivos'), 201);
    }

    public function index($tema_id)
    {
        $tareas = Tarea::with('archivos')->where('tema_id', $tema_id)->get();
        return response()->json($tareas);
    }
}


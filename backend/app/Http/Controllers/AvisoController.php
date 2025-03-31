<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aviso;
use App\Models\Archivo;

class AvisoController extends Controller
{
    public function store(Request $request, $codigo)
    {
        $request->validate([
            'contenido' => 'required|string',
            'archivos.*' => 'file|mimes:pdf,jpg,jpeg,png|max:2048'
        ]);

        $aviso = Aviso::create([
            'contenido' => $request->contenido,
            'clase_codigo' => $codigo,
            'fecha_creacion' => now(),
        ]);

        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $ruta = $archivo->store('avisos');

                Archivo::create([
                    'nombre_original' => $archivo->getClientOriginalName(),
                    'nombre_en_storage' => $ruta,
                    'fecha_creacion' => now(),
                    'aviso_id' => $aviso->id,
                ]);
            }
        }

        return response()->json(['aviso' => $aviso], 201);
    }

    public function avisosClase($codigo)
    {
        $avisos = Aviso::with('archivos')
            ->where('clase_codigo', $codigo)
            ->orderBy('fecha_creacion', 'desc')
            ->get();

        return response()->json($avisos);
    }
}
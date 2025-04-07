<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Aviso;
use App\Models\Archivo;

class AvisoController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'contenido' => 'required|string',
            'clase_id' => 'required|exists:clases,id',
            'archivos.*' => 'file|mimes:pdf,jpg,jpeg,png|max:2048'
        ]);

        $aviso = Aviso::create([
            'contenido' => $request->contenido,
            'clase_id' => $request->clase_id,
            'usuario_id' => auth()->id(),
            'fecha_creacion' => now(),
        ]);

        if ($request->hasFile('archivos')) {
            foreach ($request->file('archivos') as $archivo) {
                $ruta = $archivo->store('avisos', 'public');

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

    public function porClase($clase_id)
    {
        return Aviso::where('clase_id', $clase_id)->with('archivos', 'usuario')->orderBy('created_at', 'desc')->get();
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\TareaAlumno;
use App\Models\Tarea;
use Illuminate\Http\Request;

class TareaAlumnoController extends Controller
{
    // Mostrar entregas por tarea
    public function entregasPorTarea($tarea_id)
    {
        $entregas = TareaAlumno::with(['claseAlumno.usuario', 'archivos'])
            ->where('tarea_id', $tarea_id)
            ->get();

        return response()->json($entregas);
    }

    // Calificar entrega
    public function calificar(Request $request, $id)
    {
        $request->validate([
            'calificacion' => 'required|integer|min:0|max:100',
        ]);

        $entrega = TareaAlumno::findOrFail($id);
        $entrega->calificacion = $request->calificacion;
        $entrega->estado = 'calificado';
        $entrega->save();

        return response()->json(['message' => 'Tarea calificada correctamente.']);
    }

    // Entregar tarea (subida por alumno)
    public function entregar(Request $request, $tarea_id)
    {
        $request->validate([
            'file' => 'required|file|mimes:pdf,jpg,jpeg,png|max:20480',
            'alumno_clase' => 'required|exists:clases_alumnos,id',
        ]);

        $tarea = Tarea::findOrFail($tarea_id);
        if (now()->gt($tarea->fecha_limite)) {
            return response()->json(['error' => 'La fecha de entrega ha vencido.'], 403);
        }

        $entrega = TareaAlumno::updateOrCreate(
            [
                'tarea_id' => $tarea_id,
                'alumno_clase' => $request->alumno_clase,
            ],
            [
                'estado' => 'entregado',
                'fecha_entrega' => now(),
            ]
        );

        // Guardar archivo relacionado (en tabla archivos si la tienes)
        $path = $request->file('file')->store('entregas', 'public');

        \DB::table('archivos')->insert([
            'tarea_id' => $tarea_id,
            'tareas_alumno_id' => $entrega->id,
            'nombre_original' => $request->file('file')->getClientOriginalName(),
            'nombre_en_storage' => $path,
            'fecha_creacion' => now(),
        ]);

        return response()->json(['message' => 'Tarea entregada correctamente']);
    }
}

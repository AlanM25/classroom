<?php

namespace App\Http\Controllers;

use App\Models\Tarea;
use App\Models\TareaAlumno;
use App\Models\Archivo;
use App\Models\ClaseAlumno;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TareaAlumnoController extends Controller
{
    /*───────────────────────────────
     * Entregas de TODOS los alumnos
     *───────────────────────────────*/
    public function entregasPorTarea($tarea_id)
    {
        return TareaAlumno::with(['claseAlumno.alumno', 'archivos'])
               ->where('tarea_id', $tarea_id)
               ->get();
    }

    /*───────────────────────────────
     *  Estado de MI entrega
     *───────────────────────────────*/
    public function miEntrega(Request $request, $tarea_id)
    {
        $alumnoClase = $request->alumno_clase
                     ?? ClaseAlumno::where('usuario_id', auth('api')->id())
                                   ->value('id');

        if (!$alumnoClase) {
            return response()->json(['error'=>'Alumno no encontrado'],404);
        }

        $entrega = TareaAlumno::with('archivos')
                   ->where('tarea_id',     $tarea_id)
                   ->where('alumno_clase', $alumnoClase)
                   ->first();

        return $entrega
            ? response()->json($entrega)
            : response()->noContent();   // 204
    }

    /*───────────────────────────────
     *  Calificar (maestro)
     *───────────────────────────────*/
    public function calificar(Request $request, $id)
    {
        $request->validate(['calificacion'=>'required|integer|min:0|max:100']);

        $e               = TareaAlumno::findOrFail($id);
        $e->calificacion = $request->calificacion;
        $e->estado       = 'calificado';
        $e->save();

        return response()->json(['message'=>'Tarea calificada']);
    }

    /*───────────────────────────────
     *  Entregar / volver a subir
     *───────────────────────────────*/
    public function entregar(Request $request, $tarea_id)
    {
        $request->validate([
            'archivo'       => 'required|file|mimes:pdf,jpg,jpeg,png|max:2048',
            'alumno_clase'  => 'required|exists:clases_alumnos,id',
        ]);

        /* Fecha límite */
        $tarea = Tarea::findOrFail($tarea_id);
        if (now()->gt($tarea->fecha_limite)) {
            return response()->json(['error'=>'La fecha de entrega ha vencido.'],403);
        }

        /* upsert entrega */
        $entrega = TareaAlumno::updateOrCreate(
            ['tarea_id'=>$tarea_id, 'alumno_clase'=>$request->alumno_clase],
            ['estado'=>'entregado', 'fecha_entrega'=>now()]
        );

        /* sustituye archivo anterior */
        foreach ($entrega->archivos as $prev) {
            Storage::disk('public')->delete($prev->nombre_en_storage);
            $prev->delete();
        }

        $file = $request->file('archivo');
        $path = $file->store('tareas', 'public');

        $entrega->archivos()->create([
            'nombre_original'   => $file->getClientOriginalName(),
            'nombre_en_storage' => $path,
            'fecha_creacion'    => now(),
        ]);

        return response()->json($entrega, 201);
    }

    /*───────────────────────────────
     *  CANCELAR entrega (alumno)
     *───────────────────────────────*/
    public function cancelar(Request $request, $tarea_id)
    {
        $request->validate([
            'alumno_clase' => 'required|exists:clases_alumnos,id',
        ]);

        $entrega = TareaAlumno::where('tarea_id',     $tarea_id)
                   ->where('alumno_clase', $request->alumno_clase)
                   ->firstOrFail();

        foreach ($entrega->archivos as $a) {
            Storage::disk('public')->delete($a->nombre_en_storage);
            $a->delete();
        }

        $entrega->delete();

        return response()->noContent();
    }





    //TAREAS PENDIENTES------------

    public function pendientes()
{
    $user = auth('api')->user();

    $alumnoClases = \App\Models\ClaseAlumno::where('usuario_id', $user->id)->get();

    if ($alumnoClases->isEmpty())
        return response()->json([]);

    $alumnoClaseIds = $alumnoClases->pluck('id');
    $claseIds       = $alumnoClases->pluck('clase_id');

    $tareas = \App\Models\Tarea::with(['tema.clase'])
        ->whereHas('tema', fn ($q) => $q->whereIn('clase_id', $claseIds))
        ->whereNotIn('id', function ($q) use ($alumnoClaseIds) {
            $q->select('tarea_id')
              ->from('tareas_alumnos')
              ->whereIn('alumno_clase', $alumnoClaseIds)
              ->whereIn('estado', ['entregado', 'calificado']);
        })
        ->orderBy('fecha_limite')
        ->get([
            'id',
            'titulo',
            'fecha_limite',
            'tema_id'
        ]);

    $out = $tareas->map(function ($t) {
        return [
            'id'           => $t->id,
            'titulo'       => $t->titulo,
            'fecha_limite' => $t->fecha_limite,
            'clase_id'     => $t->tema->clase->id,
            'clase_nombre' => $t->tema->clase->nombre,
        ];
    });

    return response()->json($out);
}
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TareaAlumno extends Model
{
    protected $table = 'tareas_alumnos';

    protected $fillable = [
        'alumno_clase',
        'tarea_id',
        'calificacion',
        'fecha_entrega',
        'estado',
    ];

    public function claseAlumno()
    {
        return $this->belongsTo(ClaseAlumno::class, 'alumno_clase');
    }

    public function tarea()
    {
        return $this->belongsTo(Tarea::class);
    }

    public function archivos()
    {
        return $this->hasMany(Archivo::class, 'tareas_alumno_id');
    }
}

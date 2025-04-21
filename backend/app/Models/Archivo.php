<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Archivo extends Model
{
    protected $table = 'archivos';

    protected $fillable = [
        'nombre_original',
        'nombre_en_storage',
        'fecha_creacion',
        'tarea_id',
        'material_id',
        'aviso_id',
        'tarea_alumno_id',

    ];

    public function aviso()
    {
        return $this->belongsTo(Aviso::class);
    }

    public function tarea()
    {
        return $this->belongsTo(Tarea::class);
    }

    public function material()
    {
        return $this->belongsTo(Material::class);
    }

    public function tareaAlumno()
    {
        return $this->belongsTo(TareaAlumno::class, 'tarea_alumno_id');
    }
}

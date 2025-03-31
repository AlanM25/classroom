<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClaseAlumno extends Model
{
    protected $table = 'clases_alumnos';

    protected $fillable = [
        'alumno_matricula',
        'clase_codigo',
        'fecha_registro',
    ];

    public function alumno()
    {
        return $this->belongsTo(Alumno::class, 'alumno_matricula', 'matricula');
    }

    public function clase()
    {
        return $this->belongsTo(Clase::class, 'clase_codigo', 'codigo');
    }
}

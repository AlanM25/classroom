<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ClaseAlumno extends Model
{
    protected $table = 'clases_alumnos';

    protected $fillable = [
        'usuario_id',
        'clase_id',
        'fecha_registro',
    ];

    public function alumno()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    public function clase()
    {
        return $this->belongsTo(Clase::class, 'clase_id');
    }
}

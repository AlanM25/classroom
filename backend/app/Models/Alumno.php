<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Alumno extends Model
{
    protected $table = 'alumnos';
    protected $primaryKey = 'matricula';
    public $incrementing = true;

    protected $fillable = [
        'matricula',
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'correo',
        'foto_perfil',
    ];

    public function clases()
    {
        return $this->belongsToMany(Clase::class, 'clases_alumnos', 'alumno_matricula', 'clase_codigo')
            ->withTimestamps()
            ->withPivot('fecha_registro');
    }
}

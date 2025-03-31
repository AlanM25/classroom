<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Clase extends Model
{
    protected $table = 'clases';
    protected $primaryKey = 'codigo';
    public $incrementing = true;

    protected $fillable = [
        'nombre',
        'descripcion',
        'cuatrimestre',
        'carrera_id',
        'maestro_id',
        'fecha_creacion'
    ];

    public function maestro()
    {
        return $this->belongsTo(Maestro::class, 'maestro_id');
    }

    public function carrera()
    {
        return $this->belongsTo(Carrera::class, 'carrera_id');
    }

    public function alumnos()
    {
        return $this->belongsToMany(Alumno::class, 'clases_alumnos', 'clase_codigo', 'alumno_matricula')
            ->withTimestamps()
            ->withPivot('fecha_registro');
    }

    public function avisos()
    {
        return $this->hasMany(Aviso::class, 'clase_codigo');
    }
}

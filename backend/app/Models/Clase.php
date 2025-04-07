<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Carrera;

class Clase extends Model
{
    protected $table = 'clases';
    public $incrementing = true;

    protected $fillable = [
        'nombre',
        'descripcion',
        'cuatrimestre',
        'carrera_id',
        'maestro_id',
        'codigo_clase',
    ];

    public function maestro()
    {
        return $this->belongsTo(Usuario::class, 'maestro_id');
    }

    public function alumnos()
    {
        return $this->belongsToMany(Usuario::class, 'clases_alumnos', 'clase_id', 'usuario_id');
    }

    public function avisos()
    {
        return $this->hasMany(Aviso::class);
    }

    public function carrera()
    {
        return $this->belongsTo(Carrera::class);
    }

    public function temas()
    {
        return $this->hasMany(Tema::class);
    }
}   

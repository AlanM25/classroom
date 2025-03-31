<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Carrera extends Model
{
    protected $table = 'carreras';

    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    public function clases()
    {
        return $this->hasMany(Clase::class, 'carrera_id');
    }
}

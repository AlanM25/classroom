<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Maestro extends Model
{
    protected $table = 'maestros';

    protected $fillable = [
        'nombre',
        'apellido_paterno',
        'apellido_materno',
        'correo',
        'foto_perfil'
    ];

    public function clases()
    {
        return $this->hasMany(Clase::class, 'maestro_id');
    }   
}

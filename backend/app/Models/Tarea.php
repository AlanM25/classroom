<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tarea extends Model
{
    protected $fillable = [
        'titulo',
        'instrucciones',
        'fecha_creacion',
        'fecha_limite',
        'tema_id',
    ];

    public function tema()
    {
        return $this->belongsTo(Tema::class);
    }

    public function archivos()
    {
        return $this->hasMany(Archivo::class);
    }
}

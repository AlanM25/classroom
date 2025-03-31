<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Aviso extends Model
{
    protected $table = 'avisos';

    protected $fillable = [
        'contenido',
        'clase_codigo',
        'fecha_creacion',
    ];

    public function clase()
    {
        return $this->belongsTo(Clase::class, 'clase_codigo');
    }

    public function archivos()
    {
        return $this->hasMany(Archivo::class, 'aviso_id');
    }
}

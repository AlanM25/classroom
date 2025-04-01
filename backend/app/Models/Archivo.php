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
    ];

    public function aviso()
    {
        return $this->belongsTo(Aviso::class);
    }
}

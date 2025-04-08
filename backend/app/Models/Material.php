<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    protected $table = 'materiales'; 

    protected $fillable = [
        'titulo',
        'descripcion',
        'tema_id',
        'fecha_creacion',
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
<?php

namespace App\Models;
use App\Models\Usuario;

use Illuminate\Database\Eloquent\Model;

class Aviso extends Model
{
    protected $fillable = [
        'contenido',
        'clase_id',
        'usuario_id',
    ];

    public function clase()
    {
        return $this->belongsTo(Clase::class);
    }

    public function archivos()
    {
        return $this->hasMany(Archivo::class);
    }

    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }
}

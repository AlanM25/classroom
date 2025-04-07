<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Tema extends Model
{
    protected $fillable = ['titulo', 'descripcion', 'clase_id'];

    public function clase()
    {
        return $this->belongsTo(Clase::class);
    }

    public function tareas()
    {
        return $this->hasMany(Tarea::class);
    }

    public function materiales()
    {
        return $this->hasMany(Material::class);
    }
}

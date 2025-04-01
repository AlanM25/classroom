<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Laravel\Sanctum\HasApiTokens;

class Usuario extends Authenticatable implements JWTSubject
{
    use HasApiTokens, Notifiable;

    protected $table = 'usuarios';

    protected $fillable = [
        'nombre',
        'correo',
        'password',
        'rol',
        'foto_perfil',
    ];

    protected $hidden = ['password'];

    public function clasesComoMaestro()
    {
        return $this->hasMany(Clase::class, 'maestro_id');
    }

    public function clasesComoAlumno()
    {
        return $this->belongsToMany(Clase::class, 'clases_alumnos', 'usuario_id', 'clase_id');
    }

    // JWT
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}

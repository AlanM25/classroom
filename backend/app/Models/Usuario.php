<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Usuario extends Authenticatable implements JWTSubject
{
    use Notifiable;

    protected $table = 'usuarios';

    protected $fillable = [
        'nombre',
        'correo',
        'matricula',
        'maestro_id',
        'rol',
        'foto_perfil',
    ];

    protected $hidden = ['password'];

    public function alumno()
    {
        return $this->belongsTo(Alumno::class, 'matricula', 'matricula');
    }

    public function maestro()
    {
        return $this->belongsTo(Maestro::class, 'maestro_id');
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

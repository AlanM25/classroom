<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UsuariosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('usuarios')->insert([
            [
                'nombre' => 'Juan',
                'apellido' => 'Pérez',
                'correo' => 'juan.maestro@example.com',
                'password' => Hash::make('123456'),
                'rol' => 'maestro',
                'foto_perfil' => null,
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'nombre' => 'Ana',
                'apellido' => 'Gómez',
                'correo' => 'ana.alumno@example.com',
                'password' => Hash::make('123456'),
                'rol' => 'alumno',
                'foto_perfil' => null,
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}

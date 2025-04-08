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
                'correo' => 'juan@example.com',
                'password' => Hash::make('123456'),
                'rol' => 'maestro',
                'carrera_id' => 1,
                'matricula' => null,
                'foto_perfil' => null,
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'nombre' => 'Julissa',
                'apellido' => 'Guerrero',
                'correo' => 'julissa@example.com',
                'password' => Hash::make('123456'),
                'rol' => 'maestro',
                'carrera_id' => 1,
                'foto_perfil' => null,
                'matricula' => null,
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'nombre' => 'Ana',
                'apellido' => 'Gómez',
                'correo' => 'ana@example.com',
                'password' => Hash::make('123456'),
                'rol' => 'alumno',
                'carrera_id' => 2,
                'foto_perfil' => null,
                'matricula' => '2230001',
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'nombre' => 'Jonathan',
                'apellido' => 'Velez',
                'correo' => 'jonavz@gmail.com',
                'password' => Hash::make('123456'),
                'rol' => 'alumno',
                'carrera_id' => 1,
                'foto_perfil' => null,
                'matricula' => '2230002',
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}

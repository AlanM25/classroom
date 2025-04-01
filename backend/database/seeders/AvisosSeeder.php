<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AvisosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('avisos')->insert([
            [
                'contenido' => 'Bienvenidos a la clase de Programación Web.',
                'clase_id' => 1,
                'usuario_id' => 1,
                'fecha_creacion' => now(),
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}

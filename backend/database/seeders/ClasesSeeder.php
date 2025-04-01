<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClasesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('clases')->insert([
            [
                'nombre' => 'Programación Web',
                'descripcion' => 'HTML, CSS, JS y frameworks',
                'cuatrimestre' => 3,
                'carrera_id' => 1,
                'maestro_id' => 1,
                'fecha_creacion' => now(),
                'codigo_clase' => 'PW-2024',
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}

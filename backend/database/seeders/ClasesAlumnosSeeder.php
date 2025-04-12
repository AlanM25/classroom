<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ClasesAlumnosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('clases_alumnos')->insert([
            [
                'usuario_id' => 3,
                'clase_id' => 1,
                'fecha_registro' => now(),
                'created_at' => now(), 'updated_at' => now()
            ],
            [
                'usuario_id' => 4,
                'clase_id' => 1,
                'fecha_registro' => now(),
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}

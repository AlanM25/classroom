<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CarrerasSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('carreras')->insert([
            ['nombre' => 'Ingeniería en Sistemas', 'descripcion' => 'Carrera de tecnología', 'created_at' => now(), 'updated_at' => now()],
            ['nombre' => 'Administración', 'descripcion' => 'Carrera de gestión', 'created_at' => now(), 'updated_at' => now()]
        ]);
    }
}

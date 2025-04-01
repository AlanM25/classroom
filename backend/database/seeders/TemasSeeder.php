<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TemasSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('temas')->insert([
            [
                'titulo' => 'Introducción a HTML',
                'descripcion' => 'Estructura básica',
                'clase_codigo' => 1,
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}

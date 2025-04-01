<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MaterialesSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('materiales')->insert([
            [
                'titulo' => 'Guía HTML',
                'descripcion' => 'Manual en PDF',
                'fecha_creacion' => now(),
                'tema_id' => 1,
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}

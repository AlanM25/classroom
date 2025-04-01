<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ArchivosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('archivos')->insert([
            [
                'nombre_original' => 'guia-html.pdf',
                'nombre_en_storage' => 'archivos/guia-html.pdf',
                'fecha_creacion' => now(),
                'tarea_id' => 1,
                'material_id' => 1,
                'aviso_id' => 1,
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}

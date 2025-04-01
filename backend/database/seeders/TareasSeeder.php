<?php
namespace Database\Seeders;


use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TareasSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tareas')->insert([
            [
                'titulo' => 'Crear una página HTML',
                'instrucciones' => 'Usar etiquetas básicas',
                'fecha_creacion' => now(),
                'fecha_limite' => now()->addDays(5),
                'tema_id' => 1,
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}

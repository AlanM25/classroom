<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TareasAlumnosSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('tareas_alumnos')->insert([
            [
                'alumno_clase' => 1,
                'tarea_id' => 1,
                'calificacion' => 95,
                'fecha_entrega' => now(),
                'estado' => 2,
                'created_at' => now(), 'updated_at' => now()
            ]
        ]);
    }
}

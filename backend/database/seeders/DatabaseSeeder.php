<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;


class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        $this->call([
            CarrerasSeeder::class,
            UsuariosSeeder::class,
            ClasesSeeder::class,
            ClasesAlumnosSeeder::class,
            TemasSeeder::class,
            TareasSeeder::class,
            MaterialesSeeder::class,
            AvisosSeeder::class,
            ArchivosSeeder::class,
            TareasAlumnosSeeder::class,
        ]);






    }
}

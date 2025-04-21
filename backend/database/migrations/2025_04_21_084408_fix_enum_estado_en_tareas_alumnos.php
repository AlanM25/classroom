<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
public function up(): void
{
    Schema::table('tareas_alumnos', function (Blueprint $table) {
        $table->enum('estado', ['pendiente','entregado','calificado'])
              ->default('pendiente')
              ->change();
    });
}

public function down(): void
{
    Schema::table('tareas_alumnos', function (Blueprint $table) {
        $table->tinyInteger('estado')->default(0)->change();
    });

}
};

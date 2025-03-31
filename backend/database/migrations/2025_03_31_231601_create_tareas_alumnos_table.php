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
        Schema::create('tareas_alumnos', function (Blueprint $table) {
            $table->id();
            $table->foreignId('alumno_clase')->constrained('clases_alumnos')->onDelete('cascade');
            $table->foreignId('tarea_id')->constrained('tareas')->onDelete('cascade');
            $table->integer('calificacion')->nullable();
            $table->dateTime('fecha_entrega')->nullable();
            $table->tinyInteger('estado'); // 0: Pendiente, 1: Entregado, 2: Calificado
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tareas_alumnos');
    }
};

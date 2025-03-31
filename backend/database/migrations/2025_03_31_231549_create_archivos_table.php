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
        Schema::create('archivos', function (Blueprint $table) {
            $table->id();
            $table->string('nombre_original');
            $table->string('nombre_en_storage');
            $table->dateTime('fecha_creacion')->default(now());
            $table->foreignId('tarea_id')->nullable()->constrained('tareas')->onDelete('cascade');
            $table->foreignId('material_id')->nullable()->constrained('materiales')->onDelete('cascade');
            $table->foreignId('aviso_id')->nullable()->constrained('avisos')->onDelete('cascade');
            $table->timestamps();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('archivos');
    }
};

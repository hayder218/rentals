<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('maintenance_rules', function (Blueprint $table) {
            $table->id();
            $table->string('subtype')->unique(); // 'oil_change', 'brake_pads', 'air_filter', 'oil_filter'
            $table->string('label');
            $table->integer('interval_mileage');
            $table->timestamps();
        });

        // Seed default rules
        DB::table('maintenance_rules')->insert([
            ['subtype' => 'oil_change', 'label' => 'Oil Change', 'interval_mileage' => 5000, 'created_at' => now(), 'updated_at' => now()],
            ['subtype' => 'brake_pads', 'label' => 'Brake Pads', 'interval_mileage' => 30000, 'created_at' => now(), 'updated_at' => now()],
            ['subtype' => 'air_filter', 'label' => 'Air Filter', 'interval_mileage' => 15000, 'created_at' => now(), 'updated_at' => now()],
            ['subtype' => 'oil_filter', 'label' => 'Oil Filter', 'interval_mileage' => 10000, 'created_at' => now(), 'updated_at' => now()],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('maintenance_rules');
    }
};

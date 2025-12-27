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
        Schema::table('cars', function (Blueprint $table) {
            $table->integer('current_mileage')->default(0)->after('license_plate');
        });

        Schema::table('maintenances', function (Blueprint $table) {
            $table->enum('type', ['consumable', 'repair'])->default('repair')->after('car_id');
            $table->string('subtype')->nullable()->after('type'); // e.g. 'oil_change', 'brake_pads'
            $table->integer('mileage')->nullable()->after('subtype'); // odometer reading at maintenance
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('cars', function (Blueprint $table) {
            $table->dropColumn('current_mileage');
        });

        Schema::table('maintenances', function (Blueprint $table) {
            $table->dropColumn(['type', 'subtype', 'mileage']);
        });
    }
};

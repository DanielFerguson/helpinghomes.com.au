<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('mobile_number')->nullable();
            $table->string('alt_mobile_number')->nullable();
            $table->datetime('mobile_number_verified_at')->nullable();
            $table->datetime('alt_mobile_number_verified_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn([
                'mobile_number',
                'alt_mobile_number',
                'mobile_number_verified_at',
                'alt_mobile_number_verified_at',
            ]);
        });
    }
};

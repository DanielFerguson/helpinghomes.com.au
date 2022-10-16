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
        Schema::create('locations', function (Blueprint $table) {
            $table->id();

            $table->string('suburb');
            $table->string('urbanArea');
            $table->integer('postcode');
            $table->string('state');
            $table->string('stateName');
            $table->string('type');
            $table->string('localGovernmentArea');
            $table->double('lat');
            $table->double('lng');
            $table->string('timezone');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('locations');
    }
};

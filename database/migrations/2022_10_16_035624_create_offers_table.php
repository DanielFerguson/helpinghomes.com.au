<?php

use App\Models\Location;
use App\Models\User;
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
        Schema::create('offers', function (Blueprint $table) {
            $table->id();

            $table->foreignIdFor(User::class);

            $table->double('lat');
            $table->double('lng');
            $table->string('type');
            $table->text('notes');

            // Housing offers
            $table->string('duration')->nullable()->comment('Housing offers only. Eg. short|medium|long');
            $table->string('capacity')->nullable()->comment('Housing offers only. Eg. single|couple|family');
            $table->boolean('canTakePets')->nullable()->default(false)->comment('Housing offers only.');

            // Offers of assistance
            $table->string('assistanceType')->nullable()->comment('Offers of assistance only. Eg. move_personal, move_livestock');

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
        Schema::dropIfExists('offers');
    }
};

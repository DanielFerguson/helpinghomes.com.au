<?php

namespace Database\Factories;

use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Offer>
 */
class OfferFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $type = rand(0, 1) ? 'HOUSING' : 'TRANSPORT_ASSISTANCE';

        $duration = $type === 'HOUSING'
            ? ['SHORT', 'MEDIUM', 'LONG'][rand(0, 2)]
            : null;

        $capacity = $type === 'HOUSING'
            ? ['SINGLE', 'COUPLE', 'FAMILY'][rand(0, 2)]
            : '';

        $randomLocation = Location::inRandomOrder()->first();

        return [
            'lat' => $randomLocation->lat,
            'lng' => $randomLocation->lng,
            'type' => $type,
            'notes' => fake()->text(),
            'duration' => $duration,
            'capacity' => $capacity,
            'canTakePets' => $type === 'HOUSING' ? rand(0, 1) : null,
            'assistanceType' => $type === 'TRANSPORT_ASSISTANCE' ? ['TRANSPORT_LIVESTOCK', 'SHELTER_LIVESTOCK'][rand(0, 1)] : null,
        ];
    }
}

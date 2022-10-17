<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Location::truncate();

        $csvFile = fopen(base_path('database/data/suburbs.csv'), 'r');

        while (($data = fgetcsv($csvFile)) !== false) {
            Location::create([
                'suburb' => $data[1],
                'urbanArea' => $data[2],
                'postcode' => $data[3],
                'state' => $data[4],
                'stateName' => $data[5],
                'type' => $data[6],
                'localGovernmentArea' => $data[7],
                'lng' => $data[13],
                'lat' => $data[14],
                'timezone' => $data[15],
            ]);
        }
    }
}

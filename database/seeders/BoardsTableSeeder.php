<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BoardsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Boards::truncate();

        $faker= \Faker\Factory::create();

        for ($i = 0; $i < 10; $i++) {
            Boards::create([
                'id'=>$faker->sentence,
                'title' => $faker->sentence,
                'description' => $faker->paragraph,
                'stickies' => $faker->paragraph,
            ]);
        }

    }
}

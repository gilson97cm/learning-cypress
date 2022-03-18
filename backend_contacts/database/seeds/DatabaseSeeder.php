<?php

use Illuminate\Database\Seeder;
use Faker\Factory as Faker;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();
        for ($i = 1; $i<=25; $i++){
            \App\User::create([
                'name' => $faker->firstname,
                'lastName' => $faker->lastname,
                'phone' => rand(1000000000,9999999999),
                'email' => $faker->email,
                'username' => $faker->username,
                'password' => 'root',
                'gender' => $i%2==0 ? 'Masculino' : 'Femenino',
                'date' => now()->format('Y-m-d')
            ]);
        }

        // $this->call(UserSeeder::class);
    }
}

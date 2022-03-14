<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        for ($i = 1; $i<=50; $i++){
            \App\User::create([
                'name' => 'User '.$i,
                'lastname' => 'Test',
                'phone' => rand(1000000000,9999999999),
                'email' => 'user'.$i.'@email.com',
                'gender' => $i%2==0 ? 'Masculino' : 'Femenino',
                'date' => now()->format('Y-m-d')
            ]);
        }

        // $this->call(UserSeeder::class);
    }
}

<?php

use Illuminate\Database\Seeder;
use App\Entity\v1\UsersEntity as User;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::create([
            'name'     => 'LEANDRO',
            'email'    => 'leadro@gmail.com',
            'password' => Hash::make('123456789')
        ]);

        User::create([
            'name'     => 'GABRIELA',
            'email'    => 'gabriela@gmail.com',
            'password' => Hash::make('123456789')
        ]);

        User::create([
            'name'     => 'GUSTAVO',
            'email'    => 'gus@gmail.com',
            'password' => Hash::make('123456789')
        ]);
    }
}

<?php

use Illuminate\Database\Seeder;
use App\Entity\v1\ProductsEntity;
class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        ProductsEntity::create([
            'name'        => 'Pastel de Carne',
            'description' => 'Pastel com carne',
            'price'       => 2.5,
        ]);

        ProductsEntity::create([
            'name'        => 'Quibe de Arroz',
            'description' => 'Carne moida com arroz',
            'price'       => 3.7,
        ]);

        ProductsEntity::create([
            'name'        => 'Bolo de Chocolate',
            'description' => 'Bolo de Chocoalte da Nestle',
            'price'       => 35.99,
        ]);

        ProductsEntity::create([
            'name'        => 'Soverte de Morango',
            'description' => 'Sorverte de Morango da Nestle',
            'price'       => 44.5,
        ]);

        ProductsEntity::create([
            'name'        => 'Alface',
            'description' => 'Alfece Dona Benta',
            'price'       =>  1.5,
        ]);

        ProductsEntity::create([
            'name'        => 'Cheiro Verder',
            'description' => 'Cheiro Verder Dona Benta',
            'price'       =>  1.5,
        ]);
    }
}

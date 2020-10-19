<?php

use Illuminate\Database\Seeder;
use App\Entity\v1\CategoriesEntity as Category;

class CategoriesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Category::create([
            'name' => 'Doces'
        ]);

        Category::create([
            'name' => 'Salgados'
        ]);

        Category::create([
            'name' => 'Verduras'
        ]);
    }
}

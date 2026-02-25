<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Category;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Roles
        Role::firstOrCreate(['name' => 'Admin']);
        Role::firstOrCreate(['name' => 'Seller']);
        Role::firstOrCreate(['name' => 'Buyer']);

        // 2. Categories
        $categories = [
            ['name' => 'Houses',    'slug' => 'houses'],
            ['name' => 'Cars',      'slug' => 'cars'],
            ['name' => 'Plots',     'slug' => 'plots'],
            ['name' => 'BnB',       'slug' => 'bnb'],
            ['name' => 'Car Hire',  'slug' => 'car-hire'],
        ];

        foreach ($categories as $cat) {
            Category::firstOrCreate(['slug' => $cat['slug']], $cat);
        }

        // 3. Admin user
        $admin = User::firstOrCreate(
            ['email' => 'admin@rainview.com'],
            ['name' => 'Admin', 'password' => bcrypt('password')]
        );
        $admin->assignRole('Admin');

        // 4. Seller user
        $seller = User::firstOrCreate(
            ['email' => 'seller@rainview.com'],
            ['name' => 'Test Seller', 'password' => bcrypt('password')]
        );
        $seller->assignRole('Seller');

        // 5. Buyer user
        $buyer = User::firstOrCreate(
            ['email' => 'test@example.com'],
            ['name' => 'Test User', 'password' => bcrypt('password')]
        );
        $buyer->assignRole('Buyer');
    }
}

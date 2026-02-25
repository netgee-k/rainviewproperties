#!/usr/bin/env bash

cd ~/rainviewproperties

php artisan tinker --execute="
\$user = \App\Models\User::firstOrCreate(
    ['email' => 'netg3ek@gmail.com'],
    [
        'name'               => 'Super Admin',
        'password'           => bcrypt('password123'),
        'email_verified_at'  => now(),
    ]
);
\$user->assignRole('Admin');
echo 'Done! Login: netg3ek@gmail.com / password123';
"

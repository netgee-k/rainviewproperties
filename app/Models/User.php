<?php

namespace App\Models;

use Spatie\Permission\Traits\HasRoles;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Illuminate\Database\Eloquent\Relations\HasMany;

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable, HasRoles;

    /**
     * Mass assignable attributes
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Hidden attributes
     */
    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];

    /**
     * Casts
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }

    /**
     * Automatically assign Buyer role on registration
     */
    protected static function booted(): void
    {
        static::created(function ($user) {
            if (! $user->hasAnyRole(['Admin', 'Seller', 'Buyer'])) {
                $user->assignRole('Buyer');
            }
        });
    }

    /**
     * Only Admin can access Filament admin panel
     */
    public function canAccessFilament(): bool
    {
        return $this->hasRole('Admin');
    }

    /**
     * A user can have many listings
     */
    public function listings(): HasMany
    {
        return $this->hasMany(Listing::class);
    }
}
<?php
namespace App\Repository\AuthRepository;

use Illuminate\Http\Request;

Interface AuthUserRepositoryInterface {
    public function login($credentials);
    public function logout();
}

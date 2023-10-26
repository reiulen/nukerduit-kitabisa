<?php
namespace App\Repository\AuthRepository;


Interface AuthUserRepositoryInterface {
    public function login($credentials);
    public function profile();
    public function logout();
}

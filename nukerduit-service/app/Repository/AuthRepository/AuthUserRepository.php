<?php

namespace App\Repository\AuthRepository;

use App\Repository\AuthRepository\AuthUserRepositoryInterface;

class AuthUserRepository implements AuthUserRepositoryInterface {

    public function login($credentials)
    {
        if (!$token = auth()->attempt($credentials))
            return false;

        return $this->respondWithToken($token);
    }

    public function profile()
    {
        return auth()->user();
    }

    public function logout()
    {
        return auth()->logout();
    }

    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * env('JWT_TTL')
        ];
    }
}

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
        $user = auth()->user();
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * env('JWT_TTL'),
            'logged_in_at' => date('Y-m-d H:i:s'),
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'username' => $user->username
            ]
        ];
    }
}

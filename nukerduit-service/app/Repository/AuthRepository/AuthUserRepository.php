<?php

namespace App\Repository\AuthRepository;

use App\Http\Controllers\Controller;
use App\Models\AuthHistory;
use App\Repository\AuthRepository\AuthUserRepositoryInterface;

class AuthUserRepository implements AuthUserRepositoryInterface {

    protected $controller;
    public function __construct(Controller $controller)
    {
        $this->controller = $controller;
    }

    public function login($credentials)
    {
        if (!$token = auth()->attempt($credentials))
            return false;

        $this->controller->atomic(function () {
            $this->historyLogin('login');
        });

        return $this->respondWithToken($token);
    }

    public function profile()
    {
        return auth()->user();
    }

    public function logout()
    {
        $this->controller->atomic(function () {
            $this->historyLogin('logout');
        });
        
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

    private function historyLogin($type)
    {
        $historyLogin = AuthHistory::create([
            'user_id' => auth()->user()->id,
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'payload_user' => json_encode(auth()->user()),
            'type' => $type
        ]);

        return $historyLogin;
    }
}

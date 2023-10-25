<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Repository\AuthRepository\AuthUserRepository;
use Illuminate\Http\Request;

class AuthUserController extends Controller
{
    private $authUserRepository;
    public function __construct(AuthUserRepository $authUserRepository ) {
        $this->authUserRepository = $authUserRepository;
    }

    public function login(Request $request)
    {
        $credentials = $request->only(['username', 'password']);
        try {
            $login = $this->authUserRepository->login($credentials);
            if(!$login)
                return $this->sendResponse(false, 'Username or Password doesnt exist!', 401);

            return $this->sendResponseWithDatas($login, 'Login successfully!');
        } catch (\Exception $e) {
            return $this->sendResponse(true, $e->getMessage(), 500);
        }
    }
}

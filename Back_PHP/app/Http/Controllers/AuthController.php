<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;

use App\Http\Requests\RegisterRequest;
use Illuminate\Support\Facades\Hash;
use App\User as User;


class AuthController extends Controller
{
    public function login (Request $request)
    {
        try{
            if(Auth::attempt($request->only(['email','password'])))
            {          
                /** @var User $user */
                $user = Auth::user();
                $token = $user->createToken('app')->accessToken;

                return response([
                    'message' => 'Correcto',
                    'token' => $token,
                    'user' => $user
                ]);
            }
        }catch (\Exception $exception){
            return response([
                'message' => $exception->getMessage()
            ],400);
        }


        return response([
            'message' => 'Usuario y/o contraseña son incorrectos'
        ], 401);

    }

    public function user()
    {
        return Auth::user();
    }

    public function register(RegisterRequest $request)
    {
        try{
            $user = User::create([
                'first_name' => $request->input('first_name'),
                'last_name' => $request->input('last_name'),
                'email' => $request->input('email'),
                'user_status' => '1',
                'phone' => null,
                'password' => Hash::make($request->input('password')),
            ]);
            return response([
                //'message' => $exception->getMessage()
                'message' => 'Usuario agregado correctamente'//$exception
            ], 200);

        }catch (\Exception $exception){
            return response([
                //'message' => $exception->getMessage()
                'message' => 'Algunos datos son incorrectos'//$exception
            ], 400);

        }
    }

}

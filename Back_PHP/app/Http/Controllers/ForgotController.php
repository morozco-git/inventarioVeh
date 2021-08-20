<?php

namespace App\Http\Controllers;

use App\Http\Requests\ForgotRequest;
use App\Http\Requests\ResetRequest;

use App\User as User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Illuminate\Mail\Message;


class ForgotController extends Controller
{
    public function forgot(ForgotRequest $request)
    {
        $email = $request->input('email');

        if(User::where('email', $email)->doesntExist()){
            return response([
                'message' => 'Este usuario no existe'
            ], 404);
        }

        $token = Str::random(15);

        try {
            DB::table('password_resets')->insert([
                'email' => $email,
                'token' => $token
            ]);

            //Send email
            Mail::send('Mails.forgot', ['token' => $token], 
            function (Message $message) use ($email){
                $message->to($email);
                $message->subject('Restablecer su contraseña');
            });

            return response([
                'message' => 'Por favor verifique su correo'
            ]);

        } catch (\Exception $exception){
            return response([
                'message' => $exception->getMessage()
            ], 400);

        }
    }

    public function reset (ResetRequest $request){
        $token = $request->input('token');
        if(!$passwordResets=DB::table('password_resets')->where('token', $token)->first()){
            return response([
                'message' => 'Usuario no autorizado'
            ], 400);
        }

        /** @var User $user */
        if(!$user = User::where('email', $passwordResets->email)->first()){
            return response([
                'message' => 'Este usuario no existe'
            ], 404);
        }

        $user->password = Hash::make($request->input('password'));
        $user->save();

        return response([
            'message' => 'Correcto'
        ]);
    }
}

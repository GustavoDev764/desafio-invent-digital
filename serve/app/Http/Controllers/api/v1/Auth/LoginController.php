<?php

namespace App\Http\Controllers\api\v1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Entity\v1\UsersEntity as User;
use \Exception;

class LoginController extends Controller
{
    public function login(Request $request){

        try {

            //Validando o login
            $validator = Validator::make($request->all(),[
                'email'    => ['required', 'string', 'email', 'max:255'],
                'password' => ['required', 'string', 'min:8', 'max:255']
            ]);

            //Verifica o Validato
            if($validator->fails())
                return response(['status'=> false, 'messages' => $validator->errors()]);

            $data = [
                'email'    => $request->input('email'),
                'password' => $request->input('password')
            ];


            if(!Auth::attempt($data)){
                $user = User::where('email',$data['email'])->first();

                if(!$user){
                    return response([
                        'status' => false,
                        'messages'=> [
                            'login'=>['Credenciais não encontradas!']
                        ]
                    ]);
                }

                return response([
                    'status' => false,
                    'messages'=> [
                        'login'=>['Credenciais de login inválidas.']
                    ]
                ]);
            }


            //cria o token
            $accessToken = Auth::user()->createToken('authToken')->accessToken;

            return response([
                'status'   => true,
                'messages' => ['login' =>['authenticado com success!'] ],
                'user'     => Auth::user(),
                'token'    => $accessToken
            ]);

        }catch (Exception $e){
            return response([
                'status'   => false,
                'messages' => 'Serve Erro, Notifica o Administrado!',
            ]);
        }

    }
}

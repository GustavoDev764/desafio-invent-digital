<?php

namespace App\Http\Controllers\api\v1\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Entity\v1\UsersEntity as User;

class RegisterController extends Controller
{

    public function register(Request $request){
        try {
            $table = User::$name_table;

            //Validando o login
            $validator = Validator::make($request->all(),[
                'name'     => ['required', 'max:255'],
                'email'    => ['required', 'string', 'email', 'max:255', 'unique:'.$table.''],
                'password' => ['required', 'string', 'min:8', 'max:255']
            ]);

            //Verifica o Validato
            if($validator->fails())
                return response(['status'=> false, 'messages' => $validator->errors()]);

            $user = User::create([
                'name'     => $request->input('name'),
                'email'    => $request->input('email'),
                'password' => $request->input('password'),
            ]);

            return response([
                'status'   => true,
                'messages' => ['login'=>'Cadastrado com Sucesso!'],
                'user' => $user
            ]);

        }catch (Exception $e){
            return response([
                'status'   => false,
                'messages' => 'Serve Erro, Notifica o Administrado!',
            ]);
        }
    }
}

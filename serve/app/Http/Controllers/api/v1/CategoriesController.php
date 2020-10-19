<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Entity\v1\CategoriesEntity;
use \Exception;
use Illuminate\Support\Facades\Validator;

class CategoriesController extends Controller
{
    private $perPage = 10;
    private $page    = 1;
    private $name_table = '';

    public function __construct()
    {
        $this->name_table  = CategoriesEntity::$name_table;
    }

    public function create(Request $request){
        try {
            //Validando o produto
            $validator = Validator::make($request->all(),[
                'name' => ['required', 'string', 'max:255'],
            ]);

            //Verifica o Validato
            if($validator->fails())
                return response(['status'=> false, 'messages' => $validator->errors()]);

            $category = CategoriesEntity::create([
                'name' => $request->input('name')
            ]);

            return response([
                'status'   => true,
                'messages' => [ 'created' => 'Cadastrado com Sucesso!' ],
                'category'  => $category,
            ]);

        }catch (Exception $e){
            return response([
                'status'   => false,
                'messages' => 'Serve Erro, Notifica o Administrado!',
            ]);
        }


    }

    public function edit(Request $request){

        try {

            //Validando o produto
            $validator = Validator::make($request->all(),[
                'name' => ['required', 'string', 'max:255'],
                'id'   => ['required', 'exists:'.$this->name_table.',id']
            ]);

            //Verifica o Validato
            if($validator->fails())
                return response(['status'=> false, 'messages' => $validator->errors()]);

            $category = CategoriesEntity::where('id',$request->input('id'))
                ->update([
                    'name' => $request->input('name'),
                ]);

            if(!$category){
                return response(['status'=> false, 'messages' => ['updated'=> 'erro ao tenta altera!']]);
            }

            $category = CategoriesEntity::find($request->input('id'));

            return response([
                'status'   => true,
                'messages' => [ 'updated' => 'Alterado com Sucesso!' ],
                'category'  => $category,
            ]);

        }catch (Exception $e){
            return response([
                'status'   => false,
                'messages' => 'Serve Erro, Notifica o Administrado!',
            ]);
        }
    }

    public function delete(Request $request){
        try {
            $id = $request->input('id');

            //Validando o produto
            $validator = Validator::make(['id'=>$id],[
                'id'  => ['required', 'exists:'.$this->name_table.',id'],
            ]);

            //Verifica o Validato
            if($validator->fails())
                return response(['status'=> false, 'messages' => $validator->errors()]);

            $delete = CategoriesEntity::where('id',$id)->delete();

            if(!$delete){
                return response(['status'=> false, 'messages' => ['delete'=> 'erro ao tenta deleta!']]);
            }

            return response([
                'status'   => true,
                'messages' => [ 'delete' => 'Deletado com Sucesso!' ],
            ]);

        }catch (Exception $e){
            return response([
                'status'   => false,
                'messages' => 'Serve Erro, Notifica o Administrado!',
            ]);
        }

    }

    public function list(Request $request){
       try {
            $name = $request->name;
            $this->page    = (int) $request->get('page');
            $this->page    = $this->page <= 0 ? 1 : $this->page;

            if (!$name)
                return CategoriesEntity::findAll($this->perPage,$this->page);

            return CategoriesEntity::findByName($this->perPage,$this->page,$name);

        }catch (Exception $e){
            return response([
                'status'   => false,
                'messages' => 'Serve Erro, Notifica o Administrado!',
            ]);
        }

    }

    public function findById(Request $request){
        try {
            $id = (int) $request->id;

            $category = CategoriesEntity::find($id);

            return response([
                'status'   => !!$category ? true : false,
                'messages' => [],
                'category'  => $category
            ]);

        }catch (Exception $e){
            return response([
                'status'   => false,
                'messages' => 'Serve Erro, Notifica o Administrado!',
            ]);
        }
    }
}

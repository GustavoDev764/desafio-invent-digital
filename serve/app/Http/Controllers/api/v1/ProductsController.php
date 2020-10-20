<?php

namespace App\Http\Controllers\api\v1;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use \Exception;
use Illuminate\Support\Facades\Validator;
use App\Entity\v1\CategoriesEntity;
use App\Entity\v1\ProductsEntity;

class ProductsController extends Controller
{
    private $perPage = 10;
    private $page    = 1;
    private $categoriaT = '';
    private $name_table = '';

    protected $guard = 'users';

    public function __construct()
    {
        $this->categoriaT  = CategoriesEntity::$name_table;
        $this->name_table  = ProductsEntity::$name_table;
    }

    public function create(Request $request)
    {

        try {
            //Validando o produto
            $validator = Validator::make($request->all(),[
                'name'        => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
                'price'       => ['required', 'numeric'],
                'id_category' => ['nullable', 'exists:'.CategoriesEntity::$name_table.',id'],
            ]);

            //Verifica o Validato
            if($validator->fails())
                return response(['status'=> false, 'messages' => $validator->errors()]);



            $produto = ProductsEntity::create([
                'name'         => $request->input('name'),
                'description'  => $request->input('description'),
                'price'        => $request->input('price'),
                'id_category'  => !!$request->input('id_category') ? $request->input('id_category') : null
            ]);

            return response([
                'status'   => true,
                'messages' => [ 'created' => 'Cadastrado com Sucesso!' ],
                'produto'  => $produto,
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
                'id'          => ['required', 'exists:'.$this->name_table.',id'],
                'name'        => ['required', 'string', 'max:255'],
                'description' => ['required', 'string', 'max:255'],
                'price'       => ['required', 'numeric'],
                'id_category' => ['nullable', 'exists:'.$this->categoriaT.',id'],
            ]);

            //Verifica o Validato
            if($validator->fails())
                return response(['status'=> false, 'messages' => $validator->errors()]);


            $produto = ProductsEntity::where('id',$request->input('id'))
                ->update([
                    'name'         => $request->input('name'),
                    'description'  => $request->input('description'),
                    'price'        => $request->input('price'),
                    'id_category'  => !!$request->input('id_category') ? $request->input('id_category') : null
                ]);

            if(!$produto){
                return response(['status'=> false, 'messages' => ['updated'=> 'erro ao tenta altera!']]);
            }

            $produto = ProductsEntity::find($request->input('id'));

            return response([
                'status'   => true,
                'messages' => [ 'updated' => 'Alterado com Sucesso!' ],
                'produto'  => $produto,
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
            $id = $request->id;

            //Validando o produto
            $validator = Validator::make(['id'=>$id],[
                'id'  => ['required', 'exists:'.$this->name_table.',id'],
            ]);

            //Verifica o Validato
            if($validator->fails())
                return response(['status'=> false, 'messages' => $validator->errors()]);

            $delete = ProductsEntity::where('id',$id)->delete();

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
                return ProductsEntity::findAll($this->perPage,$this->page);

            return ProductsEntity::findByName($this->perPage,$this->page,$name);
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

            $produto = ProductsEntity::find($id);

            return response([
                'status'   => !!$produto ? true : false,
                'messages' => [],
                'produto'  => $produto
            ]);

        }catch (Exception $e){
            return response([
                'status'   => false,
                'messages' => 'Serve Erro, Notifica o Administrado!',
            ]);
        }

    }
}

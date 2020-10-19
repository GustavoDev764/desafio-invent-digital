<?php

namespace App\Entity\v1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use App\Entity\v1\CategoriesEntity;

class ProductsEntity extends Model
{
    use SoftDeletes;

    protected $table = 'products';
    public static $name_table = 'products';

    protected $fillable = [
        'id',
        'name',
        'description',
        'price',
        'id_category'
    ];

    public static function findAll($perPage = 10, $page = 1):LengthAwarePaginator{

        $produtos = DB::table(self::$name_table)->select()
            ->where([
               [ 'deleted_at', '=', null]
            ])
            ->orderBy('name')
            ->paginate($perPage,$page);

        $cloneprodutos = $produtos;
        foreach ($cloneprodutos as $key => $produto) {
            if($produto->id_category){
                $produtos[$key]->category = CategoriesEntity::find($produto->id_category);
            }
        }
        return $produtos;
    }

    public static function findByName($perPage = 10, $page = 1, $name):LengthAwarePaginator{

        $produtos = DB::table(self::$name_table)->select()
            ->where([
                [ 'deleted_at', '=', null],
                [ 'name', 'LIKE', '%'.$name.'%']
            ])
            ->orderBy('name')
            ->paginate($perPage,$page);

        $cloneprodutos = $produtos;
        foreach ($cloneprodutos as $key => $produto) {
            if($produto->id_category){
                $produtos[$key]->category = CategoriesEntity::find($produto->id_category);
            }
        }
        return $produtos;
    }
}

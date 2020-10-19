<?php

namespace App\Entity\v1;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class CategoriesEntity extends Model
{
    protected $table = 'categories';

    public static $name_table = 'categories';

    protected $fillable = [
        'id',
        'name'
    ];

    public static function findAll($perPage = 10, $page = 1):LengthAwarePaginator{
        $categories = DB::table(self::$name_table)->select()
            ->orderBy('name')
            ->paginate($perPage,$page);

        return $categories;
    }

    public static function findByName($perPage = 10, $page = 1, $name):LengthAwarePaginator{
        $categories = DB::table(self::$name_table)->select()
            ->where([
                ['name', 'LIKE', '%'.$name.'%']
            ])
            ->orderBy('name')
            ->paginate($perPage,$page);

        return $categories;
    }
}

<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('/users')->group(function (){
    Route::post('/login', 'api\v1\Auth\LoginController@login');
    Route::post('/register', 'api\v1\Auth\RegisterController@register');
});

//rotas Protegidas
Route::middleware('auth_api_v1')->group(function (){

    Route::prefix('/products')->group(function (){
        Route::post('/create', 'api\v1\ProductsController@create');
        Route::put('/edit', 'api\v1\ProductsController@edit');
        Route::delete('/delete/{id}', 'api\v1\ProductsController@delete');
        Route::get('/list/{name?}', 'api\v1\ProductsController@list');
        Route::get('/find-by-id/{id}', 'api\v1\ProductsController@findById');
    });

    Route::prefix('/categories')->group(function (){
        Route::post('/create', 'api\v1\CategoriesController@create');
        Route::put('/edit', 'api\v1\CategoriesController@edit');
        Route::delete('/delete/{id}', 'api\v1\CategoriesController@delete');
        Route::get('/list/{name?}', 'api\v1\CategoriesController@list');
        Route::get('/find-by-id/{id}', 'api\v1\CategoriesController@findById');
    });

    Route::any('/page1', function() {
        return response(['permision'=> true, 'messages'=> 'voçe tem acesso a pagina 1']);
    });
});


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

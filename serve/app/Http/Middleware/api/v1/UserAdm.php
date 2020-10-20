<?php

namespace App\Http\Middleware\api\v1;

use Closure;
use Illuminate\Support\Facades\Auth;

class UserAdm
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        /*
        if(!Auth::guard('auth_api_v1')->check()){
            return response(['permision'=> false, 'messages'=>['permision'=>['accesso negado!'] ]]);
        }
            */

        return $next($request);
    }
}

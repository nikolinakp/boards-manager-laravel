<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BoardsController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/
Broadcast::routes(['middleware' => ['auth:sanctum']]);

Route::middleware('auth:sanctum')->get('/user', function (Request $request){
    return $request->user();
});
Route::middleware('auth:sanctum')->group(function(){
    Route::post('boards',[BoardsController::class,"store"]);
    Route::get('boards', [BoardsController::class,"index"]);
    Route::delete('boards/{id}', [BoardsController::class,"delete"]);
});



/*//token
Route::post('/tokens/create', function (Request $request){
    $token = $request->user()->createToken($request->token_name);

    return ['token' => $token->plainTextToken];
});

Route::get('/orders', function () {
})->middleware(['auth:sanctum', 'abilities:check-status,place-orders']);
*/

//Route::get('boards/{id}', [BoardsController::class,"show"]);
//Route::put('boards/{id}', [BoardsController::class,"update"]);

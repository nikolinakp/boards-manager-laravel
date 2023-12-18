<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use App\Http\Controllers\BoardsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
Route::middleware('auth:sanctum')->get('/user', function (Request $request){
    return $request->user();
});

Route::get('/', function () {
    return view('mainPage');
});
Route::get('/boardPage', [BoardsController::class, 'redirectToBoardsPage']) -> name("boardPage");

Route::get('/unidentified', function () {
    return view('unidentified');
});

/*Route::middleware('auth:sanctum')->group(function(){
    Route::get('/boardPage', [BoardsController::class, 'redirectToBoardsPage']) -> name("boardPage");
   // Route::get('/unidentified', [BoardsController::class, 'redirectToUnidentiifiedPage']) -> name("unidentified");
});*/

Route::post('/login',function(Request $request){
    $credentials=$request->only('email','password');
   // dd($credentials);
    if(Auth::attempt($credentials)){
        $user = Auth::user();
        $token= $user->createToken('auth_token')->plainTextToken;
        return response()->json(['token' => $token]);
    }
    return response()->json(['Not authification'],401);
})->name('login');

Route::get('/login', function () {
})->middleware(['auth:sanctum', 'ability:check-status,place-orders']);


//Route::get('/login',[BoardsController::class ,'redirectToUnidentiifiedPage'])->name('login');

//Route::get('/login', 'UserController@index')->name('login');
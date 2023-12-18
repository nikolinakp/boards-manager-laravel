<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\Boards;

class UserController extends Controller
{
    public function register(){
        return "Hello from our controller";
    }

   // public function redirectToUnidentiifiedPage(){
    //    return view('unidentified');
    //}
}

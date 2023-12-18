<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Boards;

class BoardsController extends Controller
{
    public function redirectToBoardsPage(){
        return view('boardPage');
    }

    public function redirectToUnidentiifiedPage(){
        return view('unidentified');
    }
    
    public function index()
    {
        return Boards::all();
    }

    public function store(Request $request)
    {
        $board=Boards::create(
            [
                'title' => $request->input('title'),
                'description' => $request->input ('description'),
                'stickies' => json_encode($request->input('stickies')),
            ]);
        return response()->json($board,201);
    }

    public function delete($id)
    {
      $selectedBoard=Boards::find($id);
        if(!$selectedBoard){
             return response()->json(['Selected board not exist'],404);
        }

        $selectedBoard->delete();

        return response()->json([ 'Successfully deleted board!']);
   } 

   /*public function deleteAllBoards(){
        Boards::truncate();
        return response()->json(['Successfully deleted all existed boards!']);
   }*/


   /* public function show($id)
    {
        return Boards::find($id);
    }*/

   /* public function update(Request $request, Board $boards)
   {
        $boards->update($request->all());
        return response()->JSON.stringify($boards,200);
    }*/

}

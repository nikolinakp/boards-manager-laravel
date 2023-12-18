<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Boards extends Model
{
    protected $fillable = ['title','description','stickies'];
    public $timestamps=false;
}

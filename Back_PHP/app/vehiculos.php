<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class vehiculos extends Model
{
    //Indoicate table name from DB
    protected $table = 'vehiculos'; 
    //so eloquent doesn't expect your primary key to be an autoincrement primary key.
    public $incrementing = true;
    //To no saving timestamps auto
    public $timestamps = false;
    protected  $fillable = ['idvehiculo','tipo', 'nLlantas', 'pMotor'];    
}

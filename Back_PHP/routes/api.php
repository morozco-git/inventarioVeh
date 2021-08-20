<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
**/

Route::group(['middleware' => ['cors']], function () {
    //FREE ACCESS:
    Route::post('login', 'AuthController@login');
    Route::post('forgot', 'ForgotController@forgot');
    Route::post('reset', 'ForgotController@reset');

    //=====================================================
    // AUTH REQUIRED:
    //=====================================================
    Route::group(['middleware' => 'auth:api'], function (){
        Route::get('user', 'AuthController@user');
        Route::post('register', 'AuthController@register');
        Route::post('add', 'VehiculoController@addVehiculos');
        Route::post('getAllInv', 'VehiculoController@displayAllVehiculos');
    });

});
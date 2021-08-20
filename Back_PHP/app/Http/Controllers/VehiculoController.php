<?php
namespace App\Http\Controllers;

use App\Http\Requests\VehiculoRequest;
use App\Http\Controllers\Controller;
use App\vehiculos as DBVehiculos;
use Illuminate\Support\Facades\DB;

class VehiculoController extends Controller
{
    public function addVehiculos(VehiculoRequest $request)
    {
        $tipo=$request->input('tipo');
        $nLlantas=$request->input('nLlantas');
        $pMotor=$request->input('pMotor');

             try{
                 DBVehiculos::create([
                     'tipo' => $tipo, 
                     'nLlantas' => $nLlantas,
                     'pMotor' => $pMotor
                 ]);

                 return response([
                    'message' => 'Vehículo Agregado'
                 ],200);

             }catch (\Exception $exception){
                 return response([
                     'message1' => $exception->getMessage(),
                     //'message' => 'Error inesperado',
                 ],400);
             }

    }

    public function displayAllVehiculos()
    {
            try{
                 $getAllInventario = DBVehiculos::
                 select(DB::raw('tipo, pMotor, nLlantas, count(*) as Total'))   
                 ->groupBy('tipo','nLlantas','pMotor')
                 -> get(); 

                 return response([
                    'message' => 'Inventario generado',
                    'allInventario' => $getAllInventario
                 ],200);

             }catch (\Exception $exception){
                 return response([
                     'message' => $exception->getMessage(),
                     //'message' => 'Error inesperado',
                 ],400);
             }

    }  

}
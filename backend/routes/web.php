<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Artisan;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/migrar-bd-secreta', function () {
    Artisan::call('migrate', ['--force' => true]);
    return "¡Las tablas se han creado exitosamente en Clever Cloud!";
});
Route::get('/llenar-bd-secreta', function () {
    Artisan::call('db:seed', ['--force' => true]);
    return "¡Los pasteles y datos de prueba se han inyectado exitosamente en Clever Cloud!";
});
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
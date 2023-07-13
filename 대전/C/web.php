<?php

use src\App\Route;

Route::get("/", "IndexController@Index");
Route::get("/login", "IndexController@login");
Route::get("/join", "IndexController@join");
Route::get("/logout", "IndexController@logout");

Route::post("/join/process", "IndexController@joinProcess");
Route::post("/login/process", "IndexController@loginProcess");


//
Route::get('/acco/register', 'AccoController@accoRegister');
Route::post('/acco/register/process', 'AccoController@accoRegisterProcess');
Route::post('/acco/modify/process', 'AccoController@accoModifyProcess');

// 
Route::get('/room/register', 'AccoController@roomRegister');
Route::post('/room/register/process', 'AccoController@roomRegisterProcess');

// 
Route::get('/room', 'AccoController@roomList');
Route::get('/room/delete/{idx}', 'AccoController@roomDelete');

// 
Route::get('/acco/{category}/{search}', 'ClientController@acco');
Route::get('/room/detail/{idx}', 'ClientController@room');
Route::post('/room/reservation/process', 'ClientController@reservation');

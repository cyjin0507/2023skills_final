<?php

use src\App\Route;

Route::get("/", "IndexController@Index");

Route::get("/login", "IndexController@login");
Route::get("/logout", "IndexController@logout");
Route::post("/login/process", "IndexController@loginProcess");


Route::get('/place', "ClientController@place");

Route::post('/review/add', "ClientController@reviewAdd");
Route::get('/place/get/data', "ClientController@placeGetData");
Route::get('/review/get/data', "ClientController@reviewGetData");
Route::get('/review/score/count/{idx}', "ClientController@reviewScoreCount");
Route::get('/review/count/{idx}', "ClientController@reviewCount");

Route::get('/place/dataset', "ClientController@placeData");

// 
Route::get('/game/snack', "GameController@snack");
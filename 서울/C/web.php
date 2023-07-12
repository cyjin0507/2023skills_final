<?php

use src\App\Route;

Route::get("/", "IndexController@Index");
Route::get("/login", "IndexController@login");
Route::get("/join", "IndexController@join");

// user
Route::post("/join/process", "IndexController@joinProcess");
Route::post("/login/process", "IndexController@loginProcess");
Route::get("/logout", "IndexController@logout");


Route::get('/a.php', "IndexController@test");
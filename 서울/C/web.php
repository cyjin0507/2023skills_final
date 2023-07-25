<?php

use src\App\Route;

Route::get("/", "IndexController@Index");
Route::get("/login", "IndexController@login");
Route::get("/join", "IndexController@join");

// user
Route::post("/join/process", "IndexController@joinProcess");
Route::post("/login/process", "IndexController@loginProcess");
Route::get("/logout", "IndexController@logout");


// reserve
Route::get('/reserve.php', "IndexController@reserve");
Route::get('/reserv/info/{date}/{cidx}/{term}', "ReservController@info");

Route::post("/reserv/process", "ReservController@reserveProcess");

Route::get('/reserv/get', "ReservController@reserveGet");
Route::get('/reserv/get/{date}', "ReservController@reserveDateGet");

// mypage
Route::get('/mypage', "MypageController@mypage");
Route::get('/reserv/delete/{idx}', "MypageController@reservDelete");
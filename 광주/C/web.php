<?php

use src\App\Route;

Route::get("/", "IndexController@Index");
Route::get("/login", "IndexController@login");
Route::get("/logout", "IndexController@logout");
Route::post("/login/process", "IndexController@loginProcess");

// 
Route::get('/shop', "ClientController@shop");
Route::get('/category/{category}/{sort}', "ClientController@category");

Route::get('/product/{idx}', "ClientController@product");
Route::get('/payment', "ClientController@payment");
Route::post('/payment/process', "ClientController@paymentProcess");
Route::post('/review/process', "ClientController@reviewProcess");


// admin
Route::get('/admin/order', "AdminController@orderPage");
Route::get('/admin/graph', "AdminController@graphPage");
Route::get('/product/decide/{idx}', "AdminController@productDecide");
Route::get('/test', "AdminController@test");


// json parsing
Route::get('/json/member', "ParsingController@member");
Route::get('/json/data', "ParsingController@data");
Route::get('/json/reserve', "ParsingController@reserve");
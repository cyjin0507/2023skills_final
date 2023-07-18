<?php

use src\App\Route;

Route::get("/", "IndexController@Index");
Route::get("/login", "IndexController@login");
Route::get("/logout", "IndexController@logout");

Route::post("/login/process", "IndexController@loginProcess");

// 
Route::get("/goods", "ClientController@goods");
Route::get("/basket", "ClientController@basket");

// api
Route::get('/goods/get', 'ClientController@goodsGet');
Route::post('/goods/purchase', 'ClientController@goodsPurchase');

Route::get('/basket/get', 'ClientController@basketGet');
Route::post('/basket/reset', 'ClientController@basketReset');
Route::post('/order/process', 'ClientController@orderProcess');


// admin
Route::get('/admin', 'AdminController@admin');
Route::post('/goods/register', 'AdminController@goodsRegisterProcess');

Route::get('/admin/goods/get', 'AdminController@adminGoodsGet');
Route::get('/admin/goods/delete/process/{idx}', 'AdminController@goodsDeleteProcess');
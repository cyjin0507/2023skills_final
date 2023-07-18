<?php

use src\App\Route;

// 이동
Route::get("/", "ViewController@index");
Route::get("/login", "ViewController@login");

//로그인
Route::post("/login", "UserController@login");
Route::get("/logout", "UserController@logout");

// 상품 관련
//shop.php
Route::get("/shop.php", "ShopController@shop");
//상품별 카테고리
Route::get("/category", "ShopController@category");
//상세 페이진
Route::get("/detail", "ShopController@detail");
Route::post("/review", "ShopController@review");
//구매 페이지
Route::get("/pay", "ShopController@pay");
Route::post("/pay", "ShopController@payInsert");


// 관리자 페이지
Route::get("/manageOrder", "ManageController@order");
Route::get("/manageSale", "ManageController@sale");
Route::post("/manageSale", "ManageController@date");
Route::get("/ok", "ManageController@ok");


// json -> DB
Route::get("/setDB", "ViewController@setDB");

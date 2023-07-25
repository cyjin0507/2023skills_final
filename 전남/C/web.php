<?php

use src\App\Route;

Route::get("/", "IndexController@Index");
Route::get("/login", "IndexController@login");
Route::get("/join", "IndexController@join");
Route::get("/logout", "IndexController@logout");

Route::post('/login/process', "IndexController@loginProcess");
Route::post('/join/process', "IndexController@joinProcess");

// purchase
Route::get('/purchase', "PurchaseController@purchase");
Route::get('/purchase/basket/process/{idx}', "PurchaseController@basketProcess");


// mypage
Route::get('/mypage', "MypageController@mypage");
Route::get('/basket/delete/{idx}', "MypageController@basketDeleteProcess");
Route::get('/purchase/process/{idx}/{bidx}/{point}/{count}', "MypageController@purchaseProcess");
Route::get('/purchase/delete/{idx}', "MypageController@purchaseDeleteProcess");

// setting
Route::get("/setting/user", "SettingController@user");
Route::get("/setting/specialties", "SettingController@specialties");
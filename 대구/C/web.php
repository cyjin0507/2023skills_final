<?php

use src\App\Route;

Route::get("/", "IndexController@Index");
Route::get("/login", "IndexController@login");
Route::get("/join", "IndexController@join");
Route::get("/logout", "IndexController@logout");
Route::post("/login/process", "IndexController@loginProcess");
Route::post("/join/process", "IndexController@joinProcess");

// mypage
Route::get('/mypage/tourlist/{idx}', "MypageTourController@tourList");


// 투어관리자
Route::get('/bus/info/get', "MypageTourController@busInfoGet");
Route::post('/bus/register', "MypageTourController@busRegister");
Route::post('/seat/update', "MypageTourController@seatUpdate");
Route::get('/bus/accept/{idx}', "MypageTourController@busAcceptProcess");

// 관리자
Route::get('/mypage/admin', "MypageAdminController@mypage");
Route::get('/bus/admin/accept/{idx}/{date}/{time}', "MypageAdminController@busAcceptProcess");


// 셔틀버스 투어
Route::get('/tour', "TourController@tour");
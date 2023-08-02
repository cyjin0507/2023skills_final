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
Route::get('/reserv/accept/{idx}/{type}', "MypageTourController@reservAccept");

// 관리자
Route::get('/mypage/admin', "MypageAdminController@mypage");
Route::get('/bus/admin/accept/{idx}/{date}/{time}', "MypageAdminController@busAcceptProcess");


// 셔틀버스 투어
Route::get('/tour', "TourController@tour");
Route::get('/bus/all/info/get', "TourController@busInfoGet");
Route::get('/seat/info/get/{idx}', "TourController@seatInfoGet");
Route::post('/tour/payment', "TourController@payment");
Route::get('/reserv/seat/check/{idx}', "TourController@reservCheck");
Route::post('/tour/reservation/process', "TourController@reservProcess");

// 유져
Route::get('/mypage/user', "IndexController@mypage");
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

// 
Route::get('/review', 'MypageController@review');
Route::get('/review/detail/{idx}', 'MypageController@reviewDetail');
Route::post('/review/comment/add/process', 'MypageController@commentAdd');

Route::get('/reservation/list', 'AccoController@reservation');

Route::get('/mypage/{page}', 'MypageController@mypage');
Route::post('/review/add/process', 'MypageController@reviewAddProcess');
Route::get('/reservation/cancel/{idx}', 'MypageController@reservationCancel');

Route::post('/user/info/modify', 'MypageController@userInfoModify');

Route::get('/comment/delete/{idx}', 'ClientController@commentDelete');
Route::get('/review/delete/{idx}', 'ClientController@reviewDelete');
<?php

use src\App\Route;

// 이동
Route::get("/", "ViewController@index");


//로그인
Route::get("/login", "ViewController@login");
Route::post("/login", "UserController@login");
Route::get("/sign", "ViewController@sign");
Route::post("/sign", "UserController@sign");
Route::get("/logout", "UserController@logout");

//출품신청
Route::get("/entry", "ViewController@entry");
Route::post("/entry", "ShowController@entry");

//상영일정
Route::get("/schedule", "ShowController@schedule");
Route::get("/manage", "ShowController@manage");
Route::post("/manage", "ShowController@manageInsert");
Route::get("/detail", "ShowController@detail");

//상영작 검색
Route::get("/search", "ShowController@search");
Route::post("/search", "ShowController@searchItem");

//콘테스트 참여하기
Route::get("/join", "ViewController@join");
Route::post("/join", "ShowController@join");

// 영화티저 콘테스트
Route::get("/contest", "ShowController@contest");
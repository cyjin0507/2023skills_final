<?php

use src\App\Route;

// 이동
Route::get("/", "ViewController@index");
Route::get("/game", "ViewController@game");
Route::get("/review", "ViewController@review");
Route::get("/login", "ViewController@login");
Route::get("/place", "ViewController@place");
Route::get("/snake", "ViewController@snake");
Route::get("/walnut", "ViewController@walnut");


//로그인
Route::post("/login", "UserController@login");
Route::get("/logout", "UserController@logout");

// json -> DB
Route::get("/setDB", "ViewController@setDB");

//천안의 명소
Route::get("/getPlace", "PlaceController@place");
Route::post("/review", "PlaceController@reviewInsert");
Route::get("/detail", "PlaceController@detail");

//관광 게임하기
Route::get("/getGame", "GameController@game");
Route::post("/game", "GameController@gameInsert");


//관리자
Route::get("/manageGame", "ManageController@manageGame");
Route::get("/getGameManage", "ManageController@game");
Route::get("/manageReview", "ManageController@manageReview");
Route::get("/getReviewManage", "ManageController@review");
Route::post("/update", "ManageController@update");
Route::get("/delete", "ManageController@delete");
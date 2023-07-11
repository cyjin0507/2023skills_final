<?php

use src\App\Route;

Route::get("/", "IndexController@Index");
Route::get("/logout", "IndexController@logout");

Route::post("/api/id/check", "ApiController@idCheckAPI");
Route::post("/api/join", "ApiController@joinAPI");
Route::post("/api/login", "ApiController@loginAPI");

// 추천여행 메뉴 페이지
Route::get("/recommand", "IndexController@recommand");
Route::post("/api/recommand/add", "ApiController@recommandAddAPI");
Route::get("/api/recommand/get", "ApiController@recommandGetAPI");

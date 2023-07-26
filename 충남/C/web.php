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
Route::get("/api/stats/count/get", "ApiController@statsCountGetAPI");
Route::get("/api/stats/score/get", "ApiController@statsScoreGetAPI");


// 
Route::get("/gallery", "IndexController@gallery");
Route::post("/gallery/image/insert", "ApiController@galleryInsertAPI");
Route::get("/gallery/get", "ApiController@galleryGetAPI");
Route::post("/gallery/delete", "ApiController@galleryDeleteAPI");
Route::post("/gallery/download", "ApiController@galleryDownload");
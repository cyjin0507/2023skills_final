
<?php

use src\App\DB;

function view($pageName, $datas = [])
{
	extract($datas);

	require_once __VIEWS . __DS . "layout/header.php";
	require_once __VIEWS . __DS . $pageName . ".php";
	require_once __VIEWS . __DS . "layout/footer.php";
}

function redirect($msg, $url) {
	echo "<script>alert('".$msg."')</script>";
	echo "<script>window.location.href='".$url."'</script>";
	exit;
}

function back($msg) {
	echo "<script>alert('".$msg."')</script>";
	echo "<script>history.back()</script>";
	exit;
}

function go($url) {
	echo "<script>window.location.href='".$url."'</script>";
	exit;
}

function goBack() {
	echo "<script>history.back()</script>";
	exit;
}
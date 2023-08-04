<?php
  $h_bar = explode(",", $_GET['h_bar']);
  $keyword = explode(",", $_GET['keyword']);
  
  //막대 총 수
  $bar_count = count($h_bar);
  
  // 전체 화면
  $width = 400;
  $height = 300;
  
  // 간격
  $padding = 5;
  
  // 막대 하나 길이
  $xSpacing = 180;
  $bar_one = ($width - $xSpacing) / $bar_count;
  
  // 이미지 생성
  $im = imagecreate($width, $height);
  $colorList = [
    imagecolorallocate ($im,6, 81, 146),
    imagecolorallocate ($im,10, 184, 82),
    imagecolorallocate ($im,184, 22, 10),
    imagecolorallocate ($im,157, 175, 24),
    imagecolorallocate ($im,112, 24, 175),
    imagecolorallocate ($im,175, 24, 97),
    imagecolorallocate ($im,105, 194, 202),
    imagecolorallocate ($im,7, 34, 64)
  ];
  $bgc2 = imagecolorallocate ($im, 0x7f, 0x7f, 0x7f);
  $tc   = imagecolorallocate ($im, 0xff, 0xff, 0xff);
  $tcolor = imagecolorallocate ($im, 0, 0, 0);
  
  // 이미지 배경색
  imagefilledrectangle ($im, 0, 0, $width, $height, $tc);
  
  // 최대값
  $max = max($h_bar);

  $font = dirname(__FILE__) . "\MALGUN.TTF";
  
  // 각각의 막대 그림
  for($i = 0; $i < $bar_count; $i++){
    $bar_h = ($height / 100) * (($h_bar[$i] / $max) *100 );
    
    $x1 = $i*$bar_one + $xSpacing;
    $y1 = $height - $bar_h;
    $x2 = (($i+1)*$bar_one)-$padding + $xSpacing;
    $y2 = $height;
    
    imagefilledrectangle ($im, $x1, $y1, $x2, $y2, $colorList[$i]);
    imagefilledrectangle ($im, $x2, $y1, $x2, $y2, $bgc2);
    
    imagefilledrectangle ($im, 10, $i*30 + 32, 20, $i*30 + 32 + 10, $colorList[$i]);
    imagettftext($im, 8, 0, 25,30 * ($i+1) + 10,$tcolor,$font,$keyword[$i]);
  }
  
  // 이미지 타입 전송
  header("Content-Type: image/png");
  
  // 이미지 출력
  imagepng($im);
  
  // 이미지 자원 제거
  //imagedestroy($img);
  
?>
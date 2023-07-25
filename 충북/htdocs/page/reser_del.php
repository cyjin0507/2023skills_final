<?php

sql("delete from reser where idx='$no'");
alert("예약이 취소 되었습니다");
move("/reser");
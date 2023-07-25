<?php

sql("update reser set sta = 'chk_del' where idx='$no'");
alert("예약이 취소 되었습니다");
move("/admin");
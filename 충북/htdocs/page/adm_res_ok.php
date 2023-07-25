<?php

sql("update reser set sta = 'chk_ok' where idx='$no'");
alert("예약이 수락 되었습니다");
move("/admin");
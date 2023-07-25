<?php

sql("delete from watch where idx='$no'");
alert("삭제가 완료되었습니다");
move("/admin");
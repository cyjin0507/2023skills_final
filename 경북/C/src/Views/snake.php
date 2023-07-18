
        <div class="snakes">
            <h1>호두과자먹기 캐릭터 게임</h1>
            <form name=game method="post">
            <div class="d-flex-b">
                <h3>이름 : <span class="name"></span></h3>
                <h3>점수 : <span class="score">0</span></h3>
                <h3>남은 시간 : <span id="time">3:0</span></h3>
                <input type="button" class="btn btn-primary pause" value="일시정지">
                <input type="button" class="btn btn-primary reset"  value="다시시작">
                <input type="hidden" class="game-value" value="0">
            </div>
                <table id='snakeTable'>
                </table>
                
            </form>
        </div>

        <div class="modal bg-black">
            <h1>호두과자먹기 캐릭터 게임</h1>
            <h3>사용자 이름 : <span class="name"></span></h3>
            <h3>점수 : <span class="score">0</span></h3>
            <h3>기록 목록 영역</h3>
            <table class="table score-table">
                    <tr>
                        <th>사용자의 이름</th>
                        <th>게임 결과</th>
                        <th>게임 번호</th>
                        <th>게임 이름</th>
                        <th>시간</th>
                    </tr>
                   
                </table>
            <div class="d-flex-b" style="width: 400px; margin: auto;">
                <button class="btn btn-primary back">돌아가기 버튼</button>
                <button class="btn btn-primary save">결과 저장 버튼</button>
            </div>
        </div>
       
<script src="./resources/js/score.js"></script>

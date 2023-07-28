<div id="start-content">
    <div class="input-group mt-5">
        <span class="input-group-text">이름</span>
        <input type="text" class="form-control" id="name">
        <button class="btn btn-primary" id="game-start-btn">게임시작</button>
    </div>
</div>
<div id="game-content">
    <button class="btn btn-primary mt-5" id="pause-btn">일시정지</button>
    <button class="btn btn-primary mt-5" id="play-btn" style="display: none;">다시시작</button>
    <button class="btn btn-primary mt-5">남은시간 : <span id="time">3분</span></button>
    <button class="btn btn-primary mt-5">점수 : <span id="score">0</span>점</button>
    <button class="btn btn-primary mt-5" id="reset-btn">초기화</button>

    <canvas id="canvas" class="mt-3" width="800" height="800"></canvas>
</div>

<div class="modal">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">게임 종료</h5>
            </div>
            <div class="modal-body">
                <h5>호두과자먹기 캐릭터 게임</h5>
                <h5 class="mt-2">사용자 이름 : <span id="modal-name"></span></h5>
                <h5 class="mt-2">점수 : <span id="modal-score"></span></h5>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-primary">저장</button>
                <button type="button" class="btn btn-secondary">돌아가기</button>
            </div>
        </div>
    </div>
</div>

<style>
    canvas {
        display: block;
        width: 800px;
        height: 800px;
        border: 1px solid red;
    }

    #game-content {
        display: none;
    }
</style>
<script src="/js/snack/Snack.js"></script>
<script src="/js/snack/App.js"></script>
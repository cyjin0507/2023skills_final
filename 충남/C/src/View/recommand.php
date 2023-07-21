    <link rel="stylesheet" href="/css/recommand.css">
    
    
    <h3 class="mt-3">추천여행 목록</h3>
        <button class="btn btn-primary" id="modal-open">나도추천하기</button>

        <div id="recommand-list" class="mt-5">
          
        </div>


      <h3 class="mt-5">관리자</h3>
      <canvas id="bar" width="350" height="300"></canvas>
      <canvas id="pie" width="500" height="400"></canvas>



        <div class="modal" id="recommand-modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">추천여행등록</h5>
            </div>
            <div class="modal-body">
                <div id="recommand-image-area">
                    <!-- 추천 리스트 -->
                </div>
                <div id="recommand-dragzone">
                  
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" id="recommand-btn">추천여행등록</button>
              <button type="button" class="btn btn-secondary close" data-dismiss="modal">닫기</button>
            </div>
          </div>
        </div>
    </div>



    <script src="/script/recommand_modal.js"></script>
    <script src="/script/bar.js"></script>
    <script src="/script/pie.js"></script>
    <script src="/script/recommand.js"></script>
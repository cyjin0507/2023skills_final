
        <h1>리뷰 작성 폼 페이지</h1>
        <div class="review">
            <form action="/review" method="post" name="form">
                <input type="hidden" name="idx" value="">
                <div class="d-flex-s">
                    <p>명소의 이름</p>
                    <input type="text" readonly value="" name="name">
                </div>
                <div class="d-flex-s">
                    <p>방문날짜</p>
                    <input type="date" name="date">
                </div>
                <div class="d-flex-s">
                    <p>별점 입력창</p>                    
                    <div class="d-flex align-items-end">

                        <span class="star">
                            ★★★★★
                            <span>★★★★★</span>
                            <input type="range" name="star" value="0" step="1" min="0" max="50">
                        </span>
                        <p class="star-text">0</p>
                    </div>
                </div>
                <div class="d-flex-s">
                    <p>리뷰 내용 입력창</p>
                     <textarea name="text" placeholder="다른 방문자들을 위한 리뷰를 남겨주세요" id="textarea" cols="30" rows="10" ></textarea>
                </div>
                <input type="button" value="작성 버튼" class="btn btn-primary">
                
            </form>
        </div>

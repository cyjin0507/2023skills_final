$(function(){
    ev_st();
})

function ev_st(){
    $(document).on("click","#lo_btn",function(){
        $("#login").modal("show");
    })

    $(document).on("click", "#si_btn", function(){
        $("#signup").modal("show");
    })

    $(document).on("click", ".adm_add", function(){
        $("#add_modal").modal("show");
    })

    $(document).on("click", ".exc_btn", function(){
        $("#exc_modal").modal("show");
    })

    $(document).on("click", ".exc_btn_del", function(){
        alert("로그인한 회원만 가능합니다");
    })

    $(document).on("click", ".info_table tbody tr", function(){
        idx = $(this).attr("data-idx");
        
        location.replace("/reser/"+idx);
    })
}
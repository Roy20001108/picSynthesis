(function(global){
  $('#operaTab span').click(function() {
    var i = $(this).index();//下标第一种写法
    //var i = $('tit').index(this);//下标第二种写法
    $(this).addClass('selectTab').siblings().removeClass('selectTab');
    $('#templateCon li').eq(i).show().siblings().hide();
  });
  $('#templateCon img').click(function() {
    var i = $(this).index();//下标第一种写法
    //var i = $('tit').index(this);//下标第二种写法
    $(this).addClass('selectImg').siblings().removeClass('selectImg');
    $('#ImgCon li').eq(i).show().siblings().hide();
  });
})(window);

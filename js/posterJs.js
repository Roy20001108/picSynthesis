(function(global){
  $('#tab span').click(function() {
    var i = $(this).index();//下标第一种写法
    //var i = $('tit').index(this);//下标第二种写法
    $(this).addClass('selectTab').siblings().removeClass('selectTab');
    $('#con li').eq(i).show().siblings().hide();
  });
})(window);

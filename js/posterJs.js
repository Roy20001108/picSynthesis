(function(global){
  var bgdata;
  var bgdata1 = "image/templateLg_1.png";
  var bgdata2 = "image/templateLg_2.png";
  var bgdata3 = "image/templateLg_3.png";
  var bgdata4 = "image/templateLg_4.png";
  var imgArry = $("img");
  // var imgArry = ["image/templateLg_1.png", "image/templateLg_2.png", "image/templateLg_3.png", "image/templateLg_4.png","image/big_box.png", "image/templateMini_1.png", "image/templateMini_2.png","image/templateMini_3.png","image/templateMini_4.png"];
  var selectImgFlag = 0;
  var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
  var oFReader = new FileReader();
  var num = 0;
  imgArry.each(function(i){//遍历获取到的所有img
    var oImg = new Image();//new一个新对象
    // oImg.onload = function(){//使用onload方法，在加载完成后执行
        // oImg.onload = null;//首先清除掉缓存
        // num++;//每次加载的过程中num++，即执行次数
        // // alert(num/$("img").size()*100);
        // processBar = document.getElementById('fill'),
        // widthPercentage = Math.round(num/$("img").size()*100);
        // processBar.style.width = widthPercentage + '%';
        // $("#percentVal").html("心意值正在加载" + parseInt(num/$("img").size()*100)+"%");
        // // $(".loading b").html(parseInt(num/$("img").size()*100)+"%");//改变b标签的内容，用num除以img的个数，再乘以100，再取整，这就是加载的百分数
        //     if(num >= i){
        //       processBar.style.width = 100 + '%';
        //       $(".loading").fadeOut();//当num的值大于等于个数时隐藏
        //       document.getElementById('makePhoster').style.display='block';
        //     }
            
        // }
        oImg.src = imgArry[i].src;//预加载，先指定一个img.src，当onload成功以后可以将数据指定到某一个元素或者图片上，或者返回一个结果
    })
  creatCanvas(bgdata1);
  // 点击下面tab操作
  $('#operaTab span').click(function() {
    var i = $(this).index();//下标第一种写法
    //var i = $('tit').index(this);//下标第二种写法
    $(this).addClass('selectTab').siblings().removeClass('selectTab');
    $('#templateCon li').eq(i).show().siblings().hide();
    document.getElementById("blessOneDiv").style.visibility="hidden";
    document.getElementById("blessTwoDiv").style.visibility="hidden";
    document.getElementById("blessThreeDiv").style.visibility="hidden";
    document.getElementById("blessFourDiv").style.visibility="hidden";
  });
  // 点击模板图片操作
  $('#templateCon img').click(function() {
    var i = $(this).index();//下标第一种写法
    //var i = $('tit').index(this);//下标第二种写法
    $(this).addClass('selectImg').siblings().removeClass('selectImg');
    // $('#ImgCon li').eq(i).show().siblings().hide();
    if (i == 0) {
      document.getElementById('inputimg').style.zIndex = 100;
      document.getElementById('upimg').style.visibility="visible";
      selectImgFlag = 0;
      bgdata = bgdata1;
    } else if (i == 1) {
      document.getElementById('upimg').style.visibility="hidden";
      selectImgFlag = 1;
      bgdata = bgdata2;
    } else if (i == 2) {
      document.getElementById('upimg').style.visibility="hidden";
      selectImgFlag = 2;
      bgdata = bgdata3;
    } else {
      document.getElementById('upimg').style.visibility="hidden";
      selectImgFlag = 3;
      bgdata = bgdata4;
    }
    creatCanvas(bgdata);
  });
  $('.scrollDiv span').click(function() {
    $('.scrollDiv span').removeClass('selectFont');
    $(this).addClass('selectFont');
    $(".blessTemplate").html($(this).html())
    if (selectImgFlag == 0) {
      // alert($("#blessOneDiv").html());
      document.getElementById("blessOneDiv").style.visibility="visible";
      document.getElementById("blessTwoDiv").style.visibility="hidden";
      document.getElementById("blessThreeDiv").style.visibility="hidden";
      document.getElementById("blessFourDiv").style.visibility="hidden";
    } else if (selectImgFlag == 1) {
      document.getElementById("blessOneDiv").visibility="hidden";
      document.getElementById("blessTwoDiv").style.visibility="visible";
      document.getElementById("blessThreeDiv").style.visibility="hidden";
      document.getElementById("blessFourDiv").style.visibility="hidden";
    } else if (selectImgFlag == 2) {
      document.getElementById("blessOneDiv").visibility="hidden";
      document.getElementById("blessTwoDiv").style.visibility="hidden";
      document.getElementById("blessThreeDiv").style.visibility="visible";
      document.getElementById("blessFourDiv").style.visibility="hidden";
    } else {
      document.getElementById("blessOneDiv").visibility="hidden";
      document.getElementById("blessTwoDiv").style.visibility="hidden";
      document.getElementById("blessThreeDiv").style.visibility="hidden";
      document.getElementById("blessFourDiv").style.visibility="visible";
    }
  });
  // 添加文字
  $(".blessBtn").click(function() {
    document.getElementById("blessOneDiv").style.visibility="visible";
  });
  var stage;
  function creatCanvas(bgdata) {
    var isNotupload=true;
    /*创建canvas画布*/
    stage = new createjs.Stage("posterCanvas"); //创建画布
    // var image=new Image();
    // image.src=bgdata;
    // image.onload=handlerImageLoad;

    var bg = new createjs.Bitmap(bgdata); //创建背景图
    
    bg.regX = 0, bg.regY = 0, bg.x = 0, bg.y = 0; //设置背景图位置
    stage.addChild(bg); //放置背景图到canvas画布
    stage.update();
    createjs.Ticker.setFPS(5);
    createjs.Ticker.addEventListener("tick", tick);
    function tick(event) {
      stage.update(event);
    }
    upLoadImg(stage,bg);
  }
  var maindiv=document.getElementById("moveBtn");
    var textArea=document.getElementById("textArea");
    var startX, startY, moveEndX, moveEndY , x, y;
    maindiv.addEventListener('touchstart',function(event){
      //  event.preventDefault();
      var touch = event.targetTouches[0];
         startX = touch.pageX - maindiv.offsetLeft;
         startY = touch.pageY - maindiv.offsetTop;
      });
      maindiv.addEventListener('touchmove',function(event){
        event.preventDefault();
        var touch = event.targetTouches[0];
        moveEndX = touch.pageX,
        moveEndY = touch.pageY,
        x = moveEndX - startX - maindiv.offsetLeft,
        y = moveEndY - startY - maindiv.offsetTop;
        textArea.style.width =  parseFloat(textArea.style.width) + x + 'px';  
        textArea.style.height =  parseFloat(textArea.style.height) + y + 'px';
    });
  var imgthis;
    // 上传图片
    function upLoadImg (stage,bg) {
      
     
      oFReader.onload = function(oFREvent) {
        stage.removeChild(imgthis);
        imgthis = new createjs.Bitmap(oFREvent.target.result);
        //document.getElementById('show').src=oFREvent.target.result;
        var image=new Image();
        setTimeout(function(){
        image.src=oFREvent.target.result;
        console.log('img width:'+image.width+'  img height:'+image.height)
        var imgWidth=image.width;
        var imgHeight=image.height;
    
        var imgFaceWidth=imgWidth*elePos.w/100;
        var imgFaceHeight=imgHeight*elePos.h/100;
        var sizescale=800/imgFaceWidth/2;
        scale=sizescale;
        console.log('imgWidth:'+imgWidth+';elePos.w:'+elePos.w+';scale:'+sizescale);
    
        /*图片初始位置*/
        var fx=760/2;
        var fy=662/2;
    
        /*注：上传图片，放大缩小倍数需要除以2；设计稿中头像左上角，距内容区左上角距离，依然也需要除以2（横坐标除以2，纵坐标除以2）*/
    
        console.log(fx,fy);
        elePos.s=sizescale;
        elePos.x=fx;
        elePos.y=fy;
    
        imgthis.scaleX =sizescale, imgthis.scaleY = sizescale, imgthis.rotation = elePos.a, imgthis.x = fx, imgthis.y = fy;
        stage.addChild(imgthis);
        stage.swapChildren(bg, imgthis);
        stage.update();
        },200)
      };
    }
        /*上传图片*/
    document.getElementById('inputimg').onchange = function() {
      document.getElementById('inputimg').style.zIndex = 1;
      document.getElementById('upimg').style.visibility="hidden";
        var fileObj = document.getElementById('inputimg').files[0];
      if (document.getElementById('inputimg').files.length === 0) {
        return;
      }
      
      var oFile = document.getElementById('inputimg').files[0];
  
      //var oFile =json.url;
      if (!rFilter.test(oFile.type)) {
        alert("You must select a valid image file!");
        return;
      }
      
      oFReader.readAsDataURL(oFile);		
    };
    /*上传图片的初始位置 放大倍数及旋转角度*/
    var elePos = {
      x: 80,
      y: 500,
      s: 1,
      a: 0,
      w:100,
      h:100
    }
    var scale = 1,
      angle = 0,
      gestureArea = document.getElementById('gesture-area'); //手势区域
    var stageplay=1;
  
    /*调整图片位置*/
    interact(gestureArea).gesturable({
      onstart: function(event) {
  
      },
      onmove: function(event) {
        if (typeof imgthis == 'undefined') {
          return;
        }
        scale = scale * (1 + event.ds);
        angle += event.da;
        x = (parseFloat(elePos.x) || 0) + event.dx, y = (parseFloat(elePos.y) || 0) + event.dy;
        elePos.x = x;
        elePos.y = y;
        elePos.s = scale;
        elePos.a = angle;
        imgthis.scaleX = elePos.s, imgthis.scaleY = elePos.s, imgthis.rotation = elePos.a, imgthis.x = elePos.x, imgthis.y = elePos.y;
  
        stage.update();
      },
      onend: function(event) {}
    }).draggable({
      onmove: dragMoveListener
    });
  
  
    function dragMoveListener(event) {
      if (typeof imgthis == 'undefined') {
        return
      }
      x = (parseFloat(elePos.x) || 0) + event.dx, y = (parseFloat(elePos.y) || 0) + event.dy;
      s = (parseFloat(elePos.s) || 1), a = (parseFloat(elePos.a) || 0);
      imgthis.scaleX = elePos.s, imgthis.scaleY = elePos.s, imgthis.rotation = elePos.a, imgthis.x = elePos.x, imgthis.y = elePos.y;
      elePos.x = x;
      elePos.y = y;
      console.log('*************'+elePos.x)
      console.log('*************'+elePos.y)
      stage.update();
    }
    // 生成图片
    document.getElementById('upload').onclick = function() {
      var getCanvas = document.getElementById('posterCanvas');	
      var context=getCanvas.getContext('2d');
      var toNameVal = $("input[name='toName']").val();
      var fromNameVal = $("input[name='fromName']").val();
      var blessVal = $(".blessTemplate").html();
      // return false;
      // var inputwd = document.getElementById('inputwd').value;
      var inputimg = document.getElementById('inputimg').value;
      if(inputimg!=''){
        context.font='15px KaiTi';
        // context.textAlign='center';
        // context.textBaseline='middle';
        context.fillStyle='#333';
        context.fillText(toNameVal,158,300);
        context.fillText(blessVal,158,400);
        context.fillText(blessVal,158,500);
        // context.fillText(inputwd,458,18);
  
        document.getElementById('makePhoster').style.display='none';
        document.getElementById('createPhoster').style.display='block';
  
         var imgDatadahe = getCanvas.toDataURL().replace("image/png", "image/octet-stream");
           document.getElementById('show').src=imgDatadahe;
           console.log('imgDatadahe：'+imgDatadahe);
      }else{
        alert('请上传图片');
      }
      
    }
  
    // document.getElementById('close').onclick=function(){
    //    setTimeout(function(){
    //       document.getElementById('content1').style.display='block';
    //       document.getElementById('content2').style.display='none';        
    //    },300);
    // };
  
    function isAndroid(){
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      return isAndroid;
    }
})(window);

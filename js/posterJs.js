(function(global){
  var progressbar={
    init:function(){
        var fill=document.getElementById('fill');
        var count=0;
    //通过间隔定时器实现百分比文字效果,通过计算CSS动画持续时间进行间隔设置
        var timer=setInterval(function(e){
            count++;
            fill.style.width = count + '%';
            $("#percentVal").html("心意值正在加载" + count+"%");
            // fill.innerHTML=count+'%';
            if(count===100) {
              clearInterval(timer);
              $(".loading").fadeOut();
              document.getElementById('makePhoster').style.display='block';
              // document.getElementById('createPhoster').style.display='block';
            };
        },10);
    }
};
progressbar.init();
  var bgdata;
  var orient;
  var customFlag;
  var bgdata1 = "image/templateBig1.png";
  var bgdata2 = "image/templateBig2.png";
  var bgdata3 = "image/templateBig3.png";
  var bgdata4 = "image/templateBig4.png";
  var imgArry = $("img");
  // var imgArry = ["image/templateLg_1.png", "image/templateLg_2.png", "image/templateLg_3.png", "image/templateLg_4.png","image/big_box.png", "image/templateMini_1.png", "image/templateMini_2.png","image/templateMini_3.png","image/templateMini_4.png"];
  var selectImgFlag = 0;
  var rFilter = /^(?:image\/bmp|image\/cis\-cod|image\/gif|image\/ief|image\/jpeg|image\/jpeg|image\/jpeg|image\/pipeg|image\/png|image\/svg\+xml|image\/tiff|image\/x\-cmu\-raster|image\/x\-cmx|image\/x\-icon|image\/x\-portable\-anymap|image\/x\-portable\-bitmap|image\/x\-portable\-graymap|image\/x\-portable\-pixmap|image\/x\-rgb|image\/x\-xbitmap|image\/x\-xpixmap|image\/x\-xwindowdump)$/i;
  var oFReader = new FileReader();
  var num = 0;
  // alert("进度条加载");
  imgArry.each(function(i){//遍历获取到的所有img
    var oImg = new Image();//new一个新对象
  //   oImg.onload = function(){//使用onload方法，在加载完成后执行
  //     document.getElementById('fill').style.width=0;
  //       oImg.onload = null;//首先清除掉缓存
  //       num++;//每次加载的过程中num++，即执行次数
  //       // alert(num/$("img").size()*100);
  //       processBar = document.getElementById('fill'),
  //       widthPercentage = Math.round(num/$("img").size()*100);
  //       processBar.style.width = widthPercentage + '%';
  //       $("#percentVal").html("心意值正在加载" + parseInt(num/$("img").size()*100)+"%");
  //       // alert(widthPercentage);
  //       // $(".loading b").html(parseInt(num/$("img").size()*100)+"%");//改变b标签的内容，用num除以img的个数，再乘以100，再取整，这就是加载的百分数
  //           // if(num >= i){
  //           //   processBar.style.width = 100 + '%';
  //           //   $(".loading").fadeOut();//当num的值大于等于个数时隐藏
  //           //   document.getElementById('makePhoster').style.display='block';
  //           // }
  //       setTimeout(() => {
  //         $(".loading").fadeOut();//当num的值大于等于个数时隐藏
  //         document.getElementById('makePhoster').style.display='block';
  //       }, 5000);
  //       }
        oImg.src = imgArry[i].src;//预加载，先指定一个img.src，当onload成功以后可以将数据指定到某一个元素或者图片上，或者返回一个结果
    })
  
  creatCanvas(bgdata1);
  // console.log(document.getElementById("audioMusic"));
  // 添加背景音乐
  // var bgAudio = new Audio();
  // bgAudio.contains = true;
  // bgAudio.src = 'audio/audio1.mp3';
  // document.body.appendChild(bgAudio);
  //音乐开始播放
  // bgAudio.play();
  // document.getElementById("audioMusic").play();
  // 点击下面tab操作
  $('#operaTab span').click(function() {
    var i = $(this).index();//下标第一种写法
    //var i = $('tit').index(this);//下标第二种写法
    $(this).addClass('selectTab').siblings().removeClass('selectTab');
    $('#templateCon li').eq(i).show().siblings().hide();
    $('.scrollDiv span').removeClass('selectFont');
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
      document.getElementById('gesture-area').style.zIndex = 99;
      document.getElementById('upimg').style.visibility="visible";
      selectImgFlag = 0;
      bgdata = bgdata1;
    } else if (i == 1) {
      document.getElementById('inputimg').style.zIndex = -1;
      document.getElementById('gesture-area').style.zIndex = -1;
      document.getElementById('upimg').style.visibility="hidden";
      selectImgFlag = 1;
      bgdata = bgdata2;
    } else if (i == 2) {
      document.getElementById('inputimg').style.zIndex = -1;
      document.getElementById('gesture-area').style.zIndex = -1;
      document.getElementById('upimg').style.visibility="hidden";
      selectImgFlag = 2;
      bgdata = bgdata3;
    } else {
      document.getElementById('inputimg').style.zIndex = -1;
      document.getElementById('gesture-area').style.zIndex = -1;
      document.getElementById('upimg').style.visibility="hidden";
      selectImgFlag = 3;
      bgdata = bgdata4;
    }
    creatCanvas(bgdata);
  });
  $('.scrollDiv span').click(function() {
    $('.scrollDiv span').removeClass('selectFont');
    $(this).addClass('selectFont');
    $(".blessTemplate").html('<span style="padding-left: 2em;"></span>' + $(this).html())
    controlHide();
    $(".blessTemplate").show();
    $(".textArea").hide();
    customFlag = false;
  });
  // 添加文字
  $(".blessBtn").click(function() {
    $('.scrollDiv span').removeClass('selectFont');
    controlHide();
    // document.getElementById("textAreaOne").innerText = '';
    // $(".textArea").text("");
    // $(".textArea").setSelectionRange(0, 0);
    $(".blessTemplate").hide();
    $(".textArea").show();
    customFlag = true;
    // rangeValOne();
    // rangeValTwo();
    // rangeValThree();
    // rangeValFour();
    areaMove();
  });
  function controlHide () {
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
  }
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
  function areaMove () {
    var maindiv=document.getElementsByClassName("moveBtn")[selectImgFlag];
    var textArea=document.getElementsByClassName("textArea")[selectImgFlag];
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
  }
  
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
        
        // var fa=0;
    
        /*注：上传图片，放大缩小倍数需要除以2；设计稿中头像左上角，距内容区左上角距离，依然也需要除以2（横坐标除以2，纵坐标除以2）*/
    
        // console.log(fx,fy);
        if (orient == 6) {
          var fx=1100/2;
          var fy=300/2;
          elePos.s=sizescale;
          elePos.x=fx;
          elePos.y=fy;
          elePos.a=90;
        } else {
          var fx=760/2;
          var fy=362/2;
          elePos.s=sizescale;
          elePos.x=fx;
          elePos.y=fy;
          elePos.a=0;
        }
        imgthis.scaleX =sizescale, imgthis.scaleY = sizescale, imgthis.rotation = elePos.a, imgthis.x = fx, imgthis.y = fy;
        stage.addChild(imgthis);
        stage.swapChildren(bg, imgthis);
        stage.update();
        },200)
      };
    }
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
      EXIF.getData(oFile, function () {
        orient = EXIF.getTag(this, 'Orientation');
      });
      
    };
     /*上传图片的初始位置 放大倍数及旋转角度*/
    
  
    /*调整图片位置*/
    interact(gestureArea).gesturable({
      onstart: function(event) {
  
      },
      onmove: function(event) {
        if (typeof imgthis == 'undefined') {
          return;
        }
        if (orient == 6) {
          angle=90;
        }else{
          angle=0;
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
      var blessVal = $(".blessTemplate").html();
      var blessValStr = "        " + blessVal.substr(blessVal.indexOf('</span>') + 7,blessVal.length);
      // return false;
      // var inputwd = document.getElementById('inputwd').value;
      var inputimg = document.getElementById('inputimg').value;
        if (selectImgFlag == 0){
          if(inputimg!=''){
            var toNameVal = $("input[name='toNameOne']").val();
            var fromNameVal = $("input[name='fromNameOne']").val();
            var rownum;
            drawToName(context,toNameVal,34,380,'#724079');
            if (customFlag) {
              var customWidth = document.getElementsByClassName("textArea")[0].style.width;
              if (customWidth == '100%') {
                customWidth = '336';
              } else {
                customWidth = parseFloat(customWidth);
              }
              var blessValCustom =document.getElementById("textAreaOne").innerText;
              // blessValCustom = blessValCustom.replace("\r\n","<br/>");
              // blessValCustom = blessValCustom.replace(" ","&nbsp;");
              // var blessValCustom =$("#textAreaOne").text();
              // blessValCustom = blessValCustom.replace(/\s/g,""); 
              rownum = drawText(context,blessValCustom,35,420,customWidth,'#724079');
            } else {
              rownum = drawText(context,blessValStr,35,420,336,'#724079');
            }
            drawFromName(context,fromNameVal,330,(420 + rownum * 50 + 60),'#724079');
          }else{
            alert("请上传图片");
            return;
          }
        } else if (selectImgFlag == 1) {
          var toNameVal = $("input[name='toNameTwo']").val();
          var fromNameVal = $("input[name='fromNameTwo']").val();
          var rownum;
          drawToName(context,toNameVal,88,165,'#ffcc66');
          if (customFlag) {
            var customWidth = document.getElementsByClassName("textArea")[1].style.width;
            if (customWidth == '100%') {
              customWidth = '480';
            } else {
              customWidth = parseFloat(customWidth);
            }
            var blessValCustom =document.getElementById("textAreaTwo").innerText;
            // var blessValCustom = $("#textAreaTwo").text();
            // blessValCustom = blessValCustom.replace(/\s/g,""); 
            rownum = drawText(context,blessValCustom,88,187,customWidth,'#ffcc66');
          } else {
            rownum = drawText(context,blessValStr,88,187,460,'#ffcc66');
          }
          drawFromName(context,fromNameVal,550,(187 + rownum * 50 + 50),'#ffcc66');
        } else if (selectImgFlag == 2) {
          var toNameVal = $("input[name='toNameThree']").val();
          var fromNameVal = $("input[name='fromNameThree']").val();
          var rownum;
          drawToName(context,toNameVal,125,330,'#ffffff');
          if (customFlag) {
            var customWidth = document.getElementsByClassName("textArea")[2].style.width;
            if (customWidth == '100%') {
              customWidth = '390';
            } else {
              customWidth = parseFloat(customWidth);
            }
            var blessValCustom =document.getElementById("textAreaThree").innerText;
            // var blessValCustom = $("#textAreaThree").text();
            // blessValCustom = blessValCustom.replace(/\s/g,""); 
            rownum = drawText(context,blessValCustom,125,355,customWidth,'#ffffff');
          } else {
            rownum = drawText(context,blessValStr,125,355,390,'#ffffff');
          }
          drawFromName(context,fromNameVal,510,(355 + rownum * 50 + 50),'#ffffff');
        } else {
          var toNameVal = $("input[name='toNameFour']").val();
          var fromNameVal = $("input[name='fromNameFour']").val();
          var rownum;
          drawToName(context,toNameVal,85,490,'#521f3b');
          if (customFlag) {
            var customWidth = document.getElementsByClassName("textArea")[3].style.width;
            if (customWidth == '100%') {
              customWidth = '480';
            } else {
              customWidth = parseFloat(customWidth);
            }
            var blessValCustom =document.getElementById("textAreaFour").innerText;
            // var blessValCustom = $("#textAreaFour").text();
            // blessValCustom = blessValCustom.replace(/\s/g,""); 
            rownum = drawText(context,blessValCustom,85,510,customWidth,'#521f3b');
          } else {
            rownum = drawText(context,blessValStr,85,510,460,'#521f3b');
          }
          drawFromName(context,fromNameVal,530,(510 + rownum * 50 + 40),'#521f3b');
        }
        document.getElementById('makePhoster').style.display='none';
        document.getElementById('createPhoster').style.display='block';
        var imgDatadahe = getCanvas.toDataURL().replace("image/png", "image/octet-stream");
        document.getElementById('show').src=imgDatadahe;
        console.log('imgDatadahe：'+imgDatadahe);
    }
    function drawToName(context,t,x,y,c){
      context.font='600 27px KaitiMobile';
      context.textAlign='left';
      context.fillStyle= c;
      context.fillText(t,x,y);
    }
    function drawFromName(context,t,x,y,c){
      context.font='600 27px KaitiMobile';
      context.textAlign='right';
      context.fillStyle=c;
      context.fillText(t,x,y);
    }
    function drawText(context,t,x,y,w,c){

      var chr = t.split("");
      var temp = "";              
      var row = [];
      context.font='600 27px KaitiMobile';
      context.textAlign='left';
      context.textBaseline='middle';
      context.fillStyle=c;
  
      for(var a = 0; a < chr.length; a++){
          if( context.measureText(temp).width < w && context.measureText(temp+(chr[a])).width <= w){
            if ((selectImgFlag == 0 && chr[a] == "路")||((selectImgFlag == 1||selectImgFlag == 3) && chr[a] == "愿")||((selectImgFlag == 1||selectImgFlag == 3) && chr[a-1] == "福" && chr[a] == "长")||(selectImgFlag == 2 && chr[a-1] == "安" && chr[a] == "好") || ((selectImgFlag == 1||selectImgFlag == 3) && chr[a-1] == "更" && chr[a] == "好")|| ((selectImgFlag == 1||selectImgFlag == 3) && chr[a-1] == "筑" && chr[a] == "家")) {
              row.push(temp);
              temp = chr[a];
            }else{
              temp += chr[a];
            }
            
          }//context.measureText(text).width  测量文本text的宽度
          else{
            if(customFlag){
              var rega = new RegExp("[\\u4E00-\\u9FFF]+$","g");
              if(!rega.test(chr[a])){
                temp=temp.substring(0, temp.length-1)
                row.push(temp);
                temp = chr[a-1] + chr[a];
              }else{
                row.push(temp);
                temp = chr[a];
              }
            }else{
              var reg = new RegExp("[\\u4E00-\\u9FFF]+$","g");
              if(!reg.test(chr[a])){
                temp += chr[a];
              }else{
                row.push(temp);
                temp = chr[a];
              }
            }
          }
      }
      row.push(temp);
      for(var b = 0; b < row.length; b++){
          context.fillText(row[b],x,y+(b+1)*40);//字体20，间隔24。类似行高
      }
      return row.length;
      // 只显示2行，加...
      /*for(var b = 0; b < 2; b++){
          var str = row[b];
          if(b == 1){
              str = str.substring(0,str.length-1) + '...';
          }
          context.fillText(str,x,y+(b+1)*24);
      }*/
  }
  // 解决iphoneX弹出键盘后页面整体上移问题
  $(".inputStyle").blur(function(){
    $('html,body').animate({scrollTop:0}, 1000);
  });
  $(".textArea").blur(function(){
    $('html,body').animate({scrollTop:0}, 1000);
  });
  // 制作下一张
  document.getElementById("saveBtn").onclick = function(){
    document.getElementById('makePhoster').style.display='block';
    document.getElementById('createPhoster').style.display='none';
  //   document.getElementById('inputimg').style.zIndex = 100;
  //   document.getElementById('gesture-area').style.zIndex = 99;
  //   document.getElementById('upimg').style.visibility="visible";
  //   document.getElementById('inputimg').val = " ";
  //  $(".toNameStyle").val("");
  //   $(".fromNameStyle").val("");

    window.location.reload();
    // $(".loading").fadeOut();
    // document.getElementById('makePhoster').style.display='block';   
  }
    // document.getElementById('close').onclick=function(){
    //    setTimeout(function(){
    //       document.getElementById('content1').style.display='block';
    //       document.getElementById('content2').style.display='none';        
    //    },300);
    // };
    // function getPhotoOrientation(img){
    //  EXIF.getData(img, function () {
    //       orient = EXIF.getTag(this, 'Orientation');
    //   });
    // }
    // var textAreaCon;
    // function rangeValOne () {
    //   $("#textAreaOne").on('keydown keyup', function () {
    //   var t = document.getElementById("textAreaOne").innerText;
    //   if (t.length > 20) {
    //       document.getElementById("textAreaOne").innerText = t.substring(0, 20);
    //       keyAction(textAreaOne)
    //     }
    // });
    // }
    // function rangeValTwo () {
    //   $("#textAreaTwo").on('keydown keyup', function () {
    //   var t = document.getElementById("textAreaTwo").innerText;
    //   if (t.length > 20) {
    //       document.getElementById("textAreaTwo").innerText = t.substring(0, 20);
    //       keyAction(textAreaTwo)
    //     }
    // });
    // }
    // function rangeValThree () {
    //   $("#textAreaThree").on('keydown keyup', function () {
    //   var t = document.getElementById("textAreaThree").innerText;
    //   if (t.length > 20) {
    //       document.getElementById("textAreaThree").innerText = t.substring(0, 20);
    //       keyAction(textAreaThree)
    //     }
    // });
    // }
    // function rangeValFour () {
    //   $("#textAreaFour").on('keydown keyup', function () {
    //   var t = document.getElementById("textAreaFour").innerText;
    //   if (t.length > 20) {
    //       document.getElementById("textAreaFour").innerText = t.substring(0, 20);
    //       keyAction(textAreaFour)
    //     }
    // });
    // }
    //定位div(contenteditable = "true")光标
    function getC(that){			
      if(document.all){				
        that.range=document.selection.createRange();				
        that.range.select();				
        that.range.moveStart("character",-1); 			
      }else{				
        that.range=window.getSelection().getRangeAt(0);				
        that.range.setStart(that.range.startContainer,2);			
      }	
    }
    function keyAction(obj) {
 
      var textbox = document.getElementById('obj');
      var sel = window.getSelection();
      var range = document.createRange();
      // range.selectNodeContents(textbox);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
      }
    // var plateform = Zepto.device.os;
    // if(plateform == "android"){
    //   alert("android");
    //  $("selector").find("input[type='file']").attr("capture","camera");
    // }else if(plateform=="ios"){
    //   alert("ios");     
    //   $("selector").find("input[type='file']").removeAttr("capture");
    // }
    function isAndroid(){
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      return isAndroid;
    }
})(window);

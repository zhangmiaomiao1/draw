window,onload=function(){
    var canvas = document.querySelector("canvas");
    var copy=document.querySelector(".copy");
    var xp=document.querySelector(".xp");
    var cobj = canvas.getContext("2d");
    var obj=new shape(copy,cobj,xp);
    obj.draw();
//        改变样式
    var li=document.querySelectorAll(".type li");
    for(var i=0;i<li.length;i++){
        li[i].onclick=function(){
            if(this.getAttribute("data-role")=="pen"){
                obj.pen();
            }else{
                obj.type=this.getAttribute("data-role");
                obj.draw();
            }
        }
    }
//            选择是否填充
    var li=document.querySelectorAll(".style li");
      for(var i=0;i<li.length;i++){
        li[i].onclick=function(){
            obj.style=this.getAttribute("data-role");
            obj.draw();
        }
    }
    //  选择颜色
    var li2=document.querySelector(".stroke")
    li2.onchange=function(){
        obj.strokeStyle=this.value;
        obj.draw();
    };
    var li3=document.querySelector(".fill")
    li3.onchange=function(){
        obj.fillStyle=this.value;
        obj.draw();
    };
    //多边形
    var bian=document.querySelector(".bian");
    bian.onclick=function(){
        obj.bianNum=prompt("请输入数字","5");
        obj.type=this.getAttribute("data-role");
    };
    //多角形
    var jiao=document.querySelector(".jiao");
    jiao.onclick=function(){
        obj.jiaoNum=prompt("请输入数字","5");
        obj.type=this.getAttribute("data-role");
    };
    //粗细的线条
    var xi=document.querySelectorAll(".xi");
    var sha=document.querySelector(".sha");
    for(var i=0;i<xi.length;i++){
        xi[i].onclick=function(){
            obj.lineWidth=this.getAttribute("data-role");
        }
    };
    sha.onchange=function(){
        obj.lineWidth=sha.value;
        obj.xpsize=sha.value
    };
    //点击摖除
    var clear=document.querySelector(".clear");
    clear.onclick=function(){
        obj.clear();
        clear.css.style.display="block";
        //点击让橡皮出现
    }
    //点击后退
    var houtui=document.querySelector(".houtui");
    houtui.onclick=function(){
        obj.back();
    }
    //保存
    var baocun=document.querySelector(".baocun");
    baocun.onclick=function(){
        if(obj.history.length>0){
            location.href=canvas.toDataURL().replace("image/png","stream/octet")
        }
    }
    //新建
    var xinjian=document.querySelector(".xinjian")
    xinjian.onclick=function(){
        if(obj.history.length>0){
            var yes=confirm("是否保存");
            if(yes){
                location.href=canvas.toDataURL().replace("image/png","stream/octet");
            }
            obj.history=[];
            cobj.clearRect(0,0,canvas.width,canvas.height);
        }
    }
    //对样式的操作，对界面的操作
    $(".top li").click(function(){
        var index=$(".top li").index(this);
        $(".top li").css({"background":"none","color":"black"}).eq(index).css({"background":"#eee"}).css({"color":"red"})
    })
}
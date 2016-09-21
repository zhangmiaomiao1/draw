function shape(canvas,cobj,xp) {
    this.canvas = canvas;
    this.copy=canvas;
    this.cobj = cobj;
    this.clientH=canvas.offsetHeight;
    this.clientW=canvas.offsetWidth;
    this.history = [];
    this.fillStyle = "#000";
    this.strokeStyle = "#000";
    this.lineWidth = 1;
    this.style = "stroke";
    this.type = "";
    this.isback=true;
    this.bianNum=5;
    this.jiaoNum=5;
    this.xp=xp;
    this.xpsize=10;

}
    shape.prototype = {
        init:function(){
            this.cobj.fillStyle=this.fillStyle;
            this.cobj.strokeStyle=this.strokeStyle;
            this.cobj.lineWidth=this.lineWidth;
            this.xp.style.display="none";
        },
        draw:function(){
        var that = this
    that.copy.onmousedown = function (e) {
        that.init();
        var ox = e.offsetX;
        var oy = e.offsetY;
        //鼠标距离事件源的距离
    that.copy.onmousemove = function (e) {
        var movex = e.offsetX;
        var movey = e.offsetY;
        that.cobj.clearRect(0, 0, that.clientW, that.clientH)
        if (that.history.length !== 0) {//如果有历史消息的话就把最后一条历史消息设置
            that.cobj.putImageData(that.history[that.history.length - 1], 0, 0)
        }
        that[that.type](ox, oy, movex, movey)
    }
    that.copy.onmouseup = function () {
        that.history.push(that.cobj.getImageData(0, 0, that.clientW, that.clientH));
        //获取本区域内所有的像素点
        that.canvas.onmousemove = null;
        that.canvas.onmouseup = null;
       }
     }
   },
   pen:function(){
       var that = this
       that.copy.onmousedown = function (e) {
           that.init();
           var ox = e.offsetX;
           var oy = e.offsetY;
           that.cobj.beginPath();
           that.cobj.moveTo(ox,oy)
           //鼠标距离事件源的距离
           that.copy.onmousemove = function (e) {
               var movex = e.offsetX;
               var movey = e.offsetY;
               that.cobj.lineTo(movex,movey)
               that.cobj.stroke();
               //that[that.type](ox, oy, movex, movey)
           }
           that.copy.onmouseup = function () {
               that.history.push(that.cobj.getImageData(0, 0, that.clientW, that.clientH));
               //获取本区域内所有的像素点
               that.canvas.onmousemove = null;
               that.canvas.onmouseup = null;
           }
       }
},
    line:function(x,y,x1,y1){
        this.cobj.beginPath();
        this.cobj.moveTo(x,y);
        this.cobj.lineTo(x1,y1);
        this.cobj.stroke()
    },
        rect:function(x,y,x1,y1){
            this.cobj.beginPath();
            this.cobj.rect(x,y,x1-x,y1-y);
            this.cobj[this.style]()
        },
        circle:function (x,y,x1,y1) {
            var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
            this.cobj.beginPath();
            this.cobj.arc(x,y,r,0,2*Math.PI);
            this.cobj[this.style]();
        },
        back:function(){
            var that = this;
                if(that.history.length == 0){
                    that.cobj.clearRect(0,0,that.clientW, that.clientH);
                    alert("不能后退");
                    return;
                }
                if(that.isback){
                    if(that.history.lehgth == 1){
                        that.history.pop()
                        that.cobj.clehistoryect(0, 0, that.clientW, that.clientH);
                    }else{
                        that.history.pop()
                        that.cobj.putImageData(that.history.pop(), 0, 0);
                    }
                }else{
                    that.cobj.putImageData(that.history.pop(), 0, 0);
                }
               that.isback=false;
            },
        bian:function(x,y,x1,y1){
            var a=360/this.bianNum*Math.PI/180;//角度转化为弧度 几边形就有几个角
            var r=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
            this.cobj.beginPath();
            for(var i=0;i<this.bianNum;i++){
                this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i))
            }
            this.cobj.closePath();
            this.cobj[this.style]();
        },
        jiao:function(x,y,x1,y1){
            var a=360/(this.jiaoNum*2)*Math.PI/180;//多角形有内外两层角 是多边形的两倍
            var R=Math.sqrt((x1-x)*(x1-x)+(y1-y)*(y1-y));
            var r=R/3;//内角的半径
            this.cobj.beginPath();
            for(var i=0;i<this.jiaoNum*2;i++){
                if(i%2==0){
                    this.cobj.lineTo(x+R*Math.cos(a*i),y+R*Math.sin(a*i))
                }else{
                    this.cobj.lineTo(x+r*Math.cos(a*i),y+r*Math.sin(a*i))
                }
            }
            this.cobj.closePath();
            this.cobj[this.style]();
          },
        clear:function(){
            var that=this;
            that.copy.onclick=function(e){
                var movex= e.offsetX;
                var movey= e.offsetY;
                //让鼠标放在橡皮的最中间
                var left=movex-that.xpsize/2;
                var top=movey-that.xpsize/2;
                //边界判断
                if(left<0){
                    left=0
                }
                if(top<0){
                    top=0
                }
                if(left>that.clientW-that.xpsize){
                    left=that.clientW-that.xpsize
                }
                if(top>that.offsetH-that.xpsize){
                    top=that.offsetH-that.xpsize
                }
                that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px;"
            }
            that.copy.onmousedown=function(){
                that.copy.onmousemove=function(e){
                    var movex= e.offsetX;
                    var movey= e.offsetY;
                    var left=movex-that.xpsize/2;
                    var top=movey-that.xpsize/2;
                    if(left<0){
                        left=0
                    }
                    if(top<0){
                        top=0
                    }
                    if(left>that.clientW-that.xpsize){
                        left=that.clientW-that.xpsize
                    }
                    if(top>that.clientH-that.xpsize){
                        top=that.clientH-that.xpsize
                    }

                    that.xp.style.cssText="display:block;left:"+left+"px;top:"+top+"px;width:"+that.xpsize+"px;height:"+that.xpsize+"px;"
                    that.cobj.clearRect(left,top,that.xpsize,that.xpsize)
                    //
                }
                that.copy.onmouseup=function(){
                    that.history.push(that.cobj.getImageData(0,0,that.clientW,that.clientH))
                    that.copy.onmousemove=null;
                    that.copy.onmouseup=null;
                    that.clear()
                }
            }
        }
  }




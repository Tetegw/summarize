(function() {
    //设备检测
   function detectmob() {
       if( navigator.userAgent.match(/Android/i)
       || navigator.userAgent.match(/webOS/i)
       || navigator.userAgent.match(/iPhone/i)
       || navigator.userAgent.match(/iPad/i)
       || navigator.userAgent.match(/iPod/i)
       || navigator.userAgent.match(/BlackBerry/i)
       || navigator.userAgent.match(/Windows Phone/i)
       ){
           return true;
       }
       else {
           return false;
       }
   }

   // deicePixelRatio ：设备像素
   var scale = 1 / devicePixelRatio;
   //设置meta 压缩界面 模拟设备的高分辨率
   document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ',user-scalable=no');
   //debounce 为节流函数，自己实现。或者引入underscoure即可。
   var reSize = function() {
      var deviceWidth = document.documentElement.clientWidth;
      if (document.documentElement.clientWidth > 1300) {
         deviceWidth = 1300;
      }else if (document.documentElement.clientWidth < 600) {
         deviceWidth = 600;
      }else{
         deviceWidth = document.documentElement.clientWidth;
      }
      //按照640像素下字体为100px的标准来，得到一个字体缩放比例值 6.4
      document.documentElement.style.fontSize = (deviceWidth / 6.4) + 'px';
      if (!detectmob()) {
          //如果是PC端，则设定body宽度，且设定html字体大小
          document.body.style.width = 640+"px";
          document.documentElement.style.fontSize = 100 + 'px';
       };
   }
   reSize();
   window.onresize = reSize;
})();

(function(){
   document.body.addEventListener('touchstart', function(e){
      var target = e.target
      if(target.dataset.touch === 'true'){
         target.classList.add('active')
      }
   })
   document.body.addEventListener('touchmove', function(e){
      var target = e.target
      var rect = target.getBoundingClientRect()

      if(target.dataset.touch === 'true'){
         // 移出元素时，取消active状态
         if(e.changedTouches[0].pageX<rect.left || e.changedTouches[0].pageX>rect.right || e.changedTouches[0].pageY<rect.top || e.changedTouches[0].pageY>rect.bottom){
            target.classList.remove('active')
         }
      }
   })

   document.body.addEventListener('touchcancel', function(e){
      var target = e.target
      if(target.dataset.touch === 'true'){
         target.classList.remove('active')
      }
   })

   document.body.addEventListener('touchend', function(e){
      var target = e.target
      if(target.dataset.touch === 'true'){
         target.classList.remove('active')
      }
   })
})();
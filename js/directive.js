var myapp=angular.module("myapp");
myapp.directive("iSwipe",function(){
    return {
        restrict:"E",
        template:'<div class="variety swiper-container"><ul class="swiper-wrapper"><li class="item swiper-slide" ng-repeat="x in picsdata"><img ng-src={{x.src}}><span>{{x.txt}}</span></li></ul></div>',
        controller:function () {
            setTimeout(function(){
                var slides=null;
                var specific = $('.specific');
                var mySwiper = new Swiper('.variety',{
                    slidesPerView: 'auto',
                    spaceBetween: 10,
                    freeMode: true,
                    onTap:function (s, e) {
                        //控制图片区域的高亮效果
                        if(!slides) slides = document.querySelector('.variety').querySelectorAll('.swiper-slide');
                        for(var i=0; i<slides.length; i++){//遍历所有的variety下的图片li
                            slides[i].className = slides[i].className.replace(' active','')
                        }
                        var str = s.clickedSlide && s.clickedSlide.className;
                        if(str && str.indexOf(' active')==-1){
                            s.clickedSlide.className = str + ' active';
                        }

                    }
                });
            },100);
        }
    }
});
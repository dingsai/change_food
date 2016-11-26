function index($scope,$rootScope,$http,$state){
    $scope.flag=false;
    var arr=$rootScope._arr || [1,0,0,0,0];  //  有的话当前的高亮||没有默认第一个高亮显示
    $scope.fn=function(num){
        arr=[0,0,0,0,0];
        arr[num]=1;
        $rootScope._arr=arr;
    };
    $scope.arr=arr;
    $rootScope.title=$state.current.data.title;//浏览器标题=当前页面的头部标题
}

function foodGI($scope,$http,$rootScope,$state) {//渲染foodGI里的数据
    var req=$http({
        url:"../data/a1.json",
        method:"post",
        data:{
            uid:123,
            gorderid:123,
            orderFrom:"sdf"
        }
    });
    req.success(function(data){
        //判断error是否=0；为0请求成功 渲染数据 否则请求失败
         if(data.error==0){
             $scope.lists=null;
             $scope.datalist=[];
            for(var q in data.result){
                /*$scope.lists=data.result[q];
                console.log($scope.lists);*/
                for(var j in data.result[q].type){
                    $scope.datalist.push(data.result[q].type[j]);
                }//遍历的数组付给一个变量  遍历变量
            }
        }
        else{
            alert(data.errorMsg)
        }

        $scope.picsdata=[
            {src:"../images/t_03.jpg",txt:"谷薯类"},
            {src:"../images/t_03.jpg",txt:"果仁类"},
            {src:"../images/t_03.jpg",txt:"水果类"},
            {src:"../images/t_03.jpg",txt:"肉蛋类"},
            {src:"../images/t_03.jpg",txt:"豆制类"},
            {src:"../images/t_03.jpg",txt:"奶制类"},
            {src:"../images/t_03.jpg",txt:"蔬菜类"},
            {src:"../images/t_03.jpg",txt:"海鲜类"}
        ]

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
        //以下事件  点击图片去掉黑的透明  而且 对应的下边内容进行切换

        $rootScope.title=$state.current.data.title;
        $scope.goback=function(){//gushu搜索页点击返回上一页

        }
    });
    $scope.$on("search-result",function(d,data){
        $scope.datalist=[{name:data,num:30,range:"lower"}]
    })
    $scope.goindex=function(){//点击gushu返回foodGI页面
        $state.go("index");

    };
}

function cereals($scope,$state,$rootScope,$http){
    var _data=null;
    $http.get("../data/soso.json").success(function(data){
        _data=data.data;
    });

    $scope.gofoodGI=function(data){//点击gushu返回foodGI页面
        $state.go("foodGI");
        $scope.$emit("search-result",data);

    };

   // $scope.searchValue="a";

   $scope.$watch('searchValue',function(_new,_old){
       var arr=[];
        if(_data!=null && _new!=""){
            _data.forEach(function(value,index){
                if(value[0].substring(0,_new.length)==_new||value[1].substring(0,_new.length)==_new||value[2].substring(0,_new.length)==_new){
                    arr.push(value[0])
                }
            })
        }
        $scope.searchData=arr;
    });

    $rootScope.title=$state.current.data.title;
}

function energy($scope,$state,$http,$slider){
    $scope.activities="自行车";
    $scope.content="洗衣服";
    $scope.select1=function(){
        $slider.show({
            title:"选择信息",
            data:['自行车','跑步','篮球','足球','瑜伽','跑步'],
            done:function(data){
                $scope.activities=data.value;
                $scope.$digest();
            },
            afterSwipe:function(){

            }
        })
    };
    $scope.select2=function($event){
        $slider.show({
            title:"项目内容",
            data:['洗衣服','做饭','拖地','打扫','洗碗','倒垃圾'],
            done:function(data){
                $scope.content=data.value;
                $scope.$digest();
            },
            afterSwipe:function(){

            }
        })

    };
    $scope.goindex=function(){//点击gushu返回foodGI页面
        $state.go("index");

    };

}

function change_fen($scope,$state,$http,$slider){
    $scope.fenType="谷薯类";
    $scope.shicai="油条";
    $scope.select_change=function(){
        $slider.show({
            title:"选择类型",
            data:['海鲜类','豆制类','奶之类','水果类','蔬菜类','肉蛋类'],
            done:function(data){
                $scope.fenType=data.value;
                $scope.$digest();
            },
            afterSwipe:function(){

            }
        })
    };
    $scope.menu=function($event){
        $slider.show({
            title:"选择食材",
            data:['豆浆','油条','小米粥','包子','紫米粥','大米'],
            done:function(data){
                $scope.shicai=data.value;
                $scope.$digest();
            },
            afterSwipe:function(){

            }
        })

    };

    $scope.goindex=function(){
        $state.go("index");
    };
}

function bmi($scope,$state,$rootScope,$http){
    var rulerUl=document.querySelector(".ruler ul");
    var wul=document.querySelector(".weight .ruler ul");
    var pic_img=document.querySelector(".pic_img img");
    var str='',str2='';
    for(var i=1; i<=120; i++){
        if(i%10==0 || i==1){
            str+='<li meter="'+(36-(12+i/10>>0))/10+'"></li>';
            str2+='<li gram="'+((i+30)/10>>0)*10+'kg"></li>'
        }else{
            str+='<li></li>';
            str2+='<li></li>'
        }
    }
    rulerUl.innerHTML=str;
    wul.innerHTML=str2;
    //标尺滚动
    var height=new IScroll(".height",{
        probeType:3
    });
    height.on("scroll",function(){
        console.log(this.y/4>>0);
    });
    var weight = new IScroll('.weight-ruler',{
        scrollX: true,
        scrollY: false
    });
    weight.on('scroll',function () {
        console.log(this.x/4>>0);
    });

    //点击女生：
    var girl=document.querySelector(".top .g");
    var boy=document.querySelector(".top .b");
    girl.onclick=function(){
        girl.setAttribute("style","background:#E9086E;color:#fff");
        boy.setAttribute("style","background:#fff;color:#000;border:1px solid #3279FE")
        pic_img.setAttribute("src","../images/d-1.png");
    }
    boy.onclick=function(){
        girl.setAttribute("style","background:#fff;color:#000;border:1px solid #E9086E");
        boy.setAttribute("style","background:#3279FE;color:#fff");
        pic_img.setAttribute("src","../images/d-2.png");
    }
    $scope.goindex=function(){
        $state.go("index");

    };
}

function ingredient($scope,$state,$rootScope,$http){
    //点击某一项进入foodchengfen页面显示对应的数据
    
    $scope.goindex=function(){
        $state.go("index");

    };
}
angular.module("myapp")
.controller("index",index)
.controller("foodGI",foodGI)
.controller("cereals",cereals)
.controller("energy",energy)
.controller("foodChoose",change_fen)
.controller("ingredient",ingredient)
.controller("bmi",bmi);
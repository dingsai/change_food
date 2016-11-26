var mapp=angular.module("myapp",["ui.router"]);
mapp.config(function($stateProvider,$urlRouterProvider){
    $stateProvider
        .state("index",{
            url:"/",
            templateUrl:"../html/home.html",
            data:{
                title:"食物查询工具"
            }
        })
        .state("foodGI",{
            url:"/foodGI",
            templateUrl:"../html/foodGI.html",
            data:{
                title:"食物GI表"
            }
        })
        .state("foodGI.gushu",{//点击foodGI搜索进入gushu页面进行搜索
            url:"/gushu",
            templateUrl:"../html/gushu.html",
            data:{
                title:"谷薯类"
            }
        })
        .state("foodChoose",{
            url:"/foodChoose",
            templateUrl:"../html/foodChoose.html",
            data:{
                title:"食物交换"
            }
        }).state("ingredient",{
            url:"/ingredient",
            templateUrl:"../html/ingredient.html",
            data:{
                title:"食物成分表"
            }
        }).state("energy",{
            url:"/energy",
            templateUrl:"../html/energy.html",
            data:{
                title:"常见活动能量消耗转换"
            }
        }).state("boy",{
            url:"/boy",
            templateUrl:"../html/boy.html",
            data:{
                title:"BMI测试"
            }
        });
    $urlRouterProvider.when("","/");

});
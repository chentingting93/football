var homeTpl = require("../tpls/home.string");
var Utils = require("../Utils/commonUtil");
//定义子视图

SPA.defineView("home",{
	html:homeTpl,
	plugins:["delegated",{
		name:"avalon",//注入 avalon
		options:function(vm){
			//vm  是 avalon的实例
			//console.log(vm);
			vm.liveData = [];//定义一个属性 暴露出来
		}
	}],
	init:{
		//转换二维数组
		dataFormat:function(data){
			var temArr=[];	
			for(var i=0,len=Math.ceil(data.length/2);i<len;i++){
				temArr[i]=[];
				temArr[i].push(data[i*2]);
				data[i*2+1] && temArr[i].push(data[i*2+1]);
			}
			return temArr
		}
	},
	bindEvents:{
		beforeShow:function(){
			// ajax渲染
			var _this = this;
			this.vm = this.getVM();
			$.ajax({
				url:"/src/script/mock/livelist.json",
				type:'get',
				success:function(rs){
					_this.originArr = rs.data;
					_this.vm.liveData = _this.dataFormat(rs.data);

				}
			})
		},
		show:function(){
			var _this = this;
			this.vm = this.getVM();
			$(document).on("touchmove",function(e){
				e.preventDefault();
			})
			var mainSwiper = new Swiper("#swiper-main",{
			
				onSlideChangeStart:function(swiper){
					var idx = swiper.activeIndex;
					var $li = $("#title span").eq(idx);
					Utils.getFocus($li);
				}
			});
			var navSwiper = new Swiper("#swiper-nav",{
				
				onSlideChangeStart:function(swiper){
					var idx = swiper.activeIndex;
					var $li = $("#list li").eq(idx);
					Utils.getFocus($li);
				}
			});
			//上拉加载 下拉 刷新 
			var mainScroll = this.widgets.mainscroll;
			//console.log(myScroll);			
			var scrollSize = 30;
			// 隐藏下拉刷新
			mainScroll.scrollBy(0,-scrollSize);
			
			// 获取head中的img及head当前的状态
			var headImg = $(".head img");
			var topImgHasClass = headImg.hasClass("up");
			var footImg = $(".foot img");
			var bottomImgHasClass = footImg.hasClass("down");

			// 当滚动的时候
			mainScroll.on("scroll",function(){
			    // 获取当前滚动条的位置
			    var y = this.y;
			    // 计算最大的滚动范围
			    var maxY = this.maxScrollY - y;
			    
			    // 如果是下拉
			    if(y>=0){
			       !topImgHasClass && headImg.addClass("up");
			       return "";
			    }
			    // 如果是上拉
			    if(maxY>=0){
			       !bottomImgHasClass && footImg.addClass("down");
			       return "";
			    }
			})

			// 当滚动结束刷新数据时
			mainScroll.on("scrollEnd",function(){
			    if(this.y >= -scrollSize && this.y < 0){
			        mainScroll.scrollTo(0,-scrollSize);
			        headImg.removeClass("up");
			    }else if(this.y>=0){
			        headImg.attr("src","/img/ajax-loader.gif");
			        $.ajax({
                        url:"/src/script/mock/livelist-refresh.json",
                        type:"get",
                        data:{
                        	action:"refresh"
                        },
                        success:function(result){
                        	//刷新
                        setInterval(function(){
	                         _this.originArr = result.data;
	                         _this.vm.liveData = _this.dataFormat(result.data);
	                         //console.log(_this.vm.liveData);
	                         mainScroll.scrollTo(0,-scrollSize);
	                         headImg.removeClass("up");
	                         headImg.attr("src","/img/arrow.png");
                     	},1500);    
                        }
			        })
			    }
			    // 计算最大的滚动范围
			    var maxY = this.maxScrollY - this.y;
			    var self = this;
			    if(maxY>-scrollSize && maxY<0){
			        mainScroll.scrollTo(0,this.maxScrollY+scrollSize);
			        footImg.removeClass("down");
			    }else if(maxY>=0){
			       footImg.attr("src","/img/ajax-loader.gif");
			       $.ajax({
			          url:"/src/script/mock/livelist.json",
                        type:"get",
                        data:{
                        	action:"refresh"
                        },
                        success:function(result){
                        	//加载
                        	setInterval(function(){
		                         _this.originArr = _this.originArr.concat(result.data);
		                         _this.vm.liveData = _this.dataFormat( _this.originArr);
		                         //console.log(_this.vm.liveData);
		                         mainScroll.refresh();
		                         mainScroll.scrollTo(0,-scrollSize);
		                         footImg.removeClass("down");
		                         footImg.attr("src","/img/arrow.png");
                     		},1500);
                        }
			       })
			    }
			})
	     }
	},
	bindActions:{
		"list.tab":function(e,data){
			//console.log(data.idx);
			var $li = $("#list li").eq(data.idx);
				Utils.getFocus($li);
				console.log(data.idx)
			var mySwiper = new Swiper("#swiper-nav");
			mySwiper.slideTo(data.idx,1000,false);
		}
	}

})
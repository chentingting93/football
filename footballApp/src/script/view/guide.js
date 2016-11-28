var guideTpl = require("../tpls/guide.string");
//定义子视图

SPA.defineView("guide",{
	html:guideTpl,
	plugins:["delegated"],
	bindEvents:{
		show:function(){
			var mySwiper = new Swiper("#swiper-container");
		}
	},
	bindActions:{
		"go.index":function(){
			SPA.open("index");
		}
	}
})
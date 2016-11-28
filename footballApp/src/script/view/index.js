//引入 模板
var indexTpl = require("../tpls/index.string");


//使用 SPA框架 将DOM放入到主页面中
SPA.defineView("index",{ //定义视图
	html:indexTpl,	//渲染HTML数据
	plugins:["delegated"],
	modules:[{
		name:"content",	//对视图的引用
		views:["home","guide","find","my"],	//放置所有子视图的名称
		defaultTag:"home", //默认视图
		container:".m-wrapper"	//渲染子视图的容器	
	}],
	bindActions:{
		"switch.tab":function(e,data){
			//console.log(data);
			this.modules.content.launch(data.tag);
		}
	}
})
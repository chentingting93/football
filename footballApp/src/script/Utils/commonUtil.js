var commonUtils = {
	getFocus:function($el){
		$el.addClass("active").siblings().removeClass("active");
	},
	getHeader:function(){
		console.log("bugfix");
	}
}

module.exports = commonUtils;
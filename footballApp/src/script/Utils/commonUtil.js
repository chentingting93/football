var commonUtils = {
	getFocus:function($el){
		$el.addClass("active").siblings().removeClass("active");
	},
	dataformate:function(){
		console.log("update");
	}
}

module.exports = commonUtils;
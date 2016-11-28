var commonUtils = {
	getFocus:function($el){
		$el.addClass("active").siblings().removeClass("active");
	}
}

module.exports = commonUtils;
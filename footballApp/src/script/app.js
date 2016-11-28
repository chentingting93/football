//引入 SPA
require("./libs/spa.min.js");
require("./libs/swiper-3.3.1.min.js");

require("./view/index");
require("./view/guide");
require("./view/home");
require("./view/find");
require("./view/my");

SPA.config({
	indexView:"index"
})
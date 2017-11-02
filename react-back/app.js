var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var cheerio = require("cheerio");
var request = require("request");
var fs = require('fs');
var http = require('http');
var https = require('https');

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1:27017/lagou",{useMongoClient: true}).then(function(db){
	console.log("db lagou connect success!!!!");
})

var UserSchema = mongoose.Schema({
	password: String,
	phone: String
})
var JobsSchema = mongoose.Schema({
	positionId: String,
	positionName: String,
	city: String,
	createTime:String,
	salary:String,
	companyId:String,
	companyLogo:String,
	companyName:String,
	companyFullName:String
})

var User = mongoose.model("users",UserSchema);
var Job = mongoose.model("jobs",JobsSchema);

var app = express();
app.use(express.static("../build"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}))
//跨域
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1')
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


app.post("/register",function(req,res){
	var {phone,password} = req.body;
	var user = new User({password,phone});
	user.save(function(err,data){
		if(err){
			res.json({
				status: "1",
				msg: "保存失败"
			})
		}
		res.json({
			status: "0",
			msg:"保存成功"
		})
	})
})
app.get("/test",function(req,res){
	res.json({"status":"success"})
})
app.post("/login",function(req,res){
	var {phone,password} = req.body;
	console.log(req.body);
	User.find({phone,password},function(err,data){
		if(err){res.json({status:"2",msg:"查找失败"})}
		if(data.length){
			res.json({
				status: "0",
				msg:"success",
				username: data[0].username
			})
		} else{
			res.json({
				status: "1",
				msg: "failed"
			})
		}
	})
})

app.post("/check",function(req,res){
	var {phone} = req.body;
	User.find({phone},function(err,data){
		if(err){
			res.json({
				status:"2",
				msg:"查询失败"
			})
		}
		if(data.length){
			res.json({
				status:"1",
				msg:"已注册"
			})
		} else{
			res.json({
				status:"0",
				msg:"未注册"
			})
		}
	})
})

app.post("/searchJob",function(req,res){
	var {city,positionName,pageSize} = req.body;
	var arr;
	Job.find({},function(err,data){
		if(err){res.json({status:"error"})};
		arr = data.filter(function(curr){
			return (curr.city == city && curr.positionName.indexOf(positionName)>-1)
		})
		arr = arr.splice(0,pageSize);
		res.json(arr);
	})
})

app.post('/getjob',function(req,res){
	res.json([{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3687437,"positionName":"项目经理（实习生）","city":"北京","createTime":"今天 10:59","salary":"3k-6k","companyId":90381,"companyLogo":"i/image/M00/03/1E/CgqKkVap65mAcMIvAAARYfQXuAs081.png","companyName":"女神进化论","companyFullName":"艾芒（北京）科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3677174,"positionName":"视频监控、安防行业-解决方案顾问","city":"上海","createTime":"今天 10:58","salary":"15k-30k","companyId":26467,"companyLogo":"image1/M00/00/38/CgYXBlTUXKKAa7c_AABVoBI494k814.jpg","companyName":"思华科技","companyFullName":"上海思华科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3686776,"positionName":"销售内勤","city":"广州","createTime":"今天 10:58","salary":"3k-4k","companyId":165494,"companyLogo":"i/image/M00/96/4C/Cgp3O1icK_KAYz9HAAFZfelV16I423.jpg","companyName":"云南山青花燃茶业有限公司","companyFullName":"云南山青花燃茶业有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3677105,"positionName":"软件测试工程师","city":"北京","createTime":"今天 10:58","salary":"10k-15k","companyId":16949,"companyLogo":"i/image/M00/6A/64/CgpEMlmncrqAQtxoAAA21bykABg871.png","companyName":"中企动力","companyFullName":"中企动力科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3677111,"positionName":"测试工程师","city":"北京","createTime":"今天 10:58","salary":"10k-15k","companyId":16949,"companyLogo":"i/image/M00/6A/64/CgpEMlmncrqAQtxoAAA21bykABg871.png","companyName":"中企动力","companyFullName":"中企动力科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3686474,"positionName":"PMO助理","city":"深圳","createTime":"今天 10:56","salary":"8k-15k","companyId":104977,"companyLogo":"i/image/M00/01/9B/Cgp3O1ZxG4eAH0IRAADXutTbmN8423.jpg","companyName":"长城物业集团","companyFullName":"长城物业集团股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3686491,"positionName":"业务解决方案经理","city":"深圳","createTime":"今天 10:56","salary":"18k-30k","companyId":104977,"companyLogo":"i/image/M00/01/9B/Cgp3O1ZxG4eAH0IRAADXutTbmN8423.jpg","companyName":"长城物业集团","companyFullName":"长城物业集团股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3676144,"positionName":"电商运营（南京工作）","city":"南京","createTime":"今天 10:56","salary":"5k-7k","companyId":43408,"companyLogo":"image1/M00/00/6D/CgYXBlTUXYOAPvu_AABFVqRuQwQ635.png","companyName":"广州原象","companyFullName":"广州市原象广告有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3676175,"positionName":"设计师（南京上班）","city":"南京","createTime":"今天 10:56","salary":"6k-8k","companyId":43408,"companyLogo":"image1/M00/00/6D/CgYXBlTUXYOAPvu_AABFVqRuQwQ635.png","companyName":"广州原象","companyFullName":"广州市原象广告有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3687206,"positionName":"大数据开发工程师","city":"上海","createTime":"今天 10:56","salary":"10k-15k","companyId":128998,"companyLogo":"i/image/M00/2A/A6/Cgp3O1cyziuAfM5AAAAe20ZOb-4754.png","companyName":"江苏亿科达","companyFullName":"上海海万信息科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3681386,"positionName":"微信小程序开发实习","city":"苏州","createTime":"今天 10:55","salary":"3k-6k","companyId":121280,"companyLogo":"i/image/M00/18/3B/Cgp3O1bzdbqANA_aAAAybL75iTg011.jpg","companyName":"簇格软件","companyFullName":"苏州簇格软件有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3681403,"positionName":"微信小程序资深开发","city":"苏州","createTime":"今天 10:55","salary":"6k-12k","companyId":121280,"companyLogo":"i/image/M00/18/3B/Cgp3O1bzdbqANA_aAAAybL75iTg011.jpg","companyName":"簇格软件","companyFullName":"苏州簇格软件有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3687427,"positionName":"C++后台架构师","city":"深圳","createTime":"今天 10:55","salary":"25k-35k","companyId":917,"companyLogo":"i/image/M00/37/20/CgqKkVdfms6Ac6dNAABY3gBvuqI944.jpg","companyName":"极光","companyFullName":"深圳市和讯华谷信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3687222,"positionName":"搜索产品经理","city":"北京","createTime":"今天 10:54","salary":"20k-35k","companyId":70,"companyLogo":"i/image/M00/01/A2/CgqKkVZyGeyAUPeJAAAIURCZrmM626.png","companyName":"宝宝树","companyFullName":"宝宝树（北京）信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3687241,"positionName":"搜索算法工程师","city":"北京","createTime":"今天 10:54","salary":"20k-40k","companyId":70,"companyLogo":"i/image/M00/01/A2/CgqKkVZyGeyAUPeJAAAIURCZrmM626.png","companyName":"宝宝树","companyFullName":"宝宝树（北京）信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3529978,"positionName":"前端开发工程师","city":"北京","createTime":"昨天 21:25","salary":"15k-30k","companyId":147,"companyLogo":"i/image/M00/76/40/Cgp3O1g1TNOAB2yxAAA9bQUyc4g814.png","companyName":"拉勾网","companyFullName":"北京拉勾网络技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2567200,"positionName":"前端","city":"上海","createTime":"今天 09:18","salary":"10k-15k","companyId":24995,"companyLogo":"image1/M00/00/33/CgYXBlTUXI-AC08_AACIkHlny3Y866.jpg","companyName":"泛微","companyFullName":"上海泛微网络科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2839906,"positionName":"前端开发工程师","city":"上海","createTime":"今天 09:09","salary":"12k-24k","companyId":1738,"companyLogo":"i/image/M00/61/D3/CgqKkVf8uQeAOqJ2AAArfl5skXY149.png","companyName":"有鱼金融科技","companyFullName":"上海彩亿信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3603157,"positionName":"前端开发工程师","city":"杭州","createTime":"昨天 17:04","salary":"8k-13k","companyId":96921,"companyLogo":"i/image/M00/82/FA/Cgp3O1hYtVCAANScAACQ0dXap10971.JPG","companyName":"远传技术","companyFullName":"浙江远传信息技术股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":1764574,"positionName":"前端开发工程师","city":"深圳","createTime":"2017-10-11","salary":"15k-30k","companyId":6927,"companyLogo":"image1/M00/37/F3/Cgo8PFWkd7iAHDSXAAAKdotH5mM556.jpg","companyName":"OPPO","companyFullName":"广东欧珀移动通信有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3260215,"positionName":"前端开发","city":"杭州","createTime":"今天 09:19","salary":"15k-25k","companyId":2380,"companyLogo":"i/image/M00/5E/25/Cgp3O1fqMFWAJ4hgAAAUycalP_8040.png","companyName":"浙江执御信息技术有限公司","companyFullName":"浙江执御信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3034730,"positionName":"前端工程师","city":"北京","createTime":"2017-10-18","salary":"10k-20k","companyId":436,"companyLogo":"image1/M00/26/1E/Cgo8PFVUDROAf7zrAABr5cEcbGQ572.jpg","companyName":"360","companyFullName":"奇虎360科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3307571,"positionName":"前端开发","city":"深圳","createTime":"今天 09:25","salary":"15k-30k","companyId":451,"companyLogo":"image1/M00/00/03/CgYXBlTUV_qALGv0AABEuOJDipU378.jpg","companyName":"腾讯","companyFullName":"腾讯科技(深圳)有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3764512,"positionName":"前端工程师","city":"北京","createTime":"今天 10:25","salary":"20k-30k","companyId":30118,"companyLogo":"image1/M00/16/C8/Cgo8PFUPqK6AJyZpAABYCku84ms042.png","companyName":"影谱科技","companyFullName":"北京影谱科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":1744426,"positionName":"前端开发工程师","city":"上海","createTime":"昨天 19:08","salary":"16k-25k","companyId":35713,"companyLogo":"image1/M00/45/B9/Cgo8PFXcJ-OAdN7iAAGgbRX9H0g507.png","companyName":"链家上海研发中心","companyFullName":"德佑房地产经纪有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3760971,"positionName":"前端工程师","city":"合肥","createTime":"昨天 14:32","salary":"6k-12k","companyId":157635,"companyLogo":"i/image/M00/82/FF/Cgp3O1hYvnaAPzhrAAAOpMVkEYg628.png","companyName":"蜜蜂出行","companyFullName":"北京蜜蜂出行科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3761651,"positionName":"前端工程师","city":"杭州","createTime":"今天 10:06","salary":"10k-20k","companyId":152579,"companyLogo":"i/image/M00/8A/28/Cgp3O1h0m4KAGLFMAAAqALzWoyg599.png","companyName":"新光互联","companyFullName":"新光互联投资管理有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3761335,"positionName":"前端开发工程师","city":"佛山","createTime":"昨天 15:09","salary":"8k-15k","companyId":7358,"companyLogo":"image1/M00/31/6B/CgYXBlWLn3KADSK4AABTbxCLiYc568.jpg","companyName":"美的集团总部流程IT","companyFullName":"美的集团股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3408376,"positionName":"前端开发工程师","city":"杭州","createTime":"今天 11:12","salary":"8k-15k","companyId":127780,"companyLogo":"i/image/M00/27/86/CgqKkVcoRLiATHR6AAANCrxzAuw103.jpg","companyName":"孚嘉科技","companyFullName":"杭州孚嘉科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3298359,"positionName":"前端开发工程师","city":"上海","createTime":"今天 10:56","salary":"10k-15k","companyId":128998,"companyLogo":"i/image/M00/2A/A6/Cgp3O1cyziuAfM5AAAAe20ZOb-4754.png","companyName":"江苏亿科达","companyFullName":"上海海万信息科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3457062,"positionName":"Java开发工程师","city":"北京","createTime":"昨天 19:38","salary":"15k-30k","companyId":147,"companyLogo":"i/image/M00/76/40/Cgp3O1g1TNOAB2yxAAA9bQUyc4g814.png","companyName":"拉勾网","companyFullName":"北京拉勾网络技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3476321,"positionName":"Java开发工程师","city":"北京","createTime":"昨天 10:20","salary":"20k-35k","companyId":95651,"companyLogo":"i/image/M00/7B/73/CgqKkVhCuE6AMhXaAAAc4KLBL5k821.png","companyName":"玩吧","companyFullName":"北京默契破冰科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2672568,"positionName":"java开发","city":"上海","createTime":"今天 09:17","salary":"13k-18k","companyId":24995,"companyLogo":"image1/M00/00/33/CgYXBlTUXI-AC08_AACIkHlny3Y866.jpg","companyName":"泛微","companyFullName":"上海泛微网络科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3304725,"positionName":"Java开发工程师","city":"上海","createTime":"今天 09:00","salary":"16k-32k","companyId":1738,"companyLogo":"i/image/M00/61/D3/CgqKkVf8uQeAOqJ2AAArfl5skXY149.png","companyName":"有鱼金融科技","companyFullName":"上海彩亿信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3757529,"positionName":"JAVA工程师","city":"深圳","createTime":"2017-10-28","salary":"25k-30k","companyId":278538,"companyLogo":"i/image2/M00/14/E0/CgotOVnylLqAD2S8AAFKHb2TAG8841.png","companyName":"中国建设银行","companyFullName":"中国建设银行股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3298523,"positionName":"Java开发工程师","city":"上海","createTime":"今天 10:56","salary":"10k-15k","companyId":128998,"companyLogo":"i/image/M00/2A/A6/Cgp3O1cyziuAfM5AAAAe20ZOb-4754.png","companyName":"江苏亿科达","companyFullName":"上海海万信息科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2401622,"positionName":"Java开发工程师","city":"上海","createTime":"昨天 17:51","salary":"14k-25k","companyId":35713,"companyLogo":"image1/M00/45/B9/Cgo8PFXcJ-OAdN7iAAGgbRX9H0g507.png","companyName":"链家上海研发中心","companyFullName":"德佑房地产经纪有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2260060,"positionName":"Java","city":"上海","createTime":"今天 08:35","salary":"15k-30k","companyId":86068,"companyLogo":"i/image/M00/02/DF/CgqKkVafQuOAGx_iAAAno7Dsgo8593.png","companyName":"壹米滴答","companyFullName":"上海壹米滴答供应链管理有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3764177,"positionName":"Java研发工程师","city":"杭州","createTime":"今天 09:51","salary":"25k-50k","companyId":153849,"companyLogo":"i/image/M00/1F/54/CgpFT1kRuMmASL74AAAg3WZnNI005.jpeg","companyName":"蚂蚁金服集团","companyFullName":"支付宝(杭州)信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3764478,"positionName":"JAVA开发工程师","city":"上海","createTime":"今天 10:22","salary":"12k-24k","companyId":138667,"companyLogo":"i/image2/M00/12/F9/CgoB5lnu_4aACWoLAAAxiS4N490343.jpg","companyName":"坤普金融","companyFullName":"坤普金融服务（上海）有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3762910,"positionName":"JAVA","city":"广州","createTime":"昨天 17:41","salary":"13k-26k","companyId":27878,"companyLogo":"image1/M00/00/3C/Cgo8PFTUXLWAXc_-AABqGq1mV2A744.jpg","companyName":"法宝网","companyFullName":"上海百事通信息技术股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3719059,"positionName":"Java开发工程师","city":"北京","createTime":"2017-10-18","salary":"15k-25k","companyId":436,"companyLogo":"image1/M00/26/1E/Cgo8PFVUDROAf7zrAABr5cEcbGQ572.jpg","companyName":"360","companyFullName":"奇虎360科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3761994,"positionName":"java工程师","city":"深圳","createTime":"今天 09:43","salary":"10k-15k","companyId":123777,"companyLogo":"i/image/M00/2E/03/CgqKkVc9jmCAI8DpAAD09YLPnBk157.png","companyName":"通力互联","companyFullName":"北京通力互联技术服务有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3764045,"positionName":"JAVA开发","city":"广州","createTime":"今天 09:38","salary":"10k-17k","companyId":209072,"companyLogo":"i/image/M00/2F/28/CgpEMlkvkE2AP3SPAAAIBx4eYmA787.jpg","companyName":"德惟科技","companyFullName":"广州德惟科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2472508,"positionName":"Java","city":"杭州","createTime":"今天 09:19","salary":"15k-30k","companyId":2380,"companyLogo":"i/image/M00/5E/25/Cgp3O1fqMFWAJ4hgAAAUycalP_8040.png","companyName":"浙江执御信息技术有限公司","companyFullName":"浙江执御信息技术有限公司"}])
})

app.post("/getcity",function(req,res){
	res.json([{"cityList":["北京","上海","广州","深圳","成都","杭州"],"name":"热门城市","nameStr":"热门城市"},{"cityList":["保定","北京","宝鸡","包头","亳州","长春","成都","重庆","长沙","常州","沧州","东莞","大连","大理","东营","德州","佛山","福州"],"name":"","nameStr":"ABCDEF"},{"cityList":["桂林","贵阳","广州","赣州","淮安","邯郸","哈尔滨","合肥","呼和浩特","海口","黄石","杭州","惠州","湖州","金华","吉林","江门","济南","济宁","嘉兴","荆州"],"name":"","nameStr":"GHIJ"},{"cityList":["昆明","聊城","廊坊","拉萨","丽水","临沂","洛阳","连云港","兰州","柳州","泸州","马鞍山","茂名","绵阳","梅州","宁波","南昌","南充","南京","南宁","南通"],"name":"","nameStr":"KLMN"},{"cityList":["莆田","青岛","秦皇岛","泉州","日照"],"name":"","nameStr":"OPQR"},{"cityList":["上海","石家庄","遂宁","宿迁","汕头","绍兴","沈阳","三亚","深圳","苏州","泰安","天津","铜陵","唐山","太原","台州","泰州"],"name":"","nameStr":"STUV"},{"cityList":["潍坊","武汉","芜湖","威海","乌鲁木齐","无锡","温州","西安","香港特别行政区","厦门","西宁","湘潭","咸阳","信阳","徐州","银川","盐城","宜昌","烟台","岳阳","扬州","淄博","珠海","镇江","湛江","周口","肇庆","中山","郑州","漳州","株洲"],"name":"","nameStr":"WXYZ"}])
})
	

app.post('/getposition',function(req,res){
	res.json(
		{
            page :  {"currentPageNo":1,"hasNextPage":false,"hasPreviousPage":false,"pageNo":1,"pageSize":2,"result":[],"start":0,"totalCount":0,"totalPageCount":0},
            showShareButton : true,
            haveCollect : false,
            positionId : '3687437',
            companyId : '90381',
            avgScore : '',
            salary : '3k-6k',
            advantage : '一对一导师,放权管理',
            companyShortName : '女神进化论',
            positionName : '项目经理（实习生）',
            companyAddress : '三里屯soho',
            positionAddress : '北京',
            companyLogo :  'https://static.lagou.com/i/image/M00/03/1E/CgqKkVap65mAcMIvAAARYfQXuAs081.png',
            details : [
            	{title:"我们是谁？",p:["我们是时尚集团投资的全国最大的女性生活方式自媒体「女神进化论」（微信公众号：hibetterme）。","以专业、科学、实用为理念，集美妆，时尚，健身，旅游等内容为一体，我们赢得了300万年轻女性的喜爱。","你周围一定有人是我们的粉丝。","同时，我们也吸引了迪奥，香奈儿，SKII，雅诗兰黛等几乎大部分一线品牌的多次合作。在业内享有极好的口碑和影响力。","我们的创始人被评为2017年福布斯中国30位30岁以下精英。"]},
            	{title:"我们希望你做什么？",p:["1. 负责女神进化论美妆 APP 的项目管理工作；","2. 负责工作组的任务分配、进度把控、沟通协调、复核验收；","3. 参与产品用户运营、用户研究、竞品分析和其它产品部日常工作。"]},
            	{title:"我们希望你是谁？",p:["1. 全日制统招本科或研究生在读学生，专业不限;","2. 每周固定保证至少4天到岗，实习期最少3个月;","3. 对美妆知识有一定的积累。"]},
            	{title:"我们能带给你什么？",p:["1. 一对一导师，对工作进行深入指导；","2. 放权管理，让你有足够的空间接触项目管理；","3. 横向拓展，让你能够接触到更多专业的产品和运营领域。"]}
            ]
        }
	)
})

app.listen(8888,function(){
	console.log("server启动成功");
})
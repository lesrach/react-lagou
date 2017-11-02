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

app.post("/getJob",function(req,res){
	Job.find({},function(err,data){
		if(err){res.json({status:"error"})};
		res.json(arr);
	})
})

app.get('/getposition',function(req,res){
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
            companyLogo : window.location.protocol + '//static.lagou.com/i/image/M00/03/1E/CgqKkVap65mAcMIvAAARYfQXuAs081.png',
            url : window.location.href,
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
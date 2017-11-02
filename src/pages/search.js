import React,{Component} from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Job from '../components/job';

class Search extends Component{
	 constructor(){
		super();
		this.state= {
			hide: true,
			hideres:true,
			city:"全国",
			job:null,
			result:[],
			length:15
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleClickres = this.handleClickres.bind(this);
		this.handleChange =this.handleChange.bind(this);
		this.remove = this.remove.bind(this);
		this.load = this.load.bind(this);
		this.search = this.search.bind(this);
		this.InputChange = this.InputChange.bind(this);
	}
	render (){
		var html,htmlct,restext,citys= [{"cityList":["北京","上海","广州","深圳","成都","杭州"],"name":"热门城市","nameStr":"热门城市"},{"cityList":["保定","北京","宝鸡","包头","亳州","长春","成都","重庆","长沙","常州","沧州","东莞","大连","大理","东营","德州","佛山","福州"],"name":"","nameStr":"ABCDEF"},{"cityList":["桂林","贵阳","广州","赣州","淮安","邯郸","哈尔滨","合肥","呼和浩特","海口","黄石","杭州","惠州","湖州","金华","吉林","江门","济南","济宁","嘉兴","荆州"],"name":"","nameStr":"GHIJ"},{"cityList":["昆明","聊城","廊坊","拉萨","丽水","临沂","洛阳","连云港","兰州","柳州","泸州","马鞍山","茂名","绵阳","梅州","宁波","南昌","南充","南京","南宁","南通"],"name":"","nameStr":"KLMN"},{"cityList":["莆田","青岛","秦皇岛","泉州","日照"],"name":"","nameStr":"OPQR"},{"cityList":["上海","石家庄","遂宁","宿迁","汕头","绍兴","沈阳","三亚","深圳","苏州","泰安","天津","铜陵","唐山","太原","台州","泰州"],"name":"","nameStr":"STUV"},{"cityList":["潍坊","武汉","芜湖","威海","乌鲁木齐","无锡","温州","西安","香港特别行政区","厦门","西宁","湘潭","咸阳","信阳","徐州","银川","盐城","宜昌","烟台","岳阳","扬州","淄博","珠海","镇江","湛江","周口","肇庆","中山","郑州","漳州","株洲"],"name":"","nameStr":"WXYZ"}];
		var that = this;
		if(window.localStorage){
			var searchHistory = localStorage.getItem("searchH");
			if(searchHistory){
				html = JSON.parse(searchHistory).map(function(curr,index){
					return <div className='history-item' key={index} data-val={curr} onClick={that.search}>{curr}<a className='iconfont icon-chuyidong1 del' onClick={that.remove}></a></div>
				})
			}
		}
		htmlct = citys.map(function(curr,index){

			var html = curr.cityList.map(function(curr,index){
					return (<div data-name={curr} key={index} className='item' onClick={that.handleChange}>{curr}</div>)
			})
			return (<div key={index}>
						<div className='head'>{curr.nameStr}</div>
						{html}
					</div>)
		})
		var result = this.state.result.slice(0,this.state.length).map(function(curr,index) {
			return (<Job positionId={curr.positionId} position={curr.positionName} time={curr.createTime} city={curr.city} companyId={curr.companyId} price={curr.salary} src={"//static.lagou.com/"+curr.companyLogo} key={curr.positionId} companyname={curr.companyName}/>)
		})
		console.log(this.state.result.length);
		if(this.state.result.length !== 0){
			restext = (function(){
				return (
					<div>
						{result} 
						<a className='load' onClick={that.load}>加载更多</a>
					</div>
				)
			}())
		} else {
			restext = (function(){
				return (<div className='empty-info'>拉勾上暂时没有这样的职位</div>)
			}())
		}
		return(
			<div>
				<Header title="拉勾网"/>
				<div className="container">
					<div className='search'> 
						<a className='back' onClick={this.handleClick}><span className='iconfont icon-houtui' style={!this.state.hide?{display:'block'}:{display:'none'}}></span></a>
						<a className='country' onClick={this.handleClick}>{this.state.city}<span className='iconfont icon-xiala'></span></a>
						<input ref='search' type='text' placeholder='搜索职位或公司' onInput={this.InputChange}/>
						<a className='submit iconfont icon-sousu' onClick={this.handleClickres}></a>
					</div>
					<div className='content' style={this.state.hideres?{display:'block'}:{display:'none'}}>
						{html}
					</div>
					<div className='result' style={!this.state.hideres?{display:'block'}:{display:'none'}}>
						{restext}
						
					</div>
				</div>
				<div className='site' style={!this.state.hide?{display:'block'}:{display:'none'}}>
					{htmlct}
				</div>
				<Footer />
			</div>
		)
	}
	InputChange(e){
		var val = e.target.value;
		if(val === ""){
			this.setState({
				hideres: true
			})
		}
	}
	handleClickres(e){
		var val = e.target.previousSibling.value;
		var city = this.state.city;
		var Job;
		if( val !== ""){
			var arr = JSON.parse(localStorage.getItem('searchH'));
			if(arr && arr.length && arr.indexOf(val)<0){
				arr.unshift(val);
			} else {
				arr = [val];
			}
			localStorage.setItem('searchH',JSON.stringify(arr));
			if(city === "全国"){
				Job = this.state.job.filter(function(curr) {
					return (curr.positionName.indexOf(val) > -1);
				})
			} else{
				Job = this.state.job.filter(function(curr) {
					return (curr.city === city &&  curr.positionName.indexOf(val) > -1)
				})
			}
			this.setState({
				result: Job.slice(0,this.state.length),
				hideres: false
			})
		}
	}
	search(e){
		var val = e.target.dataset.val;
		var city = this.state.city;
		var Job;
		if(city === "全国"){
			Job = this.state.job.filter(function(curr) {
				return (curr.positionName.indexOf(val) > -1);
			})
		} else{
			Job = this.state.job.filter(function(curr) {
				return (curr.city === city &&  curr.positionName.indexOf(val) > -1)
			})
		}
		this.refs.search.value = val;
		this.setState({
			result: Job,
			hideres: false
		})
	}
	load(){
		this.setState((prestate)=>{
			prestate.length += 5;
		})
	}
	handleClick(){
		this.setState({
			hide: !this.state.hide
		})
	}
	handleChange(e){
		this.handleClick();
		var text = e.target.dataset.name;
		this.setState({
			city: text
		})
	}
	remove(e){
		e.target.parentNode.remove();
		var index = e.target.parentNode.dataset.index;
		var arr = JSON.parse(localStorage.getItem('searchH'));
		arr.splice(index,1);
		localStorage.setItem('searchH',JSON.stringify(arr));
	}
	componentWillMount(){
		this.setState({
			job:[{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2422955,"positionName":"前端开发工程师","city":"武汉","createTime":"今天 09:03","salary":"8k-13k","companyId":113938,"companyLogo":"i/image/M00/03/47/Cgp3O1ayysCAeN4DAAEwYNO6c-Q913.png","companyName":"互联网新媒体公司","companyFullName":"九派（武汉）全媒体股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3699426,"positionName":"前端开发工程师","city":"广州","createTime":"今天 11:02","salary":"14k-25k","companyId":16831,"companyLogo":"i/image/M00/02/AB/CgqKkVaXX_6AaLKaAAAX52Kvjjg750.jpg","companyName":"武汉佰钧成技术有限公司","companyFullName":"武汉佰钧成技术有限责任公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3667432,"positionName":"前端开发工程师","city":"长沙","createTime":"今天 10:04","salary":"4k-8k","companyId":268483,"companyLogo":"i/image2/M00/07/EC/CgotOVnOFleAWFg1AAAG1ov5bbs074.PNG","companyName":"天河灵控","companyFullName":"湖南天河灵控智能科技有限责任公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3715537,"positionName":"前端开发工程师","city":"北京","createTime":"今天 10:29","salary":"15k-25k","companyId":23875,"companyLogo":"i/image/M00/2E/86/CgpFT1k2Ym6AM59UAAAqn_YDrdg130.png","companyName":"黄金钱包","companyFullName":"北京盈衍网络科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2461938,"positionName":"前端工程师","city":"杭州","createTime":"昨天 13:38","salary":"15k-30k","companyId":43906,"companyLogo":"image1/M00/3F/00/Cgo8PFW_LV6AfC_dAAAiI8kL28g473.png","companyName":"浙江聚有财","companyFullName":"浙江聚有财金融服务外包有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2880961,"positionName":"前端工程师","city":"西安","createTime":"今天 10:44","salary":"6k-12k","companyId":147579,"companyLogo":"i/image/M00/7B/20/CgqKkVhBQaiAPuitAAA_0XLWqJk906.png","companyName":"师悦科技","companyFullName":"上海师悦信息科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3598122,"positionName":"前端开发工程师","city":"北京","createTime":"今天 10:00","salary":"20k-40k","companyId":3328,"companyLogo":"i/image/M00/5B/50/CgpEMlmIKKmAcuxkAAA5bp2u1EY990.png","companyName":"好未来","companyFullName":"北京世纪好未来教育科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":1226306,"positionName":"前端开发","city":"杭州","createTime":"今天 08:56","salary":"10k-20k","companyId":38088,"companyLogo":"i/image/M00/58/E8/Cgp3O1fWRwSAQBiBAALbQvXnwq8895.png","companyName":"东家","companyFullName":"杭州有朋网络技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2968373,"positionName":"前端开发工程师","city":"厦门","createTime":"今天 11:23","salary":"10k-15k","companyId":124563,"companyLogo":"i/image/M00/28/14/CgqKkVcpwZqAAzpAAACavmFiWPI900.jpg","companyName":"租我么","companyFullName":"厦门道拓科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2355860,"positionName":"前端开发","city":"北京","createTime":"今天 09:14","salary":"20k-35k","companyId":25439,"companyLogo":"i/image/M00/5A/F5/CgpFT1mNZfWAXLGYAAAM0qJze1U983.png","companyName":"Udesk－企业级智能客服平台","companyFullName":"北京沃丰时代数据科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3762172,"positionName":"前端开发","city":"深圳","createTime":"昨天 16:31","salary":"8k-16k","companyId":176351,"companyLogo":"i/image/M00/B1/AF/CgqKkVi5QMaAFFUuAAA0ZsOmMvY959.jpg","companyName":"广东车加","companyFullName":"广东车加数字文化传播有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2468115,"positionName":"前端开发工程师","city":"北京","createTime":"昨天 10:30","salary":"15k-28k","companyId":520,"companyLogo":"image1/M00/00/03/CgYXBlTUV_uAY85GAAAVtFKXIv8322.jpg","companyName":"小米","companyFullName":"北京小米科技有限责任公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3687437,"positionName":"项目经理（实习生）","city":"北京","createTime":"今天 10:59","salary":"3k-6k","companyId":90381,"companyLogo":"i/image/M00/03/1E/CgqKkVap65mAcMIvAAARYfQXuAs081.png","companyName":"女神进化论","companyFullName":"艾芒（北京）科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3677174,"positionName":"视频监控、安防行业-解决方案顾问","city":"上海","createTime":"今天 10:58","salary":"15k-30k","companyId":26467,"companyLogo":"image1/M00/00/38/CgYXBlTUXKKAa7c_AABVoBI494k814.jpg","companyName":"思华科技","companyFullName":"上海思华科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3686776,"positionName":"销售内勤","city":"广州","createTime":"今天 10:58","salary":"3k-4k","companyId":165494,"companyLogo":"i/image/M00/96/4C/Cgp3O1icK_KAYz9HAAFZfelV16I423.jpg","companyName":"云南山青花燃茶业有限公司","companyFullName":"云南山青花燃茶业有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3677105,"positionName":"软件测试工程师","city":"北京","createTime":"今天 10:58","salary":"10k-15k","companyId":16949,"companyLogo":"i/image/M00/6A/64/CgpEMlmncrqAQtxoAAA21bykABg871.png","companyName":"中企动力","companyFullName":"中企动力科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3677111,"positionName":"测试工程师","city":"北京","createTime":"今天 10:58","salary":"10k-15k","companyId":16949,"companyLogo":"i/image/M00/6A/64/CgpEMlmncrqAQtxoAAA21bykABg871.png","companyName":"中企动力","companyFullName":"中企动力科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3686474,"positionName":"PMO助理","city":"深圳","createTime":"今天 10:56","salary":"8k-15k","companyId":104977,"companyLogo":"i/image/M00/01/9B/Cgp3O1ZxG4eAH0IRAADXutTbmN8423.jpg","companyName":"长城物业集团","companyFullName":"长城物业集团股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3686491,"positionName":"业务解决方案经理","city":"深圳","createTime":"今天 10:56","salary":"18k-30k","companyId":104977,"companyLogo":"i/image/M00/01/9B/Cgp3O1ZxG4eAH0IRAADXutTbmN8423.jpg","companyName":"长城物业集团","companyFullName":"长城物业集团股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3676144,"positionName":"电商运营（南京工作）","city":"南京","createTime":"今天 10:56","salary":"5k-7k","companyId":43408,"companyLogo":"image1/M00/00/6D/CgYXBlTUXYOAPvu_AABFVqRuQwQ635.png","companyName":"广州原象","companyFullName":"广州市原象广告有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3676175,"positionName":"设计师（南京上班）","city":"南京","createTime":"今天 10:56","salary":"6k-8k","companyId":43408,"companyLogo":"image1/M00/00/6D/CgYXBlTUXYOAPvu_AABFVqRuQwQ635.png","companyName":"广州原象","companyFullName":"广州市原象广告有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3687206,"positionName":"大数据开发工程师","city":"上海","createTime":"今天 10:56","salary":"10k-15k","companyId":128998,"companyLogo":"i/image/M00/2A/A6/Cgp3O1cyziuAfM5AAAAe20ZOb-4754.png","companyName":"江苏亿科达","companyFullName":"上海海万信息科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3681386,"positionName":"微信小程序开发实习","city":"苏州","createTime":"今天 10:55","salary":"3k-6k","companyId":121280,"companyLogo":"i/image/M00/18/3B/Cgp3O1bzdbqANA_aAAAybL75iTg011.jpg","companyName":"簇格软件","companyFullName":"苏州簇格软件有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3681403,"positionName":"微信小程序资深开发","city":"苏州","createTime":"今天 10:55","salary":"6k-12k","companyId":121280,"companyLogo":"i/image/M00/18/3B/Cgp3O1bzdbqANA_aAAAybL75iTg011.jpg","companyName":"簇格软件","companyFullName":"苏州簇格软件有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3687427,"positionName":"C++后台架构师","city":"深圳","createTime":"今天 10:55","salary":"25k-35k","companyId":917,"companyLogo":"i/image/M00/37/20/CgqKkVdfms6Ac6dNAABY3gBvuqI944.jpg","companyName":"极光","companyFullName":"深圳市和讯华谷信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3687222,"positionName":"搜索产品经理","city":"北京","createTime":"今天 10:54","salary":"20k-35k","companyId":70,"companyLogo":"i/image/M00/01/A2/CgqKkVZyGeyAUPeJAAAIURCZrmM626.png","companyName":"宝宝树","companyFullName":"宝宝树（北京）信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3687241,"positionName":"搜索算法工程师","city":"北京","createTime":"今天 10:54","salary":"20k-40k","companyId":70,"companyLogo":"i/image/M00/01/A2/CgqKkVZyGeyAUPeJAAAIURCZrmM626.png","companyName":"宝宝树","companyFullName":"宝宝树（北京）信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3529978,"positionName":"前端开发工程师","city":"北京","createTime":"昨天 21:25","salary":"15k-30k","companyId":147,"companyLogo":"i/image/M00/76/40/Cgp3O1g1TNOAB2yxAAA9bQUyc4g814.png","companyName":"拉勾网","companyFullName":"北京拉勾网络技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2567200,"positionName":"前端","city":"上海","createTime":"今天 09:18","salary":"10k-15k","companyId":24995,"companyLogo":"image1/M00/00/33/CgYXBlTUXI-AC08_AACIkHlny3Y866.jpg","companyName":"泛微","companyFullName":"上海泛微网络科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2839906,"positionName":"前端开发工程师","city":"上海","createTime":"今天 09:09","salary":"12k-24k","companyId":1738,"companyLogo":"i/image/M00/61/D3/CgqKkVf8uQeAOqJ2AAArfl5skXY149.png","companyName":"有鱼金融科技","companyFullName":"上海彩亿信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3603157,"positionName":"前端开发工程师","city":"杭州","createTime":"昨天 17:04","salary":"8k-13k","companyId":96921,"companyLogo":"i/image/M00/82/FA/Cgp3O1hYtVCAANScAACQ0dXap10971.JPG","companyName":"远传技术","companyFullName":"浙江远传信息技术股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":1764574,"positionName":"前端开发工程师","city":"深圳","createTime":"2017-10-11","salary":"15k-30k","companyId":6927,"companyLogo":"image1/M00/37/F3/Cgo8PFWkd7iAHDSXAAAKdotH5mM556.jpg","companyName":"OPPO","companyFullName":"广东欧珀移动通信有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3260215,"positionName":"前端开发","city":"杭州","createTime":"今天 09:19","salary":"15k-25k","companyId":2380,"companyLogo":"i/image/M00/5E/25/Cgp3O1fqMFWAJ4hgAAAUycalP_8040.png","companyName":"浙江执御信息技术有限公司","companyFullName":"浙江执御信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3034730,"positionName":"前端工程师","city":"北京","createTime":"2017-10-18","salary":"10k-20k","companyId":436,"companyLogo":"image1/M00/26/1E/Cgo8PFVUDROAf7zrAABr5cEcbGQ572.jpg","companyName":"360","companyFullName":"奇虎360科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3307571,"positionName":"前端开发","city":"深圳","createTime":"今天 09:25","salary":"15k-30k","companyId":451,"companyLogo":"image1/M00/00/03/CgYXBlTUV_qALGv0AABEuOJDipU378.jpg","companyName":"腾讯","companyFullName":"腾讯科技(深圳)有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3764512,"positionName":"前端工程师","city":"北京","createTime":"今天 10:25","salary":"20k-30k","companyId":30118,"companyLogo":"image1/M00/16/C8/Cgo8PFUPqK6AJyZpAABYCku84ms042.png","companyName":"影谱科技","companyFullName":"北京影谱科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":1744426,"positionName":"前端开发工程师","city":"上海","createTime":"昨天 19:08","salary":"16k-25k","companyId":35713,"companyLogo":"image1/M00/45/B9/Cgo8PFXcJ-OAdN7iAAGgbRX9H0g507.png","companyName":"链家上海研发中心","companyFullName":"德佑房地产经纪有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3760971,"positionName":"前端工程师","city":"合肥","createTime":"昨天 14:32","salary":"6k-12k","companyId":157635,"companyLogo":"i/image/M00/82/FF/Cgp3O1hYvnaAPzhrAAAOpMVkEYg628.png","companyName":"蜜蜂出行","companyFullName":"北京蜜蜂出行科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3761651,"positionName":"前端工程师","city":"杭州","createTime":"今天 10:06","salary":"10k-20k","companyId":152579,"companyLogo":"i/image/M00/8A/28/Cgp3O1h0m4KAGLFMAAAqALzWoyg599.png","companyName":"新光互联","companyFullName":"新光互联投资管理有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3761335,"positionName":"前端开发工程师","city":"佛山","createTime":"昨天 15:09","salary":"8k-15k","companyId":7358,"companyLogo":"image1/M00/31/6B/CgYXBlWLn3KADSK4AABTbxCLiYc568.jpg","companyName":"美的集团总部流程IT","companyFullName":"美的集团股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3408376,"positionName":"前端开发工程师","city":"杭州","createTime":"今天 11:12","salary":"8k-15k","companyId":127780,"companyLogo":"i/image/M00/27/86/CgqKkVcoRLiATHR6AAANCrxzAuw103.jpg","companyName":"孚嘉科技","companyFullName":"杭州孚嘉科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3298359,"positionName":"前端开发工程师","city":"上海","createTime":"今天 10:56","salary":"10k-15k","companyId":128998,"companyLogo":"i/image/M00/2A/A6/Cgp3O1cyziuAfM5AAAAe20ZOb-4754.png","companyName":"江苏亿科达","companyFullName":"上海海万信息科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3457062,"positionName":"Java开发工程师","city":"北京","createTime":"昨天 19:38","salary":"15k-30k","companyId":147,"companyLogo":"i/image/M00/76/40/Cgp3O1g1TNOAB2yxAAA9bQUyc4g814.png","companyName":"拉勾网","companyFullName":"北京拉勾网络技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3476321,"positionName":"Java开发工程师","city":"北京","createTime":"昨天 10:20","salary":"20k-35k","companyId":95651,"companyLogo":"i/image/M00/7B/73/CgqKkVhCuE6AMhXaAAAc4KLBL5k821.png","companyName":"玩吧","companyFullName":"北京默契破冰科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2672568,"positionName":"java开发","city":"上海","createTime":"今天 09:17","salary":"13k-18k","companyId":24995,"companyLogo":"image1/M00/00/33/CgYXBlTUXI-AC08_AACIkHlny3Y866.jpg","companyName":"泛微","companyFullName":"上海泛微网络科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3304725,"positionName":"Java开发工程师","city":"上海","createTime":"今天 09:00","salary":"16k-32k","companyId":1738,"companyLogo":"i/image/M00/61/D3/CgqKkVf8uQeAOqJ2AAArfl5skXY149.png","companyName":"有鱼金融科技","companyFullName":"上海彩亿信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3757529,"positionName":"JAVA工程师","city":"深圳","createTime":"2017-10-28","salary":"25k-30k","companyId":278538,"companyLogo":"i/image2/M00/14/E0/CgotOVnylLqAD2S8AAFKHb2TAG8841.png","companyName":"中国建设银行","companyFullName":"中国建设银行股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3298523,"positionName":"Java开发工程师","city":"上海","createTime":"今天 10:56","salary":"10k-15k","companyId":128998,"companyLogo":"i/image/M00/2A/A6/Cgp3O1cyziuAfM5AAAAe20ZOb-4754.png","companyName":"江苏亿科达","companyFullName":"上海海万信息科技股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2401622,"positionName":"Java开发工程师","city":"上海","createTime":"昨天 17:51","salary":"14k-25k","companyId":35713,"companyLogo":"image1/M00/45/B9/Cgo8PFXcJ-OAdN7iAAGgbRX9H0g507.png","companyName":"链家上海研发中心","companyFullName":"德佑房地产经纪有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2260060,"positionName":"Java","city":"上海","createTime":"今天 08:35","salary":"15k-30k","companyId":86068,"companyLogo":"i/image/M00/02/DF/CgqKkVafQuOAGx_iAAAno7Dsgo8593.png","companyName":"壹米滴答","companyFullName":"上海壹米滴答供应链管理有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3764177,"positionName":"Java研发工程师","city":"杭州","createTime":"今天 09:51","salary":"25k-50k","companyId":153849,"companyLogo":"i/image/M00/1F/54/CgpFT1kRuMmASL74AAAg3WZnNI005.jpeg","companyName":"蚂蚁金服集团","companyFullName":"支付宝(杭州)信息技术有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3764478,"positionName":"JAVA开发工程师","city":"上海","createTime":"今天 10:22","salary":"12k-24k","companyId":138667,"companyLogo":"i/image2/M00/12/F9/CgoB5lnu_4aACWoLAAAxiS4N490343.jpg","companyName":"坤普金融","companyFullName":"坤普金融服务（上海）有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3762910,"positionName":"JAVA","city":"广州","createTime":"昨天 17:41","salary":"13k-26k","companyId":27878,"companyLogo":"image1/M00/00/3C/Cgo8PFTUXLWAXc_-AABqGq1mV2A744.jpg","companyName":"法宝网","companyFullName":"上海百事通信息技术股份有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3719059,"positionName":"Java开发工程师","city":"北京","createTime":"2017-10-18","salary":"15k-25k","companyId":436,"companyLogo":"image1/M00/26/1E/Cgo8PFVUDROAf7zrAABr5cEcbGQ572.jpg","companyName":"360","companyFullName":"奇虎360科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3761994,"positionName":"java工程师","city":"深圳","createTime":"今天 09:43","salary":"10k-15k","companyId":123777,"companyLogo":"i/image/M00/2E/03/CgqKkVc9jmCAI8DpAAD09YLPnBk157.png","companyName":"通力互联","companyFullName":"北京通力互联技术服务有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":3764045,"positionName":"JAVA开发","city":"广州","createTime":"今天 09:38","salary":"10k-17k","companyId":209072,"companyLogo":"i/image/M00/2F/28/CgpEMlkvkE2AP3SPAAAIBx4eYmA787.jpg","companyName":"德惟科技","companyFullName":"广州德惟科技有限公司"},{"logger":{"traceCapable":true,"name":"com.lagou.entity.mobile.MobilePosition"},"positionId":2472508,"positionName":"Java","city":"杭州","createTime":"今天 09:19","salary":"15k-30k","companyId":2380,"companyLogo":"i/image/M00/5E/25/Cgp3O1fqMFWAJ4hgAAAUycalP_8040.png","companyName":"浙江执御信息技术有限公司","companyFullName":"浙江执御信息技术有限公司"}]
		})
	}
}

export default Search
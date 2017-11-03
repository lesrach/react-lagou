import React,{Component} from 'react';
import {Link} from 'react-router';
import Header from '../components/header';

class Setmsg extends Component{
	constructor(){
		super();
		this.state = {
			msg:{init:true},
			page:null,
			text:null,
			hide:false
		}
		this.handleClick = this.handleClick.bind(this);
		this.hide = this.hide.bind(this);
		this.turn = this.turn.bind(this);
	}
	render (){
		var text,that=this;
		if(this.state.page===0){
			text = (
				<div>
					<div className='info' style={this.state.hide?{display:'none'}:{display:'block'}}>
						<p className='middle'>{"“"+this.state.text.title+"”"}</p>
					</div>
					<div className='write'>
						<input ref='write' type='text' placeholder={this.state.text.holder} onFocus={that.hide}/>
						<a onClick={that.turn}>OK</a>
					</div>
					<div className='choose'>
						{this.state.text.section.map(function(curr,index){
							return (
								<div className='msg-item' data-data={curr} key={index} onClick={that.handleClick}>
									{curr}
								</div> 
							)
						})}
					</div>
				</div>
				)
		} else if(this.state.page===1){
			text = (
				<div>
					<div className='info'>
						<p className='middle'>{"“"+this.state.text.title+"”"}</p>
					</div>
					
					{this.state.text.section.map(function(curr,index){
						return (
							<div className='city-item' key={index}>
								<div className='title'>{curr.nameStr}</div>
								{curr.cityList.map(function(curr,index){
									return (
											<div className='msg-city' data-data={curr} key={index}  onClick={that.handleClick}>{curr}</div>
										)
								})}
							</div> 
						)
					})}
					
				</div>
			)
		} else if(this.state.page===2){
			text = (
				<div>
					<div className='info'>
						<p className='top'>{"“"+this.state.text.title[0]+"”"}</p>
						<p className='bottom'>{"“"+this.state.text.title[1]+"”"}</p>
					</div>
					<div className='choose'>
						{this.state.text.section.map(function(curr,index){
							return (
								<div className='msg-item' data-data={curr} key={index}  onClick={that.handleClick}>
									{curr}
								</div> 
							)
						})}
					</div>
				</div>
			)
		}else if(this.state.page===3){
			text = (
				<div>
					<div className='info'>
						<p className='middle'>{"“"+this.state.text.title+"”"}</p>
					</div>
					<div className='choose'>
						{this.state.text.section.map(function(curr,index){
							return (
								<div className='msg-item' data-data={curr} key={index}  onClick={that.handleClick}>
									{curr}
								</div> 
							)
						})}
					</div>
				</div>
			)
		}
		return(
			<div>
				<Header title="我的收藏" comp='back'/>
				<div className="container-n">
					{text}
				</div>
			</div>
		)
	}
	turn(){
		var val = this.refs.write.val;
		this.state.msg[0]= val;
		var str = this.state.msg.reduce(function(a,b){
			return a + b
		})
		if(!this.state.init){
			localStorage.setItem("set",JSON.stringify(this.state.msg))
			window.location.href = "/edit";
		} else {
			window.location.href = "/setmsg/city";
		}
	}
	hide(){
		this.setState({
			hide:true
		})
	}
	handleClick(e){
		var val = e.target.dataset.data,
			arr = ['position','city','salary','stage'],
			Set = localStorage.getItem("set"),init;
		if(Set){
			var _set =  JSON.parse(Set);
			init = _set.init;
		}
		this.state.msg[arr[this.state.page]] = val;
		if(this.state.page === 3){
			localStorage.setItem("set",JSON.stringify(this.state.msg));
			if(init){
				this.state.msg.init = false;
				localStorage.setItem("set",JSON.stringify(this.state.msg));
			}
			window.location.href = "/edit";
		} else if(this.state.page === 0){
			localStorage.setItem("set",JSON.stringify(this.state.msg));
			if(init){
				window.location.href = "/setmsg/city";
			} else {
				window.location.href = '/edit';
			}
		}else if(this.state.page === 1){
			localStorage.setItem("set",JSON.stringify(this.state.msg))
			if(init){
				window.location.href = "/setmsg/salary";
			} else {
				window.location.href = '/edit';
			}
		}else if(this.state.page === 2){
			localStorage.setItem("set",JSON.stringify(this.state.msg))
			if(init){
				window.location.href = "/setmsg/stage";
			} else {
				window.location.href = '/edit';
			}
		}
	}
	componentWillMount(){
		console.log(this.props.location);
		var text = [
			{title:"想找什么职位?",holder:"输入你想定制的职位",section:['产品经理','Java','运营','Android','PHP','UI','IOS','编辑','BD']},
			{title:"告诉我你期望的工作地点？",section:[{"cityList":["北京","上海","广州","深圳","成都","杭州"],"name":"热门城市","nameStr":"热门城市"},{"cityList":["保定","北京","宝鸡","包头","亳州","长春","成都","重庆","长沙","常州","沧州","东莞","大连","大理","东营","德州","佛山","福州"],"name":"","nameStr":"ABCDEF"},{"cityList":["桂林","贵阳","广州","赣州","淮安","邯郸","哈尔滨","合肥","呼和浩特","海口","黄石","杭州","惠州","湖州","金华","吉林","江门","济南","济宁","嘉兴","荆州"],"name":"","nameStr":"GHIJ"},{"cityList":["昆明","聊城","廊坊","拉萨","丽水","临沂","洛阳","连云港","兰州","柳州","泸州","马鞍山","茂名","绵阳","梅州","宁波","南昌","南充","南京","南宁","南通"],"name":"","nameStr":"KLMN"},{"cityList":["莆田","青岛","秦皇岛","泉州","日照"],"name":"","nameStr":"OPQR"},{"cityList":["上海","石家庄","遂宁","宿迁","汕头","绍兴","沈阳","三亚","深圳","苏州","泰安","天津","铜陵","唐山","太原","台州","泰州"],"name":"","nameStr":"STUV"},{"cityList":["潍坊","武汉","芜湖","威海","乌鲁木齐","无锡","温州","西安","香港特别行政区","厦门","西宁","湘潭","咸阳","信阳","徐州","银川","盐城","宜昌","烟台","岳阳","扬州","淄博","珠海","镇江","湛江","周口","肇庆","中山","郑州","漳州","株洲"],"name":"","nameStr":"WXYZ"}]},
			{title:["你值得更好的生活,","告诉我你期望的薪水。"],section:['没有要求','2k以下','2k-5k','5k-10k','10k-15k','15k-25k','25k-50k','50k以上']},
			{title:"对公司的规模可有要求？",section:['没有要求','初创型( 天使轮及未融资 )','成长型( A轮或B轮融资 )','成熟型( C轮融资以上但未上市 )','上市公司']}
		],path = this.props.location.pathname;
		if(path === '/setmsg/position'){
			this.setState({
				text:text[0],
				page:0
			})
		} else if(path === '/setmsg/city'){
			this.setState({
				text:text[1],
				page:1
			})
		} else if(path === '/setmsg/salary'){
			this.setState({
				text:text[2],
				page:2
			})
		} else if(path === '/setmsg/stage'){
			this.setState({
				text:text[3],
				page:3
			})
		}
		var set = localStorage.getItem("set");
		if(!set){
			localStorage.setItem('set',JSON.stringify({init:true}));
		} else {
			this.setState({
				msg:JSON.parse(set)
			})
		}
	}
}

export default Setmsg
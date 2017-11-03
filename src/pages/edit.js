import React,{Component} from 'react';
import {Link} from 'react-router';
import Footer from '../components/footer';
import Header from '../components/header';

class Edit extends Component{
	constructor(){
		super();
		this.state = {
			position: null,
			city:null,
			salary:null,
			stage:null
		}
	}asdasd
	render (){
		return(
			<div>
				<Header title="设定定制信息" comp='back'/>
				<div className="container">
					<div id="edit">
						<h3 className='msg-title'>职业类型</h3>
						<Link to='/setmsg/position' className='msg-details' >{this.state.position}</Link>
						<h3 className='msg-title'>工作地点</h3>
						<Link to='/setmsg/city' className='msg-details' >{this.state.city}</Link>
						<h3 className='msg-title'>期望薪水</h3>
						<Link to='/setmsg/salary' className='msg-details' >{this.state.salary}</Link>
						<h3 className='msg-title'>公司规模</h3>
						<Link to='/setmsg/stage' className='msg-details' >{this.state.stage}</Link>
					</div>
					<Link to="/" className='tosearch'>开始搜索</Link>
				</div>
			</div>
		)
	}
	componentWillMount(){
		if(window.localStorage){
			var mess = JSON.parse(localStorage.getItem("set"));
			if(!mess){
				window.location.href = '/setmsg/position';
			} else {
				this.setState({
					position:mess.position,
					salary:mess.salary,
					city:mess.city,
					stage:mess.stage
				})
			}
		}
	}
}

export default Edit
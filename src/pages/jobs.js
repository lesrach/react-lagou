import React,{Component} from 'react';
import {Link} from 'react-router';
import Header from '../components/header';
import axios from 'axios';

class Job extends Component{
	constructor(){
		super();
		this.state = {
			msg:{},
			hide:true,
			collect:false
		}
		this.info = this.info.bind(this);
		this.collect =this.collect.bind(this);
	}
	render (){
		var collect;
		if(this.state.collect){
			collect = (<span className='iconfont top'></span>)
		} else {
			collect = (<span className='iconfont top'></span>)
		}
		var text;
		if(this.state.msg.details){
			text = this.state.msg.details.map(function(curr,index){
					return(
						<div>
							<h5>{curr.title}</h5>
							{curr.p.map(function(curr,index){
								return (
										<p>curr</p>
									)
							})}
						</div>
						)
				})
			}
		return(
			<div>
				<Header title="设定定制信息" comp='backhome'/>
				<div className="container">
					<div className='job-title'>
						<a onClick={this.collect}>{collect}</a>
						{this.state.msg.positionName}
					</div>
					<div className='position-msg'>
						<div className='posi-item'><span></span>{this.state.msg.salary}</div>
						<div className='posi-item'><span></span>{this.state.msg.positionAddress}</div>
						<div className='posi-item'><span></span>全职</div>
						<div className='posi-item'><span></span>3-5年</div>
						<div className='posi-item'><span></span>本科及以上</div>
						<p className='posi-info'>{"职业诱惑:"+this.state.msg.advantage}</p>
					</div>
					<div className='company-msg'>
						<div className='logo'>
							<img src={this.state.msg.companyLogo} alt='logo' />
						</div>
						<div className='company-details'>
							<h2 className='title'>{this.state.msg.companyShortName}</h2>
							<p className='msg'>移动互联网 / 不需要融资 / 150-500人</p>
						</div>
						<div className='img'></div>
					</div>
					<div className='position-title'>职位描述</div>
					<div className='position-details'>
						{text}
					</div>
				</div>
				<Link onClick={this.info} className='de-send'>投递简历</Link>
				<div className='tips' style={this.state.hide?{display:'none'}:{display:'block'}}>
					下载拉勾APP，快速完善简历，投递更方便
				</div>
			</div>
		)
	}
	componentWillMount(){
		axios.post('/getposition').then(function(data){
			console.log(data)
			this.setState({
				msg:data
			})
		})
	}
	collect(){
		this.setState((prestate)=>{
			collect:!prestate.collect
		})
	}
	info(){
		this.setState({
			hide:false
		})
		setTimeout(function(){
			this.setState({
				hide:true
			})
		},2000)
	}
}

export default Job
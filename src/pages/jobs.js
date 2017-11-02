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
		console.log(this.state.msg)
		if(this.state.collect){
			collect = (<p><span className='solid top'></span><span className='col-info'>已收藏</span></p>)
		} else {
			collect = (<p><span className='dashed top'></span><span className='col-info'>未收藏</span></p>)
		}
		var text;
		if(this.state.msg.details){
			text = this.state.msg.details.map(function(curr,index){
					return(
						<div>
							<h5>{curr.title}</h5>
							{curr.p.map(function(curr,index){
								return (
										<p>{curr}</p>
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
						<a onClick={this.collect} className='collect'>{collect}</a>
						{this.state.msg.positionName}
					</div>
					<div className='position-msg'>
						<div className='posi-item'><span className='dollor'></span>{this.state.msg.salary}</div>
						<div className='posi-item'><span className='siteicon'></span>{this.state.msg.positionAddress}</div>
						<div className='posi-item'><span className='clock'></span>全职</div>
						<div className='posi-item'><span className='backpack'></span>3-5年</div>
						<div className='posi-item'><span className='hat'></span>本科及以上</div>
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
				<div className='de-back'>
					<Link onClick={this.info} className='de-send'>投递简历</Link>
				</div>
				<div className='tips' style={this.state.hide?{display:'none'}:{display:'block'}}>
					下载拉勾APP，快速完善简历，投递更方便
				</div>
			</div>
		)
	}
	componentWillMount(){
		var that = this;
		axios.post('/getposition').then(function(data){
			that.setState({
				msg:data.data
			})
		})
	}
	collect(){
		this.setState((prestate)=>{
			return {collect:!prestate.collect}
		})
	}
	info(){
		var that = this
		this.setState({
			hide:false
		})
		setTimeout(()=>{
			that.setState({
				hide:true
			})
		},2000)
	}
}

export default Job
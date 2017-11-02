import React,{Component} from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import {Link} from 'react-router';
import Job from '../components/job';
import axios from 'axios';

class Post extends Component{
	constructor(){
		super();
		this.state = {
			job:null,
			length:15,
			login:true
		}
		this.load= this.load.bind(this)
	}
	render (){
		var html;
		if(this.state.job){
			html = this.state.job.slice(0,this.state.length).map(function(curr,index){
				return (<Job positionId={curr.positionId} position={curr.positionName} time={curr.createTime} city={curr.city} companyId={curr.companyId} price={curr.salary} src={"//static.lagou.com/"+curr.companyLogo} key={curr.positionId} companyname={curr.companyName}/>)
			})
		}
		
		var head,text,msg = localStorage.getItem('set');
		if(msg){
			msg = JSON.parse(msg);
			text = msg.position+"/"+msg.city+"/"+msg.salary+"/"+msg.stage.slice(0,3)
		} else {
			text = "10秒钟定制职位"
		}
		if(this.state.login){
			head = (function(){
				return (
					<div className='headmsg'>
						<span>{text}</span>
						<Link to='/edit' className='edit'>编辑</Link>
					</div>
					)
			}())
		} else{
			head = (function(){
				return (
					<div className='headmsg'>
						<span>10秒钟定制职位</span>
						<Link to='/login' className='edit'>去登录</Link>
					</div>
					)
			}())
		}
		return(
			<div>
				<Header title="拉勾网"/>
				<div className="container">
					{head}
					{html}
					<a className='load' onClick={this.load}>加载更多</a>
					<div id="copyright">
						<p>©2015 lagou.com, all right reserved </p>
						<div className="copyright-item">
							<span className="phone">移动版&nbsp;·&nbsp;</span>
							<span className="computer">电脑版&nbsp;·&nbsp;</span>
							<a href="#header">回顶部</a>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		)
	}
	load(){
		this.setState((prestate)=>{
			prestate.length += 5;
		})
	}
	componentWillMount(){
		var that = this;
		axios.post('/getjob').then(function(data){
			console.log(data);
			that.setState({
				job: data.data
			})
		})
		var login = localStorage.getItem('login');
		if(login === 'false'){
			this.setState({
				login:false
			})
		}
	}
}

export default Post
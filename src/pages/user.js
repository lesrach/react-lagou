import React,{Component} from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import {Link} from 'react-router';

class User extends Component{
	constructor(){
		super();
		this.state = {
			login:true,
			name:""
		}
		this.esc = this.esc.bind(this);
		this.alert =this.alert.bind(this);
	}
	render (){
		var info,that=this;
		if(this.state.login){
			info = (function(){
				return <div className='logininfo'>
						<div className='headimg'>
							<img src='//static.lagou.com/images/myresume/default_headpic.png' alt='' className='headimg'/>
							<div className='name'>{that.state.name}</div>
						</div>
						<a onClick={that.alert}>简历></a>
					</div>
			}())
		} else {
			info = (function(){
				return <div className='logininfo'>
						<Link to="/login" className='login'>登录/注册</Link>
					</div>
			}())
		}
		return(
			<div>
				<Header title="拉勾网"/>
				<div className='container'>
					{info}
					<div className='control'>
						<Link to="/deliverlist" className='item'>投递</Link>
						<Link to="/interviewlist" className='item'>面试</Link>
						<Link to="/invitation" className='item'>邀约</Link>
						<Link to="/collectlist" className='item'>收藏</Link>
					</div>
					<a  style={this.state.login?{display:'block'}:{display:'none'}} onClick={this.esc} className='esc'>退出登录</a>
				</div>
				<Footer />
			</div>
		)
	}
	componentWillMount(){
		var bool = localStorage.getItem("login");
		if(bool === "true"){
			this.setState({
				login:true
			})
		} else{
			this.setState({
				login:false
			})
		}
		var login = localStorage.getItem('login');
		if(login === 'false'){
			this.setState({
				login:false
			})
		}
	}
	esc(){
		localStorage.setItem("login","false")
		window.location.href = "/login";
	}
	alert(){
		alert('下载拉勾APP')
	}
}

export default User

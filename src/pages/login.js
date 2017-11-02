import React,{Component} from 'react';
import Input from '../components/input';
import {Link} from 'react-router';
import axios from 'axios';

class Login extends Component{
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}
	render (){
		return(
			<div id='login'>
				<Input ref='user' type='text' name='user' className='top-radius' text='已验证手机/邮箱' />
				<Input ref='password' type='password' name='password' className='bottom-radius' text='密码' comp="eye" />
				<button name='register' onClick={this.handleClick} className='login'>登录</button>
				<p>还没账号？</p>
				<Link to='/register' className='register'>注册</Link>
			</div>
		)
	}
	handleClick(){
		var res = this.refs.password.check()
		+ this.refs.user.check();
		var that = this;
		if(res < 1 ){
			axios.post("/login",{
				phone:that.refs.user.value(),
				password:that.refs.password.value()
			}).then(function(data){
				if(data.data.status === "0"){
					localStorage.setItem("login",true);
					window.location.href = "/";
				} else {
					that.refs.password.failed();
				}
			})
		}
	}
}

export default Login
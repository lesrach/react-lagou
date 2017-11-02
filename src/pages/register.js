import React,{Component} from 'react';
import Input from '../components/input';
import ImgCode from '../components/imgcode';
import {Link} from 'react-router';
import axios from 'axios';

class Register extends Component{
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}
	render (){
		return(
			<div id='register'>
				<Input type='text' name='phone' text='手机号' ref='phone'/>
				<ImgCode ref='imgcode'/>
				<Input type='text' name='code' text='短信验证码' ref='code'/>
				<Input type='password' name='password' text='设置6-16位密码' comp="eye" ref='password'/ >
				<button name='register' onClick={this.handleClick} className='register'>注册</button>
				<p>已有账号？</p>
				<Link to='/login' className='login'>登录</Link>
				<p>点击注册，即代表您同意<a target="_blank" src='http://www.lagou.com/privacy.html'>《拉勾用户协议》</a></p>
			</div>
		)
	}
	handleClick(){
		var res = this.refs.code.check() +
		this.refs.imgcode.check() +
		this.refs.phone.check() +
		this.refs.password.check();
		if(res < 1){
			axios.post("/register",{
				phone:this.refs.phone.value,
				password:this.refs.password.value
			})
			window.location.href = "/login";
		}
	}

}

export default Register
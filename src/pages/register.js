import React,{Component} from 'react';
import Input from '../components/input';
import Button from '../components/button';
import ImgCode from '../components/imgcode';
import {Link} from 'react-router';

class Post extends Component{
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}
	render (){
		return(
			<div id='register'>
				<Input type='text' name='phone' text='手机号' />
				<Input type='text' name='code' text='请证明你不是机器人' />
				<ImgCode />
				<Input type='text' name='phone' text='短信验证码' />
				<Input type='password' name='phone' text='设置6-16位密码' comp="eye"/ >
				<Button name='register' text='注册' onClick={this.handleClick}/>
				<p>已有账号？</p>
				<Link to='/login' className='login'>登录</Link>
				<p>点击注册，即代表您同意<a target="_blank" src='http://www.lagou.com/privacy.html'>《拉勾用户协议》</a></p>
			</div>
		)
	}
		handleClick(){
		window.location.href = "/login";
	}
}

export default Post
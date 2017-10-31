import React,{Component} from 'react';
import Input from '../components/input';
import Button from '../components/button';
import {Link} from 'react-router';

class Post extends Component{
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}
	render (){
		return(
			<div id='login'>
				<Input type='text' name='phone' className='top-radius' text='已验证手机/邮箱' />
				<Input type='password' name='password' className='bottom-radius' text='密码' comp="eye" />
				<Button name='login' text='登录' onClick={this.handleClick}/>
				<p>还没账号？</p>
				<Link to='/register' className='register'>注册</Link>
			</div>
		)
	}
	handleClick(){
		window.location.href = "/";
	}
}

export default Post
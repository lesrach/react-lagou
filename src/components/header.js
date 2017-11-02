import React,{Component} from 'react';

class Header extends Component{
	constructor(){
		super();
		this.back = this.back.bind(this);
		this.home = this.home.bind(this);
	}
	render(){
		var html,that = this
		if(this.props.comp === 'back'){
			html = (<a onClick={that.back} className='hback'><span className='iconfont icon-houtui'></span></a>)
		} else if (this.props.comp === 'backhome'){
			html = (
				<div style={{position:'absolute',top:0,width:"100%"}}>
					<a onClick={that.back} className='hback'><span className='iconfont icon-houtui'></span></a>
					<a onClick={that.home} className='home'><span className='iconfont icon-fangzi'></span></a>
				</div>
				)
		}
		return(
			<header className='header'>
				<span>{this.props.title}</span>
				{html}
			</header>
		)
	}
	back(){
		window.history.back();
	}
	home(){
		window.location.href = "/";
	}
}

export default Header
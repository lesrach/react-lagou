import React,{Component} from 'react';
import {Link} from 'react-router';

class Footer extends Component{
	render(){
		var html
		if(this.props.active === '3'){
			html = 'active'
		}
		return(
			<footer className="footer">
				<Link to="/" activeClassName='active'><span className='iconfont icon-fangzi'></span>职位</Link>
				<Link to="/search" activeClassName='active'><span className='iconfont icon-sousu'></span>搜索</Link>
				<Link to="/user" activeClassName='active' className={html}><span className='iconfont icon-wo'></span>我的</Link>
				{this.props.children}
			</footer>
		)
	}
}

export default Footer

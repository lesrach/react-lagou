import React,{Component} from 'react';
import {Link,IndexLink} from 'react-router';
import Header from '../components/header';

class Interiverlist extends Component{
	constructor(){
		super();
		this.state = {
			history:[]
		}
	}
	render (){
		var html;
		if(this.props.location.pathname.slice(-1) == 1){
			html = (
				<div className='inter-back'>
					<p className='empty-info'>暂时没有已面试的记录，去
						<Link to='/' className='send'>投简历</Link>
						吧
					</p>
				</div>
			)
		} else {
			html = (
				<div className='inter-back'>
					<p className='empty-info'>暂时没有将面试的记录，去
						<Link to='/' className='send'>投简历</Link>
						吧
					</p>
				</div>
			)
		}
		return(
			<div>
				<Header title="我的面试" comp='back'/>
				<div className="container">
					<div  className='interview'>
						<IndexLink to="/interviewlist" activeClassName='inter-active'>已面试</IndexLink>
						<Link to="/interviewlist/1" activeClassName='inter-active'>将面试</Link>
					</div>
					{html}
				</div>
			</div>
		)
	}
	componentWillMount(){
		// post
	}
}

export default Interiverlist
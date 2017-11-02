import React,{Component} from 'react';
import {Link,IndexLink} from 'react-router';
import Header from '../components/header';

class Deliverlist extends Component{
	constructor(){
		super();
		this.state = {
			history:[]
		}
	}
	render (){
		var html = (<div className='empty-info'>暂无记录~</div>) 
		return(
			<div>
				<Header title="投递记录" comp='back'/>
				<div className="container">
					<div  className='deliver'>
						<IndexLink to="/deliverlist" activeClassName='de-active'>全部</IndexLink>
						<Link to="/deliverlist/1" activeClassName='de-active'>邀请面试</Link>
						<Link to="/deliverlist/2" activeClassName='de-active'>不合适</Link>
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

export default Deliverlist
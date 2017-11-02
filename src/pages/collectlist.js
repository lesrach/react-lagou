import React,{Component} from 'react';
import {Link} from 'react-router';
import Header from '../components/header';

class Collectlist extends Component{
	constructor(){
		super();
		this.state = {
			history:[]
		}
	}
	render (){
		var html;
		if(!this.state.history.length){
			html = (<div className='empty-info'>还没有收藏的职位~</div>)
		}
		return(
			<div>
				<Header title="我的收藏" comp='back'/>
				<div className="container">
					{html}
				</div>
			</div>
		)
	}
	componentWillMount(){
		// post
	}
}

export default Collectlist
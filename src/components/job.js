import React,{Component} from 'react';

class Job extends Component{
	constructor(){
		super();
		this.handleClick = this.handleClick.bind(this);
	}
	render(){
		return(
			<div className='job-item' data-positionid={this.props.positionId} data-companyid={this.props.companyId} onClick={this.handleClick}>
				<div className='img'>
					<img src={this.props.src} alt=""/>
				</div>
				<div className="item-desc">
	                <h2 className="item-title">{this.props.companyname}</h2>
	                <p className="item-info">
	                	<span className="item-salary">{this.props.price}</span>
	                    <span className="item-pos">{this.props.position}[{this.props.city}]</span>
	                </p>
	                <p className="item-time">{this.props.time}</p>
	            </div>
			</div>
		)
	}
	handleClick(e){
		e.stopPropagation();
		var pid = e.target.dataset.positionid
		if(!pid){
			pid = e.target.parentNode.dataset.positionid
		}
		if(!pid){
			pid = e.target.parentNode.parentNode.dataset.positionid
		}	
		window.location.href = "https://m.lagou.com/jobs/" +pid+".html"
	}
}

export default Job

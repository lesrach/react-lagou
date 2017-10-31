import React,{Component} from 'react';

class ImgCode extends Component{
	constructor(){
		super();
		this.state={
			src:null
		}
		this.handleClick = this.handleClick.bind(this);
	}
	render(){
		return(
			<div className='imgcode'>
				<img src={this.state.src} alt=""/>
				<a onClick={this.handleClick}>看不清楚，<span style={{textDecoration:"underline"}}>换一张</span></a>
			</div>
		)
	}
	componentWillMount(){
		this.setState({
			src:"/img/1.jpg"
		})
	}
	handleClick(e){
		e.preventDefault();

	}
}

export default ImgCode

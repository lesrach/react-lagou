import React,{Component} from 'react';


class Input extends Component{
	constructor(){
		super();
		this.handleTrun = this.handleTrun.bind(this);
	}
	render(){
		return(
			<button name={this.props.name} className={this.props.name} onClick={this.handleTrun}>{this.props.text}</button>
		)
	}
	handleTrun(){
		console.log("denglv");
	}
}

export default Input

import React,{Component} from 'react';


class Input extends Component{
	constructor(){
		super();
	}
	render(){
		return(
			<button name={this.props.name} className={this.props.name}>{this.props.text}</button>
		)
	}
	
}

export default Input

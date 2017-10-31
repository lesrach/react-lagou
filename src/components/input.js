import React,{Component} from 'react';


class Input extends Component{
	constructor(){
		super();
		this.state={
			type:null,
			mess:"",
			eyeClass: "iconfont icon-ziyuan eye"
		}
		this.handleChange = this.handleChange.bind(this);
	}
	render(){
		var a = null;
		if(this.state.type === null){
			this.setState({
				type : this.props.type
			})
		}
		if(this.props.comp === 'eye'){
			a = <span className={this.state.eyeClass} onClick={this.handleChange}></span>
		} 
		return(
			<div style={{position:"relative"}}>
				<input type={this.state.type} name={this.props.name} className={this.props.className} placeholder={this.props.text} />
				<span className={this.props.comp?"eye-info":"input-info"}>{this.state.mess}</span>
				{a}
			</div>
		)
	}
	handleChange(){
		if(this.state.type === "password"){
			this.setState({
				type:"text",
				eyeClass: "iconfont icon-zhengyan eye"
			})
		} else {
			this.setState({
				type:"password",
				eyeClass: "iconfont icon-ziyuan eye"
			})
		}
	}
}

export default Input

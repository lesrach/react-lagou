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
		this.check = this.check.bind(this);
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
				<input ref='input' type={this.state.type} name={this.props.name} className={this.props.className} placeholder={this.props.text} />
				<span ref='mess' className={this.props.comp?"eye-info":"input-info"}>{this.state.mess}</span>
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
	check(){
		console.log("check");
		var val =this.refs.input.value,
			type = this.props.name,
			text;
		if(type == "phone"){
			var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
			if(reg.test(val)){
				text = ""
			} else if(!val){
				text = "请输入号码"
			} else {
				text = "请输入正确的手机号码"
			}
		}else if(type == "password"){
			var reg = /[\w]{6,16}/
			if(reg.test(val)){
				text = ""
			} else if(!val){
				text = "请输入密码"
			} else {
				text = "请输入6-16位密码"
			}
		}else{
			if(!val){
				text = "请输入内容"
			} else {
				text = ""
			}
		}
		this.refs.mess.innerHTML = text;
		if(text == ""){
			return 0
		} else {
			return 1
		}
	}
}

export default Input

import React,{Component} from 'react';
import axios from 'axios';

class ImgCode extends Component{
	constructor(){
		super();
		this.state={
			src:null,
			code:null,
			val:null,
			mess:""
		}
		this.handleClick = this.handleClick.bind(this);
		this.code = this.code.bind(this);
	}
	render(){
		return(
			<div className='code-comp'>
				<div style={{position:"relative"}}>
					<input type='text' name='code' className='code' placeholder='请证明你不是机器人' onInput={this.code}/>
					<span className="input-info">{this.state.mess}</span>
				</div>
				<div className='imgcode'>
					<img src={this.state.src} alt=""/>
					<a onClick={this.handleClick}>看不清楚，<span style={{textDecoration:"underline"}}>换一张</span></a>
				</div>
			</div>
		)
	}
	componentWillMount(){
		this.handleClick();
	}
	handleClick(e){
		var src,code,that=this;
		axios.get('http://route.showapi.com/26-4?showapi_appid=45024&showapi_sign=a2bede57b62649b2bc42a1c043b07dab&textproducer_char_string=123456789').then(function(data){
			data = data.data;
			if(data.showapi_res_code == 0){
				src = data.showapi_res_body.img_path;
				code = data.showapi_res_body.text;
			}
			that.setState({
				src:src,
				code:code
			})
		})
	}
	code(e){
		var code = e.target.value;
		this.setState({
			val:code
		})
		if(code === this.state.code){
			this.setState({
				mess:""
			})
			return 0
		} else {
			this.setState({
				mess:"请输入正确的验证码"
			})
			return 1
		}
	}
	check(){
		var code = this.state.val;
		if(code === this.state.code){
			return 0
		} else {
			this.setState({
				mess:"请输入正确的验证码"
			})
			return 1
		}
	}
}

export default ImgCode

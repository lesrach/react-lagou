import React,{Component} from 'react';
import {Link,IndexLink} from 'react-router';
import Header from '../components/header';
import Footer from '../components/footer';

class Register extends Component{
	constructor(){
		super();
		this.state = {
			hide:true
		}
		this.turn = this.turn.bind(this);
	}
	render (){
		return(
			<div>
				<Header title="我的收藏" comp='back'/>
				<div className="container-p">
					<div  className='plus'>
						<div className="bulb"></div>
						<p>开启拉勾PLUS（邀约功能）,将自己匿名展示给职位发布者,并可以收到来自企业的主动邀请;关闭此功能你将不会被任何企业发现,但可能会错过匹配的职位。</p>
						<div className="plusbtn">
							<span>已关闭</span>
							<div className="btn">
								<em className="circle" onClick={this.turn}></em>
								<i className="close iconfont icon-chuyidong1"></i>
							</div>
						</div>
					</div>
					<div className="explain">
						<div className="txt">
							<p>1.本功能暂时只对部分拉勾认证企业开放，</p>
							<p className="indent">不必担心被海量邀请骚扰。</p>
						</div>
						<div className="txt">
							<p>2.不想被某些企业搜到？</p>
							<p className="indent">你可以自由设置想屏蔽的企业。</p>
						</div>
						<div className="txt">
							<p>3.投递简历后，企业会根据你的完整简历</p>
							<p className="indent">来决定是否邀请你参加面试。</p>
						</div>
					</div>
					<div className='tips' style={this.state.hide?{display:'none'}:{display:'block'}}>
						你的在线简历还不够完善，暂不能开放，请到电脑端完善在线简历
					</div>
				</div>
				<Footer active='3'/>
			</div>
		)
	}
	componentWillMount(){
		// post
	}
	turn(){
		this.setState({
			hide:false
		})
		setTimeout(()=>{
			this.setState({
				hide:true
			})
		},2000)
	}
}

export default Register
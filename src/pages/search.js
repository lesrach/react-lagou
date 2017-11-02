import React,{Component} from 'react';
import Footer from '../components/footer';
import Header from '../components/header';
import Job from '../components/job';
import axios from 'axios';

class Search extends Component{
	 constructor(){
		super();
		this.state= {
			hide: true,
			hideres:true,
			city:"全国",
			job:null,
			result:[],
			length:15,
			citys:null
		}
		this.handleClick = this.handleClick.bind(this);
		this.handleClickres = this.handleClickres.bind(this);
		this.handleChange =this.handleChange.bind(this);
		this.remove = this.remove.bind(this);
		this.load = this.load.bind(this);
		this.search = this.search.bind(this);
		this.InputChange = this.InputChange.bind(this);
	}
	render (){
		console.log(this.state);
		var html,htmlct,restext,result,citys=this.state.citys;
	    var that = this;
		if(window.localStorage){
			var searchHistory = localStorage.getItem("searchH");
			if(searchHistory){
				html = JSON.parse(searchHistory).map(function(curr,index){
					return <div className='history-item' key={index} data-val={curr} onClick={that.search}>{curr}<a className='iconfont icon-chuyidong1 del' onClick={that.remove}></a></div>
				})
			}
		}
		if(citys){
			htmlct = citys.map(function(curr,index){
				var html = curr.cityList.map(function(curr,index){
						return (<div data-name={curr} key={index} className='item' onClick={that.handleChange}>{curr}</div>)
				})
				return (<div key={index}>
							<div className='head'>{curr.nameStr}</div>
							{html}
						</div>)
			})
		}
		if(this.state.result){
			result = this.state.result.slice(0,this.state.length).map(function(curr,index) {
				return (<Job positionId={curr.positionId} position={curr.positionName} time={curr.createTime} city={curr.city} companyId={curr.companyId} price={curr.salary} src={"//static.lagou.com/"+curr.companyLogo} key={curr.positionId} companyname={curr.companyName}/>)
			})
		}
		
		if(this.state.result.length !== 0){
			restext = (function(){
				return (
					<div>
						{result} 
						<a className='load' onClick={that.load}>加载更多</a>
					</div>
				)
			}())
		} else {
			restext = (function(){
				return (<div className='empty-info'>拉勾上暂时没有这样的职位</div>)
			}())
		}
		return(
			<div>
				<Header title="拉勾网"/>
				<div className="container">
					<div className='search'> 
						<a className='back' onClick={this.handleClick}><span className='iconfont icon-houtui' style={!this.state.hide?{display:'block'}:{display:'none'}}></span></a>
						<a className='country' onClick={this.handleClick}>{this.state.city}<span className='iconfont icon-xiala'></span></a>
						<input ref='search' type='text' placeholder='搜索职位或公司' onInput={this.InputChange}/>
						<a className='submit iconfont icon-sousu' onClick={this.handleClickres}></a>
					</div>
					<div className='content' style={this.state.hideres?{display:'block'}:{display:'none'}}>
						{html}
					</div>
					<div className='result' style={!this.state.hideres?{display:'block'}:{display:'none'}}>
						{restext}
						
					</div>
				</div>
				<div className='site' style={!this.state.hide?{display:'block'}:{display:'none'}}>
					{htmlct}
				</div>
				<Footer />
			</div>
		)
	}
	InputChange(e){
		var val = e.target.value;
		if(val === ""){
			this.setState({
				hideres: true
			})
		}
	}
	handleClickres(e){
		var val = e.target.previousSibling.value;
		var city = this.state.city;
		var Job;
		if( val !== ""){
			var arr = JSON.parse(localStorage.getItem('searchH'));
			if(arr && arr.length && arr.indexOf(val)<0){
				arr.unshift(val);
			} else {
				arr = [val];
			}
			localStorage.setItem('searchH',JSON.stringify(arr));
			if(city === "全国"){
				Job = this.state.job.filter(function(curr) {
					return (curr.positionName.indexOf(val) > -1);
				})
			} else{
				Job = this.state.job.filter(function(curr) {
					return (curr.city === city &&  curr.positionName.indexOf(val) > -1)
				})
			}
			this.setState({
				result: Job.slice(0,this.state.length),
				hideres: false
			})
		}
	}
	search(e){
		var val = e.target.dataset.val;
		var city = this.state.city;
		var Job;
		if(city === "全国"){
			Job = this.state.job.filter(function(curr) {
				return (curr.positionName.indexOf(val) > -1);
			})
		} else{
			Job = this.state.job.filter(function(curr) {
				return (curr.city === city &&  curr.positionName.indexOf(val) > -1)
			})
		}
		this.refs.search.value = val;
		this.setState({
			result: Job,
			hideres: false
		})
	}
	load(){
		this.setState((prestate)=>{
			prestate.length += 5;
		})
	}
	handleClick(){
		this.setState({
			hide: !this.state.hide
		})
	}
	handleChange(e){
		this.handleClick();
		var text = e.target.dataset.name;
		this.setState({
			city: text
		})
	}
	remove(e){
		e.target.parentNode.remove();
		var index = e.target.parentNode.dataset.index;
		var arr = JSON.parse(localStorage.getItem('searchH'));
		arr.splice(index,1);
		localStorage.setItem('searchH',JSON.stringify(arr));
	}
	componentWillMount(){
		var that = this;
		axios.post('/getcity').then(function(data){
			that.setState({
				citys: data.data
			})
		})
		axios.post('/getjob').then(function(data){
			that.setState({
				job: data.data
			})
		})
	}
}

export default Search
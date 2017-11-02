import React from 'react';
import ReactDOM from 'react-dom';
import {Router,Route,browserHistory,IndexLink} from 'react-router';

import './index.css';
import './pages/reset.css';
import './pages/iconfont.css';
import Post from './pages/post';
import Search from './pages/search';
import User from './pages/user';
import Login from './pages/login';
import Register from './pages/register';
import Edit from './pages/edit';
import Setmsg from './pages/setmsg';
import Deliverlist from './pages/deliverlist';
import Interviewlist from './pages/interviewlist';
import Invitation from './pages/invitation';
import Collectlist from './pages/collectlist';
import Jobs from './pages/jobs';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router history={browserHistory}>
		<IndexLink path="/" component={Post} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
		<Route path="/edit" component={Edit} />
		<Route path="/setmsg(/:page)" component={Setmsg} />
		<Route path="/jobs(/:page)" component={Jobs} />
		<Route path="/deliverlist(/:page)" component={Deliverlist} />
		<Route path="/interviewlist(/:page)" component={Interviewlist} />
		<Route path="/invitation" component={Invitation} />
		<Route path="/collectlist" component={Collectlist} />
		<Route path="/search" component={Search} />
		<Route path="/user(/:page)" component={User} />
	</Router>
	, document.getElementById('root'));
registerServiceWorker();

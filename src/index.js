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
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
	<Router history={browserHistory}>
		<IndexLink path="/" component={Post} />
		<Route path="/search" component={Search} />
		<Route path="/user" component={User} />
		<Route path="/login" component={Login} />
		<Route path="/register" component={Register} />
	</Router>
	, document.getElementById('root'));
registerServiceWorker();

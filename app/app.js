/**
 * Created by Blazers on 2016/1/26.
 */
import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Redirect, IndexRoute, browserHistory} from 'react-router';

// 所有人都可以看到的页面
import App from './components/App';
import ArticleList from './components/ArticleList';
import Article from './components/Article';


// 管理页面
import AppAdmin from './components/AppAdmin';
import Login from './components/Login';
import Editor from './components/Editor';


// 无法匹配路由的页面
import NotFound from './components/NotFound';





render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={ArticleList}/>
            <Route path="posts" component={ArticleList}>
                <Route path=":tag" component={ArticleList}/>
            </Route>
            <Route path="post/:id" component={Article}/>
            <Redirect from="post" to="posts" />
        </Route>
        <Route path="/admin" component={AppAdmin}>
            <IndexRoute component={Login}/>
            <Route onEnter={checkAuth} path="editor" component={Editor}/>
            <Redirect from="*" to="/"/>
        </Route>
        <Route path="*" component={NotFound}/>
    </Router>,
    document.body
);


function checkAuth(nextState, replace, cb) {
    console.log(nextState);
    if (nextState && nextState.location.query.a === 'a') {
        replace('/');
    }
    cb();
}


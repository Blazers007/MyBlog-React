/**
 * Created by Blazers on 2016/1/29.
 */
import React from 'react';
import {Route, IndexRoute} from 'react-router';

// 所有人都可以看到的页面
import App from './components/App';
import ArticleList from './components/ArticleList';
import Article from './components/Article';
// 管理页面

// 无法匹配路由的页面
import NotFound from './components/NotFound';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={ArticleList}/>
        <Route path="posts" component={ArticleList}>
            <Route path="posts/:tag" component={ArticleList}/>
        </Route>
        <Route path="post/:id" component={Article}/>
        <Route path="a-b" component={ArticleList}/>
        <Route path="*" component={NotFound}/>
    </Route>
)
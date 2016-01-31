/**
 * Created by Blazers on 2016/1/26.
 *
 * ES6 版本 Express服务器
 *
 */
import express from 'express';
import path from 'path';
//// React-Router
//import React from 'react';
//import {renderToString} from 'react-dom/server';
//import {match, RouterContext} from 'react-router';
//import routes from './app/routes';
// DB
import mongoose from 'mongoose';
// 接口
import router from './routes/posts';



// 初始化
mongoose.connect('mongodb://localhost:27017/test');
const db = mongoose.connection;
db.on('error', () => console.log('Database Connect Error') );
db.on('open', () => console.log('数据库已经连接'));

export {db};

// 初始化中间件
const app = express();
app.set('views', './views');            // 设置模板文件目录 以及模板引擎
app.set('view engine', 'jade');

app.use(express.static(__dirname + '/public'));      // 映射静态资源目录 先去public目录下查找



/**
 * 自定义中间件
 * */
app.use((req, res, next) => {
    console.log(req.url);
    console.log('Time:', new Date());
    next();
});

/**
 * Restful接口中间件
 * */
app.use(router);

/**
 * React-Router
 * */
app.get('*', (req, res, next) => {
    res.status(200).render('index', {title: 'Blog'});
    //console.log(req.url);
    //match({routes, location: req.url}, (error, redirectLocation, renderProps) => {
    //    if (error) {
    //        res.status(500).send(error.message);
    //    } else if (redirectLocation) {
    //        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    //    } else if (renderProps) {
    //        let html = renderToString(<RouterContext {...renderProps}/>);
    //        res.status(200).render('index', {title: 'Blog', html: html});
    //    } else {
    //        next();
    //    }
    //})
});

/**
 * 错误处理中间件
 * */
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Inner Error!');
});

/**
 * 开启服务
 * */
const server = app.listen(3000, () => {
    let address = server.address().address;
    let port = server.address().port;
    console.log('Server listening at http://%s:%s', address.length < 4 ? 'localhost' : address, port);
});

export default server;
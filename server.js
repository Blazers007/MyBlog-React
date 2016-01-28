/**
 * Created by Blazers on 2016/1/26.
 *
 * ES6 版本 Express服务器
 *
 */
import express from 'express'
// DB
import mongoose from 'mongoose';
mongoose.connect('mongodb://localhost:27017/test');
const db = mongoose.connection;
db.on('error', () => console.log('Database Connect Error') );
db.on('open', () => console.log('数据库已经连接'));

export {db};

// 初始化中间件
const app = express();
app.set('views', './views');            // 设置模板文件目录 以及模板引擎
app.set('view engine', 'jade');
app.use(express.static('public'));      // 映射静态资源目录 先去public目录下查找



/**
 * 自定义中间件
 * */
app.use((req, res, next) => {
    console.log('Time:', new Date());
    next();
});

import router from './routes/posts';

app.use(router);

/**
 * 路由 - GET /
 * */
app.get('/', (req, res, next) => {
    res.render('index', {title: 'home'});
});

//app.get('/publish', (req, res, next) => {
//    res.ender('publish', {title: 'Publish'})
//});


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
/**
 * Created by Blazers on 2016/1/26.
 *
 * ES6 版本 Express服务器
 *
 */
import express from 'express'

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

/**
 * 路由 - GET /
 * */
app.get('/', (req, res, next) => {
    let articles = [1,2,3,4,5].map((item, index) => {
        return {
            title: "文章标题-" + (index+1),
            content: "文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容"
        }
    });
    res.render('index',{title: 'home', articles: articles});
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
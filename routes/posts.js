/**
 * Created by Blazers on 2016/1/27.
 *
 * 文章接口
 */
import express from 'express';
import mongoose from 'mongoose';
import _ from 'underscore';
import fs from 'fs';
import multer from 'multer';
import {DOMParser} from 'xmldom';
import {db} from '../server';


const router = express.Router();
const SIZE_10_M = 10000000;
/**
 * 文件上传的路径
 * */
const upload = multer({
    dest: __dirname + '/../uploads',
    limits: {
        fieldSize: SIZE_10_M
    },
    fileFilter: (req, file, cb) => {
        console.log(file);
        // 仅仅接收 图片类型的
        try{
            cb(null, _.contains(['jpg', 'png', 'bmp', 'gif'], file.originalname.split('.')[1]))
        } catch (e) {
            cb(e);
        }
    }
    //onFileSizeLimit: file => {
    //    if (file.size > SIZE_10_M) {
    //        fs.unlink('./' + file.path);
    //    }
    //}
});


/**
 * Post文章集合的Schema
 * */
const PostSchema = new mongoose.Schema({
    title: String,
    slug: String,
    markdown: String,
    html: String,
    created_at: Date,
    updated_at: Date
});
const PostModel = mongoose.model('Post', PostSchema);


/**
 * GET /api/posts_thumbnail
 *  - 获取文章列表 包含至多一张图片  至多300字符
 *  - 默认返回第一页的内容
 *  - page=? tag=? order=?
 * */
router.get('/api/posts_thumbnail', (req, res, next) => {
    // 取出查询参数  参数由前端脚本拼接
    let query = req.query;
    PostModel.find()
        .lean()  // Mongoose禁止添加属性 必须调用该方法 http://stackoverflow.com/questions/29963412/add-a-dynamic-property-to-a-mongoose-result-with-each
        .exec()
        .then(data => {
            let thumbs = data.map(item => {
                item.thumbnail = getFirstSrc(item.html);
                item.thumbContent = getPureTest(item.html);
                return item;
            });
            res.end(JSON.stringify(thumbs));
        });
});

router.get('/api/posts_thumbnail/:tag', (req, res, next) => {
    let tag = req.params.tag;
    console.log('------------------',tag);
    PostModel.find()
        .lean()  // Mongoose禁止添加属性 必须调用该方法 http://stackoverflow.com/questions/29963412/add-a-dynamic-property-to-a-mongoose-result-with-each
        .exec()
        .then(data => {
            let thumbs = data.map(item => {
                item.thumbnail = getFirstSrc(item.html);
                item.thumbContent = getPureTest(item.html);
                return item;
            });
            res.end(JSON.stringify(thumbs));
        });
});

router.get('/api/posts', (req, res, next) => {
    PostModel.find({}, (err, data) => {
        res.end(JSON.stringify(data));
    })
});

router.get('/api/posts/:tag', (req, res, next) => {
    let tag = req.params.tag;
    console.log('------------------',tag);
    PostModel.find()
        .lean()  // Mongoose禁止添加属性 必须调用该方法 http://stackoverflow.com/questions/29963412/add-a-dynamic-property-to-a-mongoose-result-with-each
        .exec()
        .then(data => {
            res.end(JSON.stringify(data));
        });
});


router.get('/api/post/:id', (req, res, next) => {
    console.log(req.params.id);
    PostModel.findOne({'_id': req.params.id})
        .lean()
        .exec()
        .then(post => {
            res.end(JSON.stringify(post))
        }, error => {
            res.end('error');
        });
});

function getPureTest(html) {
    if (!html)
        return "";
    try {
        var dd=html.replace(/<\/?.+?>/g,"");
        var dds=dd.replace(/&nbsp;/g,"");//dds为得到后的内容
        return dds.substring(0 , dds.length > 300 ? 300 : dds.length) + "...";
    } catch (e) {
        return html.substring(0, html.length > 300 ? 300 : html.length) + "...";
    }
}

// 查找有无src 过滤内容 保存
function getFirstSrc(str) {
    if (!str)
        return;
    try {
        let doc = new DOMParser().parseFromString(str);
        let img = doc.getElementsByTagName('img')[0];
        let src = img.getAttribute('src');
        return src;
    }catch (e){
        return null;
    }
}



router.post('/api/image', upload.single('image'), (req, res, next) => {
    console.log('File upload');
    res.end('success');
});

export default router;

export default router;
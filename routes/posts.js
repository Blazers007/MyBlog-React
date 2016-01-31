/**
 * Created by Blazers on 2016/1/27.
 *
 * 文章接口
 */
import express from 'express';
import mongoose from 'mongoose';
import {DOMParser} from 'xmldom';
import {db} from '../server';

const router = express.Router();

const PostSchema = new mongoose.Schema({
    title: String,
    slug: String,
    markdown: String,
    html: String,
    created_at: Date,
    updated_at: Date
});

const PostModel = mongoose.model('Post', PostSchema);

router.get('/api/posts_thumbnail', (req, res, next) => {
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

export default router;
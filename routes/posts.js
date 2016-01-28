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
    PostModel.find().exec()
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
        //console.log(data);
        res.end(JSON.stringify(data))
    })
});

router.get('api/posts/:postid', (req, res, next) => {

});

function getPureTest(html) {
    try {
        var dd=html.replace(/<\/?.+?>/g,"");
        var dds=dd.replace(/&nbsp;/g,"");//dds为得到后的内容
        return dds.substring(0 ,100);
    } catch (e) {
        return 'asdasdas';
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
        console.log(src);
        return src;
    }catch (e){
        return null;
    }
}

export default router;
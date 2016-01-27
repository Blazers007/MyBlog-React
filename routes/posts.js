/**
 * Created by Blazers on 2016/1/27.
 *
 * 文章接口
 */
import express from 'express';
import mongoose from 'mongoose';
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


router.get('/api/posts', (req, res, next) => {
    PostModel.find({}, (err, data) => {
        //console.log(data);
        res.end(JSON.stringify(data))
    })
});

export default router;
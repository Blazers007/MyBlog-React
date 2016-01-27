'use strict';
var fs = require('fs');
var parseString = require('xml2js').parseString;

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test');

var db = mongoose.connection;

var Schema = mongoose.Schema;

var postSchema = new Schema({
    title: String,
    slug: String,
    markdown: String,
    html: String,
    created_at: Date,
    updated_at: Date
});

var Post = mongoose.model('Post', postSchema);

db.on('open', function() {
    console.log('数据库已经连接');
    //var string = fs.readFileSync('posts.xml', 'utf-8');
    //parseString(string, function(err, result) {
    //    result.pma_xml_export.database[0].table.forEach((item, index) => {
    //        // 每一篇文章
    //        let post = {};
    //        item.column.forEach((itm, idx) => {post[itm.$.name] = itm._});
    //        // 插入一片文章
    //        var p = new Post(post);
    //        p.save(function(err) {
    //            if (err) console.error(err);
    //            console.log('Done');
    //        })
    //    });
    //});
    Post.count({}, function(err, count) {
        console.log(count);
    })
});

db.on('error', function() {
    console.log('Error!');
});


console.log('--');


//var string = fs.readFileSync('posts.xml', 'utf-8');
//
//parseString(string, function(err, result) {
//    let posts = result.pma_xml_export.database[0].table.map((item, index) => {
//        // 每一篇文章
//        let post = {};
//        item.column.forEach((itm, idx) => {post[itm.$.name] = itm._});
//    });
//    // 插入数据库
//});



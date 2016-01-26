/**
 * Created by Blazers on 2016/1/26.
 */
import React from 'react';

export default class ArticleList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list: [1,2,3,4,5,6,7,8,9,10]
        }
    }

    getArticles() {
        // 根据情况获取列表
    }

    render() {
        let list = this.state.list.map((item, index) => {
            return (
                <div className="card card-block">
                    <h4 className="card-title">文章标题</h4>
                    <p className="card-text">文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容文章内容</p>
                    <a href="#" className="card-link">Like</a>
                    <a href="#" className="card-link">Favorite</a>
                </div>
            )
        });
        return(
            <div className="container">
                {list}
            </div>
        )
    }
}
/**
 * Created by Blazers on 2016/1/26.
 */
import React from 'react';
import ArticleCard from './ArticleCard';

export default class ArticleList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        $.get('/api/posts')
            .done(data => {
                let post = JSON.parse(data);
                this.setState({
                    list: post
                })
            })
            .fail(() => {

            })
            .always(() => {});
    }

    getArticles() {
        // 根据情况获取列表
    }

    render() {
        let list = this.state.list.map((post, index) => {
            return (
                <ArticleCard post={post} key={'article-'+index}/>
            )
        });
        return(
            <div className="container m-t-3">
                {list}
            </div>
        )
    }
}
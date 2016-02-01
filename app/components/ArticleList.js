/**
 * Created by Blazers on 2016/1/26.
 */
import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import ArticleCard from './ArticleCard';

export default class ArticleList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list: []
        }
    }

    componentDidMount() {
        // 如果有标志Tag 则按照tag搜索
        let tag = this.props.params.tag;
        let query = '';
        if (tag) {
            query = '/' + tag;
        }
        $.get('/api/posts_thumbnail' + query )
            .done(data => {
                let post = JSON.parse(data);
                this.setState({
                    list: post
                });
                //let step = setInterval(()=>{
                //    if (post.length) {
                //        let tmp = this.state.list;
                //        tmp.push(post.pop());
                //        this.setState({
                //            list: tmp
                //        })
                //    } else {
                //        clearInterval(step);
                //    }
                //}, 150);
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
/**
 * Created by Blazers on 2016/1/26.
 */
import React from 'react';

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
                <div className="card card-block">
                    <h4 className="card-title">{post.title}</h4>
                    <p className="card-text">
                        <div dangerouslySetInnerHTML={{__html: post.html}}/>
                    </p>
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
/**
 * Created by Blazers on 2016/1/28.
 */
import React from 'react';

export default class ArticleCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let post = this.props.post;
        return (
            <div className="post">
                <h4 className="title">{post.title}</h4>
                <p className="content">{post.content}</p>
                <div className="info">
                    <p className="create-time">{post.created_at}</p>
                    <div className="extra">
                        <p className="reading-times">阅读 15</p>
                        <a className="share" href="#">分享</a>
                    </div>
                </div>
            </div>
        )
    }
}
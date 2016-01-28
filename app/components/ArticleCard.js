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
        if (post.thumbnail)
            alert(post.thumbnail)
        let thumbnail = this.props.post.thumbnail === null ? null : <img className="thumbnail" src={this.props.post.thumbnail} alt=""/>
        return (
            <div className="post">
                <div className="upper">
                    <h5 className="title">{post.title}</h5>
                    <ul className="tag-list">
                        <li><div className="mask"></div><span>Android</span></li>
                    </ul>
                </div>
                <div>
                    {thumbnail}
                </div>
                <p className="content">{post.thumbContent}</p>
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
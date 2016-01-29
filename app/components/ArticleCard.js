/**
 * Created by Blazers on 2016/1/28.
 */
import React from 'react';
import {Link} from 'react-router'

export default class ArticleCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        let post = this.props.post;
        let thumbnail = this.props.post.thumbnail === null ? null : <img className="thumbnail" src={this.props.post.thumbnail} alt=""/>;
        return (
            <div className="article-card">
                <div className="upper">
                    <h5 className="title"><Link to={"/post/" + post._id}>{post.title}</Link></h5>
                    <ul className="tag-list">
                        <li><span>Android</span></li>
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
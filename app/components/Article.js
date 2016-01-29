/**
 * Created by Blazers on 2016/1/29.
 */
import React from 'react';

export default class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            post: null
        }
    }

    componentDidMount() {
        let postId = this.props.params.id || '56a86d2b2a1c1ef419d58550';
        $.get('/api/posts/' + postId)
            .done(post => {
                this.setState({
                    post: JSON.parse(post)
                });
                // Init
                $('code').each(function(i, block) {
                    $(block).wrap('<pre></pre>');
                    hljs.highlightBlock(block);
                });
            })
            .error(error => toastr.error(error))
    }

    render() {
        let post = this.state.post;
        if (post) {
            return (
                <div className="article">
                    <h1>{post.title}</h1>
                    <div className="translate" dangerouslySetInnerHTML={{__html: post.html}}></div>
                    <code>
                        private static final int id = 0;
                        function(){

                    }
                    </code>
                </div>
            )
        }
        return (
            <div>
                Loading
            </div>
        )
    }
}
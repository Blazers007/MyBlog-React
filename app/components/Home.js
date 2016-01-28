/**
 * Created by Blazers on 2016/1/28.
 */
import React from 'react';

import Navbar from './Navbar';
import AsideBoard from './AsideBoard'
import ArticleList from './ArticleList';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            navbarFixed: false
        }
    }

    componentDidMount() {
        // 监听
        let $body = $(document.body);
        let $nav = $('nav');
        $(window).scroll(()=>{
            // 改变navbar显示方式
            let scrollTop = $body.scrollTop();
            this.setState({
                navbarFixed: scrollTop > ($nav.height() + 148)
            });
        });
    }

    render() {
        return (
            <div>
                <AsideBoard fixed={this.state.navbarFixed}/>
                <article>
                    <Navbar fixed={this.state.navbarFixed}/>
                    <div className="container">
                        <ArticleList fixed={this.state.navbarFixed}/>
                    </div>
                </article>
            </div>
        )
    }
}
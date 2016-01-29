/**
 * Created by Blazers on 2016/1/28.
 */
import React from 'react';

import Navbar from './Navbar';
import AsideBoard from './AsideBoard'

export default class App extends React.Component {
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
                        {this.props.children}
                    </div>
                </article>
            </div>
        )
    }
}
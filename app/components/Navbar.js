/**
 * Created by Blazers on 2016/1/26.
 */
import React from 'react';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //setTimeout(()=>{
        //    //alert(1);
        //    $('nav').removeClass('navbar-inline').addClass('navbar-fixed');
        //    console.log($('nav'));
        //    //alert(2);
        //}, 3000)
    }

    render() {
        return (
            <nav className={this.props.fixed ? 'navbar-fixed' : 'navbar-inline'}>
                <ul>
                    <li>首页</li>
                </ul>
            </nav>
        )
    }
}
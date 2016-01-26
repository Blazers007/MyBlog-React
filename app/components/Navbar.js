/**
 * Created by Blazers on 2016/1/26.
 */
import React from 'react';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <a href="" className="navbar-brand">Blog</a>
                    <ul className="nav navbar-nav">
                        <li className="nav-item active">
                            <a href="#" className="nav-link">Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Category</a>
                        </li>
                        <li className="nav-item">
                            <a href="#" className="nav-link">Articles</a>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}
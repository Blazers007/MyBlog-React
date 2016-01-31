/**
 * Created by Blazers on 16/1/31.
 */
import React from 'react';

export default class AppAdmin extends React.Component {
    render() {
        return (
            <div>
                <nav>Admin Nav</nav>
                {this.props.children}
            </div>
        )
    }
}
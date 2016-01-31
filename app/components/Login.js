/**
 * Created by Blazers on 2016/1/29.
 */
import React from 'react';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="card">
                    <input type="text" className="input-group-lg"/>
                </div>
            </div>
        )
    }
}
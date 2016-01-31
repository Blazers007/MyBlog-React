/**
 * Created by Blazers on 16/1/31.
 */
import React from 'react';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                    </div>
                    <div className="col-lg-6">

                    </div>
                </div>
            </div>
        )
    }
}
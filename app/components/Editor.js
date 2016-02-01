/**
 * Created by Blazers on 16/1/31.
 */
import React from 'react';

export default class Editor extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        $('#dragArea').on('dragstart', event => {
            console.log(event);
        });

        $('#uploadFileArea').on('drop', event => {
            console.log(event);
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <textarea name="" id="" cols="30" rows="10"></textarea>
                        <div id="dragArea" className="drag-area" draggable="true">
                            <h1>Drag</h1>
                        </div>
                        <br/>
                        <div id="uploadFileArea" className="drag-area">
                            <h1>Drop</h1>
                        </div>
                    </div>
                    <div className="col-lg-6">

                    </div>
                </div>
            </div>
        )
    }
}
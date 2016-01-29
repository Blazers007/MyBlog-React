/**
 * Created by Blazers on 2016/1/27.
 */
import React from 'react';
import {Link} from 'react-router';
//import Radium from 'radium';
//import StyleSheet from 'react-style';

//@Radium
export default class AsideBoard extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // Canvas动画

        // 加载分类列表  ===> taglist
        //let canvas = document.getElementById('aside-canvas');
        //let width = canvas.offsetWidth; // 获取Canvas宽度
        //let height = canvas.offsetHeight;
        //let ctx = canvas.getContext('2d');
        ////ctx.globalCompositeOperation = 'source-atop';
        //ctx.fillStyle = '#147df2';
        //ctx.strokeStyle = '#147df2';
        //ctx.moveTo(0, 0);
        //let inn = 1;
        //
        //for (let i = 0 ; i < width ; i+=1) {
        //    let y = 16*Math.sin(0.025*(i + inn)) + 100;
        //    ctx.lineTo(i, y+0.5);
        //}
        //ctx.lineTo(383, 0);
        //ctx.fill();

        //
        //setInterval(()=>{
        //    // 擦除
        //    inn ++;
        //    ctx.clearRect(0, 0, width, height);
        //    ctx.moveTo(0, 0);
        //
        //    for (let i = 0 ; i < width ; i++) {
        //        let y = 16*Math.sin(0.025*(i + inn)) + 100;
        //        ctx.lineTo(i, y);
        //    }
        //    ctx.lineTo(383, 0);
        //
        //<canvas id="aside-canvas" className="canvas"></canvas>
        //    ctx.fill();
        //}, 16);
    }

    render() {
        return(
            <aside>
                <div id="info-board">
                    <img src="https://avatars0.githubusercontent.com/u/5445639?v=3&s=460" alt=""/>
                    <h3>Blazers</h3>
                </div>
                <ul id="tag-list">
                    <li><Link to="/posts/Android" activeClassName="active">Android</Link></li>
                    <li>NodeJS</li>
                    <li>Gulp</li>
                    <li>IOS</li>
                    <li>React</li>
                    <li>React-Native</li>
                </ul>
                <div id="link-list">
                    <div className="icon link github"></div>
                    <div className="icon link github"></div>
                    <div className="icon link github"></div>
                    <div className="icon link github"></div>
                </div>
            </aside>
        )
    }
}

//const styles = StyleSheet.create({
//    container: {
//        display: 'flex',
//        flexDirection: 'column',
//        backgroundColor: '#ff0000',
//        justifyContent: 'space-between'
//    }
//});
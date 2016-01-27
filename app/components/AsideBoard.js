/**
 * Created by Blazers on 2016/1/27.
 */
import React from 'react';
//import Radium from 'radium';
//import StyleSheet from 'react-style';

//@Radium
export default class AsideBoard extends React.Component {

    componentDidMount() {
        // 加载分类列表
    }

    render() {
        return(
            <div styles={[styles.container]}>
                <div>123</div>
                <div>456</div>
                <div>789</div>
            </div>
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
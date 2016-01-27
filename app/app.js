/**
 * Created by Blazers on 2016/1/26.
 */
import React from 'react';
import ReactDOM from 'react-dom';

//
import Navbar from './components/Navbar';
import AsideBoard from './components/AsideBoard'
import ArticleList from './components/ArticleList';

class App extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <div className="col-lg-4">
                    <AsideBoard/>
                </div>
                <div className="col-lg-8">
                    <Navbar/>
                    <ArticleList/>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));


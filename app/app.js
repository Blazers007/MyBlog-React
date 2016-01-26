/**
 * Created by Blazers on 2016/1/26.
 */
import React from 'react';
import ReactDOM from 'react-dom';

//
import Navbar from './components/Navbar';
import ArticleList from './components/ArticleList';

class App extends React.Component {

    render() {
        return (
            <div>
                <Navbar/>
                <ArticleList/>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));


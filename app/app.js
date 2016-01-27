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
            <div>
                <AsideBoard/>
                <article>
                    <Navbar/>
                    <div className="container">
                        <ArticleList/>
                    </div>
                </article>
            </div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'));


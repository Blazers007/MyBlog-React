/**
 * Created by Blazers on 2016/1/26.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, Link} from 'react-router';

//
import Home from './components/Home';

class App extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <Router>
                <Route path="/" component={Home}/>
            </Router>
        )
    }
}

ReactDOM.render(<App/>, document.body);


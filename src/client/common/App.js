import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Page from '../containers/Page';

const Shell = () => (
    <div className="wrapper">
        <div className="main-panel">
            <div className="content">
                <div className="container-fluid">
                    <Page />
                </div>
            </div>
        </div>
    </div>
);

const About = () => (
    <div className="wrapper">
        <div className="main-panel">
            <div className="content">
                <div className="container-fluid">
                    This is about page
                </div>
            </div>
        </div>
    </div>
);

class App extends Component {
    constructor() {
        super();
    }

    render() {
        return (
            <BrowserRouter>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <Link to="/" >Main</Link>
                            </li>
                            <li>
                                <Link to="/about" >About</Link>
                            </li>
                        </ul>
                    </nav>
                    <Route path="/" exact component={Shell}/>
                    <Route path="/about" component={About} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;

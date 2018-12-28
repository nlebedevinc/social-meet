import React, { Component } from 'react';
import { Route, Link, BrowserRouter } from 'react-router-dom';
import Page from '../containers/Page';
import './App.css';

const Header = () => (
    <nav className="header">
        <ul>
            <li>
                <Link to="/" >Главная</Link>
            </li>
            <li>
                <Link to="/about" >О приложении</Link>
            </li>
        </ul>
    </nav>
);

const Shell = () => (
    <div className="wrapper">
        <div className="main-panel">
            <div className="content">
                <Page />
            </div>
        </div>
    </div>
);

const About = () => (
    <div className="wrapper">
        <div className="main-panel">
            <div className="content">
                <div className="container-fluid">
                    Страница пока в разработке
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
                    <Route path="/" exact component={Shell}/>
                    <Route path="/about" component={About} />
                </div>
            </BrowserRouter>
        )
    }
}

export default App;

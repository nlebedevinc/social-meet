import React, { Component } from 'react';
import MapboxWrapper from '../components/MapboxWrapper';
import List from '../components/List';
import { getEvents, storeEvent } from '../api/events';

class Page extends Component {
    state = {
        events: [],
        loading: false,
    }

    constructor() {
        super();

        this.store = this.store.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        getEvents().then(data => {
            this.setState({ events: data, loading: false });
        });
    }

    store(event) {
        this.setState({ loading: true });
        storeEvent(event)
            .then(result => {
                console.log(result);
                this.setState({ events: result, loading: false });
            });
    }

    render() {
        const { events, loading } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <MapboxWrapper loading={loading} events={events} save={this.store}/>
                </div>
                <div className="container-fluid">
                    <List loading={loading} events={events}/>
                </div>
            </div>
        );
    }
}

export default Page;

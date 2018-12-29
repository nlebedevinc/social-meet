import React, { Component } from 'react';
import MapboxWrapper from '../components/MapboxWrapper';
import List from '../components/List';
import { getEvents, storeEvent } from '../api/events';
import Modal from 'react-awesome-modal';

class Page extends Component {
    state = {
        events: [],
        loading: false,
        coord: null,
        name: '',
    }

    constructor() {
        super();

        this.store = this.store.bind(this);
        this.onMarker = this.onMarker.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        this.setState({ loading: true });
        getEvents().then(data => {
            this.setState({ events: data, loading: false });
        });
    }

    store() {
        const event = {
            name: this.state.name,
            coordinates: this.state.coord,
        }
        this.setState({ loading: true });
        storeEvent(event)
            .then(result => {
                console.log(result);
                this.setState({ events: result, loading: false, name: '', coord: null });
            });
    }

    onMarker(coor) {
        this.setState({ coord: coor });
    }

    closeModal() {
        this.setState({ coord: null });
    }

    handleNameChange(e) {
        const value = e.target.value;
        this.setState({ name: value });
    }

    render() {
        const { events, loading } = this.state;
        return (
            <div>
                <div className="container-fluid">
                    <MapboxWrapper loading={loading} events={events} save={this.onMarker}/>
                </div>
                <div className="container-fluid">
                    <List loading={loading} events={events}/>
                </div>
                <Modal visible={this.state.coord} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div className="modal-content">
                        <h2>Введите название события</h2>
                        <input type="text" className="modal-input" onChange={this.handleNameChange} />
                        <a href="javascript:void(0);" onClick={() => this.store()}>Сохранить</a>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default Page;

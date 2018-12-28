import React, { Component } from 'react';

class List extends Component {
    render() {
        const { events, loading } = this.props;

        if (loading) {
            return <div class="sk-spinner sk-spinner-pulse"></div>;
        }

        return (
            <div>
                <ul className="list-wrapper">
                    {events.map((evt => {
                        return (
                            <li>{evt.name}</li>
                        );
                    }))}
                </ul>
            </div>
        );
    }
}

export default List;
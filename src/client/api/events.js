import axios from 'axios';

const host = 'http://127.0.0.1:3000/v1';

export function getEvents() {
    return axios({
        method: 'get',
        headers: {},
        url: `${host}/events/list`
    })
    .then(result => {
        return result.data;
    });
}

export function storeEvent(event) {
    return axios({
        method: 'post',
        headers: {},
        url: `${host}/events/save`,
        data: event
    })
    .then(result => {
        return result.data;
    });
}

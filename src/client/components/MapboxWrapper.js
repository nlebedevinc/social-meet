import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import ReactMapboxGl, {
    Layer,
    Feature,
    Popup,
    GeoJSONLayer,
    ScaleControl,
    ZoomControl,
    Marker,
} from 'react-mapbox-gl';
import moment from 'moment';

const formatDate = ts => moment(ts).format('L : LTS');

const icon = stateClass => {
    return (
        <i
            style={{ color: stateClass.color }}
            className={stateClass.icon}
            aria-hidden="true"
        />
    );
};

const elementToGeoArray = elem =>
    elem ? [elem.geo.latitude, elem.geo.longitude] : null;

const containerStyle = {
    height: `calc(100vh - 200px)`,
    width: '100%'
};

const defaultCenter = [27.5586, 53.8787];

const accessToken = 'pk.eyJ1IjoiZG9zYW50IiwiYSI6ImNpemg4N2p1NDAxN2QzMmxidXMwbHlnZmUifQ.CVy7UYXLfttRnruZ1R7GbA';
const style = 'mapbox://styles/mapbox/light-v9';

const Map = ReactMapboxGl({
    accessToken,
    center: defaultCenter,
    scrollZoom: false,
});

class MapboxWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            popup: null,
            center: elementToGeoArray(props.initialElement) || defaultCenter,
            zoom: [5],
            element: props.initialElement || null
        };

        this.onDrag = this.onDrag.bind(this);
        this.handleMapClick = this.handleMapClick.bind(this);
    }

    onDrag() {
        if (this.state.element) {
            this.setState({
                element: null
            });
        }
    }

    handleElementClick(element, { feature }) {
        this.setState({
            center: feature.geometry.coordinates,
            zoom: [5],
            element
        });
    }

    handleMapClick(element, param) {
        const { lat, lng } = param.lngLat;
        const coordinates = [lng, lat];

        this.props.save(coordinates);
    }

    render() {
        const { events, loading } = this.props;

        if (loading) {
            return <div class="sk-spinner sk-spinner-pulse"></div>;
        }

        return (
            <Map 
                style="mapbox://styles/mapbox/streets-v9"
                containerStyle={{
                    height: "100vh",
                    width: "100%"
                }}
                center={defaultCenter}
                zoom={[10]}
                onClick={this.handleMapClick}
            >   
                {events.map(ev => {
                    return (
                        <Marker
                            coordinates={ev.coordinates}
                            anchor="center">
                            <img src={'https://lh3.googleusercontent.com/vGrfyKvzFQzMDMIgENwgPi85Nft6sEzGwmce6xhYukZ_gsaa_Il_mSlxQ70gn1VsvMU=s180'} />
                        </Marker>
                    )
                })}
            </Map>
        );
    }

    renderPopup(element) {
        return (
            <div>
                <h5>Узел: {element.name}</h5>
                <h6 style={{ marginBottom: '4px' }}>Последние показания:</h6>
                <ol>
                    {element.lastData.map((data, index) => {
                        return (
                            <li key={index}>
                                <span>
                                    {icon(data.stateClass)} {data.state} : {formatDate(data.date)}
                                </span>
                            </li>
                        );
                    })}
                </ol>
                <Link to={{ pathname: '/browse', query: { element: element._id } }}>
                    Подробнее...
        </Link>
            </div>
        );
    }

    getLayersForElement(element) {
        const getRadius = state => {
            return Math.ceil(5 + state * 10);
        };
        return [
            (
                <Layer
                    type="circle"
                    key={`element-circle-${element._id}`}
                    id={`element-circle-${element._id}`}
                    paint={{
                        'circle-radius': getRadius(element.lastState),
                        'circle-color': element.lastStateClass.color
                    }}
                >
                    <Feature
                        onClick={this.handleElementClick.bind(this, element)}
                        coordinates={elementToGeoArray(element)}
                    />
                </Layer>
            ),
            (
                <Layer
                    type="symbol"
                    key={`element-name-${element._id}`}
                    id={`element-name-${element._id}`}
                    layout={{
                        'text-field': element.name,
                        'text-offset': [1, 0.5],
                        'text-anchor': 'top'
                    }}
                    paint={{
                        'text-color': '#333'
                    }}
                >
                    <Feature coordinates={elementToGeoArray(element)} />
                </Layer>
            )
        ];
    }
}

export default MapboxWrapper;


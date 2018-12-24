import createLowService from './low';
import { AppServices } from '../interfaces';

const createServices = () => <AppServices>{
    low: createLowService()
};

export default createServices;

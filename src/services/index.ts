import createLowService from './lowdb';

const createServices = () => ({
  low: createLowService()
});

export default createServices;

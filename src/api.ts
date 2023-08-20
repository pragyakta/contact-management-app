import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://disease.sh/v3/covid-19',
});

export const fetchWorldData = () => instance.get('/all');
export const fetchCountryData = () => instance.get('/countries');
export const fetchGraphData = () => instance.get('/historical/all?lastdays=all');
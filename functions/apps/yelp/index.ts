import * as yelp from 'yelp-fusion';
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.YELP_API_KEY;

const yelpApi = yelp.client(apiKey);

export default yelpApi;
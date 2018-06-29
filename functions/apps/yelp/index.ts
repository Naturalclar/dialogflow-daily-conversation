import yelp from 'yelp-fusion';
import * as dotenv from 'dotenv';
dotenv.config();

const apiKey = process.env.YELP_API_KEY;

export default yelp.client(apiKey);
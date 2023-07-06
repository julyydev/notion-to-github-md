import dotenv from 'dotenv';
import { Config } from './type/config';

dotenv.config();
const config: Config = JSON.parse(process.env.CONFIG as string);

export default config;

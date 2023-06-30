import dotenv from 'dotenv';

dotenv.config();

console.log(process.env.CONFIG);

const c = process.env.CONFIG;
const config = JSON.parse(c as string);

console.log(config.notion);
console.log(config.github);
console.log(config.nest);
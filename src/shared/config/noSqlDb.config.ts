import { MongoClientOptions } from 'mongodb';

interface Config {
  url: string;
  options: MongoClientOptions;
}

const config: Config = {
  url: process.env.MONGODB_URL as string,
  options: {},
};

export default config;

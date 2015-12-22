'use strict';
import { Mongoose, Schema } from 'mongoose';
import { getLogger } from './logs';
const logger = getLogger('mongoose');

const Uri = 'mongodb://localhost:27017/test';

export const mongoose = new Mongoose();
export const db = mongoose.connect(Uri).connection;

console.log(mongoose.connection);

db.on('error', () => logger.error(`MongoDb connection error!`));
db.on('open', () => logger.info(`MongoDb conection has been established.`));
db.on('close', () => logger.warn(`MongoDb conection has been closed!`));

'use strict';
import { Schema } from 'mongoose';
import { mongoose, db } from '../configurations/mongodb';
export const UserSchema = new Schema({
    name: String,
    password: String
});
export const User = mongoose.model('User', UserSchema, 'users');
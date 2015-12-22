'use strict';
import { Schema, model } from 'mongoose';
// import * as mongoose from 'mongoose';

export const UserSchema = new Schema({
    name: String,
    password: String
});

UserSchema.method('greet', () => {
    console.log(`Hello world from ${this.name}.`);
});
// console.log(mongoose.Schema, mongoose.model)
// console.log(Schema, model, UserSchema)
export const User = model('User', UserSchema);
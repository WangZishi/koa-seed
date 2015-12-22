'use strict';
import { Schema } from 'mongoose';
import { mongoose, db } from '../configurations/mongodb';
// import * as mongoose from 'mongoose';
// console.log(db.collections)
export const UserSchema = new Schema({
    name: String,
    password: String
});
UserSchema.method('greet', () => {
    console.log(arguments);
    console.log(`Hello world from ${this.name}.`);
});
// console.log(mongoose.Schema, mongoose.model)
// console.log(Schema, model, UserSchema)
const User = mongoose.model('User', UserSchema, 'users');
// export User;
// setTimeout(()=>{
User.find({}).exec().then(result => {
    console.info(result);
    result.pop().greet()
})
// },5000)
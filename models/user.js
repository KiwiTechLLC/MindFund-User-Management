'use strict';
/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
/**
 * user Schema
 */
var UserSchema = new Schema({
  first_name: {
  	type:String
  },
  last_name: {
  	type:String
  },
  type: {
  	type:String,
  	default: 'user'
  },
  email: {
  	type:String
  },
  signup_type: {
    type:String  // google, apple, app
  },
  google_token: {
    type:String
  },
  profile_image: {
    type:String
  },
  apple_token:{
    type:String
  },
  password: {
  	type:String
  },
  gender: {
  	type:String
  },
  date_of_birth: {
  	type:Date
  },
  mobile_number: {
  	type:Number
  },
  country: {
  	type:String
  },
  language: {
  	type:String
  },
  subscription_plan: {
  	type:String
  },
  is_active: {
  	type:Boolean,
  	default: false
  },
  is_email_verified: {
  	type:Boolean,
  	default: false
  }
}, {
  timestamps: true
})
const mongoosePaginate = require('mongoose-paginate-v2');
UserSchema.plugin(mongoosePaginate);

const User = mongoose.model('user', UserSchema)

module.exports = User;

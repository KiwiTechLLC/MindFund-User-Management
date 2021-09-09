"use strict";

const userModel = require('../models/user.js')
const responseHandler = require('../config/response-handler.json')
const shared = require('../lib/share.js')
const bcrypt = require("bcryptjs");
const userService = require('../services/user')

exports.create = async(req, res) => {
  let result 
  if(req.body.type === 'google') {
    result = await userService.createViaGoogle(req.body)
  }
  if (req.body.type === 'apple') {
    result = await userService.createViaApple(req.body)
  }
  else {
    result = await userService.createViaApp(req.body)
    if (result.status === false) {
      return res.status(400).send({error: true, message: result.message})
    }
    else {
     return res.status(400).send({error: true, message: result.message}) 
    }
  }
}

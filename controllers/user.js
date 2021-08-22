"use strict";

const userModel = require('../models/user.js')
const responseHandler = require('../config/response-handler.json')
const shared = require('../lib/share.js')
const bcrypt = require("bcryptjs");

exports.create = async(req, res) => {
  let checkValidationData = await checkValidation(req.body)
  if (checkValidationData.status === false) {
    return res.status(400).send({error: true, message: checkValidationData.message})
  }
  else {
    let checkEmail = await userModel.findOne({
      email: req.body.email.toLocaleLowerCase(),
    });
    if (checkEmail) {
      return res.status(200).send({
        error: true,
         message: responseHandler.emailCheck,
      });
    }
    let hashPassword = bcrypt.hashSync(req.body.password, 10);

    let data = {
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: hashPassword,
      language: req.body.language,
      email: req.body.email.toLocaleLowerCase()
    }
    try {
      let user = new userModel(data);
      await user.save();
      return res.status(200).send({ success: true, message: 'Saved!' });
    } catch (error) {
      console.log('error::::', error)
      return res.status(500).send({
        error: true, message: 'something went wrong'
      });
    }

  }
}

async function checkValidation(data) {
  if (!data.first_name) {
    return { status: false, message : responseHandler.firstNameRequired}
  }
  if (!data.last_name) {
    return { status: false, message : responseHandler.lastNameRequired}
  }
  if (!data.email) {
    return { status: false, message : responseHandler.emailRequired}
  }
  if (!data.password) {
    return { status: false, message : responseHandler.passwordRequired}
  }
  if (!data.language) {
    return { status: false, message : responseHandler.languageRequired}
  }
  let chkRegx = await shared.passwordRegex(data.password);
  if (!chkRegx) {
    return {
      status: true,
      message: responseHandler.passwordValidation,
    };
  }
  let checkEmailvalidation = await shared.validateEmail(data.email);
  if (!checkEmailvalidation) {
    return {
      status: true,
      message: responseHandler.invalidEmail,
    };
  }
  else {
     return { status: true}
  }
}

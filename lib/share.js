
exports.validateEmail = async (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
    return true
  }
  return false
}

exports.passwordRegex = async (text) => {
  let regEx = new RegExp(/^(?=.*\d).{8,128}$/)
  let result = regEx.test(text)
  return result
}

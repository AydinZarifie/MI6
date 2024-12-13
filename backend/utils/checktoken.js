const jwt = require('jsonwebtoken')

exports.check = (token) => {
  if (!token) {
    return false;
  }

  let decodetoken;

  try {
    decodetoken = jwt.verify(token, process.env.PRIVATE_KEY);
  } catch (error) {
    return false
  }

  if(!decodetoken){
    return false;
  }
  else {
    return true
  }

}

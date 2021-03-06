/* 
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/

const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')


module.exports = (req, res, next) => {
    const token = req.headers.authorization

    if(token){
      jwt.verify(token, secrets.jwtSecret, (err,decodedToken)=>{
        if(err) {
          console.log(token)
          res.status(401).json({you:"token denied"})
        } else {
          req.decodedJwt = decodedToken;
          console.log(decodedToken);
          next()
        }
      })
    } else{
      res.status(401).json({ you: 'lack a token' });
    }


 
};

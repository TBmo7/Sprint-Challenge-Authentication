const bcryptjs = require('bcryptjs');

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js')

const Auth = require('./auth-model.js')
const {isValid} = require('./auth-service.js')


router.get('/', (req,res)=>{
  res.status(200).json({message:'authentication part is here, please navigate to /register or /login'})
})


router.post('/register', (req, res) => {
  // implement registration

  const credentials = req.body;

    if(isValid(credentials)) {
      const rounds = process.env.BCRYPT_ROUNDS || 8;
      const hash = bcryptjs.hashSync(credentials.password,rounds)

      credentials.password = hash;

      Auth.add(credentials)
      .then(user=>{
        res.status(201).json({data:user})
      })
      .catch(error=>{
        console.log(error)
        res.status(500).json({message:"database error"})
      })
    }
});

router.post('/login', (req, res) => {
  // implement login
  const {username,password} = req.body;

  if(isValid(req.body)) {
    Auth.findBy({username : username})
    .then(([user])=>{
      if(user && bcryptjs.compareSync(password, user.password)){
        const token = generateToken(user)
        res.status(200).json({
          message:'welcome to the api',
          token
        })
      } else {
        res.status(401).json({message: " invalid credentials"})
      }
    })
    .catch(error=>{
      console.log('error in auth-router, /login', error)
      res.status(500).json({message:"database error"})
    })
  } else {
    res.status(400).json({
      message:"please provide username and password"
    })
  }
});

function generateToken(user){
  const payload = {
    id : user.id,
    username: user.username,
    password: user.password
  }
  const options = {
    expiresIn: "1h"
  }
  return jwt.sign(payload,secrets.jwtSecret,options)
}

module.exports = router;

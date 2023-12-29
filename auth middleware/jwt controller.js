const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const usermodel = require('../model/jwt schema')
const express = require('express');

const app = express()
// Register route
 exports.register = async (req, res) => {
  if (!req.body.username && !req.body.password) {
    res.status(400).send({ message: "Content can not be empty!" });
  }
  const {username,password} = req.body;
  const hashedPassword = await bcrypt.hash(password, 18);

  const User = new usermodel({username, password:hashedPassword})
  
  
  await User.save()
    .then((data) => {
      res.send({
        message: "User created successfully!!",
        user: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
};

// Login route
exports.login =  async (req, res) => {
  try {
    // Extract username and password from request body
    const { username, password } = req.body;
    //console.log(req.body);
    // Check if user exists
    const User = await usermodel.findOne ({ username });
    if (!User) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
  

    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, User.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate JWT
    const token = jsonwebtoken.sign({ username: usermodel.username }, 'this-is-my-sercret-1234', { expiresIn: '7d' });
    if(!token){
      return res.status(401).json({message:'token not generated'})
    }
    res.json({ token });
  } 
  catch (error)
   {
    console.error('Error logging in:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

//verify jwt
exports.verify = ('/verify', verifyToken,(req,res)=>{
  res.json({message:'verify route access sucessfully'});
});

//middleware to verify jwt 
function verifyToken(req,res,next){
  let token = req.headers['authorization'];
  token = token.replace("Bearer ","");

  if(!token){
    return res.status(403).json({message:'token not ghenertered'})
  }
  jsonwebtoken.verify(token, 'JFVSDHJAdf', (err, decoded)=>{
    if(err){
      console.log(err);
      return res.status(401).json({message:'invalid token '})
    }
    req.user = decoded.username;
    next();
  })
}
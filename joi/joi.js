const express = require('express');

const app = express();

const joi = require('joi');

const userschema = joi.object({
  name:joi.string().min(4).max(19).required(),
  email:joi.string().email().required(),
  password:joi.string().regex(new RegExp("^[a-zA-Z0-9]{8,16}$")).required(),
})



app.post('/joi',(req,res)=>{
  const body = req.body;
  //schema.validate(body)
  //console.log(req.body);
  const data = userschema.validate(body)
  res.send(data)
})

//const message = usereschema

module.exports = userschema
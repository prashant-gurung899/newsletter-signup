const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const path = require('path');

const app = express();
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'/signup.html'));
})


app.listen(3000,function(){
  console.log('Server running at port : 3000');
})

const express = require("express");
const bodyParser= require("body-parser");
const request = require("request");
const path = require('path');
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
app.get('/',function(req,res){
  res.sendFile(path.join(__dirname,'/signup.html'));
})
app.post('/',function(req,res){
    const firstName = req.body.fName;
    const lastName =  req.body.lName;
    const email =  req.body.email

//creating members object to match with mailchimp
    const data = {
      //only one object so as to subscribe only one member
      members : [{
        email_address : email,
        status: "subscribed",
        merge_fields :{
          FNAME: firstName,
          LNAME: lastName,
        }
      }]
    }
//convert data object into a json   (stringify)
const jsonData = JSON.stringify(data);

// api key
// 62204e6584db85683867d7616bc838b4-us21
// list id
// 1a5554c3fd.

//url
const url = "https://us21.api.mailchimp.com/3.0/lists/1a5554c3fd"

//options
const options ={
  method:'POST',
  auth : 'Prashant:1e208f50224e6dbcdbd22d49d9454365-us21'
}
const request = https.request(url,options, function(response){
          if(response.statusCode===200){
              res.sendFile(path.join(__dirname,'/success.html'));
          }else{
            res.sendFile(path.join(__dirname,'/failure.html'));
          }


  response.on("data",function(data){
  console.log(JSON.parse(data));
  })
})

//post data
request.write(jsonData);
request.end();
})

//failure route
app.post('/failure',function(req,res){
  res.redirect("/");
})

app.listen(process.env.PORT || 3000,function(){
  console.log('Server running at port : 3000');
})

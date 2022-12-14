const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

 const app  = express();
 app.use(express.static("public"));// to access local files in computer by Server
 app.use(bodyParser.urlencoded({extenden:true}));


 app.get("/",function(req,res){
   res.sendFile(__dirname+"/signup.html");
 })

app.post("/",function(req,res){
  const fname = req.body.firstname;
  const lname = req.body.lastname;
  const email  = req.body.email;

  const data ={
    members : [
      {
        email_address: email,
        status:"subscribed",
        merge_fields:{
          FNAME:fname,
          LNAME:lname
        }
      }
    ]
  };
  var jsonData = JSON.stringify(data);
  const url = "https://us14.api.mailchimp.com/3.0/lists/28548f1876", // this is post url of mailchimp server where us14 is the last words from api that is the address of server and lists/listid is the address to store our subscribers
      options = {
      method : "POST",
      auth : "Piyush123:d7be4a554adae1e05fe93101065d8109-us14"   // username:password (Username you can take wahtever you want but password will be api key)
  }
  const request  = https.request(url,options,function(response){

   response.on("data",function(data){     // getting the response from server after adding the email
     console.log(JSON.parse(data));
   })
   if(response.statusCode==200){
     res.sendFile(__dirname+"/success.html");
   }else{
     res.sendFile(__dirname+"/faliure.html");
   }
  })
  request.write(jsonData);
  request.end();

});


app.post("/faliure",function(req,res){    // this is after pressing the submit button
  res.redirect("/");
})




 app.listen(process.env.PORT||3000,function(){    // because of heroky we are using process.env.port
   console.log("Server is running on port 3000");
 })

 // 28548f1876

// d7be4a554adae1e05fe93101065d8109-us14

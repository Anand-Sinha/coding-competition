//jshint esversion:6

const express= require("express");
const ejs=require("ejs");
const mongoose=require("mongoose");
const bodyParser=require("body-parser");
var favicon = require('serve-favicon');
var path = require('path');
const app= express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

mongoose.connect("mongodb+srv://admin-anand:Anandsinha123@cluster0-ut4en.mongodb.net/participantsDB",{ useNewUrlParser: true, useUnifiedTopology: true });

const participantSchema={
  name: {
    type: String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  college:{
    type:String,
    required:true
  },
  phone:Number
};

const Participant= mongoose.model("Participant",participantSchema);

app.get("/",function(req,res){
  res.render("home");
});

app.post("/",function(req,res){
  const nameN= req.body.name;
  const emailN=req.body.email;
  const collgN=req.body.collg;
  const participant = new Participant({
    name:nameN,
    email:emailN,
    college:collgN
  });
  participant.save(function(err,result){
    if(err){
      res.render("fail");
    }
    else{
      res.render("success",{nameP:nameN});
    }
  });
});
let str= "";
let cou=1;
app.get("/mails",function(req,res){
  Participant.find({},function(err,results){
    results.forEach(function(result){
      str=str+"<strong>"+cou+"</strong> "+result.email+"<br>";
      cou=cou+1;
    });
    res.send(str);
    str=" ";
    cou=1;
  });
});
let mstr="";
app.get("/mailswithname",function(req,res){
  Participant.find({},function(err,results){
    results.forEach(function(result){
      mstr=mstr+cou+" <strong> "+result.name+" </strong> "+result.email+" <br> ";
      cou=cou+1;
    });
    res.send(mstr);
    mstr=" ";
    cou=1;
  });
});
app.listen(process.env.PORT||3000,function(){
  console.log("Server started");
});

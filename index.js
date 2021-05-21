const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();
const port=80;
const mongoose = require('mongoose');
const { text } = require("express");
mongoose.connect('mongodb://localhost/formdata', {useNewUrlParser: true, useUnifiedTopology: true}).then(()=>console.log("connected")).catch((err)=>console.log(err));

const formSchema = new mongoose.Schema({
    name: String,
    age:Number,
    number:Number,
    email:{
        type:String
    },
    password:{
      type:String  
}});

  const dancedata = mongoose.model('dancedata', formSchema);

  


app.use(express.static(path.join(__dirname,"/static")));
app.use(express.urlencoded());

app.set("view engine","pug");
app.set("views",path.join(__dirname,"./views"));

app.get("/contact",(req,res)=>{
    res.status(200).render("contact");
});
app.get("/",(req,res)=>{
    res.status(200).render("index");
});
app.post("/contact",(req,res)=>{
    console.log(req.body);
    const data = new dancedata({ 
        name: req.body.name,
    age:req.body.age,
    number:req.body.number,
    email:req.body.email,
    password:req.body.password
     });
    data.save();
    res.status(200).render("contact");
});

app.listen(port,()=>{
    console.log(`your server is listen at port-: ${port}`);
});
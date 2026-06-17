const express=require('express');
const path= require('path');

const app=express();

app.use(express.static("public"));  
app.use(express.urlencoded({extended:true}));

//ejs setup 
app.set("view engine" ,"ejs");

app.get("/ejs",(req,resp)=>{
    resp.render("ejs-demo",{
    name:"Krishna"
    });
});

app.get("/",(req,resp)=>{
    resp.sendFile(path.join(__dirname,"views","login.html"));
});

app.post("/submit",(req,resp)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    resp.send("form is submitted");
});

app.listen(4900);
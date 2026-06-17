const express=require('express');
const path= require('path');

const app=express();

app.use(express.urlencoded({extended:true}));

app.get("/",(req,resp)=>{
    resp.sendFile(path.join(__dirname,"views","home.html"));
});

app.post("/submit",(req,resp)=>{
    console.log(req.body);
    resp.send("form is submitted");
});

app.listen(5900);
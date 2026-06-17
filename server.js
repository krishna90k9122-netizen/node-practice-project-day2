const express=require("express");
const path=require("path");


const app =express();

app.set("view engine","ejs");

app.use(express.static("public"));

app.use(express.urlencoded({extended:true}));

app.get("/",(req,resp)=>{
    resp.render("login");
});

app.post("/submit",(req,resp)=>{
    console.log(req.body);
    const {name,college,branch,phone}=req.body;

    resp.render("sucess",{
        name,
        college,
        phone,
        branch
        
    });
});

app.listen(5700)

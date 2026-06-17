const express=require('express');
const path= require('path');

const app=express();

app.use(express.static("public"));  
app.use(express.urlencoded({extended:true}));

//ejs setup 
app.set("view engine" ,"ejs");

app.get("/ejs",(req,resp)=>{
    const users = [
    "Krishna",
    "Rahul",
    "Aman",
    "Priya",
    "Sneha",
    "Rohit",
    "Ankit",
    "Neha",
    "Pooja",
    "Vikas",
    "Riya",
    "Arjun",
    "Karan",
    "Simran",
    "Nisha",
    "Aditya",
    "Sakshi",
    "Deepak",
    "Shivam",
    "Aditi"
];
    resp.render("ejs-demo",{
    users
    });
});


app.get("/profile",(req,resp)=>{
    const isloggedin=false;

    resp.render("profile",{
        isloggedin
    });
})

app.get("/",(req,resp)=>{
    resp.sendFile(path.join(__dirname,"views","login.html"));
});

app.post("/submit",(req,resp)=>{
    console.log(req.body.email);
    console.log(req.body.password);
    resp.send("form is submitted");
});

app.listen(4900);
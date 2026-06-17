const express=require("express");

const app=express();

app.set("view engine","ejs");

app.use(express.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/profile",(req,resp)=>{

    const student = {

            
    id: 1,
    name: "Krishna",
    age: 19,
    course: "CSE"
};
resp.render("profile",{
    student
});

});

 
app.listen(3001);


import express from "express";
import { MongoClient } from "mongodb";

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const app = express();

app.set("view engine","ejs")
app.get("/",async (req,resp)=>{


    await client.connect();

    const dbName = "college";
    const db = client.db(dbName);

    const collection = db.collection("college");

    const result = await collection.find().toArray();

    console.log(result);

    resp.render('college.ejs',{result});
})

app.listen(5001, () => {
    console.log("Server running on port 5001");
});
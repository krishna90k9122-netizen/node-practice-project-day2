import express from "express";
import { MongoClient, ObjectId } from "mongodb";

const url = "mongodb://localhost:27017";

const client = new MongoClient(url);

const app = express();
app.use(express.urlencoded({ extended: true }))
app.set("view engine", 'ejs')

client.connect().then((connection) => {

    const db = connection.db("college");

    app.get("/api", async (req, res) => {

        const collection = db.collection("college");

        const students = await collection.find().toArray();

        res.send(students);
    });


    app.get("/ui", async (req, res) => {

        const collection = db.collection("college");

        const students = await collection.find().toArray();

        res.render("college", { students });
    });

    app.get("/add", async (req, res) => {

        // const collection = db.collection("college");

        // const students = await collection.find().toArray();

        res.render("add-student")


    })

    app.post("/add-student", async (req, res) => {

        console.log(req.body);

        const collection = db.collection("college");
        const result = await collection.insertOne(req.body)
        console.log(result);

        // const students = await collection.find().toArray();

        // res.send(students);
        res.send("data saved ")
    });

    app.post('/add-student-api', async (req, resp) => {
        console.log(req.body);
        const { name, age, email } = req.body;
        if (!name || !age || !email) {
            resp.send({ message: "opearation failed", success: false })
        }
        const collection = db.collection("students");
        const result = await collection.insertOne(req.body)
        resp.send({ message: "Data Stored", success: true, result: result })
    })

    app.delete("/delete/:id", async (req, resp) => {
        console.log(req.params.id);
        const collection = db.collection("college")
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) })
        if(result)

            if (result) {
                resp.send({
                    message: "student data deleted",
                    success: true
                })
            } else {
                resp.send({
                    message: "student data not deleted ,try after some time ",
                    success: false
                });
            }
    });




    app.get("/ui/delete/:id", async (req, resp) => {
        console.log(req.params.id);
        const collection = db.collection("college")
        const result = await collection.deleteOne({ _id: new ObjectId(req.params.id) })
        if (result) {
            resp.send("<h1>student record delete</h1>")
        } else {
            resp.send("<h1>student record not delete </h1>")
        }

    });

    app.get("/ui/students/:id", async (req, resp) => {
        const id = req.params.id;
        console.log(id);
        const collection = db.collection("college")
        const result = await collection.findOne({ _id: new ObjectId(req.params.id) })

        resp.render('update-sd', { result })
    })

});

app.listen(5003, () => {
    console.log("Server running on port 5003");
});

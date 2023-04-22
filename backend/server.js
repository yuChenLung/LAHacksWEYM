const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
//just show server is running

const app = express();
const cors = require("cors");
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = 8001;

app.get("/status", async (req, res) => {
    return res.status(400).send("server for GET is running");
});

app.post("/status", async (req, res) => {
    return res.status(200).send({
        status: "server for POST is running",
        message: req.body.message
    });
});

app.listen(PORT, function() {
    console.log(`server running on port ${PORT}`);
});

const url = "mongodb+srv://weym_admin:n72rutFwkAw9u5wW@weymllc.6fhgob6.mongodb.net/?retryWrites=true&w=majority"

mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: "WEYMLLC"
}).then(() => {
    console.log("connected successfully to server, using database %s\n", mongoose.connection.$dbName);
}).catch(err => {
    console.log(err);
});
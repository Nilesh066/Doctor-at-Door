let express = require("express");
let app = express();
const MongoClient = require("mongodb").MongoClient;
const mongo = require("mongodb");
const url = "mongodb://localhost:27017/book-an-appoinment";
var cors = require("cors");
var bodyParser = require("body-parser");
var ObjectID = require("mongodb").ObjectID;
app.use(bodyParser());
app.use(cors());

app.get("/", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("book-an-appoinment");
    let doctors = dbo
      .collection("doctorsDetail")
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
  });
});

app.post("/addPatient", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("book-an-appoinment");
    let emp = dbo.collection("patients").insertOne(req.body, (err, res) => {
      if (err) throw err;
      else if (req.body == "") {
        console.log("Invalid data");
      } else console.log("Inserted Successfully");
    });
  });
});

app.get("/patients", (req, res) => {
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("book-an-appoinment");
    let doctors = dbo
      .collection("patients")
      .find({})
      .toArray((err, result) => {
        if (err) throw err;
        res.send(result);
      });
  });
});

app.put("/patient/status/cancelled", (req, res) => {
  console.log(req.body);
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("book-an-appoinment");
    var myId = req.body;
    let dataUpdate = { $set: { status: "cancelled" } };
    dbo.collection("patients").updateOne(myId, dataUpdate, (err, res) => {
      if (err) throw err;
      else if (req.body == "") {
        console.log("Invalid data");
      } else {
        console.log("updated Successfully");
        console.log(myId);
      }
    });
  });
});

app.put("/patient/status/closed", (req, res) => {
  console.log(req.body);
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("book-an-appoinment");
    var myId = req.body;
    let dataUpdate = { $set: { status: "closed" } };
    dbo.collection("patients").updateOne(myId, dataUpdate, (err, res) => {
      if (err) throw err;
      else if (req.body == "") {
        console.log("Invalid data");
      } else {
        console.log("updated Successfully");
        console.log(myId);
      }
    });
  });
});

app.delete("/patient/status/delete", (req, res) => {
  console.log(req.body);
  MongoClient.connect(url, { useUnifiedTopology: true }, (err, db) => {
    if (err) throw err;
    let dbo = db.db("book-an-appoinment");
    dbo.collection("patients").removeOne(req.body, (err, res) => {
      if (err) throw err;
      else if (req.body == "") {
        console.log("Invalid data");
      } else {
        console.log("deleted Successfully");
      }
    });
  });
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`connected to the server ${port}`));

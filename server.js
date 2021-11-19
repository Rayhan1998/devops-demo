const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");

// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "617ce0415ec44fea9a1db55f9d8cbd96",
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

app.use(express.json());
app.use(cors());

let students = [];
const port = process.env.PORT || 5050;

// app.get("/api/students", (req, res) => {
//   res.status(200).send();
// });

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/students", (req, res) => {
  let { name } = req.body;
  name = name.trim();
  const index = students.findIndex(studentName => {
    return studentName === name;
  });

  try {
    if (index === -1 && name !== "") {
      students.push(name);
      rollbar.log("student added succesfully", {
        author: "rayhan",
        type: "manual"
      });

      res.status(200).send(students);
    } else if (name === "") {
      rollbar.error("no name given");
      res.status(400).send("must provide a name");
    } else {
      rollbar.error("student does exist");
      res.status(400).send("that student already exist");
    }
  } catch {
    rollbar.error(err);
  }
});

app.listen(port, () => console.log(`server is up! ${port}`));

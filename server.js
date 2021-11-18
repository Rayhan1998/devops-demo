// include and initialize the rollbar library with your access token
var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "617ce0415ec44fea9a1db55f9d8cbd96",
  captureUncaught: true,
  captureUnhandledRejections: true
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(express.json());
app.use(cors());
const port = 5050;

app.listen(port, () => console.log(`server is up! ${5050}`));

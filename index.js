require("dotenv").config();

const http = require('node:http');
const express = require('express');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const app = express();
const cors = require('cors')
const mongoose = require('mongoose');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());


app.get("/", function (req, res) {
    res.send("<h1>Welcome,<br/> Server Running...</h1>");
});


const PORT = process.env.PORT || 3000;
const MONGO_CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING;


mongoose
  .connect(MONGO_CONNECTION_STRING)
  .then(() => {
    console.log("connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Node API app is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });


const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");

app.use("/user", userRoute); //User Route
app.use("/product", productRoute); //Product Route

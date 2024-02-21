const http = require('node:http');

const PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();


app.listen(PORT, () => {
  console.log(`Server running...`);
});


app.get("/", function (req, res) {
    res.send("<h1>Server Running...</h1>");
})
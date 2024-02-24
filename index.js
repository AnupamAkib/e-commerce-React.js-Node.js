const http = require('node:http');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');


const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
      description: 'A simple Express Library API',
    },
  },
  // Path to the API docs
  apis: ['./*.js'], // Adjust the path according to where your route files are located
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);


const PORT = process.env.PORT || 3000;

var express = require('express');
var app = express();

app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.listen(PORT, () => {
  console.log(`Server running...`);
});


app.get("/", function (req, res) {
    res.send("<h1>Server Running...</h1>");
});


/**
 * @swagger
 * /api/allUser:
 *   get:
 *     summary: Returns user information
 *     description: Retrieve a single user's information
 *     responses:
 *       200:
 *         description: A single user's information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Anupam
 *                 age:
 *                   type: integer
 *                   example: 24
 */
app.get("/api/allUser", function (req, res) {
  res.send({
    "name" : "anupam",
    "age" : 24
  });
});

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Returns products information
 *     description: Retrieve a products information
 *     responses:
 *       200:
 *         description: products information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 name:
 *                   type: string
 *                   example: Anupam
 *                 age:
 *                   type: integer
 *                   example: 24
 */
app.get("/api/products", function (req, res) {
  res.send({
    "name" : "asdsdfsdf",
    "age" : 24,
    "price" : "3490"
  });
});
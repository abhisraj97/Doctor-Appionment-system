const express = require('express');
const colors = require("colors");
const moragan = require("morgan");
const dotenv = require("dotenv");
const connectDB = require('./config/db');

// const bodyParser = require('body-parser');
        

const app = express();


//dotenv conig
dotenv.config();

//mongobd connection
connectDB();

//middlewares
app.use(express.json());
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false })); 
app.use(express.urlencoded({ extended: true }));
app.use(moragan('dev'));



//routes

app.use("/api/users", require("./routes/userRoutes.js"));

const port = process.env.PORT || 8080;


app.listen(port, () => console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`.bgCyan.white));
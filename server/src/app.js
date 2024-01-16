const express = require("express");
const morgan = require("morgan");
const homeRouter = require("./routes/home");
const cors = require("cors");
const optionsCors = { origin: "http://localhost:5173" };
const path = require("path");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(optionsCors));

app.use("/", homeRouter);
app.use(express.static(path.join(__dirname, "public")));
module.exports = app;

const express = require("express");
const morgan = require("morgan");
const homeRouter = require("./routes/home");
const cors = require("cors");
const optionsCors = {
	origin: ["http://localhost:5173", "https://pokedex-app-eep3.onrender.com"],
};
const path = require("path");

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors(optionsCors));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "../public")));

// Then, handle routes
app.use("/", homeRouter);

module.exports = app;

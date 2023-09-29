const express = require("express");
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const recordRoute = require('./Routes/RecordsRoute');
const connectDB = require('./Database/connect');

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8080;

// mongoDB connection
connectDB();

// configure cors
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ["GET", "POST", "PUT", "DELETE"],
  preflightContinue: true,
  credentials: true,
}));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// middlewares
app.use(cookieParser());
app.use(bodyParser.json());

// routes
app.use("/", authRoute);
app.use("/patients", recordRoute);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong' });
});

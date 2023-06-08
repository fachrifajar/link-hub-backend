import express from "express";
import helmet from "helmet";
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();
const path = require("path");

const middleware = require("./middleware/log");

// app.use(
//   cors({
//     origin: ['http://localhost:3000', 'https://food-hub-v2.vercel.app'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// )

app.use(helmet());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

app.use(middleware.logRequest);
app.use("/auth", require("./routes/auth"));
app.use('/', require('./routes/user'))

// ... your REST API routes will go here

app.listen(4999, () =>
  console.log("REST API server ready at: http://localhost:4999")
);

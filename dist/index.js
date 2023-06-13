"use strict";
var express = require("express");
var helmet = require("helmet");
var bodyParser = require("body-parser");
var fileUpload = require("express-fileupload");
var cors = require("cors");
var app = express();
var path = require("path");
var middleware = require("./middleware/log");
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
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(middleware.logRequest);
app.use("/auth", require("./routes/auth"));
app.use('/', require('./routes/user'));
app.use('/post', require('./routes/post'));
// ... your REST API routes will go here
app.listen(4999, function () {
    return console.log("REST API server ready at: http://localhost:4999");
});
//# sourceMappingURL=index.js.map
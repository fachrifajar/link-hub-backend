import express from "express";
import helmet from "helmet";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
import path from "path";

var middleware = require("./middleware/log");

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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
app.use("/", require("./routes/user"));
app.use("/post", require("./routes/post"));
app.use("/item", require("./routes/item"));
app.use("/socmed", require("./routes/socmed"));

// ... your REST API routes will go here

app.listen(4999, () =>
  console.log("REST API server ready at: http://localhost:4999")
);

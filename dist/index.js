"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var helmet_1 = __importDefault(require("helmet"));
var body_parser_1 = __importDefault(require("body-parser"));
var express_fileupload_1 = __importDefault(require("express-fileupload"));
var path_1 = __importDefault(require("path"));
var middleware = require("./middleware/log");
var app = (0, express_1.default)();
// app.use(
//   cors({
//     origin: ['http://localhost:3000', 'https://food-hub-v2.vercel.app'],
//     credentials: true,
//     allowedHeaders: ['Content-Type', 'Authorization'],
//   })
// )
app.use((0, helmet_1.default)());
app.use(express_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.use((0, express_fileupload_1.default)({
    useTempFiles: true,
    tempFileDir: "/tmp/",
}));
app.use(middleware.logRequest);
app.use("/auth", require("./routes/auth"));
app.use("/", require("./routes/user"));
app.use("/post", require("./routes/post"));
// ... your REST API routes will go here
app.listen(4999, function () {
    return console.log("REST API server ready at: http://localhost:4999");
});
//# sourceMappingURL=index.js.map
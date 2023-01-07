require("dotenv").config();

import http from "http";
import mongoose from "mongoose";

import app from "./app";
// const server = http.createServer((req, res) => {
//     res.write("Hello");
//     res.end();
// });

const PORT = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

//Database Connection
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Connected to the database!"));

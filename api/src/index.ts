import express from "express";
import cors from "cors";
import router from "./routes";
import checkTLS from "./common/tls";
import https from "https";
import fs from "fs";

const PORT = 3000;

checkTLS();

const app = express();
const server = https.createServer({
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./cert.pem')
}, app);

app.use(express.json());
app.use(cors());
app.use(router);

server.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
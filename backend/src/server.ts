import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import connectDB from "./config/db";
import initializeSocket from "./config/socket";

const app = express();
const server = http.createServer(app);

app.use(express.json());
app.use(cors());

connectDB();

const io = initializeSocket(server);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`🚀 Server beží na porte ${PORT}`));
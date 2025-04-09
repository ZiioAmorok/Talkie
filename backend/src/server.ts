import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import connectDB from "./config/db";
import authRautes from "./routes/auth.routes";
import { Server, Socket } from "socket.io";
const app = express();
const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: Socket) => {
  console.log("🔌 Nový klient pripojený", socket.id);

  socket.on("message", (data: string) => {
    io.emit("message", data);
  });

  socket.on("disconnect", () => {
    console.log("Klient odpojený", socket.id);
  });
});

app.use(express.json());
app.use(cors());

app.use("/auth", authRautes);


const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log(`🚀 Server beží na porte ${PORT}`);
  connectDB();
});
import { Server as HttpServer } from "http";
import { Server, Socket } from "socket.io";

const initializeSocket = (server: HttpServer): Server => {
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

  return io;
};

export default initializeSocket;

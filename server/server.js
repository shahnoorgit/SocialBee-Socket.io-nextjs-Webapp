import express from "express";
import http from "http";
import * as socketIo from "socket.io";
import cors from "cors";
import routePost from "./routes/Post.route.js";
import connectDB from "./Database/connectDB.js";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const server = http.createServer(app);
const io = new socketIo.Server(server, {
  cors: {
    origin: "http://localhost:3000", // Allow requests from only this origin
    methods: ["GET", "POST"], // Allow only GET and POST requests
  },
});

// Apply CORS middleware to the Express app
app.use(
  cors({
    origin: "http://localhost:3000", // Allow requests from only this origin
  })
);
app.use(express.json());
app.use(bodyParser.json({ limit: "10mb" }));

let counter = 0;

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });

  socket.on("buttonClick", () => {
    counter = counter + 1;
    io.emit("counter", counter);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});

app.get("/", (req, res) => {
  res.send("hello");
});

//middleware
app.use("/api", routePost);

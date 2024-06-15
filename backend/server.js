import cookieParser from "cookie-parser";
import express from "express";
import connectToMongoDB from "./utils/connectToMongoDB.js";
import authRoutes from "./routes/auth.routes.js";
import cors from "cors";

const PORT = process.env.PORT || 8000;
const app = express();

// parsing json and cookies
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("welcome to a task manager app");
});

app.listen(PORT, () => {
  connectToMongoDB();
  console.log(`Server is listening to ${PORT}`);
});
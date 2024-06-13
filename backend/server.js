import cookieParser from "cookie-parser";
import express from "express";

const PORT = process.env.PORT || 8000;
const app = express();

// parsing json and cookies
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("welcome to a task manager app");
});

app.listen(PORT, () => {
  console.log(`Server is listening to ${PORT}`);
});
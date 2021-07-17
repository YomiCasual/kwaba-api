import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import paymentRoute from "./routes/paymentRoute.js";

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());

//routes
app.get("/", (req, res) => {
  res.send("Welcome to KWABA API");
});
app.use("/api/v1/rent", paymentRoute);

const PORT = process.env.PORT || 5000;

const Server = app.listen(PORT, () => {
  console.log("Listening on Port 5000");
});

process.on("unhandledRejection", (err) => {
  console.log("UNHANDLED REJECTION");
  console.loog(err.name, err.message);
  Server.close(() => {
    process.exit(1);
  });
});

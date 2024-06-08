import express, { Router, urlencoded } from "express";
import cors from "cors";
import router from "./routers/index.routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(urlencoded({ extended: true }));
app.use(express.static("uploads"));
app.use(cookieParser());

app.use("/api", router);

app.get("/", (_req, res) => {
  return res.send("Hey There APIs Here......");
});

app.all("*", (_req, res) => {
  return res.status(400).json({
    success: false,
    message: "Route not found",
  });
});

export default app;

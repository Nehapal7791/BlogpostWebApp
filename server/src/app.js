import express, { Router, urlencoded } from "express";
import cors from "cors";
import router from "./routers/index.routes.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: [
      process.env.LOCAL || "https://blogpost-web-app-frontend.vercel.app",
    ],
    methods: ["POST", "GET", "PUT", "DELETE"],
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

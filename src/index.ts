import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { UserModel } from "./db";

const app = express();
app.use(express.json());
app.post("/api/v1/signup", async function (req, res) {
  //TODO - zod validation , hash the password
  const username = req.body.name;
  const password = req.body.password;

  await UserModel.create({
    username: username,
    password: password,
  });

  res.json({
    message: "User signed up",
  });
});
app.post("/api/v1/signin", function (req, res) {
  const username = req.body.name;
  const password = req.body.password;
});
app.post("/api/v1/content", function (req, res) {});
app.get("/api/v1/content", function (req, res) {});
app.delete("/api/v1/content", function (req, res) {});
app.post("/api/v1/brain/share", function (req, res) {});
app.get("/api/v1/brain/:shareLink", function (req, res) {});

app.listen(3000);

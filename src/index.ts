import express from "express";
import jwt from "jsonwebtoken";
import { ContentModel, UserModel } from "./db";
import { JWT_PASSWORD } from "./config";
import { userMiddleWare } from "./middleware";

const app = express();
app.use(express.json());

app.post("/api/v1/signup", async function (req, res) {
  //TODO - zod validation , hash the password
  const username = req.body.username;
  const password = req.body.password;
  try {
    await UserModel.create({
      username: username,
      password: password,
    });

    res.json({
      message: "User signed up",
    });
  } catch (e) {
    res.status(411).json({
      message: "User already exist",
    });
  }
});

app.post("/api/v1/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;
  const existingUser = await UserModel.findOne({
    username,
    password,
  });
  if (existingUser) {
    const token = jwt.sign(
      {
        id: existingUser._id,
      },
      JWT_PASSWORD
    );
    res.json({
      token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect Credentials",
    });
  }
});

app.post("/api/v1/content", userMiddleWare, async function (req, res) {
  const link = req.body.link;
  const type = req.body.type;
  await ContentModel.create({
    link,
    type,
    userId: req.userId,
    tags: [],
  });
  res.json({
    message: "Content Added",
  });
});
app.get("/api/v1/content", function (req, res) {});
app.delete("/api/v1/content", function (req, res) {});
app.post("/api/v1/brain/share", function (req, res) {});
app.get("/api/v1/brain/:shareLink", function (req, res) {});

app.listen(3000);

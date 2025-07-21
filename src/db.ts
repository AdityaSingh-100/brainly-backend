import mongoose, { model, Schema } from "mongoose";

mongoose.connect(
  "mongodb+srv://admin:tSoA4IFvu9Q5ph3m@cluster0.x2erf5e.mongodb.net/brainly"
);

const UserSchema = new Schema({
  username: { type: String, unique: true },
  password: String,
});

export const UserModel = model("User", UserSchema);

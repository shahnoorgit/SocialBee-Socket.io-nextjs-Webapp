import { model, models, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  posts: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
  liked: [
    {
      type: Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

let User = models.User || model("User", UserSchema);

export default User;

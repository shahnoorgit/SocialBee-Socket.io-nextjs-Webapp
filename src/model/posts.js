import { model, models, Schema } from "mongoose";

const PostSchema = new Schema({
  caption: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      text: {
        type: String,
        required: true,
      },
    },
  ],
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

let Posts = models.Posts || model("Posts", PostSchema);
export default Posts;

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    password: {
      type: String,
      required: true,
    },

    isAdmin: {
      type: Boolean,
      default: false,
    },

    profilePic: {
      type: String,
      default:
        "https://www.pngarts.com/files/10/Default-Profile-Picture-PNG-Free-Download.png", // Optional: can be updated later
    },
    bio: {
      type: String,
      default: "",
    },
    isCreatedAt: {},
  },
  { timestamps: true }
);

export default mongoose.model("Users", userSchema);

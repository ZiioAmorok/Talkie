import mongoose, { Document, Schema, Model} from "mongoose";

interface IUser extends Document{
    _id: string;
    email: string;
    fullName: string;
    password: string;
    profilePicture?: string;
    createdAt: Date;
}

const userSchema: Schema<IUser> = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    profilePicture: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model("User", userSchema);

export default User;
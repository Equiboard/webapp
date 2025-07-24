import mongoose from "mongoose";
import {UserSchema} from "../schema";

UserSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.passwordHash; 
  return user;
};
const User = mongoose.models.User || mongoose.model("User", UserSchema);

export async function getUserOrgs(userId:mongoose.Types.ObjectId) {
  try {
        const user = await User.findOne({ _id: userId });
        return user ? user.organizations : [];
    } catch (err) {
        console.error("Error fetching user organizations:", err);
        throw err;
    }
}


export default User;

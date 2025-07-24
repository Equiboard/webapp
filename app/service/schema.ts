import { Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    email: String,
    passwordHash: String,
    name: String,
    organizations: [
      {
        organizationId: String,
        role: String,
        joinedAt: Date,
        user_weight: Number,
        isActive: Boolean,
      },
    ],
  },
  { timestamps: true }
);

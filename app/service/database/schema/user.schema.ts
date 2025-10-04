import { Schema } from 'mongoose';

export const UserSchema = new Schema(
    {
        email: { type: String, required: true, unique: true, index: true },
        passwordHash: String,
        first_name: String,
        last_name: String,
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

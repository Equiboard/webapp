import { Schema } from 'mongoose';

export const InvitationSchema = new Schema(
    {
        orgId: String,
        email: String,
        token: String,
        status: { type: String, enum: ['pending', 'accepted', 'rejected', 'expired'], default: 'pending' },
        expiresAt: Date,
    },
    { timestamps: true }
);

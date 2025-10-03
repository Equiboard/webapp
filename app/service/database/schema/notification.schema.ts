import { Schema } from 'mongoose';

export const NotificationSchema = new Schema(
    {
        userId: String,
        orgId: String,
        type: String,
        content: Schema.Types.Mixed,
        read: { type: Boolean, default: false },
    },
    { timestamps: true }
);

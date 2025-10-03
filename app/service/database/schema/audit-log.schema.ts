import { Schema } from 'mongoose';

export const AuditLogSchema = new Schema(
    {
        orgId: String,
        userId: String,
        actionType: String,
        entityType: String,
        entityId: String,
        previousState: Schema.Types.Mixed,
        newState: Schema.Types.Mixed,
    },
    { timestamps: true }
);

import { Schema } from 'mongoose';

export const ContributionSchema = new Schema(
    {
        orgId: String,
        userId: String,
        criteriaId: String,
        type: { type: String, enum: ['objective', 'subjective'] },
        value: Number,
        unit: String,
        description: String,
        source: String,
        status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
        approvals: [
            {
                userId: String,
                status: { type: String, enum: ['approved', 'rejected'] },
                comment: String,
                createdAt: Date,
            },
        ],
    },
    { timestamps: true }
);

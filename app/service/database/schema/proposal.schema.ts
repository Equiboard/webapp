import { Schema } from 'mongoose';

export const ProposalSchema = new Schema(
    {
        orgId: String,
        proposerId: String,
        type: String,
        status: { type: String, enum: ['open', 'approved', 'rejected', 'closed'], default: 'open' },
        content: {
            description: String,
        },
        votes: [
            {
                userId: String,
                vote: { type: String, enum: ['approve', 'reject', 'abstain'] },
                comment: String,
                createdAt: Date,
            },
        ],
    },
    { timestamps: true }
);

import { Schema } from 'mongoose';

export const OrganizationSchema = new Schema(
    {
        name: String,
        creatorId: String,
        onboardingPhaseClosed: { type: Boolean, default: false },
        members: [
            {
                userId: String,
                role: String,
                equityPercentage: Number,
                joinedAt: Date,
            },
        ],
        criteria: [
            {
                criteriaId: String,
                name: String,
                description: String,
                type: { type: String, enum: ['objective', 'subjective'] },
                assessmentType: String,
                weight: Number,
                status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
            },
        ],
    },
    { timestamps: true }
);

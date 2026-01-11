import { Schema } from 'mongoose';

export const OrganizationSchema = new Schema(
    {
        name: String,
        summary: String,
        creatorId: String,
        onboardingPhaseClosed: { type: Boolean, default: false },
        onboardingStep: {
            type: String,
            enum: ['memberBoarding', 'criteriaDefination', 'userSkills', 'voting'],
            default: 'memberBoarding',
        },
        members: [
            {
                userId: String,
                email: String,
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

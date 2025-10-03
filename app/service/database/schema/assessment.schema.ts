import { Schema } from 'mongoose';

export const AssessmentSchema = new Schema(
    {
        orgId: String,
        criteriaId: String,
        raterId: String,
        rateeId: String,
        score: Number,
        comment: String,
    },
    { timestamps: true }
);

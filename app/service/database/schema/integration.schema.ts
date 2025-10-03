import { Schema } from 'mongoose';

export const IntegrationSchema = new Schema(
    {
        orgId: String,
        type: String,
        config: Schema.Types.Mixed,
        fieldMappings: [
            {
                externalField: String,
                internalField: String,
                transformation: String,
            },
        ],
        status: { type: String, enum: ['active', 'inactive', 'error'], default: 'active' },
    },
    { timestamps: true }
);

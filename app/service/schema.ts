import { Schema } from "mongoose";

export const UserSchema = new Schema(
  {
    email: String,
    passwordHash: String,
    name: String,
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

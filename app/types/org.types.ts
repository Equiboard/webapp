import type { OrganizationSchema } from '@/service/database/schema';
import type { InferSchemaType } from 'mongoose';

export type IOrg = InferSchemaType<typeof OrganizationSchema>;

export type OrgMember = {
    userId?: string;
    email: string;
    role: string;
    equityPercentage: number;
    joinedAt: Date;
};
export type CreateIOrg = {
    name: string;
    summary: string;
    creatorId: string;
    onboardingPhaseClosed: boolean;
    members: OrgMember[];
};

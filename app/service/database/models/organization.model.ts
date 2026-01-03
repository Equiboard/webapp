import mongoose from 'mongoose';
import { OrganizationSchema } from '../schema';
import type { CreateIOrg, IOrg } from '@/types/org.types';
import { logger } from '@/utils/logger';

// Get the Organiztion model if already registered with mongoose Client, else create one from the schema
const Organization = mongoose.models.Organization || mongoose.model('Organization', OrganizationSchema);

export async function createOrganization(orgDetails: Partial<CreateIOrg>): Promise<Partial<IOrg> & { _id: mongoose.Types.ObjectId }> {
    try {
        const org = await Organization.create(orgDetails);
        return org;
    } catch (error) {
        logger.error(error, 'Error creating Org:');
        throw error;
    }
}

export async function getOrganizationMembers(orgId: mongoose.Types.ObjectId) {
    try {
        const org = await Organization.findOne({ _id: orgId });
        return org ? org.members : [];
    } catch (error) {
        logger.error(error, 'Error fetching organization members:');
        throw error;
    }
}

export async function getOrganizationCriteria(orgId: mongoose.Types.ObjectId) {
    try {
        const org = await Organization.findOne({ _id: orgId });
        return org ? org.criteria : [];
    } catch (error) {
        logger.error(error, 'Error fetching organization criteria:');
        throw error;
    }
}

export async function addMemberToOrg(orgId: mongoose.Types.ObjectId, memberData: any) {
    try {
        return await Organization.findByIdAndUpdate(orgId, { $push: { members: memberData } }, { new: true });
    } catch (error) {
        logger.error(error, 'Error adding member to organization:');
        throw error;
    }
}
export async function findOrgById(orgId: string): Promise<(Partial<IOrg> & { _id: mongoose.Types.ObjectId }) | null> {
    try {
        return await Organization.findById(orgId);
    } catch (error) {
        logger.error(error, 'Error finding Organization');
        throw error;
    }
}
export default Organization;

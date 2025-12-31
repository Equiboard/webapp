import mongoose from 'mongoose';
import { OrganizationSchema } from '../schema';
import type { CreateIOrg, IOrg } from '@/types/org.types';

const Organization = mongoose.models.Organization || mongoose.model('Organization', OrganizationSchema);

export async function createOrganization(orgDetails: CreateIOrg): Promise<Partial<IOrg> & { _id: string }> {
    try {
        const org = await Organization.create(orgDetails);
        return org;
    } catch (error) {
        console.error('Error creating Org:', error);
        throw error;
    }
}

export async function getOrganizationMembers(orgId: mongoose.Types.ObjectId) {
    try {
        const org = await Organization.findOne({ _id: orgId });
        return org ? org.members : [];
    } catch (error) {
        console.error('Error fetching organization members:', error);
        throw error;
    }
}

export async function getOrganizationCriteria(orgId: mongoose.Types.ObjectId) {
    try {
        const org = await Organization.findOne({ _id: orgId });
        return org ? org.criteria : [];
    } catch (error) {
        console.error('Error fetching organization criteria:', error);
        throw error;
    }
}

export async function addMemberToOrg(orgId: mongoose.Types.ObjectId, memberData: any) {
    try {
        return await Organization.findByIdAndUpdate(orgId, { $push: { members: memberData } }, { new: true });
    } catch (error) {
        console.error('Error adding member to organization:', error);
        throw error;
    }
}

export default Organization;

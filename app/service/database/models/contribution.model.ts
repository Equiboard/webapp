import mongoose from 'mongoose';
import { ContributionSchema } from '../schema';

const Contribution = mongoose.models.Contribution || mongoose.model('Contribution', ContributionSchema);

export async function getContributionsByOrg(orgId: mongoose.Types.ObjectId) {
    try {
        return await Contribution.find({ orgId: orgId.toString() });
    } catch (error) {
        console.error('Error fetching contributions:', error);
        throw error;
    }
}

export async function getContributionsByUser(userId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
    try {
        const query: any = { userId: userId.toString() };
        if (orgId) {
            query.orgId = orgId.toString();
        }
        return await Contribution.find(query);
    } catch (error) {
        console.error('Error fetching user contributions:', error);
        throw error;
    }
}

export async function getContributionsByCriteria(criteriaId: string, orgId: mongoose.Types.ObjectId) {
    try {
        return await Contribution.find({ criteriaId, orgId: orgId.toString() });
    } catch (error) {
        console.error('Error fetching contributions by criteria:', error);
        throw error;
    }
}

export async function addApprovalToContribution(contributionId: mongoose.Types.ObjectId, approvalData: any) {
    try {
        return await Contribution.findByIdAndUpdate(contributionId, { $push: { approvals: approvalData } }, { new: true });
    } catch (error) {
        console.error('Error adding approval to contribution:', error);
        throw error;
    }
}

export async function updateContributionStatus(contributionId: mongoose.Types.ObjectId, status: string) {
    try {
        return await Contribution.findByIdAndUpdate(contributionId, { status }, { new: true });
    } catch (error) {
        console.error('Error updating contribution status:', error);
        throw error;
    }
}

export default Contribution;

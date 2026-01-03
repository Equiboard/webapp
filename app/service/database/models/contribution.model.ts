import mongoose from 'mongoose';
import { ContributionSchema } from '../schema';
import { logger } from '@/utils/logger';

const Contribution = mongoose.models.Contribution || mongoose.model('Contribution', ContributionSchema);

export async function getContributionsByOrg(orgId: mongoose.Types.ObjectId) {
    try {
        return await Contribution.find({ orgId: orgId.toString() });
    } catch (error) {
        logger.error(error, 'Error fetching contributions:');
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
        logger.error(error, 'Error fetching user contributions:');
        throw error;
    }
}

export async function getContributionsByCriteria(criteriaId: string, orgId: mongoose.Types.ObjectId) {
    try {
        return await Contribution.find({ criteriaId, orgId: orgId.toString() });
    } catch (error) {
        logger.error(error, 'Error fetching contributions by criteria:');
        throw error;
    }
}

export async function addApprovalToContribution(contributionId: mongoose.Types.ObjectId, approvalData: any) {
    try {
        return await Contribution.findByIdAndUpdate(contributionId, { $push: { approvals: approvalData } }, { new: true });
    } catch (error) {
        logger.error(error, 'Error adding approval to contribution:');
        throw error;
    }
}

export async function updateContributionStatus(contributionId: mongoose.Types.ObjectId, status: string) {
    try {
        return await Contribution.findByIdAndUpdate(contributionId, { status }, { new: true });
    } catch (error) {
        logger.error(error, 'Error updating contribution status:');
        throw error;
    }
}

export default Contribution;

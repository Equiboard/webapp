import mongoose from 'mongoose';
import { ProposalSchema } from '../schema';
import { logger } from '@/utils/logger';

const Proposal = mongoose.models.Proposal || mongoose.model('Proposal', ProposalSchema);

export async function getProposalsByOrg(orgId: mongoose.Types.ObjectId) {
    try {
        return await Proposal.find({ orgId: orgId.toString() });
    } catch (error) {
        logger.error(error, 'Error fetching proposals:');
        throw error;
    }
}

export async function getOpenProposals(orgId: mongoose.Types.ObjectId) {
    try {
        return await Proposal.find({ orgId: orgId.toString(), status: 'open' });
    } catch (error) {
        logger.error(error, 'Error fetching open proposals:');
        throw error;
    }
}

export async function addVoteToProposal(proposalId: mongoose.Types.ObjectId, voteData: any) {
    try {
        return await Proposal.findByIdAndUpdate(proposalId, { $push: { votes: voteData } }, { new: true });
    } catch (error) {
        logger.error(error, 'Error adding vote to proposal:');
        throw error;
    }
}

export async function updateProposalStatus(proposalId: mongoose.Types.ObjectId, status: string) {
    try {
        return await Proposal.findByIdAndUpdate(proposalId, { status }, { new: true });
    } catch (error) {
        logger.error(error, 'Error updating proposal status:');
        throw error;
    }
}

export default Proposal;

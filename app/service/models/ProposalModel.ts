import mongoose from "mongoose";
import { ProposalSchema } from "../schema";

const Proposal = mongoose.models.Proposal || mongoose.model("Proposal", ProposalSchema);

export async function getProposalsByOrg(orgId: mongoose.Types.ObjectId) {
  try {
    return await Proposal.find({ orgId: orgId.toString() });
  } catch (err) {
    console.error("Error fetching proposals:", err);
    throw err;
  }
}

export async function getOpenProposals(orgId: mongoose.Types.ObjectId) {
  try {
    return await Proposal.find({ orgId: orgId.toString(), status: 'open' });
  } catch (err) {
    console.error("Error fetching open proposals:", err);
    throw err;
  }
}

export async function addVoteToProposal(proposalId: mongoose.Types.ObjectId, voteData: any) {
  try {
    return await Proposal.findByIdAndUpdate(
      proposalId,
      { $push: { votes: voteData } },
      { new: true }
    );
  } catch (err) {
    console.error("Error adding vote to proposal:", err);
    throw err;
  }
}

export async function updateProposalStatus(proposalId: mongoose.Types.ObjectId, status: string) {
  try {
    return await Proposal.findByIdAndUpdate(
      proposalId,
      { status },
      { new: true }
    );
  } catch (err) {
    console.error("Error updating proposal status:", err);
    throw err;
  }
}

export default Proposal;
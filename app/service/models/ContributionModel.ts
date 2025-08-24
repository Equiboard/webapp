import mongoose from "mongoose";
import { ContributionSchema } from "../schema";

const Contribution = mongoose.models.Contribution || mongoose.model("Contribution", ContributionSchema);

export async function getContributionsByOrg(orgId: mongoose.Types.ObjectId) {
  try {
    return await Contribution.find({ orgId: orgId.toString() });
  } catch (err) {
    console.error("Error fetching contributions:", err);
    throw err;
  }
}

export async function getContributionsByUser(userId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
  try {
    const query: any = { userId: userId.toString() };
    if (orgId) query.orgId = orgId.toString();
    return await Contribution.find(query);
  } catch (err) {
    console.error("Error fetching user contributions:", err);
    throw err;
  }
}

export async function getContributionsByCriteria(criteriaId: string, orgId: mongoose.Types.ObjectId) {
  try {
    return await Contribution.find({ criteriaId, orgId: orgId.toString() });
  } catch (err) {
    console.error("Error fetching contributions by criteria:", err);
    throw err;
  }
}

export async function addApprovalToContribution(contributionId: mongoose.Types.ObjectId, approvalData: any) {
  try {
    return await Contribution.findByIdAndUpdate(
      contributionId,
      { $push: { approvals: approvalData } },
      { new: true }
    );
  } catch (err) {
    console.error("Error adding approval to contribution:", err);
    throw err;
  }
}

export async function updateContributionStatus(contributionId: mongoose.Types.ObjectId, status: string) {
  try {
    return await Contribution.findByIdAndUpdate(
      contributionId,
      { status },
      { new: true }
    );
  } catch (err) {
    console.error("Error updating contribution status:", err);
    throw err;
  }
}

export default Contribution;
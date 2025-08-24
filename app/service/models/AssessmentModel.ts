import mongoose from "mongoose";
import { AssessmentSchema } from "../schema";

const Assessment = mongoose.models.Assessment || mongoose.model("Assessment", AssessmentSchema);

export async function getAssessmentsByOrg(orgId: mongoose.Types.ObjectId) {
  try {
    return await Assessment.find({ orgId: orgId.toString() });
  } catch (err) {
    console.error("Error fetching assessments:", err);
    throw err;
  }
}

export async function getAssessmentsByRatee(rateeId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
  try {
    const query: any = { rateeId: rateeId.toString() };
    if (orgId) query.orgId = orgId.toString();
    return await Assessment.find(query);
  } catch (err) {
    console.error("Error fetching assessments by ratee:", err);
    throw err;
  }
}

export async function getAssessmentsByRater(raterId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
  try {
    const query: any = { raterId: raterId.toString() };
    if (orgId) query.orgId = orgId.toString();
    return await Assessment.find(query);
  } catch (err) {
    console.error("Error fetching assessments by rater:", err);
    throw err;
  }
}

export async function getAssessmentsByCriteria(criteriaId: string, orgId: mongoose.Types.ObjectId) {
  try {
    return await Assessment.find({ criteriaId, orgId: orgId.toString() });
  } catch (err) {
    console.error("Error fetching assessments by criteria:", err);
    throw err;
  }
}

export default Assessment;
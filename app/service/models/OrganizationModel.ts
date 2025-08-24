import mongoose from "mongoose";
import { OrganizationSchema } from "../schema";

const Organization = mongoose.models.Organization || mongoose.model("Organization", OrganizationSchema);

export async function getOrganizationMembers(orgId: mongoose.Types.ObjectId) {
  try {
    const org = await Organization.findOne({ _id: orgId });
    return org ? org.members : [];
  } catch (err) {
    console.error("Error fetching organization members:", err);
    throw err;
  }
}

export async function getOrganizationCriteria(orgId: mongoose.Types.ObjectId) {
  try {
    const org = await Organization.findOne({ _id: orgId });
    return org ? org.criteria : [];
  } catch (err) {
    console.error("Error fetching organization criteria:", err);
    throw err;
  }
}

export async function addMemberToOrg(orgId: mongoose.Types.ObjectId, memberData: any) {
  try {
    return await Organization.findByIdAndUpdate(
      orgId,
      { $push: { members: memberData } },
      { new: true }
    );
  } catch (err) {
    console.error("Error adding member to organization:", err);
    throw err;
  }
}

export default Organization;
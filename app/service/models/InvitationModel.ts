import mongoose from "mongoose";
import { InvitationSchema } from "../schema";

const Invitation = mongoose.models.Invitation || mongoose.model("Invitation", InvitationSchema);

export async function getInvitationsByOrg(orgId: mongoose.Types.ObjectId) {
  try {
    return await Invitation.find({ orgId: orgId.toString() });
  } catch (err) {
    console.error("Error fetching invitations:", err);
    throw err;
  }
}

export async function getInvitationByToken(token: string) {
  try {
    return await Invitation.findOne({ token, status: 'pending' });
  } catch (err) {
    console.error("Error fetching invitation by token:", err);
    throw err;
  }
}

export async function acceptInvitation(token: string) {
  try {
    return await Invitation.findOneAndUpdate(
      { token, status: 'pending' },
      { status: 'accepted' },
      { new: true }
    );
  } catch (err) {
    console.error("Error accepting invitation:", err);
    throw err;
  }
}

export async function expireInvitation(token: string) {
  try {
    return await Invitation.findOneAndUpdate(
      { token, status: 'pending' },
      { status: 'expired' },
      { new: true }
    );
  } catch (err) {
    console.error("Error expiring invitation:", err);
    throw err;
  }
}

export default Invitation;
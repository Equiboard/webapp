import mongoose from 'mongoose';
import { InvitationSchema } from '../schema';

const Invitation = mongoose.models.Invitation || mongoose.model('Invitation', InvitationSchema);

export async function getInvitationsByOrg(orgId: mongoose.Types.ObjectId) {
    try {
        return await Invitation.find({ orgId: orgId.toString() });
    } catch (error) {
        console.error('Error fetching invitations:', error);
        throw error;
    }
}

export async function getInvitationByToken(token: string) {
    try {
        return await Invitation.findOne({ token, status: 'pending' });
    } catch (error) {
        console.error('Error fetching invitation by token:', error);
        throw error;
    }
}

export async function acceptInvitation(token: string) {
    try {
        return await Invitation.findOneAndUpdate({ token, status: 'pending' }, { status: 'accepted' }, { new: true });
    } catch (error) {
        console.error('Error accepting invitation:', error);
        throw error;
    }
}

export async function expireInvitation(token: string) {
    try {
        return await Invitation.findOneAndUpdate({ token, status: 'pending' }, { status: 'expired' }, { new: true });
    } catch (error) {
        console.error('Error expiring invitation:', error);
        throw error;
    }
}

export default Invitation;

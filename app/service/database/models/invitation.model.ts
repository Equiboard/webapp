import mongoose from 'mongoose';
import { InvitationSchema } from '../schema';
import { logger } from '@/utils/logger';
import type { IInvitation } from '@/types/invitation.types';

const Invitation = mongoose.models.Invitation || mongoose.model('Invitation', InvitationSchema);

export async function addInvitations(invite: Partial<IInvitation>) {
    try {
        return await Invitation.insertOne(invite);
    } catch (error) {
        logger.error(error, 'Error fetching invitations:');
        throw error;
    }
}
export async function getInvitationsByOrg(orgId: mongoose.Types.ObjectId) {
    try {
        return await Invitation.find({ orgId });
    } catch (error) {
        logger.error(error, 'Error fetching invitations:');
        throw error;
    }
}

export async function getInvitationByToken(token: string) {
    try {
        return await Invitation.findOne({ token, status: 'pending' });
    } catch (error) {
        logger.error(error, 'Error fetching invitation by token:');
        throw error;
    }
}

export async function acceptInvitation(token: string) {
    try {
        return await Invitation.findOneAndUpdate({ token, status: 'pending' }, { status: 'accepted' }, { new: true });
    } catch (error) {
        logger.error(error, 'Error accepting invitation:');
        throw error;
    }
}

export async function expireInvitation(token: string) {
    try {
        return await Invitation.findOneAndUpdate({ token, status: 'pending' }, { status: 'expired' }, { new: true });
    } catch (error) {
        logger.error(error, 'Error expiring invitation:');
        throw error;
    }
}

export default Invitation;

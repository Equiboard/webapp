import mongoose from 'mongoose';
import { IntegrationSchema } from '../schema';

const Integration = mongoose.models.Integration || mongoose.model('Integration', IntegrationSchema);

export async function getIntegrationsByOrg(orgId: mongoose.Types.ObjectId) {
    try {
        return await Integration.find({ orgId: orgId.toString() });
    } catch (error) {
        console.error('Error fetching integrations:', error);
        throw error;
    }
}

export async function getActiveIntegrations(orgId: mongoose.Types.ObjectId) {
    try {
        return await Integration.find({ orgId: orgId.toString(), status: 'active' });
    } catch (error) {
        console.error('Error fetching active integrations:', error);
        throw error;
    }
}

export async function getIntegrationByType(orgId: mongoose.Types.ObjectId, type: string) {
    try {
        return await Integration.findOne({ orgId: orgId.toString(), type });
    } catch (error) {
        console.error('Error fetching integration by type:', error);
        throw error;
    }
}

export async function updateIntegrationStatus(integrationId: mongoose.Types.ObjectId, status: string) {
    try {
        return await Integration.findByIdAndUpdate(integrationId, { status }, { new: true });
    } catch (error) {
        console.error('Error updating integration status:', error);
        throw error;
    }
}

export async function updateIntegrationConfig(integrationId: mongoose.Types.ObjectId, config: any) {
    try {
        return await Integration.findByIdAndUpdate(integrationId, { config }, { new: true });
    } catch (error) {
        console.error('Error updating integration config:', error);
        throw error;
    }
}

export default Integration;

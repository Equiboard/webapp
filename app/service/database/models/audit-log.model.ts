import mongoose from 'mongoose';
import { AuditLogSchema } from '../schema';

const AuditLog = mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);

export async function getAuditLogsByOrg(orgId: mongoose.Types.ObjectId) {
    try {
        return await AuditLog.find({ orgId: orgId.toString() }).sort({ createdAt: -1 });
    } catch (error) {
        console.error('Error fetching audit logs:', error);
        throw error;
    }
}

export async function getAuditLogsByUser(userId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
    try {
        const query: Record<string, string> = { userId: userId.toString() };
        if (orgId) {
            query.orgId = orgId.toString();
        }
        return await AuditLog.find(query).sort({ createdAt: -1 });
    } catch (error) {
        console.error('Error fetching audit logs by user:', error);
        throw error;
    }
}

export async function getAuditLogsByEntity(entityType: string, entityId: string, orgId?: mongoose.Types.ObjectId) {
    try {
        const query: Record<string, string> = { entityType, entityId };
        if (orgId) {
            query.orgId = orgId.toString();
        }
        return await AuditLog.find(query).sort({ createdAt: -1 });
    } catch (error) {
        console.error('Error fetching audit logs by entity:', error);
        throw error;
    }
}

export async function createAuditLog(logData: Record<string, unknown>) {
    try {
        const auditLog = new AuditLog(logData);
        return await auditLog.save();
    } catch (error) {
        console.error('Error creating audit log:', error);
        throw error;
    }
}

export default AuditLog;

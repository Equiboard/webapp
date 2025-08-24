import mongoose from "mongoose";
import { AuditLogSchema } from "../schema";

const AuditLog = mongoose.models.AuditLog || mongoose.model("AuditLog", AuditLogSchema);

export async function getAuditLogsByOrg(orgId: mongoose.Types.ObjectId) {
  try {
    return await AuditLog.find({ orgId: orgId.toString() }).sort({ createdAt: -1 });
  } catch (err) {
    console.error("Error fetching audit logs:", err);
    throw err;
  }
}

export async function getAuditLogsByUser(userId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
  try {
    const query: any = { userId: userId.toString() };
    if (orgId) query.orgId = orgId.toString();
    return await AuditLog.find(query).sort({ createdAt: -1 });
  } catch (err) {
    console.error("Error fetching audit logs by user:", err);
    throw err;
  }
}

export async function getAuditLogsByEntity(entityType: string, entityId: string, orgId?: mongoose.Types.ObjectId) {
  try {
    const query: any = { entityType, entityId };
    if (orgId) query.orgId = orgId.toString();
    return await AuditLog.find(query).sort({ createdAt: -1 });
  } catch (err) {
    console.error("Error fetching audit logs by entity:", err);
    throw err;
  }
}

export async function createAuditLog(logData: any) {
  try {
    const auditLog = new AuditLog(logData);
    return await auditLog.save();
  } catch (err) {
    console.error("Error creating audit log:", err);
    throw err;
  }
}

export default AuditLog;
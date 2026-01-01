import mongoose from 'mongoose';
import { AssessmentSchema } from '../schema';
import { logger } from '@/utils/logger';

const Assessment = mongoose.models.Assessment || mongoose.model('Assessment', AssessmentSchema);

export async function getAssessmentsByOrg(orgId: mongoose.Types.ObjectId) {
    try {
        return await Assessment.find({ orgId: orgId.toString() });
    } catch (error) {
        logger.error(error, 'Error fetching assessments:');
        throw error;
    }
}

export async function getAssessmentsByRatee(rateeId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
    try {
        const query: any = { rateeId: rateeId.toString() };
        if (orgId) {
            query.orgId = orgId.toString();
        }
        return await Assessment.find(query);
    } catch (error) {
        logger.error(error, 'Error fetching assessments by ratee:');
        throw error;
    }
}

export async function getAssessmentsByRater(raterId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
    try {
        const query: any = { raterId: raterId.toString() };
        if (orgId) {
            query.orgId = orgId.toString();
        }
        return await Assessment.find(query);
    } catch (error) {
        logger.error(error, 'Error fetching assessments by rater:');
        throw error;
    }
}

export async function getAssessmentsByCriteria(criteriaId: string, orgId: mongoose.Types.ObjectId) {
    try {
        return await Assessment.find({ criteriaId, orgId: orgId.toString() });
    } catch (error) {
        logger.error(error, 'Error fetching assessments by criteria:');
        throw error;
    }
}

export default Assessment;

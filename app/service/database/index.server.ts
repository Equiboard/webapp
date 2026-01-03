import { logger } from '@/utils/logger';
import mongoose from 'mongoose';

let isConnected = false;

export async function connectToDatabase() {
    if (isConnected) {
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mydatabase', {
            maxPoolSize: 10, // Maximum 10 connections in pool
            minPoolSize: 2, // Minimum 2 connections
            maxIdleTimeMS: 30000, // Close connections after 30s idle
        });
        logger.debug('Connected to MongoDB');
        isConnected = true;
    } catch (error) {
        logger.error('Error connecting to MongoDB:' + error);
        throw error;
    }
}

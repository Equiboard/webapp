import mongoose from 'mongoose';
import { NotificationSchema } from '../schema';
import { logger } from '@/utils/logger';

const Notification = mongoose.models.Notification || mongoose.model('Notification', NotificationSchema);

export async function getNotificationsByUser(userId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
    try {
        const query: Record<string, string> = { userId: userId.toString() };
        if (orgId) {
            query.orgId = orgId.toString();
        }
        return await Notification.find(query).sort({ createdAt: -1 });
    } catch (error) {
        logger.error(error, 'Error fetching notifications:');
        throw error;
    }
}

export async function getUnreadNotifications(userId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
    try {
        const query: Record<string, string | boolean> = { userId: userId.toString(), read: false };
        if (orgId) {
            query.orgId = orgId.toString();
        }
        return await Notification.find(query).sort({ createdAt: -1 });
    } catch (error) {
        logger.error(error, 'Error fetching unread notifications:');
        throw error;
    }
}

export async function markNotificationAsRead(notificationId: mongoose.Types.ObjectId) {
    try {
        return await Notification.findByIdAndUpdate(notificationId, { read: true }, { new: true });
    } catch (error) {
        logger.error(error, 'Error marking notification as read:');
        throw error;
    }
}

export async function markAllNotificationsAsRead(userId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
    try {
        const query: any = { userId: userId.toString(), read: false };
        if (orgId) {
            query.orgId = orgId.toString();
        }
        return await Notification.updateMany(query, { read: true });
    } catch (error) {
        logger.error(error, 'Error marking all notifications as read:');
        throw error;
    }
}

export async function createNotification(notificationData: any) {
    try {
        const notification = new Notification(notificationData);
        return await notification.save();
    } catch (error) {
        logger.error('Error creating notification:');
        throw error;
    }
}

export default Notification;

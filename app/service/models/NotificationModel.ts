import mongoose from "mongoose";
import { NotificationSchema } from "../schema";

const Notification = mongoose.models.Notification || mongoose.model("Notification", NotificationSchema);

export async function getNotificationsByUser(userId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
  try {
    const query: any = { userId: userId.toString() };
    if (orgId) query.orgId = orgId.toString();
    return await Notification.find(query).sort({ createdAt: -1 });
  } catch (err) {
    console.error("Error fetching notifications:", err);
    throw err;
  }
}

export async function getUnreadNotifications(userId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
  try {
    const query: any = { userId: userId.toString(), read: false };
    if (orgId) query.orgId = orgId.toString();
    return await Notification.find(query).sort({ createdAt: -1 });
  } catch (err) {
    console.error("Error fetching unread notifications:", err);
    throw err;
  }
}

export async function markNotificationAsRead(notificationId: mongoose.Types.ObjectId) {
  try {
    return await Notification.findByIdAndUpdate(
      notificationId,
      { read: true },
      { new: true }
    );
  } catch (err) {
    console.error("Error marking notification as read:", err);
    throw err;
  }
}

export async function markAllNotificationsAsRead(userId: mongoose.Types.ObjectId, orgId?: mongoose.Types.ObjectId) {
  try {
    const query: any = { userId: userId.toString(), read: false };
    if (orgId) query.orgId = orgId.toString();
    return await Notification.updateMany(query, { read: true });
  } catch (err) {
    console.error("Error marking all notifications as read:", err);
    throw err;
  }
}

export async function createNotification(notificationData: any) {
  try {
    const notification = new Notification(notificationData);
    return await notification.save();
  } catch (err) {
    console.error("Error creating notification:", err);
    throw err;
  }
}

export default Notification;
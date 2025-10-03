import mongoose, { Model } from 'mongoose';
import { UserSchema } from '../schema/user.schema';
import type { IUser } from '@/types';

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export async function getUserOrgs(userId: mongoose.Types.ObjectId) {
    try {
        const user = await User.findOne({ _id: userId });
        return user ? user.organizations : [];
    } catch (error) {
        console.error('Error fetching user organizations:', error);
        throw error;
    }
}
export async function getUserByEmail(email: string) {
    try {
        const user = await User.findOne({ email });
        return user ?? null;
    } catch (error) {
        console.error('Error fetching user organizations:', error);
        throw error;
    }
}
export async function userSignUp(userData: Partial<IUser>) {
    try {
        const user = new User(userData);
        return await user.save();
    } catch (error) {
        console.error('Error in signUp for user', userData, error);
    }
}
export default User;

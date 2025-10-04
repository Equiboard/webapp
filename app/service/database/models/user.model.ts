import mongoose, { Model } from 'mongoose';
import { UserSchema } from '../schema/user.schema';
import type { IUser } from '@/types';

const UserModel: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);

export async function getUserOrgs(userId: mongoose.Types.ObjectId) {
    try {
        const user = await UserModel.findOne({ _id: userId });
        return user ? user.organizations : [];
    } catch (error) {
        console.error('Error fetching user organizations:', error);
        throw error;
    }
}
export async function getUserByEmail(email: string) {
    try {
        const user = await UserModel.findOne({ email });
        return user ?? null;
    } catch (error) {
        console.error('Error fetching user organizations:', error);
        throw error;
    }
}
export async function getUserBy_ID(_id: mongoose.Types.ObjectId) {
    try {
        const user = await UserModel.findOne({ _id });
        return user ?? null;
    } catch (error) {
        console.error('Error fetching user organizations:', error);
        throw error;
    }
}

export async function userSignUp(userData: Partial<IUser>) {
    try {
        return await UserModel.create(userData);
    } catch (error) {
        if (error instanceof mongoose.Error) {
            throw new TypeError('Error in signup', error);
        }
        console.error('Error in signUp for user', userData, error);
        throw error;
    }
}
export default UserModel;

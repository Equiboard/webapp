import mongoose from 'mongoose';
import { UserSchema } from '../schema/user.schema';

const User = mongoose.models.User || mongoose.model('User', UserSchema);

export async function getUserOrgs(userId: mongoose.Types.ObjectId) {
    try {
        const user = await User.findOne({ _id: userId });
        return user ? user.organizations : [];
    } catch (error) {
        console.error('Error fetching user organizations:', error);
        throw error;
    }
}

export default User;

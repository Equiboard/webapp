import Header from '@/components/header';
import ProfileForm from '@/components/profile-form';
import type { Route } from './+types/profile';
import { updateUserProfile } from '@/service/database/models/user.model';
import { authMiddleware } from '@/middleware/auth.server';
import { userContext } from '@/context/user.context';
import { logger } from '@/utils/logger';
import { type SerializedUser } from '@/types/user.types';

function verifyCurrentPassword(inputPassword: string, storedPassword: string): boolean {
    return inputPassword === storedPassword;
}

export function meta() {
    return [{ title: 'Profile - EquiBoard' }, { name: 'description', content: 'Update your profile' }];
}

export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export function loader({ context }: Route.LoaderArgs): { user: SerializedUser } {
    const user = context.get(userContext)!;
    return {
        user: {
            _id: user._id?.toString() || '',
            email: user.email,
            first_name: user.first_name || null,
            last_name: user.last_name || null,
            passwordHash: user.passwordHash || null,
        },
    };
}

export async function action({ request, context }: Route.ActionArgs) {
    const user = context.get(userContext)!;

    const formData = await request.formData();
    const action = formData.get('action')?.toString();

    if (action === 'change_password') {
        const currentPassword = formData.get('current_password')?.toString();
        const newPassword = formData.get('new_password')?.toString();
        const confirmPassword = formData.get('confirm_password')?.toString();

        if (!currentPassword || !newPassword || !confirmPassword) {
            return { error: 'All password fields are required' };
        }

        if (newPassword !== confirmPassword) {
            return { error: 'New passwords do not match' };
        }

        const isValidPassword = verifyCurrentPassword(currentPassword, user.passwordHash || '');
        if (!isValidPassword) {
            return { error: 'Current password is incorrect' };
        }

        try {
            await updateUserProfile(user._id.toString(), { passwordHash: newPassword });
            logger.debug(`Password updated successfully for user: ${user._id}`);
            return { success: 'Password updated successfully!' };
        } catch (error) {
            logger.error(error, 'Error updating password');
            return { error: 'Failed to update password' };
        }
    }

    const firstName = formData.get('first_name')?.toString();
    const lastName = formData.get('last_name')?.toString();

    if (!firstName || !lastName) {
        return { error: 'First name and last name are required' };
    }

    try {
        await updateUserProfile(user._id.toString(), {
            first_name: firstName,
            last_name: lastName,
        });
        logger.debug(`Profile updated successfully for user: ${user._id}`);
        return { success: 'Profile updated successfully!' };
    } catch (error) {
        logger.error(error, 'Error updating profile');
        return { error: 'Failed to update profile' };
    }
}

export default function Profile({ loaderData }: Route.ComponentProps) {
    return (
        <>
            <Header />
            <div className="container mx-auto p-6">
                <ProfileForm user={loaderData.user} />
            </div>
        </>
    );
}

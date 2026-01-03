import Header from '@/components/header';
import ProfileForm from '@/components/profile-form';
import type { Route } from './+types/profile';
import { updateUserProfile } from '@/service/database/models/user.model';
import { requireAuth } from '@/utils/auth.server';
import { logger } from '@/utils/logger';
import type { IUser } from '@/types';

export function meta() {
    return [{ title: 'Profile - EquiBoard' }, { name: 'description', content: 'Update your profile' }];
}

export async function loader({ request }: Route.LoaderArgs): Promise<{ user: IUser }> {
    const user = await requireAuth(request);
    return { user };
}

export async function action({ request }: Route.ActionArgs) {
    const user = await requireAuth(request);

    const formData = await request.formData();
    const firstName = formData.get('first_name')?.toString();
    const lastName = formData.get('last_name')?.toString();
    const password = formData.get('password')?.toString();

    if (!firstName || !lastName) {
        return { error: 'First name and last name are required' };
    }

    try {
        const updateData: Partial<{ first_name: string; last_name: string; passwordHash: string }> = {
            first_name: firstName,
            last_name: lastName,
        };

        if (password && password.trim() !== '') {
            updateData.passwordHash = password;
        }

        await updateUserProfile(user._id.toString(), updateData);
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

import { connectToDatabase } from '@/service/database/index.server';
import { getUserBy_ID } from '@/service/database/models/user.model';
import { getSession, USER_SESSION_KEY } from '@/service/session.server';
import { redirect } from 'react-router';

export async function requireAuth(request: Request) {
    await connectToDatabase();

    const session = await getSession(request);
    const userId = session.get(USER_SESSION_KEY);

    if (!userId) {
        throw redirect('/login');
    }

    const user = await getUserBy_ID(userId);
    if (!user) {
        throw redirect('/login');
    }

    return user;
}

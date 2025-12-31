import { userContext } from '@/context/user.context';
import { getUserBy_ID } from '@/service/database/models/user.model';
import { getSession, USER_SESSION_KEY } from '@/service/session.server';

import { redirect } from 'react-router';

export async function authMiddleware({ request, context }: any) {
    const session = await getSession(request);
    const userId = session.get(USER_SESSION_KEY);
    console.log('Session user_id in AuthMiddleware:', userId);
    if (!userId) {
        throw redirect('/login');
    }

    const user = await getUserBy_ID(userId);
    console.log('USER FOUND:', !!user);
    if (user) {
        context.set(userContext, user);
    }
}

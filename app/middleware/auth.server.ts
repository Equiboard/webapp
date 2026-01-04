import { userContext } from '@/context/user.context';
import { getUserBy_ID } from '@/service/database/models/user.model';
import { getSession, USER_SESSION_KEY } from '@/service/session.server';
import { logger } from '@/utils/logger';

import { redirect } from 'react-router';

export async function authMiddleware({ request, context }: any) {
    const session = await getSession(request);
    const userId = session.get(USER_SESSION_KEY);
    logger.debug('Session user_id in AuthMiddleware:' + userId);
    if (!userId) {
        throw redirect('/login');
    }

    const user = await getUserBy_ID(userId);
    logger.debug('USER FOUND:' + !!user);
    if (user) {
        context.set(userContext, user);
    } else {
        throw redirect('/login');
    }
}

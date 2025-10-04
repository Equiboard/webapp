import { createCookieSessionStorage, redirect } from 'react-router';
export const USER_SESSION_KEY = 'userId';
const sessionStorage = createCookieSessionStorage({
    cookie: {
        name: '__session',
        httpOnly: true,
        path: '/',
        sameSite: 'lax',
        secrets: [process.env.SESSION_SECRET!],
        secure: process.env.NODE_ENV === 'production',
    },
});

export async function getSession(request: Request) {
    const cookie = request.headers.get('Cookie');
    return await sessionStorage.getSession(cookie);
}

export async function logout(request: Request) {
    const session = await getSession(request);
    return redirect('/', {
        headers: {
            'Set-Cookie': await sessionStorage.destroySession(session),
        },
    });
}

export async function createUserSession(request: Request, userId: string) {
    const session = await getSession(request);
    session.set(USER_SESSION_KEY, userId);
    return redirect('/dashboard', {
        headers: {
            'Set-Cookie': await sessionStorage.commitSession(session, {
                maxAge: 60 * 60,
            }),
        },
    });
}

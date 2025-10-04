import { logout } from '@/service/session.server';
import { redirect } from 'react-router';
import type { Route } from './+types/logout';

export async function action({ request }: Route.ActionArgs) {
    return await logout(request);
}
export function loader() {
    return redirect('/');
}

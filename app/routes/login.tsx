import Header from '@/components/header';
import LoginForm from '@/components/login-form';
import type { Route } from './+types/login';
import { connectToDatabase } from '@/service/database/index.server';
import { getUserByEmail, userSignUp } from '@/service/database/models/user.model';
import { useCallback, useState } from 'react';
import { redirect } from 'react-router';

export function meta() {
    return [{ title: 'EquiBoard' }, { name: 'description', content: 'Login to EquiBoard' }];
}

export async function action({ request }: Route.ActionArgs) {
    await connectToDatabase();
    const formData = await request.formData();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    console.log(email, password);
    if (email && password) {
        const userDetails = await getUserByEmail(email);
        if (userDetails) {
            return redirect('/dashboard');
        } else {
            // TODO this is temporary
            await userSignUp({ email, passwordHash: password });
            return redirect('/dashboard');
        }
    }
    return { error: 'Invalid email or password' };
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.VALUE_FROM_EXPRESS };
}

export default function Login({ actionData }: Route.ComponentProps) {
    const [isSignIn, setIsSignIn] = useState(true);

    const toggleSignin = useCallback(() => {
        setIsSignIn((old) => !old);
    }, [setIsSignIn]);
    console.error(actionData?.error);
    console.log(isSignIn);
    return (
        <>
            <Header />
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <LoginForm toggleSignin={toggleSignin} className="" />
                </div>
            </div>
        </>
    );
}

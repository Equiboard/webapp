import Header from '@/components/header';
import LoginForm from '@/components/login-form';
import type { Route } from './+types/login';
import { connectToDatabase } from '@/service/database/index.server';
import { getUserByEmail, userSignUp } from '@/service/database/models/user.model';
import { useCallback, useLayoutEffect, useRef } from 'react';
import SignUpForm from '@/components/signup-form';
import { createUserSession } from '@/service/session.server';
import type { IUser } from '@/types';
import { useSearchParams } from 'react-router';

export function meta() {
    return [{ title: 'EquiBoard' }, { name: 'description', content: 'Login to EquiBoard' }];
}

export async function action({ request }: Route.ActionArgs) {
    await connectToDatabase();
    const formData = await request.formData();
    console.log(formData);
    const intent = formData.get('intent')?.toString();
    const email = formData.get('email')?.toString();
    const password = formData.get('password')?.toString();
    console.log(email, password);

    if (!email || !password) {
        return { error: 'Email and password required' };
    }
    if (intent === 'signup') {
        let userDetails = await getUserByEmail(email);
        if (userDetails) {
            return {
                error: 'Email already registered. Please Login',
            };
        } else {
            console.log('Email not found');
            const firstName = formData.get('first')?.toString();
            const lastName = formData.get('last')?.toString();
            const confirmPassword = formData.get('cpassword')?.toString();
            if (password !== confirmPassword) {
                return { error: 'Passwords dont match' };
            }
            const user: Partial<IUser> = {
                first_name: firstName,
                last_name: lastName,
                passwordHash: password,
                email,
            };
            userDetails = await userSignUp(user);
            return await createUserSession(request, userDetails._id.toString());
        }
    }
    if (intent === 'login') {
        const userDetails = await getUserByEmail(email);

        return userDetails ? await createUserSession(request, userDetails._id.toString()) : { error: 'Please Sign Up' };
    }

    return { error: 'Invalid form' };
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.VALUE_FROM_EXPRESS };
}

export default function Login({ actionData }: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const cardWrapper = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const signUpIntent = searchParams?.get('tab') === 'signup';
        if (signUpIntent && cardWrapper.current) {
            cardWrapper.current?.classList.toggle('rotate-y-180');
        }
    }, []);

    const toggleSignin = useCallback(() => {
        const element = cardWrapper.current;
        element?.classList.toggle('rotate-y-180');
        setSearchParams((searchParams) => {
            const currentTab = searchParams.get('tab');
            if (currentTab && currentTab === 'signup') {
                searchParams.delete('tab');
            } else {
                searchParams.set('tab', 'signup');
            }
            return searchParams;
        });
    }, [cardWrapper, setSearchParams]);

    console.error(actionData?.error);

    return (
        <>
            <Header />
            <div className="bg-muted flex min-h-svh items-center justify-center p-6 perspective-distant md:p-10">
                <div ref={cardWrapper} className="relative flex w-full max-w-sm items-center justify-center transition-transform duration-1000 transform-3d md:max-w-3xl">
                    <LoginForm toggleSignin={toggleSignin} className="absolute backface-hidden" />
                    <SignUpForm toggleSignin={toggleSignin} className="absolute rotate-y-180 backface-hidden" />
                </div>
            </div>
        </>
    );
}

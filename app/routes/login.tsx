import Header from '@/components/header';
import LoginForm from '@/components/login-form';
import type { Route } from './+types/login';

export function meta() {
    return [{ title: 'EquiBoard' }, { name: 'description', content: 'Login to EquiBoard' }];
}

export async function action({ request }: Route.ActionArgs) {
    const formData = await request.formData();
    const email = formData.get('email');
    const password = formData.get('email');
    console.log(email, password);
    return 'Done';
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.VALUE_FROM_EXPRESS };
}

export default function Login({ actionData }: Route.ComponentProps) {
    console.log(actionData);
    return (
        <>
            <Header />
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
                <div className="w-full max-w-sm md:max-w-3xl">
                    <LoginForm />
                </div>
            </div>
        </>
    );
}

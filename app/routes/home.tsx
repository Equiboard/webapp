import Header from '@/components/header';
import type { Route } from './+types/home';

export function meta() {
    return [{ title: 'EquiBoard' }, { name: 'description', content: 'Welcome to EquiBoard!' }];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    console.log(loaderData);
    return (
        <div>
            <Header />
            <div id="hero" className=""></div>
        </div>
    );
}

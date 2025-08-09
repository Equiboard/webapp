import Header from '~/shared-components/headers';
import type { Route } from './+types/home';

export function meta() {
    return [{ title: 'EquiBoard' }, { name: 'description', content: 'Welcome to EquiBoard!' }];
}

export function loader({ context }: Route.LoaderArgs) {
    return { message: context.VALUE_FROM_EXPRESS };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            <Header pageType="Dashboard" />
        </div>
    );
}

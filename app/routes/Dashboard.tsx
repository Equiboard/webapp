import Header from '~/shared-components/Header';
import OrgCard from '~/shared-components/OrgCard';
import type { Route } from './+types/dashboard';

export function meta() {
    return [{ title: 'EquiBoard' }, { name: 'description', content: 'Welcome to EquiBoard!' }];
}

export function loader({ context }: Route.LoaderArgs) {
    return {
        organizations: context.dashboardData.getOrganizations(),
        recentActivity: context.dashboardData.getRecentActivity(),
    };
}

export default function Dashboard({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            <Header pageType="Dashboard" />
            <div>
                <section className="container-padding-x py-8">
                    <div className="flex justify-between">
                        <button>My Organizations</button>
                        <button>Create New Organization</button>
                    </div>
                </section>
                <section className="container-padding-x flex flex-col sm:flex-row md:justify-between flex-wrap">
                    {loaderData.organizations.map((card) => (
                        <OrgCard key={card.OrgName} cardProps={card} addClass="md:w-[45%] w-full rounded-xl m-2" />
                    ))}
                </section>
                <section className="container-padding-x py-8">
                    <div>RECENT ACTIVITY</div>
                    <ul className="py-2">
                        {loaderData.recentActivity.map((activity, i) => (
                            <li key={i}> {activity}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}

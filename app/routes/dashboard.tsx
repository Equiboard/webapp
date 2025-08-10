import Header from '~/shared-components/headers';
import { mockData, mockRecentActivity } from '~/mockData';
import OrgCard from '~/shared-components/orgCard';

export default function Dashboard() {
    return (
        <div>
            <Header pageType="Dashboard" />
            <div>
                <section className="container-padding-x py-8">
                    <div className="flex justify-between">
                        <div>My Organizations</div>
                        <div>Create New Organization</div>
                    </div>
                </section>
                <section className="container-padding-x flex flex-col sm:flex-row md:justify-between flex-wrap">
                    {mockData.map((card) => {
                        return <OrgCard key={card.OrgName} cardProps={card} addClass="md:w-[45%] w-full rounded-xl m-2" />;
                    })}
                </section>
                <section className="container-padding-x py-8">
                    <div>RECENT ACTIVITY</div>
                    <ul className="py-2">
                        {mockRecentActivity.map((Recent) => (
                            <li> {Recent}</li>
                        ))}
                    </ul>
                </section>
            </div>
        </div>
    );
}

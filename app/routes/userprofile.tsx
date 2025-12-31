import Header from '@/components/header';
import OrgCard from '@/components/org-card';

export default function userprofile() {
    const orgs = [
        {
            OrgName: 'Googil',
            Equity: '40',
            Members: '3',
            ButtonLabel: 'Click here',
        },
        {
            OrgName: 'Aapil',
            Equity: '60',
            Members: '10',
            ButtonLabel: 'Click here',
        },
    ];

    const recentActivities = [
        {
            id: '1',
            message: 'John D. submitted time contribution in TechStartup',
            timestamp: '2h ago',
        },
        {
            id: '2',
            message: 'Sarah M. voted on your expertise criteria in DesignCo',
            timestamp: '5h ago',
        },
        {
            id: '3',
            message: 'New member invitation sent to mark@example.com',
            timestamp: '1d ago',
        },
        {
            id: '4',
            message: 'Equity configuration completed for AI Solutions',
            timestamp: '2d ago',
        },
    ];

    return (
        <div>
            <Header headerType="user-section" />
            <div className="container-padding-x">
                <div className="flex items-center justify-between gap-4 py-2">
                    <h1 className="text-lg font-semibold tracking-tight">My Organizations</h1>

                    <button type="button" className="hover:bg-muted focus:ring-ring rounded-md border px-4 py-2 text-sm font-medium transition-colors focus:ring-2 focus:outline-none">
                        Create New Organization
                    </button>
                </div>
                <div className="flex py-4">
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                        {orgs.map((org) => (
                            <OrgCard
                                key={org.OrgName}
                                cardProps={org}
                                onViewDetails={() => {
                                    console.log('View details for:', org.OrgName);
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="bg-background rounded-lg border p-4">
                    <h2 className="text-muted-foreground mb-3 text-sm font-semibold tracking-wide uppercase">Recent Activity</h2>

                    <ul className="space-y-3">
                        {recentActivities.map((activity) => (
                            <li className="text-muted-foreground flex items-start gap-2 text-sm" key={activity.id}>
                                <span className="bg-foreground mt-1 h-1.5 w-1.5 shrink-0 rounded-full" />
                                <span>
                                    {activity.message} <span className="text-muted-foreground text-xs">({activity.timestamp})</span>
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

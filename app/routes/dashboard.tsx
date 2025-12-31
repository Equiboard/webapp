import { AppSidebar } from '@/components/sidebar';
import Header from '@/components/header';
import { Separator } from '@/components/ui/separator';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import type { Route } from './+types/dashboard';
import { connectToDatabase } from '@/service/database/index.server';

import avavtar from '@/assets/img/avataaars.png';
import { authMiddleware } from '@/middleware/auth.server';
import { userContext } from '@/context/user.context';

// This is sample data.
const data = {
    user: {
        name: 'demo',
        email: 'm@example.com',
        avatar: avavtar,
    },
    teams: [
        {
            name: 'Property Management',
            logo: 'GalleryVerticalEnd',
            plan: 'Enterprise',
        },
        {
            name: 'Money Management',
            logo: 'AudioWaveform',
            plan: 'Startup',
        },
        {
            name: 'Password Hashing',
            logo: 'Command',
            plan: 'Free',
        },
    ],
    navMain: [
        {
            title: 'Playground',
            url: '#',
            icon: 'SquareTerminal',
            isActive: true,
            items: [
                {
                    title: 'History',
                    url: '#',
                },
                {
                    title: 'Starred',
                    url: '#',
                },
                {
                    title: 'Settings',
                    url: '#',
                },
            ],
        },
        {
            title: 'Models',
            url: '#',
            icon: 'Bot',
            items: [
                {
                    title: 'Genesis',
                    url: '#',
                },
                {
                    title: 'Explorer',
                    url: '#',
                },
                {
                    title: 'Quantum',
                    url: '#',
                },
            ],
        },
        {
            title: 'Documentation',
            url: '#',
            icon: 'BookOpen',
            items: [
                {
                    title: 'Introduction',
                    url: '#',
                },
                {
                    title: 'Get Started',
                    url: '#',
                },
                {
                    title: 'Tutorials',
                    url: '#',
                },
                {
                    title: 'Changelog',
                    url: '#',
                },
            ],
        },
        {
            title: 'Settings',
            url: '#',
            icon: 'Settings2',
            items: [
                {
                    title: 'General',
                    url: '#',
                },
                {
                    title: 'Team',
                    url: '#',
                },
                {
                    title: 'Billing',
                    url: '#',
                },
                {
                    title: 'Limits',
                    url: '#',
                },
            ],
        },
    ],
    projects: [
        {
            name: 'Design Engineering',
            url: '#',
            icon: 'Frame',
        },
        {
            name: 'Sales & Marketing',
            url: '#',
            icon: 'PieChart',
        },
        {
            name: 'Travel',
            url: '#',
            icon: 'Map',
        },
    ],
};
export const middleware: Route.MiddlewareFunction[] = [authMiddleware];

export async function loader({ context }: Route.LoaderArgs) {
    await connectToDatabase();
    const user = context.get(userContext);
    return { ...data, user };
}

export default function Page({ loaderData }: Route.ComponentProps) {
    // console.log(loaderData);
    return (
        <SidebarProvider>
            <AppSidebar data={loaderData} />
            <SidebarInset>
                <header className="flex h-16 w-full shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex w-full items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                        <Separator orientation="vertical" className="mr-2 data-[orientation=vertical]:h-4" />
                        <Header />
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                        <div className="bg-muted/50 aspect-video rounded-xl" />
                    </div>
                    <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min" />
                </div>
            </SidebarInset>
        </SidebarProvider>
    );
}

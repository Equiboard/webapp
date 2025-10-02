import type { IOrgCard } from '~/models/org-card.model';

export const mockData: IOrgCard[] = [
    {
        OrgName: 'TechStartup Inc',
        Equity: '25.5%',
        Members: '4',
        ButtonLabel: 'View Details',
    },
    {
        OrgName: 'GreenEnergy Solutions',
        Equity: '40%',
        Members: '10',
        ButtonLabel: 'Explore',
    },
    {
        OrgName: 'HealthPlus Corp',
        Equity: '15%',
        Members: '6',
        ButtonLabel: 'View Details',
    },
    {
        OrgName: 'EduVision Labs',
        Equity: '30%',
        Members: '8',
        ButtonLabel: 'Learn More',
    },
    {
        OrgName: 'FinTech Innovators',
        Equity: '50%',
        Members: '12',
        ButtonLabel: 'Open Profile',
    },
];

export const mockRecentActivity = ['John D. submitted time contribution in TechStartup (2h ago)', 'Sarah M. voted on your expertise criteria in DesignCo (5h ago)', 'New member invitation sent to mark@example.com (1d ago)'];

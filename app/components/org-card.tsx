import type { IOrgCard } from '@/types/org-card.types';

interface OrgCardProps {
    cardProps: IOrgCard;
    onViewDetails?: () => void;
}

export default function OrgCard({ cardProps, onViewDetails }: OrgCardProps) {
    return (
        <div className="bg-background flex flex-col justify-between rounded-lg border p-4 shadow-sm transition-shadow hover:shadow-md">
            <div className="space-y-1">
                <h3 className="text-lg font-semibold">{cardProps.OrgName}</h3>

                <p className="text-muted-foreground text-sm">Your equity: {cardProps.Equity}%</p>

                <p className="text-muted-foreground text-sm">Members: {cardProps.Members}</p>
            </div>

            <button onClick={onViewDetails} className="hover:bg-muted mt-4 w-fit rounded-md border px-3 py-1.5 text-sm font-medium transition-colors">
                {cardProps.ButtonLabel ?? 'View Details'}
            </button>
        </div>
    );
}

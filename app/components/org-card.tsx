import type { JSX } from 'react';
import type { IOrgCard } from '@/types/org-card.types';

export default function orgCard({ cardProps, addClass }: { cardProps: IOrgCard; addClass: string }): JSX.Element {
    return (
        <div className={`flex flex-col justify-center border-1 border-white p-4 ${addClass}`}>
            <div>{cardProps.OrgName}</div>
            <div>{cardProps.Equity}</div>
            <div>{cardProps.Members}</div>
            <button>{cardProps.ButtonLabel}</button>
        </div>
    );
}

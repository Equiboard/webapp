import type { JSX } from 'react';
import type { IOrgCard } from '~/models/OrgCard.model';

export default function orgCard({ cardProps, addClass }: { cardProps: IOrgCard; addClass: string }): JSX.Element {
    return (
        <div className={`flex flex-col p-4 justify-center border-white border-1 ${addClass}`}>
            <div>{cardProps.OrgName}</div>
            <div>{cardProps.Equity}</div>
            <div>{cardProps.Members}</div>
            <button>{cardProps.ButtonLabel}</button>
        </div>
    );
}

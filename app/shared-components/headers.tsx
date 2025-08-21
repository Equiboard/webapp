export default function Header({ pageType }: { pageType: string }) {
    return (
        <header>
            <div className="flex justify-between container-padding-x py-4">
                <div>EquiBoard{pageType ? ` - ${pageType}` : ''} </div>
                <div>User Section</div>
            </div>
        </header>
    );
}

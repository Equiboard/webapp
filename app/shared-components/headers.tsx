export default function Header({ pageType }: { pageType: string }) {
    return (
        <header>
            <div className="flex justify-between container-padding-x py-4 font-sans ">
                <div className="text-3xl">EquiBoard{pageType ? ` - ${pageType}` : ''} </div>
                <div className="text-3xl">User Section</div>
            </div>
        </header>
    );
}

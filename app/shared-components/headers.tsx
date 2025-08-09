export default function Header({ pageType }: { pageType: string }) {
    return (
        <header>
            <div className="flex justify-between px-8 py-4">
                <div>EquiBoard - {pageType} </div>
                <div>User Section</div>
            </div>
        </header>
    );
}

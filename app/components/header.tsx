import type { HeaderProps } from '@/types/header.types';
import UserProfileDropdown from './header/user-profile-dropdown';

export default function Header({ headerType }: HeaderProps) {
    return (
        <header className="container-padding-x bg-background text-foreground flex flex-1 justify-between py-4">
            <div className="text-center text-2xl font-extrabold">EquiBoard </div>
            {headerType === 'user-section' && (
                <div>
                    <UserProfileDropdown />
                </div>
            )}
        </header>
    );
}

import * as DropdownMenu from '@radix-ui/react-dropdown-menu';
import * as Avatar from '@radix-ui/react-avatar';
import { LogOut, Settings, User } from 'lucide-react';

export default function UserProfileDropdown() {
    return (
        <DropdownMenu.Root>
            {/* Trigger */}
            <DropdownMenu.Trigger asChild>
                <button className="focus:ring-ring flex items-center gap-2 rounded-full focus:ring-2 focus:outline-none" aria-label="User menu">
                    <Avatar.Root className="bg-muted h-9 w-9 overflow-hidden rounded-full">
                        <Avatar.Image src="/avatar.png" alt="User avatar" className="h-full w-full object-cover" />
                        <Avatar.Fallback className="flex h-full w-full items-center justify-center text-sm font-medium">U</Avatar.Fallback>
                    </Avatar.Root>
                </button>
            </DropdownMenu.Trigger>

            {/* Dropdown */}
            <DropdownMenu.Portal>
                <DropdownMenu.Content
                    align="end"
                    sideOffset={8}
                    className="bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0 data-[state=open]:zoom-in-95 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=top]:slide-in-from-bottom-2 z-50 min-w-[180px] rounded-md border p-1 shadow-md"
                >
                    <DropdownMenu.Item className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm outline-none">
                        <User size={16} />
                        Profile
                    </DropdownMenu.Item>

                    <DropdownMenu.Item className="hover:bg-muted flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm outline-none">
                        <Settings size={16} />
                        Settings
                    </DropdownMenu.Item>

                    <DropdownMenu.Separator className="bg-border my-1 h-px" />

                    <DropdownMenu.Item className="flex cursor-pointer items-center gap-2 rounded px-2 py-2 text-sm text-red-600 outline-none hover:bg-red-50">
                        <LogOut size={16} />
                        Logout
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Portal>
        </DropdownMenu.Root>
    );
}

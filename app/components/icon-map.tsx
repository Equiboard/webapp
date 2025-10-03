import * as LucideIcons from 'lucide-react';
import type { LucideIcon, LucideProps } from 'lucide-react';

import type { ReactElement } from 'react';

export function SpecificIcon({ iconString, ...props }: LucideProps & { iconString: string }): ReactElement {
    const IconComponent = LucideIcons[iconString as keyof typeof LucideIcons] as LucideIcon;
    return <IconComponent {...props} />;
}

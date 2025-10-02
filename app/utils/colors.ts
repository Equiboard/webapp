export type colorType = 'primary' | 'secondary' | 'tertiary' | 'alternate';

const textMap: Record<colorType, string> = {
    primary: 'text-black',
    secondary: 'text-black',
    tertiary: 'text-tertiary',
    alternate: 'text-quaternary',
};

export function mapTextColor(bgcolor: colorType): string {
    return textMap[bgcolor];
}

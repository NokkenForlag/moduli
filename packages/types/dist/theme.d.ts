export type ThemeMode = 'dark' | 'light' | 'cosmic' | 'ocean';
export interface ThemeColors {
    background: string;
    surface: string;
    surfaceHover: string;
    text: string;
    textSecondary: string;
    textMuted: string;
    border: string;
    borderHover: string;
    primary: string;
    primaryHover: string;
    primaryText: string;
    success: string;
    warning: string;
    error: string;
}
export interface ThemeGlass {
    blur: {
        none: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
    };
    opacity: {
        low: number;
        medium: number;
        high: number;
        full: number;
    };
}
export interface ThemeSpacing {
    px: string;
    0: string;
    0.5: string;
    1: string;
    1.5: string;
    2: string;
    2.5: string;
    3: string;
    3.5: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
    12: string;
    14: string;
    16: string;
    20: string;
    24: string;
    28: string;
    32: string;
}
export interface ThemeRadius {
    none: string;
    sm: string;
    DEFAULT: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    full: string;
}
export interface ThemeTypography {
    fontFamily: {
        sans: string[];
        mono: string[];
        display: string[];
    };
    fontSize: {
        [key: string]: [string, {
            lineHeight: string;
        }];
    };
    fontWeight: {
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
    };
    letterSpacing: {
        tighter: string;
        tight: string;
        normal: string;
        wide: string;
        wider: string;
        widest: string;
    };
}
export interface ThemeAnimation {
    duration: {
        fast: string;
        normal: string;
        slow: string;
    };
    easing: {
        default: string;
        in: string;
        out: string;
        inOut: string;
    };
}
export interface ThemeShadows {
    none: string;
    sm: string;
    DEFAULT: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
    inner: string;
}
export interface Theme {
    name: ThemeMode;
    colors: ThemeColors;
    glass: ThemeGlass;
    spacing: ThemeSpacing;
    radius: ThemeRadius;
    typography: ThemeTypography;
    animation: ThemeAnimation;
    shadows: ThemeShadows;
}
//# sourceMappingURL=theme.d.ts.map
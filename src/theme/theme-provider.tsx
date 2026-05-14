import { useMemo } from 'react';

export interface ThemeColors {
  primary?: string;
  onPrimary?: string;
  primarySoft?: string;

  surface?: string;
  onSurface?: string;

  success?: string;
  successSoft?: string;
  warning?: string;
  warningSoft?: string;
  danger?: string;
  dangerSoft?: string;
  info?: string;
  infoSoft?: string;

  background?: string;
  onBackground?: string;
  border?: string;
}

export interface ThemeRadius {
  sm?: string;
  md?: string;
  lg?: string;
}

export interface ThemeSpacing {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export interface ThemeFontSize {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export interface ThemeSize {
  xs?: string;
  sm?: string;
  md?: string;
  lg?: string;
  xl?: string;
}

export interface ThemeShadow {
  shadow?: string;
}

export interface Theme {
  colors?: ThemeColors;
  radius?: ThemeRadius;
  spacing?: ThemeSpacing;
  fontSize?: ThemeFontSize;
  size?: ThemeSize;
  shadow?: ThemeShadow;
  fontFamilyBase?: string;
}

export interface ThemeProviderProps {
  theme?: Theme;
  children: React.ReactNode;
}

function buildCssVars(theme: Theme): React.CSSProperties {
  const vars: Record<string, string> = {};

  const c = theme.colors ?? {};
  if (c.primary !== undefined) vars['--color-primary'] = c.primary;
  if (c.onPrimary !== undefined) vars['--color-on-primary'] = c.onPrimary;
  if (c.primarySoft !== undefined) vars['--color-primary-soft'] = c.primarySoft;
if (c.surface !== undefined) vars['--color-surface'] = c.surface;
  if (c.onSurface !== undefined) vars['--color-on-surface'] = c.onSurface;
  if (c.success !== undefined) vars['--color-success'] = c.success;
  if (c.successSoft !== undefined) vars['--color-success-soft'] = c.successSoft;
  if (c.warning !== undefined) vars['--color-warning'] = c.warning;
  if (c.warningSoft !== undefined) vars['--color-warning-soft'] = c.warningSoft;
  if (c.danger !== undefined) vars['--color-danger'] = c.danger;
  if (c.dangerSoft !== undefined) vars['--color-danger-soft'] = c.dangerSoft;
  if (c.info !== undefined) vars['--color-info'] = c.info;
  if (c.infoSoft !== undefined) vars['--color-info-soft'] = c.infoSoft;
  if (c.background !== undefined) vars['--color-background'] = c.background;
  if (c.onBackground !== undefined) vars['--color-on-background'] = c.onBackground;
  if (c.border !== undefined) vars['--color-border'] = c.border;

  const r = theme.radius ?? {};
  if (r.sm !== undefined) vars['--radius-sm'] = r.sm;
  if (r.md !== undefined) vars['--radius-md'] = r.md;
  if (r.lg !== undefined) vars['--radius-lg'] = r.lg;

  const sp = theme.spacing ?? {};
  if (sp.xs !== undefined) vars['--spacing-xs'] = sp.xs;
  if (sp.sm !== undefined) vars['--spacing-sm'] = sp.sm;
  if (sp.md !== undefined) vars['--spacing-md'] = sp.md;
  if (sp.lg !== undefined) vars['--spacing-lg'] = sp.lg;
  if (sp.xl !== undefined) vars['--spacing-xl'] = sp.xl;

  const fs = theme.fontSize ?? {};
  if (fs.xs !== undefined) vars['--font-size-xs'] = fs.xs;
  if (fs.sm !== undefined) vars['--font-size-sm'] = fs.sm;
  if (fs.md !== undefined) vars['--font-size-md'] = fs.md;
  if (fs.lg !== undefined) vars['--font-size-lg'] = fs.lg;
  if (fs.xl !== undefined) vars['--font-size-xl'] = fs.xl;

  const sz = theme.size ?? {};
  if (sz.xs !== undefined) vars['--size-xs'] = sz.xs;
  if (sz.sm !== undefined) vars['--size-sm'] = sz.sm;
  if (sz.md !== undefined) vars['--size-md'] = sz.md;
  if (sz.lg !== undefined) vars['--size-lg'] = sz.lg;
  if (sz.xl !== undefined) vars['--size-xl'] = sz.xl;

  const sh = theme.shadow ?? {};
  if (sh.shadow !== undefined) vars['--shadow'] = sh.shadow;

  if (theme.fontFamilyBase !== undefined)
    vars['--font-family-base'] = theme.fontFamilyBase;

  return vars as React.CSSProperties;
}

export function ThemeProvider({ theme, children }: ThemeProviderProps) {
  const style = useMemo(() => buildCssVars(theme ?? {}), [theme]);
  return <div style={style}>{children}</div>;
}

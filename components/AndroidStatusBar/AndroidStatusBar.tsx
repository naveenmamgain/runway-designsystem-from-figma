import React, { type CSSProperties, type ReactNode } from "react";

/**
 * Runway AndroidStatusBar — Figma: Android status bar (701:124217).
 * Requires tokens/tokens.css. Spacing is raw (unbound in Figma). Icon/clock colour is the remote style
 * Color/Palette/Gray/400 (#aeb6c3), mapped to the local --base-gray-gray-400.
 */

export interface AndroidStatusBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Clock text. Figma default "12:30". */
  time?: ReactNode;
  /** Wi-Fi, cellular and battery glyphs (Figma: wifi 18.05×16, cellular 16×16, battery 16×16). Paint with currentColor. */
  icons?: ReactNode;
}

export function AndroidStatusBar({ time = "12:30", icons, style, ...rest }: AndroidStatusBarProps) {
  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end", // counter axis MAX
    justifyContent: "center",
    width: "100%",
    padding: "6px 16px", // raw
    gap: 10, // raw; single child, no visual effect
    background: "var(--surface-neutral-white)",
    ...style,
  };
  const row: CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: 4, // raw
    color: "var(--base-gray-gray-400)", // remote style Color/Palette/Gray/400
  };
  const clock: CSSProperties = {
    // Figma: Roboto Medium 14, line height auto, no text style.
    fontFamily: "Roboto, var(--cap-app-typeface)",
    fontWeight: 500,
    fontSize: 14,
    lineHeight: "normal",
    letterSpacing: 0,
    textAlign: "right",
    color: "var(--base-gray-gray-400)",
  };
  return (
    <div role="presentation" style={root} {...rest}>
      <div style={row}>
        {icons && <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }} aria-hidden>{icons}</span>}
        <span style={clock}>{time}</span>
      </div>
    </div>
  );
}

export default AndroidStatusBar;

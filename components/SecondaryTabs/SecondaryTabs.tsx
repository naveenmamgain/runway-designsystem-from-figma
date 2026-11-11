import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway SecondaryTabs — Figma: Secondary Tabs (1332:6192) and .Sec Tab Box (1326:6066).
 * Requires tokens/tokens.css. Colours, radius and typography are tokens; spacing, height and the
 * unselected opacity are raw (unbound in Figma).
 */

export interface SecTabBoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma "Tab Selected". */
  selected?: boolean;
  children?: ReactNode;
}

/** `.Sec Tab Box` — private part. */
export function SecTabBox({ selected = false, children = "Secondary Tab", style, ...rest }: SecTabBoxProps) {
  const box: CSSProperties = {
    boxSizing: "border-box",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "none",
    gap: 8, // raw
    height: 36, // raw
    padding: "8px 16px", // raw
    borderRadius: "var(--button-radius)",
    border: "none",
    background: selected ? "var(--surface-brand-primary-b)" : "var(--surface-neutral-light)",
    opacity: selected ? 1 : 0.8, // raw layer opacity on unselected tab
    cursor: "pointer",
    ...style,
  };
  const label: CSSProperties = {
    ...(selected ? textStyles["Button/Small/Bold"] : textStyles["Button/Small/Med"]),
    color: selected ? "var(--text-onsurface-inverse)" : "var(--text-onsurface-default)",
    whiteSpace: "nowrap",
  };
  return (
    <button type="button" role="tab" aria-selected={selected} style={box} {...rest}>
      <span style={label}>{children}</span>
    </button>
  );
}

export interface SecondaryTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /**
   * 2–7 labels. Figma always shows Tabs 1–2; Tabs 3–7 are toggled by "Show Tab 3…7" (all default true).
   * Defaults to "Secondary Tab 1" … "Secondary Tab 7".
   */
  tabs?: ReactNode[];
  /** Zero-based index of the selected tab (Figma "Selected Tab", default Tab 1). */
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

const DEFAULT_TABS = [1, 2, 3, 4, 5, 6, 7].map((n) => `Secondary Tab ${n}`);

export function SecondaryTabs({ tabs = DEFAULT_TABS, selectedIndex = 0, onChange, style, ...rest }: SecondaryTabsProps) {
  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    width: "100%",
    padding: "12px 16px", // raw
    overflowX: "auto", // Figma: overflow direction HORIZONTAL
    ...style,
  };
  return (
    <div style={root} {...rest}>
      <div role="tablist" style={{ display: "flex", alignItems: "center", gap: 8 /* raw */ }}>
        {tabs.slice(0, 7).map((t, i) => (
          <SecTabBox key={i} selected={i === selectedIndex} onClick={() => onChange?.(i)}>
            {t}
          </SecTabBox>
        ))}
      </div>
    </div>
  );
}

export default SecondaryTabs;

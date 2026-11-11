import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway PrimaryTabs — Figma: Primary Tabs (1326:6014), built from .2 Tabs (1323:5924), .3 Tabs (1326:5940)
 * and .Pri Tab Box (1323:5311). Requires tokens/tokens.css.
 * Colours and typography are tokens; spacing and the highlighter geometry are raw (unbound in Figma).
 */

export type PriTabState = "Default" | "Selected";

export interface PriTabBoxProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  state?: PriTabState;
  children?: ReactNode;
}

/** `.Pri Tab Box` — private part. */
export function PriTabBox({ state = "Default", children = "Tab 1", style, ...rest }: PriTabBoxProps) {
  const selected = state === "Selected";
  const box: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 4, // raw
    flex: "1 1 0",
    minWidth: 0,
    height: 40, // raw
    padding: 10, // raw
    border: "none",
    background: "transparent",
    cursor: "pointer",
    ...style,
  };
  const label: CSSProperties = {
    ...(selected ? textStyles["Button/Moderate/Bold"] : textStyles["Button/Moderate/Med"]),
    color: selected ? "var(--text-brand-primary-b)" : "var(--text-neutral-medium)",
    flex: 1,
    minWidth: 0,
    textAlign: "center",
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // Figma: truncation ENDING, max lines 2
    overflow: "hidden",
  };
  return (
    <button type="button" role="tab" aria-selected={selected} style={box} {...rest}>
      <span style={label}>{children}</span>
    </button>
  );
}

export interface PrimaryTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  /** 2 or 3 labels (Figma "No.of Tabs" = 2 Tabs | 3 Tabs). Defaults to ["Tab 1", "Tab 2"]. */
  tabs?: [ReactNode, ReactNode] | [ReactNode, ReactNode, ReactNode];
  /** Zero-based index of the selected tab (Figma "Selected Tab", default Tab 1). */
  selectedIndex?: number;
  onChange?: (index: number) => void;
}

export function PrimaryTabs({ tabs = ["Tab 1", "Tab 2"], selectedIndex = 0, onChange, style, ...rest }: PrimaryTabsProps) {
  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    padding: "0 16px", // raw
    ...style,
  };
  const row: CSSProperties = { display: "flex", gap: 4 }; // raw
  const highlighter = (on: boolean): CSSProperties => ({
    flex: "1 1 0",
    height: 4, // raw
    // Figma radius is 222/22/0/0 (raw; probably a typo for 22/22/0/0). Figma clamps each corner to half the
    // shortest side, so it renders as 2/2/0/0; CSS would distort 222/22, so the rendered value is used here.
    borderRadius: "2px 2px 0 0",
    // Figma fill #1e4b82 is unbound; same hex as Surface/Brand/Primary-B. Dummies have the fill hidden.
    background: on ? "var(--surface-brand-primary-b)" : "transparent",
  });
  return (
    <div style={root} {...rest}>
      <div role="tablist" style={row}>
        {tabs.map((t, i) => (
          <PriTabBox key={i} state={i === selectedIndex ? "Selected" : "Default"} onClick={() => onChange?.(i)}>
            {t}
          </PriTabBox>
        ))}
      </div>
      <div aria-hidden style={row}>
        {tabs.map((_, i) => <span key={i} style={highlighter(i === selectedIndex)} />)}
      </div>
    </div>
  );
}

export default PrimaryTabs;

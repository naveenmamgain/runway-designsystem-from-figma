import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway Chip — Figma: Chip (1213:539).
 * Requires tokens/tokens.css. Colours, radius and typography use tokens; padding, gap, height, icon and badge sizes are raw
 * because Figma does not bind them (see spec.md).
 */

export type ChipState = "Default" | "Selected" | "Disabled";

const STATE: Record<ChipState, { fill: string; stroke?: string; label: CSSProperties; text: string; icon: string }> = {
  Default: { fill: "var(--surface-neutral-light)", label: textStyles["Button/Small/Med"], text: "var(--text-onsurface-default)", icon: "var(--surface-neutral-black)" },
  Selected: { fill: "var(--mapped-gray-gray-300)", stroke: "var(--border-neutral-black)", label: textStyles["Button/Small/Bold"], text: "var(--text-onsurface-default)", icon: "var(--surface-neutral-black)" },
  Disabled: { fill: "var(--surface-neutral-light)", label: textStyles["Button/Small/Med"], text: "var(--text-onsurface-disabled)", icon: "var(--surface-neutral-medium)" },
};

const icon = (color: string): CSSProperties => ({
  display: "inline-flex", flex: "none", width: 20, height: 20, color, // raw 20×20; icons should paint with currentColor
});

export interface ChipProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Figma "State". Selected/Disabled can also come from `selected` / `disabled`. */
  state?: ChipState;
  selected?: boolean;
  /** Figma "Chip Text". */
  children?: ReactNode;
  /** Figma "Instance" (default Check_Circle_Stroke). Shown when provided (Figma "Show Leading Icon"). */
  leadingIcon?: ReactNode;
  /** Figma Close_Stroke (Figma "Show Trailing Icon"). Not rendered in State=Default — matches Figma, see spec.md. */
  trailingIcon?: ReactNode;
  /** Figma "Show Number Badge" + its text. */
  count?: ReactNode;
}

export function Chip({ state, selected, disabled, children = "Chip text", leadingIcon, trailingIcon, count, style, ...rest }: ChipProps) {
  const s: ChipState = state ?? (disabled ? "Disabled" : selected ? "Selected" : "Default");
  const p = STATE[s];
  const isDisabled = disabled || s === "Disabled";

  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 8, // raw
    height: 36, // raw (fixed)
    padding: "8px 16px", // raw
    borderRadius: "var(--button-radius)",
    border: "none",
    background: p.fill,
    boxShadow: p.stroke ? `inset 0 0 0 1px ${p.stroke}` : undefined, // stroke 1, inside
    cursor: isDisabled ? "default" : "pointer",
    ...style,
  };

  const badge: CSSProperties = {
    display: "inline-flex", flex: "none", alignItems: "center", justifyContent: "center",
    width: 20, height: 20, borderRadius: 100, // raw
    background: "var(--surface-neutral-black)",
    ...textStyles["Button/Small/Med"],
    color: "var(--text-onsurface-inverse)",
  };

  return (
    <button type="button" disabled={isDisabled} aria-pressed={s === "Selected"} style={root} {...rest}>
      {leadingIcon && <span style={icon(p.icon)} aria-hidden>{leadingIcon}</span>}
      <span style={{ ...p.label, color: p.text, whiteSpace: "nowrap" }}>{children}</span>
      {count != null && <span style={badge}>{count}</span>}
      {trailingIcon && s !== "Default" && <span style={icon(p.icon)} aria-hidden>{trailingIcon}</span>}
    </button>
  );
}

export default Chip;

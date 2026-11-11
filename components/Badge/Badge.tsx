import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway Badge — Figma: Badge (1089:7631).
 * Requires tokens/tokens.css. Fill, radius and typography use tokens; sizes, padding and gap are raw (unbound in Figma).
 */

export type BadgeSize = "No Number" | "Small" | "Large";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  size?: BadgeSize;
  /** Figma "Text" (ignored for No Number). */
  children?: ReactNode;
}

export function Badge({ size = "No Number", children = "1", style, ...rest }: BadgeProps) {
  if (size === "No Number") {
    return (
      <span
        style={{
          display: "inline-block", width: 12, height: 12, // raw
          borderRadius: "var(--button-radius)",
          background: "var(--mapped-yellow-yellow-400)", // Figma uses Mapped-Yellow here, Mapped-Brand on Small/Large
          ...style,
        }}
        {...rest}
      />
    );
  }
  const h = size === "Small" ? 18 : 20; // raw
  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 4, // raw
    padding: 4, // raw
    height: h,
    minWidth: h,
    minHeight: h,
    borderRadius: "var(--button-radius)",
    background: "var(--mapped-brand-primary-a)",
    ...style,
  };
  return (
    <span style={root} {...rest}>
      <span style={{ ...(size === "Small" ? textStyles["Label/Moderate/Med"] : textStyles["Label/Large/Med"]), color: "var(--text-onsurface-default)", whiteSpace: "nowrap" }}>
        {children}
      </span>
    </span>
  );
}

export default Badge;

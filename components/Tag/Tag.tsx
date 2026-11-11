import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway Tag — Figma: Tag (1186:4530).
 * Requires tokens/tokens.css. Colours and typography use tokens; spacing, radius, min-width and icon size are raw
 * because Figma does not bind them (see spec.md).
 */

export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Figma "Tag Text". */
  children?: ReactNode;
  /** Figma "Instance" (default Check_Circle_Stroke). Shown when provided (Figma "Show Leading Icon"). */
  leadingIcon?: ReactNode;
}

export function Tag({ children = "Tag text", leadingIcon, style, ...rest }: TagProps) {
  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "inline-flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 4, // raw
    padding: "4px 12px 4px 8px", // raw
    minWidth: 92, // raw
    borderRadius: 4, // raw
    background: "var(--surface-neutral-white)",
    ...style,
  };
  return (
    <span style={root} {...rest}>
      {leadingIcon && (
        <span style={{ display: "inline-flex", flex: "none", width: 16, height: 16, color: "var(--surface-neutral-black)" }} aria-hidden>
          {leadingIcon}
        </span>
      )}
      <span style={{ ...textStyles["Button/Small/SemiBold"], color: "var(--text-onsurface-default)", whiteSpace: "nowrap" }}>{children}</span>
    </span>
  );
}

export default Tag;

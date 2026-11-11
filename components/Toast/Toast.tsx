import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { GraphicBox, type GraphicBoxProps } from "../Modal/Modal";

/**
 * Runway Toast — Figma: Toast (1492:542).
 * A centred, button-less message card on a 75% black scrim. Requires tokens/tokens.css. Colours and typography use tokens;
 * spacing, radii and sizes are raw because Figma does not bind them (see spec.md).
 */

export interface ToastProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  body?: ReactNode;
  /** Graphic Box (Type=Image / GIF by default in Toast). */
  graphic?: GraphicBoxProps;
  /** Figma slot "Content": replaces the card's content. */
  children?: ReactNode;
}

export function Toast({
  title = "Toast Title Text",
  body = "This is a body text, use with limited characters.",
  graphic = { type: "Image / GIF" },
  children,
  style,
  ...rest
}: ToastProps) {
  const scrim: CSSProperties = {
    boxSizing: "border-box",
    position: "fixed",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16, // raw
    padding: 24, // raw
    background: "var(--overlays-large-75pct-black)",
    // Figma also gives the 360×720 scrim frame radius 16 + clip; omitted for a full-viewport overlay (see spec.md).
    ...style,
  };
  const card: CSSProperties = {
    boxSizing: "border-box",
    alignSelf: "stretch",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 16, // raw
    padding: 16, // raw
    borderRadius: 16, // raw
    background: "var(--surface-neutral-white)",
  };
  return (
    <div style={scrim} {...rest}>
      <div role="status" style={card}>
        {children ?? (
          <>
            <GraphicBox {...graphic} />
            <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 /* raw */ }}>
              <div style={{ ...textStyles["Title/Moderate/Bold"], color: "var(--text-onsurface-default)", textAlign: "center", alignSelf: "stretch" }}>{title}</div>
              <div style={{ ...textStyles["Body/Moderate/Med"], color: "var(--text-onsurface-default)", textAlign: "center", alignSelf: "stretch" }}>{body}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Toast;

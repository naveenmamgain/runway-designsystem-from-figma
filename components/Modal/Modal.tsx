import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button } from "../Button/Button";

/**
 * Runway Modal — Figma: Modal (2027:9964) with private .Graphic Box (2027:9912).
 * Requires tokens/tokens.css. Colours and typography use tokens; spacing, radii and sizes are raw because Figma does not
 * bind them (see spec.md).
 */

/* ------------------------------------------------------------------ .Graphic Box (private) */

export type GraphicBoxType = "Icon" | "Image / GIF";

export interface GraphicBoxProps {
  type?: GraphicBoxType;
  /** Type=Icon: the icon (Figma "Instance", default account_balance), drawn 54×54. */
  icon?: ReactNode;
  /** Type=Image / GIF: image URL, drawn 72×72 with object-fit cover (Figma image fill, scale mode FILL). */
  imageSrc?: string;
  imageAlt?: string;
}

/** Fills the parent's width; the 72×72 graphic is centred (instances override the main component's MIN alignment to CENTER). */
export function GraphicBox({ type = "Image / GIF", icon, imageSrc, imageAlt = "" }: GraphicBoxProps) {
  const row: CSSProperties = { display: "flex", alignSelf: "stretch", justifyContent: "center", alignItems: "center" };
  if (type === "Icon") {
    return (
      <div style={row}>
        <div style={{ boxSizing: "border-box", width: 72, height: 72, padding: 4, display: "flex", alignItems: "center", justifyContent: "center" /* raw */ }}>
          {/* Icon colour is raw #1c1b1f inside the Figma icon component (unbound); pass a coloured icon. */}
          <span style={{ display: "inline-flex", width: 54, height: 54 }} aria-hidden>{icon}</span>
        </div>
      </div>
    );
  }
  return (
    <div style={row}>
      {imageSrc
        ? <img src={imageSrc} alt={imageAlt} style={{ width: 72, height: 72, objectFit: "cover", display: "block" /* raw */ }} />
        : <div style={{ width: 72, height: 72 }} aria-hidden />}
    </div>
  );
}

/* ------------------------------------------------------------------ Modal */

export interface ModalProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title?: ReactNode;
  body?: ReactNode;
  /** Graphic Box (Type=Icon by default in Modal). */
  graphic?: GraphicBoxProps;
  /** Figma "Buttons" (default true). */
  showButtons?: boolean;
  /** Figma "Secondary Button" (default false). */
  showSecondaryButton?: boolean;
  primaryLabel?: ReactNode;
  secondaryLabel?: ReactNode;
  onPrimary?: () => void;
  onSecondary?: () => void;
  /** Figma slot "Toast": replaces the whole card content. */
  children?: ReactNode;
}

export function Modal({
  title = "Modal Title Text",
  body = "This is a body text, use with limited characters, so it is easy to understand the message.",
  graphic = { type: "Icon" },
  showButtons = true,
  showSecondaryButton = false,
  primaryLabel = "Primary",
  secondaryLabel = "Secondary",
  onPrimary,
  onSecondary,
  children,
  style,
  ...rest
}: ModalProps) {
  // Scrim. Figma: 360×720 frame, no auto-layout, card placed at x 16 / y 198. Centred here (see spec.md).
  const scrim: CSSProperties = {
    boxSizing: "border-box",
    position: "fixed",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 16px", // raw (card x = 16 in a 360 frame)
    background: "var(--overlays-large-75pct-black)",
    ...style,
  };
  const card: CSSProperties = {
    boxSizing: "border-box",
    width: "100%",
    maxWidth: 328, // raw (fixed width in Figma)
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 24, // raw
    padding: 24, // raw
    borderRadius: 16, // raw
    background: "var(--surface-neutral-white)",
    overflow: "hidden", // clips content
  };
  return (
    <div style={scrim} {...rest}>
      <div role="dialog" aria-modal="true" style={card}>
        {children ?? (
          <>
            <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <GraphicBox {...graphic} />
              <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", alignItems: "center", gap: 4 /* raw */ }}>
                <div style={{ ...textStyles["Title/Moderate/Bold"], color: "var(--text-onsurface-default)", textAlign: "center", alignSelf: "stretch" }}>{title}</div>
                <div style={{ ...textStyles["Body/Moderate/Med"], color: "var(--text-neutral-dark)", textAlign: "center", alignSelf: "stretch" }}>{body}</div>
              </div>
            </div>
            {showButtons && (
              <div style={{ alignSelf: "stretch", display: "flex", flexDirection: "column", gap: 8 /* raw */ }}>
                <Button size="Medium" variant="Primary-Default" style={{ width: "100%" }} onClick={onPrimary}>{primaryLabel}</Button>
                {showSecondaryButton && (
                  <Button size="Medium" variant="Secondary-Default" style={{ width: "100%" }} onClick={onSecondary}>{secondaryLabel}</Button>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Modal;

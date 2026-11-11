import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button } from "../Button/Button";

/**
 * Runway Tool Tip — Figma: Tool Tip (1801:6125), 24 variants.
 * Requires tokens/tokens.css. Tooltip geometry (width, padding, radius, gaps, tip insets) is unbound in Figma
 * and given here as raw px values.
 *
 * Usage (Figma description): Plain tooltips are time-bound (suggested 5 s). Detailed tooltips can be time-bound,
 * have a close button, or both. Never put critical information in a tooltip.
 */

export type ToolTipType = "Plain" | "Detailed";
export type ToolTipPlacement =
  | { tipPosition: "Top" | "Bottom"; tipAlignment?: "Left" | "Center" | "Right" }
  | { tipPosition: "Left" | "Right"; tipAlignment?: "Top" | "Center" | "Bottom" };

export type ToolTipProps = ToolTipPlacement & {
  type?: ToolTipType;
  /** Supporting text. Plain truncates after 2 lines. */
  children?: ReactNode;
  /** Detailed only. */
  title?: ReactNode;
  /** Figma "Title" (Detailed only). */
  showTitle?: boolean;
  /** Figma "Close Button" (Detailed only). */
  showCloseButton?: boolean;
  /** Close_Stroke icon (24×24); painted with currentColor. */
  closeIcon?: ReactNode;
  onClose?: () => void;
  /** Figma "Buttons" (Detailed only). */
  showButtons?: boolean;
  /** Figma "Button 1" / "Button 2". */
  showButton1?: boolean;
  showButton2?: boolean;
  button1Label?: ReactNode;
  button2Label?: ReactNode;
  onButton1?: () => void;
  onButton2?: () => void;
  style?: CSSProperties;
};

const FILL: Record<ToolTipType, string> = {
  Plain: "var(--surface-information-light)",
  Detailed: "var(--surface-warning-light)",
};

const TIP = 20; // Polygon 20×20 (raw)

// Triangle in a 20×20 box, apex in the direction the tip points.
const TRIANGLE: Record<"Top" | "Bottom" | "Left" | "Right", string> = {
  Top: "polygon(50% 0, 100% 100%, 0 100%)",
  Bottom: "polygon(0 0, 100% 0, 50% 100%)",
  Left: "polygon(0 50%, 100% 0, 100% 100%)",
  Right: "polygon(0 0, 100% 50%, 0 100%)",
};

const ALIGN = { Left: "flex-start", Top: "flex-start", Center: "center", Right: "flex-end", Bottom: "flex-end" } as const;

export function ToolTip(props: ToolTipProps) {
  const {
    type = "Plain",
    tipPosition,
    children,
    title = "Detailed Tool-tip Title",
    showTitle = true,
    showCloseButton = true,
    closeIcon,
    onClose,
    showButtons = true,
    showButton1 = true,
    showButton2 = true,
    button1Label = "Action 1",
    button2Label = "Action 2",
    onButton1,
    onButton2,
    style,
  } = props;
  const tipAlignment = props.tipAlignment ?? (tipPosition === "Top" || tipPosition === "Bottom" ? "Left" : "Center");
  const vertical = tipPosition === "Top" || tipPosition === "Bottom";
  const detailed = type === "Detailed";
  const fill = FILL[type];

  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: vertical ? "column" : "row",
    alignItems: vertical ? ALIGN[tipAlignment] : "stretch",
    width: 328, // raw, fixed width
    ...style,
  };

  const tipFrame: CSSProperties = vertical
    ? { display: "flex", flex: "none", padding: "0 24px", position: "relative", zIndex: 1 } // raw padding 0/24
    : {
        display: "flex",
        flexDirection: "column",
        flex: "none",
        width: TIP,
        justifyContent: ALIGN[tipAlignment],
        // raw: tip inset 8 (Plain) / 16 (Detailed); 0 when centred
        padding: tipAlignment === "Center" ? 0 : `${detailed ? 16 : 8}px 0`,
        position: "relative",
        zIndex: 1,
      };

  // Figma root gap is negative (raw −8; Detailed Left/Right −6). Negative CSS gap is invalid, so the
  // overlap is applied as a negative margin on the tip.
  const overlap = !vertical && detailed ? -6 : -8;
  const tipMargin: CSSProperties =
    tipPosition === "Top" ? { marginBottom: overlap }
    : tipPosition === "Bottom" ? { marginTop: overlap }
    : tipPosition === "Left" ? { marginRight: overlap }
    : { marginLeft: overlap };

  const tip = (
    <div style={{ ...tipFrame, ...tipMargin }} aria-hidden>
      <div style={{ width: TIP, height: TIP, background: fill, clipPath: TRIANGLE[tipPosition] }} />
    </div>
  );

  const body: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: detailed ? 12 : 8, // raw
    padding: 12, // raw
    borderRadius: 16, // raw
    background: fill,
    boxShadow: "var(--elevation-s)", // Figma: Elevation/S on the root (see spec.md)
    alignSelf: "stretch",
    flex: vertical ? undefined : "1 1 0",
    minWidth: 0,
  };

  const textColor = "var(--text-onsurface-default)";
  const supporting: CSSProperties = detailed
    ? { ...textStyles["Body/Small/Reg"], color: textColor, margin: 0 }
    : {
        ...textStyles["Body/Small/Reg"],
        color: textColor,
        margin: 0,
        display: "-webkit-box",
        WebkitBoxOrient: "vertical",
        WebkitLineClamp: 2, // Figma: truncation ENDING, max 2 lines
        overflow: "hidden",
      };

  const actionLabel = (label: ReactNode) => (
    // Figma overrides the Tertiary-Info label colour with Mapped-Blue/Blue 500.
    <span style={{ color: "var(--mapped-blue-blue-500)" }}>{label}</span>
  );

  const content = detailed ? (
    <>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, flex: "1 1 0", minWidth: 0 }}>
          {showTitle && (
            <p style={{ ...textStyles["Title/2X-Small/SemiBold"], color: textColor, margin: 0 }}>{title}</p>
          )}
          <p style={supporting}>
            {children ?? "This is a Detailed ToolTip, use this to convey lengthier info. this tooltip can have action buttons."}
          </p>
        </div>
        {showCloseButton && (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flex: "none",
              width: 24, // raw
              height: 24, // raw
              padding: 0,
              border: "none",
              background: "transparent",
              color: "var(--surface-neutral-black)",
              cursor: "pointer",
            }}
          >
            {closeIcon}
          </button>
        )}
      </div>
      {showButtons && (showButton1 || showButton2) && (
        <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
          {showButton1 && (
            <Button size="Small" variant="Tertiary-Info" onClick={onButton1}>
              {actionLabel(button1Label)}
            </Button>
          )}
          {showButton2 && (
            <Button size="Small" variant="Tertiary-Info" onClick={onButton2}>
              {actionLabel(button2Label)}
            </Button>
          )}
        </div>
      )}
    </>
  ) : (
    <p style={supporting}>
      {children ?? "This is a plain Tooltip, use this to convey simple single/two liner info."}
    </p>
  );

  const tipFirst = tipPosition === "Top" || tipPosition === "Left";
  return (
    <div role="tooltip" style={root}>
      {tipFirst && tip}
      <div style={body}>{content}</div>
      {!tipFirst && tip}
    </div>
  );
}

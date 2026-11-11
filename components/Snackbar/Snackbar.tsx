import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway Snackbar — Figma: Snackbar (1484:741), 20 variants.
 * Requires tokens/tokens.css. Snackbar geometry (padding, gap, radius, min/max width) is unbound in Figma and given
 * here as raw px values. Icons are passed in as ReactNode and painted with currentColor.
 */

export type SnackbarLines = "Single" | "Stack";
export type SnackbarType = "General" | "Info" | "Negative" | "Warning" | "Positive";
export type SnackbarSeverity = "High" | "Low";

type Paint = { fill: string; text: string; icon: string; close: string };

const HIGH = (fill: string): Paint => ({
  fill,
  text: "var(--text-onsurface-inverse)",
  icon: "var(--surface-neutral-white)",
  close: "var(--surface-neutral-white)",
});

const PAINTS: Record<SnackbarType, Record<SnackbarSeverity, Paint>> = {
  General: {
    High: HIGH("var(--surface-neutral-dark)"),
    Low: {
      fill: "var(--surface-neutral-light)",
      // Single variant: unbound #1a202a in Figma (= Text/OnSurface/Default); Stack binds the token.
      text: "var(--text-onsurface-default)",
      icon: "var(--surface-neutral-black)",
      close: "#1c1b1f", // raw: unbound in Figma, matches no token
    },
  },
  Info: {
    High: HIGH("var(--surface-information-dark)"),
    Low: { fill: "var(--surface-information-light)", text: "var(--text-information-dark)", icon: "var(--surface-information-dark)", close: "var(--surface-information-dark)" },
  },
  Negative: {
    High: HIGH("var(--surface-error-dark)"),
    Low: { fill: "var(--surface-error-light)", text: "var(--text-error-dark)", icon: "var(--surface-error-dark)", close: "var(--surface-error-dark)" },
  },
  Warning: {
    High: HIGH("var(--surface-warning-dark)"),
    Low: { fill: "var(--surface-warning-light)", text: "var(--text-warning-dark)", icon: "var(--surface-warning-dark)", close: "var(--surface-warning-dark)" },
  },
  Positive: {
    High: HIGH("var(--surface-success-dark)"),
    Low: { fill: "var(--surface-success-light)", text: "var(--text-success-dark)", icon: "var(--surface-success-dark)", close: "var(--surface-success-dark)" },
  },
};

export interface SnackbarProps {
  lines?: SnackbarLines;
  type?: SnackbarType;
  severity?: SnackbarSeverity;
  /** Body text. Single truncates to one line; Stack wraps. */
  children?: ReactNode;
  title?: ReactNode;
  /** Figma "Title". */
  showTitle?: boolean;
  /** Figma "Leading Icon" + "Instance" (default Info_Circle_Filled, 24×24). */
  showLeadingIcon?: boolean;
  leadingIcon?: ReactNode;
  /** Figma "Buttons": the Action + Close row. */
  showButtons?: boolean;
  /** Figma "Show Action" — only rendered for Lines = Stack (Single has no action node in Figma). */
  showAction?: boolean;
  /** Figma "Action Text". */
  actionText?: ReactNode;
  onAction?: () => void;
  /** Figma "Close Icon". */
  showCloseIcon?: boolean;
  closeIcon?: ReactNode;
  onClose?: () => void;
  style?: CSSProperties;
}

const truncate1: CSSProperties = { overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" };

export function Snackbar({
  lines = "Single",
  type = "General",
  severity = "High",
  children = "SnackBar Text is truncated in ‘Single Line SnackBar’ but continues ito multiple lines in ‘Stack type SnackBar’.", // Figma placeholder (sic)
  title = "Title",
  showTitle = true,
  showLeadingIcon = true,
  leadingIcon,
  showButtons = true,
  showAction = true,
  actionText = "Action",
  onAction,
  showCloseIcon = true,
  closeIcon,
  onClose,
  style,
}: SnackbarProps) {
  const p = PAINTS[type][severity];
  const stack = lines === "Stack";

  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: stack ? "column" : "row",
    alignItems: stack ? "stretch" : "center",
    justifyContent: stack ? "center" : "flex-start",
    gap: 12, // raw
    padding: "12px 16px", // raw
    width: 360, // raw (fixed in Figma)
    minWidth: 220, // raw
    maxWidth: 360, // raw
    borderRadius: 8, // raw
    background: p.fill,
    boxShadow: "var(--elevation-m)",
    color: p.text,
    ...style,
  };

  const labelRow: CSSProperties = {
    display: "flex",
    gap: 8, // raw
    alignItems: "flex-start",
    flex: stack ? undefined : "1 1 0",
    minWidth: 112, // raw
    maxWidth: stack ? 328 : 298, // raw
  };

  const iconBox = (size: CSSProperties["width"], color: string): CSSProperties => ({
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    flex: "none",
    width: size,
    height: size,
    color,
  });

  const actionRow: CSSProperties = {
    display: "flex",
    gap: 8, // raw
    alignItems: "center",
    justifyContent: "flex-end",
    flex: "none",
    height: 24, // raw
    ...(stack ? { minWidth: 88 /* raw */ } : {}),
  };

  return (
    <div role="status" style={root}>
      <div style={labelRow}>
        {showLeadingIcon && (
          <span style={iconBox(24 /* raw */, p.icon)} aria-hidden>
            {leadingIcon}
          </span>
        )}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 4, flex: "1 1 0", minWidth: 0 }}>
          {showTitle && (
            <p style={{ ...textStyles["Title/2X-Small/Bold"], color: p.text, margin: 0, ...truncate1 }}>{title}</p>
          )}
          <p style={{ ...textStyles["Body/Moderate/Med"], color: p.text, margin: 0, ...(stack ? {} : truncate1) }}>
            {children}
          </p>
        </div>
      </div>
      {showButtons && (
        <div style={actionRow}>
          {stack && showAction && (
            <button
              type="button"
              onClick={onAction}
              style={{
                ...textStyles["Button/Moderate/Bold"],
                color: p.text,
                whiteSpace: "nowrap",
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              {actionText}
            </button>
          )}
          {showCloseIcon && (
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              style={{
                ...iconBox("var(--button-icon-size)", p.close),
                padding: 0,
                border: "none",
                background: "transparent",
                cursor: "pointer",
              }}
            >
              {closeIcon}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

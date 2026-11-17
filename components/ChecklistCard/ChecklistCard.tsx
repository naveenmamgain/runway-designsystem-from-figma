import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button } from "../Button/Button";

/**
 * Runway ChecklistCard — Figma: New Onboarding `ziTJqlUlTBuE27ZytNvCTi` step card "card-Driving licence"
 * (1348:25671 / 1348:25678 / 1348:25697 in frame 1348:25620; also 1348:25756, 2663:2420, 2594:2355).
 * Not a component in Figma: built from loose frames. Chosen in design review as the single row for verification and
 * task status, replacing the Logistics "Verify Merch" rows (4417:37326, 4421:38379), home nudge rows and
 * Document Centre cards (1015:27636).
 *
 * Requires tokens/tokens.css. Colours and typography are tokens; spacing, sizes, radii and the card shadow are raw
 * because Figma binds no variable to them (see spec.md). The coloured status caption is allowed only inside this row
 * (decision D13); use `Tag` for standalone status labels. Label and caption wrap to 2 lines and the card grows
 * (rule R02): Figma's fixed 78px height is a min-height here.
 */

export type ChecklistStatus = "todo" | "inProgress" | "verified" | "failed" | "optional";

/** Caption colour per status. Figma values: Selected = Text/Success/Dark, Under Verification = Mapped-Orange/Orange 300,
 *  Failed! Retry = Text/Error/Dark (Logistics). todo / optional have no Figma caption colour — Text/Neutral/Medium chosen. */
const STATUS_COLOR: Record<ChecklistStatus, string> = {
  todo: "var(--text-neutral-medium)",
  inProgress: "var(--mapped-orange-orange-300)",
  verified: "var(--text-success-dark)",
  failed: "var(--text-error-dark)",
  optional: "var(--text-neutral-medium)",
};

/* ------------------------------------------------------------------ trailing glyphs (24×24) */

/** Hourglass. Figma uses an illustration (`hourglass_254516 1`, orange); Material outlined `hourglass-bottom` stands in. */
export const HourglassIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M18 22L17.99 16L14 12L17.99 7.99L18 2H6V8L10 12L6 15.99V22H18ZM8 7.5V4H16V7.5L12 11.5L8 7.5Z" fill="currentColor" />
  </svg>
);

/** Verified badge — Figma hidden layer `Frame 2608732` (1348:25724): circle #0a6b38 + white check, stroke 1.875. */
export const VerifiedIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="12" fill="var(--mapped-green-green-600)" />
    <path d="M18.2536 7.92177L10.0866 16.0884L6.00309 12.0053" stroke="var(--mapped-neutral-white)" strokeWidth="1.875" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** `Right Arrow_Stroke` (924:16670) as used by the Logistics rows; assets/icons/custom/right-arrow-stroke.svg. */
export const ArrowIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M16.175 13H5C4.71667 13 4.47917 12.9042 4.2875 12.7125C4.09583 12.5208 4 12.2833 4 12C4 11.7167 4.09583 11.4792 4.2875 11.2875C4.47917 11.0958 4.71667 11 5 11H16.175L11.275 6.09999C11.075 5.89999 10.9792 5.66665 10.9875 5.39999C10.9958 5.13332 11.1 4.89999 11.3 4.69999C11.5 4.51665 11.7333 4.42082 12 4.41249C12.2667 4.40415 12.5 4.49999 12.7 4.69999L19.3 11.3C19.4 11.4 19.4708 11.5083 19.5125 11.625C19.5542 11.7417 19.575 11.8667 19.575 12C19.575 12.1333 19.5542 12.2583 19.5125 12.375C19.4708 12.4917 19.4 12.6 19.3 12.7L12.7 19.3C12.5167 19.4833 12.2875 19.575 12.0125 19.575C11.7375 19.575 11.5 19.4833 11.3 19.3C11.1 19.1 11 18.8625 11 18.5875C11 18.3125 11.1 18.075 11.3 17.875L16.175 13Z" fill="currentColor" />
  </svg>
);

/* ------------------------------------------------------------------ ChecklistCard */

export interface ChecklistCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title" | "onClick"> {
  /** Step / task name (Figma "card-title"). Wraps to 2 lines. */
  label: ReactNode;
  /** Drives caption colour and the default trailing element. Default "todo". */
  status?: ChecklistStatus;
  /** Coloured status line under the label (e.g. "Under Verification", "Failed! Retry"). Omit for no status line. */
  statusText?: ReactNode;
  /** Icon tile content (36×36 inside a 42×42 Mapped-Gray/Gray 50 tile): illustration, icon or short text like "RC". */
  icon?: ReactNode;
  /** Thumbnail image URL (merch photos). Fills the 42×42 tile, object-fit cover. Takes precedence over `icon`. */
  thumbnail?: string;
  thumbnailAlt?: string;
  /** Trailing pill label (e.g. "Upload", "Upload Again"). Renders a Runway Button, size Small. */
  actionLabel?: ReactNode;
  onAction?: () => void;
  /** Pill emphasis: "primary" = Primary-Default (yellow), "secondary" = Secondary-Default (outline). Default "secondary". */
  actionVariant?: "primary" | "secondary";
  /** Makes the whole card the tap target (navigation rows). Shows the arrow when no action/status glyph applies. */
  onPress?: () => void;
  /** Overrides the trailing slot entirely; pass `null` to hide it. */
  trailing?: ReactNode | null;
}

export function ChecklistCard({
  label,
  status = "todo",
  statusText,
  icon,
  thumbnail,
  thumbnailAlt = "",
  actionLabel,
  onAction,
  actionVariant = "secondary",
  onPress,
  trailing,
  style,
  onKeyDown,
  ...rest
}: ChecklistCardProps) {
  const clamp2: CSSProperties = {
    display: "-webkit-box",
    WebkitBoxOrient: "vertical",
    WebkitLineClamp: 2, // R02: allow 2 lines
    overflow: "hidden",
    overflowWrap: "anywhere",
    margin: 0,
  };

  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 12, // raw; Figma uses SPACE_BETWEEN with no gap — gap added so wrapped text never touches the trailing slot
    width: "100%",
    minHeight: 78, // raw; fixed height 78 in Figma, min-height here (R02)
    padding: 16, // raw
    borderRadius: 16, // raw
    background: "var(--mapped-neutral-white)",
    boxShadow: "inset 0 0 0 1px var(--mapped-gray-gray-100), 0px 2px 6px 0px rgba(30, 41, 59, 0.04)", // stroke 1 inside; shadow raw (unbound)
    cursor: onPress ? "pointer" : undefined,
    textAlign: "left",
    ...style,
  };

  const tile: CSSProperties = {
    boxSizing: "border-box",
    flex: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 42, // raw
    height: 42,
    borderRadius: 8, // raw
    background: "var(--mapped-gray-gray-50)",
    overflow: "hidden",
  };

  let trail: ReactNode;
  if (trailing !== undefined) {
    trail = trailing;
  } else if (actionLabel) {
    trail = (
      <Button
        size="Small"
        variant={actionVariant === "primary" ? "Primary-Default" : "Secondary-Default"}
        onClick={(e) => {
          e.stopPropagation();
          (onAction ?? onPress)?.();
        }}
        // R02: Button has a fixed height; let a 2-line label grow the pill.
        style={{ height: "auto", minHeight: "var(--button-button-height)" }}
      >
        {actionLabel}
      </Button>
    );
  } else if (status === "inProgress") {
    trail = <span style={{ display: "inline-flex", color: "var(--mapped-orange-orange-300)" }}><HourglassIcon /></span>;
  } else if (status === "verified") {
    trail = <VerifiedIcon />;
  } else if (onPress) {
    trail = <span style={{ display: "inline-flex", color: "var(--surface-neutral-black)" }}><ArrowIcon /></span>;
  }

  return (
    <div
      role={onPress ? "button" : undefined}
      tabIndex={onPress ? 0 : undefined}
      onClick={onPress}
      onKeyDown={(e) => {
        if (onPress && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onPress();
        }
        onKeyDown?.(e);
      }}
      style={root}
      {...rest}
    >
      {(thumbnail || icon) && (
        <span style={tile} aria-hidden={!thumbnail || !thumbnailAlt}>
          {thumbnail ? (
            <img src={thumbnail} alt={thumbnailAlt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          ) : (
            <span style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 36, height: 36 }}>{icon}</span>
          )}
        </span>
      )}
      <span style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 2, flex: "1 1 0", minWidth: 0 }}>
        {/* Figma colour is raw #1e2229 (unbound); nearest token Text/OnSurface/Default #1a202a. */}
        <span style={{ ...textStyles["Title/2X-Small/SemiBold"], ...clamp2, color: "var(--text-onsurface-default)" }}>{label}</span>
        {statusText != null && statusText !== "" && (
          <span style={{ ...textStyles["Body/Small/Med"], ...clamp2, color: STATUS_COLOR[status] }}>{statusText}</span>
        )}
      </span>
      {trail != null && (
        <span style={{ flex: "none", display: "inline-flex", alignItems: "center", maxWidth: "45%" }}>{trail}</span>
      )}
    </div>
  );
}

export default ChecklistCard;

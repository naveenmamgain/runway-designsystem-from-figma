import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button } from "../Button/Button";

/**
 * Runway OA message box — Figma: `.OA message Box` (2321:39809, 5 variants), page "OA screen and cards".
 * The empty-state message shown on the Home of Orders screen when there are no order alerts.
 * Requires tokens/tokens.css. Icons and the Duty Toggle are passed in as ReactNode.
 */

export type OAMessageBoxVariant =
  | "Off Duty Toggle"
  | "Searching Orders"
  | "Refresh Button"
  | "System check"
  | "Service Nudge";

export interface OAMessageBoxProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Figma "Property 1". */
  variant?: OAMessageBoxVariant;
  /** Off Duty Toggle: the `Duty Toggle` instance (Property 1=Off Duty, Header components page). */
  dutyToggle?: ReactNode;
  /** Off Duty Toggle message. */
  offDutyText?: ReactNode;
  /** Message for all other variants. */
  searchingText?: ReactNode;
  /** Refresh icon (20×20, currentColor). Remote `Icons/refresh-line` in Refresh Button / System check; `sync` in Service Nudge. */
  refreshIcon?: ReactNode;
  onRefresh?: () => void;
  /** System check / Service Nudge content. */
  nudgeTitle?: ReactNode;
  nudgeBody?: ReactNode;
  nudgeButtonText?: ReactNode;
  /** Leading icon of the nudge CTA (System check: `checklist`, Service Nudge: `settings`). */
  nudgeButtonIcon?: ReactNode;
  onNudgeClick?: () => void;
}

const DEFAULTS: Record<OAMessageBoxVariant, { title?: string; body?: string; cta?: string }> = {
  "Off Duty Toggle": {},
  "Searching Orders": {},
  "Refresh Button": {},
  "System check": { title: "Not getting orders?", body: "Do a quick and easy system check to see why.", cta: "Check account status" },
  "Service Nudge": { title: "Switch on Auto Boost", body: "Get more orders at ₹12/KM during low demand time", cta: "Activate auto Boost" },
};

const root: CSSProperties = {
  boxSizing: "border-box",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "flex-start",
  width: 296, // raw (fixed width in Figma)
  padding: 12, // raw
  gap: 32, // raw
};

const group = (gap: number): CSSProperties => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  alignSelf: "stretch",
  gap, // raw
});

// Figma uses a remote "Body/Moderate/Reg" text style; the local one of the same name is used.
const bodyModerate = (color: string): CSSProperties => ({ ...textStyles["Body/Moderate/Reg"], color, textAlign: "center", margin: 0 });

// Raw #000000 in Figma (unbound) — equal to Base-Neutral/Black.
const RAW_BLACK = "var(--base-neutral-black)";

/**
 * Remote `Refresh Button` (Property 1=F1, 2321:38428 — from another library). Recreated with its Figma values:
 * remote `Button/Button Numbers/*` variables are not in tokens.css, so their resolved values are used raw.
 */
function RefreshButton({ icon, onClick }: { icon?: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        height: 44, // raw (fixed)
        padding: "8px 16px", // V: remote Button Numbers/Vertical Padding = 8; H: raw 16
        gap: 8, // remote Button Numbers/Spacing = 8
        borderRadius: 999, // remote Button Numbers/Radius-Full = 999
        border: "none",
        boxShadow: "inset 0 0 0 1px var(--text-information-dark)", // 1px INSIDE; remote Text/Information/Dark
        background: "transparent",
        cursor: "pointer",
      }}
    >
      <span style={{ ...textStyles["Button/Moderate/Bold"], color: "var(--text-information-dark)", textAlign: "center" }}>Refresh</span>
      {icon && (
        // remote Button Numbers/Icon Size = 20
        <span aria-hidden style={{ display: "inline-flex", width: 20, height: 20, color: "var(--text-information-dark)" }}>{icon}</span>
      )}
    </button>
  );
}

export function OAMessageBox({
  variant = "Off Duty Toggle",
  dutyToggle,
  offDutyText = "Go On-Duty to receive orders.",
  searchingText = "Searching for orders...",
  refreshIcon,
  onRefresh,
  nudgeTitle,
  nudgeBody,
  nudgeButtonText,
  nudgeButtonIcon,
  onNudgeClick,
  style,
  ...rest
}: OAMessageBoxProps) {
  const d = DEFAULTS[variant];

  if (variant === "Off Duty Toggle") {
    return (
      <div style={{ ...root, ...style }} {...rest}>
        <div style={group(12)}>
          <p style={bodyModerate("var(--text-neutral-dark)")}>{offDutyText}</p>
          {dutyToggle && <div style={{ alignSelf: "stretch", display: "flex", justifyContent: "center" }}>{dutyToggle}</div>}
        </div>
      </div>
    );
  }

  const refresh =
    variant === "Searching Orders" ? null : variant === "Service Nudge" ? (
      // Local Runway Button: Size=Medium, Type=Secondary-Info, Icon=Trailing (trailing icon `sync`).
      <Button size="Medium" variant="Secondary-Info" trailingIcon={refreshIcon} onClick={onRefresh}>
        Refresh
      </Button>
    ) : (
      <RefreshButton icon={refreshIcon} onClick={onRefresh} />
    );

  const nudge = variant === "System check" || variant === "Service Nudge";
  const isService = variant === "Service Nudge";

  return (
    <div style={{ ...root, ...style }} {...rest}>
      <div style={group(12)}>
        <p style={bodyModerate(RAW_BLACK)}>{searchingText}</p>
        {refresh}
      </div>
      {nudge && (
        <>
          <p style={bodyModerate("var(--text-neutral-dark)")}>or</p>
          <div style={group(12)}>
            <div
              style={{
                ...group(isService ? 2 : 4),
                padding: isService ? "0 8px" : 0, // raw
              }}
            >
              <p
                style={{
                  ...(isService ? textStyles["Title/2X-Small/Bold"] : textStyles["Title/X-Small/SemiBold"]),
                  color: isService ? "var(--text-onsurface-default)" : RAW_BLACK,
                  textAlign: "center",
                  margin: 0,
                  alignSelf: isService ? "stretch" : undefined,
                }}
              >
                {nudgeTitle ?? d.title}
              </p>
              <p
                style={{
                  ...(isService ? textStyles["Body/Small/Reg"] : textStyles["Body/Moderate/Reg"]),
                  // Service Nudge body: remote colour style "Color/Palette/Gray/800" (#253041), unbound → Base-Gray/Gray 800 (same hex).
                  color: isService ? "var(--base-gray-gray-800)" : RAW_BLACK,
                  textAlign: "center",
                  margin: 0,
                  alignSelf: "stretch",
                }}
              >
                {nudgeBody ?? d.body}
              </p>
            </div>
            <Button
              size="Medium"
              variant="Primary-Default"
              leadingIcon={nudgeButtonIcon}
              onClick={onNudgeClick}
              // Figma: the instance fills the 272 px column (min/max width not bound on this instance).
              style={{ alignSelf: "stretch", minWidth: 0, maxWidth: "none" }}
            >
              {nudgeButtonText ?? d.cta}
            </Button>
          </div>
        </>
      )}
    </div>
  );
}

export default OAMessageBox;

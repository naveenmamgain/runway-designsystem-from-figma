import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button } from "../Button/Button";

/**
 * Runway Card — Figma: OA Cards (2321:29878) built on .Base OA (2321:14803).
 * Requires tokens/tokens.css. Colours and text styles use tokens; spacing and radii are raw because Figma does not
 * bind them (see spec.md).
 */

export type CardService = "Bike OA" | "Auto OA" | "Cab OA";

export interface CardAddress {
  /** Distance shown above the address, e.g. "1.2 km". */
  distance: ReactNode;
  /** Bold lead-in, e.g. "Sec 3 HSR,". */
  title?: ReactNode;
  /** Rest of the address. */
  address: ReactNode;
}

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  service?: CardService;
  /** Service chip label, e.g. "Bike", "Auto", "Cab Eco". */
  serviceName: ReactNode;
  serviceChipIcon?: ReactNode;
  /** Large service illustration (Figma: Service Icons, 72×82). */
  serviceIllustration?: ReactNode;
  fare: ReactNode;
  /** Figma "Show Extra Fare". */
  extraFare?: ReactNode;
  /** Figma "Show Payment Method", e.g. "(Cash)". */
  paymentMethod?: ReactNode;
  /** Figma "Show EPKM", e.g. "₹30/km". */
  epkm?: ReactNode;
  /** Figma "Show Gems": rendered after a green "+". */
  gems?: ReactNode;
  /** Figma "Show Cab Extra Icon" (24×24). */
  extraIcon?: ReactNode;
  /** Figma "Show Intercity Details". */
  intercity?: { destination: ReactNode; distance: ReactNode; duration: ReactNode };
  /** Figma "Show GTA Tag". */
  gtaTag?: { icon?: ReactNode; text: ReactNode };
  /** Figma "Show Tips card", e.g. "Customer added ₹20 extra". */
  tip?: { icon?: ReactNode; text: ReactNode };
  pickup: CardAddress;
  drop: CardAddress;
  acceptLabel?: ReactNode;
  onAccept?: () => void;
  /** Figma uses a remote "Reject Button" component; pass your own or use the default circle. */
  rejectButton?: ReactNode;
  onReject?: () => void;
  rejectIcon?: ReactNode;
}

// Fare numerals: Inter Bold 32 / line-height 28 in Figma with NO text style or variables.
// Closest tokens: family = Cap App - Typeface, weight = Base-Bold, size = Base-Size-32. Line height 28 has a base token
// (Base-Height-Mod (28)). The pairing itself is not a Runway text style.
const fareText: CSSProperties = {
  fontFamily: "var(--cap-app-typeface)",
  fontWeight: "var(--font-weight-base-bold)" as CSSProperties["fontWeight"],
  fontSize: "var(--font-size-base-size-32)",
  lineHeight: "var(--line-height-base-height-mod-28)",
};

function Address({ a }: { a: CardAddress }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ ...textStyles["Title/Small/Bold"], color: "var(--text-onsurface-default)" }}>{a.distance}</span>
      <span style={{ ...textStyles["Body/Small/Reg"], color: "var(--text-onsurface-default)" }}>
        {a.title && <b style={{ fontWeight: "var(--font-weight-base-bold)" as CSSProperties["fontWeight"] }}>{a.title}</b>}
        {a.title ? " " : null}
        {a.address}
      </span>
    </div>
  );
}

function RouteArrow() {
  // 1px line, Border/Neutral/Dark, filled-circle start cap and equilateral-arrow end cap.
  return (
    <div style={{ width: 16, flex: "none", display: "flex", justifyContent: "center", padding: "16px 0" }} aria-hidden>
      <svg width="8" height="100%" viewBox="0 0 8 100" preserveAspectRatio="none" style={{ overflow: "visible", color: "var(--border-neutral-dark)" }}>
        <circle cx="4" cy="0" r="2" fill="currentColor" />
        <line x1="4" y1="0" x2="4" y2="100" stroke="currentColor" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        <path d="M1 96 L4 100 L7 96 Z" fill="currentColor" />
      </svg>
    </div>
  );
}

function DefaultReject({ icon, onClick }: { icon?: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      aria-label="Reject"
      onClick={onClick}
      style={{
        width: 48, height: 48, flex: "none", padding: 2, border: "none", borderRadius: "50%",
        background: "var(--surface-neutral-medium)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
      }}
    >
      <span style={{
        width: 40, height: 40, borderRadius: 999, background: "var(--surface-neutral-white)", boxShadow: "var(--elevation-m)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ width: 24, height: 24, display: "inline-flex", color: "var(--base-neutral-black)" }} aria-hidden>{icon ?? "−"}</span>
      </span>
    </button>
  );
}

export function Card({
  service = "Bike OA", serviceName, serviceChipIcon, serviceIllustration, fare, extraFare, paymentMethod, epkm, gems, extraIcon,
  intercity, gtaTag, tip, pickup, drop, acceptLabel = "Accept", onAccept, rejectButton, onReject, rejectIcon, style, ...rest
}: CardProps) {
  return (
    <div
      data-service={service}
      style={{
        boxSizing: "border-box", width: 272, display: "flex", flexDirection: "column", gap: 12, paddingBottom: 12,
        background: "var(--surface-neutral-white)", borderRadius: 16, overflow: "hidden", ...style,
      }}
      {...rest}
    >
      {/* Header */}
      <div style={{ display: "flex", gap: 4, background: "var(--surface-neutral-white)" }}>
        <div style={{ width: 196, display: "flex", flexDirection: "column", gap: 8, padding: "12px 0 0 12px", boxSizing: "border-box" }}>
          {/* Service chip */}
          <span style={{
            alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 4, padding: "2px 6px 2px 2px",
            borderRadius: 100, background: "var(--surface-neutral-light)",
          }}>
            <span style={{
              width: 20, height: 20, boxSizing: "border-box", padding: 2, borderRadius: 24, background: "var(--surface-neutral-dark)",
              display: "inline-flex", color: "var(--surface-neutral-white)",
            }} aria-hidden>{serviceChipIcon}</span>
            <span style={{ ...textStyles["Label/Moderate/Reg"], color: "var(--text-onsurface-default)" }}>{serviceName}</span>
          </span>
          {/* Fare row */}
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 4 }}>
            <span style={{ ...fareText, color: "var(--text-onsurface-default)" }}>₹</span>
            <span style={{ ...fareText, color: "var(--text-onsurface-default)" }}>{fare}</span>
            {extraFare != null && <span style={{ ...fareText, color: "var(--text-success-dark)" }}>+{extraFare}</span>}
            {gems != null && (
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, padding: "0 1px" }}>
                <span style={{ ...fareText, color: "var(--text-success-dark)" }}>+</span>{gems}
              </span>
            )}
            {epkm != null && <span style={{ ...textStyles["Label/Large/Med"], color: "var(--text-onsurface-default)", padding: "4px 0" }}>{epkm}</span>}
            {paymentMethod != null && <span style={{ ...textStyles["Label/Moderate/Reg"], color: "var(--text-neutral-dark)", padding: "4px 0" }}>{paymentMethod}</span>}
            {extraIcon && <span style={{ width: 24, height: 24, display: "inline-flex", color: "var(--surface-success-dark)" }} aria-hidden>{extraIcon}</span>}
          </div>
          {intercity && (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              <span style={{ ...textStyles["SubTitle/Moderate/Bold"], color: "var(--text-onsurface-default)" }}>{intercity.destination}</span>
              <span style={{ display: "flex", gap: 8, ...textStyles["Body/Small/Reg"], color: "var(--text-onsurface-default)" }}>
                <span>{intercity.distance}</span><span>{intercity.duration}</span>
              </span>
            </div>
          )}
        </div>
        <div style={{ width: 72, height: 82, borderRadius: 2, overflow: "hidden", flex: "none" }}>{serviceIllustration}</div>
      </div>

      {gtaTag && (
        <div style={{
          margin: "0 4px", display: "flex", alignItems: "center", gap: 4, padding: 8, background: "var(--surface-neutral-white)",
          border: "1px solid #fe949e", /* unbound in Figma; no Runway token has this colour */
        }}>
          {gtaTag.icon && <span style={{ width: 20, height: 20, display: "inline-flex", padding: "2px 0" }} aria-hidden>{gtaTag.icon}</span>}
          <span style={{ ...textStyles["Body/Moderate/Reg"], color: "var(--text-onsurface-default)" }}>{gtaTag.text}</span>
        </div>
      )}

      {/* Location Details */}
      <div style={{ display: "flex", gap: 4, padding: "0 12px" }}>
        <RouteArrow />
        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 12 }}>
          <Address a={pickup} />
          <Address a={drop} />
        </div>
      </div>

      {tip && (
        <div style={{ padding: "0 12px" }}>
          <div style={{
            display: "flex", alignItems: "center", gap: 4, padding: "4px 12px", borderRadius: 4, background: "var(--surface-success-dark)",
          }}>
            {tip.icon && <span style={{ width: 20, height: 20, display: "inline-flex", color: "var(--text-onsurface-inverse)" }} aria-hidden>{tip.icon}</span>}
            <span style={{ ...textStyles["Body/Small/Med"], color: "var(--text-onsurface-inverse)" }}>{tip.text}</span>
          </div>
        </div>
      )}

      {/* CTAs */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "0 12px" }}>
        {rejectButton ?? <DefaultReject icon={rejectIcon} onClick={onReject} />}
        {/* Figma overrides the Active fill to Surface/Brand/Primary-A (#ffca20) — same value as the Button's own
            Mapped-Yellow/Yellow 400, so no override is applied here (keeps the Pressed/Disabled states working). */}
        <Button size="Medium" variant="Primary-Default" onClick={onAccept} style={{ flex: 1, maxWidth: "none" }}>
          {acceptLabel}
        </Button>
      </div>
    </div>
  );
}

export default Card;

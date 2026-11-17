import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway OrderIdBand (C34) — Figma: B2B Delivery `BMJzeTVlQYTDjcmHERwgVy`, legacy library component `order id`
 * (variant "map view" 1:173 → instance 1:2997 in 1:2982; variant "food pickup detail screen" 1:175 → 1:3045 in 1:3044).
 * OTP screens (1:3215 pickup, 1:3278 drop) are live-app screenshots: dark band, order ID + "Sender name: …" /
 * "Receiver name: …" on a second line.
 *
 * Visibility (decision P49): show on parcel **and** food/delivery orders (map, stage pages, OTP); hide only on normal
 * bike-taxi orders.
 *
 * Requires tokens/tokens.css. Colours and typography are tokens; padding and letter-spacing are raw. Full width under
 * the header; both lines wrap (R02), no fixed height.
 */

export type OrderIdTone = "dark" | "light";
/** How the last 4 digits render: "plain", "masked" (****, map view) or "emphasised" (bold 16, detail screens). */
export type OrderIdTail = "plain" | "masked" | "emphasised";

export interface OrderIdBandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Full order ID, e.g. "RD17175969515568925". */
  orderId: string;
  /** "dark" = black band (map, OTP; Figma "map view"); "light" = white band with bottom hairline (stage pages). Default "dark". */
  tone?: OrderIdTone;
  /** Last-4 treatment. Default "plain". */
  tail?: OrderIdTail;
  /** Prefix. Default "Order ID : ". */
  label?: ReactNode;
  /** Second line label on OTP screens, e.g. "Sender name" or "Receiver name". */
  personLabel?: ReactNode;
  /** Second line value. The line shows only when this is set. */
  personName?: ReactNode;
}

export function OrderIdBand({
  orderId,
  tone = "dark",
  tail = "plain",
  label = "Order ID : ",
  personLabel = "Sender name",
  personName,
  style,
  ...rest
}: OrderIdBandProps) {
  const dark = tone === "dark";
  const color = dark ? "var(--text-neutral-white)" : "var(--text-neutral-black)";
  const head = orderId.length > 4 ? orderId.slice(0, -4) : "";
  const last4 = orderId.length > 4 ? orderId.slice(-4) : orderId;

  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: personName != null ? 8 : 0, // raw (estimated from the OTP screenshot)
    width: "100%",
    padding: personName != null ? "12px 16px" : "8px 16px", // raw; Figma 8/16 for the one-line band
    background: dark ? "var(--surface-neutral-black)" : "var(--surface-neutral-white)",
    boxShadow: dark ? undefined : "inset 0 -0.5px 0 var(--border-neutral-light)", // bottom stroke 0.5 #e0e3e6
    color,
    textAlign: "center",
    ...style,
  };

  const line: CSSProperties = { ...textStyles["Body/Small/Reg"], margin: 0, overflowWrap: "anywhere", maxWidth: "100%" };
  const digits: CSSProperties = { letterSpacing: 1 /* raw */ };

  return (
    <div style={root} {...rest}>
      <p style={line}>
        {label}
        <span style={digits}>{head}</span>
        {tail === "masked" ? (
          <span style={digits}>****</span>
        ) : tail === "emphasised" ? (
          <span style={{ ...digits, ...textStyles["Title/2X-Small/Bold"], lineHeight: "var(--line-height-base-height-xs-20)" }}>{last4}</span>
        ) : (
          <span style={digits}>{last4}</span>
        )}
      </p>
      {personName != null && (
        <p style={line}>
          {personLabel}: {personName}
        </p>
      )}
    </div>
  );
}

export default OrderIdBand;

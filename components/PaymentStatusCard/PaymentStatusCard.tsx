import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway PaymentStatusCard (C32) — Figma: B2B Delivery `BMJzeTVlQYTDjcmHERwgVy`, legacy library instance `payment card`.
 * - collect:   "Please collect payment ₹X" (1:3151 in 1:3148; also 1:3255)
 * - collected: "Amount collected online" (1:3229 in 1:3227; also 1:3241)
 * Which state shows depends on the customer's payment choice (user decision): both are valid on pickup and drop.
 *
 * Requires tokens/tokens.css. Colours and typography are tokens except the collected fill (#e7f2ea, unbound, no
 * token). Spacing, radii and icon sizes are raw. The label wraps to 2 lines (R02); the amount never wraps.
 * The amount is a parameter, pass it already formatted ("₹130.0").
 */

export type PaymentStatus = "collect" | "collected";

/** `Rupees-Circle_Filled` (assets/icons/custom/rupees-circle-filled.svg). Figma uses an illustration `rupee_14951683 2`. */
export const RupeeIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M14.275 17.25C14.4583 17.0833 14.5583 16.875 14.575 16.625C14.5917 16.375 14.5083 16.1583 14.325 15.975L11.55 13.05L11.575 12.975H11.825C12.725 12.975 13.4708 12.7 14.0625 12.15C14.6542 11.6 15.0167 10.9583 15.15 10.225H15.575C15.7417 10.225 15.8792 10.1667 15.9875 10.05C16.0958 9.93333 16.15 9.79167 16.15 9.625C16.15 9.45833 16.0958 9.32083 15.9875 9.2125C15.8792 9.10417 15.7417 9.05 15.575 9.05H15.125C15.075 8.8 14.9875 8.5625 14.8625 8.3375C14.7375 8.1125 14.5833 7.89167 14.4 7.675H15.575C15.7417 7.675 15.8792 7.61667 15.9875 7.5C16.0958 7.38333 16.15 7.24167 16.15 7.075C16.15 6.90833 16.0958 6.77083 15.9875 6.6625C15.8792 6.55417 15.7417 6.5 15.575 6.5H8.575C8.375 6.5 8.20417 6.57083 8.0625 6.7125C7.92083 6.85417 7.85 7.025 7.85 7.225C7.85 7.425 7.92083 7.59167 8.0625 7.725C8.20417 7.85833 8.375 7.925 8.575 7.925H11.75C12.1833 7.925 12.5375 8.03333 12.8125 8.25C13.0875 8.46667 13.275 8.73333 13.375 9.05H8.425C8.25833 9.05 8.12083 9.10833 8.0125 9.225C7.90417 9.34167 7.85 9.48333 7.85 9.65C7.85 9.81667 7.90417 9.95417 8.0125 10.0625C8.12083 10.1708 8.25833 10.225 8.425 10.225H13.4C13.3 10.5583 13.1083 10.8458 12.825 11.0875C12.5417 11.3292 12.1583 11.45 11.675 11.45H9.975C9.75833 11.45 9.57083 11.5 9.4125 11.6C9.25417 11.7 9.13333 11.8417 9.05 12.025C8.96667 12.2083 8.94167 12.3958 8.975 12.5875C9.00833 12.7792 9.1 12.9583 9.25 13.125L13 17.225C13.1667 17.4083 13.375 17.5 13.625 17.5C13.875 17.5 14.0917 17.4167 14.275 17.25ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22Z" fill="currentColor" />
  </svg>
);

/** Green tick badge — Figma `tick` 26×26 circle Green/600 + `charm:tick` 17.875 white. Glyph: Material round `check`. */
export const TickBadge = () => (
  <span
    aria-hidden
    style={{
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flex: "none",
      width: 26, // raw
      height: 26,
      borderRadius: 999,
      background: "var(--mapped-green-green-600)", // #0a6b38
      color: "var(--text-neutral-white)",
    }}
  >
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path d="M8.795 15.8754L5.325 12.4054C4.935 12.0154 4.305 12.0154 3.915 12.4054C3.525 12.7954 3.525 13.4254 3.915 13.8154L8.095 17.9954C8.485 18.3854 9.115 18.3854 9.505 17.9954L20.085 7.41539C20.475 7.02539 20.475 6.39539 20.085 6.00539C19.695 5.61539 19.065 5.61539 18.675 6.00539L8.795 15.8754Z" fill="currentColor" />
    </svg>
  </span>
);

export interface PaymentStatusCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** "collect" = yellow, captain must collect cash/QR; "collected" = green, paid online. */
  status: PaymentStatus;
  /** Formatted amount, e.g. "₹130.0". Shown on the right. Required in Figma for "collect"; optional for "collected". */
  amount?: ReactNode;
  /** Overrides the label. Defaults: "Please collect payment" / "Amount collected online". */
  label?: ReactNode;
  /** Overrides the leading icon. */
  icon?: ReactNode;
}

const clamp2: CSSProperties = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2, // R02
  overflow: "hidden",
  overflowWrap: "anywhere",
  margin: 0,
};

export function PaymentStatusCard({ status, amount, label, icon, style, ...rest }: PaymentStatusCardProps) {
  const collect = status === "collect";

  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    gap: 12, // raw; Figma uses SPACE_BETWEEN with no gap — added so a wrapped label never touches the amount
    width: "100%",
    padding: 16, // raw
    borderRadius: 8, // raw
    background: collect
      ? "var(--mapped-yellow-yellow-50)" // #fffbf0
      : "#e7f2ea", // raw, unbound; no token (nearest --surface-success-light #f4fdf8 is paler)
    boxShadow: `inset 0 0 0 0.5px ${collect ? "var(--mapped-yellow-yellow-500)" /* #d3a91f */ : "var(--mapped-green-green-600)" /* #0a6b38 */}`,
    ...style,
  };

  return (
    <div role="status" style={root} {...rest}>
      <span style={{ display: "flex", alignItems: "center", gap: collect ? 8 : 12 /* raw, per Figma */, flex: "1 1 0", minWidth: 0 }}>
        {icon ?? (collect ? (
          <span style={{ display: "inline-flex", flex: "none", color: "var(--mapped-green-green-600)" }}><RupeeIcon /></span>
        ) : (
          <TickBadge />
        ))}
        <span
          style={{
            ...(collect ? textStyles["Body/Moderate/Med"] : textStyles["SubTitle/Small/SemiBold"]),
            ...clamp2,
            color: collect ? "var(--text-onsurface-default)" : "var(--mapped-green-green-600)",
          }}
        >
          {label ?? (collect ? "Please collect payment" : "Amount collected online")}
        </span>
      </span>
      {amount != null && amount !== "" && (
        <span style={{ ...textStyles["Title/Small/Bold"], flex: "none", whiteSpace: "nowrap", color: "var(--mapped-green-green-600)" }}>
          {amount}
        </span>
      )}
    </div>
  );
}

export default PaymentStatusCard;

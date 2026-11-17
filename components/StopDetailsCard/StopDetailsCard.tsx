import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { Button } from "../Button/Button";

/**
 * Runway StopDetailsCard (C30) — Figma: B2B Delivery `BMJzeTVlQYTDjcmHERwgVy`, legacy library instance `details`
 * (1:3152 in Collect Parcel 1:3148, 1:3286 in Complete Delivery 1:3283, 1:3230 in 1:3227, 1:3050 in 1:3044).
 * Pickup or drop details: section title, pin + name + address, yellow "Call customer" + outline "Go to location",
 * optional partner chip (e.g. "Swiggy").
 *
 * Always expanded (user decision): no chevron, no collapsed state. The legacy `pick up details collapsed` instance is
 * not reproduced.
 *
 * Requires tokens/tokens.css. Colours and typography are tokens; spacing, radii and icon sizes are raw (Figma binds no
 * variable to them). Text wraps (R02): title and name allow 2 lines, the address is unclamped; no fixed heights.
 * Buttons are the Runway `Button` (yellow Primary = the main action, D05).
 */

/** `Location_Filled` (assets/icons/custom/location-filled.svg). Figma uses `carbon:location-filled` 16×19 (not Runway). */
export const PinIcon = () => (
  <svg width="16" height="20" viewBox="4 2 16 20" fill="none" aria-hidden>
    <path d="M12 12C12.55 12 13.0208 11.8042 13.4125 11.4125C13.8042 11.0208 14 10.55 14 10C14 9.45 13.8042 8.97917 13.4125 8.5875C13.0208 8.19583 12.55 8 12 8C11.45 8 10.9792 8.19583 10.5875 8.5875C10.1958 8.97917 10 9.45 10 10C10 10.55 10.1958 11.0208 10.5875 11.4125C10.9792 11.8042 11.45 12 12 12ZM12 22C9.31667 19.7167 7.3125 17.5958 5.9875 15.6375C4.6625 13.6792 4 11.8667 4 10.2C4 7.7 4.80417 5.70833 6.4125 4.225C8.02083 2.74167 9.88333 2 12 2C14.1167 2 15.9792 2.74167 17.5875 4.225C19.1958 5.70833 20 7.7 20 10.2C20 11.8667 19.3375 13.6792 18.0125 15.6375C16.6875 17.5958 14.6833 19.7167 12 22Z" fill="currentColor" />
  </svg>
);

/** `Navigation_Filled` (assets/icons/custom/navigation-filled.svg). Figma uses a 12×12 raw vector "go to location". */
export const NavigateIcon = () => (
  <svg width="100%" height="100%" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12.1112 18.0662L5.43241 20.9137C5.20805 21 4.99664 21.0216 4.79818 20.9784C4.59971 20.9353 4.43145 20.8447 4.29338 20.7066C4.15532 20.5686 4.06472 20.396 4.02157 20.1889C3.97843 19.9818 4 19.7661 4.08629 19.5417L11.1534 3.62128C11.2397 3.41419 11.3734 3.25887 11.5547 3.15532C11.7359 3.05177 11.9214 3 12.1112 3C12.3011 3 12.4866 3.05177 12.6678 3.15532C12.849 3.25887 12.9827 3.41419 13.069 3.62128L20.1361 19.5417C20.2224 19.7661 20.244 19.9818 20.2009 20.1889C20.1577 20.396 20.0671 20.5686 19.9291 20.7066C19.791 20.8447 19.6227 20.9353 19.4243 20.9784C19.2258 21 19.0144 21 18.79 20.9137L12.1112 18.0662Z" fill="currentColor" />
  </svg>
);

const clamp2: CSSProperties = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2, // R02: allow 2 lines
  overflow: "hidden",
  overflowWrap: "anywhere",
  margin: 0,
};

/**
 * Partner / order-source chip (Figma `order souce`, I1:3286;205:6015). Runway `Tag` does not fit (white fill, radius 4,
 * min-width 92, no tinted variant), so this local pill reproduces the Figma chip. See spec.md → D13.
 */
export function PartnerChip({ children, style, ...rest }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      style={{
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        maxWidth: "100%",
        padding: "4px 12px", // raw
        borderRadius: 999, // raw (Figma 100)
        background: "var(--surface-information-light)", // Figma Color/Palette/Blue/50 #eef5fe
        ...style,
      }}
      {...rest}
    >
      <span style={{ ...textStyles["Button/Small/SemiBold"], ...clamp2, color: "var(--mapped-blue-blue-700)" /* Figma Blue/700 #103460 */ }}>
        {children}
      </span>
    </span>
  );
}

export interface StopDetailsCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Section title, e.g. "Pickup details" / "Drop details". */
  title: ReactNode;
  /** Sender / receiver / restaurant name next to the pin. */
  name: ReactNode;
  /** Address. A string array renders one line per entry (Figma uses two paragraphs). Never clamped. */
  address: ReactNode | string[];
  /** Partner chip above the title (e.g. "Swiggy"). A string renders `PartnerChip`; a node is used as-is. */
  partner?: ReactNode;
  /** Show the Call / Go to location buttons. Default true. Figma hides them on the secondary stop (1:3227 drop, 1:3044 pickup). */
  showActions?: boolean;
  callLabel?: ReactNode;
  navigateLabel?: ReactNode;
  onCall?: () => void;
  onNavigate?: () => void;
}

export function StopDetailsCard({
  title,
  name,
  address,
  partner,
  showActions = true,
  callLabel = "Call customer",
  navigateLabel = "Go to location",
  onCall,
  onNavigate,
  style,
  ...rest
}: StopDetailsCardProps) {
  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    gap: 16, // raw
    width: "100%",
    padding: 16, // raw
    borderRadius: 8, // raw
    background: "var(--surface-neutral-white)",
    boxShadow: "inset 0 0 0 0.5px var(--border-neutral-light)", // stroke 0.5 #e0e3e6
    ...style,
  };

  const button: CSSProperties = {
    width: "100%",
    maxWidth: "none",
    height: "auto", // R02: let a 2-line label grow the button
    minHeight: "var(--button-button-height)",
  };

  return (
    <div style={root} {...rest}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 8 /* raw */ }}>
        {partner != null && partner !== "" && (typeof partner === "string" ? <PartnerChip>{partner}</PartnerChip> : partner)}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 /* raw */, width: "100%" }}>
          {/* Figma 14/20 SemiBold #394454 (Gray/700). No semantic text token for Gray 700. */}
          <p style={{ ...textStyles["SubTitle/X-Small/SemiBold"], ...clamp2, color: "var(--mapped-gray-gray-700)" }}>{title}</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 /* raw */ }}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: 6 /* raw */ }}>
              <span style={{ display: "inline-flex", flex: "none", height: 20, alignItems: "center", color: "var(--text-neutral-black)" }}>
                <PinIcon />
              </span>
              <p style={{ ...textStyles["SubTitle/X-Small/Bold"], ...clamp2, color: "var(--text-neutral-black)" }}>{name}</p>
            </div>
            <div style={{ ...textStyles["Body/Small/Med"], color: "var(--text-neutral-medium)", paddingLeft: 22 /* raw */, overflowWrap: "anywhere" }}>
              {Array.isArray(address) ? address.map((line, i) => <p key={i} style={{ margin: 0 }}>{line}</p>) : address}
            </div>
          </div>
        </div>
      </div>
      {showActions && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 /* raw */, paddingLeft: 22 /* raw */ }}>
          <Button size="Medium" variant="Primary-Default" onClick={onCall} style={button}>
            {callLabel}
          </Button>
          <Button size="Medium" variant="Secondary-Default" leadingIcon={<NavigateIcon />} onClick={onNavigate} style={button}>
            {navigateLabel}
          </Button>
        </div>
      )}
    </div>
  );
}

export default StopDetailsCard;

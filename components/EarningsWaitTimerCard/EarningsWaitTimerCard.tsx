import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway EarningsWaitTimerCard (C33) — Figma: B2B Delivery `BMJzeTVlQYTDjcmHERwgVy`, legacy library instances
 * `earnings` (1:3047 in 1:3044, 1:3058 in 1:3055, standalone 1:3066, compact 1:3285 in 1:3283),
 * `earnings/wait time inactive` (1:3070 in 1:3067), `earnings card` (map band 1:2998 in 1:2982),
 * and `Food prep time` (1:3048 in 1:3044, delayed 1:3059 in 1:3055).
 *
 * Exports:
 * - `EarningsWaitTimerCard`: green "Estimated Earnings ₹X + wait charge" band, optionally with the wait timer body.
 * - `FoodPrepCountdown`: "Please Wait! Food will be ready in" + flip-digit mm:ss, optional red delay strip.
 *
 * Props-driven: pass `seconds` and `state`; there is no internal clock.
 * Requires tokens/tokens.css. Colours and typography are tokens; spacing, radii, sizes are raw. Two legacy palette
 * colours (Green/500 #13934f, Red/400 #d03b2a) have no Runway equal and are mapped to the nearest semantic tokens.
 * Text wraps to 2 lines (R02); nothing has a fixed height.
 */

/** mm:ss from seconds. Minutes are padded to 2 digits and may exceed 99. Negative input is treated as 0. */
export function formatMmSs(seconds: number): string {
  const s = Math.max(0, Math.floor(seconds));
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

const clamp2: CSSProperties = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2, // R02
  overflow: "hidden",
  overflowWrap: "anywhere",
  margin: 0,
};

/** `Info-Circle_Stroke` (assets/icons/custom/info-circle-stroke.svg). Figma: `material-symbols:info-outline` 12×14. */
const InfoIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 17C12.2833 17 12.5208 16.9042 12.7125 16.7125C12.9042 16.5208 13 16.2833 13 16V12C13 11.7167 12.9042 11.4792 12.7125 11.2875C12.5208 11.0958 12.2833 11 12 11C11.7167 11 11.4792 11.0958 11.2875 11.2875C11.0958 11.4792 11 11.7167 11 12V16C11 16.2833 11.0958 16.5208 11.2875 16.7125C11.4792 16.9042 11.7167 17 12 17ZM12 9C12.2833 9 12.5208 8.90417 12.7125 8.7125C12.9042 8.52083 13 8.28333 13 8C13 7.71667 12.9042 7.47917 12.7125 7.2875C12.5208 7.09583 12.2833 7 12 7C11.7167 7 11.4792 7.09583 11.2875 7.2875C11.0958 7.47917 11 7.71667 11 8C11 8.28333 11.0958 8.52083 11.2875 8.7125C11.4792 8.90417 11.7167 9 12 9ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="currentColor" />
  </svg>
);

/* ------------------------------------------------------------------ EarningsWaitTimerCard */

export type WaitTimerState = "inactive" | "active" | "earning";

export interface EarningsWaitTimerCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Formatted base earnings, e.g. "₹30" (food pickup) or "₹30.00" (map band). */
  amount: ReactNode;
  /** Appends "+ wait charge" after the amount. Default true. */
  waitCharge?: boolean;
  /** Left label. Default "Estimated Earnings". */
  label?: ReactNode;
  /**
   * Wait timer state. Omit for the earnings band only (1:3285 / 1:2998).
   * - inactive: greyed (prep time running, or food ready) — 1:3070
   * - active: counting the free wait — 1:3058
   * - earning: free wait over, wait charge running; time in green — 1:3066
   */
  timerState?: WaitTimerState;
  /** Timer value in seconds, shown as mm:ss. */
  seconds?: number;
  /** Free wait before charges start, used in the default message. Default 4. */
  freeMinutes?: number;
  /** Overrides the info line. */
  message?: ReactNode;
  /** Timer label. Default "Wait Timer". */
  timerLabel?: ReactNode;
  /** Band only: full-bleed map variant (no radius, 1:2998). Default false (rounded card, 1:3285). */
  fullBleed?: boolean;
}

export function EarningsWaitTimerCard({
  amount,
  waitCharge = true,
  label = "Estimated Earnings",
  timerState,
  seconds = 0,
  freeMinutes = 4,
  message,
  timerLabel = "Wait Timer",
  fullBleed = false,
  style,
  ...rest
}: EarningsWaitTimerCardProps) {
  const withTimer = timerState != null;
  const inactive = timerState === "inactive";

  const header: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12, // raw; Figma SPACE_BETWEEN, gap added for wrapped text
    width: "100%",
    padding: withTimer ? "8px 16px 24px" : "8px 16px", // raw; with timer the body overlaps the bottom 16px
    marginBottom: withTimer ? -16 : 0, // raw (Figma mb -16)
    background: "var(--mapped-green-green-600)", // Figma Color/Foundation/Content/Positive #0a6b38
    borderRadius: withTimer ? "8px 8px 4px 4px" : fullBleed ? 0 : 8, // raw
    color: "var(--text-neutral-white)",
  };

  const headerRow = (
    <div style={header}>
      <span style={{ ...textStyles["Body/Small/Med"], ...clamp2, flex: "1 1 0", minWidth: 0 }}>{label}</span>
      <span style={{ ...textStyles["SubTitle/X-Small/Bold"], ...clamp2, flex: "0 1 auto", textAlign: "right" }}>
        {amount}
        {waitCharge && (
          <>
            {" + "}
            <span style={{ fontWeight: "var(--body-small-14-med-weight)" as CSSProperties["fontWeight"] }}>wait charge</span>
          </>
        )}
      </span>
    </div>
  );

  if (!withTimer) {
    return (
      <div style={{ width: "100%", ...style }} {...rest}>
        {headerRow}
      </div>
    );
  }

  const strong = inactive ? "var(--text-neutral-light)" /* Gray/400 #aeb6c3 */ : "var(--text-onsurface-default)";
  const timeColor =
    timerState === "earning" ? "var(--text-success-dark)" /* Figma Green/500 #13934f (legacy), nearest Runway #058743 */ : strong;
  const infoColor = inactive ? "var(--mapped-gray-gray-500)" /* #7d899b */ : "var(--text-onsurface-default)";
  const info =
    message ??
    (timerState === "earning" ? "You are now earning wait charges" : `After ${freeMinutes} mins, you will get extra charge for waiting`);

  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        borderRadius: 8, // raw
        boxShadow: "inset 0 0 0 0.5px var(--border-neutral-light)", // stroke 0.5 #e0e3e6
        ...style,
      }}
      {...rest}
    >
      {headerRow}
      <div
        style={{
          position: "relative",
          boxSizing: "border-box",
          display: "flex",
          alignItems: "center",
          gap: 11, // raw
          padding: "8px 16px", // raw
          borderRadius: 8, // raw
          background: "var(--surface-neutral-white)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, flex: "none", textAlign: "center", maxWidth: "40%" }}>
          <span style={{ ...textStyles["Body/Small/Med"], ...clamp2, color: strong }}>{timerLabel}</span>
          <span
            role="timer"
            aria-live="off"
            style={{ ...textStyles["Title/X-Small/SemiBold"], color: timeColor, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}
          >
            {formatMmSs(seconds)}
          </span>
        </div>
        {/* Divider: Figma 43px line Gray/300; stretched to the row height here. */}
        <span aria-hidden style={{ alignSelf: "stretch", flex: "none", width: 1, minHeight: 43, background: "var(--mapped-gray-gray-300)" }} />
        <div style={{ display: "flex", alignItems: "flex-start", gap: 6, flex: "1 1 0", minWidth: 0, color: infoColor }}>
          <span style={{ display: "inline-flex", flex: "none", marginTop: 1 }}>
            <InfoIcon />
          </span>
          {/* Figma 12/16 Regular; Label/Moderate/Reg without the cap-height trim so 2 lines keep their leading. */}
          <span style={{ ...textStyles["Label/Moderate/Reg"], textBox: "normal", ...clamp2 } as CSSProperties}>{info}</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ FoodPrepCountdown */

/** Placeholder for the Figma illustration `dinner_12844512 1` (38×38): Material outlined `room-service`. */
const DishIcon = () => (
  <svg width="38" height="38" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M2 17V19H22V17H2ZM21 16C20.73 11.93 17.75 8.6 13.84 7.79C13.94 7.55 14 7.28 14 7C14 5.9 13.1 5 12 5C10.9 5 10 5.9 10 7C10 7.28 10.06 7.55 10.16 7.79C6.25 8.6 3.27 11.93 3 16H21ZM12 9.58C14.95 9.58 17.47 11.41 18.5 13.99H5.5C6.53 11.41 9.05 9.58 12 9.58Z" fill="currentColor" />
  </svg>
);

export interface FoodPrepCountdownProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Remaining prep time in seconds. At 0 the digit tiles turn grey (1:3059). */
  seconds: number;
  /** Red strip above, e.g. "Slight delay in food prep due to high demand". */
  delayMessage?: ReactNode;
  /** Small line. Default "Please Wait!". */
  eyebrow?: ReactNode;
  /** Main line. Default "Food will be ready in". */
  title?: ReactNode;
  /** Overrides the 38×38 illustration. */
  icon?: ReactNode;
}

export function FoodPrepCountdown({
  seconds,
  delayMessage,
  eyebrow = "Please Wait!",
  title = "Food will be ready in",
  icon,
  style,
  ...rest
}: FoodPrepCountdownProps) {
  const over = seconds <= 0;
  const [mm, ss] = formatMmSs(seconds).split(":");
  const tileBg = over ? "var(--mapped-gray-gray-500)" /* #7d899b */ : "var(--surface-brand-primary-b)"; /* #1e4b82 */

  const tile = (v: string) => (
    <span
      style={{
        boxSizing: "border-box",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        minWidth: 26, // raw (Figma fixed width 26)
        padding: "8px 4px", // raw
        borderRadius: 4, // raw
        background: tileBg,
        color: "var(--text-neutral-white)",
        ...textStyles["Title/2X-Small/Bold"],
        lineHeight: "var(--line-height-base-height-xs-20)", // Figma 16 Bold / 20 (Noto Sans Display); style is 16/24
        fontVariantNumeric: "tabular-nums",
      }}
    >
      {v}
    </span>
  );

  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        overflow: "hidden",
        borderRadius: 8, // raw
        background: "var(--surface-neutral-white)",
        boxShadow: "inset 0 0 0 0.5px var(--border-neutral-light)",
        ...style,
      }}
      {...rest}
    >
      {delayMessage != null && delayMessage !== "" && (
        <div
          role="alert"
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 4, // raw
            padding: "6px 12px", // raw
            background: "var(--surface-error-light)", // Red/50 #fff2f1
            color: "var(--text-error-dark)", // Figma Red/400 #d03b2a (legacy), nearest Runway #c42925
          }}
        >
          <span style={{ display: "inline-flex", flex: "none", marginTop: 1 }}><InfoIcon /></span>
          <span style={{ ...textStyles["Label/Moderate/Med"], textBox: "normal", ...clamp2 } as CSSProperties}>{delayMessage}</span>
        </div>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: 12, padding: 16 /* raw */ }}>
        <span style={{ display: "inline-flex", flex: "none", color: "var(--text-onsurface-default)" }}>{icon ?? <DishIcon />}</span>
        <div style={{ display: "flex", flexDirection: "column", flex: "1 1 0", minWidth: 0, color: "var(--mapped-gray-gray-700)" /* #394454 */ }}>
          {/* Figma 12 Medium / 20; Label/Moderate/Med is 12/16. */}
          <span style={{ ...textStyles["Label/Moderate/Med"], textBox: "normal", ...clamp2 } as CSSProperties}>{eyebrow}</span>
          <span style={{ ...textStyles["SubTitle/X-Small/SemiBold"], ...clamp2 }}>{title}</span>
        </div>
        <span role="timer" aria-label={`${mm}:${ss}`} style={{ display: "inline-flex", alignItems: "center", gap: 4, flex: "none" }}>
          {tile(mm)}
          <span aria-hidden style={{ display: "inline-flex", flexDirection: "column", gap: 4 }}>
            {/* Figma colon: 2×10 frame with two dots */}
            <span style={{ width: 2, height: 2, borderRadius: 1, background: tileBg }} />
            <span style={{ width: 2, height: 2, borderRadius: 1, background: tileBg }} />
          </span>
          {tile(ss)}
        </span>
      </div>
    </div>
  );
}

export default EarningsWaitTimerCard;

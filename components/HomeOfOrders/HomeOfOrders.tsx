import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { OAMessageBox } from "../OAMessageBox/OAMessageBox";

/**
 * Runway "Home of Orders" screen — Figma: `Home of Orders` (2321:42873), variants Orders=Yes / Orders=No, 360 × 720.
 * A screen-level layout: the Figma frame has no auto-layout, so children are absolutely positioned at their Figma
 * coordinates. Figma SLOT properties (Orders, Filters, Filters2) and other component instances are ReactNode props.
 * Requires tokens/tokens.css.
 */

/* ------------------------------------------------------------------ Side bar order tab (O1…O6) */

export interface OrderTabProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Selected tab (O1 in Figma): Surface/Neutral/Light fill and Body/Moderate/Med fare. */
  selected?: boolean;
  /** Fare text, e.g. "₹999 + 999" (Figma wraps it onto two lines inside the 56 px column). */
  fare?: ReactNode;
  /** Remaining time, 0…1. Figma draws 285° of 360° (= 0.7915). */
  progress?: number;
  /** Placeholder tab (O4–O6): grey timer and no fare. */
  empty?: boolean;
  /** Optional icon drawn inside the timer (Figma has hidden "GTA" / "bi:pin-map-fill" layers). */
  timerIcon?: ReactNode;
}

/** Timer ring: arc from 12 o'clock clockwise; outer Ø24, inner radius ratio 0.7919 (Figma arcData). */
function TimerRing({ progress, empty, icon }: { progress: number; empty?: boolean; icon?: ReactNode }) {
  const OUTER = 12;
  const INNER = 12 * 0.7919220924377441;
  const r = (OUTER + INNER) / 2;
  const w = OUTER - INNER;
  const c = 2 * Math.PI * r;
  const p = Math.max(0, Math.min(1, progress));
  return (
    <span style={{ position: "relative", display: "inline-flex", width: 24, height: 24, flex: "none" }}>
      <svg width={24} height={24} viewBox="0 0 24 24" aria-hidden>
        {/* Base Line: Ø18.15, 1 px INSIDE stroke → centre-line radius 8.575 */}
        <circle cx={12} cy={12} r={18.15 / 2 - 0.5} fill="none" stroke="var(--border-neutral-medium)" strokeWidth={1} />
        <circle
          cx={12}
          cy={12}
          r={r}
          fill="none"
          stroke={empty ? "var(--surface-neutral-light)" : "var(--surface-success-dark)"}
          strokeWidth={w}
          strokeDasharray={empty ? undefined : `${c * p} ${c}`}
          transform="rotate(-90 12 12)"
        />
      </svg>
      {icon && <span style={{ position: "absolute", inset: 6, display: "inline-flex" }}>{icon}</span>}
    </span>
  );
}

export function OrderTab({ selected, fare = "₹999 + 999", progress = 0.7915, empty, timerIcon, style, ...rest }: OrderTabProps) {
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: 64,
        height: 92, // raw
        padding: 4, // raw
        gap: 8, // raw
        borderRadius: "0 4px 4px 0", // raw
        background: selected ? "var(--surface-neutral-light)" : "var(--surface-neutral-white)",
        flex: "none",
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", alignSelf: "stretch", gap: 4 /* raw */ }}>
        <TimerRing progress={progress} empty={empty} icon={timerIcon} />
        {!empty && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", alignSelf: "stretch", gap: 10 /* raw */ }}>
            <span
              style={{
                ...(selected ? textStyles["Body/Moderate/Med"] : textStyles["Body/Moderate/Reg"]),
                color: selected ? "var(--text-onsurface-default)" : "var(--text-neutral-medium)",
                textAlign: "center",
              }}
            >
              {fare}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Filter pill (Services / Go To / Stay In) */

export interface FilterPillProps extends React.HTMLAttributes<HTMLDivElement> {
  icon?: ReactNode;
  /** Icon box size: 24 for Services (settings) and Go To (GTA image), 16 for Stay In. */
  iconSize?: 16 | 24;
  label?: ReactNode;
}

export function FilterPill({ icon, iconSize = 24, label = "Services", style, ...rest }: FilterPillProps) {
  return (
    // "Head": padding 4, radius 20/20/0/0 (raw), no fill — the flat bottom joins a hidden "Content" panel in Figma.
    <div style={{ boxSizing: "border-box", display: "inline-flex", padding: 4, borderRadius: "20px 20px 0 0", flex: "none", ...style }} {...rest}>
      <div
        style={{
          boxSizing: "border-box",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: 36,
          padding: 8, // raw
          gap: 4, // raw
          borderRadius: 1000, // raw
          background: "var(--surface-neutral-white)",
          overflow: "hidden",
        }}
      >
        {icon && (
          <span aria-hidden style={{ display: "inline-flex", width: iconSize, height: iconSize, color: "var(--surface-neutral-dark)" }}>
            {icon}
          </span>
        )}
        {/* Figma uses a remote "Button/Small/Med" style; local style of the same name used. */}
        <span style={{ ...textStyles["Button/Small/Med"], color: "var(--text-neutral-medium)", whiteSpace: "nowrap" }}>{label}</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ Screen */

export interface HomeOfOrdersProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Figma variant "Orders" (default No). */
  orders?: boolean;
  /** Header title, e.g. "3 Orders" / "0 Orders". */
  title?: ReactNode;
  /** Hidden "Left Arrow" (701:123800) in Figma; rendered before the title when given. */
  backButton?: ReactNode;
  /** Header right side: remote `Toggle / Property 1=Text` (66 × 32, "ON"). */
  headerAction?: ReactNode;
  /** SLOT "Filters" (Orders=No) / "Filters2" (Orders=Yes): row of FilterPill. */
  filters?: ReactNode;
  /** SLOT "Orders": vertical list of OA Cards (Card component), gap 16. Orders=Yes only. */
  orderList?: ReactNode;
  /** Side bar order tabs (OrderTab). Orders=Yes only; the white "Empty Order Bar" fills the rest. */
  orderTabs?: ReactNode;
  /** Orders=No: centred message. Defaults to OAMessageBox (Off Duty Toggle). */
  emptyState?: ReactNode;
  /** `bottom navigation / Property 1=3 Buttons` (2321:26982) instance. */
  bottomNav?: ReactNode;
}

const SCREEN_W = 360; // raw
const SCREEN_H = 720; // raw
const HEADER_H = 64;
const NAV_H = 64;

export function HomeOfOrders({
  orders = false,
  title,
  backButton,
  headerAction,
  filters,
  orderList,
  orderTabs,
  emptyState,
  bottomNav,
  style,
  ...rest
}: HomeOfOrdersProps) {
  const root: CSSProperties = {
    position: "relative",
    boxSizing: "border-box",
    width: SCREEN_W,
    height: SCREEN_H,
    overflow: "hidden", // clipsContent
    background: "var(--surface-neutral-light)",
    ...style,
  };

  return (
    <div style={root} {...rest}>
      {/* Side Bar: x0 y64, 64 × 656, V gap 1 */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: HEADER_H,
          width: 64,
          height: SCREEN_H - HEADER_H,
          display: "flex",
          flexDirection: "column",
          gap: 1, // raw
        }}
      >
        {orders && orderTabs}
        {/* Empty Order Bar: fills remaining height, padding 4, radius 0/4/4/0, white */}
        <div
          style={{
            boxSizing: "border-box",
            flex: "1 1 0",
            minHeight: 0,
            padding: 4,
            borderRadius: "0 4px 4px 0",
            background: "var(--surface-neutral-white)",
          }}
        />
      </div>

      {/* Header: x0 y0, 360 × 64, padding 16, bottom border 1 INSIDE */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          boxSizing: "border-box",
          width: SCREEN_W,
          height: HEADER_H,
          padding: 16, // raw
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8, // raw
          background: "var(--surface-neutral-white)",
          boxShadow: "inset 0 -1px 0 var(--border-neutral-light)",
        }}
      >
        <div style={{ width: 320, height: 32, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 /* raw */ }}>
            {backButton}
            <span
              style={{
                ...textStyles["Title/X-Small/SemiBold"], // remote style of the same name in Figma
                color: "#0c0d0f", // raw: remote colour style "Typography/Dark 1", no variable
                whiteSpace: "nowrap",
              }}
            >
              {title ?? (orders ? "3 Orders" : "0 Orders")}
            </span>
          </div>
          {headerAction}
        </div>
      </div>

      {/* Filters / Filters2 slot: x76 y72, hug (287 × 44 in Figma), H gap 0 */}
      <div style={{ position: "absolute", left: 76, top: 72, display: "flex", alignItems: "center", gap: 0 }}>{filters}</div>

      {orders ? (
        /* Orders slot: x76 y124, 272 × 535, V gap 16, clips content (scrolls in the implementation) */
        <div
          style={{
            position: "absolute",
            left: 76,
            top: 124,
            width: 272,
            height: 535,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 16, // raw
            overflowY: "auto",
          }}
        >
          {orderList}
        </div>
      ) : (
        /* .OA message Box: x64 y309 (296 × 102) = centred in the area right of the side bar, between header and nav */
        <div
          style={{
            position: "absolute",
            left: 64,
            top: HEADER_H,
            width: SCREEN_W - 64,
            height: SCREEN_H - HEADER_H - NAV_H,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {emptyState ?? <OAMessageBox variant="Off Duty Toggle" />}
        </div>
      )}

      {/* bottom navigation: x0 y656, 360 × 64 (fill + Elevation/S belong to the instance) */}
      <div style={{ position: "absolute", left: 0, top: SCREEN_H - NAV_H, width: SCREEN_W, height: NAV_H }}>{bottomNav}</div>
    </div>
  );
}

export default HomeOfOrders;

import React, { type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway BottomNavigation — Figma: `bottom navigation` (2321:26982) with private parts
 * `.Nav Buttons` (2321:26975), `.Nav Icons` (2321:26867), `.Order Button` (2321:27238) and
 * `.Order Button Animation` (2321:26779). Requires tokens/tokens.css.
 * Colours, effects and typography are tokens; spacing, sizes and radii are raw because Figma binds no variable to them
 * (see spec.md). Icons are passed in as ReactNode and should paint with currentColor.
 */

/** Names of the 11 icons in `.Nav Icons` (each exists as Type=Line and Type=Fill). SVGs are exported separately. */
export type NavIconName =
  | "Orders" | "Home" | "Heart" | "Support" | "manage" | "Support 2"
  | "Down Arrow" | "INR" | "Rewards" | "Earnings" | "Credit";

/* ------------------------------------------------------------------ .Nav Buttons */

export interface NavButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: ReactNode;
  /** `.Nav Icons` Type=Line (used when not selected), 24×24. */
  icon: ReactNode;
  /** `.Nav Icons` Type=Fill (used when selected), 24×24. Falls back to `icon`. */
  selectedIcon?: ReactNode;
  /** Figma Property 1 = Selected. */
  selected?: boolean;
}

export function NavButton({ label, icon, selectedIcon, selected = false, style, ...rest }: NavButtonProps) {
  return (
    <button
      type="button"
      aria-current={selected ? "page" : undefined}
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 4, // raw
        padding: 4, // raw
        width: 60, // raw, fixed in Figma
        border: "none",
        background: "none",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      <span
        aria-hidden
        style={{
          display: "inline-flex",
          width: 24, // raw
          height: 24,
          // Line icons: Surface/Neutral/Dark; Fill icons: Surface/Neutral/Black (Credit Line uses Border/Neutral/Dark, same hex).
          color: selected ? "var(--surface-neutral-black)" : "var(--surface-neutral-dark)",
        }}
      >
        {selected ? selectedIcon ?? icon : icon}
      </span>
      <span
        style={{
          ...textStyles["Label/Moderate/Med"],
          color: selected ? "var(--text-onsurface-default)" : "var(--text-neutral-medium)",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ .Order Button */

export type OrderButtonState = "Default" | "Hide" | "Incoming Orders";

export interface OrderButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  /** Figma Property 1. Default = "Default". */
  state?: OrderButtonState;
  /** Figma text "Orders". */
  label?: ReactNode;
  /** 28×28 icon. Figma: remote `Bottom Nav Icons` Type=Line, Icon=Orders (Default) / Type=Fill, Icon=Down Arrow (Hide). */
  icon?: ReactNode;
  /** Order count bubble. Hidden in Default/Hide unless set; always shown in Incoming Orders (Figma sample "2"). */
  count?: ReactNode;
}

const PILL: Record<"Default" | "Hide", { fill: string; text: string; icon: string }> = {
  Default: { fill: "var(--surface-neutral-light)", text: "var(--text-neutral-dark)", icon: "var(--surface-neutral-black)" },
  Hide: { fill: "var(--surface-neutral-black)", text: "var(--text-onsurface-inverse)", icon: "var(--surface-neutral-white)" },
};

/** Count bubble used inside `.Order Button` Default/Hide (local "Order Numbers" frame). */
function LocalCount({ children }: { children: ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none",
        width: 28, height: 28, borderRadius: 200, // raw
        background: "var(--mapped-neutral-black)",
        color: "var(--mapped-neutral-white)",
        // Figma: no text style; size/weight bound to Title/Small (20)/SemiBold, family to Captain App Font (renders Noto Sans).
        fontFamily: "var(--cap-app-typeface)",
        fontSize: "var(--title-small-20-semibold-size)",
        fontWeight: "var(--title-small-20-semibold-weight)" as CSSProperties["fontWeight"],
        lineHeight: "100%", // raw, unbound
      }}
    >
      {children}
    </span>
  );
}

/* Ring outline of `.Order Button Animation` LC/RC: an ellipse arc 270° → 182.01°, inner radius ratio 0.9281911849975586,
   drawn here at the 58×58 size (44×44 frames are the same arc scaled by 44/58). Stroke Mapped-Yellow/Yellow 500, align CENTER. */
const RING_PATH = "M29 0 A29 29 0 1 1 0.018 27.983 L2.099 28.056 A26.918 26.918 0 1 0 29 2.082 Z";

/* Keyframes generated from the Figma relativeTransform of every frame F1…F8 and the prototype timings
   (F1 hold 0.8s → 0.1s → F2; F2…F6 hold 0.001s → 0.06s each; F7 hold 0.1s → 0.4s → F8; F8 hold 1s → 0.4s → F1;
   all SMART_ANIMATE, LINEAR). Cycle = 3.105s. */
const ORDER_ANIMATION_CSS = `
@keyframes runway-oba-lc {
  0%, 25.765% { transform: matrix(0.7586,0,0,0.7586,9.9629,9); stroke-width: 0; }
  28.986%, 29.018% { transform: matrix(1,0,0,1,2.9629,2); stroke-width: 2.5; }
  30.95%, 30.982% { transform: matrix(0.8809,-0.4733,0.4733,0.8809,-7.3086,19.1799); stroke-width: 2.5; }
  32.915%, 32.947% { transform: matrix(0.6867,-0.7269,0.7269,0.6867,-9.0332,32.1642); stroke-width: 2.5; }
  34.879%, 34.911% { transform: matrix(0.8079,-0.5893,0.5893,0.8079,-8.5566,24.6582); stroke-width: 2.5; }
  36.844%, 36.876% { transform: matrix(0.7448,-0.6673,0.6673,0.7448,-8.9883,28.7543); stroke-width: 2.5; }
  38.808%, 42.029% { transform: matrix(1,0,0,1,2.9629,2); stroke-width: 2.5; }
  54.911%, 100% { transform: matrix(0.7586,0,0,0.7586,9.9629,9); stroke-width: 0; }
}
@keyframes runway-oba-rc {
  0%, 25.765% { transform: matrix(-0.7586,0,0,0.7586,112.0371,9); stroke-width: 0; }
  28.986%, 29.018% { transform: matrix(-1,0,0,1,119.0371,2); stroke-width: 2.5; }
  30.95%, 30.982% { transform: matrix(-0.7068,-0.7074,-0.7074,0.7068,131.0488,31.0179); stroke-width: 2.5; }
  32.915%, 32.947% { transform: matrix(-0.8248,-0.5655,-0.5655,0.8248,130.3535,23.4816); stroke-width: 2.5; }
  34.879%, 34.911% { transform: matrix(-0.7115,-0.7027,-0.7027,0.7115,131.0488,30.7436); stroke-width: 2.5; }
  36.844%, 36.876% { transform: matrix(-0.8286,-0.5598,-0.5598,0.8286,130.3008,23.2031); stroke-width: 2.5; }
  38.808%, 42.029% { transform: matrix(-1,0,0,1,119.0371,2); stroke-width: 2.5; }
  54.911%, 100% { transform: matrix(-0.7586,0,0,0.7586,112.0371,9); stroke-width: 0; }
}
@keyframes runway-oba-p {
  0%, 29.018% { transform: matrix(1,0,0,1,12,9); }
  30.95%, 30.982% { transform: matrix(0.9986,0.0523,-0.0523,0.9986,13.2188,6.4395); }
  32.915%, 32.947% { transform: matrix(0.9986,-0.0523,0.0523,0.9986,10.916,11.6208); }
  34.879%, 34.911% { transform: matrix(0.9986,0.0523,-0.0523,0.9986,13.2188,6.4395); }
  36.844%, 36.876% { transform: matrix(0.9986,-0.0523,0.0523,0.9986,10.916,11.6208); }
  38.808%, 100% { transform: matrix(1,0,0,1,12,9); }
}
[data-runway-oba] > * { animation-duration: 3.105s; animation-timing-function: linear; animation-iteration-count: infinite; }
@media (prefers-reduced-motion: reduce) { [data-runway-oba] > * { animation: none !important; } }
`;

function Ring({ side }: { side: "lc" | "rc" }) {
  return (
    <svg
      width={58}
      height={58}
      viewBox="0 0 58 58"
      fill="none"
      aria-hidden
      style={{
        position: "absolute", left: 0, top: 0, overflow: "visible", transformOrigin: "0 0",
        stroke: "var(--mapped-yellow-yellow-500)",
        animationName: `runway-oba-${side}`,
      }}
    >
      <path d={RING_PATH} />
    </svg>
  );
}

/** `.Order Button Animation` (8 frames F1…F8) wrapping the remote `Orders Button` (Incoming Orders, Rounded). */
function OrderButtonAnimation({ label, count }: { label: ReactNode; count: ReactNode }) {
  return (
    <span data-runway-oba="" style={{ position: "relative", display: "block", width: 122, height: 60 /* raw */ }}>
      <style>{ORDER_ANIMATION_CSS}</style>
      <Ring side="lc" />
      <Ring side="rc" />
      <span
        style={{
          position: "absolute", left: 0, top: 0, transformOrigin: "0 0", animationName: "runway-oba-p",
          boxSizing: "border-box",
          display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", // raw
          width: 99, height: 44, borderRadius: 100, // raw
          background: "var(--surface-brand-primary-a)",
          outline: "1px solid var(--mapped-yellow-yellow-500)", // stroke 1, align OUTSIDE
        }}
      >
        <span
          style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center", flex: "none",
            width: 28, height: 28, borderRadius: 200, // raw
            background: "var(--surface-neutral-black)",
            ...textStyles["Title/Small/SemiBold"],
            color: "var(--text-onsurface-inverse)",
          }}
        >
          {count}
        </span>
        <span style={{ ...textStyles["SubTitle/X-Small/SemiBold"], color: "var(--text-onsurface-default)", whiteSpace: "nowrap" }}>
          {label}
        </span>
      </span>
    </span>
  );
}

export function OrderButton({ state = "Default", label = "Orders", icon, count, style, ...rest }: OrderButtonProps) {
  const outer: CSSProperties = {
    boxSizing: "border-box",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    width: 126, height: 64, // raw, fixed
    padding: state === "Incoming Orders" ? 0 : "8px 12px", // raw
    border: "none", background: "none", cursor: "pointer", flex: "none",
    ...style,
  };
  if (state === "Incoming Orders") {
    return (
      <button type="button" style={outer} {...rest}>
        <OrderButtonAnimation label={label} count={count ?? "2"} />
      </button>
    );
  }
  const p = PILL[state];
  return (
    <button type="button" style={outer} {...rest}>
      <span
        style={{
          boxSizing: "border-box",
          display: "flex", alignItems: "center", gap: 4, padding: "4px 8px", // raw
          width: 102, height: 44, borderRadius: 100, // raw
          background: p.fill,
        }}
      >
        {count != null && <LocalCount>{count}</LocalCount>}
        {icon && <span aria-hidden style={{ display: "inline-flex", flex: "none", width: 28, height: 28, color: p.icon }}>{icon}</span>}
        <span style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
          <span style={{ ...textStyles["SubTitle/X-Small/Med"], color: p.text, whiteSpace: "nowrap" }}>{label}</span>
        </span>
      </span>
    </button>
  );
}

/* ------------------------------------------------------------------ bottom navigation */

export interface BottomNavItem {
  key: string;
  label: ReactNode;
  icon: ReactNode;
  selectedIcon?: ReactNode;
}

export interface BottomNavigationProps extends Omit<React.HTMLAttributes<HTMLElement>, "onSelect"> {
  /** 1–3 nav buttons (Figma variants "2 Buttons", "3 Buttons", "4 Buttons" = nav buttons + Order Button). */
  items: BottomNavItem[];
  selectedKey?: string;
  onSelect?: (key: string) => void;
  /** Props for the trailing `.Order Button`. */
  orderButton?: OrderButtonProps;
}

/** Root padding-right and "Buttons" frame padding (left/right) per variant. All raw. */
const LAYOUT: Record<number, { rootRight: number; left: number; right: number }> = {
  1: { rootRight: 32, left: 32, right: 32 }, // 2 Buttons
  2: { rootRight: 0, left: 32, right: 32 }, // 3 Buttons
  3: { rootRight: 0, left: 16, right: 4 }, // 4 Buttons
};

export function BottomNavigation({ items, selectedKey, onSelect, orderButton, style, ...rest }: BottomNavigationProps) {
  const l = LAYOUT[Math.min(Math.max(items.length, 1), 3)];
  return (
    <nav
      style={{
        boxSizing: "border-box",
        display: "flex", alignItems: "center",
        width: 360, // raw, fixed in Figma
        paddingRight: l.rootRight,
        background: "var(--surface-neutral-white)",
        boxShadow: "var(--elevation-s)",
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 20, // raw
          paddingLeft: l.left, paddingRight: l.right,
          flex: 1, minWidth: 0,
        }}
      >
        {items.slice(0, 3).map((it) => (
          <NavButton
            key={it.key}
            label={it.label}
            icon={it.icon}
            selectedIcon={it.selectedIcon}
            selected={it.key === selectedKey}
            onClick={() => onSelect?.(it.key)}
          />
        ))}
      </div>
      <OrderButton {...orderButton} />
    </nav>
  );
}

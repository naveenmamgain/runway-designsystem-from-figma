import React, { useEffect, useId, useState, type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";
import { BottomNavigation, type BottomNavigationProps } from "../BottomNavigation/BottomNavigation";

/**
 * Runway ModeSwitcher — captain mode switcher (Hub / Delivery / Bike Lift) and the floating bottom bar it sits in.
 * Source: Logistics file nJVb4xUWWcmIUArw5sAxIv, page "Ready for Dev", Section 1 (frames 556:39547, 119:14117,
 * 119:13985, 119:14011, 119:14091, 119:14051). The switcher is built from loose frames in Figma (not a component).
 *
 * Requires tokens/tokens.css. Mode colours come from the Mode tokens (`--mode-*`), which switch with
 * `data-mode="hub|delivery|bike-lift"` — this component sets that attribute on its root, and `ModeScope` can set it on a
 * whole screen. Sizes/spacing/radii are raw because Figma does not bind them (see spec.md).
 *
 * Open/close animation is NOT specified in Figma (no prototype links); the motion below is an assumption (spec.md).
 */

export type CaptainMode = "Hub" | "Delivery" | "Bike Lift";
export const CAPTAIN_MODES: CaptainMode[] = ["Bike Lift", "Delivery", "Hub"]; // top → bottom order in the open menu

export const modeAttr = (m: CaptainMode) => m.toLowerCase().replace(/\s+/g, "-"); // "bike-lift"

/** Sets data-mode on a subtree so every `--mode-*` token inside resolves to that mode. */
export function ModeScope({ mode, children, style, ...rest }: { mode: CaptainMode; children: ReactNode } & React.HTMLAttributes<HTMLDivElement>) {
  return <div data-mode={modeAttr(mode)} style={style} {...rest}>{children}</div>;
}

const modeGradient = (start: string, end: string) => `linear-gradient(180deg, var(${start}) 0%, var(${end}) 100%)`;

const REDUCED = "@media (prefers-reduced-motion: reduce){[data-runway-mode-switcher] *{animation:none!important;transition:none!important}}";
const KEYFRAMES =
  "@keyframes runway-mode-fade{from{opacity:0}to{opacity:1}}" +
  "@keyframes runway-mode-rise{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}";

/* ------------------------------------------------------------------ mode button (closed) */

export interface ModeButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  mode: CaptainMode;
  /** Mode icon, 40×40 (Figma: Hub = Service Icons/Bike Bike Taxi SM, Delivery = Bike_Parcel SM, Bike Lift = image). */
  icon: ReactNode;
}

export function ModeButton({ mode, icon, style, ...rest }: ModeButtonProps) {
  return (
    <button
      type="button"
      data-mode={modeAttr(mode)}
      aria-label={`Mode: ${mode}. Change mode`}
      style={{
        boxSizing: "border-box",
        width: 64, height: 64, flex: "none", // raw
        padding: 0, border: "none", borderRadius: 1000, // raw
        display: "inline-flex", alignItems: "center", justifyContent: "center",
        background: modeGradient("--mode-button-start", "--mode-button-end"),
        boxShadow: "var(--elevation-s)",
        cursor: "pointer",
        ...style,
      }}
      {...rest}
    >
      <span style={{ width: 40, height: 40, display: "inline-flex" }} aria-hidden>{icon}</span>
    </button>
  );
}

/* ------------------------------------------------------------------ mode menu (open) */

export interface ModeMenuProps {
  mode: CaptainMode;
  icons: Record<CaptainMode, ReactNode>;
  /** Close icon (Figma: Material `close`, Style=Round, 24×24). */
  closeIcon: ReactNode;
  onSelect: (mode: CaptainMode) => void;
  onClose: () => void;
  /** Height of the screen the overlay covers. Figma frame is 360×800. */
  style?: CSSProperties;
}

export function ModeMenu({ mode, icons, closeIcon, onSelect, onClose, style }: ModeMenuProps) {
  const id = useId();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      data-runway-mode-switcher=""
      role="dialog"
      aria-modal="true"
      aria-labelledby={`${id}-title`}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: "absolute", inset: 0, zIndex: 10,
        background: "var(--overlays-large-75pct-black)",
        animation: "runway-mode-fade 200ms ease-out",
        ...style,
      }}
    >
      <span id={`${id}-title`} style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>Choose mode</span>
      {/* "Spaces": vertical, gap 12, bottom-aligned at x 8 / bottom 8 (raw) */}
      <div role="radiogroup" aria-label="Mode" style={{ position: "absolute", left: 8, bottom: 8, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 12 }}>
        {CAPTAIN_MODES.map((m, i) => {
          const selected = m === mode;
          return (
            <button
              key={m}
              type="button"
              role="radio"
              aria-checked={selected}
              data-mode={modeAttr(m)}
              onClick={() => onSelect(m)}
              style={{
                boxSizing: "border-box",
                display: "flex", alignItems: "center", gap: 8, // raw
                height: 64, minWidth: 178, // raw (Figma pills hug to 178–180)
                padding: "12px 32px 12px 16px", // raw
                border: "none", borderRadius: 1000, // raw
                background: selected ? "var(--mode-pill-selected)" : "var(--surface-neutral-white)",
                cursor: "pointer",
                animation: `runway-mode-rise 220ms ease-out ${i * 40}ms both`,
              }}
            >
              <span style={{ width: 52, height: 52, flex: "none", display: "inline-flex" }} aria-hidden>{icons[m]}</span>
              <span
                style={{
                  ...textStyles["Title/X-Small/SemiBold"],
                  // Unselected pills override the style's weight to Regular in Figma.
                  fontWeight: selected ? textStyles["Title/X-Small/SemiBold"].fontWeight : ("var(--font-weight-base-regular)" as CSSProperties["fontWeight"]),
                  color: "var(--text-onsurface-default)",
                  whiteSpace: "nowrap",
                }}
              >
                {m}
              </span>
            </button>
          );
        })}
        <button
          type="button"
          aria-label="Close"
          onClick={onClose}
          style={{
            width: 64, height: 64, padding: 0, border: "none", borderRadius: 1000, // raw
            background: "#fbfdff", // raw, unbound in Figma; no Runway token has this value
            boxShadow: "var(--elevation-m)",
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            cursor: "pointer",
            animation: "runway-mode-fade 200ms ease-out",
            color: "var(--base-neutral-black)",
          }}
        >
          <span style={{ width: 24, height: 24, display: "inline-flex" }} aria-hidden>{closeIcon}</span>
        </button>
      </div>
      <style>{KEYFRAMES + REDUCED}</style>
    </div>
  );
}

/* ------------------------------------------------------------------ floating bottom bar */

export interface ModeBottomBarProps {
  mode: CaptainMode;
  onModeChange: (mode: CaptainMode) => void;
  icons: Record<CaptainMode, ReactNode>;
  closeIcon: ReactNode;
  /** Passed to Runway BottomNavigation (nav buttons + Order Button), rendered as a floating 272×64 pill. */
  navigation: BottomNavigationProps;
  /** Controlled open state (optional). */
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  style?: CSSProperties;
}

/**
 * Bottom area of the Logistics home: mode button + floating nav pill on a white fade, and the mode menu overlay.
 * Must be rendered inside a positioned screen container (the overlay is `position: absolute; inset: 0`).
 */
export function ModeBottomBar({ mode, onModeChange, icons, closeIcon, navigation, open: openProp, onOpenChange, style }: ModeBottomBarProps) {
  const [openState, setOpenState] = useState(false);
  const open = openProp ?? openState;
  const setOpen = (v: boolean) => { if (openProp === undefined) setOpenState(v); onOpenChange?.(v); };

  return (
    <>
      <div
        data-mode={modeAttr(mode)}
        style={{
          position: "absolute", left: 0, right: 0, bottom: 0,
          boxSizing: "border-box", height: 80, // raw
          display: "flex", alignItems: "center", gap: 8, padding: 8, // raw
          // Fade: #ffffff at 0 % alpha → #ffffff (Figma raw). Ends equal Base-Neutral/White.
          background: "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, var(--base-neutral-white) 100%)",
          ...style,
        }}
      >
        <ModeButton mode={mode} icon={icons[mode]} aria-expanded={open} aria-haspopup="dialog" onClick={() => setOpen(true)} />
        <BottomNavigation
          {...navigation}
          style={{ width: 272, height: 64, borderRadius: 1000 /* raw */, overflow: "hidden", ...navigation.style }}
        />
      </div>
      {open && (
        <ModeMenu
          mode={mode}
          icons={icons}
          closeIcon={closeIcon}
          onClose={() => setOpen(false)}
          onSelect={(m) => { onModeChange(m); setOpen(false); }}
        />
      )}
    </>
  );
}

export default ModeBottomBar;

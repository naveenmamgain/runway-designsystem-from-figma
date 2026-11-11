import React, { type CSSProperties, type ReactNode } from "react";
import { DutyToggle, type DutyStatus } from "../DutyToggle/DutyToggle";
import { AndroidStatusBar } from "../AndroidStatusBar/AndroidStatusBar";

/**
 * Runway HomepageHeader — Figma: Homepage Header (715:125593).
 * Requires tokens/tokens.css. Fill and elevation are tokens; spacing and icon sizes are raw (unbound in Figma).
 */

export interface HomepageHeaderProps extends React.HTMLAttributes<HTMLElement> {
  /** Figma "Duty Type" (Off duty | On Duty). */
  dutyStatus?: DutyStatus;
  onDutyChange?: (next: DutyStatus) => void;
  /** Figma "Show Android Status Bar" (default false). */
  showAndroidStatusBar?: boolean;
  /** Figma "Leading Icon" (default Hamburger Menu), 24×24. */
  leadingIcon?: ReactNode;
  /** Figma "1st Trailing Icon" (default GTA / State=Default), 24×24. */
  trailingIcon1?: ReactNode;
  /** Figma "2nd Trailing Icon" (default Notification), 24×24. */
  trailingIcon2?: ReactNode;
}

// Icon vectors are unbound #000000 in Figma; equals Base-Neutral/Black.
const icon: CSSProperties = { display: "inline-flex", flex: "none", width: 24, height: 24, color: "var(--base-neutral-black)" };

export function HomepageHeader({
  dutyStatus = "Off Duty",
  onDutyChange,
  showAndroidStatusBar = false,
  leadingIcon,
  trailingIcon1,
  trailingIcon2,
  style,
  ...rest
}: HomepageHeaderProps) {
  const root: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    width: "100%",
    background: "var(--surface-neutral-white)",
    boxShadow: "var(--elevation-s)",
    ...style,
  };
  const row: CSSProperties = {
    boxSizing: "border-box",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 27, // raw
    padding: "12px 16px", // raw
  };
  return (
    <header style={root} {...rest}>
      {showAndroidStatusBar && <AndroidStatusBar style={{ height: 32 }} /* instance override in Figma */ />}
      <div style={row}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 /* raw */, flex: "1 1 0", minWidth: 0 }}>
          {leadingIcon && <span style={icon}>{leadingIcon}</span>}
        </div>
        <div style={{ flex: "none", width: 162 /* raw, Duty Toggle instance width */ }}>
          <DutyToggle status={dutyStatus} onChange={onDutyChange} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 /* raw */, flex: "none" }}>
          {trailingIcon1 && <span style={icon}>{trailingIcon1}</span>}
          {trailingIcon2 && <span style={icon}>{trailingIcon2}</span>}
        </div>
      </div>
    </header>
  );
}

export default HomepageHeader;

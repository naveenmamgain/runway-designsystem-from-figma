import React, { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { textStyles } from "../_shared/textStyles";

/**
 * Runway SwipeButton (swipe-to-confirm).
 *
 * SOURCE (decision C28, design review 2026-11-16): the D02 option B slider. E-rickshaw file Mtv6LZ3AG2DqZmJp6S9KMv,
 * component set `Buttons` (433:38829), 3 variants that are frames of one hint animation: 433:38830 (rest),
 * 433:38835 (shine at the right, knob nudged +30), 433:38840 (no shine). Instance in context: frame 1041:159968,
 * node 1041:160353 ("राइड पूरी हो गई").
 *
 * COLOUR BY STEP (decision D16 = B, delivery only): blue ARRIVED, black PICKED / DELIVERED, red REACHED
 * (B2B Delivery BMJzeTVlQYTDjcmHERwgVy, 1:3013 / 1:3148 / 1:3220 / 1:3227). A deliberate exception to the yellow primary.
 *
 * USE: bike, auto and cab trip steps and delivery steps (D02). NOT for e-rickshaw, which uses tap + a confirm sheet.
 *
 * BEHAVIOUR: drag the knob along the track; release past 85 % of the travel to call `onConfirm`, otherwise it snaps
 * back. The whole control is one `role="button"`: Enter or Space confirms. If `onConfirm` returns a promise the
 * knob stays at the end with a spinner until it settles (or pass `loading`). Shine, nudge and snap animations are
 * off under `prefers-reduced-motion`. The label wraps to 2 lines and is never truncated (R02).
 *
 * Requires tokens/tokens.css. Colours, height, radius and type are tokens; insets and knob size are raw because
 * Figma binds no variable to them (see spec.md).
 */

export type SwipeButtonTone = "default" | "blue" | "black" | "red";

export interface SwipeButtonProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "role" | "onKeyDown" | "onPointerDown"> {
  /** Text on the track, e.g. "Complete ride", "ARRIVED", "राइड पूरी हो गई". Wraps to 2 lines, never truncated. */
  label: ReactNode;
  /** Called once the swipe passes the threshold, or on Enter / Space. Return a promise to show the loading state. */
  onConfirm: () => void | Promise<unknown>;
  /** "default" = the D02 option B slider colour (red). blue / black / red = delivery steps (D16). */
  tone?: SwipeButtonTone;
  /** Not used in delivery (D17: the swipe is never disabled there). Kept for other flows. */
  disabled?: boolean;
  /** Controlled loading state. When omitted, loading follows the promise returned by `onConfirm`. */
  loading?: boolean;
  /** Fraction of the knob's travel the release must pass to confirm. Default 0.85. */
  threshold?: number;
  /** Replaces the default 36×36 arrow inside the knob. Paint with currentColor. */
  icon?: ReactNode;
  /** Accessible name when `label` is not plain text. */
  "aria-label"?: string;
}

/* ------------------------------------------------------------------ values */

const INSET = 4; // raw: knob top/left in Figma (433:38833 at x 4, y 4)
const KNOB = 44; // raw: knob 44×44, radius 50
const ICON = 36; // raw: "Leading Icon" 36×36
const NUDGE = 30; // raw: knob x 4 → 34 between variants 433:38830 and 433:38835

const TONES: Record<SwipeButtonTone, { track: string; knob: string }> = {
  // Figma 433:38830: track Surface/Error/Dark (#c42925, bound), knob Mapped-Red/Red-200 (#ff837c, bound).
  default: { track: "var(--surface-error-dark)", knob: "var(--mapped-red-red-200)" },
  // D16 REACHED. 1:3220 is a screenshot of the live app (no layers); mapped to the same tokens as default.
  red: { track: "var(--surface-error-dark)", knob: "var(--mapped-red-red-200)" },
  // D16 ARRIVED, 1:3017: track raw #2b72ee → Surface/Information/Dark (#146edc); knob raw #4186ff → Blue/300 (#5ca2f6).
  blue: { track: "var(--surface-information-dark)", knob: "var(--mapped-blue-blue-300)" },
  // D16 PICKED / DELIVERED, 1:3238: track raw #000000 → Surface/Neutral/Black; knob raw #333333 → Gray/800 (#253041).
  black: { track: "var(--surface-neutral-black)", knob: "var(--mapped-gray-gray-800)" },
};

/** Not in Figma: Runway disabled colours, as used by Button. */
const DISABLED = { track: "var(--surface-neutral-light)", knob: "var(--surface-neutral-medium)", text: "var(--text-onsurface-disabled)" };

const CSS =
  // Shine: white parallelogram, 20 % opacity, blur 4 (433:38831), sweeps from x −49 to x 321 on a 328 track.
  "@keyframes runway-swipe-shine{0%{left:-49px}60%,100%{left:calc(100% - 7px)}}" +
  // Knob nudge: x 4 → 34 → 4 (variants 433:38830 → 433:38835 → 433:38840).
  `@keyframes runway-swipe-nudge{0%,100%{transform:none}30%{transform:translateX(${NUDGE}px)}60%{transform:none}}` +
  "@keyframes runway-swipe-spin{to{transform:rotate(360deg)}}" +
  "[data-runway-swipe]:focus-visible{outline:2px solid var(--border-neutral-black);outline-offset:2px}" +
  "@media (prefers-reduced-motion: reduce){[data-runway-swipe] *{animation:none!important;transition:none!important}" +
  "[data-runway-swipe] [data-shine]{display:none}}";

/** Figma "Leading Icon" (433:38834): 36×36 arrow, white. */
const Arrow = (
  <svg width={ICON} height={ICON} viewBox="0 0 36 36" fill="none" aria-hidden>
    <path d="M24.2625 19.5H6V16.5H24.2625L15.8625 8.1L18 6L30 18L18 30L15.8625 27.9L24.2625 19.5Z" fill="currentColor" />
  </svg>
);

/** Not in Figma: loading spinner shown in the knob after confirm. */
const Spinner = (
  <span
    aria-hidden
    style={{
      boxSizing: "border-box",
      width: 20, // raw
      height: 20,
      borderRadius: "50%",
      border: "2.5px solid currentColor",
      borderRightColor: "transparent",
      animation: "runway-swipe-spin 0.8s linear infinite",
    }}
  />
);

/* ------------------------------------------------------------------ component */

export function SwipeButton({
  label,
  onConfirm,
  tone = "default",
  disabled = false,
  loading: loadingProp,
  threshold = 0.85,
  icon,
  style,
  ...rest
}: SwipeButtonProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ startX: number; max: number; pointerId: number } | null>(null);
  const [x, setX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [pending, setPending] = useState(false);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => void (mounted.current = false);
  }, []);

  const loading = loadingProp ?? pending;
  const busy = disabled || loading;
  const colours = disabled ? DISABLED : TONES[tone];

  const maxTravel = () => Math.max(0, (trackRef.current?.clientWidth ?? 0) - KNOB - INSET * 2);

  const confirm = useCallback(() => {
    if (busy) return;
    setX(maxTravel());
    const result = onConfirm();
    if (result && typeof (result as Promise<unknown>).then === "function") {
      setPending(true);
      (result as Promise<unknown>).finally(() => {
        if (!mounted.current) return;
        setPending(false);
        setX(0);
      });
    } else if (loadingProp === undefined) {
      setX(0); // synchronous confirm: return to rest
    }
  }, [busy, onConfirm, loadingProp]);

  // Controlled loading: sit at the end while true, go back to rest when it clears.
  useEffect(() => {
    if (loadingProp === undefined) return;
    setX(loadingProp ? maxTravel() : 0);
  }, [loadingProp]);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (busy || (e.pointerType === "mouse" && e.button !== 0)) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    drag.current = { startX: e.clientX, max: maxTravel(), pointerId: e.pointerId };
    setDragging(true);
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;
    setX(Math.min(d.max, Math.max(0, e.clientX - d.startX)));
  };
  const endDrag = (e: React.PointerEvent<HTMLDivElement>, cancelled = false) => {
    const d = drag.current;
    if (!d || d.pointerId !== e.pointerId) return;
    drag.current = null;
    setDragging(false);
    const travelled = d.max > 0 ? Math.min(d.max, Math.max(0, e.clientX - d.startX)) / d.max : 0;
    if (!cancelled && travelled >= threshold) confirm();
    else setX(0); // snap back
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      confirm();
    }
  };

  const idle = !busy && !dragging && x === 0;

  return (
    <div
      ref={trackRef}
      data-runway-swipe=""
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      aria-busy={loading || undefined}
      onKeyDown={onKeyDown}
      style={{
        boxSizing: "border-box",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%", // Figma 328 at 360 (16 side margins)
        minHeight: "var(--button-button-height)", // 52, bound; min so 2-line labels grow the track (R02)
        // Label clears the knob on both sides so it stays centred: 4 + 44 + 8 = 56 (raw).
        padding: `${INSET}px ${INSET + KNOB + 8}px`,
        borderRadius: "var(--button-radius)", // 999, bound
        background: colours.track,
        overflow: "hidden",
        cursor: busy ? "default" : "pointer",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "pan-y",
        ...style,
      }}
      {...rest}
    >
      <style>{CSS}</style>

      {/* Shine (433:38831): 60×52, white 20 %, blur 4. Only at rest. */}
      {idle && (
        <span
          aria-hidden
          data-shine=""
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: -49,
            width: 60,
            background: "var(--surface-neutral-white)",
            opacity: 0.2, // raw
            filter: "blur(4px)", // raw
            clipPath: "polygon(36.6% 0, 100% 0, 67.7% 100%, 0 100%)", // Figma path, normalised to 60×52
            animation: "runway-swipe-shine 2.4s ease-in-out infinite", // timing not in Figma
            pointerEvents: "none",
          }}
        />
      )}

      {/* Label (433:38832): Button/Moderate/Bold, Text/OnSurface/Inverse, centred. Wraps to 2 lines, never truncated. */}
      <span
        style={{
          ...textStyles["Button/Moderate/Bold"],
          position: "relative",
          color: disabled ? DISABLED.text : "var(--text-onsurface-inverse)",
          textAlign: "center",
          whiteSpace: "normal",
          overflowWrap: "anywhere",
          paddingBlock: 12, // raw: (52 − 8 − 20) / 2 keeps one line at 52
          pointerEvents: "none",
        }}
      >
        {label}
      </span>

      {/* Knob (433:38833): 44×44 circle at 4, 4. Vertically centred so it stays put when the label wraps. */}
      <div
        aria-hidden
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={(e) => endDrag(e)}
        onPointerCancel={(e) => endDrag(e, true)}
        style={{
          position: "absolute",
          left: INSET,
          top: "50%",
          width: KNOB,
          height: KNOB,
          marginTop: -KNOB / 2,
          transform: `translateX(${x}px)`,
          transition: dragging ? "none" : "transform 200ms ease-out", // not in Figma
          touchAction: "none",
          cursor: busy ? "default" : dragging ? "grabbing" : "grab",
        }}
      >
        <span
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            borderRadius: 50, // raw
            background: colours.knob,
            color: "var(--surface-neutral-white)", // icon raw white in Figma (also on the disabled knob)
            animation: idle ? "runway-swipe-nudge 2.4s ease-in-out infinite" : undefined,
          }}
        >
          {loading ? Spinner : icon ?? Arrow}
        </span>
      </div>
    </div>
  );
}

export default SwipeButton;

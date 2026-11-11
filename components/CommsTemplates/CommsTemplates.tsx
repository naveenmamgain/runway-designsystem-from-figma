import React, { type CSSProperties, type ReactNode } from "react";

/**
 * Runway Comms Templates — Figma: Comms Templates (2429:4649), 4 variants.
 * Figma defines only the canvas size of each template (empty white frames, clip content). The creative
 * is supplied via `image` and/or `children`.
 */

export type CommsTemplateVariant = "CT Banners" | "In-App Notification Banners" | "Pitch Center" | "Storyly";

// Raw: fixed, unbound frame sizes from Figma.
const SIZE: Record<CommsTemplateVariant, { width: number; height: number }> = {
  "CT Banners": { width: 360, height: 640 },
  "Pitch Center": { width: 264, height: 352 },
  Storyly: { width: 360, height: 720 },
  "In-App Notification Banners": { width: 328, height: 160 },
};

export interface CommsTemplatesProps {
  /** Figma "Property 1". */
  variant?: CommsTemplateVariant;
  /** Creative image URL; covers the whole canvas. */
  image?: string;
  /** Alt text for the creative image. */
  imageAlt?: string;
  /** Content layered over the image (copy, CTA, …). */
  children?: ReactNode;
  style?: CSSProperties;
}

export function CommsTemplates({ variant = "CT Banners", image, imageAlt = "", children, style }: CommsTemplatesProps) {
  const { width, height } = SIZE[variant];
  return (
    <div
      style={{
        position: "relative",
        boxSizing: "border-box",
        width,
        height,
        overflow: "hidden", // Figma: clip content
        background: "var(--surface-neutral-white)", // unbound #ffffff in Figma
        ...style,
      }}
    >
      {image && (
        <img
          src={image}
          alt={imageAlt}
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
        />
      )}
      {children != null && <div style={{ position: "relative", width: "100%", height: "100%" }}>{children}</div>}
    </div>
  );
}

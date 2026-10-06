"use client";

import Image from "next/image";
import { useRef, type PointerEvent } from "react";
import styles from "./interactive-card-artwork.module.css";

type InteractiveCardArtworkProps = {
  name: string;
  imageUrl: string | null;
  sizes: string;
  priority?: boolean;
};

export function InteractiveCardArtwork({
  name,
  imageUrl,
  sizes,
  priority = false,
}: InteractiveCardArtworkProps) {
  const visualRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);

  const resetEffect = () => {
    const visual = visualRef.current;
    if (!visual) return;

    visual.style.setProperty("--rotate-x", "0deg");
    visual.style.setProperty("--rotate-y", "0deg");
    visual.style.setProperty("--pointer-x", "50%");
    visual.style.setProperty("--pointer-y", "50%");
    visual.style.setProperty("--shadow-x", "0px");
    visual.style.setProperty("--shadow-y", "1.25rem");
    visual.dataset.active = "false";
  };

  const updateEffect = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;

    const visual = visualRef.current;
    if (!visual) return;

    const { left, top, width, height } = visual.getBoundingClientRect();
    const x = Math.min(Math.max((event.clientX - left) / width, 0), 1);
    const y = Math.min(Math.max((event.clientY - top) / height, 0), 1);

    if (frameRef.current) cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      visual.style.setProperty("--rotate-x", `${(0.5 - y) * 16}deg`);
      visual.style.setProperty("--rotate-y", `${(x - 0.5) * 20}deg`);
      visual.style.setProperty("--pointer-x", `${x * 100}%`);
      visual.style.setProperty("--pointer-y", `${y * 100}%`);
      visual.style.setProperty("--shadow-x", `${(0.5 - x) * 24}px`);
      visual.style.setProperty("--shadow-y", `${(0.5 - y) * 24 + 20}px`);
      visual.dataset.active = "true";
    });
  };

  return (
    <div
      ref={visualRef}
      className={styles.visual}
      data-active="false"
      onPointerMove={updateEffect}
      onPointerLeave={resetEffect}
    >
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={`Carte ${name}`}
          fill
          sizes={sizes}
          priority={priority}
          className={styles.image}
        />
      ) : (
        <div className={styles.placeholder}>
          <span aria-hidden="true">TCG</span>
          <strong>Visuel indisponible</strong>
        </div>
      )}
      <span className={styles.holographic} aria-hidden="true" />
      <span className={styles.glare} aria-hidden="true" />
    </div>
  );
}

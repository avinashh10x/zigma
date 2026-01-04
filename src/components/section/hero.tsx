"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const IMAGE_URL =
  "https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=800&auto=format&fit=crop";

const IMAGES = Array(12).fill(IMAGE_URL);

export default function Hero() {
  const rootRef = useRef<HTMLOptionElement | null>(null);

  const incr = useRef(0);
  const oldX = useRef(0);
  const oldY = useRef(0);
  const indexImg = useRef(0);
  const resetDist = useRef(0);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    resetDist.current = window.innerWidth / 8;

    const handleFirstMove = (e: MouseEvent) => {
      oldX.current = e.clientX;
      oldY.current = e.clientY;
    };

    const handleMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY - root.getBoundingClientRect().top;

      incr.current +=
        Math.abs(x - oldX.current) + Math.abs(y - oldY.current);

      if (incr.current > resetDist.current) {
        incr.current = 0;
        createMedia(
          root,
          x,
          y,
          x - oldX.current,
          y - oldY.current
        );
      }

      oldX.current = x;
      oldY.current = y;
    };

    root.addEventListener("mousemove", handleFirstMove, { once: true });
    root.addEventListener("mousemove", handleMove);

    return () => {
      root.removeEventListener("mousemove", handleMove);
    };
  }, []);

  const createMedia = (
    root: HTMLElement,
    x: number,
    y: number,
    deltaX: number,
    deltaY: number
  ) => {
    const image = document.createElement("img");
    image.src = IMAGES[indexImg.current];
    image.className =
      "pointer-events-none absolute w-[15vw] h-[15vw] object-cover rounded-md z-50";

    root.appendChild(image);

    const tl = gsap.timeline({
      onComplete: () => {
        root.removeChild(image);
        tl.kill();
      },
    });

    tl.fromTo(
      image,
      {
        xPercent: -50 + (Math.random() - 0.5) * 80,
        yPercent: -50 + (Math.random() - 0.5) * 10,
        scale: 1.3,
      },
      {
        scale: 1,
        duration: 0.6,
        ease: "elastic.out(2, 0.6)",
      }
    );

    tl.fromTo(
      image,
      {
        x,
        y,
        rotation: (Math.random() - 0.5) * 20,
      },
      {
        x: x + deltaX * 4,
        y: y + deltaY * 4,
        rotation: (Math.random() - 0.5) * 20,
        duration: 1.5,
        ease: "power4.out",
      },
      "<"
    );

    tl.to(image, {
      scale: 0.5,
      duration: 0.3,
      delay: 0.1,
      ease: "back.in(1.5)",
    });

    indexImg.current = (indexImg.current + 1) % IMAGES.length;
  };

  return (
    <section
      ref={rootRef}
      className="relative h-screen overflow-hidden bg-background text-foreground"
    >

      {/* Center Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-[3vw] text-center">
        <p className="w-[65%] text-[6vw] leading-[0.76] font-serif italic uppercase tracking-[-0.05em]">
          Design Faster, Collaborate Better, Create Smarter
        </p>

        <p className="max-w-[34vw] text-xs md:text-sm uppercase font-mono">
          Transform your creative workflow with powerful design tools and seamless collaboration
        </p>
      </div>
    </section>
  );
}

"use client";

import { Children, ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Maximize, Minimize, StickyNote, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SlideDeckProps {
  children: ReactNode;
  notes?: string[];
}

export function SlideDeck({ children, notes }: SlideDeckProps) {
  const slides = useMemo(() => Children.toArray(children), [children]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const swipeStartX = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const totalSlides = slides.length;
  const currentNote = notes?.[currentSlide];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }

    containerRef.current?.requestFullscreen();
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        nextSlide();
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        prevSlide();
      } else if (event.key === "Home") {
        event.preventDefault();
        setCurrentSlide(0);
      } else if (event.key === "End") {
        event.preventDefault();
        setCurrentSlide(totalSlides - 1);
      } else if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        toggleFullscreen();
      } else if (event.key === "n" || event.key === "N") {
        event.preventDefault();
        setShowNotes((value) => !value);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextSlide, prevSlide, toggleFullscreen, totalSlides]);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[100dvh] w-screen flex-col overflow-hidden bg-background text-foreground"
      onPointerDown={(event) => {
        swipeStartX.current = event.clientX;
      }}
      onPointerUp={(event) => {
        if (swipeStartX.current === null) return;

        const deltaX = event.clientX - swipeStartX.current;
        swipeStartX.current = null;

        if (Math.abs(deltaX) < 64) return;
        if (deltaX < 0) nextSlide();
        else prevSlide();
      }}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,var(--primary),transparent_34%),radial-gradient(circle_at_bottom_right,var(--primary),transparent_28%)] opacity-10" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:72px_72px] opacity-25" />

      <div className="absolute right-4 top-4 z-50 flex items-center gap-3">
        <div className="rounded-full border border-border/70 bg-background/70 px-3 py-1 text-sm font-medium text-muted-foreground shadow-sm backdrop-blur">
          {currentSlide + 1} / {totalSlides}
        </div>
        {notes && (
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowNotes((value) => !value)}
            className={cn(
              "rounded-full border border-border/70 bg-background/70 shadow-sm backdrop-blur hover:bg-background/90",
              showNotes && "text-primary"
            )}
            title="Konuşmacı notları (N)"
          >
            <StickyNote className="h-5 w-5" />
            <span className="sr-only">{showNotes ? "Notları gizle" : "Notları göster"}</span>
          </Button>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleFullscreen}
          className="rounded-full border border-border/70 bg-background/70 shadow-sm backdrop-blur hover:bg-background/90"
          title="Tam ekran (F)"
        >
          {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          <span className="sr-only">{isFullscreen ? "Tam ekrandan çık" : "Tam ekran yap"}</span>
        </Button>
        <Link href="/">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-border/70 bg-background/70 shadow-sm backdrop-blur hover:bg-background/90"
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Kapat</span>
          </Button>
        </Link>
      </div>

      <div className="relative flex-1">
        {slides.map((child, index) => {
          const offset = index - currentSlide;
          const translateX = offset === 0 ? "translate-x-0" : offset < 0 ? "-translate-x-full" : "translate-x-full";

          return (
            <section
              key={index}
              className={cn(
                "absolute inset-0 flex items-center justify-center p-6 transition-all duration-500 ease-out sm:p-10 md:p-14 lg:p-20",
                translateX,
                offset === 0 ? "opacity-100 scale-100" : "pointer-events-none opacity-0 scale-95"
              )}
              aria-hidden={offset !== 0}
            >
              <div className="mx-auto w-full max-w-6xl">{child}</div>
            </section>
          );
        })}
      </div>

      <div className="absolute inset-x-0 bottom-8 z-50 flex items-center justify-center gap-5 px-4">
        <Button
          variant="outline"
          size="icon"
          onClick={prevSlide}
          disabled={currentSlide === 0}
          className="h-11 w-11 rounded-full bg-background/70 shadow-sm backdrop-blur hover:bg-background/90"
        >
          <ChevronLeft className="h-5 w-5" />
          <span className="sr-only">Önceki</span>
        </Button>

        <div className="flex max-w-[58vw] items-center gap-1.5 overflow-hidden rounded-full border border-border/60 bg-background/60 px-3 py-2 shadow-sm backdrop-blur">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={cn(
                "h-2.5 rounded-full transition-all duration-300",
                index === currentSlide ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              )}
              aria-label={`${index + 1}. slayta git`}
            />
          ))}
        </div>

        <Button
          variant="outline"
          size="icon"
          onClick={nextSlide}
          disabled={currentSlide === totalSlides - 1}
          className="h-11 w-11 rounded-full bg-background/70 shadow-sm backdrop-blur hover:bg-background/90"
        >
          <ChevronRight className="h-5 w-5" />
          <span className="sr-only">Sonraki</span>
        </Button>
      </div>

      {showNotes && (
        <div className="absolute inset-x-4 bottom-24 z-50 mx-auto max-w-3xl rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur">
          <div className="mb-1 text-xs font-bold uppercase tracking-[0.24em] text-primary">Konuşmacı notu</div>
          <p className="text-sm leading-relaxed text-foreground">{currentNote || "Bu slayt için not yok."}</p>
        </div>
      )}

      <div className="absolute inset-x-0 bottom-0 h-1.5 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-500 ease-out"
          style={{ width: `${((currentSlide + 1) / totalSlides) * 100}%` }}
        />
      </div>
    </div>
  );
}

export function SlideTitle({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h1
      className={cn(
        "mb-7 text-balance bg-gradient-to-br from-foreground to-foreground/65 bg-clip-text text-4xl font-bold leading-tight tracking-tight text-transparent md:text-6xl lg:text-7xl",
        className
      )}
    >
      {children}
    </h1>
  );
}

export function SlideContent({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className={cn("text-balance text-xl font-medium leading-relaxed text-muted-foreground md:text-3xl", className)}>
      {children}
    </div>
  );
}

export function SlideHighlight({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("font-semibold text-primary", className)}>{children}</span>;
}

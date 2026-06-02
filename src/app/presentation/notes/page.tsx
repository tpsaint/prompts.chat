"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, RadioTower, WifiOff } from "lucide-react";

type DeckState = {
  currentSlide: number;
  totalSlides: number;
  notes: string[];
};

export default function PresenterNotesPage() {
  const channelRef = useRef<BroadcastChannel | null>(null);
  const [state, setState] = useState<DeckState | null>(null);
  const [connected, setConnected] = useState(false);

  const send = useCallback((message: Record<string, unknown>) => {
    channelRef.current?.postMessage(message);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || typeof BroadcastChannel === "undefined") return;

    const channel = new BroadcastChannel("prompts-presentation");
    channelRef.current = channel;

    channel.onmessage = (event) => {
      const data = event.data;
      if (data?.type === "state") {
        setConnected(true);
        setState({
          currentSlide: data.currentSlide ?? 0,
          totalSlides: data.totalSlides ?? 0,
          notes: Array.isArray(data.notes) ? data.notes : [],
        });
      }
    };

    channel.postMessage({ type: "request" });
    const retry = setInterval(() => {
      if (!channelRef.current) return;
      channelRef.current.postMessage({ type: "request" });
    }, 1000);

    return () => {
      clearInterval(retry);
      channel.close();
      channelRef.current = null;
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        send({ type: "next" });
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        send({ type: "prev" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [send]);

  const current = state?.currentSlide ?? 0;
  const total = state?.totalSlides ?? 0;
  const notes = state?.notes ?? [];
  const currentNote = notes[current];
  const nextNote = notes[current + 1];
  const atStart = current <= 0;
  const atEnd = total > 0 && current >= total - 1;

  return (
    <div className="flex h-[100dvh] w-screen flex-col bg-zinc-950 text-zinc-100">
      <header className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          <span className="text-sm font-bold uppercase tracking-[0.28em] text-primary">Presenter notes</span>
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${
              connected ? "bg-emerald-500/15 text-emerald-300" : "bg-amber-500/15 text-amber-300"
            }`}
          >
            {connected ? <RadioTower className="h-3.5 w-3.5" /> : <WifiOff className="h-3.5 w-3.5" />}
            {connected ? "Synced" : "Waiting for deck…"}
          </span>
        </div>
        <div className="rounded-full border border-white/15 px-4 py-1.5 text-sm font-semibold text-zinc-300">
          {total > 0 ? `Slide ${current + 1} / ${total}` : "—"}
        </div>
      </header>

      <main className="flex flex-1 flex-col gap-6 overflow-hidden p-6 sm:p-8">
        <section className="flex min-h-0 flex-1 flex-col rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <div className="mb-4 text-xs font-bold uppercase tracking-[0.24em] text-primary">Now</div>
          <div className="min-h-0 flex-1 overflow-y-auto pr-2">
            {connected ? (
              <p className="text-2xl font-medium leading-relaxed text-zinc-100 sm:text-3xl">
                {currentNote || "No note for this slide."}
              </p>
            ) : (
              <p className="text-xl text-zinc-400">
                Open the presentation in another window and this view will sync automatically.
              </p>
            )}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-5 sm:p-6">
          <div className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-zinc-500">Next</div>
          <p className="line-clamp-3 text-base leading-relaxed text-zinc-400 sm:text-lg">
            {atEnd ? "End of deck." : nextNote || "—"}
          </p>
        </section>
      </main>

      <footer className="flex items-center justify-center gap-5 border-t border-white/10 px-6 py-5">
        <button
          onClick={() => send({ type: "prev" })}
          disabled={atStart}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <span className="min-w-[5rem] text-center text-sm font-medium text-zinc-400">
          {total > 0 ? `${current + 1} / ${total}` : "—"}
        </span>
        <button
          onClick={() => send({ type: "next" })}
          disabled={atEnd}
          className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-white/5 text-zinc-200 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </footer>
    </div>
  );
}

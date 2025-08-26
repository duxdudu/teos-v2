"use client";

import React, { useEffect, useRef, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";

interface LightboxDialogProps {
  images: { src: string; alt?: string }[];
  isOpen: boolean;
  startIndex: number;
  onClose: () => void;
  onNavigate?: (nextIndex: number) => void;
}

export default function LightboxDialog({ images, isOpen, startIndex, onClose, onNavigate }: LightboxDialogProps) {
  const { t } = useTranslation();
  const [index, setIndex] = React.useState(startIndex);
  const overlayRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const goNext = useCallback(() => {
    const next = (index + 1) % images.length;
    setIndex(next);
    onNavigate?.(next);
  }, [index, images.length, onNavigate]);

  const goPrev = useCallback(() => {
    const prev = (index - 1 + images.length) % images.length;
    setIndex(prev);
    onNavigate?.(prev);
  }, [index, images.length, onNavigate]);

  useEffect(() => {
    if (isOpen) {
      setIndex(startIndex);
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus();
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen, startIndex]);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, index, goNext, goPrev, onClose]);

  if (!isOpen) return null;

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[100]"
      role="dialog"
      aria-modal="true"
      aria-label={t("common.imagePreview", { defaultValue: "Image preview" })}
    >
      <div
        ref={overlayRef}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={(e) => {
          if (e.target === overlayRef.current) onClose();
        }}
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="relative w-full max-w-5xl aspect-[16/10] animate-in zoom-in-90 fade-in slide-in-from-bottom-4 duration-500">
          <div className="absolute -top-12 left-0 right-0 mx-auto flex items-center justify-between max-w-5xl px-2">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/10 px-3 py-2 text-white hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-label={t("common.close", { defaultValue: "Close" })}
            >
              <X className="h-5 w-5" />
              <span className="hidden sm:inline">{t("common.close", { defaultValue: "Close" })}</span>
            </button>
            <div className="text-white text-sm bg-white/10 border border-white/30 rounded-md px-2 py-1">
              {index + 1}/{images.length}
            </div>
          </div>

          <div className="relative w-full h-full rounded-lg overflow-hidden shadow-2xl">
            <Image
              src={current.src}
              alt={current.alt || "Preview"}
              fill
              className="object-contain scale-100 data-[enter]:animate-[lb-enter_500ms_ease]"
              priority
            />
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-2">
            <button
              type="button"
              onClick={goPrev}
              className="pointer-events-auto inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md transition"
              aria-label={t("common.previous", { defaultValue: "Previous" })}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="pointer-events-auto inline-flex items-center justify-center h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-white/15 hover:bg-white/25 text-white border border-white/30 backdrop-blur-md transition"
              aria-label={t("common.next", { defaultValue: "Next" })}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="absolute bottom-2 left-0 right-0 mx-auto max-w-4xl px-3">
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 rounded-lg border border-white/20 bg-black/40 backdrop-blur-md p-3 text-white">
              <p className="text-sm sm:text-base font-medium truncate" title={current.alt || ""}>
                {current.alt || t("common.image", { defaultValue: "Image" })}
              </p>
              <p className="text-xs text-white/80 mt-1">
                {t("common.navigateHint", { defaultValue: "Use ← → keys to navigate, Esc to close" })}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



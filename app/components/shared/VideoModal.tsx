'use client';

import {useEffect} from 'react';
import {createPortal} from 'react-dom';

interface VideoModalProps {
  open: boolean;
  src: string;
  ariaLabel: string;
  onClose: () => void;
}

export function VideoModal({
  open,
  src,
  ariaLabel,
  onClose,
}: VideoModalProps) {
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, open]);

  if (!open || typeof document === 'undefined') return null;

  return createPortal(
    <div
      className="ft-video-modal"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="ft-video-modal__content">
        <button
          type="button"
          className="ft-video-modal__close"
          onClick={onClose}
          aria-label="Close video"
        >
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M5 5L19 19M19 5L5 19"
              stroke="currentColor"
            />
          </svg>
        </button>

        <video
          className="ft-video-modal__video"
          src={src}
          controls
          autoPlay
          playsInline
        />
      </div>
    </div>,
    document.body,
  );
}

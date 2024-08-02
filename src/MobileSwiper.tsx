import { useCallback, useEffect, useState, useRef, ReactNode } from "react";

interface MobileSwiperProps {
  children: ReactNode;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
  onSwipe: (swipeData: { deltaX: number; deltaY: number }) => void;
}

export default function MobileSwiper({
  className,
  children,
  onSwipe,
  onClick,
}: MobileSwiperProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!wrapperRef.current || !wrapperRef.current.contains(e.target as Node)) {
      return;
    }

    setStartX(e.touches[0].clientX);
    setStartY(e.touches[0].clientY);
  }, []);

  const handleTouchEnd = useCallback(
    (e: TouchEvent) => {
      if (
        !wrapperRef.current ||
        !wrapperRef.current.contains(e.target as Node)
      ) {
        return;
      }

      const endX = e.changedTouches[0].clientX;
      const endY = e.changedTouches[0].clientY;
      const deltaX = endX - startX;
      const deltaY = endY - startY;

      onSwipe({ deltaX, deltaY });
    },
    [startX, startY, onSwipe]
  );

  useEffect(() => {
    const wrapper = wrapperRef.current;

    if (wrapper) {
      wrapper.addEventListener("touchstart", handleTouchStart);
      wrapper.addEventListener("touchend", handleTouchEnd);

      return () => {
        if (wrapper) {
          wrapper.removeEventListener("touchstart", handleTouchStart);
          wrapper.removeEventListener("touchend", handleTouchEnd);
        }
      };
    }
  }, [handleTouchStart, handleTouchEnd]);

  return (
    <div onClick={onClick || undefined} className={className} ref={wrapperRef} >
      {children}
    </div>
  );
}

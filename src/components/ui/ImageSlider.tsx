
import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageSliderProps {
  images: {
    url: string;
    alt: string;
    caption?: string;
  }[];
  autoPlay?: boolean;
  interval?: number;
  showArrows?: boolean;
  showIndicators?: boolean;
  className?: string;
}

export default function ImageSlider({
  images,
  autoPlay = true,
  interval = 5000,
  showArrows = true,
  showIndicators = true,
  className,
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<number | null>(null);

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match with the CSS transition duration
  }, [images.length, isTransitioning]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match with the CSS transition duration
  }, [images.length, isTransitioning]);

  const goToSlide = (index: number) => {
    if (isTransitioning || index === currentIndex) return;
    
    setIsTransitioning(true);
    setCurrentIndex(index);
    
    setTimeout(() => {
      setIsTransitioning(false);
    }, 700); // Match with the CSS transition duration
  };

  useEffect(() => {
    if (autoPlay) {
      timerRef.current = window.setInterval(goToNext, interval);
    }
    
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [autoPlay, goToNext, interval]);

  return (
    <div className={cn("relative overflow-hidden w-full h-full", className)}>
      <div className="absolute inset-0 z-0">
        {images.map((image, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-700",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            <img
              src={image.url}
              alt={image.alt}
              className="object-cover w-full h-full transform transition-transform duration-10000 ease-out scale-105"
              style={{
                transform: index === currentIndex ? "scale(1)" : "scale(1.05)",
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60"></div>
          </div>
        ))}
      </div>

      {/* Caption */}
      <div className="absolute bottom-0 left-0 right-0 z-20 p-4 sm:p-6 md:p-8">
        <div className="max-w-3xl mx-auto">
          <div
            className={cn(
              "transition-all duration-700 transform",
              currentIndex === 0 ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            )}
          >
            {images[currentIndex]?.caption && (
              <div className="text-white font-serif text-lg md:text-2xl lg:text-3xl font-medium shadow-text">
                {images[currentIndex].caption}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      {showArrows && (
        <>
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/10 shadow-lg text-white hover:bg-white/30 transition-all-200"
            onClick={goToPrev}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-md border border-white/10 shadow-lg text-white hover:bg-white/30 transition-all-200"
            onClick={goToNext}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </>
      )}

      {/* Indicators */}
      {showIndicators && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={cn(
                "w-2 h-2 rounded-full transition-all duration-300",
                index === currentIndex
                  ? "bg-white w-4"
                  : "bg-white/50 hover:bg-white/70"
              )}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

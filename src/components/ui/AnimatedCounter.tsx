
import { useEffect, useState, useRef, CSSProperties } from "react";
import { cn } from "@/lib/utils";

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  title?: string;
  className?: string;
  style?: CSSProperties;
}

export default function AnimatedCounter({
  end,
  duration = 2500,
  prefix = "",
  suffix = "",
  title,
  className,
  style,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          
          const start = 0;
          const startTimestamp = performance.now();
          
          // Using easeOutExpo for a more natural animation feel
          const easeOutExpo = (t: number): number => {
            return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
          };
          
          const step = (timestamp: number) => {
            if (!hasAnimated) return;
            
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const currentCount = Math.floor(easedProgress * (end - start) + start);
            
            setCount(currentCount);
            
            if (progress < 1) {
              window.requestAnimationFrame(step);
            }
          };
          
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );
    
    if (counterRef.current) {
      observer.observe(counterRef.current);
    }
    
    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, [end, duration, hasAnimated]);
  
  return (
    <div
      ref={counterRef}
      className={cn(
        "flex flex-col items-center p-4 transition-all duration-500 hover:transform hover:scale-105",
        className
      )}
      style={style}
    >
      <div className="relative">
        <div className="text-3xl md:text-4xl font-bold font-serif mb-2 text-jnana-900 relative z-10">
          {prefix}
          <span className="inline-block min-w-[1.5ch] text-center">
            {hasAnimated ? count : 0}
          </span>
          {suffix}
        </div>
        {hasAnimated && (
          <div className="absolute -inset-1 bg-jnana-50 rounded-lg -z-10 animate-pulse opacity-70" />
        )}
      </div>
      {title && (
        <div className="text-jnana-600 text-center font-medium transition-all duration-300">
          {title}
        </div>
      )}
    </div>
  );
}

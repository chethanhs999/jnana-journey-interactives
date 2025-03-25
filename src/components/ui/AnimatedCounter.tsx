
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
          const step = (timestamp: number) => {
            if (!hasAnimated) return;
            
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const currentCount = Math.floor(progress * (end - start) + start);
            
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
        "flex flex-col items-center p-4 transition-all duration-500",
        className
      )}
      style={style}
    >
      <div className="text-3xl md:text-4xl font-bold font-serif mb-2 text-jnana-900">
        {prefix}
        <span className="inline-block min-w-[1.5ch] text-center">
          {hasAnimated ? count : 0}
        </span>
        {suffix}
      </div>
      {title && <div className="text-jnana-600 text-center font-medium">{title}</div>}
    </div>
  );
}

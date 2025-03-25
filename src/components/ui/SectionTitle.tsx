
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  alignment?: "left" | "center" | "right";
  className?: string;
}

export default function SectionTitle({
  subtitle,
  title,
  alignment = "center",
  className,
}: SectionTitleProps) {
  const [isVisible, setIsVisible] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      observer.observe(titleRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const alignmentClasses = {
    left: "text-left",
    center: "text-center mx-auto",
    right: "text-right ml-auto",
  };

  return (
    <div
      ref={titleRef}
      className={cn(
        "max-w-3xl mb-16",
        alignmentClasses[alignment],
        className
      )}
    >
      {subtitle && (
        <div
          className={cn(
            "inline-block px-3 py-1 mb-4 text-xs font-medium tracking-widest text-jnana-700 uppercase bg-jnana-50 rounded-full transform transition-all duration-700",
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          )}
          style={{ transitionDelay: "100ms" }}
        >
          {subtitle}
        </div>
      )}
      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-bold text-jnana-900 leading-tight transform transition-all duration-700",
          isVisible
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        )}
        style={{ transitionDelay: "300ms" }}
      >
        {title}
      </h2>
      <div
        className={cn(
          "w-20 h-1 bg-jnana-accent mt-6 transform transition-all duration-700",
          alignment === "center" ? "mx-auto" : alignment === "right" ? "ml-auto" : "",
          isVisible
            ? "opacity-100 scale-x-100"
            : "opacity-0 scale-x-0"
        )}
        style={{ transitionDelay: "500ms" }}
      ></div>
    </div>
  );
}


import { useState, useEffect, useRef } from "react";
import { Check, BookOpen, GraduationCap, Award } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";
import AnimatedCounter from "../ui/AnimatedCounter";
import { cn } from "@/lib/utils";

const stats = [
  { value: 25, suffix: "+", title: "Years of Excellence" },
  { value: 5000, suffix: "+", title: "Successful Alumni" },
  { value: 95, suffix: "%", title: "Pass Rate" },
  { value: 50, suffix: "+", title: "Qualified Faculty" },
];

export default function AboutSection() {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: <BookOpen className="w-6 h-6 text-jnana-accent" />,
      title: "Comprehensive Curriculum",
      description:
        "Our curriculum is designed to foster intellectual curiosity and academic excellence.",
    },
    {
      icon: <GraduationCap className="w-6 h-6 text-jnana-accent" />,
      title: "Experienced Faculty",
      description:
        "Our teachers are experts in their fields with a passion for education and student success.",
    },
    {
      icon: <Award className="w-6 h-6 text-jnana-accent" />,
      title: "Holistic Development",
      description:
        "We focus on developing well-rounded individuals through academics, sports, and arts.",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section id="about" className="bg-white py-24" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle
          subtitle="About Us"
          title="A Legacy of Academic Excellence"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-jnana-50 rounded-md z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-jnana-accent/10 rounded-md z-0"></div>
            
            <div className="relative z-10 h-full">
              <div className="bg-jnana-800 p-1 rounded-md shadow-xl h-full overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=1600&auto=format&fit=crop"
                  alt="School building"
                  className="w-full h-full object-cover rounded transform transition-transform duration-10000 ease-out hover:scale-105"
                />
              </div>
            </div>
          </div>

          <div className={cn(
            "flex flex-col justify-center transform transition-transform duration-700",
            isInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
          )}>
            <h3 className="text-jnana-900 text-2xl md:text-3xl font-serif font-semibold mb-6">
              Shaping the future through quality education
            </h3>
            <p className="text-jnana-700 mb-6">
              Welcome to Jnana Bharthi School and PU College, Kunigal. Established in 1985, we have been committed to providing exceptional education that balances academic excellence with character development.
            </p>
            <p className="text-jnana-700 mb-8">
              Our institution is recognized for its outstanding academic achievements, state-of-the-art facilities, and dedicated faculty who nurture students to become responsible global citizens.
            </p>

            <ul className="space-y-3 mb-8">
              {[
                "State-of-the-art science and computer laboratories",
                "Comprehensive library with extensive resources",
                "Sports facilities for holistic development",
                "Focused career guidance and counseling",
              ].map((item, index) => (
                <li
                  key={index}
                  className="flex items-start space-x-3"
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <span className="flex-shrink-0 mt-1 w-5 h-5 flex items-center justify-center rounded-full bg-jnana-accent/20 text-jnana-accent">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span className="text-jnana-700">{item}</span>
                </li>
              ))}
            </ul>

            <div>
              <a
                href="#programs"
                className="inline-flex items-center px-6 py-3 rounded-md bg-jnana-800 text-white font-medium hover:bg-jnana-700 transition-all-200"
              >
                Explore Our Programs
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className={cn(
                "glass-card p-8 rounded-lg hover-lift",
                isInView ? "opacity-100" : "opacity-0"
              )}
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <div className="mb-4 p-3 bg-jnana-50 rounded-lg inline-block">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-jnana-900">
                {feature.title}
              </h3>
              <p className="text-jnana-700">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-jnana-50 rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <AnimatedCounter
                key={index}
                end={stat.value}
                suffix={stat.suffix}
                title={stat.title}
                className={isInView ? "opacity-100" : "opacity-0"}
                style={{ transitionDelay: `${index * 150}ms` }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

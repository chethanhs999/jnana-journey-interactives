
import { useRef, useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionTitle from "../ui/SectionTitle";

const programs = [
  {
    id: "kindergarten",
    title: "Kindergarten",
    grades: "Pre-K to UKG",
    description:
      "Nurturing young minds through play-based learning that develops social skills and creates a love for discovery.",
    features: [
      "Play-based learning approach",
      "Foundational literacy and numeracy",
      "Creative arts and expression",
      "Social skills development",
    ],
    image:
      "https://images.unsplash.com/photo-1543248939-ff40856f65d4?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "primary",
    title: "Primary School",
    grades: "Classes 1-5",
    description:
      "Building a strong foundation through a child-centered approach that fosters curiosity and critical thinking.",
    features: [
      "Activity-based learning approach",
      "Focus on language development",
      "Introduction to fundamental concepts",
      "Character building activities",
    ],
    image:
      "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "middle",
    title: "Middle School",
    grades: "Classes 6-8",
    description:
      "Guiding students through their transition years with a balanced curriculum that develops academic and life skills.",
    features: [
      "Subject specialization begins",
      "Research and project-based learning",
      "Sports and extracurricular activities",
      "Leadership development opportunities",
    ],
    image:
      "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "high",
    title: "High School",
    grades: "Classes 9-10",
    description:
      "Preparing students for board examinations with intensive academic focus while nurturing their unique talents.",
    features: [
      "Board examination preparation",
      "Career guidance sessions",
      "Advanced laboratory experiments",
      "Competitive exam preparation",
    ],
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "pu",
    title: "PU College",
    grades: "Classes 11-12",
    description:
      "Specializing in Science, Commerce, and Arts streams to prepare students for university education and professional careers.",
    features: [
      "Science stream (PCM, PCB, PCMB)",
      "Commerce with Computer Applications",
      "Arts with Psychology",
      "Entrance exam coaching",
    ],
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function ProgramsSection() {
  const [activeTab, setActiveTab] = useState("kindergarten");
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section
      id="programs"
      className="py-24 bg-gradient-to-b from-white to-jnana-50"
      ref={sectionRef}
    >
      <div className="section-container">
        <SectionTitle
          subtitle="Our Programs"
          title="Comprehensive Education Pathways"
        />

        <div className="flex flex-col lg:flex-row gap-10 md:gap-16">
          <div className="lg:w-1/3">
            <div className="sticky top-24 bg-white rounded-xl shadow-sm overflow-hidden">
              {programs.map((program, index) => (
                <button
                  key={program.id}
                  className={cn(
                    "w-full text-left p-5 border-l-4 transition-all duration-300 flex items-center",
                    program.id === activeTab
                      ? "border-jnana-accent bg-jnana-50/50"
                      : "border-transparent hover:bg-jnana-50/30",
                    isInView ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                  onClick={() => setActiveTab(program.id)}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-jnana-900 font-serif">
                      {program.title}
                    </h3>
                    <p className="text-sm text-jnana-600">{program.grades}</p>
                  </div>
                  <ArrowRight
                    className={cn(
                      "w-5 h-5 transition-all duration-300",
                      program.id === activeTab
                        ? "text-jnana-accent opacity-100"
                        : "text-jnana-300 opacity-0 -mr-4"
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3">
            {programs.map((program) => (
              <div
                key={program.id}
                className={cn(
                  "bg-white rounded-xl overflow-hidden shadow-sm transition-all duration-500",
                  program.id === activeTab
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8 hidden"
                )}
              >
                <div className="lg:flex">
                  <div className="lg:w-2/5 h-64 lg:h-auto overflow-hidden">
                    <img
                      src={program.image}
                      alt={program.title}
                      className="w-full h-full object-cover transform transition-transform duration-1000 hover:scale-110"
                    />
                  </div>
                  <div className="lg:w-3/5 p-8">
                    <h3 className="text-2xl font-semibold text-jnana-900 mb-2 font-serif">
                      {program.title}
                    </h3>
                    <p className="text-sm font-medium text-jnana-accent mb-4">
                      {program.grades}
                    </p>
                    <p className="text-jnana-700 mb-6">{program.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="text-lg font-medium text-jnana-900 mb-3">
                        Key Features
                      </h4>
                      <ul className="space-y-2">
                        {program.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start space-x-2 text-jnana-700"
                          >
                            <span className="w-5 h-5 flex-shrink-0 rounded-full bg-jnana-50 flex items-center justify-center mt-0.5">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                className="w-3.5 h-3.5 text-jnana-900"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <a
                      href="#contact"
                      className="inline-flex items-center text-jnana-800 font-medium jnana-link"
                    >
                      Learn more about this program
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

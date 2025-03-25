
import { useRef, useState, useEffect } from "react";
import { Facebook, Twitter, Linkedin, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionTitle from "../ui/SectionTitle";

const faculty = [
  {
    name: "Dr. Rajesh Kumar",
    position: "Principal",
    image: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=800&auto=format&fit=crop",
    bio: "With over 25 years of experience in education, Dr. Kumar leads our institution with vision and integrity.",
    social: {
      linkedin: "#",
      twitter: "#",
      email: "principal@jnanabharthi.edu",
    },
  },
  {
    name: "Mrs. Lakshmi Devi",
    position: "Vice Principal & Science Head",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop",
    bio: "An expert in Biology with a passion for innovative teaching methodologies and student mentorship.",
    social: {
      linkedin: "#",
      facebook: "#",
      email: "viceprincipal@jnanabharthi.edu",
    },
  },
  {
    name: "Mr. Venkat Rao",
    position: "Mathematics Department",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop",
    bio: "Making mathematics accessible and engaging through his innovative teaching approach for 15 years.",
    social: {
      twitter: "#",
      email: "mathematics@jnanabharthi.edu",
    },
  },
  {
    name: "Ms. Anjali Sharma",
    position: "Computer Science Faculty",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop",
    bio: "A technology enthusiast bringing real-world programming experience to our computer labs.",
    social: {
      linkedin: "#",
      twitter: "#",
      facebook: "#",
      email: "cs@jnanabharthi.edu",
    },
  },
];

export default function FacultySection() {
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
    <section id="faculty" className="py-24 bg-jnana-50" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle
          subtitle="Our Faculty"
          title="Meet Our Distinguished Educators"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {faculty.map((member, index) => (
            <div
              key={index}
              className={cn(
                "bg-white rounded-xl overflow-hidden shadow-sm group hover-lift",
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jnana-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex space-x-3 justify-center">
                    {member.social.facebook && (
                      <a
                        href={member.social.facebook}
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all-200"
                        aria-label={`${member.name}'s Facebook`}
                      >
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.twitter && (
                      <a
                        href={member.social.twitter}
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all-200"
                        aria-label={`${member.name}'s Twitter`}
                      >
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.linkedin && (
                      <a
                        href={member.social.linkedin}
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all-200"
                        aria-label={`${member.name}'s LinkedIn`}
                      >
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {member.social.email && (
                      <a
                        href={`mailto:${member.social.email}`}
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/40 transition-all-200"
                        aria-label={`Email ${member.name}`}
                      >
                        <Mail className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-jnana-900 font-serif">
                  {member.name}
                </h3>
                <p className="text-sm text-jnana-accent mb-3 font-medium">
                  {member.position}
                </p>
                <p className="text-jnana-700 text-sm">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <a
            href="#"
            className="inline-flex items-center px-6 py-3 border border-jnana-300 rounded-md bg-white shadow-sm text-jnana-800 font-medium hover:bg-jnana-50 transition-all-200"
          >
            Meet All Faculty Members
          </a>
        </div>
      </div>
    </section>
  );
}

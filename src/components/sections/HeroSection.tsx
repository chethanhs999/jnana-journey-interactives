
import ImageSlider from "../ui/ImageSlider";

const heroImages = [
  {
    url: "/lovable-uploads/3808c79f-690b-40cb-8b16-6b39d431e33e.png",
    alt: "Jnana Bharthi School building with students gathering",
    caption: "Nurturing minds, Shaping futures"
  },
  {
    url: "/lovable-uploads/2b982401-a58d-4590-a835-d5ad76c18768.png",
    alt: "Jnana Bharthi School building lit up in the evening",
    caption: "Excellence in education since 1985"
  },
  {
    url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=1600&auto=format&fit=crop",
    alt: "Students in classroom",
    caption: "Creating tomorrow's leaders today"
  }
];

export default function HeroSection() {
  return (
    <section id="home" className="relative h-screen">
      <ImageSlider images={heroImages} />
      
      <div className="absolute inset-0 z-20 flex items-center justify-center px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif drop-shadow-lg opacity-0 animate-fade-in" style={{ animationDelay: "300ms", animationFillMode: "forwards" }}>
            Jnana Bharthi School &<br />PU College
          </h1>
          <h2 className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto font-light opacity-0 animate-fade-in" style={{ animationDelay: "600ms", animationFillMode: "forwards" }}>
            Building a foundation of knowledge, character, and excellence in Kunigal
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center opacity-0 animate-fade-in" style={{ animationDelay: "900ms", animationFillMode: "forwards" }}>
            <a
              href="#about"
              className="px-6 py-3 bg-jnana-accent text-jnana-900 rounded-md font-medium hover:bg-jnana-accent/90 transition-all-200"
            >
              Discover More
            </a>
            <a
              href="#contact"
              className="px-6 py-3 bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-md font-medium hover:bg-white/20 transition-all-200"
            >
              Apply Now
            </a>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
        <a
          href="#about"
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all-200"
          aria-label="Scroll down"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="m19 12-7 7-7-7" />
          </svg>
        </a>
      </div>
    </section>
  );
}

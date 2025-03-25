
import { useRef, useState, useEffect } from "react";
import { Phone, Mail, MapPin, Send, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import SectionTitle from "../ui/SectionTitle";

export default function ContactSection() {
  const [isInView, setIsInView] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
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

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Form submitted:", formState);
    // Reset form
    setFormState({
      name: "",
      email: "",
      phone: "",
      message: "",
    });
    // Show success message
    alert("Thank you for your message. We will get back to you soon!");
  };

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5 text-jnana-accent" />,
      title: "Phone",
      content: ["+91 8123456789", "+91 9876543210"],
    },
    {
      icon: <Mail className="w-5 h-5 text-jnana-accent" />,
      title: "Email",
      content: ["admissions@jnanabharthi.edu", "info@jnanabharthi.edu"],
    },
    {
      icon: <MapPin className="w-5 h-5 text-jnana-accent" />,
      title: "Address",
      content: ["JB Campus, Bengaluru-Mangalore Highway", "Kunigal, Karnataka 572130"],
    },
    {
      icon: <Clock className="w-5 h-5 text-jnana-accent" />,
      title: "Office Hours",
      content: ["Monday - Saturday: 9:00 AM - 5:00 PM", "Sunday: Closed"],
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white" ref={sectionRef}>
      <div className="section-container">
        <SectionTitle
          subtitle="Contact Us"
          title="Get in Touch with Jnana Bharthi"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-20">
          <div className="lg:col-span-2">
            <div className={cn(
              "transform transition-all duration-700",
              isInView ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"
            )}>
              <h3 className="text-2xl font-serif font-semibold text-jnana-900 mb-6">
                We're Here to Help
              </h3>
              <p className="text-jnana-700 mb-8">
                Whether you're interested in admissions, want to schedule a campus tour, or have questions about our programs, we're here to assist you. Reach out to us using any of the contact methods below.
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div 
                    key={index} 
                    className="flex space-x-4"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-12 h-12 rounded-lg bg-jnana-50 flex items-center justify-center flex-shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-jnana-900 font-medium mb-1">{item.title}</h4>
                      {item.content.map((line, i) => (
                        <p key={i} className="text-jnana-700">
                          {line}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className={cn(
              "bg-jnana-50 rounded-xl p-8 shadow-sm transform transition-all duration-700",
              isInView ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"
            )}>
              <h3 className="text-2xl font-serif font-semibold text-jnana-900 mb-6">
                Send Us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label 
                      htmlFor="name" 
                      className="block text-sm font-medium text-jnana-700 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-jnana-200 focus:outline-none focus:ring-2 focus:ring-jnana-accent/50 focus:border-jnana-accent transition-all-200"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="email" 
                      className="block text-sm font-medium text-jnana-700 mb-2"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-md border border-jnana-200 focus:outline-none focus:ring-2 focus:ring-jnana-accent/50 focus:border-jnana-accent transition-all-200"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label 
                    htmlFor="phone" 
                    className="block text-sm font-medium text-jnana-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formState.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-md border border-jnana-200 focus:outline-none focus:ring-2 focus:ring-jnana-accent/50 focus:border-jnana-accent transition-all-200"
                    placeholder="Enter your phone number"
                  />
                </div>

                <div>
                  <label 
                    htmlFor="message" 
                    className="block text-sm font-medium text-jnana-700 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 rounded-md border border-jnana-200 focus:outline-none focus:ring-2 focus:ring-jnana-accent/50 focus:border-jnana-accent transition-all-200"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 bg-jnana-800 text-white rounded-md font-medium hover:bg-jnana-700 transition-all-200"
                >
                  Send Message
                  <Send className="ml-2 w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className="mt-24">
          <div className="bg-jnana-900 text-white p-4 rounded-t-xl text-center font-medium">
            Location Map
          </div>
          <div className="relative bg-jnana-50 rounded-b-xl overflow-hidden shadow-sm w-full h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3891.4641529921794!2d77.0242443!3d12.7019459!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bafd169c9cc5cc1%3A0x4e7e75e9c53c1f0c!2sKunigal%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1653652891584!5m2!1sen!2sin"
              className="absolute inset-0 w-full h-full"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}

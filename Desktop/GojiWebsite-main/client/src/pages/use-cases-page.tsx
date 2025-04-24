import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { useChat } from "@/hooks/use-chat";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { 
  Building2, 
  ChevronRight, 
  PieChart, 
  BarChart4, 
  PlaneTakeoff, 
  Briefcase, 
  DollarSign, 
  CalendarClock, 
  Search, 
  Users2,
  Lightbulb,
  BadgeCheck,
  Rocket,
  LineChart,
  Target,
  Mail,
  MapPin,
  LucideIcon,
  Zap,
  ArrowRight,
  TrendingUp,
  X,
  Calendar,
  Send as SendIcon
} from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { AnimatedIcon } from "@/components/animated-icon";
import { InteractiveCard } from "@/components/interactive-card";
import { ParallaxScroll } from "@/components/parallax-scroll";
import { InteractiveButton } from "@/components/interactive-button";
import { BookingCalendarModal } from "@/components/booking-calendar-modal";
import { Toaster } from "@/components/ui/toaster";

interface UseCaseProps {
  icon: LucideIcon;
  title: string;
  description: string;
  benefits: string[];
  ctaLink: string;
  colorIndex?: number; // Add color index for different colored cards
  onRequestDemo?: () => void; // Callback for demo request
}

// Define an array of colors for different card themes
const cardColors = [
  { bg: "bg-blue-50", icon: "bg-blue-100", text: "text-blue-600", hover: "bg-blue-100", border: "border-blue-200" },
  { bg: "bg-purple-50", icon: "bg-purple-100", text: "text-purple-600", hover: "bg-purple-100", border: "border-purple-200" },
  { bg: "bg-green-50", icon: "bg-green-100", text: "text-green-600", hover: "bg-green-100", border: "border-green-200" },
  { bg: "bg-amber-50", icon: "bg-amber-100", text: "text-amber-600", hover: "bg-amber-100", border: "border-amber-200" },
  { bg: "bg-pink-50", icon: "bg-pink-100", text: "text-pink-600", hover: "bg-pink-100", border: "border-pink-200" },
  { bg: "bg-teal-50", icon: "bg-teal-100", text: "text-teal-600", hover: "bg-teal-100", border: "border-teal-200" },
];

const UseCaseCard = ({ icon: Icon, title, description, benefits, ctaLink, colorIndex = 0, onRequestDemo }: UseCaseProps) => {
  // Get color scheme based on colorIndex, with a fallback to the primary color
  const colorScheme = cardColors[colorIndex % cardColors.length];
  const [showDetailPage, setShowDetailPage] = useState(false);
  const [, navigate] = useLocation(); // Get navigate function from useLocation
  
  return (
    <>
      <InteractiveCard
        className={`h-full flex flex-col ${colorScheme.bg} border ${colorScheme.border}`}
        hoverEffect="lift"
        glowOnHover
      >
        <CardContent className="p-6 flex flex-col h-full">
          <div className={`mb-4 p-3 ${colorScheme.icon} w-12 h-12 rounded-lg flex items-center justify-center`}>
            <AnimatedIcon 
              icon={Icon} 
              className={colorScheme.text} 
              animation="pulse" 
              hoverEffect 
              size={24} 
            />
          </div>
          
          <h3 className="text-xl font-semibold mb-2">{title}</h3>
          <p className="text-muted-foreground mb-4 flex-grow">{description}</p>
          
          <div className="space-y-2 mb-6">
            {benefits.map((benefit, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <BadgeCheck className={`h-5 w-5 ${colorScheme.text} mt-0.5 flex-shrink-0`} />
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-auto">
            <motion.button 
              onClick={() => setShowDetailPage(true)}
              className={`inline-flex items-center justify-center ${colorScheme.text} font-medium ${colorScheme.bg} hover:${colorScheme.hover} transition-all rounded-md px-4 py-2 shadow-sm border ${colorScheme.border} w-full relative overflow-hidden`}
              whileHover={{ 
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 17 
              }}
            >
              {/* Add the page behind effect with a slight rotation */}
              <div 
                className={`absolute inset-0 ${colorScheme.bg} border ${colorScheme.border} rounded-md`} 
                style={{ 
                  transform: 'translate(-2px, -2px) rotate(-1deg)', 
                  zIndex: -1
                }}
              />
              <div 
                className={`absolute inset-0 ${colorScheme.bg} border ${colorScheme.border} rounded-md`} 
                style={{ 
                  transform: 'translate(2px, 2px) rotate(1deg)', 
                  zIndex: -2
                }}
              />
              Explore details <ChevronRight className="h-4 w-4 ml-1" />
            </motion.button>
          </div>
        </CardContent>
      </InteractiveCard>
      
      {/* Detail page modal/overlay */}
      {showDetailPage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-background/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className={`bg-background rounded-xl shadow-2xl w-full max-w-2xl border ${colorScheme.border} overflow-hidden`}
          >
            <div className={`${colorScheme.bg} p-6`}>
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 ${colorScheme.icon} rounded-lg`}>
                    <Icon className={`h-6 w-6 ${colorScheme.text}`} />
                  </div>
                  <h2 className="text-2xl font-bold">{title}</h2>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={() => setShowDetailPage(false)}
                  className="rounded-full"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="prose prose-sm max-w-none">
                <p className="text-lg mb-6">{description}</p>
                
                <h3 className={`${colorScheme.text} font-semibold text-xl mb-4`}>Key Benefits</h3>
                <ul className="space-y-3 mb-6">
                  {benefits.map((benefit, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <BadgeCheck className={`h-5 w-5 ${colorScheme.text} mt-1 flex-shrink-0`} />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
                
                <h3 className={`${colorScheme.text} font-semibold text-xl mb-4`}>How It Works</h3>
                <p>
                  Goji's {title.toLowerCase()} solution uses AI to analyze prospect behavior and deliver 
                  personalized content at scale. This feature integrates seamlessly with your existing 
                  workflow and provides detailed analytics on engagement and conversion.
                </p>
                
                <div className="mt-8">
                  <Button 
                    className={`${colorScheme.text} ${colorScheme.bg} hover:${colorScheme.hover} border ${colorScheme.border}`} 
                    size="lg"
                    onClick={() => {
                      setShowDetailPage(false);
                      // Use the callback if provided, otherwise no action
                      if (onRequestDemo) {
                        setTimeout(() => {
                          onRequestDemo();
                        }, 300);
                      }
                    }}
                  >
                    Request a Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

const useCases: UseCaseProps[] = [
  {
    icon: TrendingUp,
    title: "Increase Website Conversions",
    description: "Convert more website visitors into qualified leads with interactive demo experiences",
    benefits: [
      "Higher conversion rates from inbound website traffic",
      "Instant engagement without forms or scheduling",
      "24/7 qualification of website visitors"
    ],
    ctaLink: "#inbound"
  },
  {
    icon: Target,
    title: "Lead Qualification",
    description: "Let goji qualify leads through personalized conversations before sales engagement",
    benefits: [
      "24/7 lead qualification using BANT framework",
      "Custom qualification criteria adaptation",
      "Detailed qualification reports for sales teams"
    ],
    ctaLink: "#qualification"
  },
  {
    icon: Briefcase,
    title: "Product Demonstrations",
    description: "Create interactive product demos that adapt in real-time to prospect interests",
    benefits: [
      "Dynamic feature showcasing based on prospect needs",
      "Guided product tours with conversational AI",
      "Visual and voice-based demo experiences"
    ],
    ctaLink: "#demos"
  },
  {
    icon: DollarSign,
    title: "ROAS Optimization",
    description: "Maximize return on ad spend by qualifying and converting ad-generated leads",
    benefits: [
      "Higher conversion rates from paid traffic",
      "Automated qualification of ad-generated leads",
      "Personalized demo paths based on ad source"
    ],
    ctaLink: "#roas"
  },
  {
    icon: Building2,
    title: "Account-Based Marketing",
    description: "Support ABM strategies with personalized demos for target accounts",
    benefits: [
      "Tailored demos for specific target accounts",
      "Multi-stakeholder engagement tracking",
      "Company-specific pain point identification"
    ],
    ctaLink: "#abm"
  },
  {
    icon: Mail,
    title: "Outbound Email Campaigns",
    description: "Embed goji in your emails so prospects can engage with your product before booking a demo",
    benefits: [
      "Interactive demos directly within email content",
      "Pre-qualification conversations before rep involvement",
      "Higher email engagement and conversion rates"
    ],
    ctaLink: "#outbound"
  }
];

const features = [
  {
    icon: Target,
    title: "Qualify",
    description: "Identify high-value prospects through AI-driven conversations"
  },
  {
    icon: Zap,
    title: "Engage",
    description: "Deliver interactive demos tailored to each prospect's needs"
  },
  {
    icon: LineChart,
    title: "Analyze",
    description: "Gather deep insights on prospect pain points and interests"
  },
  {
    icon: ArrowRight,
    title: "Convert",
    description: "Pass qualified leads to sales with comprehensive context"
  }
];

const testimonials = [
  {
    quote: "Goji has completely transformed our demo process. We're now able to scale personalized demos without increasing headcount.",
    author: "Sarah Johnson",
    title: "VP of Sales, TechCorp"
  },
  {
    quote: "The qualification data we get from Goji demos gives our sales team the insights they need to close deals faster.",
    author: "Michael Chen",
    title: "CRO, SaaSify Inc."
  },
  {
    quote: "We've seen a 65% increase in demo-to-meeting conversion since implementing Goji. The ROI has been incredible.",
    author: "Elizabeth Wright",
    title: "Director of Marketing, DataFlow"
  }
];

export default function UseCasesPage() {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const { expandChat } = useChat();
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  // Handle the floating AI button click event
  useEffect(() => {
    const handleExpandDemo = (event: CustomEvent) => {
      // Use the global chat context to expand the chat interface
      expandChat();
    };
    
    window.addEventListener('expandDemo', handleExpandDemo as EventListener);
    
    return () => {
      window.removeEventListener('expandDemo', handleExpandDemo as EventListener);
    };
  }, [expandChat]);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center h-16">
            <div className="flex items-center gap-2 mr-auto">
              <img src="/assets/goji-removebg-preview.png" alt="goji logo" className="h-8" />
            </div>
            <nav className="flex items-center space-x-4 justify-center mx-auto">
              <InteractiveButton 
                variant="ghost" 
                onClick={() => navigate("/")}
                className="text-sm font-medium"
              >
                Home
              </InteractiveButton>
              <InteractiveButton 
                variant="ghost" 
                onClick={() => navigate("/use-cases")}
                className="text-sm font-medium"
              >
                Use Cases
              </InteractiveButton>
            </nav>
            <div className="ml-auto flex items-center gap-3">
              <InteractiveButton 
                size="sm"
                variant="outline"
                className="header-book-demo text-foreground border-foreground hover:bg-foreground/5"
                onClick={() => setShowBookingModal(true)}
              >
                Book a Demo
              </InteractiveButton>
              <InteractiveButton 
                size="sm"
                className="gap-2"
                clickEffect="ripple"
                onClick={() => {
                  // Use the global chat context to expand the chat interface
                  expandChat();
                }}
              >
                Instant Demo
              </InteractiveButton>
            </div>
          </div>
        </div>
      </header>
      
      {/* Hero Section */}
      <section className="py-24 pt-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <TextReveal
              text="Automate and Elevate Your Demo Strategy"
              animation="slide"
              direction="up"
              className="text-4xl md:text-5xl font-bold mb-6"
              splitBy="word"
              staggerChildren={0.08}
            />
            <TextReveal
              text="From lead qualification to personalized product demonstrations, goji streamlines your entire prospect engagement workflow"
              animation="fade"
              className="text-xl text-muted-foreground"
              splitBy="word"
              staggerChildren={0.01}
              delay={0.5}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {features.map((feature, idx) => (
              <ParallaxScroll key={idx} speed={0.1} direction={idx % 2 === 0 ? "up" : "down"}>
                <Card className="bg-card border-primary/10 h-full">
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center text-center">
                      <div className="mb-4 p-3 bg-primary/10 rounded-full">
                        <AnimatedIcon 
                          icon={feature.icon} 
                          className="text-primary" 
                          animation="pulse" 
                          size={24} 
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </ParallaxScroll>
            ))}
          </div>
        </div>
      </section>
      
      {/* Use Cases Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How Teams Use Goji</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Discover the different ways sales and marketing teams leverage goji to transform their prospect engagement
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {useCases.map((useCase, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <UseCaseCard 
                  {...useCase} 
                  colorIndex={idx}
                  onRequestDemo={() => setShowBookingModal(true)}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">68%</div>
              <p className="text-muted-foreground">Increase in Demo-to-Meeting Conversion</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">47%</div>
              <p className="text-muted-foreground">Reduction in Sales Cycle Length</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="text-4xl font-bold text-primary mb-2">3.5x</div>
              <p className="text-muted-foreground">ROI in the First 6 Months</p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Customers Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hear from sales leaders who have transformed their demo process with Goji
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <InteractiveCard
                key={idx}
                className="h-full"
                hoverEffect="glow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
              >
                <CardContent className="p-6 flex flex-col h-full">
                  <div className="text-primary mb-4">
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 11C10 5.5 14.5 5.5 14.5 5.5V8.5C14.5 8.5 13 8.5 13 11V19H5V11H10Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M19 19V11C19 5.5 23.5 5.5 23.5 5.5V8.5C23.5 8.5 22 8.5 22 11V19H19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <p className="italic text-muted-foreground mb-6 flex-grow">{testimonial.quote}</p>
                  <div>
                    <div className="font-semibold">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.title}</div>
                  </div>
                </CardContent>
              </InteractiveCard>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            className="bg-background shadow-lg rounded-lg p-8 md:p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <AnimatedIcon 
              icon={Rocket} 
              className="text-primary mx-auto mb-6" 
              animation="float" 
              size={48} 
            />
            <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Demo Experience?</h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Join the waitlist to be among the first to experience the future of AI-powered product demonstrations
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <InteractiveButton 
                size="lg" 
                className="gap-2"
                clickEffect="ripple"
                onClick={() => setShowBookingModal(true)}
              >
                <AnimatedIcon icon={LineChart} className="h-5 w-5" animation="pulse" />
                Schedule a Demo
              </InteractiveButton>
              <InteractiveButton 
                variant="outline" 
                size="lg" 
                className="gap-2"
                clickEffect="pulse"
                onClick={() => {
                  // Navigate to home and scroll to waitlist form
                  navigate('/');
                  setTimeout(() => {
                    const form = document.getElementById("waitlist-form");
                    if (form) {
                      form.scrollIntoView({ behavior: "smooth" });
                    }
                  }, 300);
                }}
              >
                <AnimatedIcon icon={Users2} className="h-5 w-5" animation="float" />
                Join Waitlist
              </InteractiveButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-6 md:mb-0">
              <img src="/assets/goji-removebg-preview.png" alt="goji logo" className="h-8" />
              <p className="text-sm text-muted-foreground mt-2">
                © 2025 Goji AI. All rights reserved.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-8">
              <div>
                <h4 className="font-semibold mb-3">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Features
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        navigate("/use-cases");
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Use Cases
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        // Scroll to the waitlist form in homepage
                        navigate("/");
                        setTimeout(() => {
                          const waitlistForm = document.getElementById("waitlist-form");
                          if (waitlistForm) {
                            waitlistForm.scrollIntoView({ behavior: "smooth" });
                          }
                        }, 300);
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowAboutModal(true);
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a 
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        setShowContactModal(true);
                      }}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* About Modal */}
      <AnimatePresence>
        {showAboutModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-background relative rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">About Goji AI</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowAboutModal(false)}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <div className="flex justify-center mb-6">
                    <img src="/assets/goji-removebg-preview.png" alt="Goji Logo" className="h-20" />
                  </div>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    Goji AI was founded in 2024 with a clear mission: to transform how B2B companies 
                    demonstrate products and qualify leads through the power of conversational AI.
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                      <p className="text-muted-foreground">
                        To empower sales teams to scale personalized demos without sacrificing quality, 
                        enabling them to focus on high-value activities while our AI handles qualification 
                        and initial engagement.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Technology</h3>
                      <p className="text-muted-foreground">
                        Goji combines advanced conversational AI, real-time data enrichment, and deep 
                        learning algorithms to qualify leads using the BANT framework while delivering 
                        engaging, personalized product demonstrations that adapt to each prospect's needs.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                      <p className="text-muted-foreground">
                        Founded by veterans from the sales tech industry with backgrounds at leading 
                        companies in CRM, sales enablement, and AI technologies. Our diverse team 
                        brings together expertise in machine learning, conversational design, and 
                        enterprise sales.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-primary">Company Facts</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span>Headquarters: San Francisco, CA</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        <span>Founded: 2024</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <BadgeCheck className="h-4 w-4 text-primary" />
                        <span>Status: Pre-launch (Join our waitlist!)</span>
                      </li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-8 pt-4 border-t flex justify-end">
                  <InteractiveButton
                    onClick={() => setShowAboutModal(false)}
                    clickEffect="pulse"
                  >
                    Close
                  </InteractiveButton>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Contact Modal with Form */}
      <AnimatePresence>
        {showContactModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-background relative rounded-lg shadow-lg w-full max-w-xl max-h-[90vh] overflow-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">Contact Us</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowContactModal(false)}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                
                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Have questions about Goji? Fill out the form below and our team will get back to you shortly.
                  </p>
                  
                  <form className="space-y-4" onSubmit={(e: React.FormEvent) => {
                    e.preventDefault();
                    toast({
                      title: "Message sent!",
                      description: "Thanks for reaching out. We'll be in touch soon.",
                    });
                    setContactFormData({ name: "", email: "", message: "" });
                    setShowContactModal(false);
                  }}>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input 
                        id="name" 
                        placeholder="Your name" 
                        required
                        value={contactFormData.name}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Professional Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        placeholder="you@company.com" 
                        required
                        value={contactFormData.email}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, email: e.target.value }))}
                      />
                      <p className="text-xs text-muted-foreground">Please use your work email for priority response</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="How can we help you?" 
                        rows={5}
                        required
                        value={contactFormData.message}
                        onChange={(e) => setContactFormData(prev => ({ ...prev, message: e.target.value }))}
                      />
                    </div>
                    
                    <div className="pt-2 flex justify-end gap-3">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowContactModal(false)}
                      >
                        Cancel
                      </Button>
                      <InteractiveButton
                        type="submit"
                        clickEffect="ripple"
                      >
                        <SendIcon className="h-4 w-4 mr-2" />
                        Send Message
                      </InteractiveButton>
                    </div>
                  </form>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
      
      {/* Booking Calendar Modal */}
      <BookingCalendarModal 
        isOpen={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
      
      <Toaster />
    </div>
  );
}
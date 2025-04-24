import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useChat } from "@/hooks/use-chat";
import {
  Users2,
  MousePointerClick,
  ChevronRight,
  Target,
  Zap,
  X,
  Play,
  PlayCircle,
  Clock,
  UserCircle,
  Building2,
  DollarSign,
  MapPin,
  Users,
  User,
  MessageSquare,
  Presentation,
  LineChart,
  BadgeDollarSign,
  Globe,
  Briefcase,
  BarChart,
  BarChart3,
  ArrowUpRight,
  MousePointer2,
  Mail,
  FileText,
  ArrowRight,
  PhoneCall,
  CheckCircle,
  Check,
  Timer,
  Scale,
  Mic,
  Square,
  ArrowUpCircle,
  ArrowDown,
  Palette,
  PencilRuler,
  CircleDot,
  Database,
  Fingerprint,
  Bot,
  CalendarDays,
  Calendar,
  BadgeCheck,
  Send as SendIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { WaitlistUser, waitlistSchema } from "@shared/schema";
import { motion, AnimatePresence } from "framer-motion";
import { Spinner } from "@/components/ui/spinner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { TypeWriter } from "@/components/type-writer";
import { InteractiveButton } from "@/components/interactive-button";
import { AnimatedIcon } from "@/components/animated-icon";
import {
  InteractiveCard,
  InteractiveCardContent,
} from "@/components/interactive-card";
import { TextReveal } from "@/components/text-reveal";
import { ParallaxScroll } from "@/components/parallax-scroll";
import { DemoInterface } from "@/components/demo-interface";
import { BookingCalendarModal } from "@/components/booking-calendar-modal";
import { DemoPopupModal } from "@/components/demo-popup";
import { Toaster } from "@/components/ui/toaster";
import { ParticleNetwork } from "@/components/particle-network";
import { SpiderNetEffect } from "@/components/spider-net-effect";
import LoopingAnimatedDemo from "@/components/looping-animated-demo";

const HomePage = () => {
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [currentChatIndex, setCurrentChatIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 1000); // or 640, 480, etc. depending on your breakpoint
    };

    checkMobile(); // initial check
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Modal states
  const [showBANTModal, setShowBANTModal] = useState(false);
  const [showEnrichmentModal, setShowEnrichmentModal] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactFormData, setContactFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Chat interface state
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [isAnswerComplete, setIsAnswerComplete] = useState(false);
  const [showVoiceUI, setShowVoiceUI] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isExpandedUI, setIsExpandedUI] = useState(false);
  const [expandOrigin, setExpandOrigin] = useState({ x: 0, y: 0 });

  // Function to get answers based on the selected question
  const getAnswerForQuestion = (questionType: string) => {
    switch (questionType) {
      case "bant":
        return "BANT evaluates Budget, Authority, Need, and Timeline. Goji detects these signals automatically as prospects engage with your demos.";
      case "customize":
        return "Absolutely! Goji demos can be customized to match your product. You can personalize content, branding, and qualification criteria.";
      case "enrichment":
        return "Prospect enrichment connects with databases to identify visitors. Goji reveals company details and technologies used without requiring forms.";
      case "custom":
        if (inputValue.trim()) {
          return `Thanks for your question: "${inputValue}". Goji's AI would provide a personalized response based on your specific query in a live implementation.`;
        } else {
          return "I'd be happy to answer your question. In a live implementation, Goji's AI would provide personalized responses to help your prospects understand your product better.";
        }
      default:
        return "I don't have specific information about that question, but I'd be happy to connect you with our sales team who can provide more details about how goji can help your specific use case.";
    }
  };

  const demoChat = [
    {
      message: "Hi! I'd love to learn more about your needs...",
      isAi: true,
      thinking: false,
    },
    { message: "We're looking to scale our demo process", isAi: false },
    {
      message: "Could you tell me about your current process?",
      isAi: true,
      thinking: false,
    },
    {
      message: "Currently, our sales team handles everything manually",
      isAi: false,
    },
    {
      message: "That must be time-consuming. What's your biggest challenge?",
      isAi: true,
      thinking: true,
    },
  ];

  const demoUser = {
    name: "John @ TechCorp",
    location: "San Francisco, CA",
    role: "Sales Director",
  };

  const demoFeatures = [
    { id: "chat", label: "Chat Mode", icon: MessageSquare },
    { id: "voice", label: "Voice Mode", icon: Mic },
  ];

  const slides = [
    {
      title: "Current Process",
      content: "Manual demo scheduling and preparation",
    },
    { title: "Pain Points", content: "Time-consuming and inconsistent demos" },
    { title: "Solution", content: "AI-powered personalization at scale" },
  ];

  const engagementTrend = {
    lastUpdated: "2 mins ago",
    trend: [65, 72, 78, 82, 85],
    recentActions: [
      { type: "visit", time: "2m ago", page: "Pricing" },
      { type: "download", time: "5m ago", item: "Whitepaper" },
      { type: "watch", time: "15m ago", content: "Demo Video" },
    ],
  };

  const demoProspect = {
    name: "John @ TechCorp",
    title: "Sales Director",
    company: "TechCorp",
    location: "San Francisco, CA",
    industry: "Enterprise Software",
    employees: "500-1000",
    revenue: "$50M-100M",
    techStack: ["Salesforce", "HubSpot", "Outreach", "Gong", "Zoom"],
    engagementMetrics: {
      intentScore: 85,
      websiteVisits: 12,
      pagesViewed: 8,
      timeSpent: "45 mins",
      daysActive: 7,
    },
    interests: ["Demo Automation", "Sales Efficiency", "AI Integration"],
  };

  const form = useForm<WaitlistUser>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { email: "" },
  });

  const waitlistMutation = useMutation({
    mutationFn: async (data: WaitlistUser) => {
      const res = await apiRequest("POST", "/api/waitlist", data);
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success!",
        description: "You've been added to the waitlist.",
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: WaitlistUser) => {
    waitlistMutation.mutate(data);
  };

  useEffect(() => {
    const chatTimer = setInterval(() => {
      setCurrentChatIndex((prev) => (prev + 1) % demoChat.length);
    }, 3000);

    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);

    // Add event listener for the floating button
    const handleExpandDemo = (event: CustomEvent) => {
      // Set expand origin to the center bottom of screen
      setExpandOrigin({
        x: window.innerWidth / 2,
        y: window.innerHeight - 80,
      });

      // Clear any previous question and input
      setSelectedQuestion(null);
      setInputValue("");
      setIsAnswerComplete(false);
      setShowVoiceUI(false);

      // Expand the UI first
      setIsExpandedUI(true);

      // Then use a small timeout before scrolling to give the UI time to expand
      setTimeout(() => {
        const chatSection = document.getElementById("chat-section");
        if (chatSection) {
          chatSection.scrollIntoView({ behavior: "smooth" });
        }
      }, 150);
    };

    window.addEventListener("expandDemo", handleExpandDemo as EventListener);

    return () => {
      clearInterval(chatTimer);
      clearInterval(slideTimer);
      window.removeEventListener(
        "expandDemo",
        handleExpandDemo as EventListener,
      );
    };
  }, []);

  const painPoints = [
    {
      title: "Inconsistent Demo Experience",
      impact: "Leads to lost opportunities",
      solution: "Personalized demos",
    },
    {
      title: "Time-Consuming Manual Process",
      impact: "Reduces sales team efficiency",
      solution: "Automated demo scheduling",
    },
    {
      title: "Lack of Scalability",
      impact: "Limits growth potential",
      solution: "AI-powered demo automation",
    },
  ];

  const handleCloseModal = () => {
    setShowBookingModal(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Spider Net Effect */}
      <SpiderNetEffect
        particleCount={70}
        color="#4856F6"
        opacity={0.2}
        connectionDistance={150}
        particleSpeed={0.6}
      />

      {/* Navigation Header */}
      {/* Responsive Navigation Header */}
      <header className="fixed top-0 left-0 right-0 bg-background/80 backdrop-blur-sm z-50 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <img
                src="/goji-logo.png"
                alt="goji logo"
                className="h-10 sm:h-12"
              />
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-4 justify-center mx-auto">
              {/* <InteractiveButton ... /> */}
              {/* Add nav links here if needed */}
            </nav>

            {/* Action Buttons */}
            <div className="hidden sm:flex ml-auto items-center gap-2 sm:gap-3">
              <InteractiveButton
                size="sm"
                variant="outline"
                className="header-book-demo text-foreground border-foreground hover:bg-foreground/5"
                onClick={() => setShowBookingModal(true)}
              >
                Let&#39;s Talk
              </InteractiveButton>

              <InteractiveButton
                size="sm"
                className="gap-2"
                clickEffect="ripple"
                onClick={() => setShowDemoModal(true)}
              >
                Instant Demo
              </InteractiveButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex sm:hidden ml-auto">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:bg-foreground/10 focus:outline-none"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      mobileMenuOpen
                        ? "M6 18L18 6M6 6l12 12"
                        : "M4 6h16M4 12h16M4 18h16"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation Panel */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-2 px-4 pb-4 flex flex-col gap-2 border-t pt-4">
              {/* Mobile Buttons */}
              <InteractiveButton
                size="sm"
                variant="outline"
                className="w-full text-foreground border-foreground hover:bg-foreground/5"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowBookingModal(true);
                }}
              >
                Let&#39;s Talk
              </InteractiveButton>

              <InteractiveButton
                size="sm"
                className="w-full gap-2"
                clickEffect="ripple"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setShowDemoModal(true);
                }}
              >
                Instant Demo
              </InteractiveButton>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative custom-hero-margin flex items-center justify-center overflow-hidden bg-gradient-to-b from-primary/5 to-background py-8 sm:py-16">
        <div className="container mb-0 pb-0 mx-auto px-4 text-center">
          <div className="w-full max-w-[90vw] sm:max-w-4xl mx-auto text-center break-words overflow-hidden">
            <motion.h1
              className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 sm:mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mx-auto">
                <div className="flex flex-wrap justify-center margin-hero">
                  <TextReveal
                    text="Personalize buying experience"
                    animation="slide"
                    direction="up"
                    staggerChildren={0.02}
                    splitBy="word"
                    className="inline-block"
                  />
                  <TextReveal
                    text="with 1:1 demos"
                    animation="slide"
                    direction="up"
                    staggerChildren={0.02}
                    splitBy="word"
                    className="inline-block mt-3"
                  />
                  <TypeWriter
                    text="for every visitor"
                    delay={150}
                    className="inline-block mt-3 font-['Playfair_Display'] italic"
                  />
                </div>
              </div>
            </motion.h1>

            <TextReveal
              text="Buyers explore on their own terms. Websites qualify and convert 24/7."
              animation="fade"
              delay={0.5}
              splitBy="word"
              staggerChildren={0.01}
              className="text-base sm:text-xl md:text-2xl text-muted-foreground mb-6 sm:mb-8 block"
            />
          </div>

          <motion.div
            className="flex margin-buttons flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <InteractiveButton
              size="lg"
              onClick={() => setShowDemoModal(true)}
              className="gap-2 w-full sm:w-auto"
              clickEffect="ripple"
              animateScale={1.05}
            >
              <AnimatedIcon
                icon={PlayCircle}
                animation="pulse"
                className="h-5 w-5"
                hoverEffect
              />
              Instant Demo
            </InteractiveButton>

            <InteractiveButton
              variant="outline"
              size="lg"
              onClick={() => {
                const form = document.getElementById("waitlist-form");
                form?.scrollIntoView({ behavior: "smooth" });
              }}
              className="gap-2 w-full sm:w-auto"
              clickEffect="pulse"
            >
              <AnimatedIcon
                icon={Users2}
                animation="pulse"
                className="h-5 w-5"
                hoverEffect
              />
              Join Waitlist
            </InteractiveButton>
          </motion.div>
        </div>

        {/* Background subtle floating elements */}
        <motion.div
          className="absolute top-1/4 -left-20 w-40 h-40 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 -right-20 w-60 h-60 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: "easeInOut",
          }}
        />
      </section>
      

      {!isMobile && (
        <div className="goji-animation w-full overflow-x-hidden px-4 sm:px-6 lg:px-8">
          <div className="max-w-[95%] sm:max-w-[90%] md:max-w-7xl mx-auto margin-ui">
            <LoopingAnimatedDemo />
          </div>
        </div>)
      }

      {/* Expanded UI overlay for chat + slides when a question is asked */}
      {isExpandedUI && (
        <motion.div
          className="fixed inset-0 bg-background/95 backdrop-blur-lg z-[100] flex items-center justify-center overflow-hidden"
          initial={{
            opacity: 0,
            scale: 0,
            transformOrigin: `${expandOrigin.x}px ${expandOrigin.y}px`,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transformOrigin: `${expandOrigin.x}px ${expandOrigin.y}px`,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
          }}
        >
          <div className="container max-w-6xl relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10"
              onClick={() => {
                setIsExpandedUI(false);
                setSelectedQuestion(null);
                setIsAnswerComplete(false);
              }}
            >
              <X className="h-5 w-5" />
            </Button>

            <div className="goji-animation grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left side - Chat interface */}
              <div className="bg-background rounded-xl shadow-xl border border-primary/10 p-6 max-h-[80vh] overflow-auto">
                <div className="flex flex-col gap-6">
                  {/* Chat history */}
                  <div className="space-y-4">
                    {/* Goji avatar and greeting */}
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-semibold text-primary">
                        g
                      </div>
                      <div className="bg-muted/50 rounded-lg p-3 text-sm">
                        Hi there! I'm goji, your AI sales assistant. How can I
                        help you today?
                      </div>
                    </div>

                    {/* User question */}
                    {selectedQuestion && (
                      <div className="flex items-start gap-3 justify-end">
                        <div className="bg-primary/10 rounded-lg p-3 text-sm text-primary">
                          {selectedQuestion === "bant" &&
                            "How does BANT qualification work?"}
                          {selectedQuestion === "customize" &&
                            "Can I customize demos?"}
                          {selectedQuestion === "enrichment" &&
                            "How does prospect enrichment work?"}
                          {selectedQuestion === "custom" && inputValue}
                        </div>
                        <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center flex-shrink-0">
                          <User className="h-4 w-4" />
                        </div>
                      </div>
                    )}

                    {/* Answer */}
                    {selectedQuestion && (
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-semibold text-primary">
                          g
                        </div>
                        <div className="bg-muted/50 rounded-lg p-3 text-sm">
                          {getAnswerForQuestion(selectedQuestion)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Input area */}
                  <div className="relative mt-auto">
                    <Input
                      className="pr-12 h-12 text-base focus-visible:ring-primary"
                      placeholder="Ask a follow-up question..."
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && inputValue.trim()) {
                          setSelectedQuestion("custom");
                        }
                      }}
                    />
                    <Button
                      size="icon"
                      className="absolute right-1 top-1"
                      variant="ghost"
                      onClick={() => {
                        if (inputValue.trim()) {
                          setSelectedQuestion("custom");
                        }
                      }}
                    >
                      <ArrowUpCircle className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right side - Dynamic slides */}
              <div className="bg-background rounded-xl shadow-xl border border-primary/10 overflow-hidden">
                {/* Slide content based on question type */}
                <div className="p-6 goji-animation">
                  {selectedQuestion === "bant" && (
                    <div className="space-y-6 py-4">
                      {/* Budget Section */}
                      <div className="space-y-2 border-b pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-blue-500 text-xl">💰</span>
                          <span className="font-semibold text-lg">Budget</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Qualification Score</span>
                          <span className="font-semibold">75%</span>
                        </div>
                        <div className="w-full h-2 bg-blue-100 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: "75%" }}
                          ></div>
                        </div>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md">
                          <div className="mb-1 text-sm font-medium text-blue-800">
                            Prospect Response:
                          </div>
                          <p className="text-sm text-gray-600 italic">
                            "We've set aside $50k-$100k for improving our demo
                            process this year."
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            $50k-$100k budget identified
                          </p>
                        </div>
                      </div>

                      {/* Authority Section */}
                      <div className="space-y-2 border-b pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-blue-500 text-xl">🎯</span>
                          <span className="font-semibold text-lg">
                            Authority
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Qualification Score</span>
                          <span className="font-semibold">90%</span>
                        </div>
                        <div className="w-full h-2 bg-blue-100 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: "90%" }}
                          ></div>
                        </div>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md">
                          <div className="mb-1 text-sm font-medium text-blue-800">
                            Prospect Response:
                          </div>
                          <p className="text-sm text-gray-600 italic">
                            "I'm the VP of Sales and I have final sign-off on
                            all sales tools."
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            VP of Sales with full purchasing authority
                          </p>
                        </div>
                      </div>

                      {/* Need Section */}
                      <div className="space-y-2 border-b pb-4">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-blue-500 text-xl">📈</span>
                          <span className="font-semibold text-lg">Need</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Qualification Score</span>
                          <span className="font-semibold">85%</span>
                        </div>
                        <div className="w-full h-2 bg-blue-100 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md">
                          <div className="mb-1 text-sm font-medium text-blue-800">
                            Prospect Response:
                          </div>
                          <p className="text-sm text-gray-600 italic">
                            "Our current process is manual and error-prone. We
                            need something that scales with our team."
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            Multiple critical needs identified
                          </p>
                        </div>
                      </div>

                      {/* Timeline Section */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-blue-500 text-xl">🕒</span>
                          <span className="font-semibold text-lg">
                            Timeline
                          </span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Qualification Score</span>
                          <span className="font-semibold">65%</span>
                        </div>
                        <div className="w-full h-2 bg-blue-100 rounded-full">
                          <div
                            className="h-2 bg-blue-600 rounded-full"
                            style={{ width: "65%" }}
                          ></div>
                        </div>
                        <div className="mt-3 bg-blue-50 p-3 rounded-md">
                          <div className="mb-1 text-sm font-medium text-blue-800">
                            Prospect Response:
                          </div>
                          <p className="text-sm text-gray-600 italic">
                            "We need to implement before our Q2 expansion. That
                            gives us about 3 months."
                          </p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            Implementation needed by Q2
                          </p>
                        </div>
                      </div>

                      {/* Summary Quote Box */}
                      <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                        <div className="flex items-start gap-3">
                          <span className="text-blue-500 mt-1">💬</span>
                          <div>
                            <div className="mb-1 font-medium">
                              Qualification Summary
                            </div>
                            <p className="text-sm text-gray-600">
                              "We have allocated budget for Q2 to improve our
                              demo process. I'm the final decision maker and we
                              need to implement before our expansion."
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedQuestion === "customize" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">
                        Customizable Demos
                      </h3>

                      <div className="grid grid-cols-2 gap-4">
                        <InteractiveCard>
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                              <Palette className="h-8 w-8 text-primary mb-2" />
                              <h4 className="font-semibold text-sm">
                                Brand Matching
                              </h4>
                              <p className="text-xs text-muted-foreground text-center">
                                Customize colors & logo
                              </p>
                            </div>
                          </CardContent>
                        </InteractiveCard>

                        <InteractiveCard>
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                              <FileText className="h-8 w-8 text-primary mb-2" />
                              <h4 className="font-semibold text-sm">
                                Content Control
                              </h4>
                              <p className="text-xs text-muted-foreground text-center">
                                Edit demo flow & talking points
                              </p>
                            </div>
                          </CardContent>
                        </InteractiveCard>

                        <InteractiveCard>
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                              <BarChart3 className="h-8 w-8 text-primary mb-2" />
                              <h4 className="font-semibold text-sm">
                                Custom Metrics
                              </h4>
                              <p className="text-xs text-muted-foreground text-center">
                                Define your own success criteria
                              </p>
                            </div>
                          </CardContent>
                        </InteractiveCard>

                        <InteractiveCard>
                          <CardContent className="p-4">
                            <div className="flex flex-col items-center">
                              <PencilRuler className="h-8 w-8 text-primary mb-2" />
                              <h4 className="font-semibold text-sm">
                                UI Adaptation
                              </h4>
                              <p className="text-xs text-muted-foreground text-center">
                                Visual style options
                              </p>
                            </div>
                          </CardContent>
                        </InteractiveCard>
                      </div>

                      <div className="bg-primary/5 p-4 rounded-lg">
                        <h4 className="font-semibold mb-2">Easy Setup</h4>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <CircleDot className="h-4 w-4 text-primary" />
                            <span className="text-sm">No-code editor</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CircleDot className="h-4 w-4 text-primary" />
                            <span className="text-sm">Templates</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CircleDot className="h-4 w-4 text-primary" />
                            <span className="text-sm">API integration</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedQuestion === "enrichment" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">
                        Prospect Enrichment
                      </h3>

                      <div className="bg-primary/5 rounded-lg p-4 mb-4">
                        <div className="flex gap-4">
                          <UserCircle className="h-10 w-10 text-primary" />
                          <div>
                            <h4 className="font-semibold">Anonymous Visitor</h4>
                            <p className="text-xs text-muted-foreground">
                              Before enrichment
                            </p>
                          </div>
                        </div>
                      </div>

                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                        }}
                        transition={{
                          repeat: 3,
                          duration: 0.5,
                        }}
                      >
                        <div className="flex justify-center">
                          <ArrowDown className="h-8 w-8 text-primary" />
                        </div>
                      </motion.div>

                      <div className="bg-background rounded-lg border border-primary p-4">
                        <div className="flex gap-4">
                          <Building2 className="h-10 w-10 text-primary" />
                          <div>
                            <h4 className="font-semibold">John Smith</h4>
                            <p className="text-xs">Sales Director @ TechCorp</p>
                            <div className="mt-2 space-y-1">
                              <div className="flex items-center text-xs gap-2">
                                <Users2 className="h-3 w-3 text-muted-foreground" />
                                <span>500-1000 employees</span>
                              </div>
                              <div className="flex items-center text-xs gap-2">
                                <BadgeDollarSign className="h-3 w-3 text-muted-foreground" />
                                <span>$50M-100M revenue</span>
                              </div>
                              <div className="flex items-center text-xs gap-2">
                                <LineChart className="h-3 w-3 text-muted-foreground" />
                                <span>Intent score: 85/100</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-2 text-center text-xs">
                        <div className="bg-primary/5 p-2 rounded">
                          <Database className="h-4 w-4 mx-auto mb-1 text-primary" />
                          <div>Data Sources</div>
                        </div>
                        <div className="bg-primary/5 p-2 rounded">
                          <Fingerprint className="h-4 w-4 mx-auto mb-1 text-primary" />
                          <div>Identification</div>
                        </div>
                        <div className="bg-primary/5 p-2 rounded">
                          <Zap className="h-4 w-4 mx-auto mb-1 text-primary" />
                          <div>Real-time</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedQuestion === "custom" && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-semibold">
                        Goji AI Assistant
                      </h3>

                      <div className="aspect-video bg-muted/30 rounded-md flex items-center justify-center">
                        <Presentation className="h-12 w-12 text-muted-foreground/50" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-primary/5">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-5 w-5 text-primary" />
                              <h4 className="font-semibold text-sm">
                                AI Conversation
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Natural language understanding
                            </p>
                          </CardContent>
                        </Card>

                        <Card className="bg-primary/5">
                          <CardContent className="p-4">
                            <div className="flex items-center gap-2">
                              <Presentation className="h-5 w-5 text-primary" />
                              <h4 className="font-semibold text-sm">
                                Dynamic Demo
                              </h4>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              Responsive visuals
                            </p>
                          </CardContent>
                        </Card>
                      </div>

                      <div className="bg-muted/20 p-4 rounded-lg text-sm">
                        <p>
                          Your custom question is being processed by Goji's AI
                          engine. In a live implementation, this would generate
                          both a conversational response and adaptive demo
                          content tailored to your specific query.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Interactive Demo Section */}
      <section
        id="interactive-demo-section"
        className="pt-36 pb-12 bg-background"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            {/* Left side content */}
            <div>
              <TextReveal
                text="Interactive AI-Powered Demos that convert"
                animation="slide"
                direction="up"
                className="text-3xl font-bold mb-6"
                splitBy="word"
              />
              <TextReveal
                text="Experience the future of product demonstrations with Goji's dual-interface system"
                animation="fade"
                className="text-xl text-muted-foreground mb-6"
                splitBy="word"
              />
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <MessageSquare className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">
                      Interactive chat
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Proactive sales conversations, not reactive chatbot
                      responses
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <Presentation className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Dynamic slides</h3>
                    <p className="text-sm text-muted-foreground">
                      Visual content that adapts to the conversation in
                      real-time
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <Mic className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Voice interface</h3>
                    <p className="text-sm text-muted-foreground">
                      Speak naturally with the AI for a more human experience
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side demo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="relative goji-animation"
            >
              <DemoInterface />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* BANT Framework Section */}
      <section className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
            {/* Left side: BANT visualization */}
            <div className="order-2 md:order-1">
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Budget Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <BadgeDollarSign className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Budget</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold text-lg">
                          75%
                        </span>
                        <span className="text-sm text-muted-foreground">
                          qualified
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-blue-100 rounded-full mb-4">
                    <div
                      className="h-2 bg-primary rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-md mb-4">
                    <div className="mb-1 text-sm font-medium text-primary/90">
                      Prospect Response:
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "We've set aside $50k-$100k for improving our demo process
                      this year."
                    </p>
                  </div>
                </div>

                {/* Authority Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
                  <div className="flex items-center gap-4 mb-4 flex-row-reverse text-right">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Target className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Authority</h3>
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-primary font-bold text-lg">
                          90%
                        </span>
                        <span className="text-sm text-muted-foreground">
                          qualified
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-blue-100 rounded-full mb-4">
                    <div
                      className="h-2 bg-primary rounded-full"
                      style={{ width: "90%" }}
                    ></div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-md mb-4">
                    <div className="mb-1 text-sm font-medium text-primary/90">
                      Prospect Response:
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "I'm the VP of Sales and I have final sign-off on all
                      sales tools."
                    </p>
                  </div>
                </div>

                {/* Need Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <LineChart className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Need</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-primary font-bold text-lg">
                          85%
                        </span>
                        <span className="text-sm text-muted-foreground">
                          qualified
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-blue-100 rounded-full mb-4">
                    <div
                      className="h-2 bg-primary rounded-full"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-md mb-4">
                    <div className="mb-1 text-sm font-medium text-primary/90">
                      Prospect Response:
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "Our current process is manual and error-prone. We need
                      something that scales with our team."
                    </p>
                  </div>
                </div>

                {/* Timeline Section */}
                <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-100">
                  <div className="flex items-center gap-4 mb-4 flex-row-reverse text-right">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="h-7 w-7 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl">Timeline</h3>
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-primary font-bold text-lg">
                          65%
                        </span>
                        <span className="text-sm text-muted-foreground">
                          qualified
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-blue-100 rounded-full mb-4">
                    <div
                      className="h-2 bg-primary rounded-full"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                  <div className="bg-muted/30 p-4 rounded-md mb-4">
                    <div className="mb-1 text-sm font-medium text-primary/90">
                      Prospect Response:
                    </div>
                    <p className="text-sm text-muted-foreground italic">
                      "We need to implement before our Q2 expansion. That gives
                      us about 3 months."
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right side: Title and key features */}
            <div className="order-1 md:order-2">
              <TextReveal
                text="BANT Qualification in Action"
                animation="slide"
                direction="up"
                className="text-3xl font-bold mb-6"
                splitBy="word"
              />
              <TextReveal
                text="Automatically assess sales readiness"
                animation="fade"
                className="text-xl text-muted-foreground mb-6"
                splitBy="word"
              />
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <BadgeDollarSign className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">
                      Budget qualification
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Identify financial resources and purchase capacity
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <Target className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">
                      Authority detection
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Recognize decision makers and buying committees
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <LineChart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Need assessment</h3>
                    <p className="text-sm text-muted-foreground">
                      Evaluate pain points and solution fit
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">
                      Timeline analysis
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Determine urgency and implementation schedule
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prospect Insights Section */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left side: Title and points */}
            <div className="order-1 md:order-1">
              <TextReveal
                text="Reveal your website visitors"
                animation="slide"
                direction="up"
                className="text-3xl font-bold mb-6"
                splitBy="word"
              />
              <TextReveal
                text="Know who's engaging with your product before they fill out a form"
                animation="fade"
                className="text-xl text-muted-foreground mb-6"
                splitBy="word"
              />
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">
                      Company insights
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Industry, size, location, and revenue data
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">Contact details</h3>
                    <p className="text-sm text-muted-foreground">
                      Decision maker identification and contact information
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="mt-1 bg-primary/10 p-2 rounded-full">
                    <ArrowUpRight className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-base">
                      Engagement tracking
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Website visits, content viewed, and interaction metrics
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <InteractiveButton
                  className="gap-2 goji-animation"
                  clickEffect="ripple"
                  onClick={() => setShowEnrichmentModal(true)}
                >
                  <AnimatedIcon
                    icon={ArrowRight}
                    animation="pulse"
                    className="h-5 w-5"
                    hoverEffect
                  />
                  How prospect enrichment works
                </InteractiveButton>
              </div>
            </div>

            {/* Right side: Demo of enrichment */}
            <div className="order-2 md:order-2">
              <InteractiveCard className="overflow-hidden rounded-3xl shadow-md">
                <CardContent className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">
                        {demoProspect.name}
                      </h3>
                      <p className="text-muted-foreground">
                        {demoProspect.title}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4 text-muted-foreground/70" />
                      <span>{demoProspect.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4 text-muted-foreground/70" />
                      <span>{demoProspect.location}</span>
                    </div>
                  </div>

                  <div className="border-t border-b py-6 mb-6 grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1.5">
                        Industry
                      </div>
                      <div className="font-medium">{demoProspect.industry}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1.5">
                        Employees
                      </div>
                      <div className="font-medium">
                        {demoProspect.employees}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1.5">
                        Revenue
                      </div>
                      <div className="font-medium">{demoProspect.revenue}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1.5">
                        Intent Score
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">85%</span>
                        <div className="flex-1 h-2 bg-blue-100 rounded-full">
                          <div
                            className="h-2 bg-blue-500 rounded-full"
                            style={{ width: "85%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-muted-foreground mb-3">
                      Tech Stack
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {demoProspect.techStack.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="rounded-md py-1 px-3"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <div className="text-sm text-muted-foreground mb-3">
                      Interests
                    </div>
                    <div className="space-y-2">
                      {demoProspect.interests.map((interest, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <div className="text-primary">
                            <CheckCircle className="h-5 w-5" />
                          </div>
                          <span>{interest}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-3">
                      Recent Activity
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-primary/70" />
                          <span>Pricing</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          2m ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-primary/70" />
                          <span>Whitepaper</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          5m ago
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <PlayCircle className="h-4 w-4 text-primary/70" />
                          <span>Demo Video</span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          15m ago
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </InteractiveCard>
            </div>
          </div>
        </div>
      </section>

      {/*<div className="flex justify-center items-center custom-margin">
      <goji-embed-chat></goji-embed-chat>
        
      </div>*/}

      {/* Waitlist Form Section */}
      <section id="waitlist-form" className="py-24 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <TextReveal
              text="Your prospects want answers, not appointments."
              animation="slide"
              direction="up"
              className="text-3xl font-bold mb-6"
              splitBy="word"
            />
            <TextReveal
              text="Join our waitlist for early access and product updates"
              animation="fade"
              className="text-xl text-muted-foreground mb-6"
              splitBy="word"
            />
            <Card className="bg-background border-primary/10">
              <CardContent className="pt-6">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-4"
                  >
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <div className="flex">
                              <Input
                                placeholder="Enter your email address"
                                className="rounded-r-none focus-visible:ring-primary"
                                {...field}
                              />
                              <InteractiveButton
                                type="submit"
                                size="sm"
                                className="rounded-l-none px-4"
                                disabled={waitlistMutation.isPending}
                              >
                                {waitlistMutation.isPending ? (
                                  <Spinner size="sm" />
                                ) : (
                                  "Join Waitlist"
                                )}
                              </InteractiveButton>
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </form>
                </Form>
                <p className="text-xs text-muted-foreground mt-3">
                  We'll never share your email with anyone else.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* BANT Qualification Modal */}
      <AnimatePresence>
        {showBANTModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-background relative rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">
                    BANT Qualification Framework
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowBANTModal(false)}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    BANT is a sales qualification framework that helps identify
                    high-quality prospects by assessing four key criteria. Goji
                    automatically evaluates these during demos:
                  </p>

                  <div className="space-y-4">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <BadgeDollarSign className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Budget</h3>
                        <p className="text-muted-foreground">
                          Determines if the prospect has allocated funds for
                          your solution, or if they have the financial
                          capability to purchase it.
                        </p>
                        <div className="mt-2 text-sm bg-muted/30 p-3 rounded-md">
                          <span className="font-semibold">AI Detection:</span>{" "}
                          Goji identifies budget signals through questions about
                          pricing, ROI concerns, or statements about financial
                          constraints.
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Target className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Authority</h3>
                        <p className="text-muted-foreground">
                          Assesses whether the prospect has decision-making
                          power or influence over the buying process.
                        </p>
                        <div className="mt-2 text-sm bg-muted/30 p-3 rounded-md">
                          <span className="font-semibold">AI Detection:</span>{" "}
                          Goji recognizes authority signals when prospects
                          discuss their role in decision-making or mention
                          needing approval from others.
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <LineChart className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Need</h3>
                        <p className="text-muted-foreground">
                          Evaluates if the prospect has a genuine requirement
                          for your solution and if it addresses a significant
                          pain point.
                        </p>
                        <div className="mt-2 text-sm bg-muted/30 p-3 rounded-md">
                          <span className="font-semibold">AI Detection:</span>{" "}
                          Goji identifies need signals through expressions of
                          challenges, pain points, or specific requirements
                          discussed.
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Timeline</h3>
                        <p className="text-muted-foreground">
                          Determines when the prospect intends to implement a
                          solution, helping prioritize opportunities based on
                          urgency.
                        </p>
                        <div className="mt-2 text-sm bg-muted/30 p-3 rounded-md">
                          <span className="font-semibold">AI Detection:</span>{" "}
                          Goji detects timeline signals when prospects mention
                          implementation dates, deadlines, or urgency
                          indicators.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t flex justify-end">
                  <InteractiveButton
                    onClick={() => setShowBANTModal(false)}
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

      {/* Prospect Enrichment Modal */}
      <AnimatePresence>
        {showEnrichmentModal && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div
              className="bg-background relative rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-auto"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold">
                    How Prospect Enrichment Works
                  </h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowEnrichmentModal(false)}
                    className="rounded-full"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                <div className="space-y-6">
                  <p className="text-muted-foreground">
                    Goji's prospect enrichment technology identifies anonymous
                    visitors and enhances their profiles with valuable business
                    and contact information in real-time:
                  </p>

                  <div className="space-y-6">
                    <div className="relative">
                      {/* Completely removed the vertical line */}

                      <div className="flex gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                          <div className="font-semibold text-primary">1</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            Visitor Identification
                          </h3>
                          <p className="text-muted-foreground">
                            When someone visits your site and engages with goji,
                            our technology identifies them through IP
                            resolution, cookie matching, and proprietary
                            fingerprinting methods.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                          <div className="font-semibold text-primary">2</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            Data Enrichment
                          </h3>
                          <p className="text-muted-foreground">
                            Goji cross-references identified visitors against
                            our database of 200M+ companies and professionals,
                            pulling relevant company, contact, and industry
                            data.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4 mb-8">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                          <div className="font-semibold text-primary">3</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            Intent Scoring
                          </h3>
                          <p className="text-muted-foreground">
                            Our AI analyzes visitor engagement patterns, content
                            interactions, and conversation topics to generate an
                            intent score that predicts purchase likelihood.
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 border border-primary/20">
                          <div className="font-semibold text-primary">4</div>
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg">
                            Actionable Insights
                          </h3>
                          <p className="text-muted-foreground">
                            The enriched data is made available in real-time
                            during the demo conversation and delivered to your
                            sales team with recommended follow-up actions.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-muted/30 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">
                        Data Sources & Compliance
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        Goji sources data from public records, partner APIs, and
                        opt-in databases. All data collection and usage complies
                        with global privacy regulations including GDPR and CCPA,
                        with built-in consent management.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t flex justify-end">
                  <InteractiveButton
                    onClick={() => setShowEnrichmentModal(false)}
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
                    <img
                      src="/goji-logo.png"
                      alt="Goji Logo"
                      className="h-20"
                    />
                  </div>

                  <p className="text-muted-foreground leading-relaxed">
                    Goji AI was founded in 2024 with a clear mission: to
                    transform how B2B companies demonstrate products and qualify
                    leads through the power of conversational AI.
                  </p>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Our Mission
                      </h3>
                      <p className="text-muted-foreground">
                        To empower sales teams to scale personalized demos
                        without sacrificing quality, enabling them to focus on
                        high-value activities while our AI handles qualification
                        and initial engagement.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-2">
                        Our Technology
                      </h3>
                      <p className="text-muted-foreground">
                        Goji combines advanced conversational AI, real-time data
                        enrichment, and deep learning algorithms to qualify
                        leads using the BANT framework while delivering
                        engaging, personalized product demonstrations that adapt
                        to each prospect's needs.
                      </p>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-2">Our Team</h3>
                      <p className="text-muted-foreground">
                        Founded by veterans from the sales tech industry with
                        backgrounds at leading companies in CRM, sales
                        enablement, and AI technologies. Our diverse team brings
                        together expertise in machine learning, conversational
                        design, and enterprise sales.
                      </p>
                    </div>
                  </div>

                  <div className="bg-primary/5 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-primary">
                      Company Facts
                    </h4>
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
                    Have questions about Goji? Fill out the form below and our
                    team will get back to you shortly.
                  </p>

                  <form
                    className="space-y-4"
                    onSubmit={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Message sent!",
                        description:
                          "Thanks for reaching out. We'll be in touch soon.",
                      });
                      setContactFormData({ name: "", email: "", message: "" });
                      setShowContactModal(false);
                    }}
                  >
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        required
                        value={contactFormData.name}
                        onChange={(e) =>
                          setContactFormData((prev) => ({
                            ...prev,
                            name: e.target.value,
                          }))
                        }
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
                        onChange={(e) =>
                          setContactFormData((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                      <p className="text-xs text-muted-foreground">
                        Please use your work email for priority response
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="How can we help you?"
                        rows={5}
                        required
                        value={contactFormData.message}
                        onChange={(e) =>
                          setContactFormData((prev) => ({
                            ...prev,
                            message: e.target.value,
                          }))
                        }
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
                      <InteractiveButton type="submit" clickEffect="ripple">
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

      <Toaster />

      {/* Booking Calendar Modal */}
      <BookingCalendarModal
        isOpen={showBookingModal}
        onClose={handleCloseModal}
      />
      <DemoPopupModal
        isOpen={showDemoModal}
        onClose={() => setShowDemoModal(false)}
      />
      {/*<div className="flex min-h-screen items-center justify-center">
        <DemoPopup />
      </div>*/}

      {/* Footer with Admin Link */}
      <footer className="mt-20 py-4 border-t">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <img
                src="/goji-logo.png"
                alt="Goji Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Goji AI. All rights reserved.
              </span>
            </div>
            {/*<div className="flex items-center gap-4">
              <Link href="/auth" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Admin
              </Link>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm text-muted-foreground"
                onClick={() => setShowContactModal(true)}
              >
                Contact
              </Button>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-sm text-muted-foreground"
                onClick={() => setShowAboutModal(true)}
              >
                About
              </Button>
            </div>*/}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;

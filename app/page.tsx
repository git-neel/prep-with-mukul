"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ImageSlider } from "@/components/ImageSlider";
import { VideoTestimonialSlider } from "@/components/VideoTestimonialSlider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertDemoBookingSchema, type InsertDemoBooking } from "@shared/schema";
import {
  Star,
  Calendar,
  BookOpen,
  GraduationCap,
  ChevronRight,
  Menu,
  X,
  MessageCircle,
  CheckCircle,
  Target,
  User,
  Clock,
  School,
  Phone,
  Play,
} from "lucide-react";

// Images will be served from public folder
const heroImage = "/attached_assets/generated_images/student_studying_math_online.png";
const tutorImage = "/attached_assets/generated_images/professional_tutor_portrait.png";
const whatsappIcon = "/attached_assets/WhatsApp.svg";
const calendarIcon = "/attached_assets/calendar-orange.svg";

// Stats Counter Component
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [target]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
}

// Star Rating Component
function StarRating({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "#learning-process", label: "How It Works" },
    { href: "#courses", label: "Courses" },
    { href: "#achievers", label: "Past Achievers" },
    { href: "#schools", label: "Schools" },
    { href: "#tutor", label: "Meet The Tutor" },
    { href: "#why-learn", label: "Why Learn" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#faq", label: "FAQs" },
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-4xl text-primary font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }} data-testid="logo-text">Prep With Mukul</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}`}
              >
                {link.label}
              </a>
            ))}
          </nav>
          
          <div className="flex items-center gap-3">
            <Button
              size="icon"
              variant="ghost"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`nav-link-${link.label.toLowerCase().replace(/\s/g, '-')}-mobile`}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

// Hero Section Component
function HeroSection() {
  const [isHeroDialogOpen, setHeroDialogOpen] = useState(false);
  return (
    <section className="relative bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-900 to-orange-500/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-white" data-testid="text-hero-headline">
              Online Maths Tuition for{" "}
              <span className="text-orange-400">CBSE, ICSE, AP & SAT</span>
            </h1>
            
            <p className="text-xl md:text-2xl font-semibold text-gray-200 leading-relaxed">
              Help Your Child Apply Maths Correctly in Exams:{" "}
              <span className="text-orange-300">Not Just Memorise Formulas</span>
            </p>
            
            <div className="space-y-4 text-gray-300">
              <p className="text-base md:text-lg leading-relaxed">
                Concept-based online Maths coaching for{" "}
                <strong className="text-white">CBSE and ICSE students in India</strong>, and for{" "}
                <strong className="text-white">AP Precalculus, AP Calculus, and SAT Math students worldwide</strong>.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                Designed for students who understand concepts but lose marks due to{" "}
                <span className="text-orange-300">poor application</span>,{" "}
                <span className="text-orange-300">exam pressure</span>, or{" "}
                <span className="text-orange-300">lack of structured practice</span>.
              </p>
            </div>
            
            <div className="space-y-4 pt-4">
              <h3 className="text-lg font-semibold text-white">
                What students gain from this <span className="text-orange-400">CONCEPT-FIRST</span> approach:
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base md:text-lg leading-relaxed">
                    Clear conceptual understanding that reduces common mistakes
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base md:text-lg leading-relaxed">
                    Exam-aligned practice that improves accuracy and confidence
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-base md:text-lg leading-relaxed">
                    Small batches or one-to-one sessions with consistent guidance throughout the exam cycle
                  </span>
                </li>
              </ul>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Dialog open={isHeroDialogOpen} onOpenChange={setHeroDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-base px-8 py-6" style={{ color: 'black' }} data-testid="button-book-demo-hero">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book a FREE Orientation Call
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-xl">Book Your Free Demo</DialogTitle>
                    <DialogDescription>
                      Fill in your details and we'll get back to you within 24 hours.
                    </DialogDescription>
                  </DialogHeader>
                  <BookDemoForm onSuccess={() => setHeroDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
            
            <p className="text-sm text-gray-400 italic pt-2">
              No sales pitch • Honest guidance • Right-fit only
            </p>
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-1">
                <StarRating />
              </div>
              <span className="text-sm text-gray-300">Join 120+ league of achievers!</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 to-blue-900">
              <img
                src={heroImage}
                alt="Student learning mathematics online"
                className="w-full h-auto object-cover mix-blend-lighten opacity-80"
                data-testid="img-hero"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-slate-950/40 via-transparent to-orange-500/10 pointer-events-none" />
              
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2 z-10">
                <div className="flex items-center gap-3">
                  <span className="text-2xl font-bold text-green-400">75%</span>
                  <ChevronRight className="w-4 h-4 text-white" />
                  <span className="text-2xl font-bold text-green-300">95%</span>
                </div>
              </div>
              
              <div className="absolute top-4 left-4">
                <Badge variant="destructive" className="bg-red-500 text-white text-xs">
                  <span className="w-2 h-2 bg-white rounded-full mr-1 animate-pulse" />
                  LIVE
                </Badge>
              </div>
            </div>
            
            <div className="absolute -bottom-6 -right-6 bg-white rounded-xl p-4 shadow-2xl border-2 border-orange-400 hidden lg:block z-20">
              <div className="text-center space-y-1">
                <p className="text-xs font-semibold text-gray-600">Excellent</p>
                <StarRating />
                <p className="text-xs text-gray-600 font-medium">Based on 29 reviews</p>
                <p className="font-bold text-blue-600 text-sm">Google</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" className="w-full h-auto fill-background">
          <path d="M0,40 C480,100 960,0 1440,60 L1440,100 L0,100 Z" />
        </svg>
      </div>
    </section>
  );
}



// Learning Process Section
function LearningProcessSection() {
  const learningCards = [
    {
      icon: BookOpen,
      title: "Concept-Focused Math Instruction",
      description: "Mathematics is taught with a strong focus on conceptual clarity rather than rote methods. Students first understand why a concept works before applying it, which helps reduce common mistakes and build confidence across topics.",
    },
    {
      icon: Target,
      title: "Structured & Personalized Learning Plan",
      description: "Each student follows a structured plan based on their level, pace, and exam requirements. Small batches and one-to-one options ensure focused attention, regular feedback, and targeted practice where needed.",
    },
    {
      icon: CheckCircle,
      title: "Exam-Oriented Practice & Guidance",
      description: "Sessions emphasize exam-style questions, guided problem-solving, and mistake analysis. Students learn how to apply concepts accurately under time pressure in tests and final exams.",
    },
  ];
  
  return (
    <section id="learning-process" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            How It Works
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold" data-testid="text-learning-process-headline">
            How the Learning Process Works?
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {learningCards.map((card, index) => (
            <Card key={index} className="card-hover bg-card border-card-border">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <card.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold" data-testid={`text-learning-card-title-${index}`}>
                  {card.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Student Achievers Section
// Image Slider Section
function ImageSliderSection() {
  const images = [
    { src: "/attached_assets/ayesha.jpeg", caption: "Student engaged in concept mastery" },
    { src: "/attached_assets/peter.jpeg", caption: "Live problem-solving session" },
    { src: "/attached_assets/student.jpeg", caption: "Interactive learning environment" },
    { src: "/attached_assets/aadit.jpeg", caption: "One-on-one focused guidance" },
    { src: "/attached_assets/Mishika.jpeg", caption: "Concept clarity in action" },
    { src: "/attached_assets/divina.jpeg", caption: "Structured exam practice" },
    { src: "/attached_assets/mamtaRitika.jpeg", caption: "Student progress milestone" },
    { src: "/attached_assets/sampleClass.jpeg", caption: "Batch class in session" },
    { src: "/attached_assets/SampleClass7th.jpeg", caption: "Engaging young learners" },
  ];

  return (
    <section id="classroom" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Experience
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Inside the Classroom Moments with Mukul Sir
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real screenshots from live online teaching sessions. Click any image to view in detail.
          </p>
        </div>
        
        <ImageSlider images={images} />
      </div>
    </section>
  );
}

// Schools Section
function SchoolsSection() {
  const schools = [
    "MV High School, California, USA",
    "Chancellor High School, Spotsylvania County, Virginia, USA",
    "Signature School, Indiana, USA",
    "BASIS, Texas, USA",
    "GEMS Our Own English High School, Dubai",
    "Delhi Public School, Varanasi, India",
    "Delhi Public School, Bhopal, India",
    "Sunbeam School, Varanasi",
    "Maneckji Cooper Education Trust School, Mumbai",
  ];
  
  return (
    <section id="schools" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Enrolled
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            School students from
          </h2>
          <p className="text-primary font-medium">120+ UAE, Singapore, Indian Schools</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {schools.map((school, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <School className="w-5 h-5 text-primary" />
                </div>
                <p className="text-sm font-medium" data-testid={`text-school-${index}`}>{school}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Courses Section
function CoursesSection() {
  const courses = [
    {
      id: "cbse",
      title: "CBSE / ICSE Maths",
      description: "Classes follow the NCERT and ICSE syllabi closely, with emphasis on method, presentation, and exam-oriented problem-solving.",
      points: [
        "Concept-first explanations aligned with board textbooks",
        "Focus on accuracy, steps, and common exam mistakes",
        "Regular chapter-wise practice and assessments",
        "Small batches or one-to-one support as required"
      ],
      icon: BookOpen,
    },
    {
      id: "common-core",
      title: "US Common Core Maths",
      description: "Teaching is aligned with grade-level Common Core standards, with emphasis on reasoning and conceptual understanding.",
      points: [
        "Clear explanation of concepts and underlying logic",
        "Multiple approaches to problem-solving",
        "Focus on reasoning, not memorisation",
        "Individual attention to address learning gaps"
      ],
      icon: School,
    },
    {
      id: "sat",
      title: "SAT Math",
      description: "Preparation is structured around the actual SAT (Digital SAT) test format and question styles.",
      points: [
        "Review of core SAT Math concepts: Algebra, Advanced Math, Problem-Solving & Data Analysis, and Geometry & Trigonometry",
        "Practice with exam-style questions and time management",
        "Emphasis on accuracy under timed conditions",
        "Small batch or one-to-one focused preparation"
      ],
      icon: Target,
    },
    {
      id: "ap",
      title: "AP Precalculus & AP Calculus",
      description: "Classes focus on depth, clarity, and the level of thinking expected in AP exams.",
      points: [
        "Strong emphasis on functions, algebra, and calculus concepts",
        "Step-by-step development of ideas and methods",
        "Practice aligned with AP exam expectations",
        "Support for coursework, quizzes, and test preparation"
      ],
      icon: GraduationCap,
    },
  ];
  
  return (
    <section id="courses" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Courses
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold" data-testid="text-courses-headline">
            Courses I teach?
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Each course follows the same core philosophy:{" "}
            <span className="text-foreground font-semibold">concept clarity</span>,{" "}
            <span className="text-foreground font-semibold">structured practice</span>,{" "}
            <span className="text-foreground font-semibold">consistent guidance</span>
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            {courses.map((course, index) => (
              <AccordionItem key={course.id} value={course.id} className="border-b border-border/50 last:border-b-0">
                <AccordionTrigger className="hover:no-underline py-6 group">
                  <div className="flex items-center gap-4 text-left">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                      <course.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-heading text-lg font-semibold" data-testid={`text-course-title-${index}`}>
                      {course.title}
                    </h3>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="space-y-4 pl-16">
                    <p className="text-muted-foreground">
                      {course.description}
                    </p>
                    <ul className="space-y-2">
                      {course.points.map((point, pointIndex) => (
                        <li key={pointIndex} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                          <span className="text-muted-foreground">{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

// Meet The Tutor Section
function MeetTheTutorSection() {
  const [isTutorDialogOpen, setTutorDialogOpen] = useState(false);
  const stats = [
    { label: "Teaching Approach", value: "Concept Clarity & Exam Application" },
    { label: "Students From", value: "India · UAE · USA · UK" },
    { label: "Courses Taught", value: "CBSE · ICSE · AP · SAT · US Common Core" },
    { label: "Class Format", value: "Small Batches & One-to-One" },
  ];
  
  return (
    <section id="tutor" className="py-20 bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm px-4 py-1">
                Namaste
              </Badge>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-orange-500">
                Meet The Tutor.
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p>
                Hi, I'm Mukul, an online Mathematics tutor and a{" "}
                <strong className="text-orange-300">Delhi University alumnus</strong>, working with{" "}
                <strong className="text-orange-300">CBSE, ICSE, AP, SAT, and US Common Core</strong> students.
                I focus on building strong fundamentals, clear thinking, and exam-ready problem-solving rather than shortcuts or memorisation.
              </p>
              <p>
                To make this effective in practice, I work closely with students in{" "}
                <strong className="text-orange-300">small batches or one-to-one sessions</strong>, taking ownership of their progress:{" "}
                From identifying learning gaps to helping them apply concepts confidently in exams.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-xs text-gray-400 uppercase tracking-wide">{stat.label}</p>
                  <p className="font-semibold text-white">{stat.value}</p>
                </div>
              ))}
            </div>
            
            <Dialog open={isTutorDialogOpen} onOpenChange={setTutorDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="bg-white hover:bg-gray-100" style={{ color: 'black' }} data-testid="button-book-demo-tutor">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book a FREE Orientation Call
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-heading text-xl">Book Your Free Demo</DialogTitle>
                  <DialogDescription>
                    Fill in your details and we'll get back to you within 24 hours.
                  </DialogDescription>
                </DialogHeader>
                <BookDemoForm onSuccess={() => setTutorDialogOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
          
          <div className="relative flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white/20">
                <img
                  src={tutorImage}
                  alt="Mukul - Math Tutor"
                  className="w-full h-full object-cover"
                  data-testid="img-tutor"
                />
              </div>
              
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-orange-500 rounded-2xl px-8 py-4 shadow-2xl border border-orange-400/50">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-3xl font-black" style={{ color: '#f97316' }}><AnimatedCounter target={2000} suffix="+" /></p>
                    <p className="text-sm font-semibold tracking-wide" style={{ color: '#f97316' }}>Hours</p>
                  </div>
                  <div className="w-px h-10" style={{ backgroundColor: 'rgba(249, 115, 22, 0.5)' }} />
                  <div className="text-center">
                    <p className="text-3xl font-black" style={{ color: '#f97316' }}><AnimatedCounter target={50} suffix="+" /></p>
                    <p className="text-sm font-semibold tracking-wide" style={{ color: '#f97316' }}>Students</p>
                  </div>
                  <div className="w-px h-10" style={{ backgroundColor: 'rgba(249, 115, 22, 0.5)' }} />
                  <div className="text-center">
                    <p className="text-3xl font-black" style={{ color: '#f97316' }}><AnimatedCounter target={4} suffix="+" /></p>
                    <p className="text-sm font-semibold tracking-wide" style={{ color: '#f97316' }}>Yrs Exp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Why Learn Section
function WhyLearnSection() {
  const reasons = [
    {
      icon: BookOpen,
      title: "One Focus. Maths.",
      description: "Concept-first teaching across CBSE, ICSE, AP, SAT, and US Common Core: no shortcuts, no dilution.",
    },
    {
      icon: User,
      title: "Individual Learning Approach",
      description: "Teaching is adapted to each student's gaps, pace, and problem-solving approach, rather than following a fixed script.",
    },
    {
      icon: Phone,
      title: "Single Teacher Model",
      description: "All classes are taught by me from start to finish, ensuring continuity, clarity, and consistent guidance.",
    },
  ];
  
  return (
    <section id="why-learn" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Why
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Learn with Mukul sir
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Dedicated online Maths coaching focused on concept clarity, structured practice, and exam-ready problem-solving.
            Taught in small batches or one-to-one, with complete ownership of the learning process: from fundamentals to confident exam application.
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <Card key={index} className="card-hover text-center">
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                  <reason.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold">{reason.title}</h3>
                <p className="text-muted-foreground text-sm">{reason.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Testimonials Section
// Testimonials Section
function TestimonialsSection() {
  const videoTestimonials = [
    { src: "/attached_assets/MitishaFeedback1.mp4", studentName: "Mishika's experience" },
    { src: "/attached_assets/student2VideoFeedback.mp4", studentName: "Student Feedback" },
    { src: "/attached_assets/Student3VideoFeedback.mp4", studentName: "Student Review" },
    { src: "/attached_assets/Student4VideoFeedback.mp4", studentName: "Student Success" },
  ];
  
  return (
    <section id="testimonials" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Results
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Students love Prep With Mukul.
          </h2>
          <p className="text-muted-foreground">Hear directly from students about their learning journey.</p>
        </div>
        
        <VideoTestimonialSlider videos={videoTestimonials} />
      </div>
    </section>
  );
}

// Student Feedback Section
function StudentFeedbackSection() {
  const feedbackImages = [
    { src: "/attached_assets/PeterReview.jpeg", caption: "Positive student feedback" },
    { src: "/attached_assets/RitikaResult.jpeg", caption: "Success story" },
    { src: "/attached_assets/Student5WhatsappFeedback.jpeg", caption: "Student review" },
    { src: "/attached_assets/student6WhatsappFeedback.jpeg", caption: "Student feedback" },
  ];

  return (
    <section id="feedback" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Feedback
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            What Students Are Saying
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real screenshots from student feedback and achievements.
          </p>
        </div>
        
        <ImageSlider images={feedbackImages} />
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: "How are classes structured?",
      answer: "Classes are conducted in small batches or one-to-one, depending on the requirement. The focus is on clear explanation, guided problem-solving, and consistent practice.",
    },
    {
      question: "Do you personally teach all classes?",
      answer: "Yes. I teach every class myself. There are no substitute teachers, assistants, or handovers at any stage.",
    },
    {
      question: "How is this different from large coaching platforms?",
      answer: "This is a mentor-led model, not a factory-style setup. Teaching adapts to the student's gaps, pace, and thinking rather than following a fixed script.",
    },
    {
      question: "What if my child is weak in fundamentals?",
      answer: "That's exactly where the work starts. Classes focus on fixing foundational gaps first, before moving to exam-level questions.",
    },
    {
      question: "Do you teach all curricula the same way?",
      answer: "No. CBSE/ICSE, AP, SAT, and US Common Core each have different expectations. The teaching style, examples, and practice are adapted to the specific syllabus and exam format.",
    },
    {
      question: "Will my child get individual attention in a group batch?",
      answer: "Yes. Batches are kept intentionally small so individual gaps and mistakes are addressed during class. If a student needs deeper support, one-to-one sessions are also available.",
    },
    {
      question: "What does \"concept-first\" actually mean in class?",
      answer: "It means understanding why a method works before applying it to questions. This reduces guesswork and improves accuracy under exam pressure.",
    },
    {
      question: "What happens in the free orientation call?",
      answer: "We discuss the student's current level, problem areas, syllabus, and expectations. Based on this, I suggest whether the course is a good fit and in what format.",
    },
  ];
  
  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            FAQs
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Frequently Asked Questions
          </h2>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2" data-testid={`text-faq-question-${index}`}>{faq.question}</h3>
                <p className="text-muted-foreground text-sm">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Final CTA Section
function FinalCTASection() {
  const [isFinalDialogOpen, setFinalDialogOpen] = useState(false);
  const [isWhatsAppDialogOpen, setWhatsAppDialogOpen] = useState(false);
  const whatsappNumber = "+919807612635";
  const whatsappLink = `https://wa.me/919807612635?text=${encodeURIComponent("Hi Mukul, I'd like to book an orientation call.")}`;
  const whatsappQr = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(whatsappLink)}`;
  return (
    <section className="py-20 bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-8">
        <h2 className="font-heading text-3xl md:text-4xl font-bold">
          Ready to boost your Math scores?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Join <span className="text-orange-400 font-semibold text-xl">30+ students</span> who have already transformed their Math performance. Book your orientation call today and take the first step towards exam success.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Dialog open={isFinalDialogOpen} onOpenChange={setFinalDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white font-semibold" data-testid="button-book-demo-cta">
                <Calendar className="w-5 h-5 mr-2" />
                Book an Orientation Call
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">Book Your Free Demo</DialogTitle>
                <DialogDescription>
                  Fill in your details and we'll get back to you within 24 hours.
                </DialogDescription>
              </DialogHeader>
              <BookDemoForm onSuccess={() => setFinalDialogOpen(false)} />
            </DialogContent>
          </Dialog>
          <Dialog open={isWhatsAppDialogOpen} onOpenChange={setWhatsAppDialogOpen}>
            <DialogTrigger asChild>
              <Button 
                size="lg" 
                variant="ghost" 
                className="border-0 shadow-md"
                style={{ backgroundColor: '#25D366', color: 'black' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#20BA5A'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#25D366'}
              >
                <img src={whatsappIcon} alt="WhatsApp" className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="font-heading text-xl">Scan to WhatsApp</DialogTitle>
                <DialogDescription>
                  Scan the QR to message Mukul on WhatsApp or tap the button below.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col items-center gap-4 py-2">
                <img src={whatsappQr} alt="WhatsApp QR code" className="w-56 h-56 rounded-lg border border-gray-200" />
                <p className="text-sm text-gray-500">Number: {whatsappNumber}</p>
                <Button asChild className="bg-[#25D366] hover:bg-[#20BA5A] text-black w-full">
                  <a href={whatsappLink} target="_blank" rel="noreferrer">
                    Open WhatsApp Chat
                  </a>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center justify-center gap-2">
          <StarRating />
          <span className="text-sm opacity-75">4.9/5 rating from 29 reviews</span>
        </div>
      </div>
    </section>
  );
}

// Floating WhatsApp Button
function FloatingWhatsAppButton() {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappNumber = "+919807612635";
  const whatsappLink = `https://wa.me/919807612635?text=${encodeURIComponent("Hi Mukul, I'd like to book an orientation call.")}`;
  const whatsappQr = `https://api.qrserver.com/v1/create-qr-code/?size=320x320&data=${encodeURIComponent(whatsappLink)}`;
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            aria-label="Chat on WhatsApp"
            className="rounded-full shadow-lg border border-green-700/30"
            style={{ backgroundColor: '#25D366', color: 'black', padding: '14px' }}
          >
            <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Scan to WhatsApp</DialogTitle>
            <DialogDescription>
              Scan the QR to message Mukul on WhatsApp or tap the button below.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center gap-4 py-2">
            <img src={whatsappQr} alt="WhatsApp QR code" className="w-56 h-56 rounded-lg border border-gray-200" />
            <p className="text-sm text-gray-500">Number: {whatsappNumber}</p>
            <Button asChild className="bg-[#25D366] hover:bg-[#20BA5A] text-black w-full">
              <a href={whatsappLink} target="_blank" rel="noreferrer">
                Open WhatsApp Chat
              </a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Floating Demo Booking Button (left)
function FloatingDemoButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button
            aria-label="Book an orientation call"
            className="rounded-full shadow-lg border border-orange-500/30"
            style={{ backgroundColor: '#f97316', color: 'white', padding: '14px' }}
          >
            <img src={calendarIcon} alt="Book orientation call" className="w-6 h-6" />
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">Book Your Free Demo</DialogTitle>
            <DialogDescription>
              Fill in your details and we'll get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>
          <BookDemoForm onSuccess={() => setIsOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Footer Component
function Footer() {
  return (
    <footer className="bg-slate-950 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="text-4xl text-white font-bold tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>Prep With Mukul</span>
            <p className="text-sm">
              Online math tuition for CBSE, ICSE, US Common Core, SAT Math, and AP Calculus with personalized attention and concept-first teaching.
            </p>
          </div>
          
          <div className="md:col-span-2">
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <li><a href="#learning-process" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#courses" className="hover:text-white transition-colors">Courses</a></li>
              <li><a href="#achievers" className="hover:text-white transition-colors">Past Achievers</a></li>
              <li><a href="#schools" className="hover:text-white transition-colors">Schools</a></li>
              <li><a href="#tutor" className="hover:text-white transition-colors">Meet The Tutor</a></li>
              <li><a href="#why-learn" className="hover:text-white transition-colors">Why Learn</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 9807612635
              </li>
              <li className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4" />
                WhatsApp Support
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                7 AM - 11 PM all day
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Prep With Mukul. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

// Book Demo Form Component
function BookDemoForm({ onSuccess }: { onSuccess?: () => void }) {
  const { toast } = useToast();
  
  const form = useForm<InsertDemoBooking>({
    resolver: zodResolver(insertDemoBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      grade: "cbse-icse-10",
      message: "",
    },
  });
  
  const mutation = useMutation({
    mutationFn: async (data: InsertDemoBooking) => {
      const response = await apiRequest("POST", "/api/bookings", data);
      return response;
    },
    onSuccess: () => {
      toast({
        title: "Booking completed!",
        description: "Booking is done, we'll contact your number as soon as possible.",
        duration: 5000,
        style: { backgroundColor: 'hsl(38 94% 50%)', color: 'black' },
      });
      form.reset({ name: "", email: "", phone: "", grade: "cbse-icse-10", message: "" });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Something went wrong",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
    },
  });
  
  const onSubmit = (data: InsertDemoBooking) => {
    mutation.mutate(data);
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} data-testid="input-name" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="your@email.com" type="email" {...field} data-testid="input-email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+91 9807612635" {...field} data-testid="input-phone" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="grade"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Grade</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger data-testid="select-grade">
                    <SelectValue placeholder="Select grade" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="cbse-icse-6-8">CBSE / ICSE (Classes 6-8)</SelectItem>
                  <SelectItem value="cbse-icse-9">CBSE / ICSE (Class 9)</SelectItem>
                  <SelectItem value="cbse-icse-10">CBSE / ICSE (Class 10)</SelectItem>
                  <SelectItem value="us-common-core">US Common Core Math</SelectItem>
                  <SelectItem value="sat-math">SAT Math</SelectItem>
                  <SelectItem value="ap-precalculus">AP Precalculus</SelectItem>
                  <SelectItem value="ap-calculus">AP Calculus</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your learning goals..."
                  className="resize-none"
                  {...field}
                  value={field.value || ""}
                  data-testid="textarea-message"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" style={{ color: 'black' }} disabled={mutation.isPending} data-testid="button-submit-demo">
          {mutation.isPending ? "Submitting..." : "Book a FREE Orientation Call"}
        </Button>
      </form>
    </Form>
  );
}

// Main Home Page Component
export default function Home() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);
  
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <LearningProcessSection />
        <CoursesSection />
        <ImageSliderSection />
        <SchoolsSection />
        <MeetTheTutorSection />
        <WhyLearnSection />
        <TestimonialsSection />
        <StudentFeedbackSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingDemoButton />
      <FloatingWhatsAppButton />
    </div>
  );
}

import { useState, useEffect } from "react";
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertDemoBookingSchema, type InsertDemoBooking } from "@shared/schema";
import {
  Star,
  Calendar,
  Users,
  BookOpen,
  GraduationCap,
  CheckCircle,
  Play,
  Phone,
  Award,
  Target,
  User,
  Clock,
  School,
  Video,
  ChevronRight,
  Menu,
  X,
  Sun,
  Moon,
} from "lucide-react";
import heroImage from "@assets/generated_images/student_studying_math_online.png";
import tutorImage from "@assets/generated_images/professional_tutor_portrait.png";

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

// WhatsApp brand icon (SVG)
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false" {...props}>
      <path
        fill="currentColor"
        d="M16.002 6.003a9.99 9.99 0 0 0-8.54 15.028l-.887 3.25 3.34-.876A9.995 9.995 0 1 0 16.002 6zm0 17.6a7.6 7.6 0 1 1 0-15.2 7.6 7.6 0 0 1 0 15.2zm4.16-5.664c-.227-.113-1.34-.66-1.548-.736-.208-.075-.36-.113-.511.114-.151.226-.586.736-.718.888-.132.151-.264.17-.49.057-.227-.114-.958-.353-1.824-1.126-.674-.602-1.128-1.346-1.26-1.573-.132-.226-.014-.349.099-.461.101-.1.227-.264.34-.396.113-.132.151-.226.227-.377.075-.151.038-.283-.019-.396-.057-.113-.51-1.226-.698-1.68-.184-.442-.372-.382-.511-.39-.132-.008-.283-.01-.434-.01-.151 0-.396.057-.604.283-.208.226-.792.773-.792 1.885 0 1.112.812 2.187.925 2.339.113.151 1.6 2.442 3.878 3.423 2.278.98 2.278.654 2.689.613.412-.038 1.34-.547 1.529-1.075.189-.528.189-.982.132-1.075-.057-.094-.208-.151-.434-.264z"
      />
    </svg>
  );
}


// Header Component
function Header({ isDark, toggleTheme }: { isDark: boolean; toggleTheme: () => void }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { href: "#course", label: "Course Flow" },
    { href: "#achievers", label: "Past Achievers" },
    { href: "#tutor", label: "Meet The Tutor" },
    { href: "#faq", label: "FAQs" },
  ];
  
  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-handwritten text-4xl text-primary" data-testid="logo-text">Master Mukul</span>
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
              onClick={toggleTheme}
              data-testid="button-theme-toggle"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            
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
    <section className="relative bg-slate-900 dark:bg-slate-950 text-white overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-primary/20 dark:from-slate-950 dark:via-slate-900 dark:to-primary/10" />
      
      <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-sm text-blue-300 font-medium tracking-wide uppercase">
              Online math tuition for class 10 CBSE
            </p>
            
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold leading-tight" data-testid="text-hero-headline">
              Assured boost in scores up to{" "}
              <span className="text-primary">+15%</span> within three months.
            </h1>
            
            <div className="space-y-2 text-gray-300">
              <p className="font-medium">+65% students I talk to,</p>
              <ul className="space-y-1 text-sm md:text-base">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#9702;</span>
                  Know concepts, but can't apply in exams.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#9702;</span>
                  Do silly mistakes when solving quicker.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">&#9702;</span>
                  Want more timed practice tests as boards.
                </li>
              </ul>
            </div>
            
            <div className="flex items-start gap-2 text-gray-200">
              <span className="text-primary text-lg">&#10148;</span>
              <p>
                Get online math classes with small-batches & assistance till{" "}
                <strong className="text-white">final board-exam day.</strong>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Dialog open={isHeroDialogOpen} onOpenChange={setHeroDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-base px-8 py-6" data-testid="button-book-demo-hero">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book my FREE Demo
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
            
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-center gap-1">
                <StarRating />
              </div>
              <span className="text-sm text-gray-300">Join 1470+ league of achievers!</span>
            </div>
          </div>
          
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={heroImage}
                alt="Student learning mathematics online"
                className="w-full h-auto object-cover"
                data-testid="img-hero"
              />
              
              <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
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
            
            <div className="absolute -bottom-6 -right-6 bg-white dark:bg-slate-800 rounded-xl p-4 shadow-xl hidden lg:block">
              <div className="text-center space-y-1">
                <p className="text-xs text-muted-foreground">Excellent</p>
                <StarRating />
                <p className="text-xs text-muted-foreground">Based on 119+ reviews</p>
                <p className="font-bold text-foreground">Google</p>
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

// Social Proof Section
function SocialProofSection() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Student Achievers
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold" data-testid="text-achievers-headline">
            from recent years.
          </h2>
          <p className="text-muted-foreground">Join the tribe of 1470+ Achievers!</p>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: GraduationCap,
      title: "Experienced Math Tutor",
      description: "Comprehensive online math tuition classes are available for Class 10 students. We have experienced tutors who specialize in teaching math to Class 10 students.",
    },
    {
      icon: Target,
      title: "Customized Lesson Plan",
      description: "Customized lesson plans tailored to the learning pace and style of each student. One-on-one attention and support to help students achieve their academic goals.",
    },
    {
      icon: Video,
      title: "Interactive Session",
      description: "Enjoy interactive sessions with engaging teaching methods to make learning math fun and practical with online tuition for class 10. Ace your Class 10 math exams with the best online tuition classes in town.",
    },
  ];
  
  return (
    <section id="course" className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="card-hover bg-card border-card-border">
              <CardContent className="p-6 space-y-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold" data-testid={`text-feature-title-${index}`}>
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
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
function StudentAchieversSection() {
  const achievers = [
    { name: "Priya S.", score: "98/100", year: "2024" },
    { name: "Arjun K.", score: "95/100", year: "2024" },
    { name: "Sneha M.", score: "97/100", year: "2024" },
    { name: "Rahul P.", score: "94/100", year: "2024" },
    { name: "Ananya R.", score: "99/100", year: "2024" },
    { name: "Vikram S.", score: "96/100", year: "2024" },
  ];
  
  return (
    <section id="achievers" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Why
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold" data-testid="text-top-performers">
            MasterMukul's 2024 Top Performers
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {achievers.map((achiever, index) => (
            <Card key={index} className="card-hover overflow-hidden bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
              <CardContent className="p-4 text-center space-y-2">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <h4 className="font-semibold text-sm">{achiever.name}</h4>
                <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20">
                  {achiever.score}
                </Badge>
                <p className="text-xs text-muted-foreground">{achiever.year}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// Schools Section
function SchoolsSection() {
  const schools = [
    "Yuvabharti School, Singapore",
    "Amity International, Noida",
    "GEMS International, UAE",
    "DPS Mathura Road, Delhi",
    "National Public School, Bangalore",
    "Our Own Indian School, UAE",
    "Indian School, Oman",
  ];
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Enrolled
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            School students from
          </h2>
          <p className="text-primary font-medium">129+ UAE, Singapore, Indian Schools</p>
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

// How It Works Section
function HowItWorksSection() {
  const [isHowDialogOpen, setHowDialogOpen] = useState(false);
  const points = [
    { text: "Small batches keep the student actively engaged", highlight: "Max. 7" },
    { text: "Work together with other kids with similar struggles.", highlight: null },
    { text: "Instant support - Inside the class. And outside.", highlight: "via WhatsApp & Call" },
    { text: "Chapterwise assessments to monitor performance.", highlight: null },
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm px-4 py-1">
                How
              </Badge>
              <h2 className="font-heading text-2xl md:text-3xl font-bold">
                How these classes work
              </h2>
            </div>
            
            <ul className="space-y-4">
              {points.map((point, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                  <span className="text-muted-foreground">
                    {point.text}
                    {point.highlight && (
                      <strong className="text-foreground"> ({point.highlight})</strong>
                    )}
                  </span>
                </li>
              ))}
            </ul>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Dialog open={isHowDialogOpen} onOpenChange={setHowDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="lg" data-testid="button-book-demo-how">
                    <Calendar className="w-5 h-5 mr-2" />
                    Book a FREE Demo
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle className="font-heading text-xl">Book Your Free Demo</DialogTitle>
                    <DialogDescription>
                      Fill in your details and we'll get back to you within 24 hours.
                    </DialogDescription>
                  </DialogHeader>
                  <BookDemoForm onSuccess={() => setHowDialogOpen(false)} />
                </DialogContent>
              </Dialog>
              <p className="text-sm text-muted-foreground flex items-center">
                Join 1470+ league of achievers!
              </p>
            </div>
          </div>
          
          <div className="relative">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <img
                  src={heroImage}
                  alt="Online math tuition class"
                  className="w-full h-auto object-cover"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}

// Meet The Tutor Section
function MeetTheTutorSection() {
  const [isTutorDialogOpen, setTutorDialogOpen] = useState(false);
  const stats = [
    { label: "Nurturing", value: "Toppers Since 2013" },
    { label: "Students", value: "129+ Global Schools" },
    { label: "Alumnus", value: "NIT Allahabad" },
    { label: "Worked at", value: "Vedantu, Cuemath" },
  ];
  
  return (
    <section id="tutor" className="py-20 bg-slate-900 dark:bg-slate-950 text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="text-sm px-4 py-1 bg-white/10 text-white border-white/20">
                Namaste
              </Badge>
              <h2 className="font-heading text-2xl md:text-3xl font-bold">
                Meet The Tutor.
              </h2>
            </div>
            
            <div className="space-y-4 text-gray-300">
              <p>
                Hi, Mukul here, an online Maths tutor for grade 10 CBSE, taking{" "}
                <strong className="text-white">complete ownership till their final board-exam day.</strong>
              </p>
              <p>
                Whether you want to improve your confidence in Math or need full course online tuition for CBSE class 10 or with your homework, I could help!
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
                <Button size="lg" className="bg-white text-slate-900 hover:bg-gray-100" data-testid="button-book-demo-tutor">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book my FREE Demo
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
              
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white dark:bg-slate-800 rounded-xl px-6 py-3 shadow-xl">
                <div className="flex items-center gap-4 text-foreground">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary"><AnimatedCounter target={5000} suffix="+" /></p>
                    <p className="text-xs text-muted-foreground">Hours</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary"><AnimatedCounter target={1470} suffix="+" /></p>
                    <p className="text-xs text-muted-foreground">Students</p>
                  </div>
                  <div className="w-px h-8 bg-border" />
                  <div className="text-center">
                    <p className="text-2xl font-bold text-primary"><AnimatedCounter target={12} suffix="+" /></p>
                    <p className="text-xs text-muted-foreground">Yrs Exp</p>
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
      icon: Target,
      title: "1 Speciality. Math.",
      description: "CBSE Grade 10 specialist; NO other Grade or Boards.",
    },
    {
      icon: User,
      title: "1 Focus. You.",
      description: "Focus on YOUR specific struggles. NOT generic ones.",
    },
    {
      icon: Phone,
      title: "1 Point Of Contact. Me.",
      description: "1 responsible P.O.C for entire course; Not a faceless brand.",
    },
  ];
  
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Why
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Learn with Mukul Sir.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience dedicated online coaching where students learn through engaging online classes for class 10, with complete support in mastering maths concepts. Total ownership till Board exam!
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
function TestimonialsSection() {
  const testimonials = [
    {
      name: "Mudit S.",
      score: "90/100",
      quote: "Happy to find a tutor who could understand my child's psychology",
    },
    {
      name: "Pranay",
      score: "95/100",
      quote: "My son continued with him for 2 years straight",
    },
    {
      name: "Anvita",
      score: "99/100",
      quote: "He was available to answer all my silly queries",
    },
  ];
  
  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12">
          <Badge variant="secondary" className="text-sm px-4 py-1">
            Results
          </Badge>
          <h2 className="font-heading text-2xl md:text-3xl font-bold">
            Students love MasterMukul.
          </h2>
          <p className="text-muted-foreground">Achieving results with personalized classes.</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="card-hover">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <Badge className="bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20 text-xs">
                        {testimonial.score}
                      </Badge>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Play className="w-5 h-5 text-primary ml-0.5" />
                  </div>
                </div>
                <StarRating />
                <p className="text-muted-foreground text-sm italic">"{testimonial.quote}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <Button variant="outline" data-testid="button-see-testimonials">
            See 119+ testimonials
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQSection() {
  const faqs = [
    {
      question: "What grades do you teach?",
      answer: "I specialize exclusively in Class 10 CBSE Mathematics. This focused approach allows me to provide the best possible guidance for board exam preparation.",
    },
    {
      question: "What is the batch size?",
      answer: "Maximum 7 students per batch. This ensures personalized attention and active participation from each student.",
    },
    {
      question: "How do I join a demo class?",
      answer: "Simply click on 'Book my FREE Demo' button and fill in your details. I'll reach out to schedule a convenient time for you.",
    },
    {
      question: "What platform do you use for classes?",
      answer: "Classes are conducted on Zoom/Google Meet with interactive whiteboards. Students also get WhatsApp support for doubts outside class hours.",
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
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-4 md:px-6 text-center space-y-8">
        <h2 className="font-heading text-2xl md:text-4xl font-bold">
          Ready to boost your Math scores?
        </h2>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Join 1470+ students who have already transformed their Math performance. Book your free demo today and take the first step towards academic excellence.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Dialog open={isFinalDialogOpen} onOpenChange={setFinalDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" variant="secondary" className="text-primary" data-testid="button-book-demo-cta">
                <Calendar className="w-5 h-5 mr-2" />
                Book my FREE Demo
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
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10">
                <WhatsAppIcon className="w-5 h-5 mr-2" />
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
          <span className="text-sm opacity-75">4.9/5 rating from 119+ reviews</span>
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
            <WhatsAppIcon className="w-6 h-6" />
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

// Footer Component
function Footer() {
  return (
    <footer className="bg-slate-900 dark:bg-slate-950 text-gray-300 py-12">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <span className="font-handwritten text-4xl text-white">Master Mukul</span>
            <p className="text-sm">
              Online math tuition for Class 10 CBSE with personalized attention and guaranteed score improvement.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#course" className="hover:text-white transition-colors">Course Flow</a></li>
              <li><a href="#achievers" className="hover:text-white transition-colors">Past Achievers</a></li>
              <li><a href="#tutor" className="hover:text-white transition-colors">Meet The Tutor</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQs</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2">
                <WhatsAppIcon className="w-4 h-4" />
                WhatsApp Support
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-white mb-4">Hours</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Mon - Sat: 4PM - 9PM
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Sun: By Appointment
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MasterMukul. All rights reserved.</p>
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
      grade: "10",
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
      form.reset({ name: "", email: "", phone: "", grade: "10", message: "" });
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
                <Input placeholder="+91 98765 43210" {...field} data-testid="input-phone" />
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
                  <SelectItem value="9">Class 9</SelectItem>
                  <SelectItem value="10">Class 10</SelectItem>
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
        
        <Button type="submit" className="w-full" disabled={mutation.isPending} data-testid="button-submit-demo">
          {mutation.isPending ? "Submitting..." : "Book Free Demo"}
        </Button>
      </form>
    </Form>
  );
}

// Main Home Page Component
export default function Home() {
  const [isDark, setIsDark] = useState(false);
  
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const shouldBeDark = stored === "dark" || (!stored && prefersDark);
    
    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle("dark", shouldBeDark);
  }, []);
  
  const toggleTheme = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    document.documentElement.classList.toggle("dark", newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Header isDark={isDark} toggleTheme={toggleTheme} />
      <main>
        <HeroSection />
        <SocialProofSection />
        <FeaturesSection />
        <StudentAchieversSection />
        <SchoolsSection />
        <HowItWorksSection />
        <MeetTheTutorSection />
        <WhyLearnSection />
        <TestimonialsSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
      <FloatingWhatsAppButton />
    </div>
  );
}

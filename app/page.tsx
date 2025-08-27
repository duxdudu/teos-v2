"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SiTiktok } from "react-icons/si";
// import { FaFacebook } from 'react-icons/fa';

import { Dialog } from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";

import {
  Phone,
  Mail,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Menu,
  StarIcon,
  InstagramIcon,
  YoutubeIcon,
  ArrowUp,
  Camera,
  Calendar,
  Settings,
  Zap,
  Clock,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { MobileNav } from "@/components/mobile-nav";
import { FaFacebook, FaLinkedin } from "react-icons/fa";
import { BsSnapchat } from "react-icons/bs";
import LanguageSwitcher from "@/components/LanguageSwitcher";
// import TestimonialsShowcase from "@/app/components/TestimonialsShowcase";
import api from "@/lib/utils/axios-config";
import TestimonialsShowcase from "./components/TestimonialsShowcase";
// import { MobileNav } from "@/components/mobile-nav"

interface Photo {
  _id: string;
  title: string;
  description: string;
  category: string;
  imageUrl: string;
  isPublished: boolean;
}

interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  description: string;
  stats: string;
  coverImage: string;
  images: string[];
  client?: string;
  date?: string;
}

export default function Home() {
  const { t } = useTranslation();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  // Inside your Home component, add this state
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  
  // Contact form state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceType: '',
    eventDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Portfolio state
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [projectImageIndex, setProjectImageIndex] = useState(0);

  // Slideshow state
  const [currentSlide, setCurrentSlide] = useState(0);

  // Slideshow functions
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === 4 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? 4 : prev - 1));
  };

  // Auto-advance slideshow every 6 seconds
  useEffect(() => {
    if (!mounted) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [mounted]);

  // Portfolio projects data
  const portfolioProjects: PortfolioProject[] = [
    {
      id: "wedding-sarah-john",
      title: "Sarah & John's Wedding",
      category: "Wedding Photography",
      description: "A beautiful outdoor wedding celebration filled with love, laughter, and unforgettable moments. Captured every detail from the intimate ceremony to the lively reception.",
      stats: "WEDDING • 8 PHOTOS • COMPLETED",
      coverImage: "/wedding1.jpg",
      images: ["/wedding1.jpg", "/wedding2.jpg", "/wedding3.jpg", "/wedding4.jpg", "/wedding5.jpg", "/wedding6.jpg", "/wedding7.jpg", "/wedding8.jpg"],
      client: "Sarah & John",
      date: "June 2024"
    },
    {
      id: "portrait-emma",
      title: "Emma's Professional Portraits",
      category: "Portrait Photography",
      description: "Professional headshots and personal branding photography for a successful entrepreneur. Clean, modern style that captures personality and professionalism.",
      stats: "PORTRAIT • 8 PHOTOS • COMPLETED",
      coverImage: "/Portrait.jpg",
      images: ["/Portrait.jpg", "/Portrait2.jpg", "/Portrait3.jpg", "/Portrait4.jpg", "/Portrait5.jpg", "/Portrait6.jpg", "/Portrait7.jpg", "/Portrait8.jpg"],
      client: "Emma Rodriguez",
      date: "May 2024"
    },
    {
      id: "commercial-restaurant",
      title: "Nyandungu Restaurant",
      category: "Commercial Photography",
      description: "Complete restaurant photography including interior shots, food styling, and team portraits. Created a comprehensive visual brand package for marketing materials.",
      stats: "COMMERCIAL • 9 PHOTOS • COMPLETED",
      coverImage: "/Commercial1.jpg",
      images: ["/Commercial1.jpg", "/Commercial2.jpg", "/Commercial3.jpg", "/Commercial4.jpg", "/Commercial5.jpg", "/Commercial6.jpg", "/Commercial7.jpg", "/Commercial8.jpg"],
      client: "Bella Vista Restaurant",
      date: "April 2024"
    },
    {
      id: "event-tech-conference",
      title: "Tech Innovation Summit 2024",
      category: "Event Photography",
      description: "Corporate event coverage including keynote speakers, networking sessions, and product demonstrations. Professional documentation of a major industry conference.",
      stats: "EVENT • 11 PHOTOS • COMPLETED",
      coverImage: "/4.jpg",
      images: ["/4.jpg", "/5.jpg", "/6.jpg", "/7.jpg", "/8.jpg","/Tech1.jpg", "/Tech2.jpg", "/Tech3.jpg"],
      client: "Tech Innovations Inc.",
      date: "March 2024"
    },
    {
      id: "landscape-mountains",
      title: "Rwanda Mountain Landscapes",
      category: "Landscape Photography",
      description: "Breathtaking landscape photography showcasing Rwanda's natural beauty. Captured during golden hour and blue hour for optimal lighting conditions.",
      stats: "LANDSCAPE • 10 PHOTOS • COMPLETED",
      coverImage: "/Landscapes1.jpg",
      images: ["/Landscapes1.jpg", "/Landscapes2.jpg", "/Landscapes3.jpg", "/Landscapes4.jpg", "/Landscapes5.jpg", "/Landscapes6.jpg", "/Landscapes7.jpg", "/Landscapes8.jpg", "/Landscapes9.jpg", "/Landscapes10.jpg"],
      client: "Personal Project",
      date: "February 2024"
    },
    {
      id: "food-artisan-cafe",
      title: "Artisan Café Menu Photography",
      category: "Food Photography",
      description: "Styled food photography for a local café's new menu. Each dish carefully arranged and lit to showcase texture, color, and appetizing presentation.",
      stats: "FOOD • 12 PHOTOS • COMPLETED",
      coverImage: "/Artisan7.jpg",
      images: ["/Artisan1.jpg", "/Artisan2.jpg", "/Artisan3.jpg", "/Artisan4.jpg", "/Artisan5.jpg", "/Artisan6.jpg", "/Artisan7.jpg", "/Artisan8.jpg","/Artisan9.jpg", "/Artisan10.jpg","/Artisan11.jpg", "/Artisan12.jpg"],
      client: "Artisan Café",
      date: "January 2024"
    }
  ];

  useEffect(() => {
    if (theme) {
      document.documentElement.classList.remove("dark", "light");
      document.documentElement.classList.add(theme);
      localStorage.setItem("theme", theme);
    }
  }, [theme]);
  // Add this useEffect after other useEffects
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        // First, let's test if the backend is accessible
        try {
          await api.get('/health');
          console.log('✅ Backend health check successful');
        } catch (healthError: unknown) {
          const error = healthError as { message?: string; response?: { status?: number; statusText?: string; data?: unknown }; config?: unknown };
          console.error('❌ Backend health check failed:', healthError);
          console.error('❌ Health check error details:', {
            message: error.message,
            status: error.response?.status,
            statusText: error.response?.statusText,
            data: error.response?.data,
            config: error.config
          });
        }
        
        // Test the gallery endpoint directly
        const response = await api.get('/gallery');
        
        if (response.data.photos && response.data.photos.length > 0) {
          console.log(`✅ Loaded ${response.data.photos.length} photos successfully`);
          setPhotos(response.data.photos);
        } else {
          console.log('⚠️ No photos found in response');
          setPhotos([]);
        }
        
        setLoading(false);
      } catch (error: unknown) {
        const apiError = error as { 
          message?: string; 
          response?: { 
            status?: number; 
            statusText?: string; 
            data?: unknown 
          }; 
          config?: unknown;
          code?: string;
        };
        console.error("❌ Error fetching photos:", error);
        console.error("❌ Error details:", {
          message: apiError.message,
          status: apiError.response?.status,
          statusText: apiError.response?.statusText,
          data: apiError.response?.data,
          config: apiError.config,
          baseURL: api.defaults.baseURL
        });
        
        if (apiError.response?.status === 404) {
          console.error("❌ 404: Gallery endpoint not found");
        } else if (apiError.response?.status === 403) {
          console.error("❌ 403: CORS issue - Access forbidden");
        } else if (apiError.code === 'ECONNREFUSED') {
          console.error("❌ Connection refused - Backend not accessible");
        } else if (apiError.code === 'ENOTFOUND') {
          console.error("❌ Host not found - Check backend URL");
        } else if (apiError.code === 'NETWORK_ERROR') {
          console.error("❌ Network error - Check internet connection");
        }
        
        setPhotos([]);
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const toggleMobileNav = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  // Scroll to top functionality
  useEffect(() => {
    if (!mounted) return;
    
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setShowScrollToTop(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create email body
      const emailBody = `
New Photography Booking Inquiry

Client Details:
- Name: ${formData.firstName} ${formData.lastName}
- Email: ${formData.email}
- Phone: ${formData.phone}
- Service Type: ${formData.serviceType}
- Event Date: ${formData.eventDate || 'Not specified'}

Message:
${formData.message}

---
This message was sent from the Teoflys Photography website contact form.
      `;

      // Create mailto link
      const mailtoLink = `mailto:dushimedieudonne9@gmail.com?subject=Photography Booking - ${formData.serviceType}&body=${encodeURIComponent(emailBody)}`;
      
      // Open email client
      window.location.href = mailtoLink;

      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          serviceType: '',
          eventDate: '',
          message: ''
        });
        setIsSubmitting(false);
        alert('Thank you for your inquiry! Your email client should open shortly. If not, please contact us directly at helloteofly@gmail.com');
      }, 1000);

    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('There was an error submitting your form. Please try again or contact us directly.');
    }
  };

  // Portfolio functions
  const openProjectDialog = (project: PortfolioProject) => {
    setSelectedProject(project);
    setProjectImageIndex(0);
  };

  const closeProjectDialog = () => {
    setSelectedProject(null);
    setProjectImageIndex(0);
  };

  const nextProjectImage = () => {
    if (selectedProject) {
      setProjectImageIndex((prev) => 
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevProjectImage = () => {
    if (selectedProject) {
      setProjectImageIndex((prev) => 
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className="min-h-screen pt-20 bg-white text-black dark:bg-black dark:text-white ">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full flex items-center justify-between px-4 sm:px-6 py-4 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-black z-50 ">
        <div className="flex justify-center">
          <Image 
            src="/logo1.png" 
            alt="Teoflys Photography Logo" 
            width={120}
            height={120}
            className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto ml-2 object-contain"
          />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          <Link
            href="#"
            className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
          >
            {t('common.home')}
          </Link>
          <Link
            href="#about"
            className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
          >
            {t('common.aboutUs')}
          </Link>
          <Link
            href="#portfolio"
            className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
          >
            {t('common.portfolio')}
          </Link>
          <Link
            href="#gallery"
            className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
          >
            {t('common.gallery')}
          </Link>
          <Link
            href="#services"
            className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
          >
            {t('common.services')}
          </Link>
          <Link
            href="/testimonials"
            className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
          >
            {t('common.testimonials')}
          </Link>
          <Link
            href="#contact"
            className="text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors duration-300"
          >
            {t('common.contact')}
          </Link>
        </nav>

        {/* Mobile Menu Button & Contact */}
        <div className="flex items-center gap-4">
          {/* Language Switcher */}
          <LanguageSwitcher />
          {/* <Link href="#contact">
            <Button className="bg-yellow-500 dark:bg-yellow-400 text-black hover:bg-yellow-600 dark:hover:bg-yellow-500 text-xs sm:text-sm px-3 sm:px-4 transition-all duration-300 hover:scale-105">
              CONTACT US
            </Button>
          </Link> */}
          <button
            onClick={toggleTheme}
            className="relative w-14 h-7 bg-gray-200 dark:bg-gray-700 rounded-full p-1 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label="Toggle theme"
          >
            <div className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ease-in-out ${
              theme === "dark" ? "translate-x-7" : "translate-x-0"
            }`} />
            <div className="flex items-center justify-between h-full px-1">
              <span className={`text-xs transition-opacity duration-300 ${
                theme === "dark" ? "opacity-100 " : "opacity-100"
              }`}>☀️</span>
              <span className={`text-xs transition-opacity duration-300 ${
                theme === "dark" ? "opacity-100" : "opacity-100"
              }`}>🌙</span>
            </div>
          </button>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-all duration-300"
            onClick={toggleMobileNav}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </header>

      {/* Mobile Navigation */}
      <MobileNav isOpen={isMobileNavOpen} onToggle={toggleMobileNav} />

      {/* Hero Section */}
      <section className="px-4 sm:px-6 py-8 sm:py-16 bg-gray-100 dark:bg-black animate-fade-in">
        <div className="max-w-7xl mx-auto">
          <div className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mb-2 animate-fade-in-up">
            {t('hero.premiumPhotography')}
          </div>
          <div className="flex flex-col xl:flex-row items-start justify-between mb-4 sm:mb-4">
            <h1 className="text-4xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6 xl:mb-0 leading-tight text-gray-900 dark:text-white animate-fade-in-up">
              TEOS.<span className="text-yellow-500 dark:text-yellow-400">VISUAL</span>
            </h1>
            {/* <div className="flex flex-row sm:flex-col items-center sm:items-start gap-4 animate-fade-in-up">
              <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">
                LET&apos;S
              </span>
              <Button className="bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-full px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-white transition-all duration-300 hover:scale-105">
                BOOK NOW
              </Button>
            </div> */}
          </div>

          <div className="animate-fade-in-up relative">
            {/* Modern Slideshow Container */}
            <div className="relative w-full max-w-8xl mx-auto">
              {/* Main Image Display */}
              <div className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-gray-900 to-black">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
                
                                 {/* Current Image */}
                 <div className="relative h-full w-full">
                   <picture className="w-full h-full">
                     {/* Mobile First - Smaller images for mobile */}
                     <source
                       media="(max-width: 640px)"
                       srcSet={currentSlide === 0 ? "/hero.png" : 
                               currentSlide === 1 ? "/hero3.png" : 
                               currentSlide === 2 ? "/hero1.png" : 
                               currentSlide === 3 ? "/hero4.png" : "/hero2.png"}
                     />
                     {/* Tablet */}
                     <source
                       media="(max-width: 1024px)"
                       srcSet={currentSlide === 0 ? "/hero.png" : 
                               currentSlide === 1 ? "/hero3.png" : 
                               currentSlide === 2 ? "/hero1.png" : 
                               currentSlide === 3 ? "/hero4.png" : "/hero2.png"}
                     />
                     {/* Desktop */}
                     <Image
                       src={currentSlide === 0 ? "/hero.png" : 
                        currentSlide === 1 ? "/hero3.png" : 
                        currentSlide === 2 ? "/hero1.png" : 
                        currentSlide === 3 ? "/hero4.png" : "/hero2.png"}
                       alt={`Photography Showcase ${currentSlide + 1}`}
                       width={1920}
                       height={1080}
                       className="w-full h-full object-cover transition-all duration-700 ease-out"
                     />
                   </picture>
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                  
                  {/* Image Info */}
                  <div className="absolute bottom-6 left-6 text-white">
                    <h3 className="text-2xl font-bold mb-2">
                      {currentSlide === 0 ? t('hero.professionalPhotography') :
                       currentSlide === 1 ? t('hero.architecturalPhotography') :
                       currentSlide === 2 ? t('hero.natureCoverage') :
                       currentSlide === 3 ? t('hero.landscapePhotography') : t('hero.creativeFoodArt')}
                    </h3>
                    <p className="text-gray-200 opacity-90">
                      {currentSlide === 0 ? t('hero.captureSpecialMoments') :
                       currentSlide === 1 ? t('hero.professionalArchitectural') :
                       currentSlide === 2 ? t('hero.completeNature') :
                       currentSlide === 3 ? t('hero.beautifulLandscapes') : t('hero.uniqueFoodPerspectives')}
                    </p>
            </div>
          </div>

                {/* Navigation Controls */}
                <button
                  onClick={prevSlide}
                  className="absolute left-4 top-1/2 -translate-y-1/2 group"
                  aria-label="Previous image"
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 border border-white/20">
                    <svg className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                </button>
                
                <button
                  onClick={nextSlide}
                  className="absolute right-4 top-1/2 -translate-y-1/2 group"
                  aria-label="Next image"
                >
                  <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:bg-white/20 hover:scale-110 border border-white/20">
                    <svg className="w-6 h-6 text-white group-hover:text-yellow-300 transition-colors duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </button>

                {/* Progress Bar */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                  <div 
                    className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 transition-all duration-300 ease-out"
                    style={{ width: `${((currentSlide + 1) / 5) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Thumbnail Navigation */}
              <div className="mt-6 flex justify-center">
                <div className="flex space-x-3">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`group relative overflow-hidden rounded-lg transition-all duration-300 ${
                        currentSlide === index 
                          ? 'ring-2 ring-yellow-400 ring-offset-2 ring-offset-white dark:ring-offset-gray-900 scale-110' 
                          : 'hover:scale-105'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    >
                                             <div className="w-20 h-16 relative">
                         <picture className="w-full h-full">
                           {/* Mobile Thumbnails */}
              <source
                             media="(max-width: 640px)"
                             srcSet={index === 0 ? "/hero.png" : 
                                     index === 1 ? "/hero3.png" : 
                                     index === 2 ? "/hero1.png" : 
                                     index === 3 ? "/hero4.png" : "/hero2.png"}
                           />
                           {/* Desktop Thumbnails */}
                           <Image
                             src={index === 0 ? "/hero.png" : 
                                  index === 1 ? "/hero3.png" : 
                                  index === 2 ? "/hero1.png" : 
                                  index === 3 ? "/hero4.png" : "/hero2.png"}
                             alt={`Thumbnail ${index + 1}`}
                             width={80}
                             height={64}
                             className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
                           />
            </picture>
                        {/* Overlay for active state */}
                        {currentSlide === index && (
                          <div className="absolute inset-0 bg-yellow-400/20"></div>
                        )}
          </div>

                      {/* Active indicator */}
                      {currentSlide === index && (
                        <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white dark:border-gray-900"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Slide Counter with Style */}
              {/* <div className="mt-4 text-center">
                <div className="inline-flex items-center gap-2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700">
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Image</span>
                  <span className="text-lg font-bold text-gray-900 dark:text-white">{currentSlide + 1}</span>
                  <span className="text-sm text-gray-400">of 5</span>
                </div>
              </div> */}
            </div>
          </div>

          {/* Compact Category Section */}
          <div className="px-6 mt-4 sm:mt-6">
            {/* Category Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3">
              {[
                { 
                  label: t('categories.food'), 
                  icon: "🍽️", 
                  link: "/services/food",
                  gradient: "from-orange-400 to-red-500"
                },
                { 
                  label: t('categories.commercial'), 
                  icon: "🏢", 
                  link: "/services/commercial",
                  gradient: "from-blue-500 to-purple-600"
                },
                { 
                  label: t('categories.product'), 
                  icon: "📦", 
                  link: "/services/commercial",
                  gradient: "from-green-400 to-teal-500"
                },
                { 
                  label: t('categories.wedding'), 
                  icon: "💒", 
                  link: "/services/wedding",
                  gradient: "from-pink-400 to-rose-500"
                },
                { 
                  label: t('categories.landscape'), 
                  icon: "🏞️", 
                  link: "/services/landscape",
                  gradient: "from-emerald-400 to-green-600"
                },
                { 
                  label: t('categories.architectural'), 
                  icon: "🏛️", 
                  link: "/services/architectural",
                  gradient: "from-slate-500 to-gray-700"
                },
                { 
                  label: t('categories.portrait'), 
                  icon: "👤", 
                  link: "/services/portrait",
                  gradient: "from-amber-400 to-yellow-500",
                  show: "hidden lg:block"
                },
                { 
                  label: t('categories.event'), 
                  icon: "🎉", 
                  link: "/services/events",
                  gradient: "from-indigo-400 to-purple-500",
                  show: "hidden lg:block"
                }
            ].map((item, index) => (
              <Link
                key={item.label}
                href={item.link}
                  className={`group relative overflow-hidden rounded-lg transition-all duration-300 ease-out hover:scale-105 hover:shadow-lg cursor-pointer ${item.show || ''}`}
                style={{
                    animation: `fadeInUp 0.4s ease ${(index + 1) * 0.05}s both`,
                  opacity: 0,
                  transform: "translateY(10px)",
                }}
              >
                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-90 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  
                  {/* Content */}
                  <div className="relative p-2 sm:p-3 flex items-center justify-center gap-2 text-white">
                    {/* Icon */}
                    <div className="text-lg sm:text-xl group-hover:scale-110 transition-transform duration-300">
                      {item.icon}
                    </div>
                    
                    {/* Label */}
                    <h4 className="font-medium text-xs leading-tight">
                {item.label}
                    </h4>
                  </div>
                  
                  {/* Hover Effect Overlay */}
                  <div className="absolute inset-0 bg-white/10 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
            </div>

            {/* Inline style tag for fadeInUp keyframes */}
            <style>
              {`
      @keyframes fadeInUp {
        0% {
          opacity: 0;
          transform: translateY(10px);
        }
        100% {
          opacity: 1;
          transform: translateY(0);
        }
      }
    `}
            </style>
          </div>
        </div>
      </section>

      {/* I Am Teoflys Section */}
      <section
        id="about"
        className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50 dark:bg-gray-900 animate-fade-in"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-row sm:flex-col items-center sm:items-start justify-between mb-6 sm:mb-8 gap-4 animate-fade-in-up">
            {/* <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
              I'M
              <span className="text-yellow-500 dark:text-yellow-400 ml-2">
                TEOS.VISUAL
              </span>
            </h2> */}
            <a href="#contact">
            <Button
              variant="outline"
              className="border-yellow-500 dark:border-yellow-400 text-yellow-500 dark:text-yellow-400 hover:bg-yellow-500 dark:hover:bg-yellow-400 hover:text-white dark:hover:text-black bg-transparent text-sm sm:text-base px-4 sm:px-6 transition-all duration-300 hover:scale-105"
            >
              {t('common.connectWithUs')}
            </Button></a>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            <div className="h-[500px] bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden animate-fade-in-left">
              <Image
                src="/2.jpg"
                alt="Teoflys portrait"
                width={480}
                height={300}
                className="w-full h-full object-cover transition-all duration-300 hover:scale-105"
              />
            </div>

            <div className="space-y-6 sm:space-y-8 animate-fade-in-right">
              <div>
                <h3 className="text-yellow-500 dark:text-yellow-400 text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex gap-2 items-center">
                  <StarIcon /> {t('about.introduction')}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-sm sm:text-base">
                  {t('about.introductionText')}
                </p>
              </div>

              <div>
                <h3 className="text-yellow-500 dark:text-yellow-400 text-base sm:text-lg font-semibold mb-3 sm:mb-4 flex gap-2 items-center ">
                  <StarIcon /> {t('about.contactInformation')}
                </h3>
                <div className="">
                  <div className="flex flex-row items-center justify-between w-full space-x-2 sm:space-x-4 md:space-x-6">
                    <a 
                      href="mailto:theonyn11@gmail.com"
                      className="flex-1 flex flex-col items-center gap-1 text-center min-w-0 hover:scale-105 transition-transform duration-300"
                    >
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Mail className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                          {t('about.email')}
                        </span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base truncate hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                        theonyn11@gmail.com
                      </span>
                    </a>
                    <a 
                      href="tel:+212620487204"
                      className="flex-1 flex flex-col items-center gap-1 text-center min-w-0 hover:scale-105 transition-transform duration-300"
                    >
                      <div className="flex items-center gap-1 sm:gap-2">
                        <Phone className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                          {t('about.phone')}
                        </span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base truncate hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">
                        +212 620-487204
                      </span>
                    </a>
                    <div className="flex-1 flex flex-col items-center gap-1 text-center min-w-0">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-500 dark:text-yellow-400 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
                          {t('about.address')}
                        </span>
                      </div>
                      <span className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm md:text-base truncate">
                        {t('about.moroccoRabat')}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row justify-center items-center w-full gap-4 mt-6">
                    {/* Social Icons */}
                    <div className="flex gap-3 sm:gap-4 bg-yellow-500 dark:bg-yellow-400 opacity-80 w-full sm:w-auto p-3 sm:p-3 rounded-full justify-center transition-all duration-300 hover:scale-105">
                      <a
                        href="https://www.facebook.com/teoflyphotography"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-blue-600"
                        aria-label="Follow us on Facebook"
                      >
                        <FaFacebook className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                      <a
                        href="https://www.tiktok.com/@teoflyphotography"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-pink-600"
                        aria-label="Follow us on TikTok"
                      >
                        <SiTiktok className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                      <a
                        href="https://www.linkedin.com/company/teoflyphotography"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-blue-700"
                        aria-label="Follow us on LinkedIn"
                      >
                        <FaLinkedin className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                      <a
                        href="https://www.instagram.com/teofls/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-pink-500"
                        aria-label="Follow us on Instagram"
                      >
                        <InstagramIcon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                      <a
                        href="https://www.snapchat.com/add/teoflyphotography"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-yellow-400"
                        aria-label="Follow us on Snapchat"
                      >
                        <BsSnapchat className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                      <a
                        href="https://www.youtube.com/@teoflyphotography"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black p-2 rounded-full transition-all duration-300 hover:scale-110 hover:bg-red-600"
                        aria-label="Follow us on YouTube"
                      >
                        <YoutubeIcon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
                      </a>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto">
                      {/* Button 1 */}
                      <a
                        href="#portfolio"
                        className="p-[2px] bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 rounded-md w-full sm:w-auto transition-all duration-300 hover:scale-105"
                      >
                        <button className="bg-white dark:bg-black text-yellow-500 dark:text-yellow-400 px-4 sm:px-6 py-2 rounded-md w-full transition-all duration-300 hover:scale-105 hover:brightness-110 text-sm sm:text-base">
                          {t('about.ourGallery')}
                        </button>
                      </a>
                      {/* Button 2 */}
                      {/* <a
                        href="/cv.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-[2px] bg-gradient-to-r from-yellow-500 via-red-500 to-purple-600 rounded-md w-full sm:w-auto transition-all duration-300 hover:scale-105"
                      >
                        <button className="bg-white dark:bg-black text-yellow-500 dark:text-yellow-400 px-4 sm:px-6 py-2 rounded-md w-full transition-all duration-300 hover:scale-105 hover:brightness-110 text-sm sm:text-base">
                          Download CV
                        </button>
                      </a> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Photography Services Section */}
      <section
        id="services"
        className="px-4 sm:px-6 py-12 sm:py-16 bg-white dark:bg-black"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('services.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {/* Wedding Photography */}
            <div className="bg-gradient-to-br from-pink-50 to-rose-100 dark:from-pink-900/20 dark:to-rose-800/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-pink-200 dark:border-pink-800 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">💒</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('services.wedding.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('services.wedding.description')}
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.wedding.features.0')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.wedding.features.1')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.wedding.features.2')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.wedding.features.3')}
                </li>
              </ul>
              <div className="absolute bottom-4 right-4">
                <a href="/services/wedding" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-400 to-rose-500 text-white text-sm font-medium rounded-lg hover:from-pink-500 hover:to-rose-600 transition-all duration-300 hover:scale-105 shadow-md">
                  {t('common.moreDetails')}
                </a>
              </div>
            </div>

            {/* Portrait Photography */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-blue-200 dark:border-blue-800 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('services.portrait.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('services.portrait.description')}
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.portrait.features.0')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.portrait.features.1')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.portrait.features.2')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.portrait.features.3')}
                </li>
              </ul>
              <div className="absolute bottom-4 right-4">
                <a href="/services/portrait" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-400 to-indigo-500 text-white text-sm font-medium rounded-lg hover:from-blue-500 hover:to-indigo-600 transition-all duration-300 hover:scale-105 shadow-md">
                  {t('common.moreDetails')}
                </a>
              </div>
            </div>

            {/* Event Photography */}
            <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-purple-200 dark:border-purple-800 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-violet-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🎭</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('services.event.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('services.event.description')}
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.event.features.0')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.event.features.1')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.event.features.2')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.event.features.3')}
                </li>
              </ul>
              <div className="absolute bottom-4 right-4">
                <a href="/services/events" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-400 to-violet-500 text-white text-sm font-medium rounded-lg hover:from-purple-500 hover:to-violet-600 transition-all duration-300 hover:scale-105 shadow-md">
                  {t('common.moreDetails')}
                </a>
              </div>
            </div>

            {/* Commercial Photography */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-green-200 dark:border-green-800 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏢</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('services.commercial.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('services.commercial.description')}
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.commercial.features.0')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.commercial.features.1')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.commercial.features.2')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.commercial.features.3')}
                </li>
              </ul>
              <div className="absolute bottom-4 right-4">
                <a href="/services/commercial" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-400 to-emerald-500 text-white text-sm font-medium rounded-lg hover:from-green-500 hover:to-emerald-600 transition-all duration-300 hover:scale-105 shadow-md">
                  {t('common.moreDetails')}
                </a>
              </div>
            </div>

            {/* Landscape Photography */}
            <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-800/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-yellow-200 dark:border-yellow-800 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🏔️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('services.landscape.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('services.landscape.description')}
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.landscape.features.0')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.landscape.features.1')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.landscape.features.2')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.landscape.features.3')}
                </li>
              </ul>
              <div className="absolute bottom-4 right-4">
                <a href="/services/landscape" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-sm font-medium rounded-lg hover:from-yellow-500 hover:to-amber-600 transition-all duration-300 hover:scale-105 shadow-md">
                  {t('common.moreDetails')}
                </a>
              </div>
            </div>

            {/* Food Photography */}
            <div className="bg-gradient-to-br from-orange-50 to-red-100 dark:from-orange-900/20 dark:to-red-800/20 rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:scale-105 border border-orange-200 dark:border-orange-800 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center">
                  <span className="text-2xl">🍽️</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {t('services.food.title')}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('services.food.description')}
              </p>
              <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.food.features.0')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.food.features.1')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.food.features.2')}
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full flex-shrink-0"></span>
                  {t('services.food.features.3')}
                </li>
              </ul>
              <div className="absolute bottom-4 right-4">
                <a href="/services/food" className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-orange-400 to-red-500 text-white text-sm font-medium rounded-lg hover:from-orange-500 hover:to-red-600 transition-all duration-300 hover:scale-105 shadow-md">
                  {t('common.moreDetails')}
                </a>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-lg">
              {t('services.cta.readyToCapture')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#contact">
              <Button className="bg-yellow-500 dark:bg-yellow-400 text-black hover:bg-yellow-600 dark:hover:bg-yellow-500 px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105">
                Book a Session
              </Button>
              </a>
              <a href="#portfolio">
              <Button
                variant="outline"
                className="border-yellow-500 dark:border-yellow-400 text-yellow-500 dark:text-yellow-400 hover:bg-yellow-500 dark:hover:bg-yellow-400 dark:hover:text-black hover:text-black px-8 py-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
              >
                {t('common.viewPortfolio')}
              </Button>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section
        id="portfolio"
        className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('portfolio.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('portfolio.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {portfolioProjects.map((project) => (
              <Card 
                key={project.id}
                className="group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer hover:scale-105"
                onClick={() => openProjectDialog(project)}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={project.coverImage}
                    alt={project.title}
                    width={600}
                    height={600}
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-4 left-4 right-4 text-white opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    <Badge className="bg-yellow-500 text-black mb-2 text-xs">
                      {t(`portfolio.projects.${project.id}.category`)}
                    </Badge>
                    <p className="text-sm font-medium">{t('portfolio.viewGallery')}</p>
                  </div>
                  <div className="absolute top-4 right-4 opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                      <span className="text-white text-sm font-medium">{project.images.length} {t('portfolio.photos')}</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 sm:p-6">
                  <div className="mb-3">
                    <h3 className="font-bold text-lg mb-1 text-gray-900 dark:text-white group-hover:text-yellow-500 transition-colors duration-300">
                      {t(`portfolio.projects.${project.id}.title`)}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                      {t(`portfolio.projects.${project.id}.stats`)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
                    {t(`portfolio.projects.${project.id}.description`)}
                  </p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{t(`portfolio.projects.${project.id}.date`)}</span>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-yellow-500 hover:text-yellow-600 hover:bg-yellow-50 dark:hover:bg-yellow-900/20 p-2"
                    >
                      {t('portfolio.viewGallery')} →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Project Dialog */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 lg:p-6 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-6xl lg:max-w-5xl xl:max-w-6xl max-h-[95vh] sm:max-h-[90vh] lg:max-h-[95vh] bg-white dark:bg-gray-900 rounded-lg sm:rounded-xl overflow-hidden shadow-2xl mx-2">
              {/* Header */}
              <div className="flex items-center justify-between p-3 sm:p-4 lg:p-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg sm:text-xl lg:text-xl font-bold text-gray-900 dark:text-white truncate">
                    {t(`portfolio.projects.${selectedProject.id}.title`)}
                  </h3>
                  <p className="text-xs sm:text-sm lg:text-sm text-gray-500 dark:text-gray-400 truncate">
                    {t(`portfolio.projects.${selectedProject.id}.client`)} • {t(`portfolio.projects.${selectedProject.id}.date`)}
                  </p>
                </div>
                <button
                  onClick={closeProjectDialog}
                  className="flex-shrink-0 p-1.5 sm:p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors ml-2"
                >
                  <span className="sr-only">Close</span>
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Content */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-5 p-3 sm:p-4 lg:p-5 overflow-y-auto sm:overflow-y-auto lg:overflow-visible max-h-[calc(95vh-120px)] sm:max-h-[calc(90vh-140px)] lg:max-h-none">
                {/* Main Image - Smaller to prevent scrolling */}
                <div className="lg:col-span-2 order-1 lg:order-1">
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <picture className="w-full h-full">
                      {/* Mobile - smaller image for better performance */}
                      <source
                        media="(max-width: 640px)"
                        srcSet={selectedProject.images[projectImageIndex]}
                      />
                      {/* Tablet - medium image */}
                      <source
                        media="(max-width: 1024px)"
                        srcSet={selectedProject.images[projectImageIndex]}
                      />
                      {/* Desktop - full resolution */}
                      <Image
                        src={selectedProject.images[projectImageIndex]}
                        alt={`${selectedProject.title} - Image ${projectImageIndex + 1}`}
                        width={800}
                        height={600}
                        className="w-full h-full object-cover sm:object-contain"
                        loading="lazy"
                      />
                    </picture>
                    
                    {/* Navigation Arrows - Larger and more visible */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button
                          onClick={prevProjectImage}
                          className="absolute left-2 sm:left-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/70 hover:bg-black/90 text-white rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                        >
                          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                        <button
                          onClick={nextProjectImage}
                          className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 p-2 sm:p-3 bg-black/70 hover:bg-black/90 text-white rounded-full transition-all duration-300 shadow-lg hover:scale-110"
                        >
                          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
                        </button>
                      </>
                    )}

                    {/* Image Counter - More prominent */}
                    <div className="absolute bottom-2 sm:bottom-3 right-2 sm:right-3 bg-black/80 text-white px-3 py-1.5 rounded-full text-sm font-medium">
                      {projectImageIndex + 1} / {selectedProject.images.length}
                    </div>
                  </div>
                  
                </div>

                {/* Project Details */}
                <div className="space-y-4 sm:space-y-5 lg:space-y-4 order-2 lg:order-2">
                  <div>
                    <Badge className="bg-yellow-500 text-black mb-2 sm:mb-3 text-xs sm:text-sm">
                      {selectedProject.category}
                    </Badge>
                    <h4 className="font-bold text-base sm:text-lg text-gray-900 dark:text-white mb-2">
                      {t('portfolio.projectDetails')}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm leading-relaxed">
                      {t(`portfolio.projects.${selectedProject.id}.description`)}
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{t('portfolio.date')}</p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{t(`portfolio.projects.${selectedProject.id}.date`)}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 dark:text-green-400" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{t('portfolio.photosCount')}</p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">{selectedProject.images.length} images</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <div className="w-6 h-6 sm:w-7 sm:h-7 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                        <span className="text-purple-600 dark:text-purple-400 text-xs sm:text-sm font-bold">C</span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-900 dark:text-white">{t('portfolio.client')}</p>
                        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">{selectedProject.client}</p>
                      </div>
                    </div>
                  </div>
                 {/* Thumbnail Navigation - Larger and easier to click */}
                 {selectedProject.images.length > 1 && (
                    <div className="flex gap-2 sm:gap-3 mt-3 sm:mt-4 overflow-x-auto pb-2 scrollbar-hide">
                      {selectedProject.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setProjectImageIndex(index)}
                          className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 hover:scale-105 ${
                            index === projectImageIndex
                              ? 'border-yellow-500 opacity-100 shadow-lg'
                              : 'border-gray-300 dark:border-gray-600 opacity-70 hover:opacity-100'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="pt-3 sm:pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      onClick={closeProjectDialog}
                      className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 text-sm sm:text-base"
                    >
                      {t('portfolio.closeGallery')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Gallery Section */}
      <section
        id="gallery"
        className="px-4 sm:px-6 py-12 sm:py-16 bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              {t('gallery.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              {t('gallery.subtitle')}
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="aspect-square rounded-lg" />
              ))}
            </div>
          ) : photos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {photos.map((photo) => (
                <div
                  key={photo._id}
                  className="group relative aspect-square overflow-hidden rounded-lg cursor-pointer bg-gray-200 dark:bg-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                  onClick={() => setSelectedPhoto(photo)}
                >
                  <Image
                    src={photo.imageUrl}
                    alt={photo.title}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={(e) => {
                      console.error('❌ Image failed to load:', photo.imageUrl);
                      // Show a fallback or error state
                      e.currentTarget.style.display = 'none';
                      // Add a fallback div
                      const fallbackDiv = document.createElement('div');
                      fallbackDiv.className = 'w-full h-full flex items-center justify-center bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400';
                      fallbackDiv.innerHTML = `
                        <div class="text-center">
                          <div class="text-2xl mb-2">📸</div>
                          <div class="text-sm font-medium">${photo.title}</div>
                          <div class="text-xs opacity-75">Image unavailable</div>
                        </div>
                      `;
                      e.currentTarget.parentNode?.appendChild(fallbackDiv);
                    }}
                    onLoad={() => {
                      // Image loaded successfully
                    }}
                    unoptimized={true}
                  />
                  
                  {/* Enhanced overlay with better typography and design */}
                  <div className="absolute inset-0 flex items-end opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-500 ease-out">
                    <div className="w-full p-4 sm:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
                      {/* Category badge */}
                      <div className="inline-block px-2 sm:px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full mb-2 sm:mb-3 border border-white/30">
                        <span className="text-xs font-medium text-white uppercase tracking-wider">
                          {photo.category}
                        </span>
                      </div>
                      
                      {/* Photo title */}
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 sm:mb-2 leading-tight drop-shadow-lg">
                        {photo.title}
                      </h3>
                      
                      {/* Optional description or additional info */}
                      {photo.description && (
                        <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-2">
                          {photo.description}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Subtle overlay that's always visible on mobile, hover on desktop */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📸</div>
              <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                {t('gallery.noPhotosAvailable')}
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">
                {t('gallery.noPhotosText')}
              </p>
              <button 
                onClick={() => window.location.reload()} 
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg transition-colors"
              >
                {t('common.tryAgain')}
              </button>
            </div>
          )}
        </div>

        {/* Photo Modal */}
        <Dialog
          open={!!selectedPhoto}
          onOpenChange={() => setSelectedPhoto(null)}
        >
          {selectedPhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-90">
              <div className="relative w-full max-w-4xl aspect-auto">
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute -top-10 right-0 text-white hover:text-gray-300"
                >
                  {t('common.close')}
                </button>
                <Image
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  width={800}
                  height={600}
                  className="w-full h-full object-contain"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {selectedPhoto.title}
                  </h3>
                  <p className="text-gray-300">{selectedPhoto.description}</p>
                </div>
              </div>
            </div>
          )}
        </Dialog>
      </section>
      {/* FAQ Section */}
      <section
        id="faq"
        className="px-4 sm:px-6 py-8 sm:py-12 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">
              {t('faq.title')}
            </h2>
            <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
              {t('faq.subtitle')}
            </p>
          </div>

          <div className="grid gap-3">
            <Accordion type="single" collapsible className="space-y-3">
              <AccordionItem 
                value="item-1" 
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline text-sm py-4 px-4 font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <Camera className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span>{t('faq.questions.services.question')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 text-sm px-4 pb-4">
                  <div className="pl-8">
                    {t('faq.questions.services.answer')}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-2" 
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline text-sm py-4 px-4 font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <Calendar className="w-3 h-3 text-green-600 dark:text-green-400" />
                    </div>
                    <span>{t('faq.questions.booking.question')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 text-sm px-4 pb-4">
                  <div className="pl-8">
                    {t('faq.questions.booking.answer')}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-3" 
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline text-sm py-4 px-4 font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                      <Settings className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                    </div>
                    <span>{t('faq.questions.process.question')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 text-sm px-4 pb-4">
                  <div className="pl-8">
                    {t('faq.questions.process.answer')}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-4" 
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline text-sm py-4 px-4 font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <Zap className="w-3 h-3 text-orange-600 dark:text-orange-400" />
                    </div>
                    <span>{t('faq.questions.equipment.question')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 text-sm px-4 pb-4">
                  <div className="pl-8">
                    {t('faq.questions.equipment.answer')}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem 
                value="item-5" 
                className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm"
              >
                <AccordionTrigger className="text-left hover:no-underline text-sm py-4 px-4 font-medium text-gray-900 dark:text-white">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-yellow-100 dark:bg-yellow-900/30 rounded-full flex items-center justify-center">
                      <MapPin className="w-3 h-3 text-yellow-600 dark:text-yellow-400" />
                    </div>
                    <span>{t('faq.questions.locations.question')}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 dark:text-gray-300 text-sm px-4 pb-4">
                  <div className="pl-8">
                    {t('faq.questions.locations.answer')}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>

          {/* Compact Contact CTA */}
          <div className="mt-6 text-center">
            <div className="bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg p-4 text-white">
              <h3 className="text-lg font-bold mb-2">{t('faq.needMoreInfo')}</h3>
              <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
                <a 
                  href="#contact"
                  className="flex items-center space-x-2 bg-white text-yellow-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  <Phone className="w-3 h-3" />
                  <span>{t('faq.call')}</span>
                </a>
                <a 
                  href="#contact"
                  className="flex items-center space-x-2 bg-white text-yellow-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors"
                >
                  <Mail className="w-3 h-3" />
                  <span>{t('faq.email')}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Preview Section */}
      <section className="px-4 sm:px-6 py-12 rounded-t-full sm:py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-500/10 rounded-full mb-6">
              <svg className="w-8 h-8 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('testimonials.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              {t('testimonials.subtitle')}
            </p>
            
            {/* Call to Action */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
              <Link href="/testimonials">
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                  </svg>
                  {t('testimonials.shareExperience')}
                </Button>
              </Link>
              <Link href="/testimonials">
                <Button 
                  variant="outline"
                  className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M15.707 15.707a1 1 0 01-1.414 0l-5-5a1 1 0 010-1.414l5-5a1 1 0 111.414 1.414L11.414 9H17a1 1 0 110 2h-5.586l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  {t('testimonials.viewAllTestimonials')}
                </Button>
              </Link>
            </div>
          </div>
          
          {/* Testimonials Preview */}
          
           <TestimonialsShowcase variant="carousel" maxItems={10} className="relative overflow-hidden"/>
          
          {/* View All CTA */}
          <div className="text-center mt-4">
            <Link href="/testimonials">
              <Button 
                variant="outline"
                className="border-2 border-yellow-500 text-yellow-500 hover:bg-yellow-500 hover:text-black font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:scale-105"
              >
                {t('testimonials.viewAllAndSubmit')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section
        id="contact"
        className="px-4 sm:px-6 py-12 sm:py-16 bg-white dark:bg-black"
      >
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('contact.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              {t('contact.subtitle')}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
            {/* Contact Form */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 rounded-xl p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t('contact.sendMessage')}
              </h3>
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.firstName')} *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                      placeholder="Dux"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      {t('contact.lastName')} *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                      placeholder="dudu"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.emailAddress')} *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    placeholder="duxforreally@gmail.com"
                  />
                </div>

                <div>
                  <label className="block text-text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.phoneNumber')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                    placeholder="+250786885185"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.serviceType')} *
                  </label>
                  <select
                    name="serviceType"
                    value={formData.serviceType}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                  >
                    <option value="">{t('contact.selectService')}</option>
                    <option value="Wedding Photography">{t('contact.weddingPhotography')}</option>
                    <option value="Portrait Photography">{t('contact.portraitPhotography')}</option>
                    <option value="Event Photography">{t('contact.eventPhotography')}</option>
                    <option value="Commercial Photography">{t('contact.commercialPhotography')}</option>
                    <option value="Food Photography">{t('contact.foodPhotography')}</option>
                    <option value="Landscape Photography">{t('contact.landscapePhotography')}</option>
                    <option value="Other">{t('contact.other')}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.eventDate')}
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {t('contact.message')} *
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all duration-300 resize-none"
                    placeholder={t('contact.tellUsAbout')}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold py-3 px-6 rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isSubmitting ? t('contact.sending') : t('contact.sendMessageButton')}
                </button>
              </form>
            </div>

            {/* Quick Contact Options */}
            <div className="space-y-6">
              {/* WhatsApp Contact */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-800/20 rounded-xl p-6 sm:p-8 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-2xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t('contact.whatsappBooking')}
                    </h3>
                    <p className="text-green-600 dark:text-green-400 text-sm">
                      {t('contact.instantResponse')}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('contact.whatsappText')}
                </p>
                <a
                  href="https://wa.me/+250786885185?text=Hi%20Teoflys!%20I'm%20interested%20in%20booking%20a%20photography%20session.%20Could%20you%20please%20share%20more%20details%20about%20your%20services%20and%20availability?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <span className="text-lg">💬</span>
                  {t('contact.chatOnWhatsapp')}
                </a>
              </div>

              {/* Email Contact */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-800/20 rounded-xl p-6 sm:p-8 border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t('contact.emailBooking')}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 text-sm">
                      {t('contact.detailedProposals')}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {t('contact.emailText')}
                </p>
                <a
                  href="mailto:helloteofly@gmail.com?subject=Photography Booking Inquiry&body=Hi Teoflys,%0D%0A%0D%0AI'm interested in booking a photography session. Here are my details:%0D%0A%0D%0AEvent Type: %0D%0ADate: %0D%0ALocation: %0D%0ABudget: %0D%0ASpecial Requirements: %0D%0A%0D%0APlease let me know your availability and pricing.%0D%0A%0D%0AThank you!"
                  className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  {t('contact.sendEmail')}
                </a>
              </div>

              {/* Phone Contact */}
              <div className="bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/20 dark:to-violet-800/20 rounded-xl p-6 sm:p-8 border border-purple-200 dark:border-purple-800">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {t('contact.callDirectly')}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 text-sm">
                      {t('contact.personalConsultation')}
                    </p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('contact.callText')}
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:+1234567890"
                    className="inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
                  >
                    <Phone className="w-5 h-5" />
                    +1 (234) 567-890
                  </a>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {t('business.available')}: Mon-Fri 9AM-6PM EST
                  </p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-yellow-900/20 dark:to-amber-800/20 rounded-xl p-6 border border-yellow-200 dark:border-yellow-800">
                <h4 className="font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                  <Clock className="w-5 h-5 text-yellow-500" />
                  {t('business.hours')}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t('business.mondayFriday')}</span>
                    <span className="text-gray-900 dark:text-white font-medium">9:00 AM - 6:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t('business.saturday')}</span>
                    <span className="text-gray-900 dark:text-white font-medium">10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">{t('business.sunday')}</span>
                    <span className="text-gray-900 dark:text-white font-medium">{t('business.byAppointment')}</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                  <p className="text-xs text-yellow-800 dark:text-yellow-200">
                    {t('business.tip')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      
      {/* Footer */}
      <footer className="relative px-4 sm:px-6 py-12 sm:py-16 border-t border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-black dark:to-gray-900 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full animate-pulse"></div>
          <div className="absolute top-20 right-20 w-16 h-16 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12 mb-8 sm:mb-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent animate-pulse">
                  TEOS.VISUAL
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full animate-ping"></div>
                  <span className="text-sm sm:text-base font-medium text-gray-600 dark:text-gray-400">
                    {t('footer.photographyStudio')}
                  </span>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mb-6 max-w-md leading-relaxed">
                {t('footer.description')}
              </p>
              <div className="flex items-center gap-4">
                <a href="#contact">
                <button className="group relative px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-medium text-sm sm:text-base overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg">
                  <span className="relative z-10">{t('footer.workTogether')}</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button></a>
                <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
                  <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm">{t('footer.availableForBookings')}</span>
                </div>
              </div>
            </div>

            {/* Services Section */}
            <div className="group">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-lg sm:text-xl relative">
                {t('footer.services')}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
              </h4>
              <ul className="space-y-3">
                {[
                  { name: 'WEDDING', link: '/services/wedding' },
                  { name: 'PORTRAIT', link: '/services/portrait' },
                  { name: 'EVENTS', link: '/services/events' },
                  { name: 'COMMERCIAL', link: '/services/commercial' },
                  { name: 'FOOD', link: '/services/food' },
                  { name: 'LANDSCAPE', link: '/services/landscape' }
                ].map((service) => (
                  <li key={service.name} className="group/item">
                    <a 
                      href={service.link} 
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-all duration-300 text-sm sm:text-base group-hover/item:translate-x-1"
                    >
                      <div className="w-1 h-1 bg-yellow-500 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                      {service.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Section */}
            <div className="group">
              <h4 className="font-bold text-gray-900 dark:text-white mb-4 sm:mb-6 text-lg sm:text-xl relative">
                COMPANY
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-orange-500 group-hover:w-full transition-all duration-300"></div>
              </h4>
              <ul className="space-y-3">
                {['ABOUT', 'PORTFOLIO', 'CONTACT', 'BLOG', 'TESTIMONIALS', 'PRICING'].map((item) => (
                  <li key={item} className="group/item">
                    <a href="#" className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-yellow-500 dark:hover:text-yellow-400 transition-all duration-300 text-sm sm:text-base group-hover/item:translate-x-1">
                      <div className="w-1 h-1 bg-yellow-500 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity duration-300"></div>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact & Social Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8 sm:mb-12">
            {/* Contact Info */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl mb-4">GET IN TOUCH</h4>
              <div className="space-y-3">
                <a 
                  href="mailto:theonyn11@gmail.com"
                  className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Email</p>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">theonyn11@gmail.com</p>
                  </div>
                </a>
                <a 
                  href="tel:+212620487204"
                  className="flex items-center gap-3 group hover:scale-105 transition-transform duration-300"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium hover:text-yellow-500 dark:hover:text-yellow-400 transition-colors">+212 620-487204</p>
                  </div>
                </a>
                <div className="flex items-center gap-3 group">
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Location</p>
                    <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">Marroco, Rabat</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="space-y-4">
              <h4 className="font-bold text-gray-900 dark:text-white text-lg sm:text-xl mb-4">FOLLOW US</h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2 sm:gap-3">
                {[
                  { 
                    icon: FaFacebook, 
                    name: 'Facebook', 
                    color: 'from-blue-600 to-blue-700',
                    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                    borderColor: 'border-blue-200 dark:border-blue-800',
                    textColor: 'text-blue-600 dark:text-blue-400',
                    url: 'https://www.facebook.com/teoflyphotography'
                  },
                  { 
                    icon: SiTiktok, 
                    name: 'TikTok', 
                    color: 'from-pink-500 to-purple-600',
                    bgColor: 'bg-pink-50 dark:bg-pink-900/20',
                    borderColor: 'border-pink-200 dark:border-pink-800',
                    textColor: 'text-pink-600 dark:text-pink-400',
                    url: 'https://www.tiktok.com/@teoflyphotography'
                  },
                  { 
                    icon: FaLinkedin, 
                    name: 'LinkedIn', 
                    color: 'from-blue-700 to-blue-800',
                    bgColor: 'bg-blue-50 dark:bg-blue-900/20',
                    borderColor: 'border-blue-200 dark:border-blue-800',
                    textColor: 'text-blue-600 dark:text-blue-400',
                    url: 'https://www.linkedin.com/company/teoflyphotography'
                  },
                  { 
                    icon: InstagramIcon, 
                    name: 'Instagram', 
                    color: 'from-pink-500 to-purple-500',
                    bgColor: 'bg-purple-50 dark:bg-purple-900/20',
                    borderColor: 'border-purple-200 dark:border-purple-800',
                    textColor: 'text-purple-600 dark:text-purple-400',
                    url: 'https://www.instagram.com/teoflyphotography'
                  },
                  { 
                    icon: BsSnapchat, 
                    name: 'Snapchat', 
                    color: 'from-yellow-400 to-orange-500',
                    bgColor: 'bg-yellow-50 dark:bg-yellow-900/20',
                    borderColor: 'border-yellow-200 dark:border-yellow-800',
                    textColor: 'text-yellow-600 dark:text-yellow-400',
                    url: 'https://www.snapchat.com/add/teoflyphotography'
                  },
                  { 
                    icon: YoutubeIcon, 
                    name: 'YouTube', 
                    color: 'from-red-600 to-red-700',
                    bgColor: 'bg-red-50 dark:bg-red-900/20',
                    borderColor: 'border-red-200 dark:border-red-800',
                    textColor: 'text-red-600 dark:text-red-400',
                    url: 'https://www.youtube.com/@teoflyphotography'
                  }
                ].map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group relative overflow-hidden ${social.bgColor} border ${social.borderColor} rounded-lg p-2 sm:p-3 hover:shadow-md transition-all duration-300 hover:scale-105 hover:-translate-y-1`}
                    aria-label={`Follow us on ${social.name}`}
                  >
                    {/* Gradient Overlay on Hover */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                    
                    {/* Content */}
                    <div className="relative z-10 flex flex-col items-center text-center space-y-2">
                      <div className={`w-8 h-8 sm:w-10 sm:h-10 ${social.bgColor} rounded-full flex items-center justify-center group-hover:bg-gradient-to-r ${social.color} transition-all duration-300`}>
                        <social.icon className={`w-4 h-4 sm:w-5 sm:h-5 ${social.textColor} group-hover:text-white transition-colors duration-300`} />
                      </div>
                      
                      <div className="space-y-0.5">
                        <h5 className="font-medium text-gray-900 dark:text-white group-hover:text-white transition-colors duration-300 text-xs sm:text-sm">
                          {social.name}
                        </h5>
                        <p className="text-xs text-gray-500 dark:text-gray-400 group-hover:text-white/80 transition-colors duration-300">
                          Follow
                        </p>
                      </div>
                    </div>
                    
                    {/* Animated Border */}
                    <div className={`absolute inset-0 rounded-lg border ${social.borderColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-8 border-t border-gray-200 dark:border-gray-700 gap-4">
            <div className="flex items-center gap-4">
              <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm text-center sm:text-left">
                © 2025 Teos.visual Photography. All rights reserved.
              </p>
              {/* <div className="flex items-center gap-2">
                <div className="w-1 h-1 bg-yellow-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-gray-400">Made by dux.io</span>
              </div> */}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-400">Powered by</span>
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <a href="https://duxthedream.netlify.app/" target="_blank" rel="noopener noreferrer">
                <span className="text-xs font-medium text-gray-700 dark:text-gray-300">Dux-dudu</span></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-50 right-4 z-50 w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 ${
          showScrollToTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-6 h-6 mx-auto" />
      </button>

      {/* Admin Dashboard Link (visible only if accessToken exists) */}
      {/* {typeof window !== 'undefined' && localStorage.getItem('accessToken') && ( */}
        <div className="fixed bottom-4 left-4 z-50">
          <Link 
            href="/admin" 
            className="flex items-center gap-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <span className="hidden sm:inline">Teos</span>
            <span className="sm:hidden">T</span>
          </Link>
        </div>
      {/* )} */}
    </div>
  );
}
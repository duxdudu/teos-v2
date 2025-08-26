"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import axios from "axios";

interface Testimonial {
  _id: string;
  name: string;
  rating: number;
  message: string;
  serviceType: string;
  createdAt: string;
  adminNotes?: string;
}

const serviceTypeLabels: { [key: string]: string } = {
  wedding: 'Wedding Photography',
  portrait: 'Portrait Photography',
  landscape: 'Landscape Photography',
  food: 'Food Photography',
  events: 'Event Photography',
  commercial: 'Commercial Photography',
  other: 'Other Services'
};

const serviceTypeColors: { [key: string]: string } = {
  wedding: 'bg-pink-100 text-pink-700 border-pink-300 dark:bg-pink-500/20 dark:text-pink-300 dark:border-pink-500/30',
  portrait: 'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-500/20 dark:text-blue-300 dark:border-blue-500/30',
  landscape: 'bg-green-100 text-green-700 border-green-300 dark:bg-green-500/20 dark:text-green-300 dark:border-green-500/30',
  food: 'bg-orange-100 text-orange-700 border-orange-300 dark:bg-orange-500/20 dark:text-orange-300 dark:border-orange-500/30',
  events: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30',
  commercial: 'bg-indigo-100 text-indigo-700 border-indigo-300 dark:bg-indigo-500/20 dark:text-indigo-300 dark:border-indigo-500/30',
  other: 'bg-gray-100 text-gray-700 border-gray-300 dark:bg-gray-500/20 dark:text-gray-300 dark:border-gray-500/30'
};

interface TestimonialsCarouselProps {
  maxItems?: number;
  className?: string;
}

export default function TestimonialsCarousel({ maxItems = 10, className = "" }: TestimonialsCarouselProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchTestimonials = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await axios.get(`/api/testimonials/published?limit=${maxItems}`);
      setTestimonials(response.data.testimonials);
      
    } catch (error: unknown) {
      setError('Failed to load testimonials');
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  }, [maxItems]);

  useEffect(() => {
    fetchTestimonials();
  }, [maxItems, fetchTestimonials]);

  useEffect(() => {
    if (!isPlaying || testimonials.length === 0 || isHovered) return;

    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, testimonials.length, isHovered]);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => {
      const starNumber = index + 1;
      const isFilled = starNumber <= rating;
      
      return (
        <Star
          key={starNumber}
          className={`w-4 h-4 ${
            isFilled ? 'text-yellow-400 fill-current' : 'text-gray-300'
          }`}
        />
      );
    });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto px-3 sm:px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Client Testimonials</h2>
          <p className="text-gray-600 dark:text-gray-300">Loading testimonials...</p>
        </div>
        <div className="relative">
          <Card className="bg-gray-100/80 dark:bg-white/5 backdrop-blur-sm border-gray-200 dark:border-white/10 animate-pulse">
            <CardContent className="p-8">
              <div className="h-32 bg-gray-200 dark:bg-white/10 rounded mb-4"></div>
              <div className="h-4 bg-gray-200 dark:bg-white/10 rounded w-3/4 mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error || testimonials.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Client Testimonials</h2>
          <p className="text-gray-600 dark:text-gray-300">
            {error || 'No testimonials available at the moment.'}
          </p>
        </div>
      </div>
    );
  }

  const currentTestimonial = testimonials[currentIndex];

  return (
    <div className={`w-full max-w-4xl mx-auto px-4 ${className}`}>
      {/* <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-4">What Our Clients Say</h2>
        <p className="text-gray-300">
          Real experiences from our valued clients across different photography services
        </p>
      </div> */}

      {/* Carousel Container */}
      <div 
        className="relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Testimonial Card */}
        <Card className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm border-yellow-500/20 hover:border-yellow-500/30 transition-all duration-500 hover:scale-[1.02] dark:bg-gradient-to-r dark:from-yellow-500/20 dark:to-orange-500/20">
          <CardContent className="p-5 sm:p-8">
            <div className="text-center">
              {/* Rating */}
              <div className="flex justify-center mb-6">
                {renderStars(currentTestimonial.rating)}
              </div>
              
              {/* Quote */}
                              <blockquote className="text-base sm:text-xl text-gray-900 dark:text-white italic mb-6 leading-relaxed max-w-3xl mx-auto">&ldquo;{currentTestimonial.message}&rdquo;</blockquote>

              {currentTestimonial.adminNotes && (
                <div className="mb-6 max-w-2xl mx-auto p-4 bg-gray-100/80 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg">
                  <div className="text-xs text-gray-600 dark:text-gray-300 mb-1">Reply from studio</div>
                  <p className="text-sm text-gray-700 dark:text-gray-200">{currentTestimonial.adminNotes}</p>
                </div>
              )}
              
              {/* Author Info */}
              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-500/20 rounded-full flex items-center justify-center">
                  <span className="text-yellow-700 dark:text-yellow-400 font-bold text-2xl">
                    {currentTestimonial.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div className="text-left">
                  <h4 className="font-semibold text-gray-900 dark:text-white text-lg">{currentTestimonial.name}</h4>
                  <div className="flex items-center gap-3">
                    <Badge className={`${serviceTypeColors[currentTestimonial.serviceType]} border`}>
                      {serviceTypeLabels[currentTestimonial.serviceType]}
                    </Badge>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {formatDate(currentTestimonial.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Controls */}
        <div className="absolute top-1/2 -translate-y-1/2 left-2 sm:left-4">
          <Button
            onClick={goToPrevious}
            variant="outline"
            size="sm"
            className="w-10 h-10 p-0 bg-gray-100/80 dark:bg-white/10 hover:bg-gray-200/80 dark:hover:bg-white/20 text-gray-700 dark:text-white border-gray-300 dark:border-white/20 rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
        </div>

        <div className="absolute top-1/2 -translate-y-1/2 right-2 sm:right-4">
          <Button
            onClick={goToNext}
            variant="outline"
            size="sm"
            className="w-10 h-10 p-0 bg-gray-100/80 dark:bg-white/10 hover:bg-gray-200/80 dark:hover:bg-white/20 text-gray-700 dark:text-white border-gray-300 dark:border-white/20 rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Play/Pause Control */}
        <div className="absolute top-4 right-4">
          <Button
            onClick={togglePlayPause}
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 bg-gray-100/80 dark:bg-white/10 hover:bg-gray-200/80 dark:hover:bg-white/20 text-gray-700 dark:text-white border-gray-300 dark:border-white/20 rounded-full"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
        </div>

        {/* Progress Indicator */}
        <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2">
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-yellow-500 w-6' 
                    : 'bg-gray-400 dark:bg-white/30 hover:bg-gray-500 dark:hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Testimonial Counter */}
        <div className="absolute bottom-4 right-4">
          <span className="text-sm text-gray-600 dark:text-white/60">
            {currentIndex + 1} / {testimonials.length}
          </span>
        </div>
      </div>

      {/* Thumbnail Navigation */}
      {testimonials.length > 1 && (
        <div className="mt-8">
          <div className="flex justify-center gap-3 overflow-x-auto pb-2">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial._id}
                onClick={() => goToSlide(index)}
                className={`flex-shrink-0 p-3 rounded-lg border-2 transition-all duration-300 ${
                  index === currentIndex
                    ? 'border-yellow-500 bg-yellow-100 dark:border-yellow-400 dark:bg-yellow-500/20'
                    : 'border-gray-300 dark:border-white/20 bg-gray-50 dark:bg-white/5 hover:border-gray-400 dark:hover:border-white/40'
                }`}
              >
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {renderStars(testimonial.rating)}
                  </div>
                  <p className="text-xs text-gray-900 dark:text-white font-medium mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {serviceTypeLabels[testimonial.serviceType]}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

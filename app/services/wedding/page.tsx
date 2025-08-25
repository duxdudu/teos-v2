"use client";

import { ArrowLeft, Camera, Heart, Phone, Mail, Star, CheckCircle, Diamond, Users } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WeddingServices() {
  const services = [
    {
      icon: Diamond,
      title: "Ceremony Coverage",
      description: "Complete coverage of your wedding ceremony",
      features: ["Getting ready shots", "Ceremony moments", "Family portraits", "Reception highlights"]
    },
    {
      icon: Heart,
      title: "Engagement Sessions",
      description: "Beautiful engagement photography sessions",
      features: ["Outdoor locations", "Studio sessions", "Multiple outfits", "Digital gallery"]
    },
    {
      icon: Users,
      title: "Wedding Packages",
      description: "Comprehensive wedding photography packages",
      features: ["Full day coverage", "Second photographer", "Wedding album", "Online gallery"]
    }
  ];

  const portfolioImages = [
    "/wedding1.jpg",
    "/wedding2.jpg", 
    "/wedding3.jpg",
    "/wedding4.jpg",
    "/wedding5.jpg",
    "/wedding6.jpg"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center space-x-2 text-gray-600 hover:text-pink-600 transition-colors">
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Home</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Camera className="w-6 h-6 text-pink-500" />
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Wedding Photography</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/wedding1.jpg"
            alt="Wedding Photography"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Heart className="w-12 h-12 text-pink-400" />
              <h1 className="text-5xl sm:text-7xl font-bold">
                Wedding Photography
              </h1>
            </div>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              Capture your special day with our professional wedding photography services. 
              From intimate ceremonies to grand celebrations, we create timeless memories.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="tel:+212123456789"
                className="flex items-center space-x-2 bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                <span>Call Now</span>
              </a>
              <a 
                href="mailto:teofly@gmail.com"
                className="flex items-center space-x-2 bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                <span>Email Us</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Wedding Photography Services
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Professional wedding photography services that capture every precious moment of your special day
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-rose-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-center">
                  {service.description}
                </p>
                <ul className="space-y-3">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-20 bg-pink-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Wedding Photography Portfolio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Explore our beautiful wedding photography collection
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioImages.map((image, index) => (
              <div key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={image}
                    alt={`Wedding Photography ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg p-4 text-center">
                      <Heart className="w-8 h-8 text-pink-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        View Details
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our Wedding Photography?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Wedding Expertise
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Years of experience capturing beautiful wedding moments and emotions.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-rose-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Professional Equipment
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      High-quality cameras and lenses for stunning wedding photography.
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      Personalized Service
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Tailored packages and personalized attention for your special day.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/wedding2.jpg"
                  alt="Professional Wedding Photography"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-pink-500 to-rose-500">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Capture Your Special Day?
          </h2>
          <p className="text-xl text-pink-100 mb-8">
            Let&apos;s create beautiful memories that will last a lifetime
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="tel:+212123456789"
              className="flex items-center space-x-2 bg-white text-pink-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </a>
            <a 
              href="mailto:teofly@gmail.com"
              className="flex items-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              <span>Email Us</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
} 
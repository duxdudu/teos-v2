"use client";

import { ArrowLeft, Camera, Building2, Phone, Mail, Star, CheckCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import Image from "next/image";
import LightboxDialog from "@/components/LightboxDialog";
import React from "react";

export default function ArchitecturalServices() {
  const { t } = useTranslation();
  const services = [
    {
      icon: Building2,
      title: t('servicesPages.architectural.cards.exterior.title'),
      description: t('servicesPages.architectural.cards.exterior.description'),
      features: [
        t('servicesPages.architectural.cards.exterior.features.0'),
        t('servicesPages.architectural.cards.exterior.features.1'),
        t('servicesPages.architectural.cards.exterior.features.2'),
        t('servicesPages.architectural.cards.exterior.features.3')
      ]
    },
    {
      icon: Camera,
      title: t('servicesPages.architectural.cards.interior.title'),
      description: t('servicesPages.architectural.cards.interior.description'),
      features: [
        t('servicesPages.architectural.cards.interior.features.0'),
        t('servicesPages.architectural.cards.interior.features.1'),
        t('servicesPages.architectural.cards.interior.features.2'),
        t('servicesPages.architectural.cards.interior.features.3')
      ]
    },
    {
      icon: Building2,
      title: t('servicesPages.architectural.cards.realEstate.title'),
      description: t('servicesPages.architectural.cards.realEstate.description'),
      features: [
        t('servicesPages.architectural.cards.realEstate.features.0'),
        t('servicesPages.architectural.cards.realEstate.features.1'),
        t('servicesPages.architectural.cards.realEstate.features.2'),
        t('servicesPages.architectural.cards.realEstate.features.3')
      ]
    }
  ];

  const portfolioImages = [
    "/Commercial1.jpg",
    "/Commercial2.jpg", 
    "/Commercial3.jpg",
    "/Commercial4.jpg",
    "/Commercial5.jpg",
    "/Commercial6.jpg"
  ];

  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <header className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 py-3 sm:py-0 min-h-16">
            <Link href="/" className="flex items-center space-x-1.5 sm:space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
              <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="font-medium">{t('servicesPages.common.back')}</span>
            </Link>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <Camera className="w-5 h-5 sm:w-6 sm:h-6 text-purple-500" />
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">{t('servicesPages.architectural.title')}</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/Commercial1.jpg"
            alt="Architectural Photography"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="text-center text-white max-w-4xl mx-auto px-4">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Building2 className="w-12 h-12 text-purple-400" />
              <h1 className="text-5xl sm:text-7xl font-bold">
                {t('servicesPages.architectural.title')}
              </h1>
            </div>
            <p className="text-xl sm:text-2xl text-gray-200 mb-8 max-w-3xl mx-auto">
              {t('servicesPages.architectural.heroSubtitle')}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
              <a 
                href="tel:+212123456789"
                className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                <span>{t('servicesPages.common.callNow')}</span>
              </a>
              <a 
                href="mailto:teofly@gmail.com"
                className="flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                <span>{t('servicesPages.common.emailUs')}</span>
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
              {t('servicesPages.architectural.servicesHeading')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              {t('servicesPages.architectural.servicesSubheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
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
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('servicesPages.architectural.portfolioHeading')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              {t('servicesPages.architectural.portfolioSubheading')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioImages.map((image, index) => (
              <button onClick={() => { setLightboxIndex(index); setIsLightboxOpen(true); }} key={index} className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={image}
                    alt={`Architectural Photography ${index + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/30 lg:bg-black/0 lg:group-hover:bg-black/30 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 dark:bg-gray-900/90 rounded-lg p-4 text-center">
                      <Camera className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">
                        {t('servicesPages.common.viewDetails')}
                      </p>
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <LightboxDialog
        images={portfolioImages.map((src, i) => ({ src, alt: `Architectural Photography ${i + 1}` }))}
        isOpen={isLightboxOpen}
        startIndex={lightboxIndex}
        onClose={() => setIsLightboxOpen(false)}
        onNavigate={(i) => setLightboxIndex(i)}
      />

      {/* Why Choose Us */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                {t('servicesPages.architectural.whyHeading')}
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Star className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('servicesPages.architectural.why.items.0.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('servicesPages.architectural.why.items.0.desc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Camera className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('servicesPages.architectural.why.items.1.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('servicesPages.architectural.why.items.1.desc')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {t('servicesPages.architectural.why.items.2.title')}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('servicesPages.architectural.why.items.2.desc')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="/Commercial2.jpg"
                  alt="Professional Architectural Photography"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-6">
            {t('servicesPages.architectural.ctaHeading')}
          </h2>
          <p className="text-xl text-purple-100 mb-8">
            {t('servicesPages.architectural.ctaSubheading')}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <a 
              href="tel:+212123456789"
              className="flex items-center space-x-2 bg-white text-purple-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Phone className="w-5 h-5" />
              <span>{t('servicesPages.common.callNow')}</span>
            </a>
            <a 
              href="mailto:teofly@gmail.com"
              className="flex items-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              <span>{t('servicesPages.common.emailUs')}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

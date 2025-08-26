"use client";

import React, { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const languages: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English'
  },
  {
    code: 'fr',
    name: 'French',
    flag: '🇫🇷',
    nativeName: 'Français'
  },
  {
    code: 'es',
    name: 'Spanish',
    flag: '🇪🇸',
    nativeName: 'Español'
  },
  {
    code: 'de',
    name: 'German',
    flag: '🇩🇪',
    nativeName: 'Deutsch'
  }
];

export default function LanguageSwitcher() {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(
    languages.find(lang => lang.code === i18n.language) || languages[0]
  );
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const changeLanguage = (language: Language) => {
    i18n.changeLanguage(language.code);
    setSelectedLanguage(language);
    setIsOpen(false);
    
    // Save to localStorage
    localStorage.setItem('i18nextLng', language.code);
    
    // Update HTML lang attribute
    document.documentElement.lang = language.code;
  };

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || selectedLanguage;

  return (
    <div className="relative" ref={dropdownRef} onKeyDown={handleKeyDown}>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 h-auto text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-yellow-500 dark:hover:text-yellow-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 rounded-lg border border-gray-300 dark:border-gray-600"
        aria-label={t('common.language')}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Globe className="w-4 h-4" />
        <span className="text-lg">{currentLanguage.flag}</span>
        <span className="hidden sm:inline-block">{currentLanguage.nativeName}</span>
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </Button>

      {/* Dropdown */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50 animate-in slide-in-from-top-2 duration-200">
          {languages.map((language) => (
            <button
              key={language.code}
              onClick={() => changeLanguage(language)}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-150 ${
                language.code === currentLanguage.code
                  ? 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
                  : 'text-gray-700 dark:text-gray-300'
              }`}
              aria-label={`${t('common.language')}: ${language.name}`}
            >
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="font-medium text-sm">{language.nativeName}</span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  {language.name}
                </span>
              </div>
              {language.code === currentLanguage.code && (
                <div className="ml-auto w-2 h-2 bg-yellow-500 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

"use client";

import { useState, useRef, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { MessageCircle, X, Send, Bot, Loader2, Phone, Mail } from 'lucide-react';
import Image from 'next/image';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  reactions?: string[];
}

interface AIChatboxProps {
  className?: string;
}

export default function AIChatbox({ }: AIChatboxProps) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Ensure welcome message uses the active language and updates on language change
  useEffect(() => {
    setMessages(prev => {
      const hasWelcome = prev.some(m => m.id === 'welcome');
      if (hasWelcome) {
        return prev.map(m => m.id === 'welcome' ? { ...m, content: t('chat.welcome') } : m);
      }
      return [
        {
          id: 'welcome',
          content: t('chat.welcome'),
          role: 'assistant',
          timestamp: new Date()
        },
        ...prev
      ];
    });
  }, [i18n.language, t]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue.trim(),
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);
    setIsTyping(true);


    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage.content,
          conversationHistory: messages.map(m => ({ role: m.role, content: m.content })),
          lang: i18n.language
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      
      // Simulate typing effect
      setTimeout(() => {
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response || t('chat.genericErrorShort'),
          role: 'assistant',
          timestamp: new Date(),
          reactions: ['👍', '💡', '📸']
        };
        
        setMessages(prev => [...prev, assistantMessage]);
        setIsTyping(false);
        setIsLoading(false);
      }, 1000);

    } catch (error) {
      console.error('AI Chat Error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: t('chat.genericErrorLong'),
        role: 'assistant',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, errorMessage]);
      setIsTyping(false);
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };



  const handleContactAction = (type: 'phone' | 'email') => {
    if (type === 'phone') {
      window.location.href = 'tel:+212 620-487204';
    } else {
      window.location.href = 'mailto:theonyn11@gmail.com';
    }
  };

//   const quickActions = [
//     { text: "Wedding pricing", icon: "💒" },
//     { text: "Portrait sessions", icon: "📸" },
//     { text: "Event coverage", icon: "🎉" },
//     { text: "Photo tips", icon: "💡" },
//     { text: "Commercial rates", icon: "🏢" },
//     { text: "Booking process", icon: "📅" }
//   ];

  return (
    <>
      {/* Floating Chat Button */}
      {/* Help Card */}
      <div className="fixed bottom-16 right-2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-2 max-w-20 animate-bounce">
        <div className="flex items-center gap-1 mb-1">
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 dark:text-gray-400">{t('chat.online')}</span>
        </div>
        <p className="text-xs font-medium text-gray-900 dark:text-gray-100">
          {t('chat.helperCardTitle')}
        </p>
      </div>

      {/* Chat Button */}
      <Button
        onClick={toggleChat}
        className={`fixed bottom-4 right-2 z-50 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 ${
          isOpen ? 'opacity-100 pointer-events-none' : 'opacity-100'
        }`}
        aria-label={t('chat.openButtonAria')}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-400 rounded-full animate-pulse">1</div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
      </Button>

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-14 right-10 z-50 w-80 sm:w-96 h-120 bg-white dark:bg-gray-900 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden animate-in slide-in-from-bottom-2 duration-300">
          {/* Header */}    
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                  <Image 
                    src="/logo1.png" 
                    alt="AI Assistant" 
                    width={25} 
                    height={25} 
                    className="rounded-full"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">{t('chat.title')}</h3>
                  <div className="flex items-center gap-1 text-xs opacity-90">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>{t('chat.online')}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={toggleChat}
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 hover:bg-white/20 text-white"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 h-64 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-br-md'
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 rounded-bl-md'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center overflow-hidden">
                      <Image 
                        src="/logo1.png" 
                        alt="AI Assistant" 
                        width={20} 
                        height={20} 
                        className="rounded-full"
                      />
                    </div>
                    )}
                    <div className="flex-1">
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-1 block">
                        {formatTime(message.timestamp)}
                      </span>
                      {message.reactions && message.role === 'assistant' && (
                        <div className="flex gap-1 mt-2">
                          {message.reactions.map((reaction, index) => (
                            <button
                              key={index}
                              className="text-xs bg-white/20 dark:bg-gray-700/50 rounded-full px-2 py-1 hover:bg-white/30 dark:hover:bg-gray-700/70 transition-colors"
                            >
                              {reaction}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-bl-md px-4 py-2">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-blue-500" />
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {/* {showSuggestions && (
            <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <div className="flex flex-wrap gap-2">
                {quickActions.map((action) => (
                  <Button
                    key={action.text}
                    type="button"
                    variant="outline"
                    size="sm"
                    className="text-xs h-7 px-2 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                    onClick={() => handleQuickAction(action.text)}
                  >
                    <span className="mr-1">{action.icon}</span>
                    {action.text}
                  </Button>
                ))}
              </div>
            </div>
          )} */}

          {/* Contact Actions */}
          <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8 border-gray-300 dark:border-gray-600 hover:bg-green-50 dark:hover:bg-green-900/20"
                onClick={() => handleContactAction('phone')}
              >
                <Phone className="w-3 h-3 mr-1" />
                {t('chat.callUs')}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="flex-1 text-xs h-8 border-gray-300 dark:border-gray-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                onClick={() => handleContactAction('email')}
              >
                <Mail className="w-3 h-3 mr-1" />
                {t('chat.email')}
              </Button>
            </div>
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="flex gap-2">
              <Textarea
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={t('chat.placeholder')}
                className="min-h-[40px] max-h-24 resize-none border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                disabled={isLoading}
              />
              <Button
                type="submit"
                disabled={!inputValue.trim() || isLoading}
                className="px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </Button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

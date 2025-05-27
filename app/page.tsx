"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useWaitlist } from "@/hooks/useWaitlist"
import {
  Mic,
  Brain,
  AudioWaveformIcon as Waveform,
  Headphones,
  CheckCircle,
  Menu,
  X,
  Bell,
  Sparkles,
  ArrowRight,
  Play,
  Volume2,
  Zap,
  Globe,
  Users,
  Star,
  Music,
  AlertCircle,
  WifiOff,
  Loader2,
  Shield,
} from "lucide-react"

interface EmailFormState {
  email: string
  isSubscribed: boolean
  error: string
  successMessage: string
}

export default function ZynvoComingSoon() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [emailForm, setEmailForm] = useState<EmailFormState>({
    email: "",
    isSubscribed: false,
    error: "",
    successMessage: "",
  })

  const { count, addEmail, isLoading, isOnline, hasLoaded, hasPermissionError } = useWaitlist()

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailForm.email || isLoading) return

    // Reset previous states
    setEmailForm((prev) => ({ ...prev, error: "", successMessage: "" }))

    try {
      const result = await addEmail(emailForm.email)

      if (result.success) {
        setEmailForm({
          email: "",
          isSubscribed: true,
          error: "",
          successMessage: result.message,
        })
      } else {
        setEmailForm((prev) => ({
          ...prev,
          error: result.message,
          isSubscribed: false,
        }))
      }
    } catch (error) {
      setEmailForm((prev) => ({
        ...prev,
        error: "Something went wrong. Please try again.",
      }))
    }
  }

  const handleGetNotified = () => {
    const emailSection = document.getElementById("early-access")
    if (emailSection) {
      emailSection.scrollIntoView({ behavior: "smooth" })
      setTimeout(() => {
        const emailInput = document.querySelector('input[type="email"]') as HTMLInputElement
        if (emailInput) {
          emailInput.focus()
        }
      }, 800)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Main content with gradient background */}
      <div className="relative z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-blue-900/20 pointer-events-none z-0" />
        <div className="relative z-10">
          {/* Header */}
          <header
            className={`fixed w-full top-0 z-50 transition-all duration-300 ${
              scrollY > 50 ? "bg-black/90 backdrop-blur-xl border-b border-gray-800" : "bg-transparent"
            }`}
          >
            <div className="container mx-auto px-6 py-4">
              <div className="flex justify-between items-center">
                <div className="text-2xl font-semibold text-white flex items-center">
                  <img 
                    src="/favicon-48.png" 
                    alt="Zynvo Logo" 
                    className="w-8 h-8 mr-3"
                  />
                  Zynvo
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex space-x-8">
                  {[
                    { name: "Experience", id: "experience" },
                    { name: "Technology", id: "technology" },
                    { name: "Early Access", id: "early-access" },
                  ].map((item) => (
                    <button
                      key={item.name}
                      onClick={() => scrollToSection(item.id)}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm font-medium"
                    >
                      {item.name}
                    </button>
                  ))}
                </nav>

                {/* Mobile menu button */}
                <button
                  className="md:hidden p-2 hover:bg-gray-800 rounded-lg transition-colors duration-200"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                  {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>

                <Button
                  onClick={handleGetNotified}
                  className="hidden md:flex bg-white text-black hover:bg-gray-100 font-medium px-6 py-2 rounded-lg transition-all duration-200"
                >
                  Get Early Access
                </Button>
              </div>

              {/* Mobile Navigation */}
              {isMenuOpen && (
                <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
                  <nav className="flex flex-col space-y-3 pt-4">
                    {[
                      { name: "Experience", id: "experience" },
                      { name: "Technology", id: "technology" },
                      { name: "Early Access", id: "early-access" },
                    ].map((item) => (
                      <button
                        key={item.name}
                        onClick={() => scrollToSection(item.id)}
                        className="text-gray-400 hover:text-white transition-colors duration-200 text-left py-2"
                      >
                        {item.name}
                      </button>
                    ))}
                  </nav>
                </div>
              )}
            </div>
          </header>

          {/* Hero Section */}
          <section className="pt-32 pb-24 px-6 relative">
            <div className="container mx-auto max-w-6xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Content */}
                <div className="space-y-8">
                  <div className="space-y-6">
                    <Badge className="inline-flex items-center bg-purple-900/30 text-purple-300 border-purple-700/50 px-3 py-1">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI-Powered Audio Platform
                    </Badge>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                      The Future of
                      <br />
                      <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                        Audio Content
                      </span>
                    </h1>

                    <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                      Experience a revolutionary AI platform that transforms how you consume content. Join thousands already
                      waiting for the next generation of audio experiences.
                    </p>
                  </div>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={handleGetNotified}
                      className="bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
                    >
                      <Bell className="w-4 h-4 mr-2" />
                      Join the Revolution
                    </Button>
                    <Button
                      variant="outline"
                      className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white font-medium px-8 py-3 rounded-lg transition-all duration-200 flex items-center justify-center"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      Preview Experience
                    </Button>
                  </div>

                  {/* Coming Soon Badges */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <div className="flex items-center space-x-3 bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">App Store</div>
                        <div className="text-xs text-gray-400">Coming Soon</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 bg-gray-900/50 border border-gray-800 rounded-lg px-4 py-3">
                      <div className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">Google Play</div>
                        <div className="text-xs text-gray-400">Coming Soon</div>
                      </div>
                    </div>
                  </div>

                  {/* Stats with loading state and status indicators */}
                  <div className="grid grid-cols-3 gap-8 pt-5">
                    {[
                      {
                        value: "Growing Community",
                        label: "Waiting",
                        showOffline: !isOnline,
                        showSecure: hasPermissionError,
                        isLoading: !hasLoaded,
                      },
                      { value: "AI", label: "Powered" },
                      { value: "Real-time", label: "Generation" },
                    ].map((stat, index) => (
                      <div key={index} className="text-center">
                        <div className="flex items-center justify-center mb-1">
                          {stat.isLoading ? (
                            <Loader2 className="w-5 h-5 text-purple-400 animate-spin" />
                          ) : (
                            <div className="text-lg font-bold text-white">{stat.value}</div>
                          )}
                          {stat.showOffline && <WifiOff className="w-4 h-4 text-gray-500 ml-2" />}
                          {stat.showSecure && (
                            <Shield className="w-4 h-4 text-green-500 ml-2" />
                          )}
                        </div>
                        <div className="text-sm text-gray-400">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Phone Mockup */}
                <div className="flex justify-center lg:justify-end">
                  <div className="relative">
                    <div className="w-72 bg-gray-900 rounded-[2.5rem] p-2 shadow-2xl border border-gray-800">
                      <div className="bg-black rounded-[2rem] aspect-[9/19.5] relative overflow-hidden">
                        {/* Status Bar */}
                        <div className="flex justify-between items-center px-6 py-3 text-white text-sm">
                          <span className="font-medium">9:41</span>
                          <div className="flex items-center gap-1">
                            <div className="w-4 h-2 bg-green-500 rounded-sm" />
                            <div className="w-4 h-2 bg-white rounded-sm opacity-60" />
                            <div className="w-4 h-2 bg-white rounded-sm opacity-30" />
                          </div>
                        </div>

                        {/* App Content */}
                        <div className="px-6 py-4 text-white">
                          <div className="flex items-center mb-6">
                            <img 
                              src="/favicon-48.png" 
                              alt="Zynvo Logo" 
                              className="w-8 h-8 mr-3"
                            />
                            <span className="font-semibold">Zynvo</span>
                          </div>

                          <div className="space-y-4">
                            <div className="text-center py-6">
                              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Waveform className="w-8 h-8 text-white" />
                              </div>
                              <div className="text-lg font-semibold mb-2">AI Audio Magic</div>
                              <div className="text-sm text-gray-400 mb-4">Something incredible is coming...</div>
                            </div>

                            <Card className="bg-gray-800 border-gray-700 p-4">
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center">
                                  <Mic className="w-4 h-4 text-purple-400 mr-2" />
                                  <span className="text-sm text-gray-300">Generating...</span>
                                </div>
                                <div className="flex space-x-1">
                                  <div className="w-1 h-4 bg-purple-500 rounded animate-pulse" />
                                  <div className="w-1 h-4 bg-blue-500 rounded animate-pulse delay-100" />
                                  <div className="w-1 h-4 bg-purple-500 rounded animate-pulse delay-200" />
                                </div>
                              </div>
                              <div className="text-xs text-gray-400 mb-2">AI Processing: 87%</div>
                              <div className="w-full bg-gray-700 rounded-full h-2">
                                <div className="bg-gradient-to-r from-purple-500 to-blue-600 rounded-full h-2 w-5/6" />
                              </div>
                            </Card>

                            <div className="flex gap-2">
                              <Button size="sm" className="bg-gray-700 hover:bg-gray-600 text-xs flex-1">
                                <Volume2 className="w-3 h-3 mr-1" />
                                Listen
                              </Button>
                              <Button size="sm" className="bg-gray-700 hover:bg-gray-600 text-xs flex-1">
                                <Music className="w-3 h-3 mr-1" />
                                Enhance
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Floating audio waves */}
                    <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-500/20 rounded-full blur-xl animate-pulse" />
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-blue-500/20 rounded-full blur-xl animate-pulse delay-1000" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="py-24 px-6 relative">
            <div className="container mx-auto max-w-6xl">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Redefining Audio Experiences</h2>
                <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                  Discover what happens when cutting-edge AI meets limitless creativity
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: <Brain className="w-6 h-6" />,
                    title: "Intelligent Generation",
                    description: "Advanced AI creates personalized audio content tailored to your interests",
                  },
                  {
                    icon: <Waveform className="w-6 h-6" />,
                    title: "Real-time Processing",
                    description: "Experience instant content transformation with our lightning-fast AI engine",
                  },
                  {
                    icon: <Globe className="w-6 h-6" />,
                    title: "Unlimited Content",
                    description: "Access an infinite library of possibilities, generated on-demand",
                  },
                  {
                    icon: <Headphones className="w-6 h-6" />,
                    title: "Immersive Audio",
                    description: "High-quality narration with ambient soundscapes for the perfect experience",
                  },
                  {
                    icon: <Zap className="w-6 h-6" />,
                    title: "Instant Access",
                    description: "Get what you want, when you want it, without waiting",
                  },
                  {
                    icon: <Music className="w-6 h-6" />,
                    title: "Enhanced Experience",
                    description: "Every piece of content comes with carefully crafted background audio",
                  },
                ].map((feature, index) => (
                  <Card
                    key={index}
                    className="bg-gray-900/50 border-gray-800 p-6 hover:bg-gray-800/50 transition-all duration-300 group"
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>

          {/* Technology Section */}
          <section id="technology" className="py-24 px-6 relative">
            <div className="container mx-auto max-w-4xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-6">
                  <Badge className="inline-flex items-center bg-blue-900/30 text-blue-300 border-blue-700/50 px-3 py-1">
                    <Zap className="w-4 h-4 mr-2" />
                    Next-Gen Technology
                  </Badge>
                  <h2 className="text-4xl font-bold text-white">Built for the Future</h2>
                  <div className="space-y-4 text-gray-400 leading-relaxed">
                    <p>
                      Our platform leverages state-of-the-art artificial intelligence to create something that has never
                      existed before. We're not just building an app – we're crafting the future of how people consume and
                      interact with content.
                    </p>
                    <p>
                      Every feature is designed with one goal: to give you exactly what you want, exactly when you want it,
                      in a format that fits your lifestyle.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 pt-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">AI-First</div>
                      <div className="text-sm text-gray-400">Architecture</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-1">Real-time</div>
                      <div className="text-sm text-gray-400">Processing</div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <Card className="bg-gray-900/50 border-gray-800 p-8">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3">
                        <Star className="w-5 h-5 text-yellow-400" />
                        <span className="text-white font-medium">What Makes Us Different</span>
                      </div>
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <div className="text-gray-400 text-sm">
                            Revolutionary AI that understands context and creates personalized experiences
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0" />
                          <div className="text-gray-400 text-sm">
                            Instant generation capabilities that work faster than you can think
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0" />
                          <div className="text-gray-400 text-sm">
                            Unlimited possibilities with content that adapts to your preferences
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </section>

          {/* Early Access Section */}
          <section id="early-access" className="py-24 px-6 relative">
            <div className="container mx-auto max-w-4xl text-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <Badge className="inline-flex items-center bg-purple-900/30 text-purple-300 border-purple-700/50 px-3 py-1">
                    <Users className="w-4 h-4 mr-2" />
                    Exclusive Early Access
                  </Badge>
                  <h2 className="text-4xl md:text-5xl font-bold text-white">Be Among the First</h2>
                  <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                    Join an exclusive group of early adopters who will shape the future of audio content. Limited spots
                    available.
                  </p>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-8">
                  {[
                    {
                      icon: <Zap className="w-6 h-6" />,
                      title: "First Access",
                      description: "Be the first to experience revolutionary AI audio technology",
                    },
                    {
                      icon: <Star className="w-6 h-6" />,
                      title: "Premium Features",
                      description: "Unlock advanced capabilities before anyone else",
                    },
                    {
                      icon: <Users className="w-6 h-6" />,
                      title: "Shape the Future",
                      description: "Your feedback will directly influence our development",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="text-center">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center mx-auto mb-3 text-white">
                        {benefit.icon}
                      </div>
                      <h3 className="font-semibold text-white mb-2">{benefit.title}</h3>
                      <p className="text-sm text-gray-400">{benefit.description}</p>
                    </div>
                  ))}
                </div>

                {/* Email Signup */}
                {!emailForm.isSubscribed ? (
                  <Card className="bg-gray-900/50 border-gray-800 p-8 max-w-md mx-auto">
                    <form onSubmit={handleEmailSubmit} className="space-y-4">
                      <div>
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={emailForm.email}
                          onChange={(e) => setEmailForm((prev) => ({ ...prev, email: e.target.value, error: "" }))}
                          className="bg-black border-gray-700 text-white placeholder-gray-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                          disabled={isLoading}
                          required
                        />
                        {emailForm.error && (
                          <div className="flex items-center mt-2 text-red-400 text-sm">
                            <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                            {emailForm.error}
                          </div>
                        )}
                        {!isOnline && (
                          <div className="flex items-center mt-2 text-yellow-400 text-sm">
                            <WifiOff className="w-4 h-4 mr-2 flex-shrink-0" />
                            You're offline. Email will be saved and synced when connection is restored.
                          </div>
                        )}
                        {hasPermissionError && (
                          <div className="flex items-center mt-2 text-green-400 text-sm">
                            <Shield className="w-4 h-4 mr-2 flex-shrink-0" />
                            Your data is securely stored locally and protected.
                          </div>
                        )}
                      </div>
                      <Button
                        type="submit"
                        disabled={isLoading || !emailForm.email}
                        className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white font-medium py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center">
                            <Loader2 className="w-4 h-4 animate-spin mr-2" />
                            {isOnline && !hasPermissionError ? "Securing Your Spot..." : "Saving Securely..."}
                          </div>
                        ) : (
                          <>
                            <ArrowRight className="w-4 h-4 mr-2" />
                            Secure Early Access
                          </>
                        )}
                      </Button>
                    </form>
                    <p className="text-xs text-gray-500 mt-4">
                      Join{" "}
                      <span className="text-purple-400 font-medium">
                        {hasLoaded ? "our growing community" : "thousands of"}
                      </span>{" "}
                      others waiting • Limited early access spots • No spam, ever
                    </p>
                  </Card>
                ) : (
                  <Card className="bg-green-900/20 border-green-800 p-8 max-w-md mx-auto">
                    <div className="text-center">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-white mb-2">You're In!</h3>
                      <p className="text-gray-400">
                        {emailForm.successMessage ||
                          "Welcome to the future. We'll notify you the moment Zynvo is ready to revolutionize your audio experience."}
                      </p>
                    </div>
                  </Card>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* Footer outside gradient wrapper */}
      <footer className="py-12 px-6 border-t border-gray-800 bg-[#10111a] relative z-10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center" style={{opacity: 1}}>
                <span className="text-white font-bold text-xs">Z</span>
              </div>
              <span className="text-white font-medium text-xs">© 2025 Zynvo. All rights reserved.</span>
            </div>
            <div className="flex space-x-8">
              {["Privacy Policy", "Terms of Service", "Contact"].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white hover:text-purple-300 transition-colors duration-200 text-xs font-medium"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  ShoppingBag,
  MessageSquare,
  Calendar,
  MapPin,
  CheckCircle2,
  Star,
  ShieldAlert,
  Sparkles,
  Store,
  Briefcase,
  ArrowRight,
  Handshake
} from 'lucide-react';
import { useLocations } from '@repo/utils';

const features = [
  {
    icon: MessageSquare,
    title: 'Local Discussions',
    description: 'Stay connected with neighbors and discuss what matters most in your community.',
    color: 'bg-primary-100',
    iconColor: 'text-primary-600',
  },
  {
    icon: ShoppingBag,
    title: 'Buy & Sell Locally',
    description: 'Discover great deals from your neighbors and sell items you no longer need.',
    color: 'bg-accent-100',
    iconColor: 'text-accent-600',
  },
  {
    icon: Briefcase,
    title: 'Find Local Services',
    description: 'Connect with trusted plumbers, electricians, tutors, and more in your area.',
    color: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    icon: ShieldAlert,
    title: 'Safety & Crime Alerts',
    description: 'Stay informed about what\'s happening in your neighborhood to keep safe.',
    color: 'bg-red-100',
    iconColor: 'text-red-600',
  },
  {
    icon: Calendar,
    title: 'Community Events',
    description: 'Never miss local gatherings, festivals, and fun activities for the whole family.',
    color: 'bg-purple-100',
    iconColor: 'text-purple-600',
  },
  {
    icon: Store,
    title: 'Local Businesses',
    description: 'Support local shops and restaurants right in your own neighborhood.',
    color: 'bg-yellow-100',
    iconColor: 'text-yellow-700',
  },
];

const testimonials = [
  {
    name: 'Ananya Sharma',
    neighborhood: 'Rohini, Delhi',
    text: 'Neighbourly has completely transformed how I connect with people in my area! Found amazing local services and even made new friends.',
    avatar: null,
  },
  {
    name: 'Rahul Mehta',
    neighborhood: 'Sector 29, Noida',
    text: 'Bought and sold several items on Neighbourly marketplace - it\'s safe, convenient, and saves me money!',
    avatar: null,
  },
  {
    name: 'Priya Kapoor',
    neighborhood: 'Indirapuram, Ghaziabad',
    text: 'As a parent, I love knowing what\'s happening locally - the safety alerts are incredibly helpful!',
    avatar: null,
  },
];

const mockCities = [
  { id: '1', name: 'Delhi', areas: 180, members: '125K+' },
  { id: '2', name: 'Noida', areas: 85, members: '75K+' },
  { id: '3', name: 'Ghaziabad', areas: 60, members: '50K+' },
];

export default function LandingPage() {
  const { cities } = useLocations();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky Navbar */}
      <header className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-600 rounded-2xl flex items-center justify-center shadow-lg">
                <MapPin className="w-7 h-7 text-white" />
              </div>
              <span className="text-2xl font-extrabold text-text">Neighbourly</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <a href="#features" className="nav-link">Features</a>
              <a href="#communities" className="nav-link">Communities</a>
              <a href="#testimonials" className="nav-link">Testimonials</a>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-text-secondary hover:text-primary-600 font-semibold transition-colors">
                Log In
              </Link>
              <Link href="/auth/signup" className="btn-primary py-3">
                Join Neighbourly
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary-50 via-white to-white -z-10"></div>
          <div className="absolute top-40 right-0 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl -z-10"></div>
          <div className="absolute bottom-20 left-10 w-80 h-80 bg-accent-100 rounded-full blur-3xl -z-10"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-slide-up opacity-0 stagger-1">
                <div className="inline-flex items-center gap-2 pill-primary mb-6">
                  <Sparkles className="w-5 h-5" />
                  <span className="font-semibold">Join 250,000+ neighbors in Delhi-NCR</span>
                </div>

                <h1 className="mb-6 text-balance leading-tight">
                  Connect with your <span className="text-primary-600">neighborhood</span> in real life
                </h1>

                <p className="text-xl text-text-secondary mb-10 max-w-xl">
                  Neighbourly brings neighbors together to share recommendations, help each other out, and build stronger communities.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mb-8">
                  <Link href="/auth/signup" className="btn-primary text-lg flex items-center justify-center gap-2">
                    Get Started <ArrowRight className="w-5 h-5" />
                  </Link>
                  <a href="#features" className="btn-secondary text-lg flex items-center justify-center gap-2">
                    Explore Features
                  </a>
                </div>

                <div className="flex flex-wrap items-center gap-6">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <CheckCircle2 className="w-6 h-6 text-primary-600" />
                    <span className="font-medium">Free to join</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <CheckCircle2 className="w-6 h-6 text-primary-600" />
                    <span className="font-medium">Verified members</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <CheckCircle2 className="w-6 h-6 text-primary-600" />
                    <span className="font-medium">Private & safe</span>
                  </div>
                </div>
              </div>

              {/* Hero Visual */}
              <div className="relative animate-fade-in opacity-0 stagger-2">
                <div className="absolute -top-6 -left-6 w-full h-full bg-gradient-to-r from-primary-200 to-accent-100 rounded-3xl -z-10 transform rotate-3"></div>

                <div className="bg-white rounded-3xl shadow-2xl border border-border p-8">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Card 1 */}
                    <div className="bg-gradient-to-br from-primary-50 to-white p-6 rounded-2xl border border-primary-100 card-hover">
                      <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center mb-4">
                        <MessageSquare className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Community Post</h4>
                      <p className="text-sm text-text-secondary">Anyone know a good plumber near Sector 24?</p>
                    </div>

                    {/* Card 2 */}
                    <div className="bg-gradient-to-br from-accent-50 to-white p-6 rounded-2xl border border-accent-100 card-hover mt-6">
                      <div className="w-12 h-12 bg-accent-600 rounded-xl flex items-center justify-center mb-4">
                        <ShoppingBag className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Selling Sofa</h4>
                      <p className="text-sm text-text-secondary">2 years old, excellent condition - ₹4,500</p>
                    </div>

                    {/* Card 3 */}
                    <div className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-2xl border border-blue-100 card-hover">
                      <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mb-4">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Community Event</h4>
                      <p className="text-sm text-text-secondary">Park cleanup this Sunday at 9 AM!</p>
                    </div>

                    {/* Card 4 */}
                    <div className="bg-gradient-to-br from-green-50 to-white p-6 rounded-2xl border border-green-100 card-hover mt-6">
                      <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center mb-4">
                        <Handshake className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">Help Request</h4>
                      <p className="text-sm text-text-secondary">Need help moving furniture tomorrow!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 lg:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="mb-4">Everything you need in one place</h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Discover how Neighbourly helps you stay connected and make the most of your local community.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className="card card-hover p-8 animate-slide-up opacity-0"
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div className={`feature-icon ${feature.color} mb-6`}>
                    <feature.icon className={feature.iconColor} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-text-secondary text-lg">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Communities Section */}
        <section id="communities" className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="mb-4">Active communities in your city</h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Join thousands of active neighbors in Delhi, Noida, and Ghaziabad!
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {mockCities.map((city, index) => (
                <div
                  key={city.id}
                  className="card card-hover overflow-hidden animate-slide-up opacity-0"
                  style={{ animationDelay: `${0.15 * (index + 1)}s` }}
                >
                  <div className="h-40 hero-gradient flex items-center justify-center">
                    <MapPin className="w-16 h-16 text-white/50" />
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-2">{city.name}</h3>
                    <div className="flex items-center justify-between text-text-secondary mb-4">
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" /> {city.areas} neighborhoods
                      </span>
                      <span className="flex items-center gap-2">
                        <Users className="w-4 h-4" /> {city.members} members
                      </span>
                    </div>
                    <Link href="/auth/signup" className="btn-primary w-full py-3 text-center">
                      Join {city.name}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="py-16 lg:py-24 bg-gradient-to-b from-white to-primary-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="mb-4">What our neighbors are saying</h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Real stories from real Neighbourly members just like you.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="card card-hover p-8 bg-white animate-slide-up opacity-0"
                  style={{ animationDelay: `${0.15 * (index + 1)}s` }}
                >
                  <div className="flex items-center gap-1 mb-4">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg text-text mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center">
                      <span className="text-primary-700 font-bold text-lg">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-bold">{testimonial.name}</p>
                      <p className="text-sm text-text-secondary">{testimonial.neighborhood}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 hero-gradient">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6">
              Ready to join your neighborhood?
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              It only takes a minute to sign up and start connecting with your neighbors today!
            </p>
            <Link href="/auth/signup" className="inline-flex items-center gap-2 bg-white text-primary-700 hover:bg-primary-50 px-10 py-5 rounded-2xl font-extrabold text-xl transition-all duration-300 hover:scale-105 shadow-xl">
              Join Neighbourly for Free <ArrowRight className="w-6 h-6" />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div className="md:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                  <MapPin className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-extrabold">Neighbourly</span>
              </div>
              <p className="text-gray-400">
                Building stronger, safer, and more connected neighborhoods across India.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Features</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Community Feed</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Marketplace</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Events</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Services</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Company</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Legal</h4>
              <ul className="space-y-3">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Safety</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
            <p>© 2024 Neighbourly. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

'use client';

import Link from 'next/link';
import {
  Users,
  ShoppingBag,
  MessageSquare,
  Calendar,
  Store,
  Briefcase,
  MapPin,
  CheckCircle2,
  Star
} from 'lucide-react';
import { useLocations } from '@repo/utils';

const features = [
  {
    icon: MessageSquare,
    title: 'Community Feed',
    description: 'Stay connected with neighbors, share updates, and discuss local matters',
    color: 'bg-primary-100 text-primary-700'
  },
  {
    icon: ShoppingBag,
    title: 'Marketplace',
    description: 'Buy and sell items locally, no need to travel far',
    color: 'bg-accent-100 text-accent-700'
  },
  {
    icon: Briefcase,
    title: 'Local Services',
    description: 'Find trusted electricians, plumbers, tutors, and more nearby',
    color: 'bg-secondary-100 text-secondary-700'
  },
  {
    icon: Briefcase,
    title: 'Jobs',
    description: 'Discover local job opportunities in your neighborhood',
    color: 'bg-purple-100 text-purple-700'
  },
  {
    icon: Calendar,
    title: 'Events',
    description: 'Never miss local gatherings, festivals, and community events',
    color: 'bg-pink-100 text-pink-700'
  },
  {
    icon: Store,
    title: 'Businesses',
    description: 'Support local businesses, restaurants, and services',
    color: 'bg-blue-100 text-blue-700'
  }
];

const trustStats = [
  { city: 'Delhi', neighborhoods: 150, members: '125K+' },
  { city: 'Noida', neighborhoods: 80, members: '75K+' },
  { city: 'Ghaziabad', neighborhoods: 60, members: '50K+' },
];

export default function LandingPage() {
  const { cities } = useLocations();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white border-b border-border-light z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-text">Neighbourly</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="#" className="text-text-secondary hover:text-text transition-colors">Features</Link>
              <Link href="#" className="text-text-secondary hover:text-text transition-colors">Communities</Link>
              <Link href="#" className="text-text-secondary hover:text-text transition-colors">About</Link>
            </nav>

            {/* Auth Buttons */}
            <div className="flex items-center gap-4">
              <Link href="/auth/login" className="text-text-secondary hover:text-text font-medium transition-colors">
                Log In
              </Link>
              <Link href="/auth/signup" className="btn-primary py-2.5">
                Join
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className="pt-24">
        {/* Hero Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 pill-primary mb-6">
                  <Star className="w-4 h-4" />
                  <span className="font-medium">Trusted by 250K+ neighbors</span>
                </div>
                <h1 className="text-balance mb-6">
                  Find Your <span className="text-primary-600">Neighborhood</span> Online
                </h1>
                <p className="text-xl text-text-secondary mb-8 max-w-lg">
                  Connect with neighbors, discover local services, buy and sell nearby, and stay updated with your community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/auth/signup" className="btn-primary text-lg">
                    Join Your Neighborhood
                  </Link>
                  <Link href="#" className="btn-secondary text-lg">
                    Explore Communities
                  </Link>
                </div>

                {/* Trust Indicators */}
                <div className="mt-10 flex flex-wrap items-center gap-8">
                  <div className="flex items-center gap-2 text-text-secondary">
                    <CheckCircle2 className="w-5 h-5 text-success-600" />
                    <span>Verified profiles</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <CheckCircle2 className="w-5 h-5 text-success-600" />
                    <span>Hyperlocal focus</span>
                  </div>
                  <div className="flex items-center gap-2 text-text-secondary">
                    <CheckCircle2 className="w-5 h-5 text-success-600" />
                    <span>Safe & secure</span>
                  </div>
                </div>
              </div>

              {/* Hero Image/Visual */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-3xl opacity-10 transform rotate-3" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="card card-hover p-6 bg-gradient-to-br from-primary-50 to-primary-100 h-48 rounded-2xl">
                      <MessageSquare className="w-8 h-8 text-primary-700 mb-3" />
                      <h3 className="font-semibold text-text">Community Post</h3>
                      <p className="text-sm text-text-secondary mt-1">Neighborhood meeting this weekend!</p>
                    </div>
                    <div className="card card-hover p-6 bg-gradient-to-br from-accent-50 to-accent-100 h-36 rounded-2xl">
                      <ShoppingBag className="w-8 h-8 text-accent-700 mb-3" />
                      <h3 className="font-semibold text-text">Selling old sofa</h3>
                      <p className="text-sm text-text-secondary mt-1">Great condition, ₹5000</p>
                    </div>
                  </div>
                  <div className="space-y-4 mt-8">
                    <div className="card card-hover p-6 bg-gradient-to-br from-secondary-50 to-secondary-100 h-36 rounded-2xl">
                      <Calendar className="w-8 h-8 text-secondary-700 mb-3" />
                      <h3 className="font-semibold text-text">Local Music Festival</h3>
                      <p className="text-sm text-text-secondary mt-1">This Saturday at Central Park</p>
                    </div>
                    <div className="card card-hover p-6 bg-gradient-to-br from-purple-50 to-purple-100 h-48 rounded-2xl">
                      <Briefcase className="w-8 h-8 text-purple-700 mb-3" />
                      <h3 className="font-semibold text-text">Tutor Available</h3>
                      <p className="text-sm text-text-secondary mt-1">Math and Science, Class 1-10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 lg:py-24 bg-surface">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="mb-4">Everything Your Neighborhood Needs</h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                A complete platform for local connection, commerce, and community building
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature) => (
                <div key={feature.title} className="card card-hover p-8">
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-text-secondary">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-16 lg:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="mb-4">Trusted in Your City</h2>
              <p className="text-xl text-text-secondary max-w-2xl mx-auto">
                Already helping thousands of neighbors connect in Delhi, Noida, and Ghaziabad
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {trustStats.map((stat, index) => (
                <div key={stat.city} className="card card-hover p-8 text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8 text-primary-700" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{stat.city}</h3>
                  <p className="text-text-secondary mb-1">{stat.neighborhoods} Neighborhoods</p>
                  <p className="text-text-secondary">{stat.members} Active Members</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-primary-600 to-primary-700">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              Ready to Join Your Neighborhood?
            </h2>
            <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
              Create your free account today and start connecting with your neighbors
            </p>
            <Link href="/auth/signup" className="bg-white text-primary-700 hover:bg-primary-50 px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center gap-2 transition-all hover:scale-105">
              Get Started for Free
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Neighbourly</span>
            </div>

            <div className="flex flex-wrap justify-center gap-8">
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Features</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">About</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Privacy</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Terms</Link>
              <Link href="#" className="text-gray-300 hover:text-white transition-colors">Help</Link>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
            <p>© 2024 Neighbourly. Building communities one neighborhood at a time.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
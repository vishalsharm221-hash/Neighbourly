'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search, Plus, MapPin, DollarSign } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  description: string;
  price?: number;
  category: string;
  image_urls?: string[];
  area?: { name: string };
  created_at: string;
  views_count: number;
}

export default function MarketplacePage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'electronics', label: 'Electronics' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'clothing', label: 'Clothing' },
    { id: 'books', label: 'Books' },
    { id: 'services', label: 'Services' },
    { id: 'other', label: 'Other' },
  ];

  useEffect(() => {
    fetchListings();
  }, [selectedCategory]);

  async function fetchListings() {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') params.append('category', selectedCategory);
      params.append('limit', '20');

      const response = await fetch(`/api/listings?${params}`);
      const data = await response.json();
      setListings(data.data || []);
    } catch (err) {
      console.error('Error fetching listings:', err);
    } finally {
      setLoading(false);
    }
  }

  const filteredListings = listings.filter(
    (listing) =>
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold text-blue-600">
            Neighbourly
          </Link>
          <div className="flex gap-4 items-center">
            <Link href="/dashboard" className="text-gray-700 hover:text-blue-600">
              Feed
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600">
              Profile
            </Link>
            <Link
              href="/create-listing"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
              Sell Item
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-900">Neighbourhood Marketplace</h1>
          <p className="text-gray-600">Buy and sell items locally with your neighbors</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Filters */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border border-gray-300 text-gray-700 hover:border-blue-600'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Listings Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading listings...</p>
          </div>
        ) : filteredListings.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <Link
                key={listing.id}
                href={`/marketplace/${listing.id}`}
                className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden group"
              >
                {/* Image */}
                <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                  {listing.image_urls && listing.image_urls.length > 0 ? (
                    <img
                      src={listing.image_urls[0]}
                      alt={listing.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <DollarSign className="w-8 h-8" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold">
                    {listing.category}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                    {listing.title}
                  </h3>

                  {/* Price */}
                  {listing.price && (
                    <p className="text-lg font-bold text-blue-600 mb-2">
                      ₹{listing.price.toLocaleString('en-IN')}
                    </p>
                  )}

                  {/* Description */}
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {listing.description}
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <MapPin className="w-3 h-3" />
                    {listing.area?.name || 'Nearby'}
                  </div>

                  {/* Views */}
                  <p className="text-xs text-gray-400 mt-2">
                    {listing.views_count} views
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-500 mb-4">No listings found</p>
            <Link
              href="/create-listing"
              className="inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create First Listing
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

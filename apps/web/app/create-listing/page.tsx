'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ImagePlus, X } from 'lucide-react';

type ListingCategory = 'electronics' | 'furniture' | 'clothing' | 'books' | 'services' | 'other';

const CATEGORIES: { id: ListingCategory; label: string; icon: string }[] = [
  { id: 'electronics', label: 'Electronics', icon: '📱' },
  { id: 'furniture', label: 'Furniture', icon: '🛋️' },
  { id: 'clothing', label: 'Clothing', icon: '👕' },
  { id: 'books', label: 'Books', icon: '📚' },
  { id: 'services', label: 'Services', icon: '🔧' },
  { id: 'other', label: 'Other', icon: '📦' },
];

export default function CreateListingPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<ListingCategory>('other');
  const [price, setPrice] = useState('');
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      if (price) formData.append('price', price);
      images.forEach((img) => formData.append('images', img));

      const response = await fetch('/api/listings', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create listing');
      }

      router.push('/marketplace');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  }

  function handleImageAdd(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      if (images.length + files.length > 10) {
        setError('Maximum 10 images allowed');
        return;
      }
      setImages([...images, ...Array.from(files)]);
    }
  }

  function handleImageRemove(index: number) {
    setImages(images.filter((_, i) => i !== index));
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Button */}
        <Link
          href="/marketplace"
          className="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Marketplace
        </Link>

        {/* Create Listing Card */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-3xl font-bold mb-6 text-gray-900">Sell an Item</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-3 rounded-lg border-2 transition font-medium text-sm ${
                      category === cat.id
                        ? 'border-blue-600 bg-blue-50 text-blue-600'
                        : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span className="mr-2">{cat.icon}</span>
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What are you selling?"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                maxLength={255}
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">{title.length}/255</p>
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹) *
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                  ₹
                </span>
                <input
                  type="number"
                  required
                  min="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0"
                  className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your item, condition, and any other details..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows={6}
                disabled={loading}
              />
              <p className="text-xs text-gray-500 mt-1">
                {description.length} characters
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Photos (Minimum 1, Maximum 10)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageAdd}
                  className="hidden"
                  id="image-input"
                  disabled={loading}
                />
                <label
                  htmlFor="image-input"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <ImagePlus className="w-8 h-8 text-gray-400" />
                  <p className="text-sm font-medium text-gray-700">
                    Click to upload images
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, GIF up to 10MB each
                  </p>
                </label>
              </div>

              {/* Image Previews */}
              {images.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">
                    {images.length} image{images.length !== 1 ? 's' : ''} uploaded
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative group">
                        <img
                          src={URL.createObjectURL(img)}
                          alt={`Preview ${idx}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => handleImageRemove(idx)}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                {error}
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-3 pt-6 border-t">
              <button
                type="submit"
                disabled={loading || !title || !price || images.length === 0}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
              >
                {loading ? 'Publishing...' : 'Publish Listing'}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>

          {/* Tips */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="font-semibold text-blue-900 mb-2">💡 Tips for a Great Listing</p>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use a clear, descriptive title with key details</li>
              <li>• Add high-quality photos from different angles</li>
              <li>• Include item condition (new, like new, good, fair)</li>
              <li>• Set a fair price - check similar items</li>
              <li>• Be honest about any defects or wear</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

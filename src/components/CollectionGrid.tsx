import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from './ui/button';

interface Collection {
  id: number;
  title: string;
  description: string;
  image: string;
  itemCount: number;
  featured?: boolean;
  color?: string;
}

const collections: Collection[] = [
  {
    id: 1,
    title: "Breakfast Favorites",
    description: "Start your day with our most popular breakfast items",
    image: "https://images.unsplash.com/photo-1533089860892-a9b969df1204?q=80&w=2670&auto=format&fit=crop",
    itemCount: 24,
    featured: true,
    color: "from-blue-500/20 to-sky-300/30"
  },
  {
    id: 2,
    title: "Healthy Options",
    description: "Nutritious meals that taste as good as they make you feel",
    image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=2670&auto=format&fit=crop",
    itemCount: 32,
    color: "from-green-500/20 to-emerald-300/30"
  },
  {
    id: 3,
    title: "Comfort Food",
    description: "Satisfying dishes that remind you of home",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2670&auto=format&fit=crop",
    itemCount: 18,
    color: "from-yellow-500/20 to-amber-300/30"
  },
  {
    id: 4,
    title: "International Cuisine",
    description: "Explore flavors from around the world",
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?q=80&w=2670&auto=format&fit=crop",
    itemCount: 45,
    featured: true,
    color: "from-purple-500/20 to-violet-300/30"
  },
  {
    id: 5,
    title: "Quick Bites",
    description: "Perfect for when you're on the go",
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2671&auto=format&fit=crop",
    itemCount: 29,
    color: "from-red-500/20 to-rose-300/30"
  },
  {
    id: 6,
    title: "Desserts & Sweets",
    description: "Indulgent treats to satisfy your sweet tooth",
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?q=80&w=2670&auto=format&fit=crop",
    itemCount: 36,
    color: "from-pink-500/20 to-fuchsia-300/30"
  }
];

interface CollectionGridProps {
  title: string;
  subtitle?: string;
  layout?: "standard" | "masonry" | "featured";
  showViewAll?: boolean;
  limit?: number;
  background?: "white" | "light" | "gradient";
}

const CollectionGrid: React.FC<CollectionGridProps> = ({
  title,
  subtitle,
  layout = "standard",
  showViewAll = true,
  limit = 6,
  background = "white"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const displayCollections = collections.slice(0, limit);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    const element = document.getElementById(`collection-grid-${title.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [title]);
  
  const getBackgroundStyles = () => {
    switch (background) {
      case "light": return "bg-foodly-50";
      case "gradient": return "bg-gradient-to-r from-foodly-50 to-white";
      case "white":
      default: return "bg-white";
    }
  };
  
  const renderStandardLayout = () => {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCollections.map((collection, index) => (
          <Link
            key={collection.id}
            to={`/collection/${collection.id}`}
            className={`group block transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${100 + index * 100}ms` }}
          >
            <div className="relative h-80 rounded-xl overflow-hidden hover-lift">
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80`} />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-foodly-accent transition-colors">
                  {collection.title}
                </h3>
                <p className="text-white/80 text-sm mb-3 line-clamp-2">
                  {collection.description}
                </p>
                <div className="text-white/90 text-sm font-medium">
                  {collection.itemCount} items
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };
  
  const renderMasonryLayout = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
        {displayCollections.map((collection, index) => {
          // Alternate sizes for masonry effect
          const isLarge = index % 5 === 0 || index % 5 === 3;
          const spanClasses = isLarge 
            ? "md:col-span-2 lg:col-span-1 row-span-2" 
            : "";
          const heightClass = isLarge ? "h-auto aspect-[4/5]" : "h-auto aspect-square";
          
          return (
            <Link
              key={collection.id}
              to={`/collection/${collection.id}`}
              className={`group block transition-all duration-700 ${spanClasses} ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <div className={`relative ${heightClass} rounded-xl overflow-hidden hover-lift`}>
                {/* Background Image */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src={collection.image}
                    alt={collection.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent`} />
                </div>
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-foodly-accent transition-colors">
                    {collection.title}
                  </h3>
                  
                  <div className="flex items-center text-white/90 text-sm font-medium">
                    <span>{collection.itemCount} items</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    );
  };
  
  const renderFeaturedLayout = () => {
    // First featured item is large, others are smaller
    const featuredCollection = displayCollections[0];
    const otherCollections = displayCollections.slice(1);
    
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Featured Large Item */}
        <Link
          to={`/collection/${featuredCollection.id}`}
          className={`group block md:col-span-2 lg:row-span-2 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative h-96 md:h-full rounded-xl overflow-hidden hover-lift">
            {/* Background Image */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={featuredCollection.image}
                alt={featuredCollection.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              {/* Gradient Overlay with brand color */}
              <div className={`absolute inset-0 bg-gradient-to-tr ${featuredCollection.color || "from-foodly-accent/40 to-foodly-secondary/30"} mix-blend-multiply`} />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-end">
              <div className="bg-foodly-accent text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-4">
                Featured Collection
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 group-hover:text-foodly-50 transition-colors">
                {featuredCollection.title}
              </h3>
              <p className="text-white/90 text-sm md:text-base mb-4 max-w-md">
                {featuredCollection.description}
              </p>
              <div className="flex items-center">
                <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm">
                  {featuredCollection.itemCount} items
                </span>
                <div className="ml-3 text-white group-hover:text-foodly-accent transition-colors">
                  Explore collection
                  <ArrowRight className="ml-1 inline-block h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </div>
        </Link>
        
        {/* Other items in grid */}
        {otherCollections.map((collection, index) => (
          <Link
            key={collection.id}
            to={`/collection/${collection.id}`}
            className={`group block transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
            style={{ transitionDelay: `${200 + index * 100}ms` }}
          >
            <div className="relative h-72 rounded-xl overflow-hidden hover-lift">
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <img
                  src={collection.image}
                  alt={collection.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient Overlay with unique color */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${collection.color || "from-foodly-accent/30 to-foodly-secondary/20"} mix-blend-multiply`} />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-foodly-accent transition-colors">
                  {collection.title}
                </h3>
                <p className="text-white/80 text-sm mb-3 line-clamp-2">
                  {collection.description}
                </p>
                <div className="text-white/90 text-sm font-medium">
                  {collection.itemCount} items
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  };
  
  return (
    <section 
      id={`collection-grid-${title.replace(/\s+/g, '-').toLowerCase()}`}
      className={`py-16 ${getBackgroundStyles()}`}
    >
      <div className="foodly-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div className="text-center md:text-left mb-6 md:mb-0">
            <h2 className={`text-3xl font-bold text-foodly-900 mb-3 transition-all duration-700 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {title}
            </h2>
            {subtitle && (
              <p className={`text-foodly-600 max-w-2xl transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                {subtitle}
              </p>
            )}
          </div>
          
          {showViewAll && (
            <div className={`transition-all duration-700 delay-200 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              <Button variant="outline" className="group">
                View all collections
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          )}
        </div>
        
        {layout === "masonry" && renderMasonryLayout()}
        {layout === "featured" && renderFeaturedLayout()}
        {layout === "standard" && renderStandardLayout()}
      </div>
    </section>
  );
};

export default CollectionGrid;

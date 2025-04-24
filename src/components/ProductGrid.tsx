import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Bookmark, Award, Flame } from 'lucide-react';
import { Badge } from './ui/badge';

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
  featured?: boolean;
  isNew?: boolean;
  sale?: {
    active: boolean;
    percentage: number;
  };
  timeEstimate?: string;
  badges?: string[];
}

const featuredProducts: Product[] = [
  {
    id: 10,
    name: "Grilled Salmon Bowl",
    description: "Fresh grilled salmon served with brown rice and seasonal vegetables",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2574&auto=format&fit=crop",
    price: 17.99,
    rating: 4.7,
    reviewCount: 183,
    category: "Healthy",
    featured: true,
    timeEstimate: "20-25 min",
    badges: ["Organic", "High Protein"]
  },
  {
    id: 11,
    name: "Chicken Tikka Masala",
    description: "Tender chicken in a rich, creamy tomato sauce with aromatic spices",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?q=80&w=2671&auto=format&fit=crop",
    price: 15.99,
    rating: 4.8,
    reviewCount: 247,
    category: "Indian",
    isNew: true,
    timeEstimate: "25-30 min"
  },
  {
    id: 12,
    name: "Avocado Toast",
    description: "Sourdough toast topped with mashed avocado, poached eggs, and microgreens",
    image: "https://images.unsplash.com/photo-1603046891726-36bfd957e0bf?q=80&w=2787&auto=format&fit=crop",
    price: 11.99,
    rating: 4.5,
    reviewCount: 156,
    category: "Breakfast",
    timeEstimate: "10-15 min",
    badges: ["Vegetarian"]
  },
  {
    id: 13,
    name: "Seafood Pasta",
    description: "Linguine pasta with shrimp, mussels, and squid in a light tomato sauce",
    image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?q=80&w=2670&auto=format&fit=crop",
    price: 19.99,
    rating: 4.9,
    reviewCount: 173,
    category: "Italian",
    sale: {
      active: true,
      percentage: 10
    },
    timeEstimate: "20-30 min"
  },
  {
    id: 14,
    name: "Beef Bulgogi",
    description: "Thinly sliced marinated beef with vegetables and steamed rice",
    image: "https://images.unsplash.com/photo-1583835746115-88a98c609892?q=80&w=2574&auto=format&fit=crop",
    price: 16.99,
    rating: 4.6,
    reviewCount: 138,
    category: "Korean",
    featured: true,
    timeEstimate: "15-25 min",
    badges: ["Spicy"]
  },
  {
    id: 15,
    name: "Vegetable Stir Fry",
    description: "Seasonal vegetables stir-fried with tofu in a savory ginger sauce",
    image: "https://images.unsplash.com/photo-1625944525533-473d2a6c769e?q=80&w=2670&auto=format&fit=crop",
    price: 13.99,
    rating: 4.4,
    reviewCount: 112,
    category: "Vegan",
    timeEstimate: "15-20 min",
    badges: ["Vegan", "Gluten-Free"]
  }
];

interface ProductGridProps {
  title: string;
  subtitle?: string;
  columns?: 2 | 3 | 4 | 5 | 6;
  aspectRatio?: "square" | "portrait" | "landscape";
  variant?: "default" | "minimal" | "featured" | "compact" | "horizontal";
  limit?: number;
  showBadges?: boolean;
  showTimeEstimate?: boolean;
  background?: "white" | "light" | "gradient";
}

const ProductGrid: React.FC<ProductGridProps> = ({ 
  title, 
  subtitle, 
  columns = 3,
  aspectRatio = "landscape",
  variant = "default",
  limit = 6,
  showBadges = true,
  showTimeEstimate = false,
  background = "white"
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  const displayProducts = featuredProducts.slice(0, limit);
  
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
    
    const element = document.getElementById(`product-grid-${title.replace(/\s+/g, '-').toLowerCase()}`);
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [title]);

  const getGridCols = () => {
    switch (columns) {
      case 2: return "grid-cols-1 sm:grid-cols-2";
      case 3: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      case 4: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      case 5: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
      case 6: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6";
      default: return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5";
    }
  };

  const getAspectRatio = () => {
    switch (aspectRatio) {
      case "square": return "aspect-square";
      case "portrait": return "aspect-[3/4]";
      case "landscape":
      default: return "aspect-[4/3]";
    }
  };

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };
  
  const getBackgroundStyles = () => {
    switch (background) {
      case "light": return "bg-foodly-50";
      case "gradient": return "bg-gradient-to-r from-foodly-50 to-white";
      case "white":
      default: return "bg-white";
    }
  };

  const renderProductCard = (product: Product, index: number) => {
    if (variant === "horizontal") {
      return (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className={`group block transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: `${100 + index * 100}ms` }}
        >
          <div className="flex bg-white rounded-xl overflow-hidden border border-foodly-200 h-full hover:shadow-lg transition-all duration-300 transform group-hover:translate-y-[-4px]">
            {/* Product Image */}
            <div className="relative w-1/3 overflow-hidden bg-foodly-100">
              <div className="h-full overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Badges */}
              {variant === "horizontal" && (
                <div className="absolute top-2 left-2">
                  {product.featured && (
                    <div className="bg-foodly-accent text-white text-xs font-semibold px-2 py-1 rounded-md mb-1">
                      <Award className="w-3 h-3 inline mr-1" />
                      Featured
                    </div>
                  )}
                  
                  {product.isNew && (
                    <div className="bg-foodly-secondary text-white text-xs font-semibold px-2 py-1 rounded-md mb-1">
                      <Flame className="w-3 h-3 inline mr-1" />
                      New
                    </div>
                  )}
                </div>
              )}
            </div>
            
            {/* Product Info */}
            <div className="p-4 flex flex-col flex-grow justify-between">
              <div>
                <div className="mb-1">
                  <span className="text-xs font-medium text-foodly-500 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>
                
                <h3 className="font-bold text-foodly-900 mb-1 group-hover:text-foodly-accent transition-colors">{product.name}</h3>
                
                <p className="text-foodly-600 text-sm line-clamp-2 mb-3">
                  {product.description}
                </p>
                
                {/* Time Estimate */}
                {showTimeEstimate && product.timeEstimate && (
                  <div className="flex items-center text-foodly-600 text-xs mb-3">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{product.timeEstimate}</span>
                  </div>
                )}
                
                {/* Show Badges */}
                {showBadges && product.badges && product.badges.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-1 mb-3">
                    {product.badges.map(badge => (
                      <Badge key={badge} variant="outline" className="text-xs bg-foodly-50">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm font-medium">{product.rating}</span>
                  </div>
                  <span className="mx-1 text-foodly-400">•</span>
                  <span className="text-xs text-foodly-500">{product.reviewCount} reviews</span>
                </div>
                
                <div>
                  {product.sale?.active ? (
                    <div className="flex flex-col items-end">
                      <span className="text-xs line-through text-foodly-500">
                        ${formatPrice(product.price)}
                      </span>
                      <span className="font-bold text-red-500">
                        ${formatPrice(product.price * (1 - product.sale.percentage / 100))}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold text-foodly-900">${formatPrice(product.price)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    }
    
    // For minimal variant
    if (variant === "minimal") {
      return (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className={`group block transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: `${100 + index * 100}ms` }}
        >
          <div className="bg-white rounded-xl overflow-hidden h-full hover:shadow-sm transition-all duration-300 transform group-hover:translate-y-[-4px]">
            {/* Product Image */}
            <div className="relative overflow-hidden bg-foodly-100">
              <div className={`${getAspectRatio()} overflow-hidden`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-3 text-center">
              <h3 className="font-medium text-foodly-900 text-sm mb-1 group-hover:text-foodly-accent transition-colors">{product.name}</h3>
              <span className="text-sm font-semibold text-foodly-900">${formatPrice(product.price)}</span>
            </div>
          </div>
        </Link>
      );
    }
    
    // For featured variant
    if (variant === "featured") {
      return (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className={`group block transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: `${100 + index * 100}ms` }}
        >
          <div className="relative bg-white rounded-xl overflow-hidden border border-foodly-200 h-full hover:shadow-lg transition-all duration-300 transform group-hover:translate-y-[-4px]">
            {/* Featured badge absolute on top */}
            {product.featured && (
              <div className="absolute top-3 left-0 z-10 bg-foodly-accent text-white text-xs font-semibold py-1 px-3 rounded-r-full">
                Featured
              </div>
            )}
            
            {/* Product Image */}
            <div className="relative overflow-hidden bg-foodly-100">
              <div className={`${getAspectRatio()} overflow-hidden`}>
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Badges */}
              <div className="absolute top-3 right-3 flex flex-col gap-2">
                {product.isNew && (
                  <div className="bg-foodly-secondary text-white text-xs font-semibold px-2 py-1 rounded-full">
                    New
                  </div>
                )}
                
                {product.sale?.active && (
                  <div className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {product.sale.percentage}% OFF
                  </div>
                )}
              </div>
              
              {/* Rating on the bottom of image */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-xs font-medium text-white">{product.rating}</span>
                  <span className="mx-1 text-white/70">•</span>
                  <span className="text-xs text-white/90">{product.reviewCount} reviews</span>
                </div>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-4 flex flex-col">
              <div className="mb-1">
                <span className="text-xs font-medium text-foodly-500 uppercase tracking-wider">
                  {product.category}
                </span>
              </div>
              
              <h3 className="font-bold text-foodly-900 mb-1 group-hover:text-foodly-accent transition-colors">{product.name}</h3>
              
              <p className="text-foodly-600 text-sm line-clamp-2 mb-3">
                {product.description}
              </p>
              
              {/* Show Badges */}
              {showBadges && product.badges && product.badges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1 mb-3">
                  {product.badges.map(badge => (
                    <Badge key={badge} variant="outline" className="text-xs bg-foodly-50">
                      {badge}
                    </Badge>
                  ))}
                </div>
              )}
              
              <div className="flex items-center justify-between mt-auto pt-3 border-t border-foodly-100">
                {showTimeEstimate && product.timeEstimate ? (
                  <div className="flex items-center text-foodly-600 text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    <span>{product.timeEstimate}</span>
                  </div>
                ) : (
                  <div />
                )}
                
                <div>
                  {product.sale?.active ? (
                    <div className="flex flex-col items-end">
                      <span className="text-xs line-through text-foodly-500">
                        ${formatPrice(product.price)}
                      </span>
                      <span className="font-bold text-red-500">
                        ${formatPrice(product.price * (1 - product.sale.percentage / 100))}
                      </span>
                    </div>
                  ) : (
                    <span className="font-bold text-foodly-900">${formatPrice(product.price)}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Link>
      );
    }
    
    // For compact variant
    if (variant === "compact") {
      return (
        <Link
          key={product.id}
          to={`/product/${product.id}`}
          className={`group block transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
          style={{ transitionDelay: `${100 + index * 100}ms` }}
        >
          <div className="bg-white rounded-xl overflow-hidden border border-foodly-200 h-full flex flex-col hover:shadow-md transition-all duration-300 transform group-hover:scale-[1.02]">
            {/* Product Image */}
            <div className="relative overflow-hidden bg-foodly-100">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              
              {/* Bookmark button */}
              <button 
                className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white text-foodly-600 hover:text-foodly-accent transition-colors"
                onClick={(e) => e.preventDefault()}
              >
                <Bookmark className="h-4 w-4" />
              </button>
              
              {/* Price */}
              <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1">
                <span className="font-bold text-sm text-foodly-900">${formatPrice(product.price)}</span>
              </div>
            </div>
            
            {/* Product Info */}
            <div className="p-3">
              <h3 className="font-medium text-foodly-900 text-sm mb-1 group-hover:text-foodly-accent transition-colors">{product.name}</h3>
              
              <div className="flex items-center text-xs">
                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="mx-1 text-foodly-400">•</span>
                <span className="text-foodly-500">{product.category}</span>
              </div>
            </div>
          </div>
        </Link>
      );
    }
    
    // Default variant
    return (
      <Link
        key={product.id}
        to={`/product/${product.id}`}
        className={`group block transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: `${100 + index * 100}ms` }}
      >
        <div className="bg-white rounded-xl overflow-hidden border border-foodly-200 h-full flex flex-col hover:shadow-lg transition-all duration-300 transform group-hover:scale-[1.02]">
          {/* Product Image */}
          <div className="relative overflow-hidden bg-foodly-100">
            <div className={`${getAspectRatio()} overflow-hidden`}>
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            
            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-2">
              {product.featured && (
                <span className="bg-foodly-accent text-white text-xs font-semibold px-2 py-1 rounded-md">
                  Featured
                </span>
              )}
              
              {product.isNew && (
                <span className="bg-foodly-secondary text-white text-xs font-semibold px-2 py-1 rounded-md">
                  New
                </span>
              )}
              
              {product.sale?.active && (
                <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md">
                  {product.sale.percentage}% OFF
                </span>
              )}
            </div>
          </div>
          
          {/* Product Info */}
          <div className="p-4 flex flex-col flex-grow">
            <div className="mb-1">
              <span className="text-xs font-medium text-foodly-500 uppercase tracking-wider">
                {product.category}
              </span>
            </div>
            
            <h3 className="font-bold text-foodly-900 mb-1 group-hover:text-foodly-accent transition-colors">{product.name}</h3>
            
            <p className="text-foodly-600 text-sm line-clamp-2 mb-3 flex-grow">
              {product.description}
            </p>
            
            {/* Time Estimate */}
            {showTimeEstimate && product.timeEstimate && (
              <div className="flex items-center text-foodly-600 text-xs mb-3">
                <Clock className="w-3 h-3 mr-1" />
                <span>{product.timeEstimate}</span>
              </div>
            )}
            
            {/* Show Badges */}
            {showBadges && product.badges && product.badges.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1 mb-3">
                {product.badges.map(badge => (
                  <Badge key={badge} variant="outline" className="text-xs bg-foodly-50">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}
            
            <div className="flex items-center justify-between mt-auto pt-3 border-t border-foodly-100">
              <div className="flex items-center">
                <div className="flex items-center">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="ml-1 text-sm font-medium">{product.rating}</span>
                </div>
                <span className="mx-1 text-foodly-400">•</span>
                <span className="text-xs text-foodly-500">{product.reviewCount} reviews</span>
              </div>
              
              <div>
                {product.sale?.active ? (
                  <div className="flex flex-col items-end">
                    <span className="text-xs line-through text-foodly-500">
                      ${formatPrice(product.price)}
                    </span>
                    <span className="font-bold text-red-500">
                      ${formatPrice(product.price * (1 - product.sale.percentage / 100))}
                    </span>
                  </div>
                ) : (
                  <span className="font-bold text-foodly-900">${formatPrice(product.price)}</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  return (
    <section 
      id={`product-grid-${title.replace(/\s+/g, '-').toLowerCase()}`} 
      className={`py-16 ${getBackgroundStyles()}`}
    >
      <div className="foodly-container">
        <div className="mb-10 text-center">
          <h2 className={`text-3xl font-bold text-foodly-900 mb-3 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            {title}
          </h2>
          {subtitle && (
            <p className={`text-foodly-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              {subtitle}
            </p>
          )}
        </div>
        
        {variant === "horizontal" ? (
          <div className="grid grid-cols-1 gap-6">
            {displayProducts.map((product, index) => renderProductCard(product, index))}
          </div>
        ) : (
          <div className={`grid ${getGridCols()} gap-6`}>
            {displayProducts.map((product, index) => renderProductCard(product, index))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;

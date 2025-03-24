
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Clock, ChefHat } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TrendingProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  prepTime: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  chef: {
    name: string;
    image: string;
  };
  rating: number;
  reviewCount: number;
  tag: string;
}

const trendingProducts: TrendingProduct[] = [
  {
    id: 1,
    name: "Mediterranean Bowl",
    description: "Fresh falafel, hummus, tabbouleh, and roasted vegetables on a bed of quinoa",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop",
    price: 13.99,
    prepTime: "15 min",
    difficulty: "Easy",
    chef: {
      name: "Chef Maria",
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=2568&auto=format&fit=crop"
    },
    rating: 4.9,
    reviewCount: 128,
    tag: "Trending"
  },
  {
    id: 2,
    name: "Korean BBQ Tacos",
    description: "Marinated beef bulgogi, kimchi slaw, and gochujang aioli in soft corn tortillas",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2380&auto=format&fit=crop",
    price: 14.99,
    prepTime: "20 min",
    difficulty: "Medium",
    chef: {
      name: "Chef David",
      image: "https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?q=80&w=2680&auto=format&fit=crop"
    },
    rating: 4.8,
    reviewCount: 156,
    tag: "Fusion"
  },
  {
    id: 3,
    name: "Truffle Mushroom Pasta",
    description: "Handmade fettuccine tossed with wild mushrooms in a creamy truffle sauce",
    image: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=2670&auto=format&fit=crop",
    price: 18.99,
    prepTime: "25 min",
    difficulty: "Medium",
    chef: {
      name: "Chef Antonio",
      image: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?q=80&w=2673&auto=format&fit=crop"
    },
    rating: 4.9,
    reviewCount: 203,
    tag: "Gourmet"
  },
  {
    id: 4,
    name: "Açaí Berry Bowl",
    description: "Frozen açaí blend topped with granola, fresh berries, banana, and honey",
    image: "https://images.unsplash.com/photo-1501746877-14782df58970?q=80&w=2574&auto=format&fit=crop",
    price: 11.99,
    prepTime: "10 min",
    difficulty: "Easy",
    chef: {
      name: "Chef Emily",
      image: "https://images.unsplash.com/photo-1611695267518-8f880f283c7f?q=80&w=2565&auto=format&fit=crop"
    },
    rating: 4.7,
    reviewCount: 187,
    tag: "Healthy"
  }
];

const TrendingProducts: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  
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
    
    const element = document.getElementById('trending-products');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  return (
    <section id="trending-products" className="py-16 bg-foodly-50">
      <div className="foodly-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-foodly-900 mb-3">Chef's Special Dishes</h2>
            <p className="text-foodly-600 max-w-2xl">
              Handcrafted by top chefs, these premium dishes are the talk of the town
            </p>
          </div>
          
          <div className={`mt-4 md:mt-0 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Button variant="outline" className="group">
              View all special dishes
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {trendingProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`block transition-all duration-700 hover-lift ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="bg-white rounded-xl overflow-hidden border border-foodly-200 h-full hover:shadow-md transition-shadow">
                <div className="flex flex-col md:flex-row h-full">
                  {/* Product Image */}
                  <div className="md:w-2/5 relative">
                    <div className="aspect-square md:h-full w-full">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    {/* Tag */}
                    <span className="absolute top-3 left-3 bg-foodly-accent text-white text-xs font-semibold px-2 py-1 rounded-md">
                      {product.tag}
                    </span>
                  </div>
                  
                  {/* Product Info */}
                  <div className="p-5 md:w-3/5 flex flex-col">
                    <h3 className="font-bold text-xl text-foodly-900 mb-2">{product.name}</h3>
                    
                    <p className="text-foodly-600 text-sm mb-4 line-clamp-2">
                      {product.description}
                    </p>
                    
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center text-foodly-600">
                        <Clock className="h-4 w-4 mr-1 text-foodly-accent" />
                        <span className="text-sm">{product.prepTime}</span>
                      </div>
                      
                      <div className="flex items-center text-foodly-600">
                        <ChefHat className="h-4 w-4 mr-1 text-foodly-accent" />
                        <span className="text-sm">{product.difficulty}</span>
                      </div>
                    </div>
                    
                    {/* Chef info */}
                    <div className="flex items-center mb-4">
                      <img 
                        src={product.chef.image} 
                        alt={product.chef.name}
                        className="w-8 h-8 rounded-full mr-2 object-cover border border-foodly-100"
                      />
                      <span className="text-sm text-foodly-900">By {product.chef.name}</span>
                    </div>
                    
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="ml-1 text-sm font-medium">{product.rating}</span>
                        <span className="mx-1 text-foodly-400">•</span>
                        <span className="text-xs text-foodly-500">{product.reviewCount} reviews</span>
                      </div>
                      
                      <span className="font-bold text-foodly-900">${formatPrice(product.price)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;

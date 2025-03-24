import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, TrendingUp, Heart, Clock, Star } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rating: number;
  reviewCount: number;
  category: string;
  restaurant: string;
  restaurantId: number;
  featured?: boolean;
  isNew?: boolean;
  sale?: {
    active: boolean;
    percentage: number;
  };
}

interface RestaurantBasic {
  id: number;
  name: string;
  image: string;
  cuisineType: string;
  rating: number;
}

interface RecommendationProps {
  userId?: string;
  sectionTitle?: string;
  showTabs?: boolean;
  columns?: 2 | 3 | 4 | 5 | 6;
}

const sampleRecommendedProducts: Product[] = [
  {
    id: 101,
    name: "Spicy Beef Burrito",
    description: "Large flour tortilla filled with seasoned beef, rice, beans, and spicy sauce",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?w=500&auto=format&fit=crop",
    price: 12.99,
    rating: 4.7,
    reviewCount: 156,
    category: "Mexican",
    restaurant: "Taco Haven",
    restaurantId: 5,
    featured: true
  },
  {
    id: 102,
    name: "Margherita Pizza",
    description: "Classic pizza with tomato sauce, fresh mozzarella, and basil",
    image: "https://images.unsplash.com/photo-1604917877934-07d8d248d396?w=500&auto=format&fit=crop",
    price: 14.99,
    rating: 4.8,
    reviewCount: 203,
    category: "Italian",
    restaurant: "Pizza Palace",
    restaurantId: 3
  },
  {
    id: 103,
    name: "California Sushi Roll",
    description: "Crab, avocado, and cucumber rolled in rice and seaweed",
    image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=500&auto=format&fit=crop",
    price: 10.99,
    rating: 4.6,
    reviewCount: 124,
    category: "Japanese",
    restaurant: "Sushi Master",
    restaurantId: 7,
    isNew: true
  },
  {
    id: 104,
    name: "Chicken Tikka Masala",
    description: "Tender chicken in a creamy tomato sauce with Indian spices",
    image: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=500&auto=format&fit=crop",
    price: 16.99,
    rating: 4.9,
    reviewCount: 178,
    category: "Indian",
    restaurant: "Spice Garden",
    restaurantId: 9
  },
  {
    id: 105,
    name: "BBQ Pulled Pork Sandwich",
    description: "Slow-cooked pulled pork with homemade BBQ sauce and coleslaw",
    image: "https://images.unsplash.com/photo-1513185041617-8ab03f83d6c5?w=500&auto=format&fit=crop",
    price: 13.99,
    rating: 4.7,
    reviewCount: 145,
    category: "American",
    restaurant: "Burger & Beyond",
    restaurantId: 1,
    featured: true
  },
  {
    id: 106,
    name: "Vegetable Pad Thai",
    description: "Rice noodles with tofu, vegetables, and traditional pad thai sauce",
    image: "https://images.unsplash.com/photo-1559314809-0d155014e29e?w=500&auto=format&fit=crop",
    price: 15.99,
    rating: 4.5,
    reviewCount: 112,
    category: "Thai",
    restaurant: "Thai Orchid",
    restaurantId: 5
  },
  {
    id: 107,
    name: "Korean Bibimbap Bowl",
    description: "Mixed rice bowl with vegetables, beef, and egg topped with gochujang sauce",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=500&auto=format&fit=crop",
    price: 17.99,
    rating: 4.8,
    reviewCount: 98,
    category: "Korean",
    restaurant: "Seoul BBQ House",
    restaurantId: 8,
    isNew: true
  },
  {
    id: 108,
    name: "Pho Noodle Soup",
    description: "Vietnamese rice noodle soup with beef, herbs, and flavorful broth",
    image: "https://images.unsplash.com/photo-1618160140288-8f885f90765d?w=500&auto=format&fit=crop",
    price: 14.99,
    rating: 4.7,
    reviewCount: 136,
    category: "Vietnamese",
    restaurant: "Pho Delicious",
    restaurantId: 10
  },
  {
    id: 109,
    name: "Wild Mushroom Risotto",
    description: "Creamy Italian arborio rice with assorted wild mushrooms and parmesan",
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=500&auto=format&fit=crop",
    price: 16.99,
    rating: 4.6,
    reviewCount: 108,
    category: "Italian",
    restaurant: "Pizza Roma",
    restaurantId: 3,
    sale: {
      active: true,
      percentage: 15
    }
  },
  {
    id: 110,
    name: "Acai Bowl",
    description: "Fresh acai berry blend topped with granola, fruits, and honey",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&auto=format&fit=crop",
    price: 11.99,
    rating: 4.8,
    reviewCount: 87,
    category: "Healthy",
    restaurant: "Farm to Table",
    restaurantId: 9,
    isNew: true
  }
];

const samplePopularRestaurants: RestaurantBasic[] = [
  {
    id: 3,
    name: "Pizza Palace",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&auto=format&fit=crop",
    cuisineType: "Italian",
    rating: 4.8,
  },
  {
    id: 5,
    name: "Taco Haven",
    image: "https://images.unsplash.com/photo-1564767655658-4e6b365884ff?w=500&auto=format&fit=crop",
    cuisineType: "Mexican",
    rating: 4.7,
  },
  {
    id: 7,
    name: "Sushi Master",
    image: "https://images.unsplash.com/photo-1617196034183-421b4917c92d?w=500&auto=format&fit=crop",
    cuisineType: "Japanese",
    rating: 4.6,
  },
  {
    id: 1,
    name: "Burger & Beyond",
    image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=500&auto=format&fit=crop",
    cuisineType: "American",
    rating: 4.8,
  },
  {
    id: 8,
    name: "Seoul BBQ House",
    image: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=500&auto=format&fit=crop",
    cuisineType: "Korean",
    rating: 4.6,
  },
  {
    id: 9,
    name: "Farm to Table",
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=500&auto=format&fit=crop",
    cuisineType: "American",
    rating: 4.8,
  }
];

const RecommendationSystem: React.FC<RecommendationProps> = ({ 
  userId = 'user123',
  sectionTitle = 'Recommended For You',
  showTabs = true,
  columns = 6
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [restaurants, setRestaurants] = useState<RestaurantBasic[]>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    const loadRecommendations = async () => {
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setProducts(sampleRecommendedProducts);
      setRestaurants(samplePopularRestaurants);
      setIsLoading(false);
    };
    
    loadRecommendations();
  }, [userId]);
  
  const refreshRecommendations = () => {
    setIsLoading(true);
    toast({
      title: "Refreshing Recommendations",
      description: "Finding new suggestions based on your preferences...",
    });
    
    setTimeout(() => {
      setProducts([...sampleRecommendedProducts].sort(() => Math.random() - 0.5));
      setIsLoading(false);
      
      toast({
        title: "Recommendations Updated",
        description: "Your personalized suggestions have been refreshed!",
      });
    }, 1500);
  };
  
  const ProductCard = ({ product }: { product: Product }) => (
    <Link 
      to={`/product/${product.id}`} 
      className="group block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
    >
      <div className="relative">
        <div className="aspect-video overflow-hidden bg-gray-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
        
        {(product.featured || product.isNew || product.sale?.active) && (
          <div className="absolute top-2 left-2">
            {product.featured && (
              <span className="inline-block bg-foodly-accent text-white text-xs font-semibold px-2 py-1 rounded-md mb-1">
                Featured
              </span>
            )}
            {product.isNew && (
              <span className="inline-block bg-foodly-secondary text-white text-xs font-semibold px-2 py-1 rounded-md mb-1 ml-1">
                New
              </span>
            )}
            {product.sale?.active && (
              <span className="inline-block bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-md ml-1">
                {product.sale.percentage}% OFF
              </span>
            )}
          </div>
        )}
        
        <button 
          className="absolute top-2 right-2 p-1.5 bg-white/80 rounded-full hover:bg-white transition-colors"
          onClick={(e) => {
            e.preventDefault();
            toast({
              title: "Added to Favorites",
              description: `${product.name} has been added to your favorites.`,
            });
          }}
        >
          <Heart className="h-4 w-4 text-foodly-accent" />
        </button>
      </div>
      
      <div className="p-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-semibold text-foodly-900 group-hover:text-foodly-accent transition-colors">
              {product.name}
            </h3>
            <p className="text-xs text-foodly-500 mt-1">
              {product.restaurant}
            </p>
          </div>
          <div className="text-sm font-semibold">
            ${product.price.toFixed(2)}
          </div>
        </div>
        
        <div className="flex items-center mt-2">
          <div className="flex items-center">
            <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
            <span className="ml-1 text-xs font-medium">{product.rating}</span>
          </div>
          <span className="mx-1 text-foodly-400 text-xs">•</span>
          <span className="text-xs text-foodly-500">{product.category}</span>
        </div>
      </div>
    </Link>
  );
  
  const RestaurantCard = ({ restaurant }: { restaurant: RestaurantBasic }) => (
    <Link 
      to={`/restaurant/${restaurant.id}`} 
      className="group flex items-center bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow p-2"
    >
      <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0 bg-gray-100">
        <img 
          src={restaurant.image} 
          alt={restaurant.name}
          className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="ml-3">
        <h3 className="font-semibold text-foodly-900 group-hover:text-foodly-accent transition-colors">
          {restaurant.name}
        </h3>
        <p className="text-xs text-foodly-500 mt-0.5">
          {restaurant.cuisineType}
        </p>
        <div className="flex items-center mt-1">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="ml-1 text-xs font-medium">{restaurant.rating}</span>
        </div>
      </div>
    </Link>
  );
  
  const getGridColumns = () => {
    switch (columns) {
      case 2: return 'grid-cols-1 sm:grid-cols-2';
      case 3: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
      case 4: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      case 5: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
      case 6: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
      default: return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6';
    }
  };
  
  if (showTabs) {
    return (
      <div className="bg-foodly-50 rounded-lg p-4 md:p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-foodly-900">{sectionTitle}</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={refreshRecommendations}
            disabled={isLoading}
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Refresh
          </Button>
        </div>
        
        <Tabs defaultValue="for-you">
          <TabsList className="mb-4">
            <TabsTrigger value="for-you" className="flex items-center">
              <Heart className="h-4 w-4 mr-1.5" />
              For You
            </TabsTrigger>
            <TabsTrigger value="trending" className="flex items-center">
              <TrendingUp className="h-4 w-4 mr-1.5" />
              Trending
            </TabsTrigger>
            <TabsTrigger value="popular" className="flex items-center">
              <ChefHat className="h-4 w-4 mr-1.5" />
              Popular Restaurants
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="for-you">
            {isLoading ? (
              <div className={`grid ${getGridColumns()} gap-4`}>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                    <div className="aspect-video bg-gray-200 animate-pulse"></div>
                    <div className="p-3">
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid ${getGridColumns()} gap-4`}>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trending">
            {isLoading ? (
              <div className={`grid ${getGridColumns()} gap-4`}>
                {[1, 2, 3, 4, 5, 6].map((index) => (
                  <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
                    <div className="aspect-video bg-gray-200 animate-pulse"></div>
                    <div className="p-3">
                      <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 w-1/4 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={`grid ${getGridColumns()} gap-4`}>
                {[...products].sort(() => Math.random() - 0.5).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="popular">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="flex items-center bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100 p-2">
                    <div className="h-16 w-16 rounded-md bg-gray-200 animate-pulse"></div>
                    <div className="ml-3">
                      <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-3 w-12 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {restaurants.map((restaurant) => (
                  <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  }
  
  return (
    <div className="py-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foodly-900">{sectionTitle}</h2>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={refreshRecommendations}
          disabled={isLoading}
        >
          <TrendingUp className="h-4 w-4 mr-1" />
          Refresh
        </Button>
      </div>
      
      {isLoading ? (
        <div className={`grid ${getGridColumns()} gap-4`}>
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
              <div className="aspect-video bg-gray-200 animate-pulse"></div>
              <div className="p-3">
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-1/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className={`grid ${getGridColumns()} gap-4`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default RecommendationSystem;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Heart, BookmarkCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card,
  CardImage,
  CardContent,
  CardBadge,
  CardRating,
  CardPrice,
  CardFooter
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';

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
}

const products: Product[] = [
  {
    id: 1,
    name: "Classic Burger Meal",
    description: "Juicy beef patty with cheese, lettuce, tomato and special sauce",
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=2670&auto=format&fit=crop",
    price: 12.99,
    rating: 4.8,
    reviewCount: 342,
    category: "Burgers",
    featured: true
  },
  {
    id: 2,
    name: "Margherita Pizza",
    description: "Fresh mozzarella, tomatoes, and basil on our signature crust",
    image: "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2340&auto=format&fit=crop",
    price: 14.99,
    rating: 4.7,
    reviewCount: 285,
    category: "Pizza",
    isNew: true
  },
  {
    id: 3,
    name: "California Sushi Roll",
    description: "Crab, avocado and cucumber wrapped in seaweed and rice",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?q=80&w=2670&auto=format&fit=crop",
    price: 15.99,
    rating: 4.9,
    reviewCount: 198,
    category: "Sushi"
  },
  {
    id: 4,
    name: "Spicy Chicken Tacos",
    description: "Three tacos with marinated chicken, fresh salsa and lime",
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?q=80&w=2380&auto=format&fit=crop",
    price: 10.99,
    rating: 4.6,
    reviewCount: 210,
    category: "Mexican",
    sale: {
      active: true,
      percentage: 15
    }
  },
  {
    id: 5,
    name: "Veggie Bowl",
    description: "Fresh mixed vegetables, quinoa and tahini dressing",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2670&auto=format&fit=crop",
    price: 11.99,
    rating: 4.5,
    reviewCount: 156,
    category: "Healthy",
    featured: true
  },
  {
    id: 6,
    name: "Chocolate Brownie Sundae",
    description: "Warm chocolate brownie topped with vanilla ice cream and hot fudge",
    image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=2574&auto=format&fit=crop",
    price: 8.99,
    rating: 4.8,
    reviewCount: 172,
    category: "Dessert",
    isNew: true
  },
  {
    id: 7,
    name: "Mango Smoothie Bowl",
    description: "Mango, banana, coconut milk topped with granola and fresh fruits",
    image: "https://images.unsplash.com/photo-1501746877-14782df58970?q=80&w=2574&auto=format&fit=crop",
    price: 9.99,
    rating: 4.7,
    reviewCount: 128,
    category: "Healthy"
  },
  {
    id: 8,
    name: "Fried Chicken Sandwich",
    description: "Crispy fried chicken with coleslaw and pickles on a toasted bun",
    image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?q=80&w=2670&auto=format&fit=crop",
    price: 13.99,
    rating: 4.6,
    reviewCount: 215,
    category: "Burgers",
    sale: {
      active: true,
      percentage: 10
    }
  },
  // New products added
  {
    id: 9,
    name: "Caprese Salad",
    description: "Fresh tomatoes, mozzarella, basil, and balsamic reduction",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=2680&auto=format&fit=crop",
    price: 10.99,
    rating: 4.5,
    reviewCount: 142,
    category: "Italian",
    featured: false,
    isNew: true
  },
  {
    id: 10,
    name: "Fish & Chips",
    description: "Beer-battered cod with crispy fries and tartar sauce",
    image: "https://images.unsplash.com/photo-1579208030886-b937da0925dc?q=80&w=2680&auto=format&fit=crop",
    price: 15.99,
    rating: 4.6,
    reviewCount: 187,
    category: "American",
    featured: false,
    isNew: false
  },
  {
    id: 11,
    name: "Vegetable Curry",
    description: "Mixed vegetables in a rich curry sauce with basmati rice",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=2574&auto=format&fit=crop",
    price: 13.99,
    rating: 4.7,
    reviewCount: 163,
    category: "Indian",
    featured: false,
    isNew: false
  },
  {
    id: 12,
    name: "Beef Pho",
    description: "Vietnamese noodle soup with beef, herbs, and rich broth",
    image: "https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?q=80&w=2574&auto=format&fit=crop",
    price: 14.99,
    rating: 4.8,
    reviewCount: 201,
    category: "Vietnamese",
    featured: true,
    isNew: false
  },
  {
    id: 13,
    name: "Greek Gyro Wrap",
    description: "Seasoned meat, tzatziki, tomatoes and onions in warm pita",
    image: "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?q=80&w=2670&auto=format&fit=crop",
    price: 11.99,
    rating: 4.5,
    reviewCount: 145,
    category: "Mediterranean",
    featured: false,
    isNew: false
  },
  {
    id: 14,
    name: "Berry Cheesecake",
    description: "Creamy cheesecake topped with mixed berry compote",
    image: "https://images.unsplash.com/photo-1533134242453-b9e071ac6899?q=80&w=2670&auto=format&fit=crop",
    price: 7.99,
    rating: 4.9,
    reviewCount: 176,
    category: "Dessert",
    featured: false,
    isNew: false,
    sale: {
      active: true,
      percentage: 20
    }
  },
  {
    id: 15,
    name: "Bibimbap Bowl",
    description: "Mixed rice bowl with vegetables, beef, and fried egg",
    image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?q=80&w=2670&auto=format&fit=crop",
    price: 16.99,
    rating: 4.7,
    reviewCount: 132,
    category: "Korean",
    featured: false,
    isNew: true
  },
];

interface ProductsSectionProps {
  selectedCategory?: number;
  columns?: 2 | 3 | 4 | 5 | 6;
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ selectedCategory = 1, columns = 6 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [savedProducts, setSavedProducts] = useState<number[]>([]);
  const { toast } = useToast();
  
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
    
    const element = document.getElementById('products-section');
    if (element) observer.observe(element);
    
    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  useEffect(() => {
    if (selectedCategory === 1) {
      setFilteredProducts(products);
    } else {
      const categoryNames = {
        2: "Pizza",
        3: "Burgers",
        4: "Sushi",
        5: "Italian",
        6: "Mexican",
        7: "Chinese",
        8: "Thai",
        9: "Indian",
        10: "Dessert",
        11: "Vegan",
        12: "Healthy"
      };
      
      const categoryName = categoryNames[selectedCategory as keyof typeof categoryNames];
      if (categoryName) {
        setFilteredProducts(products.filter(product => 
          product.category === categoryName
        ));
      } else {
        setFilteredProducts(products);
      }
    }
  }, [selectedCategory]);

  const formatPrice = (price: number) => {
    return price.toFixed(2);
  };

  const toggleSaveProduct = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    
    const isSaved = savedProducts.includes(productId);
    
    if (isSaved) {
      setSavedProducts(prev => prev.filter(id => id !== productId));
      toast({
        title: "Removed from favorites",
        description: "The item has been removed from your favorites",
      });
    } else {
      setSavedProducts(prev => [...prev, productId]);
      toast({
        title: "Added to favorites",
        description: "The item has been added to your favorites",
      });
    }
  };

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

  return (
    <section id="products-section" className="py-16 bg-white">
      <div className="foodly-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className={`transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <h2 className="text-3xl font-bold text-foodly-900 mb-3">Popular Menu Items</h2>
            <p className="text-foodly-600 max-w-2xl">
              Order your favorites from our top-rated restaurants
            </p>
          </div>
          
          <div className={`mt-4 md:mt-0 transition-all duration-700 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            <Button variant="outline" className="group">
              View all menu items
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-lg text-foodly-600">No menu items found for this category.</p>
            <p className="text-foodly-500 mt-2">Try selecting a different category.</p>
          </div>
        )}
        
        <div className={`grid ${getGridColumns()} gap-4 md:gap-6`}>
          {filteredProducts.map((product, index) => (
            <Link
              key={product.id}
              to={`/product/${product.id}`}
              className={`group block transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}
            >
              <Card className="h-full flex flex-col overflow-hidden hover:scale-[1.02] group">
                <CardImage className="overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {product.featured && (
                    <CardBadge variant="featured" position="top-left" />
                  )}
                  
                  {product.isNew && (
                    <CardBadge variant="new" position={product.featured ? "top-left" : "top-right"} 
                      className={product.featured ? "mt-8" : ""}
                    />
                  )}
                  
                  {product.sale?.active && (
                    <CardBadge 
                      variant="sale" 
                      salePercentage={product.sale.percentage}
                      position={!product.featured && !product.isNew ? "top-right" : "bottom-right"}
                    />
                  )}
                  
                  <button 
                    className="absolute top-3 right-3 p-1.5 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors z-10"
                    onClick={(e) => toggleSaveProduct(e, product.id)}
                  >
                    {savedProducts.includes(product.id) ? (
                      <BookmarkCheck className="h-4 w-4 text-foodly-accent fill-foodly-accent" />
                    ) : (
                      <Heart className="h-4 w-4 text-foodly-600 hover:text-foodly-accent" />
                    )}
                  </button>
                </CardImage>
                
                <CardContent className="p-4 flex flex-col flex-grow">
                  <div className="mb-1">
                    <Badge variant="outline" className="bg-foodly-50 text-xs font-medium text-foodly-600">
                      {product.category}
                    </Badge>
                  </div>
                  
                  <h3 className="font-bold text-foodly-900 mb-1 mt-2 group-hover:text-foodly-accent transition-colors">
                    {product.name}
                  </h3>
                  
                  <p className="text-foodly-600 text-sm line-clamp-2 mb-3 flex-grow">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center mb-4">
                    <CardRating rating={product.rating} reviewCount={product.reviewCount} />
                  </div>
                </CardContent>
                
                <CardFooter className="flex items-center justify-between mt-auto">
                  <div className="flex items-center text-foodly-600 text-xs">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>20-30 min</span>
                  </div>
                  
                  <CardPrice 
                    price={product.price} 
                    salePrice={product.sale?.active ? product.price * (1 - product.sale.percentage / 100) : undefined}
                  />
                </CardFooter>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;

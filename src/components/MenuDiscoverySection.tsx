
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Heart, Clock, ShoppingCart, Star, BadgePercent, Tag, Eye, Plus } from 'lucide-react';
import { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardImage,
  CardBadge,
  CardRating,
  CardPrice
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

// Sample product data
const featuredProducts = [
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

// Function to filter products based on tab
const getFilteredProducts = (tab: string) => {
  switch (tab) {
    case 'trending':
      return [...featuredProducts].sort((a, b) => b.rating - a.rating).slice(0, 6);
    case 'new':
      return featuredProducts.filter(p => p.isNew).concat(
        featuredProducts.filter(p => !p.isNew)
      ).slice(0, 6);
    case 'deals':
      return featuredProducts.filter(p => p.sale?.active).concat(
        featuredProducts.filter(p => !p.sale?.active)
      ).slice(0, 6);
    case 'featured':
    default:
      return featuredProducts.filter(p => p.featured).concat(
        featuredProducts.filter(p => !p.featured)
      ).slice(0, 6);
  }
};

const MenuDiscoverySection = () => {
  const [activeTab, setActiveTab] = useState('featured');
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  return (
    <section className="py-16 bg-gradient-to-b from-white to-foodly-50">
      <div className="foodly-container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-foodly-900 mb-3">Discover Our Menu</h2>
          <p className="text-foodly-600 max-w-2xl mx-auto">
            Browse through our diverse selection of dishes to find exactly what you're craving
          </p>
        </div>
        
        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab} 
          className="w-full"
        >
          <div className="flex justify-center mb-8">
            <TabsList className="grid grid-cols-4 h-14 p-1 rounded-xl bg-foodly-50/80 backdrop-blur-sm shadow-inner w-full max-w-md">
              <TabsTrigger 
                value="featured" 
                className="rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:text-foodly-accent data-[state=active]:shadow-md"
              >
                <div className="flex flex-col items-center">
                  <Star className="h-4 w-4 mb-1" />
                  <span>Featured</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="trending" 
                className="rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:text-foodly-accent data-[state=active]:shadow-md"
              >
                <div className="flex flex-col items-center">
                  <Tag className="h-4 w-4 mb-1" />
                  <span>Trending</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="new" 
                className="rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:text-foodly-accent data-[state=active]:shadow-md"
              >
                <div className="flex flex-col items-center">
                  <Eye className="h-4 w-4 mb-1" />
                  <span>New</span>
                </div>
              </TabsTrigger>
              <TabsTrigger 
                value="deals" 
                className="rounded-lg transition-all data-[state=active]:bg-white data-[state=active]:text-foodly-accent data-[state=active]:shadow-md"
              >
                <div className="flex flex-col items-center">
                  <BadgePercent className="h-4 w-4 mb-1" />
                  <span>Deals</span>
                </div>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {['featured', 'trending', 'new', 'deals'].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="mt-0 focus-visible:outline-none">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-6">
                {getFilteredProducts(tabValue).slice(0, 3).map((product) => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`} 
                    className="group block"
                    onMouseEnter={() => setHoveredCard(product.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <Card className="overflow-hidden border-0 h-full shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1">
                      {/* Card Image */}
                      <CardImage 
                        aspectRatio="portrait" 
                        className="group-hover:brightness-105 transition-all duration-500"
                      >
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        
                        {/* Overlay that appears on hover */}
                        <div className={`absolute inset-0 bg-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
                          <Button variant="secondary" size="sm" className="bg-white/90 hover:bg-white shadow-md">
                            <Eye className="mr-1 h-4 w-4" /> Quick View
                          </Button>
                        </div>
                        
                        {/* Badges */}
                        {product.featured && <CardBadge variant="featured" position="top-left" />}
                        {product.isNew && <CardBadge variant="new" position="top-right" />}
                        {product.sale?.active && (
                          <CardBadge 
                            variant="sale" 
                            position="top-right" 
                            salePercentage={product.sale.percentage}
                          />
                        )}
                        
                        {/* Category banner at bottom of image */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                          <span className="text-white text-xs font-medium uppercase tracking-wider">
                            {product.category}
                          </span>
                        </div>
                      </CardImage>
                      
                      <CardHeader className="pt-5 pb-2">
                        <div className="flex items-center justify-between mb-1">
                          <CardRating rating={product.rating} reviewCount={product.reviewCount} size="sm" />
                          <button className="text-gray-400 hover:text-red-500 transition-colors duration-300">
                            <Heart className="h-4 w-4" />
                          </button>
                        </div>
                        <CardTitle className="text-lg leading-tight">{product.name}</CardTitle>
                      </CardHeader>
                      
                      <CardContent className="pb-3">
                        <CardDescription>{product.description}</CardDescription>
                        
                        {/* Time estimate */}
                        {product.timeEstimate && (
                          <div className="flex items-center text-foodly-600 text-xs mt-3">
                            <Clock className="w-3 h-3 mr-1" />
                            <span>{product.timeEstimate}</span>
                          </div>
                        )}
                        
                        {/* Tags/Badges */}
                        {product.badges && product.badges.length > 0 && (
                          <div className="flex flex-wrap gap-1 mt-3">
                            {product.badges.map(badge => (
                              <Badge key={badge} variant="outline" className="text-xs bg-foodly-50/50">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                      
                      <CardFooter className="pt-3">
                        <div className="flex items-center justify-between w-full">
                          <CardPrice 
                            price={product.price} 
                            salePrice={product.sale?.active ? 
                              product.price * (1 - product.sale.percentage / 100) : 
                              undefined
                            }
                          />
                          
                          <Button 
                            size="sm" 
                            className="bg-foodly-accent hover:bg-foodly-accent/90 text-white rounded-full aspect-square p-0 w-9 h-9"
                          >
                            <Plus className="h-5 w-5" />
                          </Button>
                        </div>
                      </CardFooter>
                    </Card>
                  </Link>
                ))}
              </div>
              
              {/* Second row of different styles */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
                {getFilteredProducts(tabValue).slice(3, 6).map((product) => (
                  <Link 
                    key={product.id} 
                    to={`/product/${product.id}`} 
                    className="group block"
                  >
                    <Card className="overflow-hidden h-full shadow-sm hover:shadow-md border-0 bg-white/60 backdrop-blur-sm transition-all duration-300">
                      <div className="flex items-center p-4">
                        {/* Small thumbnail */}
                        <div className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden mr-4 bg-foodly-100">
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          />
                        </div>
                        
                        {/* Content */}
                        <div className="flex-grow">
                          <h3 className="font-medium text-foodly-900 group-hover:text-foodly-accent transition-colors">
                            {product.name}
                          </h3>
                          
                          <div className="flex items-center text-xs mt-1">
                            <span className="text-foodly-500">{product.category}</span>
                            <span className="mx-1 text-foodly-400">•</span>
                            <CardRating rating={product.rating} showCount={false} size="sm" />
                          </div>
                          
                          <div className="flex items-center justify-between mt-2">
                            <CardPrice price={product.price} size="sm" />
                            
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="h-7 rounded-full px-2 border-foodly-200 hover:border-foodly-accent hover:text-foodly-accent"
                            >
                              <ShoppingCart className="h-3 w-3 mr-1" />
                              <span className="text-xs">Add</span>
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
              
              <div className="mt-8 text-center">
                <Button variant="outline" className="border-foodly-accent text-foodly-accent hover:bg-foodly-accent hover:text-white">
                  View All {activeTab === 'trending' ? 'Trending' : 
                           activeTab === 'new' ? 'New' : 
                           activeTab === 'deals' ? 'Deals' : 'Featured'} Dishes
                </Button>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default MenuDiscoverySection;

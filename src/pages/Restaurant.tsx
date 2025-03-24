
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Clock, MapPin, Phone, Globe, ChevronLeft, Heart, Share2, ShoppingBag, Search } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Cart } from '@/components/Cart';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';

// Sample restaurant data
const restaurantData = {
  id: 1,
  name: "Burger & Beyond",
  image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=2664&auto=format&fit=crop",
  coverImage: "https://images.unsplash.com/photo-1561651823-34feb02250e4?q=80&w=2344&auto=format&fit=crop",
  cuisineType: "American",
  rating: 4.8,
  reviewCount: 243,
  deliveryTime: "15-25 min",
  deliveryFee: "Free Delivery",
  distance: "1.2 miles",
  priceLevel: "$$",
  description: "Known for their juicy burgers made with premium ingredients. Each patty is hand-formed daily using a blend of premium cuts of beef and cooked to perfection.",
  address: "123 Burger Street, New York, NY 10001",
  phone: "+1 (555) 123-4567",
  website: "https://burgerandbeyond.com",
  openingHours: [
    { day: "Monday", hours: "11:00 AM - 10:00 PM" },
    { day: "Tuesday", hours: "11:00 AM - 10:00 PM" },
    { day: "Wednesday", hours: "11:00 AM - 10:00 PM" },
    { day: "Thursday", hours: "11:00 AM - 10:00 PM" },
    { day: "Friday", hours: "11:00 AM - 11:00 PM" },
    { day: "Saturday", hours: "11:00 AM - 11:00 PM" },
    { day: "Sunday", hours: "12:00 PM - 9:00 PM" },
  ],
  menuCategories: [
    {
      id: "starters",
      name: "Starters & Sides",
      items: [
        {
          id: "s1",
          name: "Loaded Fries",
          description: "Crispy fries topped with cheese sauce, bacon bits, and green onions",
          price: 7.99,
          image: "https://images.unsplash.com/photo-1585109649139-366815a0d713?q=80&w=2070&auto=format&fit=crop",
          popular: true,
        },
        {
          id: "s2",
          name: "Onion Rings",
          description: "Crispy beer-battered onion rings served with house dipping sauce",
          price: 6.99,
          image: "https://images.unsplash.com/photo-1639024471283-03518883512c?q=80&w=2787&auto=format&fit=crop",
          popular: false,
        },
        {
          id: "s3",
          name: "Chicken Wings",
          description: "6 wings tossed in your choice of sauce: Buffalo, BBQ, or Honey Garlic",
          price: 9.99,
          image: "https://images.unsplash.com/photo-1600555379765-f82335a7b1b0?q=80&w=2940&auto=format&fit=crop",
          popular: true,
        },
      ],
    },
    {
      id: "burgers",
      name: "Signature Burgers",
      items: [
        {
          id: "b1",
          name: "Classic Cheeseburger",
          description: "6oz beef patty, cheddar cheese, lettuce, tomato, onion, pickles, and special sauce",
          price: 12.99,
          image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?q=80&w=2815&auto=format&fit=crop",
          popular: true,
        },
        {
          id: "b2",
          name: "Bacon Avocado Burger",
          description: "6oz beef patty, bacon, avocado, Swiss cheese, lettuce, and chipotle mayo",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1616066649071-30a7c3072d58?q=80&w=2787&auto=format&fit=crop",
          popular: true,
        },
        {
          id: "b3",
          name: "Mushroom Swiss Burger",
          description: "6oz beef patty, sautéed mushrooms, Swiss cheese, and truffle aioli",
          price: 13.99,
          image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?q=80&w=2942&auto=format&fit=crop",
          popular: false,
        },
        {
          id: "b4",
          name: "BBQ Burger",
          description: "6oz beef patty, BBQ sauce, cheddar, bacon, crispy onions, and coleslaw",
          price: 14.99,
          image: "https://images.unsplash.com/photo-1674788802115-64128974a21b?q=80&w=2940&auto=format&fit=crop",
          popular: false,
        },
      ],
    },
  ],
};

// Sample menu item component
const MenuItem = ({ item }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const { addToCart } = useCart();
  const { toast } = useToast();
  
  useEffect(() => {
    const img = new Image();
    img.src = item.image;
    img.onload = () => setImageLoaded(true);
  }, [item.image]);
  
  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      restaurantId: restaurantData.id,
    });
    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    });
  };
  
  return (
    <div className="flex border border-foodly-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow">
      <div className="flex-1 p-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center">
              <h4 className="font-semibold text-foodly-900">{item.name}</h4>
              {item.popular && (
                <Badge className="ml-2 bg-foodly-accent text-white">Popular</Badge>
              )}
            </div>
            <p className="text-sm text-foodly-600 mt-1 line-clamp-2">{item.description}</p>
          </div>
          <div className="text-foodly-900 font-medium">${item.price.toFixed(2)}</div>
        </div>
        <Button size="sm" variant="outline" className="mt-4" onClick={handleAddToCart}>
          <ShoppingBag className="h-4 w-4 mr-2" />
          Add to cart
        </Button>
      </div>
      <div className="relative w-24 h-24 sm:w-32 sm:h-32">
        <div 
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`} 
          style={{ backgroundImage: `url(${item.image})` }}
        ></div>
        {!imageLoaded && (
          <div className="absolute inset-0 bg-foodly-200 animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

const Restaurant = () => {
  const { id } = useParams();
  const [coverImageLoaded, setCoverImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState("menu");
  const { totalItems } = useCart();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Load cover image
    const img = new Image();
    img.src = restaurantData.coverImage;
    img.onload = () => setCoverImageLoaded(true);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Cover Image */}
        <div className="relative h-[30vh] md:h-[40vh] bg-foodly-200 overflow-hidden">
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
              coverImageLoaded ? 'opacity-100' : 'opacity-0'
            }`} 
            style={{ backgroundImage: `url(${restaurantData.coverImage})` }}
          ></div>
          {!coverImageLoaded && (
            <div className="absolute inset-0 bg-foodly-200 animate-pulse"></div>
          )}
          <div className="absolute inset-0 bg-black/30"></div>
          
          {/* Back button */}
          <div className="absolute top-4 left-4">
            <Link to="/">
              <Button variant="outline" size="icon" className="rounded-full bg-white/90 hover:bg-white">
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </Link>
          </div>
          
          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex space-x-2">
            <Button variant="outline" size="icon" className="rounded-full bg-white/90 hover:bg-white">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full bg-white/90 hover:bg-white">
              <Share2 className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Restaurant info */}
        <div className="foodly-container -mt-16 relative z-10">
          <div className="bg-white rounded-t-2xl shadow-sm p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foodly-900">{restaurantData.name}</h1>
                <div className="flex flex-wrap items-center gap-y-2 gap-x-4 mt-2">
                  <div className="flex items-center text-sm">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="font-medium">{restaurantData.rating}</span>
                    <span className="text-foodly-500 ml-1">({restaurantData.reviewCount} reviews)</span>
                  </div>
                  <div className="flex items-center text-sm text-foodly-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {restaurantData.deliveryTime}
                  </div>
                  <div className="flex items-center text-sm text-foodly-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {restaurantData.distance}
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <Button className="bg-foodly-accent hover:bg-foodly-accent/90">
                  <ShoppingBag className="h-5 w-5 mr-2" />
                  Start Order
                </Button>
              </div>
            </div>
            
            <p className="text-foodly-700 mb-6">{restaurantData.description}</p>
            
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="menu">Menu</TabsTrigger>
                <TabsTrigger value="info">Info</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              
              {/* Menu Tab */}
              <TabsContent value="menu" className="pt-6">
                {/* Search bar */}
                <div className="relative mb-6">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-foodly-500" />
                  </div>
                  <input 
                    type="text" 
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-foodly-200 focus:border-foodly-accent focus:ring-0 focus:outline-none" 
                    placeholder="Search menu items" 
                  />
                </div>
                
                {/* Menu categories */}
                <div className="space-y-8">
                  {restaurantData.menuCategories.map((category) => (
                    <div key={category.id}>
                      <h3 className="text-xl font-semibold mb-4">{category.name}</h3>
                      <div className="space-y-4">
                        {category.items.map((item) => (
                          <MenuItem key={item.id} item={item} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              {/* Info Tab */}
              <TabsContent value="info" className="pt-6">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Address</h3>
                    <p className="text-foodly-700 flex items-start">
                      <MapPin className="h-5 w-5 mr-2 flex-shrink-0 text-foodly-500" />
                      {restaurantData.address}
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Contact</h3>
                    <p className="text-foodly-700 flex items-center mb-2">
                      <Phone className="h-5 w-5 mr-2 text-foodly-500" />
                      <a href={`tel:${restaurantData.phone}`} className="hover:text-foodly-accent">
                        {restaurantData.phone}
                      </a>
                    </p>
                    <p className="text-foodly-700 flex items-center">
                      <Globe className="h-5 w-5 mr-2 text-foodly-500" />
                      <a href={restaurantData.website} target="_blank" rel="noopener noreferrer" className="hover:text-foodly-accent">
                        {restaurantData.website.replace(/^https?:\/\//, '')}
                      </a>
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Opening Hours</h3>
                    <ul className="space-y-2">
                      {restaurantData.openingHours.map((item, index) => (
                        <li key={index} className="flex justify-between">
                          <span className="font-medium">{item.day}</span>
                          <span>{item.hours}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              {/* Reviews Tab */}
              <TabsContent value="reviews" className="pt-6">
                <div className="text-center py-8">
                  <p className="text-foodly-600 mb-4">Reviews coming soon!</p>
                  <Button variant="outline">
                    Write a Review
                  </Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        
        {/* Cart Sheet */}
        <Sheet>
          <SheetTrigger asChild>
            <Button 
              className="fixed bottom-6 right-6 bg-foodly-accent hover:bg-foodly-accent/90"
              size="lg"
            >
              <ShoppingBag className="h-5 w-5 mr-2" />
              Cart ({totalItems})
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[90%] sm:w-[440px]">
            <SheetHeader>
              <SheetTitle>Your Cart</SheetTitle>
              <SheetDescription>
                Review your items and checkout when ready
              </SheetDescription>
            </SheetHeader>
            <Cart />
          </SheetContent>
        </Sheet>
      </main>
      <Footer />
    </div>
  );
};

export default Restaurant;

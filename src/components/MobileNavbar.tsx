
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Search, 
  ShoppingBag, 
  Menu, 
  X, 
  User, 
  Heart, 
  Bell, 
  Home, 
  Utensils, 
  Tag, 
  Info, 
  LogIn,
  ChevronRight,
  Settings,
  LayoutGrid,
  Clock,
  MapPin,
  ChefHat,
  TrendingUp 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

type MobileNavbarProps = {
  isLoggedIn: boolean;
  setIsLoggedIn: (value: boolean) => void;
  cartItemCount: number;
};

const MobileNavbar = ({ isLoggedIn, setIsLoggedIn, cartItemCount }: MobileNavbarProps) => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState<string>("menu");
  
  useEffect(() => {
    if (location.pathname === '/') {
      setActiveTab('home');
    } else if (location.pathname.startsWith('/restaurants')) {
      setActiveTab('restaurants');
    } else if (location.pathname.startsWith('/categories')) {
      setActiveTab('categories');
    }
  }, [location.pathname]);

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200">
      {/* Bottom Tab Navigation */}
      <div className="grid grid-cols-5 h-16">
        <Link 
          to="/" 
          className={cn(
            "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
            isActive('/') 
              ? "text-primary font-medium" 
              : "text-muted-foreground"
          )}
        >
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
        
        <Sheet>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs transition-colors w-full",
                activeTab === "restaurants" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground"
              )}
            >
              <Utensils className="h-5 w-5" />
              <span>Restaurants</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl pt-6">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-6">Restaurants</h3>
            
            <div className="space-y-6">
              <Link 
                to="/restaurants/popular" 
                className="flex items-center justify-between p-4 bg-accent rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Popular Restaurants</h4>
                    <p className="text-sm text-muted-foreground">Top-rated places to eat</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
              
              <Link 
                to="/restaurants/new" 
                className="flex items-center justify-between p-4 bg-accent rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center">
                    <ChefHat className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">New Arrivals</h4>
                    <p className="text-sm text-muted-foreground">Recently added restaurants</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
              
              <Link 
                to="/restaurants/near-me" 
                className="flex items-center justify-between p-4 bg-accent rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-blue-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Near Me</h4>
                    <p className="text-sm text-muted-foreground">Restaurants in your area</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
              
              <Link 
                to="/restaurants" 
                className="flex items-center justify-between p-4 bg-accent rounded-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <LayoutGrid className="h-5 w-5 text-purple-500" />
                  </div>
                  <div>
                    <h4 className="font-medium">Browse All</h4>
                    <p className="text-sm text-muted-foreground">Explore all restaurants</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        
        <Sheet>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs transition-colors w-full",
                activeTab === "categories" 
                  ? "text-primary font-medium" 
                  : "text-muted-foreground"
              )}
            >
              <Tag className="h-5 w-5" />
              <span>Categories</span>
            </button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl pt-6">
            <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
            <h3 className="text-xl font-bold mb-6">Food Categories</h3>
            
            <div className="grid grid-cols-3 gap-4">
              {['Pizza', 'Burgers', 'Sushi', 'Italian', 'Chinese', 'Mexican', 'Thai', 'Indian', 'Desserts'].map((category) => (
                <Link 
                  key={category} 
                  to={`/categories/${category.toLowerCase()}`}
                  className="flex flex-col items-center gap-2 p-4 bg-accent rounded-xl"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    {category === 'Pizza' && <span className="text-xl">🍕</span>}
                    {category === 'Burgers' && <span className="text-xl">🍔</span>}
                    {category === 'Sushi' && <span className="text-xl">🍣</span>}
                    {category === 'Italian' && <span className="text-xl">🍝</span>}
                    {category === 'Chinese' && <span className="text-xl">🥡</span>}
                    {category === 'Mexican' && <span className="text-xl">🌮</span>}
                    {category === 'Thai' && <span className="text-xl">🥘</span>}
                    {category === 'Indian' && <span className="text-xl">🍛</span>}
                    {category === 'Desserts' && <span className="text-xl">🍰</span>}
                  </div>
                  <span className="text-sm font-medium">{category}</span>
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        
        <Sheet>
          <SheetTrigger asChild>
            <button
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-xs transition-colors w-full",
                "relative"
              )}
            >
              <ShoppingBag className="h-5 w-5 text-muted-foreground" />
              {cartItemCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                  {cartItemCount}
                </Badge>
              )}
              <span>Cart</span>
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full max-w-md">
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between py-4 border-b">
                <h3 className="text-lg font-bold">Your Cart</h3>
                <Badge variant="outline" className="px-2 py-1">
                  {cartItemCount} items
                </Badge>
              </div>
              
              {cartItemCount > 0 ? (
                <div className="flex-1 overflow-auto py-4">
                  <div className="space-y-4">
                    {/* Mock cart items */}
                    <div className="flex gap-3 p-3 border rounded-lg">
                      <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center">
                        <span className="text-2xl">🍕</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Margherita Pizza</h4>
                          <span className="font-semibold">$12.99</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Cheese, Tomato Sauce</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="icon" className="h-6 w-6">-</Button>
                          <span className="text-sm">1</span>
                          <Button variant="outline" size="icon" className="h-6 w-6">+</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 p-3 border rounded-lg">
                      <div className="w-16 h-16 bg-accent rounded-md flex items-center justify-center">
                        <span className="text-2xl">🍔</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h4 className="font-medium">Classic Burger</h4>
                          <span className="font-semibold">$9.99</span>
                        </div>
                        <p className="text-sm text-muted-foreground">Beef, Cheese, Lettuce</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Button variant="outline" size="icon" className="h-6 w-6">-</Button>
                          <span className="text-sm">2</span>
                          <Button variant="outline" size="icon" className="h-6 w-6">+</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center">
                  <ShoppingBag className="h-16 w-16 text-muted-foreground/30 mb-4" />
                  <p className="text-lg font-medium">Your cart is empty</p>
                  <p className="text-sm text-muted-foreground mt-1">Add items to get started</p>
                  <Button className="mt-6" asChild>
                    <Link to="/">Browse Restaurants</Link>
                  </Button>
                </div>
              )}
              
              {cartItemCount > 0 && (
                <div className="border-t py-4">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>$32.97</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Delivery Fee</span>
                      <span>$2.50</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>$35.47</span>
                    </div>
                  </div>
                  
                  <Button className="w-full">Proceed to Checkout</Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
        
        {isLoggedIn ? (
          <Sheet>
            <SheetTrigger asChild>
              <button
                className={cn(
                  "flex flex-col items-center justify-center gap-1 text-xs transition-colors w-full",
                  isActive('/profile') 
                    ? "text-primary font-medium" 
                    : "text-muted-foreground"
                )}
              >
                <User className="h-5 w-5" />
                <span>Profile</span>
              </button>
            </SheetTrigger>
            <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl pt-6">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full mx-auto mb-6" />
              
              <div className="flex flex-col items-center mb-6">
                <Avatar className="h-20 w-20 mb-3">
                  <AvatarFallback className="bg-primary/10 text-primary text-xl">JD</AvatarFallback>
                </Avatar>
                <h3 className="text-xl font-bold">John Doe</h3>
                <p className="text-muted-foreground">johndoe@example.com</p>
              </div>
              
              <Tabs defaultValue="account" className="w-full">
                <TabsList className="grid grid-cols-3 mb-6">
                  <TabsTrigger value="account">Account</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="favorites">Favorites</TabsTrigger>
                </TabsList>
                
                <TabsContent value="account" className="space-y-4">
                  <Link 
                    to="/profile" 
                    className="flex items-center justify-between p-4 bg-accent rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <User className="h-5 w-5 text-primary" />
                      <span>View Profile</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                  
                  <Link 
                    to="/profile?tab=settings" 
                    className="flex items-center justify-between p-4 bg-accent rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Settings className="h-5 w-5 text-primary" />
                      <span>Settings</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                  
                  <button 
                    className="flex items-center justify-between p-4 bg-accent rounded-xl w-full text-left"
                    onClick={() => setIsLoggedIn(false)}
                  >
                    <div className="flex items-center gap-3">
                      <LogIn className="h-5 w-5 text-destructive" />
                      <span className="text-destructive">Sign Out</span>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </button>
                </TabsContent>
                
                <TabsContent value="orders" className="space-y-4">
                  <Link 
                    to="/profile?tab=orders" 
                    className="flex items-center justify-between p-4 bg-accent rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-orange-500" />
                      <div>
                        <h4 className="font-medium">Current Orders</h4>
                        <p className="text-sm text-muted-foreground">Track your ongoing orders</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                  
                  <Link 
                    to="/profile?tab=orders&status=past" 
                    className="flex items-center justify-between p-4 bg-accent rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-blue-500" />
                      <div>
                        <h4 className="font-medium">Order History</h4>
                        <p className="text-sm text-muted-foreground">View your past orders</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                </TabsContent>
                
                <TabsContent value="favorites" className="space-y-4">
                  <Link 
                    to="/profile?tab=wishlist" 
                    className="flex items-center justify-between p-4 bg-accent rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-red-500" />
                      <div>
                        <h4 className="font-medium">Saved Restaurants</h4>
                        <p className="text-sm text-muted-foreground">Restaurants you've saved</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                  
                  <Link 
                    to="/profile?tab=wishlist&type=dishes" 
                    className="flex items-center justify-between p-4 bg-accent rounded-xl"
                  >
                    <div className="flex items-center gap-3">
                      <Heart className="h-5 w-5 text-red-500" />
                      <div>
                        <h4 className="font-medium">Favorite Dishes</h4>
                        <p className="text-sm text-muted-foreground">Dishes you've saved</p>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground" />
                  </Link>
                </TabsContent>
              </Tabs>
            </SheetContent>
          </Sheet>
        ) : (
          <Link 
            to="/signin" 
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs transition-colors",
              isActive('/signin') 
                ? "text-primary font-medium" 
                : "text-muted-foreground"
            )}
          >
            <LogIn className="h-5 w-5" />
            <span>Sign In</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default MobileNavbar;

import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import MobileNavbar from "./MobileNavbar";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock auth state
  const [animateHeader, setAnimateHeader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
        setAnimateHeader(true);
      } else {
        setIsScrolled(false);
        setTimeout(() => {
          setAnimateHeader(false);
        }, 300);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => {
    if (path === "/" && location.pathname === "/") return true;
    if (path !== "/" && location.pathname.startsWith(path)) return true;
    return false;
  };

  const cartItemCount = 3; // Mock cart item count

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md py-2"
            : "bg-transparent py-4"
        } ${animateHeader ? "translate-y-0" : ""}`}>
        <div className="foodly-container">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 z-20">
              <span
                className={`text-2xl font-bold transition-all duration-300 ${
                  isScrolled
                    ? "bg-gradient-to-r from-foodly-accent via-foodly-secondary to-foodly-accent bg-clip-text text-transparent bg-size-200 bg-pos-0 hover:bg-pos-100"
                    : "bg-gradient-to-r from-foodly-accent to-foodly-secondary bg-clip-text text-transparent"
                }`}>
                Alysa Foodly
              </span>
            </Link>

            {/* Desktop Navigation Menu */}
            <div className="hidden lg:block">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link to="/">
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive("/")
                            ? "bg-accent/50 text-accent-foreground font-medium"
                            : ""
                        )}>
                        <Home className="h-4 w-4 mr-2" />
                        Home
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={
                        isActive("/restaurants")
                          ? "bg-accent/50 text-accent-foreground font-medium"
                          : ""
                      }>
                      <Utensils className="h-4 w-4 mr-2" />
                      Restaurants
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px] grid-cols-2">
                        <div>
                          <Link
                            to="/restaurants/popular"
                            className="block p-2 hover:bg-accent rounded-md">
                            <h3 className="font-medium">Popular Restaurants</h3>
                            <p className="text-sm text-muted-foreground">
                              Top-rated places to eat
                            </p>
                          </Link>
                        </div>
                        <div>
                          <Link
                            to="/restaurants/new"
                            className="block p-2 hover:bg-accent rounded-md">
                            <h3 className="font-medium">New Arrivals</h3>
                            <p className="text-sm text-muted-foreground">
                              Recently added restaurants
                            </p>
                          </Link>
                        </div>
                        <div>
                          <Link
                            to="/restaurants/near-me"
                            className="block p-2 hover:bg-accent rounded-md">
                            <h3 className="font-medium">Near Me</h3>
                            <p className="text-sm text-muted-foreground">
                              Restaurants in your area
                            </p>
                          </Link>
                        </div>
                        <div>
                          <Link
                            to="/restaurants"
                            className="block p-2 hover:bg-accent rounded-md">
                            <h3 className="font-medium">Browse All</h3>
                            <p className="text-sm text-muted-foreground">
                              Explore all restaurants
                            </p>
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <NavigationMenuTrigger
                      className={
                        isActive("/categories")
                          ? "bg-accent/50 text-accent-foreground font-medium"
                          : ""
                      }>
                      <Tag className="h-4 w-4 mr-2" />
                      Categories
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="grid gap-3 p-4 w-[400px] grid-cols-3">
                        {[
                          "Pizza",
                          "Burgers",
                          "Sushi",
                          "Italian",
                          "Chinese",
                          "Mexican",
                          "Thai",
                          "Indian",
                          "Desserts",
                        ].map((category) => (
                          <Link
                            key={category}
                            to={`/categories/${category.toLowerCase()}`}
                            className="block p-2 hover:bg-accent rounded-md text-center">
                            {category}
                          </Link>
                        ))}
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/customer-features">
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive("/customer-features")
                            ? "bg-accent/50 text-accent-foreground font-medium"
                            : ""
                        )}>
                        Features
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>

                  <NavigationMenuItem>
                    <Link to="/about">
                      <NavigationMenuLink
                        className={cn(
                          navigationMenuTriggerStyle(),
                          isActive("/about")
                            ? "bg-accent/50 text-accent-foreground font-medium"
                            : ""
                        )}>
                        <Info className="h-4 w-4 mr-2" />
                        About
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* Search, Wishlist, Cart, and User */}
            <div className="hidden md:flex items-center space-x-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-foodly-100">
                      <Search className="h-5 w-5 text-foodly-700" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Search</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {isLoggedIn && (
                <>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link to="/profile?tab=wishlist">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full hover:bg-foodly-100">
                            <Heart className="h-5 w-5 text-foodly-700" />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Wishlist</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="rounded-full hover:bg-foodly-100 relative">
                          <Bell className="h-5 w-5 text-foodly-700" />
                          <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-foodly-secondary">
                            2
                          </Badge>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Notifications</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </>
              )}

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-full hover:bg-foodly-100 relative">
                      <ShoppingBag className="h-5 w-5 text-foodly-700" />
                      {cartItemCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-foodly-accent">
                          {cartItemCount}
                        </Badge>
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Shopping Cart ({cartItemCount})</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              {isLoggedIn ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="rounded-full w-10 h-10 p-0 border-2 border-foodly-accent">
                      <span className="sr-only">Open user menu</span>
                      <User className="h-5 w-5 text-foodly-700" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-60 p-2">
                    <div className="flex flex-col items-center py-3">
                      <div className="h-16 w-16 rounded-full bg-foodly-100 flex items-center justify-center">
                        <User className="h-8 w-8 text-foodly-700" />
                      </div>
                      <p className="mt-2 font-medium">John Doe</p>
                      <p className="text-sm text-muted-foreground">
                        johndoe@example.com
                      </p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link to="/profile" className="w-full flex items-center">
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/profile?tab=orders"
                        className="w-full flex items-center">
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Orders
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/profile?tab=wishlist"
                        className="w-full flex items-center">
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Link
                        to="/profile?tab=settings"
                        className="w-full flex items-center">
                        <span className="h-4 w-4 mr-2">⚙️</span>
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setIsLoggedIn(false)}>
                      <span className="w-full text-destructive flex items-center">
                        <span className="h-4 w-4 mr-2">🚪</span>
                        Sign Out
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/signin">
                  <Button className="rounded-full bg-foodly-accent hover:bg-foodly-accent/90 text-white">
                    <LogIn className="h-4 w-4 mr-2" />
                    Sign In
                  </Button>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button - Visible only on medium screens and smaller, hidden on small screens where bottom nav is used */}
            <div className="hidden sm:flex md:hidden items-center">
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown (shown on medium screens) */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-10 bg-white animate-fade-in pt-16">
            <div className="foodly-container h-full py-4 overflow-auto">
              <div className="space-y-4 mb-8">
                <Link
                  to="/"
                  className="flex items-center py-3 px-4 rounded-lg text-foodly-800 hover:bg-foodly-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <Home className="h-5 w-5 mr-3 text-foodly-accent" />
                  <span className="font-medium">Home</span>
                </Link>

                <div className="py-2">
                  <div className="px-4 mb-2 text-sm font-semibold text-foodly-500">
                    Restaurants
                  </div>
                  <Link
                    to="/restaurants"
                    className="flex items-center py-2 px-8 text-foodly-800 hover:text-foodly-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    All Restaurants
                  </Link>
                  <Link
                    to="/restaurants/popular"
                    className="flex items-center py-2 px-8 text-foodly-800 hover:text-foodly-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Popular Restaurants
                  </Link>
                  <Link
                    to="/restaurants/near-me"
                    className="flex items-center py-2 px-8 text-foodly-800 hover:text-foodly-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    Restaurants Near Me
                  </Link>
                </div>

                <div className="py-2">
                  <div className="px-4 mb-2 text-sm font-semibold text-foodly-500">
                    Categories
                  </div>
                  <div className="grid grid-cols-2 gap-1">
                    {[
                      "Pizza",
                      "Burgers",
                      "Sushi",
                      "Italian",
                      "Chinese",
                      "Mexican",
                    ].map((category) => (
                      <Link
                        key={category}
                        to={`/categories/${category.toLowerCase()}`}
                        className="py-2 px-8 text-foodly-800 hover:text-foodly-accent transition-colors"
                        onClick={() => setIsMobileMenuOpen(false)}>
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  to="/customer-features"
                  className="flex items-center py-3 px-4 rounded-lg text-foodly-800 hover:bg-foodly-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <span className="font-medium">Features</span>
                </Link>

                <Link
                  to="/about"
                  className="flex items-center py-3 px-4 rounded-lg text-foodly-800 hover:bg-foodly-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}>
                  <Info className="h-5 w-5 mr-3 text-foodly-accent" />
                  <span className="font-medium">About</span>
                </Link>
              </div>

              {isLoggedIn && (
                <div className="border-t border-foodly-100 pt-4 space-y-4">
                  <div className="px-4 mb-2 text-sm font-semibold text-foodly-500">
                    Your Account
                  </div>
                  <Link
                    to="/profile"
                    className="flex items-center py-2 px-4 text-foodly-800 hover:text-foodly-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <User className="h-5 w-5 mr-3 text-foodly-accent" />
                    Profile
                  </Link>
                  <Link
                    to="/profile?tab=orders"
                    className="flex items-center py-2 px-4 text-foodly-800 hover:text-foodly-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <ShoppingBag className="h-5 w-5 mr-3 text-foodly-accent" />
                    My Orders
                  </Link>
                  <Link
                    to="/profile?tab=wishlist"
                    className="flex items-center py-2 px-4 text-foodly-800 hover:text-foodly-accent transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <Heart className="h-5 w-5 mr-3 text-foodly-accent" />
                    My Wishlist
                  </Link>
                  <button
                    className="flex items-center py-2 px-4 w-full text-left text-destructive hover:text-destructive/80 transition-colors"
                    onClick={() => {
                      setIsLoggedIn(false);
                      setIsMobileMenuOpen(false);
                    }}>
                    <span className="mr-3">🚪</span>
                    Sign Out
                  </button>
                </div>
              )}

              <div className="flex items-center space-x-4 py-4 mt-4 border-t border-foodly-100">
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-foodly-100">
                  <Search className="h-5 w-5 text-foodly-700" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full hover:bg-foodly-100 relative">
                  <ShoppingBag className="h-5 w-5 text-foodly-700" />
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-foodly-accent">
                    {cartItemCount}
                  </Badge>
                </Button>

                {!isLoggedIn && (
                  <Link
                    to="/signin"
                    className="block flex-1"
                    onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full bg-foodly-accent hover:bg-foodly-accent/90 text-white rounded-full">
                      <LogIn className="h-4 w-4 mr-2" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* New Bottom Mobile Navigation (shown on small screens) */}
      <MobileNavbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        cartItemCount={cartItemCount}
      />
    </>
  );
};

export default Navbar;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import CategorySelector from "@/components/CategorySelector";
import FeaturedRestaurants from "@/components/FeaturedRestaurants";
import ProductsSection from "@/components/ProductsSection";
import TrendingProducts from "@/components/TrendingProducts";
import ProductGrid from "@/components/ProductGrid";
import Footer from "@/components/Footer";
import RecommendationSystem from "@/components/RecommendationSystem";
import PromotionsDiscounts from "@/components/PromotionsDiscounts";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState(1);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <Hero />

      <main>
        <CategorySelector onCategoryChange={handleCategoryChange} />
        <FeaturedRestaurants columns={5} />

        <TrendingProducts />

        {/* Featured Dishes - Updated to 5 columns */}
        <ProductGrid
          title="Featured Dishes"
          subtitle="Discover our most popular dishes from around the world"
          columns={5}
          aspectRatio="square"
          background="gradient"
        />

        {/* Recommendation System - Updated with 5 columns */}
        <section className="py-10 foodly-container">
          <RecommendationSystem
            sectionTitle="Recommended For You"
            showTabs={false}
            columns={5}
          />
        </section>

        <ProductsSection selectedCategory={selectedCategory} columns={5} />

        {/* Special Offers - Original section */}
        <section className="py-12 bg-foodly-50">
          <div className="foodly-container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foodly-900 mb-3">
                Special Offers
              </h2>
              <p className="text-foodly-600 max-w-2xl mx-auto">
                Take advantage of these exclusive deals and discounts
              </p>
            </div>

            <PromotionsDiscounts showApplyForm={false} />

            <div className="mt-8 text-center">
              <Link to="/customer-features">
                <Button className="bg-foodly-accent hover:bg-foodly-accent/90">
                  View All Promotions
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* How it works section - original */}
        <section className="py-16 bg-white">
          <div className="foodly-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foodly-900 mb-3">
                How Foodly Works
              </h2>
              <p className="text-foodly-600 max-w-2xl mx-auto">
                Get your favorite food delivered to your door in three simple
                steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Step 1 */}
              <div className="text-center p-6 rounded-xl hover:bg-foodly-50 transition-colors">
                <div className="w-16 h-16 bg-foodly-100 text-foodly-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Choose a Restaurant
                </h3>
                <p className="text-foodly-600">
                  Browse through hundreds of menus to find the food you're
                  craving
                </p>
              </div>

              {/* Step 2 */}
              <div className="text-center p-6 rounded-xl hover:bg-foodly-50 transition-colors">
                <div className="w-16 h-16 bg-foodly-100 text-foodly-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">Place Your Order</h3>
                <p className="text-foodly-600">
                  Customize your meal, add it to your cart, and pay securely
                  online
                </p>
              </div>

              {/* Step 3 */}
              <div className="text-center p-6 rounded-xl hover:bg-foodly-50 transition-colors">
                <div className="w-16 h-16 bg-foodly-100 text-foodly-accent rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-xl font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  Receive Your Food
                </h3>
                <p className="text-foodly-600">
                  Track your food in real-time and enjoy it when it arrives at
                  your door
                </p>
              </div>
            </div>

            <div className="mt-10 text-center">
              <Link to="/customer-features">
                <Button className="bg-foodly-accent hover:bg-foodly-accent/90">
                  Explore Customer Features
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section - original */}
        <section className="py-16 bg-gradient-to-r from-foodly-accent to-foodly-secondary text-white">
          <div className="foodly-container">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Order?
              </h2>
              <p className="text-lg mb-8 text-white/90">
                Download the Foodly app and get your first delivery free!
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <button className="bg-black hover:bg-black/80 text-white px-6 py-3 rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 mr-2"
                    fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.68 1.32-1.51 2.65-2.53 4.08zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.32 2.32-1.89 4.29-3.74 4.25z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">Download on the</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </button>

                <button className="bg-black hover:bg-black/80 text-white px-6 py-3 rounded-lg flex items-center justify-center">
                  <svg
                    viewBox="0 0 24 24"
                    className="w-6 h-6 mr-2"
                    fill="currentColor">
                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 5.371l2.313-1.335L7.414 1.35a.996.996 0 0 0-.808-.064l7.893 5.899zm3.313 3.363L21 12l-3.189 1.452-2.496-1.434 2.496-1.47zM7.414 22.65l9.398-4.5-2.313-1.335-7.893 5.899c.257.096.54.101.808-.064z" />
                  </svg>
                  <div className="text-left">
                    <div className="text-xs">GET IT ON</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;

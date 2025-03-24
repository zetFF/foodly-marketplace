import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import OrderTracking from "@/components/OrderTracking";
import ReviewsRatings from "@/components/ReviewsRatings";
import PromotionsDiscounts from "@/components/PromotionsDiscounts";
import Notifications from "@/components/Notifications";
import RecommendationSystem from "@/components/RecommendationSystem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const CustomerFeatures = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 foodly-container py-32">
        <h1 className="text-3xl font-bold text-foodly-900 mb-2">
          Customer Features
        </h1>
        <p className="text-foodly-600 mb-8">
          Explore all the features designed to enhance your food ordering
          experience
        </p>

        <Tabs defaultValue="order-tracking" className="space-y-8">
          <TabsList className="grid grid-cols-2 md:grid-cols-5 w-full">
            <TabsTrigger value="order-tracking">Order Tracking</TabsTrigger>
            <TabsTrigger value="reviews">Reviews & Ratings</TabsTrigger>
            <TabsTrigger value="promotions">Promotions</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="order-tracking" className="space-y-8">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-semibold mb-4">Track Your Order</h2>
              <p className="text-foodly-600 mb-6">
                Follow your food's journey from the restaurant to your doorstep
                in real-time. Get updates at every stage of the delivery
                process.
              </p>
              <OrderTracking />
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Reviews & Ratings</h2>
              <p className="text-foodly-600 mb-6">
                See what others are saying about our restaurants and dishes.
                Share your own experiences to help other customers.
              </p>
              <ReviewsRatings />
            </div>
          </TabsContent>

          <TabsContent value="promotions" className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Promotions & Discounts
              </h2>
              <p className="text-foodly-600 mb-6">
                Discover special offers and discounts from your favorite
                restaurants. Use promo codes to save on your next order.
              </p>
              <PromotionsDiscounts />
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Notifications Center
              </h2>
              <p className="text-foodly-600 mb-6">
                Stay updated with order status, special offers, and more.
                Customize your notification preferences to get only the alerts
                you want.
              </p>
              <Notifications />
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">
                Personalized Recommendations
              </h2>
              <p className="text-foodly-600 mb-6">
                Discover new dishes and restaurants based on your taste
                preferences and order history. Our smart recommendation system
                helps you find your next favorite meal.
              </p>
              <RecommendationSystem />
            </div>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default CustomerFeatures;

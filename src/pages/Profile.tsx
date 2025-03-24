
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserProfile from '@/components/UserProfile';
import UserOrders from '@/components/UserOrders';
import UserSettings from '@/components/UserSettings';
import UserWishlist from '@/components/UserWishlist';

const Profile = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 foodly-container py-12">
        <h1 className="text-3xl font-bold text-foodly-900 mb-8">My Account</h1>
        
        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          
          <TabsContent value="profile">
            <UserProfile />
          </TabsContent>
          
          <TabsContent value="orders">
            <UserOrders />
          </TabsContent>
          
          <TabsContent value="wishlist">
            <UserWishlist />
          </TabsContent>
          
          <TabsContent value="settings">
            <UserSettings />
          </TabsContent>
        </Tabs>
      </div>
      <Footer />
    </div>
  );
};

export default Profile;

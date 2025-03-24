
import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface WishlistItem {
  id: string;
  name: string;
  restaurant: string;
  image: string;
  price: string;
}

const mockWishlist: WishlistItem[] = [
  {
    id: '1',
    name: 'Truffle Mushroom Pizza',
    restaurant: 'Pizza Haven',
    image: 'https://ui.shadcn.com/placeholder.svg',
    price: '$22.99'
  },
  {
    id: '2',
    name: 'Spicy Chicken Burger',
    restaurant: 'Burger Palace',
    image: 'https://ui.shadcn.com/placeholder.svg',
    price: '$14.50'
  },
  {
    id: '3',
    name: 'Avocado Sushi Roll',
    restaurant: 'Sushi Express',
    image: 'https://ui.shadcn.com/placeholder.svg',
    price: '$18.00'
  },
  {
    id: '4',
    name: 'Chocolate Lava Cake',
    restaurant: 'Sweet Treats',
    image: 'https://ui.shadcn.com/placeholder.svg',
    price: '$8.99'
  }
];

const UserWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>(mockWishlist);
  
  const removeFromWishlist = (id: string) => {
    setWishlist(wishlist.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Wishlist</h2>
        <span className="text-foodly-600">{wishlist.length} items</span>
      </div>
      
      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((item) => (
            <div key={item.id} className="border rounded-lg overflow-hidden shadow-sm">
              <div className="h-48 relative">
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                />
                <button 
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm hover:bg-red-50"
                >
                  <Heart className="h-5 w-5 text-red-500" fill="currentColor" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-foodly-900">{item.name}</h3>
                <p className="text-sm text-foodly-600">{item.restaurant}</p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="font-medium">{item.price}</span>
                  <Button size="sm" className="bg-foodly-accent hover:bg-foodly-accent/90">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="h-12 w-12 mx-auto text-foodly-200" />
          <p className="mt-4 text-foodly-600">Your wishlist is empty</p>
          <Button className="mt-4 bg-foodly-accent hover:bg-foodly-accent/90">
            Browse Restaurants
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserWishlist;

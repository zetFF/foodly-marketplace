
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { X, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const { toast } = useToast();

  const handleCheckout = () => {
    toast({
      title: "Order placed successfully!",
      description: "Your order is being processed.",
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-foodly-600">Your cart is empty</p>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between border-b pb-4">
            <div className="flex items-center space-x-4">
              {item.image && (
                <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
              )}
              <div>
                <h3 className="font-medium">{item.name}</h3>
                <p className="text-foodly-600">${item.price.toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-500"
                onClick={() => removeFromCart(item.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 space-y-4">
        <div className="flex justify-between font-medium">
          <span>Total</span>
          <span>${totalPrice.toFixed(2)}</span>
        </div>
        <Button
          className="w-full bg-foodly-accent hover:bg-foodly-accent/90"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

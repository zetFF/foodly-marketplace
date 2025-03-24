
import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import OrderTracking from '@/components/OrderTracking';
import ReviewsRatings from '@/components/ReviewsRatings';
import { useToast } from '@/hooks/use-toast';

interface Order {
  id: string;
  restaurant: string;
  date: string;
  total: string;
  status: 'delivered' | 'processing' | 'cancelled';
  items: Array<{
    name: string;
    quantity: number;
    price: string;
  }>;
}

const mockOrders: Order[] = [
  {
    id: 'ORD-2023-1234',
    restaurant: 'Burger Palace',
    date: 'July 24, 2023',
    total: '$34.50',
    status: 'delivered',
    items: [
      { name: 'Double Cheeseburger', quantity: 2, price: '$11.00' },
      { name: 'Sweet Potato Fries', quantity: 1, price: '$4.50' },
      { name: 'Vanilla Milkshake', quantity: 1, price: '$4.00' }
    ]
  },
  {
    id: 'ORD-2023-1235',
    restaurant: 'Pizza Haven',
    date: 'July 18, 2023',
    total: '$42.75',
    status: 'processing',
    items: [
      { name: 'Large Pepperoni Pizza', quantity: 1, price: '$18.99' },
      { name: 'Garlic Knots', quantity: 2, price: '$5.99' },
      { name: 'Caesar Salad', quantity: 1, price: '$7.99' }
    ]
  },
  {
    id: 'ORD-2023-1236',
    restaurant: 'Taco Town',
    date: 'July 10, 2023',
    total: '$28.50',
    status: 'cancelled',
    items: [
      { name: 'Beef Tacos', quantity: 3, price: '$4.50' },
      { name: 'Chicken Quesadilla', quantity: 1, price: '$9.00' },
      { name: 'Guacamole & Chips', quantity: 1, price: '$6.00' }
    ]
  }
];

const OrderCard = ({ order }: { order: Order }) => {
  const [expanded, setExpanded] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const { toast } = useToast();
  
  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleReorder = () => {
    toast({
      title: "Order Placed",
      description: `Your order from ${order.restaurant} has been placed.`,
    });
  };

  return (
    <div className="border rounded-lg overflow-hidden shadow-sm">
      <div className="p-4 bg-gray-50 border-b flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-medium">{order.restaurant}</h3>
            <Badge className={getStatusColor(order.status)}>
              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
            </Badge>
          </div>
          <p className="text-sm text-foodly-600">{order.date}</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-medium">{order.total}</span>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? 'Hide Details' : 'View Details'}
          </Button>
        </div>
      </div>
      
      {expanded && (
        <div className="p-4 bg-white">
          <h4 className="font-medium mb-2 text-foodly-800">Order ID: {order.id}</h4>
          <div className="space-y-2">
            {order.items.map((item, index) => (
              <div key={index} className="flex justify-between items-center text-sm">
                <span>
                  {item.name} x{item.quantity}
                </span>
                <span>{item.price}</span>
              </div>
            ))}
          </div>
          
          {order.status === 'processing' && (
            <OrderTracking compact orderId={order.id} />
          )}
          
          <div className="mt-4 pt-2 border-t flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleReorder}>
              Reorder
            </Button>
            
            {order.status === 'processing' && (
              <Button 
                variant="outline" 
                size="sm" 
                className="text-blue-600 border-blue-200 hover:bg-blue-50"
                onClick={() => setTrackingOpen(true)}
              >
                Track Order
              </Button>
            )}
            
            {order.status === 'delivered' && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setReviewOpen(true)}
              >
                Leave Review
              </Button>
            )}
          </div>
        </div>
      )}
      
      {/* Order Tracking Dialog */}
      <Dialog open={trackingOpen} onOpenChange={setTrackingOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Order Tracking</DialogTitle>
          </DialogHeader>
          <OrderTracking orderId={order.id} />
        </DialogContent>
      </Dialog>
      
      {/* Review Dialog */}
      <Dialog open={reviewOpen} onOpenChange={setReviewOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Leave a Review for {order.restaurant}</DialogTitle>
          </DialogHeader>
          <ReviewsRatings showReviewForm={true} reviews={[]} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

const UserOrders = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Your Orders</h2>
      </div>
      
      {mockOrders.length > 0 ? (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-foodly-600">You haven't placed any orders yet.</p>
          <Button className="mt-4 bg-foodly-accent hover:bg-foodly-accent/90">
            Browse Restaurants
          </Button>
        </div>
      )}
    </div>
  );
};

export default UserOrders;

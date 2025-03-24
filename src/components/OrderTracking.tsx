
import React, { useState } from 'react';
import { Package, MapPin, Truck, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

// Tracking step interface
interface TrackingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  timestamp: string;
  completed: boolean;
  active: boolean;
}

// Order interface for tracking
interface TrackingOrder {
  id: string;
  restaurant: string;
  estimatedDelivery: string;
  status: 'preparing' | 'ontheway' | 'delivered' | 'cancelled';
  currentStep: number;
  steps: TrackingStep[];
}

// Sample tracking data
const sampleTrackingOrder: TrackingOrder = {
  id: 'ORD-2023-1235',
  restaurant: 'Pizza Haven',
  estimatedDelivery: '12:45 PM Today',
  status: 'ontheway',
  currentStep: 2,
  steps: [
    {
      id: 'order-confirmed',
      title: 'Order Confirmed',
      description: 'Your order has been received by the restaurant.',
      icon: <CheckCircle className="h-6 w-6" />,
      timestamp: '11:30 AM',
      completed: true,
      active: false
    },
    {
      id: 'preparing',
      title: 'Preparing',
      description: 'The restaurant is preparing your food.',
      icon: <Clock className="h-6 w-6" />,
      timestamp: '11:35 AM',
      completed: true,
      active: false
    },
    {
      id: 'on-the-way',
      title: 'On the Way',
      description: 'Your order is on the way to your location.',
      icon: <Truck className="h-6 w-6" />,
      timestamp: '12:05 PM',
      completed: false,
      active: true
    },
    {
      id: 'delivered',
      title: 'Delivered',
      description: 'Your order has been delivered.',
      icon: <Package className="h-6 w-6" />,
      timestamp: 'Pending',
      completed: false,
      active: false
    }
  ]
};

interface OrderTrackingProps {
  orderId?: string;
  compact?: boolean;
}

const OrderTracking: React.FC<OrderTrackingProps> = ({ orderId = 'ORD-2023-1235', compact = false }) => {
  const [order, setOrder] = useState<TrackingOrder>(sampleTrackingOrder);
  const { toast } = useToast();
  
  // In a real app, this would fetch the order details by ID
  const trackOrder = () => {
    toast({
      title: "Refreshing Order Status",
      description: `Getting the latest updates for order ${orderId}`,
    });
    
    // Simulate an update
    setTimeout(() => {
      if (order.currentStep < 3) {
        const updatedOrder = { ...order };
        updatedOrder.currentStep += 1;
        updatedOrder.steps[order.currentStep].completed = true;
        updatedOrder.steps[order.currentStep].active = false;
        
        if (order.currentStep + 1 < order.steps.length) {
          updatedOrder.steps[order.currentStep + 1].active = true;
        }
        
        if (order.currentStep + 1 === 3) {
          updatedOrder.status = 'delivered';
          updatedOrder.steps[3].timestamp = '12:40 PM';
        }
        
        setOrder(updatedOrder);
        
        toast({
          title: "Order Updated",
          description: `Your order is now ${updatedOrder.steps[updatedOrder.currentStep].title}`,
        });
      }
    }, 1500);
  };
  
  if (compact) {
    // Compact version for the OrderCard
    return (
      <div className="mt-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-sm">Order Status</h4>
          <span className="text-sm text-foodly-accent">{order.steps[order.currentStep].title}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div 
            className="bg-foodly-accent h-2.5 rounded-full transition-all" 
            style={{ width: `${(order.currentStep + 1) / order.steps.length * 100}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500">
          Estimated delivery by {order.estimatedDelivery}
        </p>
      </div>
    );
  }
  
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Track Your Order</span>
          <span className="text-sm bg-foodly-50 text-foodly-accent px-2 py-1 rounded-full">
            {orderId}
          </span>
        </CardTitle>
        <CardDescription>
          Order from <span className="font-medium">{order.restaurant}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="text-sm font-medium text-foodly-700">Estimated Delivery:</span>
              <span className="ml-2">{order.estimatedDelivery}</span>
            </div>
            <Button variant="outline" size="sm" onClick={trackOrder}>
              Refresh Status
            </Button>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-foodly-accent h-2.5 rounded-full transition-all" 
              style={{ width: `${(order.currentStep + 1) / order.steps.length * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="space-y-6">
          {order.steps.map((step, index) => (
            <div key={step.id} className="relative">
              {index < order.steps.length - 1 && (
                <div 
                  className={`absolute top-7 left-3.5 w-0.5 h-12 -z-10 ${
                    index < order.currentStep ? 'bg-foodly-accent' : 'bg-gray-200'
                  }`}>
                </div>
              )}
              
              <div className="flex items-start">
                <div className={`rounded-full p-1.5 mr-4 ${
                  step.completed ? 'bg-foodly-accent text-white' : 
                  step.active ? 'bg-foodly-accent/20 text-foodly-accent' : 'bg-gray-200 text-gray-400'
                }`}>
                  {step.icon}
                </div>
                
                <div>
                  <div className="flex items-center">
                    <h3 className={`font-semibold ${
                      step.completed || step.active ? 'text-foodly-900' : 'text-gray-500'
                    }`}>
                      {step.title}
                    </h3>
                    {step.active && (
                      <span className="ml-2 inline-flex h-2 w-2 rounded-full bg-foodly-accent">
                        <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-foodly-accent opacity-75"></span>
                      </span>
                    )}
                  </div>
                  
                  <p className={`text-sm ${
                    step.completed || step.active ? 'text-foodly-600' : 'text-gray-400'
                  }`}>
                    {step.description}
                  </p>
                  
                  <p className="text-xs mt-1 text-foodly-500">
                    {step.timestamp}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t pt-4">
        <Button variant="outline" className="w-full" onClick={() => window.history.back()}>
          Back to Orders
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrderTracking;

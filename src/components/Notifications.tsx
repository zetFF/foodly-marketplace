
import React, { useState } from 'react';
import { Bell, ShoppingBag, Tag, Star, X, Settings } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

type NotificationType = 'order' | 'promo' | 'review' | 'system';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  date: string; // ISO string
  read: boolean;
  actionLabel?: string;
  actionPath?: string;
  image?: string;
}

interface NotificationsProps {
  notifications?: Notification[];
  showPreferences?: boolean;
}

const getTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  }
  
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  }
  
  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  }
  
  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
  
  return date.toLocaleDateString();
};

const getNotificationIcon = (type: NotificationType) => {
  switch (type) {
    case 'order':
      return <ShoppingBag className="h-5 w-5 text-blue-500" />;
    case 'promo':
      return <Tag className="h-5 w-5 text-green-500" />;
    case 'review':
      return <Star className="h-5 w-5 text-yellow-500" />;
    default:
      return <Bell className="h-5 w-5 text-gray-500" />;
  }
};

const sampleNotifications: Notification[] = [
  {
    id: 'n1',
    type: 'order',
    title: 'Order Delivered',
    message: 'Your order #1234 from Burger Palace has been delivered. Enjoy your meal!',
    date: new Date(Date.now() - 30 * 60000).toISOString(), // 30 minutes ago
    read: false,
    actionLabel: 'Rate Order',
    actionPath: '/profile/orders'
  },
  {
    id: 'n2',
    type: 'promo',
    title: 'Weekend Special',
    message: 'Get 25% off on all orders this weekend. Use code WEEKEND25.',
    date: new Date(Date.now() - 5 * 3600000).toISOString(), // 5 hours ago
    read: true,
    actionLabel: 'View Offer',
    image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=120&h=120&auto=format&fit=crop'
  },
  {
    id: 'n3',
    type: 'review',
    title: 'Review Reminder',
    message: 'How was your meal from Pizza Haven? Share your experience with a review.',
    date: new Date(Date.now() - 2 * 86400000).toISOString(), // 2 days ago
    read: true,
    actionLabel: 'Write Review',
    actionPath: '/profile/orders'
  },
  {
    id: 'n4',
    type: 'system',
    title: 'Account Updated',
    message: 'Your account information has been successfully updated.',
    date: new Date(Date.now() - 7 * 86400000).toISOString(), // 7 days ago
    read: true
  }
];

const Notifications: React.FC<NotificationsProps> = ({ 
  notifications = sampleNotifications,
  showPreferences = true
}) => {
  const [notificationList, setNotificationList] = useState<Notification[]>(notifications);
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: true,
    reviewReminders: true,
    systemNotifications: true,
    emailNotifications: true,
    pushNotifications: true
  });
  const { toast } = useToast();
  
  const markAsRead = (id: string) => {
    setNotificationList(
      notificationList.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };
  
  const deleteNotification = (id: string) => {
    setNotificationList(
      notificationList.filter(notification => notification.id !== id)
    );
    
    toast({
      title: "Notification Deleted",
      description: "The notification has been removed.",
    });
  };
  
  const markAllAsRead = () => {
    setNotificationList(
      notificationList.map(notification => ({ ...notification, read: true }))
    );
    
    toast({
      title: "All Read",
      description: "All notifications marked as read.",
    });
  };
  
  const unreadCount = notificationList.filter(n => !n.read).length;
  
  const savePreferences = () => {
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    });
  };
  
  return (
    <div>
      <Tabs defaultValue="all">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">
            Notifications
            {unreadCount > 0 && (
              <Badge className="ml-2 bg-foodly-accent">{unreadCount}</Badge>
            )}
          </h2>
          
          {unreadCount > 0 && (
            <Button variant="outline" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
        
        <TabsList className="mb-4">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          {showPreferences && (
            <TabsTrigger value="settings">Settings</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="all">
          {notificationList.length > 0 ? (
            <div className="space-y-4">
              {notificationList.map((notification) => (
                <div 
                  key={notification.id} 
                  className={`border rounded-lg p-4 transition-colors ${
                    !notification.read ? 'bg-foodly-50 border-foodly-100' : 'bg-white'
                  }`}
                >
                  <div className="flex">
                    <div className="mr-3">
                      {notification.image ? (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={notification.image} alt={notification.title} />
                          <AvatarFallback>
                            {getNotificationIcon(notification.type)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-foodly-900">{notification.title}</h4>
                          <p className="text-sm text-foodly-600 mt-1">{notification.message}</p>
                        </div>
                        
                        <button 
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-foodly-500">
                          {getTimeAgo(notification.date)}
                        </span>
                        
                        <div className="flex items-center gap-3">
                          {!notification.read && (
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-xs h-7 px-2"
                              onClick={() => markAsRead(notification.id)}
                            >
                              Mark as read
                            </Button>
                          )}
                          
                          {notification.actionLabel && (
                            <Button 
                              size="sm" 
                              className="text-xs h-7 px-2 bg-foodly-accent hover:bg-foodly-accent/90"
                            >
                              {notification.actionLabel}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 mx-auto text-foodly-200 mb-4" />
              <p className="text-foodly-600">You have no notifications.</p>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="unread">
          {notificationList.filter(n => !n.read).length > 0 ? (
            <div className="space-y-4">
              {notificationList.filter(n => !n.read).map((notification) => (
                <div 
                  key={notification.id} 
                  className="border border-foodly-100 rounded-lg p-4 bg-foodly-50"
                >
                  <div className="flex">
                    <div className="mr-3">
                      {notification.image ? (
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={notification.image} alt={notification.title} />
                          <AvatarFallback>
                            {getNotificationIcon(notification.type)}
                          </AvatarFallback>
                        </Avatar>
                      ) : (
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          {getNotificationIcon(notification.type)}
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium text-foodly-900">{notification.title}</h4>
                          <p className="text-sm text-foodly-600 mt-1">{notification.message}</p>
                        </div>
                        
                        <button 
                          onClick={() => deleteNotification(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between mt-3">
                        <span className="text-xs text-foodly-500">
                          {getTimeAgo(notification.date)}
                        </span>
                        
                        <div className="flex items-center gap-3">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-xs h-7 px-2"
                            onClick={() => markAsRead(notification.id)}
                          >
                            Mark as read
                          </Button>
                          
                          {notification.actionLabel && (
                            <Button 
                              size="sm" 
                              className="text-xs h-7 px-2 bg-foodly-accent hover:bg-foodly-accent/90"
                            >
                              {notification.actionLabel}
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Bell className="h-12 w-12 mx-auto text-foodly-200 mb-4" />
              <p className="text-foodly-600">You have no unread notifications.</p>
            </div>
          )}
        </TabsContent>
        
        {showPreferences && (
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Notification Types</h4>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <ShoppingBag className="h-4 w-4 text-blue-500" />
                        <label htmlFor="orderUpdates" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Order Updates
                        </label>
                      </div>
                      <Switch
                        id="orderUpdates"
                        checked={preferences.orderUpdates}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, orderUpdates: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Tag className="h-4 w-4 text-green-500" />
                        <label htmlFor="promotions" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Promotions & Discounts
                        </label>
                      </div>
                      <Switch
                        id="promotions"
                        checked={preferences.promotions}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, promotions: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <label htmlFor="reviewReminders" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          Review Reminders
                        </label>
                      </div>
                      <Switch
                        id="reviewReminders"
                        checked={preferences.reviewReminders}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, reviewReminders: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Bell className="h-4 w-4 text-gray-500" />
                        <label htmlFor="systemNotifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          System Notifications
                        </label>
                      </div>
                      <Switch
                        id="systemNotifications"
                        checked={preferences.systemNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, systemNotifications: checked})
                        }
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-3 pt-3 border-t">
                    <h4 className="font-medium text-sm">Notification Channels</h4>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="emailNotifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Email Notifications
                      </label>
                      <Switch
                        id="emailNotifications"
                        checked={preferences.emailNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, emailNotifications: checked})
                        }
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <label htmlFor="pushNotifications" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Push Notifications
                      </label>
                      <Switch
                        id="pushNotifications"
                        checked={preferences.pushNotifications}
                        onCheckedChange={(checked) => 
                          setPreferences({...preferences, pushNotifications: checked})
                        }
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  className="bg-foodly-accent hover:bg-foodly-accent/90 w-full" 
                  onClick={savePreferences}
                >
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Notifications;

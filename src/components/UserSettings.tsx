
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const UserSettings = () => {
  return (
    <div className="space-y-8">
      {/* Account Settings */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="md:col-span-2 h-0 md:h-auto"></div>
            <div>
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div>
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
          </div>
          <Button className="mt-2 bg-foodly-accent hover:bg-foodly-accent/90">Update Password</Button>
        </div>
      </div>

      <Separator />

      {/* Notification Preferences */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notifications" className="text-base">Email Notifications</Label>
              <p className="text-sm text-foodly-600">Receive updates about your orders via email</p>
            </div>
            <Switch id="email-notifications" defaultChecked />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="sms-notifications" className="text-base">SMS Notifications</Label>
              <p className="text-sm text-foodly-600">Receive updates about your orders via SMS</p>
            </div>
            <Switch id="sms-notifications" />
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="marketing-emails" className="text-base">Marketing Emails</Label>
              <p className="text-sm text-foodly-600">Receive offers, promotions, and newsletters</p>
            </div>
            <Switch id="marketing-emails" />
          </div>
        </div>
      </div>
      
      <Separator />
      
      {/* Delivery Addresses */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Delivery Addresses</h2>
        <div className="space-y-4">
          <div className="border p-4 rounded-lg">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Home</p>
                <p className="text-sm text-foodly-600">123 Main Street, Apt 4B</p>
                <p className="text-sm text-foodly-600">New York, NY 10001</p>
                <p className="text-sm text-foodly-600">+1 (555) 123-4567</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
              </div>
            </div>
          </div>
          <div className="border p-4 rounded-lg">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">Work</p>
                <p className="text-sm text-foodly-600">456 Corporate Blvd, Floor 22</p>
                <p className="text-sm text-foodly-600">New York, NY 10022</p>
                <p className="text-sm text-foodly-600">+1 (555) 987-6543</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
              </div>
            </div>
          </div>
          <Button variant="outline">+ Add New Address</Button>
        </div>
      </div>
      
      <Separator />
      
      {/* Payment Methods */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Payment Methods</h2>
        <div className="space-y-4">
          <div className="border p-4 rounded-lg">
            <div className="flex justify-between">
              <div>
                <p className="font-medium">•••• •••• •••• 4242</p>
                <p className="text-sm text-foodly-600">Visa • Expires 04/25</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">Edit</Button>
                <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">Delete</Button>
              </div>
            </div>
          </div>
          <Button variant="outline">+ Add New Payment Method</Button>
        </div>
      </div>
      
      <Separator />
      
      {/* Delete Account */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Delete Account</h2>
        <p className="text-foodly-600 mb-4">
          Once you delete your account, there is no going back. Please be certain.
        </p>
        <Button variant="outline" className="text-red-500 hover:bg-red-50 hover:text-red-600">
          Delete Account
        </Button>
      </div>
    </div>
  );
};

export default UserSettings;

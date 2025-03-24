
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const UserProfile = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b">
        <Avatar className="w-20 h-20">
          <AvatarImage src="https://ui.shadcn.com/avatars/01.png" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-2xl font-semibold">John Doe</h2>
          <p className="text-foodly-600">Member since June 2023</p>
          <Button variant="outline" size="sm" className="mt-2">
            Change Photo
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-foodly-800 mb-1">
            First Name
          </label>
          <Input defaultValue="John" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foodly-800 mb-1">
            Last Name
          </label>
          <Input defaultValue="Doe" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foodly-800 mb-1">
            Email Address
          </label>
          <Input defaultValue="john.doe@example.com" type="email" />
        </div>
        <div>
          <label className="block text-sm font-medium text-foodly-800 mb-1">
            Phone Number
          </label>
          <Input defaultValue="+1 (555) 123-4567" type="tel" />
        </div>
      </div>
      
      <div className="pt-4">
        <Button className="bg-foodly-accent hover:bg-foodly-accent/90">Save Changes</Button>
      </div>
    </div>
  );
};

export default UserProfile;

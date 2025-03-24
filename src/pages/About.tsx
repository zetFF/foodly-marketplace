
import React, { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { 
  Users, 
  Utensils, 
  Truck, 
  ShieldCheck, 
  Mail, 
  MapPin, 
  Phone 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="relative py-20 bg-foodly-50">
          <div className="foodly-container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className={`text-4xl md:text-5xl font-bold text-foodly-900 mb-6 transition-all duration-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                About Foodly
              </h1>
              <p className={`text-lg text-foodly-600 mb-10 transition-all duration-700 delay-100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Connecting food lovers with their favorite restaurants since 2023
              </p>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 110" className="w-full">
              <path 
                fill="#ffffff" 
                fillOpacity="1" 
                d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,110L1360,110C1280,110,1120,110,960,110C800,110,640,110,480,110C320,110,160,110,80,110L0,110Z"
              ></path>
            </svg>
          </div>
        </section>
        
        {/* Our Story Section */}
        <section className="py-16 bg-white">
          <div className="foodly-container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={`transition-all duration-700 delay-200 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
                <img 
                  src="https://images.unsplash.com/photo-1600685564330-21a0b44553cd?q=80&w=2670&auto=format&fit=crop" 
                  alt="Team at Foodly" 
                  className="rounded-xl shadow-lg w-full h-auto"
                />
              </div>
              
              <div className={`transition-all duration-700 delay-300 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}>
                <h2 className="text-3xl font-bold text-foodly-900 mb-6">Our Story</h2>
                <p className="text-foodly-600 mb-6">
                  Foodly was born out of a simple idea: make it easier for people to enjoy their favorite foods without the hassle of cooking or going out. What started as a small delivery service in 2023 has quickly grown into a platform connecting thousands of restaurants with hungry customers across the country.
                </p>
                <p className="text-foodly-600 mb-6">
                  Our mission is to transform the way people think about food delivery by providing an exceptional experience from order to doorstep. We believe that good food should be accessible to everyone, anytime, anywhere.
                </p>
                <p className="text-foodly-600">
                  With a team of passionate food lovers and tech enthusiasts, we're constantly innovating to make your dining experience even better.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Why Choose Us Section */}
        <section className="py-16 bg-foodly-50">
          <div className="foodly-container">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold text-foodly-900 mb-4 transition-all duration-700 delay-400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Why Choose Foodly
              </h2>
              <p className={`text-foodly-600 max-w-2xl mx-auto transition-all duration-700 delay-500 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                We're committed to providing the best food delivery experience
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* Feature 1 */}
              <div className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-700 delay-600 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <div className="w-12 h-12 bg-foodly-100 text-foodly-accent rounded-full flex items-center justify-center mb-4">
                  <Utensils className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foodly-900 mb-2">Quality Food</h3>
                <p className="text-foodly-600">
                  We partner with the best restaurants to ensure you get the highest quality food.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-700 delay-700 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <div className="w-12 h-12 bg-foodly-100 text-foodly-accent rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foodly-900 mb-2">Fast Delivery</h3>
                <p className="text-foodly-600">
                  Our efficient delivery network ensures your food arrives hot and fresh.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-700 delay-800 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <div className="w-12 h-12 bg-foodly-100 text-foodly-accent rounded-full flex items-center justify-center mb-4">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foodly-900 mb-2">Customer Support</h3>
                <p className="text-foodly-600">
                  Our dedicated team is always ready to assist you with any questions or concerns.
                </p>
              </div>
              
              {/* Feature 4 */}
              <div className={`bg-white p-6 rounded-xl shadow-sm transition-all duration-700 delay-900 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <div className="w-12 h-12 bg-foodly-100 text-foodly-accent rounded-full flex items-center justify-center mb-4">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-foodly-900 mb-2">Secure Payments</h3>
                <p className="text-foodly-600">
                  Multiple secure payment options for a worry-free ordering experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className="py-16 bg-white">
          <div className="foodly-container">
            <div className="text-center mb-12">
              <h2 className={`text-3xl font-bold text-foodly-900 mb-4 transition-all duration-700 delay-1000 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                Meet Our Team
              </h2>
              <p className={`text-foodly-600 max-w-2xl mx-auto transition-all duration-700 delay-1100 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}>
                The people behind Foodly working to make your food delivery experience amazing
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className={`text-center transition-all duration-700 delay-1200 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4 border-4 border-foodly-100">
                  <img 
                    src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2574&auto=format&fit=crop" 
                    alt="CEO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foodly-900 mb-1">John Doe</h3>
                <p className="text-foodly-accent mb-3">CEO & Founder</p>
                <p className="text-foodly-600 max-w-xs mx-auto">
                  John's vision and leadership have been the driving force behind Foodly's success.
                </p>
              </div>
              
              {/* Team Member 2 */}
              <div className={`text-center transition-all duration-700 delay-1300 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4 border-4 border-foodly-100">
                  <img 
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop" 
                    alt="COO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foodly-900 mb-1">Jane Smith</h3>
                <p className="text-foodly-accent mb-3">COO</p>
                <p className="text-foodly-600 max-w-xs mx-auto">
                  Jane oversees operations, ensuring every order is delivered promptly and accurately.
                </p>
              </div>
              
              {/* Team Member 3 */}
              <div className={`text-center transition-all duration-700 delay-1400 ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}>
                <div className="rounded-full overflow-hidden w-32 h-32 mx-auto mb-4 border-4 border-foodly-100">
                  <img 
                    src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2574&auto=format&fit=crop" 
                    alt="CTO" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-foodly-900 mb-1">Mike Johnson</h3>
                <p className="text-foodly-accent mb-3">CTO</p>
                <p className="text-foodly-600 max-w-xs mx-auto">
                  Mike leads our tech team, constantly improving the app for a seamless user experience.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Contact Section */}
        <section className="py-16 bg-foodly-50">
          <div className="foodly-container">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className={`transition-all duration-700 delay-1500 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}>
                <h2 className="text-3xl font-bold text-foodly-900 mb-6">Get In Touch</h2>
                <p className="text-foodly-600 mb-8">
                  We'd love to hear from you. Reach out to us with any questions, suggestions, or partnership inquiries.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-foodly-100 text-foodly-accent rounded-full flex items-center justify-center mr-4">
                      <MapPin className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foodly-900 mb-1">Our Location</h3>
                      <p className="text-foodly-600">123 Food Street, Tasty City, TC 12345</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-foodly-100 text-foodly-accent rounded-full flex items-center justify-center mr-4">
                      <Mail className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foodly-900 mb-1">Email Us</h3>
                      <p className="text-foodly-600">info@foodly.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-foodly-100 text-foodly-accent rounded-full flex items-center justify-center mr-4">
                      <Phone className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foodly-900 mb-1">Call Us</h3>
                      <p className="text-foodly-600">(123) 456-7890</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className={`transition-all duration-700 delay-1600 ${
                isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}>
                <form className="bg-white rounded-xl p-8 shadow-sm">
                  <div className="mb-6">
                    <label htmlFor="name" className="block text-foodly-900 font-medium mb-2">Your Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-3 border border-foodly-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-foodly-accent" 
                      placeholder="John Doe" 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="email" className="block text-foodly-900 font-medium mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-3 border border-foodly-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-foodly-accent" 
                      placeholder="john@example.com" 
                    />
                  </div>
                  
                  <div className="mb-6">
                    <label htmlFor="message" className="block text-foodly-900 font-medium mb-2">Your Message</label>
                    <textarea 
                      id="message" 
                      className="w-full px-4 py-3 border border-foodly-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-foodly-accent min-h-[150px]" 
                      placeholder="How can we help you?"
                    ></textarea>
                  </div>
                  
                  <Button className="w-full bg-foodly-accent hover:bg-foodly-accent/90">Send Message</Button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;

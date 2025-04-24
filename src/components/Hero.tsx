import React, { useState, useEffect } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative min-h-[90vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?q=80&w=2340&auto=format&fit=crop')",
            filter: "brightness(0.85)",
          }}></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="foodly-container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <span
            className={`inline-block px-4 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-medium mb-6 transform transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "200ms" }}>
            <span className="flex items-center justify-center">
              <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
              Pesan makanan dari 500+ restoran
            </span>
          </span>

          <h1
            className={`text-4xl md:text-6xl font-bold text-white mb-6 transform transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "400ms" }}>
            Makanan Lezat, <br />
            <span className="mt-2 bg-clip-text text-transparent bg-gradient-to-r from-white to-foodly-100">
              Dikirim dengan Cepat
            </span>
          </h1>

          <p
            className={`text-lg md:text-xl text-foodly-100 mb-8 max-w-2xl mx-auto transform transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "600ms" }}>
            Dari hidangan favorit lokal hingga hidangan internasional, dapatkan
            makanan yang Anda idam-idamkan diantarkan ke depan pintu Anda hanya
            dengan beberapa ketukan.
          </p>

          <div
            className={`flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto transform transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "800ms" }}>
            <div className="relative w-full sm:flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-foodly-500" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-transparent focus:border-foodly-accent focus:ring-0 focus:outline-none"
                placeholder="Masukkan alamat pengiriman Anda"
              />
            </div>
            <Button className="w-full sm:w-auto px-8 py-6 bg-foodly-accent hover:bg-foodly-accent/90 text-white rounded-full text-lg">
              <Search className="h-5 w-5 mr-2" />
              Temukan makanan
            </Button>
          </div>

          <div
            className={`flex flex-wrap justify-center gap-x-6 gap-y-2 mt-10 text-sm font-medium text-white/90 transform transition-all duration-500 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
            style={{ transitionDelay: "1000ms" }}>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-foodly-accent mr-2"></span>
              Pengiriman 30 menit
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-foodly-accent mr-2"></span>
              Gratis ongkos kirim untuk pesanan pertama
            </span>
            <span className="flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-foodly-accent mr-2"></span>
              500+ restoran
            </span>
          </div>
        </div>
      </div>

      {/* Wave overlay at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 110"
          className="w-full">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,110L1360,110C1280,110,1120,110,960,110C800,110,640,110,480,110C320,110,160,110,80,110L0,110Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Hero;

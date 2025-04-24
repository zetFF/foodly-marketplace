import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Clock, Star, MapPin, Tag } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RestaurantCardProps {
  id: number;
  name: string;
  image: string;
  cuisineType: string;
  rating: number;
  reviewCount: number;
  deliveryTime: string;
  deliveryFee: string;
  distance: string;
  priceLevel: string;
  promotion?: string;
  featured?: boolean;
  isNew?: boolean;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  id,
  name,
  image,
  cuisineType,
  rating,
  reviewCount,
  deliveryTime,
  deliveryFee,
  distance,
  priceLevel,
  promotion,
  featured = false,
  isNew = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = image;
    img.onload = () => setImageLoaded(true);
  }, [image]);

  return (
    <Link
      to={`/restaurant/${id}`}
      className={`block rounded-xl overflow-hidden transition-all duration-300 hover-lift bg-white ${
        featured
          ? "border-2 border-foodly-accent/30"
          : "border border-foodly-200"
      }`}>
      <div className="relative">
        {/* Restaurant Image */}
        <div className="relative aspect-[4/3] overflow-hidden bg-foodly-200">
          <div
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            }`}
            style={{ backgroundImage: `url(${image})` }}></div>

          {!imageLoaded && (
            <div className="absolute inset-0 bg-foodly-200 animate-pulse"></div>
          )}

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {featured && (
              <Badge className="bg-foodly-accent text-white border-none">
                Featured
              </Badge>
            )}

            {isNew && (
              <Badge className="bg-foodly-secondary text-white border-none">
                New
              </Badge>
            )}
          </div>

          {/* Promotion tag */}
          {promotion && (
            <div className="absolute bottom-3 left-3 right-3">
              <div className="px-3 py-1.5 bg-black/75 backdrop-blur-sm rounded-lg text-white text-sm flex items-center">
                <Tag className="h-3.5 w-3.5 mr-1.5" />
                {promotion}
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg text-foodly-900 line-clamp-1">
              {name}
            </h3>
            <div className="flex items-center text-sm font-medium">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
              <span>{rating}</span>
              <span className="text-foodly-500 ml-1">({reviewCount})</span>
            </div>
          </div>

          <div className="flex items-center text-sm text-foodly-600 mb-3">
            <span>{cuisineType}</span>
            <span className="mx-1.5">•</span>
            <span>{priceLevel}</span>
          </div>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-3 text-xs text-foodly-700">
            <div className="flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              {deliveryTime}
            </div>

            <div className="flex items-center">
              <MapPin className="h-3.5 w-3.5 mr-1" />
              {distance}
            </div>

            <div
              className={`flex items-center ${
                deliveryFee === "Free Delivery"
                  ? "text-foodly-accent font-medium"
                  : ""
              }`}>
              {deliveryFee === "Free Delivery"
                ? "Free Delivery"
                : `Delivery: ${deliveryFee}`}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;

import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";

// Sample restaurant data
const restaurants = [
  {
    id: 1,
    name: "Burger & Beyond",
    image:
      "https://res.cloudinary.com/dmq4cmdqg/image/upload/v1745473331/fg6hwmc69yklyaq21p31.jpg",
    cuisineType: "American",
    rating: 4.8,
    reviewCount: 243,
    deliveryTime: "15-25 min",
    deliveryFee: "Free Delivery",
    distance: "",
    priceLevel: "$$",
    promotion: "20% OFF your first order",
    featured: true,
    isNew: false,
  },
  {
    id: 2,
    name: "Sushi Paradise",
    image:
      "https://res.cloudinary.com/dmq4cmdqg/image/upload/v1745473313/rln6bywafsepmdfpg7ro.jpg",
    cuisineType: "Japanese",
    rating: 4.9,
    reviewCount: 186,
    deliveryTime: "25-35 min",
    deliveryFee: "$2.99",
    distance: "",
    priceLevel: "$$$",
    promotion: null,
    featured: true,
    isNew: false,
  },
  {
    id: 3,
    name: "Pizza Roma",
    image:
      "https://res.cloudinary.com/dmq4cmdqg/image/upload/v1745473328/z9kjrjpot0anphbecah2.jpg",
    cuisineType: "Italian",
    rating: 4.6,
    reviewCount: 318,
    deliveryTime: "20-30 min",
    deliveryFee: "Free Delivery",
    distance: "",
    priceLevel: "$$",
    promotion: "Buy 1 Get 1 Free on Tuesdays",
    featured: false,
    isNew: true,
  },
  {
    id: 4,
    name: "Taco Fiesta",
    image:
      "https://res.cloudinary.com/dmq4cmdqg/image/upload/v1745473311/k0mlfjcrvgijaodcxvsj.jpg",
    cuisineType: "Mexican",
    rating: 4.7,
    reviewCount: 154,
    deliveryTime: "15-25 min",
    deliveryFee: "$1.99",
    distance: "",
    priceLevel: "$",
    promotion: null,
    featured: false,
    isNew: false,
  },
  {
    id: 5,
    name: "kue lumpur, roti calzon",
    image:
      "https://res.cloudinary.com/dmq4cmdqg/image/upload/v1745473327/ch5iynaw5sk5rivyfvdj.jpg",
    cuisineType: "Thai",
    rating: 4.5,
    reviewCount: 208,
    deliveryTime: "25-40 min",
    deliveryFee: "$3.99",
    distance: "",
    priceLevel: "$$",
    promotion: null,
    featured: false,
    isNew: true,
  },
  {
    id: 6,
    name: "Golden Dragon",
    image:
      "https://res.cloudinary.com/dmq4cmdqg/image/upload/v1745473326/ncimjuwmar3vuawmdumi.jpg",
    cuisineType: "Chinese",
    rating: 4.4,
    reviewCount: 276,
    deliveryTime: "20-35 min",
    deliveryFee: "$2.49",
    distance: "",
    priceLevel: "$$",
    promotion: "10% OFF orders over $30",
    featured: false,
    isNew: false,
  },
  // New restaurants added
  {
    id: 7,
    name: "Roll bread coklat keju",
    image:
      "https://res.cloudinary.com/dmq4cmdqg/image/upload/v1745473312/iiij54ojdaranwfd9nhs.jpg",
    cuisineType: "Mediterranean",
    rating: 4.7,
    reviewCount: 189,
    deliveryTime: "20-35 min",
    deliveryFee: "$1.99",
    distance: "",
    priceLevel: "$$",
    promotion: "Free appetizer with orders over $40",
    featured: true,
    isNew: false,
  },
  {
    id: 8,
    name: "Seoul BBQ House",
    image:
      "https://res.cloudinary.com/dmq4cmdqg/image/upload/v1745473325/a4xsjbdxkp15qtiyt5eh.jpg",
    cuisineType: "Korean",
    rating: 4.6,
    reviewCount: 205,
    deliveryTime: "30-45 min",
    deliveryFee: "$3.49",
    distance: "",
    priceLevel: "$$$",
    promotion: null,
    featured: false,
    isNew: true,
  },
  {
    id: 9,
    name: "Farm to Table",
    image:
      "https://res.cloudinary.com/dmq4cmdqg/image/upload/v1745473325/e5hfaj2yaxlxvty8uytz.jpg",
    cuisineType: "American",
    rating: 4.8,
    reviewCount: 176,
    deliveryTime: "25-40 min",
    deliveryFee: "$2.99",
    distance: "",
    priceLevel: "$$$",
    promotion: "20% OFF weekend brunch",
    featured: true,
    isNew: false,
  },
  {
    id: 10,
    name: "Pho Delicious",
    image:
      "https://res.cloudinary.com/dmq4cmdqg/image/upload/v1745473324/vsipsjgfrysqcrgzhtjk.jpg",
    cuisineType: "Vietnamese",
    rating: 4.5,
    reviewCount: 143,
    deliveryTime: "20-30 min",
    deliveryFee: "$1.99",
    distance: "",
    priceLevel: "$$",
    promotion: null,
    featured: false,
    isNew: false,
  },
];

interface FeaturedRestaurantsProps {
  columns?: 2 | 3 | 4 | 5 | 6;
}

const FeaturedRestaurants: React.FC<FeaturedRestaurantsProps> = ({
  columns = 6,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("featured-restaurants");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  // Map columns to specific tailwind classes
  const getGridColumns = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
      case 4:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
      case 5:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5";
      case 6:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
      default:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6";
    }
  };

  return (
    <div id="featured-restaurants" className="py-16 bg-foodly-50">
      <div className="foodly-container">
        <div className="mb-12 text-center">
          <h2
            className={`text-3xl font-bold text-foodly-900 mb-3 transition-all duration-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}>
            Restoran Populer di Dekat Anda
          </h2>
          <p
            className={`text-foodly-600 max-w-2xl mx-auto transition-all duration-700 delay-100 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}>
            Temukan restoran yang paling disukai di daerah Anda dengan waktu
            pengantaran tercepat
          </p>
        </div>

        <div className={`grid ${getGridColumns()} gap-4`}>
          {restaurants.map((restaurant, index) => (
            <div
              key={restaurant.id}
              className={`transition-all duration-700 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              style={{ transitionDelay: `${100 + index * 100}ms` }}>
              <RestaurantCard {...restaurant} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedRestaurants;

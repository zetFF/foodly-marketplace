
import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const categories = [
  { id: 1, name: 'All', icon: '🍽️' },
  { id: 2, name: 'Pizza', icon: '🍕' },
  { id: 3, name: 'Burgers', icon: '🍔' },
  { id: 4, name: 'Sushi', icon: '🍣' },
  { id: 5, name: 'Italian', icon: '🍝' },
  { id: 6, name: 'Mexican', icon: '🌮' },
  { id: 7, name: 'Chinese', icon: '🥡' },
  { id: 8, name: 'Thai', icon: '🍲' },
  { id: 9, name: 'Indian', icon: '🍛' },
  { id: 10, name: 'Dessert', icon: '🍰' },
  { id: 11, name: 'Vegan', icon: '🥗' },
  { id: 12, name: 'Healthy', icon: '🥑' },
];

interface CategorySelectorProps {
  onCategoryChange?: (categoryId: number) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ onCategoryChange }) => {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };
  
  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };
  
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      const newScrollLeft = direction === 'left' 
        ? scrollContainerRef.current.scrollLeft - scrollAmount 
        : scrollContainerRef.current.scrollLeft + scrollAmount;
        
      scrollContainerRef.current.scrollTo({
        left: newScrollLeft,
        behavior: 'smooth'
      });
      
      setTimeout(checkScroll, 400);
    }
  };

  return (
    <div className="relative py-8">
      <div className="foodly-container">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-foodly-900">Browse by Category</h2>
          <p className="mt-2 text-foodly-600">Explore restaurants by your favorite cuisine</p>
        </div>
        
        <div className="relative">
          {/* Left scroll button */}
          {canScrollLeft && (
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 border border-foodly-200 shadow-md hover:bg-white"
              onClick={() => scroll('left')}
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
          )}
          
          {/* Category list */}
          <div 
            ref={scrollContainerRef}
            className="flex items-center space-x-3 overflow-x-auto scrollbar-hide py-4 px-2"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            onScroll={checkScroll}
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`flex flex-col items-center space-y-2 px-6 py-4 rounded-xl transition-all duration-300 ${
                  selectedCategory === category.id 
                    ? 'bg-foodly-accent text-white shadow-lg shadow-foodly-accent/20' 
                    : 'bg-white hover:bg-foodly-100 text-foodly-800 border border-foodly-200'
                }`}
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="whitespace-nowrap font-medium">{category.name}</span>
              </button>
            ))}
          </div>
          
          {/* Right scroll button */}
          {canScrollRight && (
            <Button 
              variant="outline" 
              size="icon" 
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 rounded-full bg-white/90 border border-foodly-200 shadow-md hover:bg-white"
              onClick={() => scroll('right')}
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategorySelector;

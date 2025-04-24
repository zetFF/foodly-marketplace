
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductDetailsProps {}

const ProductDetails: React.FC<ProductDetailsProps> = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample product data - in a real app, this would come from an API or props
  const product = {
    id: parseInt(id || '0'),
    name: "Grilled Salmon Bowl",
    description: "Fresh grilled salmon served with brown rice and seasonal vegetables. Our signature dish combines perfectly cooked salmon with a medley of fresh vegetables and our house-made sauce.",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?q=80&w=2574&auto=format&fit=crop",
    price: 17.99,
    rating: 4.7,
    reviewCount: 183,
    category: "Healthy",
    featured: true,
    timeEstimate: "20-25 min",
    badges: ["Organic", "High Protein"],
    nutritionalInfo: {
      calories: 520,
      protein: "32g",
      carbs: "48g",
      fat: "22g"
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="foodly-container py-8">
        <Button 
          variant="ghost" 
          className="mb-6"
          onClick={handleBack}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="relative">
            <img 
              src={product.image}
              alt={product.name}
              className="w-full h-[400px] object-cover rounded-xl"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <h1 className="text-3xl font-bold text-foodly-900 mb-2">
                {product.name}
              </h1>
              <p className="text-foodly-600">
                {product.description}
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="ml-1 font-medium">{product.rating}</span>
                <span className="mx-1 text-foodly-400">•</span>
                <span className="text-sm text-foodly-500">
                  {product.reviewCount} reviews
                </span>
              </div>
              <div className="flex items-center text-foodly-600">
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm">{product.timeEstimate}</span>
              </div>
            </div>

            {/* Badges */}
            {product.badges && (
              <div className="flex flex-wrap gap-2">
                {product.badges.map(badge => (
                  <Badge key={badge} variant="secondary">
                    {badge}
                  </Badge>
                ))}
              </div>
            )}

            {/* Nutritional Info */}
            <div className="border rounded-lg p-4 space-y-2">
              <h3 className="font-semibold text-foodly-900">Nutritional Information</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-foodly-600 text-sm">Calories</p>
                  <p className="font-semibold">{product.nutritionalInfo.calories}</p>
                </div>
                <div>
                  <p className="text-foodly-600 text-sm">Protein</p>
                  <p className="font-semibold">{product.nutritionalInfo.protein}</p>
                </div>
                <div>
                  <p className="text-foodly-600 text-sm">Carbs</p>
                  <p className="font-semibold">{product.nutritionalInfo.carbs}</p>
                </div>
                <div>
                  <p className="text-foodly-600 text-sm">Fat</p>
                  <p className="font-semibold">{product.nutritionalInfo.fat}</p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-6 border-t">
              <div className="text-2xl font-bold text-foodly-900">
                ${product.price.toFixed(2)}
              </div>
              <Button className="bg-foodly-accent hover:bg-foodly-accent/90">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

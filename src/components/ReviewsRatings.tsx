
import React, { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface Review {
  id: string;
  userName: string;
  userImage?: string;
  rating: number;
  date: string;
  comment: string;
  helpful: number;
  userHasMarkedHelpful: boolean;
}

interface ReviewsRatingsProps {
  restaurantId?: string;
  productId?: string;
  reviews?: Review[];
  showReviewForm?: boolean;
}

const sampleReviews: Review[] = [
  {
    id: "r1",
    userName: "Sarah Johnson",
    userImage: "https://i.pravatar.cc/150?img=1",
    rating: 5,
    date: "June 15, 2023",
    comment: "The food was absolutely delicious! Fast delivery and everything was still hot when it arrived. Will definitely order again!",
    helpful: 12,
    userHasMarkedHelpful: false
  },
  {
    id: "r2",
    userName: "Michael Chen",
    userImage: "https://i.pravatar.cc/150?img=2",
    rating: 4,
    date: "June 10, 2023",
    comment: "Great taste and portions were generous. Delivery was a bit slow but food quality made up for it.",
    helpful: 8,
    userHasMarkedHelpful: true
  },
  {
    id: "r3",
    userName: "Jessica Smith",
    rating: 3,
    date: "June 5, 2023",
    comment: "Food was good but some items were missing from my order. Customer service was helpful though.",
    helpful: 3,
    userHasMarkedHelpful: false
  }
];

const ReviewsRatings: React.FC<ReviewsRatingsProps> = ({ 
  restaurantId,
  productId, 
  reviews = sampleReviews,
  showReviewForm = true
}) => {
  const [reviewsList, setReviewsList] = useState<Review[]>(reviews);
  const [userRating, setUserRating] = useState<number>(0);
  const [userComment, setUserComment] = useState<string>('');
  const [hoverRating, setHoverRating] = useState<number>(0);
  const { toast } = useToast();
  
  const markHelpful = (reviewId: string) => {
    setReviewsList(reviewsList.map(review => {
      if (review.id === reviewId) {
        if (!review.userHasMarkedHelpful) {
          return { 
            ...review, 
            helpful: review.helpful + 1, 
            userHasMarkedHelpful: true 
          };
        } else {
          return { 
            ...review, 
            helpful: review.helpful - 1, 
            userHasMarkedHelpful: false 
          };
        }
      }
      return review;
    }));
  };
  
  const submitReview = () => {
    if (userRating === 0) {
      toast({
        title: "Rating Required",
        description: "Please select a star rating before submitting",
        variant: "destructive",
      });
      return;
    }
    
    if (userComment.trim() === '') {
      toast({
        title: "Comment Required",
        description: "Please write a review comment before submitting",
        variant: "destructive",
      });
      return;
    }
    
    const newReview: Review = {
      id: `r${Date.now()}`,
      userName: "You",
      rating: userRating,
      date: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      comment: userComment,
      helpful: 0,
      userHasMarkedHelpful: false
    };
    
    setReviewsList([newReview, ...reviewsList]);
    setUserRating(0);
    setUserComment('');
    
    toast({
      title: "Review Submitted",
      description: "Thank you for sharing your feedback!",
    });
  };
  
  // Calculate average rating
  const averageRating = reviewsList.reduce((acc, review) => acc + review.rating, 0) / reviewsList.length;
  
  // Rating distribution
  const ratingCounts = [0, 0, 0, 0, 0];
  reviewsList.forEach(review => {
    ratingCounts[review.rating - 1]++;
  });
  
  return (
    <div className="space-y-8">
      {/* Summary Section */}
      <div className="flex flex-col md:flex-row gap-6 bg-foodly-50 p-4 rounded-lg">
        <div className="flex flex-col items-center justify-center">
          <div className="text-4xl font-bold text-foodly-900">{averageRating.toFixed(1)}</div>
          <div className="flex items-center mt-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star 
                key={star} 
                className={`h-5 w-5 ${
                  star <= Math.round(averageRating) 
                    ? "fill-yellow-400 text-yellow-400" 
                    : "text-gray-300"
                }`} 
              />
            ))}
          </div>
          <div className="text-sm text-foodly-600 mt-1">{reviewsList.length} reviews</div>
        </div>
        
        <div className="flex-1">
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center">
                  <span className="text-sm font-medium w-3">{rating}</span>
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 ml-1" />
                </div>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-yellow-400 rounded-full"
                    style={{ width: `${(ratingCounts[rating - 1] / reviewsList.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 w-8">
                  {ratingCounts[rating - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Review Form */}
      {showReviewForm && (
        <div className="border rounded-lg p-4">
          <h3 className="font-semibold mb-3">Write a Review</h3>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <span className="mr-2 text-sm">Your Rating:</span>
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star 
                    key={star} 
                    className={`h-6 w-6 cursor-pointer transition-colors ${
                      star <= (hoverRating || userRating) 
                        ? "fill-yellow-400 text-yellow-400" 
                        : "text-gray-300 hover:text-yellow-400"
                    }`} 
                    onClick={() => setUserRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                  />
                ))}
              </div>
            </div>
            <Textarea 
              placeholder="Share your experience..."
              value={userComment}
              onChange={(e) => setUserComment(e.target.value)}
              className="min-h-[100px]"
            />
          </div>
          <Button 
            className="bg-foodly-accent hover:bg-foodly-accent/90"
            onClick={submitReview}
          >
            Submit Review
          </Button>
        </div>
      )}
      
      {/* Reviews List */}
      <div className="space-y-6">
        <h3 className="font-semibold">Customer Reviews</h3>
        
        {reviewsList.length > 0 ? (
          <div className="space-y-6">
            {reviewsList.map((review) => (
              <div key={review.id} className="border-b pb-6 last:border-b-0">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      {review.userImage ? (
                        <AvatarImage src={review.userImage} alt={review.userName} />
                      ) : (
                        <AvatarFallback>
                          <User className="h-5 w-5" />
                        </AvatarFallback>
                      )}
                    </Avatar>
                    <div>
                      <div className="font-medium">{review.userName}</div>
                      <div className="text-xs text-foodly-500">{review.date}</div>
                    </div>
                  </div>
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star 
                        key={star} 
                        className={`h-4 w-4 ${
                          star <= review.rating 
                            ? "fill-yellow-400 text-yellow-400" 
                            : "text-gray-300"
                        }`} 
                      />
                    ))}
                  </div>
                </div>
                
                <p className="my-3 text-foodly-700">{review.comment}</p>
                
                <div className="flex items-center mt-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`text-xs flex items-center gap-1 ${
                      review.userHasMarkedHelpful ? 'text-foodly-accent' : 'text-foodly-600'
                    }`}
                    onClick={() => markHelpful(review.id)}
                  >
                    <ThumbsUp className="h-3.5 w-3.5" />
                    Helpful ({review.helpful})
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 mx-auto text-foodly-200 mb-4" />
            <p className="text-foodly-600">No reviews yet. Be the first to share your experience!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsRatings;

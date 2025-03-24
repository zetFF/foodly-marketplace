
import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-card text-card-foreground shadow-sm transition-all duration-300 hover:shadow-md",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight group-hover:text-foodly-accent transition-colors",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground line-clamp-2", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0 border-t border-foodly-100", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const CardImage = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { aspectRatio?: "square" | "portrait" | "landscape" }
>(({ className, aspectRatio = "landscape", ...props }, ref) => {
  const aspectRatioClass = React.useMemo(() => {
    switch (aspectRatio) {
      case "square": return "aspect-square";
      case "portrait": return "aspect-[3/4]";
      case "landscape":
      default: return "aspect-[4/3]";
    }
  }, [aspectRatio]);

  return (
    <div 
      ref={ref} 
      className={cn(
        "relative overflow-hidden bg-foodly-100", 
        aspectRatioClass,
        className
      )} 
      {...props} 
    />
  );
})
CardImage.displayName = "CardImage"

const CardBadge = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { 
    variant?: "featured" | "new" | "sale" | "custom";
    position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
    salePercentage?: number;
  }
>(({ 
  className, 
  variant = "custom", 
  position = "top-left",
  salePercentage,
  children,
  ...props 
}, ref) => {
  const positionClass = React.useMemo(() => {
    switch (position) {
      case "top-right": return "top-3 right-3";
      case "bottom-left": return "bottom-3 left-3";
      case "bottom-right": return "bottom-3 right-3";
      case "top-left":
      default: return "top-3 left-3";
    }
  }, [position]);

  const variantClass = React.useMemo(() => {
    switch (variant) {
      case "featured": return "bg-foodly-accent text-white";
      case "new": return "bg-foodly-secondary text-white";
      case "sale": return "bg-red-500 text-white";
      case "custom":
      default: return "bg-foodly-800 text-white";
    }
  }, [variant]);

  let badgeContent = children;
  if (variant === "sale" && salePercentage) {
    badgeContent = `${salePercentage}% OFF`;
  } else if (variant === "featured" && !children) {
    badgeContent = "Featured";
  } else if (variant === "new" && !children) {
    badgeContent = "New";
  }

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-10 text-xs font-semibold px-2 py-1 rounded-md",
        positionClass,
        variantClass,
        className
      )}
      {...props}
    >
      {badgeContent}
    </div>
  );
})
CardBadge.displayName = "CardBadge"

const CardRating = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement> & { 
    rating?: number;
    reviewCount?: number;
    showCount?: boolean;
    size?: "sm" | "md" | "lg";
  }
>(({ 
  className, 
  rating = 0, 
  reviewCount = 0,
  showCount = true,
  size = "md",
  ...props 
}, ref) => {
  const sizeClass = React.useMemo(() => {
    switch (size) {
      case "sm": return "text-xs";
      case "lg": return "text-base";
      case "md":
      default: return "text-sm";
    }
  }, [size]);

  const starSizeClass = React.useMemo(() => {
    switch (size) {
      case "sm": return "h-3 w-3";
      case "lg": return "h-5 w-5";
      case "md":
      default: return "h-4 w-4";
    }
  }, [size]);

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center", 
        sizeClass,
        className
      )}
      {...props}
    >
      <div className="flex items-center">
        <svg 
          className={cn("fill-yellow-400 text-yellow-400", starSizeClass)}
          xmlns="http://www.w3.org/2000/svg" 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
        <span className="ml-1 font-medium">{rating.toFixed(1)}</span>
      </div>
      
      {showCount && reviewCount > 0 && (
        <>
          <span className="mx-1 text-foodly-400">•</span>
          <span className="text-foodly-500">{reviewCount} reviews</span>
        </>
      )}
    </div>
  );
})
CardRating.displayName = "CardRating"

const CardPrice = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    price: number;
    salePrice?: number;
    currency?: string;
    size?: "sm" | "md" | "lg";
  }
>(({
  className,
  price,
  salePrice,
  currency = "$",
  size = "md",
  ...props
}, ref) => {
  const sizeClass = React.useMemo(() => {
    switch (size) {
      case "sm": return "text-xs";
      case "lg": return "text-xl";
      case "md":
      default: return "text-base";
    }
  }, [size]);

  const formatPrice = (amount: number) => {
    return amount.toFixed(2);
  };

  const hasDiscount = salePrice !== undefined && salePrice < price;

  return (
    <div
      ref={ref}
      className={cn(
        "font-semibold",
        hasDiscount ? "flex flex-col items-end" : "",
        sizeClass,
        className
      )}
      {...props}
    >
      {hasDiscount ? (
        <>
          <span className="text-xs line-through text-foodly-500">
            {currency}{formatPrice(price)}
          </span>
          <span className="font-bold text-red-500">
            {currency}{formatPrice(salePrice)}
          </span>
        </>
      ) : (
        <span className="font-bold text-foodly-900">{currency}{formatPrice(price)}</span>
      )}
    </div>
  );
})
CardPrice.displayName = "CardPrice"

export { 
  Card, 
  CardHeader, 
  CardFooter, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardImage,
  CardBadge,
  CardRating,
  CardPrice
}

import React, { useState } from "react";
import { Percent, Tag, Copy, Check, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Promotion {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue?: number;
  validUntil: string;
  isSpecial?: boolean;
}

interface PromotionsDiscountsProps {
  showApplyForm?: boolean;
}

const samplePromotions: Promotion[] = [
  {
    id: "promo1",
    code: "WELCOME15",
    title: "Diskon 15% untuk Pesanan Pertama Anda",
    description:
      "Pelanggan baru mendapatkan diskon 15% untuk pesanan pertama mereka di atas $ 20.",
    discountType: "percentage",
    discountValue: 15,
    minOrderValue: 20,
    validUntil: "2023-12-31",
    isSpecial: true,
  },
  {
    id: "promo2",
    code: "FREESHIP",
    title: "Free Delivery",
    description: "Free delivery on all orders above $30.",
    discountType: "fixed",
    discountValue: 5,
    minOrderValue: 30,
    validUntil: "2023-11-30",
  },
  {
    id: "promo3",
    code: "WEEKEND25",
    title: "Weekend Special: 25% Off",
    description: "Get 25% off on all orders during weekends.",
    discountType: "percentage",
    discountValue: 25,
    validUntil: "2023-10-31",
  },
];

const PromotionsDiscounts: React.FC<PromotionsDiscountsProps> = ({
  showApplyForm = true,
}) => {
  const [promotions] = useState<Promotion[]>(samplePromotions);
  const [promoCode, setPromoCode] = useState<string>("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const { toast } = useToast();

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);

      toast({
        title: "Code Copied!",
        description: `${code} has been copied to your clipboard.`,
      });
    });
  };

  const applyPromoCode = () => {
    if (!promoCode.trim()) {
      toast({
        title: "Error",
        description: "Please enter a promo code",
        variant: "destructive",
      });
      return;
    }

    const foundPromo = promotions.find(
      (promo) => promo.code.toLowerCase() === promoCode.toLowerCase()
    );

    if (foundPromo) {
      toast({
        title: "Success!",
        description: `${foundPromo.code} applied. You saved ${
          foundPromo.discountType === "percentage"
            ? `${foundPromo.discountValue}%`
            : `$${foundPromo.discountValue}`
        }!`,
      });
    } else {
      toast({
        title: "Invalid Code",
        description: "This promo code is invalid or has expired.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Apply Promo Code Section */}
      {showApplyForm && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center">
              <Tag className="h-5 w-5 mr-2 text-foodly-accent" />
              Apply Promo Code
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Input
                placeholder="Enter promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                className="flex-1"
              />
              <Button
                className="bg-foodly-accent hover:bg-foodly-accent/90"
                onClick={applyPromoCode}>
                Apply
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Promotions */}
      <div>
        <h3 className="font-semibold text-lg mb-4">Promosi yang Tersedia</h3>

        <div className="space-y-4">
          {promotions.map((promo) => (
            <div
              key={promo.id}
              className={`border rounded-lg overflow-hidden ${
                promo.isSpecial
                  ? "border-foodly-accent border-2"
                  : "border-gray-200"
              }`}>
              <div className="flex flex-col sm:flex-row">
                <div
                  className={`sm:w-24 p-4 flex items-center justify-center 
                  ${promo.isSpecial ? "bg-foodly-accent/10" : "bg-gray-50"}`}>
                  <div className="text-center">
                    <Percent
                      className={`h-8 w-8 mx-auto ${
                        promo.isSpecial
                          ? "text-foodly-accent"
                          : "text-foodly-600"
                      }`}
                    />
                    <span className="block text-sm font-semibold mt-1">
                      {promo.discountType === "percentage"
                        ? `${promo.discountValue}% OFF`
                        : `$${promo.discountValue} OFF`}
                    </span>
                  </div>
                </div>

                <div className="flex-1 p-4">
                  <div className="flex flex-col h-full justify-between">
                    <div>
                      <h4 className="font-semibold">{promo.title}</h4>
                      <p className="text-sm text-foodly-600 mt-1">
                        {promo.description}
                      </p>

                      {promo.minOrderValue && (
                        <div className="flex items-center mt-2 text-xs text-foodly-500">
                          <AlertCircle className="h-3.5 w-3.5 mr-1" />
                          Min. order: ${promo.minOrderValue}
                        </div>
                      )}
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="text-xs text-foodly-500">
                        Valid until{" "}
                        {new Date(promo.validUntil).toLocaleDateString()}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="text-xs h-8"
                        onClick={() => copyToClipboard(promo.code)}>
                        <span className="font-mono font-bold">
                          {promo.code}
                        </span>
                        {copiedCode === promo.code ? (
                          <Check className="ml-1.5 h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="ml-1.5 h-3.5 w-3.5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PromotionsDiscounts;

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const ProductBadge = ({
  kaigloSale,
  discount,
  type,
  className,
}: {
  kaigloSale?: string;
  discount?: number;
  type: string;
  className?: string;
}) => {
  const getBadgeText = (kaigloSale: string) => {
    switch (kaigloSale) {
      case "GROUP_BUY":
        return "Group Buy";
      case "APP_ONLY_DEALS":
        return "App Deal";
      case "BLACK_FRIDAY":
        return "Black Friday";
      case "11:11":
        return "11:11";
      case "CLEARANCE":
        return "Clearance";
      case "EMBER":
        return "Ember";
      case "EASTER":
        return "Easter";
      case "BACK_TO_SCHOOL":
        return "Back to School";
      case "RAMADAN":
        return "Ramadan";
      case "MOTHER'S_DAY":
        return "Mother's Day";
      case "PAYDAY_DEALS":
        return "Payday Deals";
      case "WEEKEND":
        return "Weekend";
      case "FLASH_SALES":
        return "Flash Sales";
      case "KAIGLO_ANNIVERSARY":
        return "Kaiglo Anniversary";
      case "HAPPY_HOUR":
        return "Happy Hour";
      case "BUZZ_ALERT":
        return "Buzz Alert";
      default:
        return "";
    }
  };

  const getBadgeVariant = (kaigloSale: string) => {
    switch (kaigloSale) {
      case "GROUP_BUY":
        return "attention_solid";
      case "APP_ONLY_DEALS":
        return "info_solid";
      case "DISCOUNTED_SALES":
        return "accent";
      default:
        return "ghost";
    }
  };

  return (
    <div className={cn("flex flex-col space-y-1", className)}>
      {discount &&
      discount > 0 &&
      typeof discount !== "undefined" &&
      discount !== null ? (
        <Badge variant={getBadgeVariant(type)} className="w-fit uppercase">
          {discount.toFixed(0)}% off
        </Badge>
      ) : null}

      {kaigloSale && (
        <Badge variant={getBadgeVariant(type)} className="w-fit">
          {getBadgeText(kaigloSale as string)}
        </Badge>
      )}
    </div>
  );
};
export default ProductBadge;

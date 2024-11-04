import { Button } from "@/components/ui/button";
import { ModifiedButtonProps } from "@/interfaces/elements.interface";
import { cn } from "@/lib/utils";

const ModifiedButton = ({
  value,
  className,
  variant,
  onClick,
  disabled,
  type,
  id,
}: ModifiedButtonProps) => {
  return (
    <Button
      type={type}
      className={cn("w-full h-12", className)}
      variant={variant}
      onClick={onClick}
      disabled={disabled}
      id={id}
    >
      {value}
    </Button>
  );
};
export default ModifiedButton;

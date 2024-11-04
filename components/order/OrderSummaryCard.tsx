import { IOrderSummary } from "@/interfaces/orders/orderSummary.interface";
import Image from "next/image";
import { OrderStatus } from "@/enums/orderStatus.enum";
import Link from "next/link";
import ModifiedBadge from "../shared/ModifiedBadge";
import { truncate } from "@/lib/utils";
import Placeholder from "@/public/images/product-image-placeholder.png";

const OrderSummaryCard: React.FC<IOrderSummary> = (order) => {
  return (
    <Link href={`/app/orders/${order.id}`}>
      <div className="flex lg:border lg:rounded-lg py-4 px-3 space-x-4 cursor-pointer">
        <Image
          src={order.image || Placeholder}
          alt={order.title}
          width={112}
          height={112}
          className="w-28 h-28 object-cover rounded-lg"
        />
        <div className="text-sm gap-y-1 flex flex-col justify-center">
          <h2 className="lg:hidden">{truncate(order.title, 20)}</h2>
          <h2 className="hidden lg:block">{order.title}</h2>
          <p className=" text-kaiglo_grey-placeholder">
            Order: {order.orderNumber}
          </p>
          <p className="font-bold">₦{order.price.toLocaleString()}</p>
          <ModifiedBadge status={order?.status as OrderStatus} />
        </div>
      </div>
    </Link>
  );
};
export default OrderSummaryCard;

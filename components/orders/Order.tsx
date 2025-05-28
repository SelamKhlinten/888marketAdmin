import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { MoreVertical } from "lucide-react";
import Image from "next/image";

import OrderType from "./type";
import { formatDate } from "@/lib/utils";

interface OrderComponentProps {
  order: OrderType;
  key: number;
}

export default function Order({ order }: OrderComponentProps) {
  const {
    id,
    status,
    createdAt,
    product: {
      name,
      price: { amount, currency },
    },
    customer: { name: customerName, email, img_url: imgUrl },
  } = order;
  const date = formatDate(createdAt);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600 hover:bg-green-100";
      case "Processing":
        return "bg-blue-100 text-blue-600 hover:bg-blue-100";
      case "Shipped":
        return "bg-blue-100 text-blue-600 hover:bg-blue-100";
      case "Cancelled":
        return "bg-red-100 text-red-600 hover:bg-red-100";
      case "Refunded":
        return "bg-yellow-100 text-yellow-600 hover:bg-yellow-100";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-100";
    }
  };
  return (
    <tr key={id} className="border-b border-gray-100">
      <td className="p-4 text-sm font-medium">{order.id}</td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Image
            src={imgUrl || ""}
            width={100}
            height={100}
            className="size-[40px] rounded-full object-cover"
            alt={`${name.slice(0, 4)}-img`}
          />
          <div>
            <div className="text-sm font-medium">{customerName}</div>
            <div className="text-xs text-gray-500">{email}</div>
          </div>
        </div>
      </td>
      <td className="p-4 text-sm">{name}</td>
      <td className="p-4 text-sm font-medium space-x-2">
        <span>{amount}</span>
        <span className="text-gray-500 font-bold"> {currency}</span>
      </td>
      <td className="p-4 text-sm text-gray-500">{date}</td>
      <td className="p-4">
        <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
      </td>
      <td className="p-4">
        <Button variant="ghost" size="icon">
          <MoreVertical size={16} />
        </Button>
      </td>
    </tr>
  );
}

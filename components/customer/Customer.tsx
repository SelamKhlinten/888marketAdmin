import React from "react";
import Image from "next/image";
import { MoreVertical, Pen, Pencil, Trash } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomerType } from "./type";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { format } from "path";
import { formatDate } from "@/lib/utils";
import { useCustomers } from "@/hooks/useCustomers";

interface CustomerComponentProps {
  customer: CustomerType;
  key: number;
  checked?: boolean;
}

export default function Customer({
  customer,
  checked,
}: CustomerComponentProps) {
  const { id, imgUrl, name, createdAt, email, location, spent, status } =
    customer;
  const getStatusColor = (status: boolean) => {
    if (status) {
      return "bg-green-100 text-green-600 hover:bg-green-100";
    }
    return "bg-red-100 text-red-600 hover:bg-red-100";
  };
  const spentFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(spent);
  const createdAtFormatted = formatDate(createdAt);
  const { deleteCustomer } = useCustomers();

  return (
    <tr className="border-b border-gray-100 relative">
      <td className="p-4">
        <Checkbox checked={checked} />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <Image
            src={imgUrl}
            width={100}
            height={100}
            className="size-[40px] rounded-full object-cover"
            alt={`${name.slice(0, 4)}-img`}
          />
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-500">{email}</div>
          </div>
        </div>
      </td>
      <td className="p-4 text-sm">{location}</td>
      <td className="p-4 text-sm font-medium">{spentFormatted}</td>
      <td className="p-4 text-sm text-gray-500">{createdAtFormatted}</td>
      <td className="p-4">
        <Badge className={getStatusColor(status)}>
          {customer.status ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200"
            onClick={() => deleteCustomer(id)}
          >
            <Trash size={16} />
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200"
          >
            <Pencil size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
}

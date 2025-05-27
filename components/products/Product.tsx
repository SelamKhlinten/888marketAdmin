import React from "react";
import Image from "next/image";
import { MoreVertical, Pen, Pencil, Trash } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import ProductTypes from "./type";
import { Badge } from "@/components/ui/badge";

interface ProductComponentProps {
  product: ProductTypes;
  key: number;
  checked?: boolean;
}

export default function Product({ product, checked }: ProductComponentProps) {
  const {
    imgUrls,
    name,
    category,
    subcategory,
    price: { amount, currency },
    stock = 12,
  } = product;

  const categoryName = category?.name ?? "";
  const subcategoryName = subcategory?.name ?? "";
  return (
    <tr className="border-b border-gray-100 relative">
      <td className="p-4">
        <Checkbox checked={checked} />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-10 w-10 overflow-hidden rounded-md">
            <Image
              src={
                imgUrls[0] ||
                "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80"
              }
              alt={name}
              fill
              className="object-cover"
            />
          </div>
          <span className="font-medium">{name}</span>
        </div>
      </td>
      <td className="p-4 text-sm">{categoryName}</td>
      <td className="p-4 text-sm">{subcategoryName}</td>
      <td className="p-4 font-medium">
        <span className="">{amount}</span>
        <span className="text-xs font-bold">{currency.toUpperCase()}</span>
      </td>
      <td className="p-4 text-sm">{stock}</td>
      <td className="p-4">
        <Badge
          className={`${
            stock > 20
              ? "bg-green-100 text-green-600 hover:bg-green-100"
              : stock === 0
              ? "bg-red-100 text-red-600 hover:bg-red-100"
              : "bg-yellow-100 text-yellow-600 hover:bg-yellow-100"
          }`}
        >
          {stock > 20 ? "In stock" : stock === 0 ? "Out of stock" : "Low stock"}
        </Badge>
      </td>
      {/* <td className="p-4">
        <Button variant="ghost" size="icon">
          <MoreVertical size={16} />
        </Button>
        <div className="space-y-2 divide-y-2 flex flex-col gap-2 bg-[#dddddd68] p-10 absolute top-10 right-0 z-40 rounded-lg">
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200"
          >
            <Trash size={16} className="mr-2" />
            <span className="text-sm">Delete</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200"
          >
            <Pencil size={16} className="mr-2" />
            <span className="text-sm">Edit</span>
          </Button>
        </div>
      </td> */}
    </tr>
  );
}

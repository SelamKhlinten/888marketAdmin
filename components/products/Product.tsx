"use clinet";

import React, { useEffect, useState } from "react";
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
  deleteProduct?: (id: number) => void;
  removeFromDeleteList?: (id: number) => void;
}

export default function Product({
  product,
  checked,
  deleteProduct,
  removeFromDeleteList,
}: ProductComponentProps) {
  const {
    id,
    imgUrls,
    name,
    category,
    subcategory,
    price: { amount, currency },
    stock = 12,
  } = product;

  const categoryName = category?.name ?? "";
  const subcategoryName = subcategory?.name ?? "";
  const [checkedState, setCheckedState] = useState(checked || false);

  useEffect(() => {
    setCheckedState((state) => (checked !== undefined ? checked : state));
  }, [checked]);

  return (
    <tr className="border-b border-gray-100 relative">
      <td className="p-4">
        <Checkbox
          checked={checkedState}
          onClick={() => {
            setCheckedState((state) => !state);
            if (checkedState) removeFromDeleteList?.(id);
          }}
        />
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
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200"
            onClick={() => deleteProduct && deleteProduct(id)}
          >
            <Trash size={16} />
            {/* <span className="text-sm">Delete</span> */}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-blue-600 border-blue-200"
          >
            <Pencil size={16} />
            {/* <span className="text-sm">Edit</span> */}
          </Button>
        </div>
      </td>
    </tr>
  );
}

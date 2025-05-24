import React from "react";
import Image from "next/image";
import { MoreVertical } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { CategoryType } from "./type";
import { Badge } from "@/components/ui/badge";

interface CategoryProps {
  category: CategoryType;
  key: string;
  checked?: boolean;
}

export default function Category({ category, checked }: CategoryProps) {
  const { imgUrl, name } = category;
  return (
    <tr className="border-b border-gray-100">
      <td className="p-4">
        <Checkbox className="accent-blue-600" checked={checked} />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-md">
            <Image
              src={
                imgUrl ||
                "https://w7.pngwing.com/pngs/454/1021/png-transparent-consumer-electronics-gadget-advanced-electronics-electronic-component-others-electronics-laptop-electronic-device-thumbnail.png"
              }
              alt={name}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </td>
      <td className="p-4 text-sm">{name}</td>
      <td className="p-4">
        <Button variant="ghost" size="icon">
          <MoreVertical size={16} />
        </Button>
      </td>
    </tr>
  );
}

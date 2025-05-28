import React from "react";
import Image from "next/image";
import { Pencil, Trash } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { CategoryType } from "./type";
import { useCategories } from "@/hooks/useCategories";

interface CategoryProps {
  category: CategoryType;
  key: string;
  checked?: boolean;
}

export default function Category({ category, checked }: CategoryProps) {
  const { deleteCategory } = useCategories();
  const { imgUrl, name, iconUrl, id } = category;
  return (
    <tr className="border-b border-gray-100">
      <td className="p-4">
        <Checkbox className="accent-blue-600" checked={checked} />
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-md">
            <Image
              src={imgUrl || "thumnailUrl"}
              alt={`${name.slice(0, 3)}-thumbnail`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </td>
      <td className="p-4">
        <div className="flex items-center gap-3">
          <div className="relative h-12 w-12 overflow-hidden rounded-md">
            <Image
              src={iconUrl || "iconUrl"}
              alt={`${name.slice(0, 3)}-icon`}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </td>
      <td className="p-4 text-sm">{name}</td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200"
            onClick={() => deleteCategory(id)}
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

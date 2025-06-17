"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Pencil, Trash } from "lucide-react";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import { CustomerType } from "./type";
import { formatDate } from "@/lib/utils";
import { useCustomers } from "@/hooks/useCustomers";
import Modal from "../Modal";

interface CustomerComponentProps {
  customer: CustomerType;
  key: number;
  checked?: boolean;
  removeFromDeleteList?: (id: number) => void;
}

export default function Customer({
  customer,
  checked,
  removeFromDeleteList,
}: CustomerComponentProps) {
  const { id, imgUrl, name, createdAt, email, location, spent, status } =
    customer;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [checkedState, setCheckedState] = useState(checked || false);

  const { deleteCustomer, isDeletingCustomer } = useCustomers();

  useEffect(() => {
    setCheckedState((state) => (checked !== undefined ? checked : state));
  }, [checked]);

  const getStatusColor = (status: boolean) => {
    return status
      ? "bg-green-100 text-green-600 hover:bg-green-100"
      : "bg-red-100 text-red-600 hover:bg-red-100";
  };

  const spentFormatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(spent);

  const createdAtFormatted = formatDate(createdAt);

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
          <Image
            src={imgUrl}
            width={100}
            height={100}
            className="size-[40px] rounded-full object-cover"
            alt={`${name?.slice(0, 4)}-img`}
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
          {status ? "Active" : "Inactive"}
        </Badge>
      </td>
      <td className="p-4">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-red-600 border-red-200"
            onClick={() => setIsModalVisible(true)}
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

      {isModalVisible && (
        <td>
          <Modal
            isVisible={isModalVisible}
            title="Confirm Deletion"
            description="Are you sure you want to delete this customer? This action cannot be undone."
            confirmLable="Delete"
            isLoading={isDeletingCustomer}
            onConfirm={() => deleteCustomer(id)}
            onCancel={() => setIsModalVisible(false)}
          />
        </td>
      )}
    </tr>
  );
}

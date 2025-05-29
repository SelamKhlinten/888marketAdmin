"use client";

import { Filter, Search, Trash2, UsersRound } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/hooks/useCustomers";
import Error from "@/components/Error";
import Empty from "@/components/Empty";
import { useRouter } from "next/navigation";
import Customer from "@/components/customer/Customer";
import { Checkbox } from "@/components/ui/checkbox";
import Modal from "@/components/Modal";
import { useState } from "react";

export default function Customers() {
  const {
    isLoadingCustomers,
    customers,
    isError,
    isDeletingCustomer,
    refetchCustomers,
    deleteCustomers,
  } = useCustomers();

  const [isAllSelected, setIsSelectedAll] = useState<boolean>(false);
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const removeFromDeleteList = (id: number) => {
    setDeleteList((prevList) => prevList.filter((item) => item !== id));
    if (deleteList.length === 1) setIsSelectedAll(false);
  };

  const handleDelete = () => {
    deleteCustomers(deleteList);
    setDeleteList([]);
    setIsModalVisible(false);
    setIsSelectedAll(false);
  };

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Customers</h2>
          <p className="text-gray-500">Manage your customer database</p>
        </div>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={isError || isLoadingCustomers || !customers?.length}
            >
              <Filter size={16} />
              Filter
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-9 h-9 w-[250px] rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isError || isLoadingCustomers || !customers?.length}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200"
              onClick={() => setIsModalVisible(true)}
              disabled={isError || isLoadingCustomers || !customers?.length}
            >
              <Trash2 size={16} className="mr-2" /> Delete
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={isError || isLoadingCustomers || !customers?.length}
            >
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              {!isError && customers?.length ? (
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="w-10 p-4">
                      <Checkbox
                        onClick={() => {
                          setIsSelectedAll((state) => !state);
                          setDeleteList(
                            customers?.map((customer) => customer.id) || []
                          );
                        }}
                        checked={isAllSelected}
                      />
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Customer
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Location
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Spent
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Joined
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Status
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Actions
                    </th>
                  </tr>
                </thead>
              ) : null}

              <tbody>
                {isLoadingCustomers ? (
                  <tr>
                    <td className="px-4 py-10" colSpan={7}>
                      <div className="flex justify-center items-center w-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={8}>
                      <Error
                        description="We encountered an error while fetching customers. Please try again."
                        onRetry={refetchCustomers}
                      />
                    </td>
                  </tr>
                ) : !customers?.length ? (
                  <tr>
                    <td colSpan={8}>
                      <Empty
                        title="No Customer available."
                        icon={
                          <UsersRound size={80} className="text-blue-500" />
                        }
                        description="Currently there are no customers in the system."
                      />
                    </td>
                  </tr>
                ) : (
                  customers?.map((customer: any) => (
                    <Customer
                      key={customer.id}
                      customer={customer}
                      removeFromDeleteList={removeFromDeleteList}
                      checked={isAllSelected}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          title="Confirm Deletion"
          description="Are you sure you want to delete the selected customers?"
          confirmLable="Delete"
          onConfirm={handleDelete}
          onCancel={() => setIsModalVisible(false)}
          isLoading={isDeletingCustomer}
        />
      )}
    </main>
  );
}

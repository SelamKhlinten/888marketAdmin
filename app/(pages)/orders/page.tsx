"use client";
import { CalendarX2, Filter, Search } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useOrders } from "@/hooks/useOrders";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import Order from "@/components/orders/Order";
import OrderType from "@/components/orders/type";

export default function OrderList() {
  const { orders, isLoadingOrders, isError, refetchOrders } = useOrders();
  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Orders</h2>
          <p className="text-gray-500">View and manage customer orders</p>
        </div>
        <Button variant="outline" className="gap-2">
          <Filter size={16} />
          Filter Orders
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-9 h-9 w-[250px] rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isError || isLoadingOrders || !orders?.length}
              />
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            disabled={isError || isLoadingOrders || !orders?.length}
          >
            Export
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              {!isError && orders?.length ? (
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Order ID
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Customer
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Product
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Amount
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Date
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
                {isLoadingOrders ? (
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
                        description="We encountered an error while fetching products. Please try again."
                        onRetry={refetchOrders}
                      />
                    </td>
                  </tr>
                ) : !orders?.length ? (
                  <tr>
                    <td colSpan={8}>
                      <Empty
                        title="No Orders available."
                        icon={
                          <CalendarX2 size={80} className="text-blue-500" />
                        }
                        description="Currently there are no orders available."
                      />
                    </td>
                  </tr>
                ) : (
                  orders?.map((order) => (
                    <Order order={order as OrderType} key={order.id} />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}

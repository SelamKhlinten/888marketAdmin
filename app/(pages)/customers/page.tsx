"use client";
import {
  ArchiveX,
  Filter,
  Search,
  UserPlus,
  UserRoundX,
  UsersRound,
} from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCustomers } from "@/hooks/useCustomers";
import Error from "@/components/Error";
import Empty from "@/components/Empty";
import { useRouter } from "next/navigation";
import Customer from "@/components/customer/Customer";
import { CustomerType } from "@/components/customer/type";
import { Checkbox } from "@/components/ui/checkbox";

export default function Customers() {
  const { isLoadingCustomers, customers, isError, refetchCustomers } =
    useCustomers();
  const router = useRouter();
  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Customers</h2>
          <p className="text-gray-500">Manage your customer database</p>
        </div>
        {/* <Button className="bg-blue-600 hover:bg-blue-700">
          <UserPlus className="mr-2 h-4 w-4" /> Add Customer
        </Button> */}
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="gap-2">
              <Filter size={16} />
              Filter
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search customers..."
                className="pl-9 h-9 w-[250px] rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <Button variant="outline" size="sm">
            Export
          </Button>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100">
                  <th className="w-10 p-4">
                    <Checkbox
                    // onClick={() => setIsSelectedAll((state) => !state)}
                    />
                  </th>
                  <th className="p-4 text-left font-medium text-sm text-gray-500">
                    Customer
                  </th>
                  <th className="p-4 text-left font-medium text-sm text-gray-500">
                    Location
                  </th>
                  {/* <th className="p-4 text-left font-medium text-sm text-gray-500">
                    Orders
                  </th> */}
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
                        description="We encountered an error while fetching products. Please try again."
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
                      customer={customer as CustomerType}
                      // checked={isAllSelected}
                    />
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

/*
 
 {customers.map((customer) => (
                    <tr key={customer.id} className="border-b border-gray-100">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={customer.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {customer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-sm text-gray-500">
                              {customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{customer.location}</td>
                      <td className="p-4 text-sm font-medium">
                        {customer.orders}
                      </td>
                      <td className="p-4 text-sm font-medium">
                        {customer.spent}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {customer.lastOrder}
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(customer.status)}>
                          {customer.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}

 */

import { Bell, ChevronDown, Filter, MoreVertical, Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function OrderList() {
  const orders = [
    {
      id: "#ORD-1234",
      customer: {
        name: "John Doe",
        email: "john@example.com",
        avatar:
          "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      product: "Nike Air Max 270",
      amount: "$120.00",
      date: "May 12, 2025",
      status: "Completed",
    },
    {
      id: "#ORD-1235",
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
        avatar:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      product: "Adidas Ultraboost",
      amount: "$180.00",
      date: "May 11, 2025",
      status: "Processing",
    },
    {
      id: "#ORD-1236",
      customer: {
        name: "Robert Johnson",
        email: "robert@example.com",
        avatar:
          "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      product: "Puma RS-X",
      amount: "$95.00",
      date: "May 10, 2025",
      status: "Shipped",
    },
    {
      id: "#ORD-1237",
      customer: {
        name: "Emily Davis",
        email: "emily@example.com",
        avatar:
          "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      product: "New Balance 990",
      amount: "$175.00",
      date: "May 10, 2025",
      status: "Completed",
    },
    {
      id: "#ORD-1238",
      customer: {
        name: "Michael Wilson",
        email: "michael@example.com",
        avatar:
          "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      product: "Converse Chuck 70",
      amount: "$85.00",
      date: "May 9, 2025",
      status: "Cancelled",
    },
    {
      id: "#ORD-1239",
      customer: {
        name: "Sarah Brown",
        email: "sarah@example.com",
        avatar:
          "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      },
      product: "Vans Old Skool",
      amount: "$65.00",
      date: "May 8, 2025",
      status: "Refunded",
    },
  ];

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
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b border-gray-100">
                      <td className="p-4 text-sm font-medium">{order.id}</td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={order.customer.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {order.customer.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="text-sm font-medium">
                              {order.customer.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {order.customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-sm">{order.product}</td>
                      <td className="p-4 text-sm font-medium">
                        {order.amount}
                      </td>
                      <td className="p-4 text-sm text-gray-500">
                        {order.date}
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(order.status)}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button variant="ghost" size="icon">
                          <MoreVertical size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
  );
}

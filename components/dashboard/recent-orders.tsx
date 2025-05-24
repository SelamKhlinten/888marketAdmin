import { MoreVertical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentOrders() {
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
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-600 hover:bg-green-100"
      case "Processing":
        return "bg-blue-100 text-blue-600 hover:bg-blue-100"
      case "Shipped":
        return "bg-purple-100 text-purple-600 hover:bg-purple-100"
      case "Cancelled":
        return "bg-red-100 text-red-600 hover:bg-red-100"
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-100"
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Recent Orders</CardTitle>
        <button className="text-sm text-blue-600 font-medium">View All</button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="p-3 text-left font-medium text-sm text-gray-500">Order ID</th>
                <th className="p-3 text-left font-medium text-sm text-gray-500">Customer</th>
                <th className="p-3 text-left font-medium text-sm text-gray-500">Product</th>
                <th className="p-3 text-left font-medium text-sm text-gray-500">Amount</th>
                <th className="p-3 text-left font-medium text-sm text-gray-500">Date</th>
                <th className="p-3 text-left font-medium text-sm text-gray-500">Status</th>
                <th className="p-3 text-left font-medium text-sm text-gray-500"></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100">
                  <td className="p-3 text-sm">{order.id}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={order.customer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{order.customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{order.customer.name}</div>
                        <div className="text-xs text-gray-500">{order.customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-3 text-sm">{order.product}</td>
                  <td className="p-3 text-sm font-medium">{order.amount}</td>
                  <td className="p-3 text-sm text-gray-500">{order.date}</td>
                  <td className="p-3">
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </td>
                  <td className="p-3">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}

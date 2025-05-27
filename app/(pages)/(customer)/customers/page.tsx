import {
  Bell,
  ChevronDown,
  Filter,
  MoreVertical,
  Search,
  UserPlus,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Customers() {
  const customers = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      avatar:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      location: "New York, USA",
      orders: 24,
      spent: "$2,890",
      lastOrder: "May 10, 2025",
      status: "Active",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      avatar:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      location: "Los Angeles, USA",
      orders: 18,
      spent: "$1,750",
      lastOrder: "May 8, 2025",
      status: "Active",
    },
    {
      id: 3,
      name: "Robert Johnson",
      email: "robert@example.com",
      avatar:
        "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      location: "Chicago, USA",
      orders: 12,
      spent: "$950",
      lastOrder: "May 5, 2025",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily@example.com",
      avatar:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      location: "Miami, USA",
      orders: 32,
      spent: "$3,200",
      lastOrder: "May 12, 2025",
      status: "Active",
    },
    {
      id: 5,
      name: "Michael Wilson",
      email: "michael@example.com",
      avatar:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      location: "Seattle, USA",
      orders: 8,
      spent: "$680",
      lastOrder: "May 1, 2025",
      status: "Active",
    },
    {
      id: 6,
      name: "Sarah Brown",
      email: "sarah@example.com",
      avatar:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      location: "Boston, USA",
      orders: 15,
      spent: "$1,250",
      lastOrder: "May 7, 2025",
      status: "Inactive",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-600 hover:bg-green-100";
      case "Inactive":
        return "bg-gray-100 text-gray-600 hover:bg-gray-100";
      default:
        return "bg-gray-100 text-gray-600 hover:bg-gray-100";
    }
  };

  return (
      <main className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold mb-1">Customers</h2>
            <p className="text-gray-500">Manage your customer database</p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <UserPlus className="mr-2 h-4 w-4" /> Add Customer
          </Button>
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
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Customer
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Location
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Orders
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Spent
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Last Order
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
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
  );
}

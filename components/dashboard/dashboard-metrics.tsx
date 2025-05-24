import { ArrowDown, ArrowUp, MoreVertical } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function DashboardMetrics() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Sales</CardTitle>
          <MoreVertical size={16} className="text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$34,456.00</div>
          <div className="flex items-center mt-1">
            <Badge className="bg-green-100 text-green-600 hover:bg-green-100 mr-2">
              <ArrowUp className="mr-1 h-3 w-3" />
              14%
            </Badge>
            <span className="text-sm text-gray-500">vs. last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle>
          <MoreVertical size={16} className="text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3,456</div>
          <div className="flex items-center mt-1">
            <Badge className="bg-red-100 text-red-600 hover:bg-red-100 mr-2">
              <ArrowDown className="mr-1 h-3 w-3" />
              17%
            </Badge>
            <span className="text-sm text-gray-500">vs. last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Revenue</CardTitle>
          <MoreVertical size={16} className="text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1,456.00</div>
          <div className="flex items-center mt-1">
            <Badge className="bg-green-100 text-green-600 hover:bg-green-100 mr-2">
              <ArrowUp className="mr-1 h-3 w-3" />
              14%
            </Badge>
            <span className="text-sm text-gray-500">vs. last month</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-gray-500">Total Customers</CardTitle>
          <MoreVertical size={16} className="text-gray-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">42,456</div>
          <div className="flex items-center mt-1">
            <Badge className="bg-red-100 text-red-600 hover:bg-red-100 mr-2">
              <ArrowDown className="mr-1 h-3 w-3" />
              11%
            </Badge>
            <span className="text-sm text-gray-500">vs. last month</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

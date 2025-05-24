import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

export function TopProducts() {
  const products = [
    {
      name: "Nike Air Max 270",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80",
      sales: 432,
      amount: "$51,840",
    },
    {
      name: "Adidas Ultraboost",
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80",
      sales: 327,
      amount: "$58,860",
    },
    {
      name: "Puma RS-X",
      image:
        "https://images.unsplash.com/photo-1608231387042-66d1773070a5?ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80",
      sales: 258,
      amount: "$24,510",
    },
    {
      name: "New Balance 990",
      image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=320&q=80",
      sales: 184,
      amount: "$32,200",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-medium">Top Products</CardTitle>
        <button className="text-sm text-blue-600 font-medium">View All</button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {products.map((product, index) => (
            <div key={index} className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-md">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium">{product.name}</h4>
                <p className="text-xs text-gray-500">{product.sales} sales</p>
              </div>
              <div className="text-sm font-medium">{product.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

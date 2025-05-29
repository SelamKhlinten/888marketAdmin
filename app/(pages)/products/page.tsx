"use client";

import { ArchiveX, Filter, Plus, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import { useProducts } from "@/hooks/useProducts";
import Product from "@/components/products/Product";
import { useRouter } from "next/navigation";
import ProductTypes from "@/components/products/type";
import Error from "@/components/Error";
import Empty from "@/components/Empty";
import Modal from "@/components/Modal";

// Adjust the import path as needed

export default function Products() {
  const {
    products,
    isLoadingProducts,
    isError,
    refetchProducts,
    deleteProducts,
  } = useProducts();
  const router = useRouter();
  const [isAllSelected, setIsSelectedAll] = useState<boolean>(false);
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const removeFromDeleteList = (id: number) => {
    setDeleteList((prevList) => prevList.filter((item) => item !== id));
    if (deleteList.length === 1) setIsSelectedAll(false);
  };

  const handleDelete = () => {
    deleteProducts(deleteList);
    setDeleteList([]);
    setIsModalVisible(false);
    setIsSelectedAll(false);
  };

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Products</h2>
          <p className="text-gray-500">Manage your product inventory</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => router.replace("/products/new")}
        >
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              disabled={isError || isLoadingProducts || !products?.length}
            >
              <Filter size={16} />
              Filter
            </Button>
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                disabled={isError || isLoadingProducts || !products?.length}
                type="text"
                placeholder="Search products..."
                className="pl-9 h-9 w-[250px] rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200"
              onClick={() => setIsModalVisible(true)}
              disabled={isError || isLoadingProducts || !products?.length}
            >
              <Trash2 size={16} className="mr-2" /> Delete
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={isError || isLoadingProducts || !products?.length}
            >
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              {!isError && products?.length ? (
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="w-10 p-4">
                      <Checkbox
                        onClick={() => {
                          setIsSelectedAll((state) => !state);
                          if (!isAllSelected) {
                            setDeleteList(
                              products?.map((product) => product.id) || []
                            );
                          }
                        }}
                        checked={isAllSelected}
                      />
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Product
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Category
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Sub-Category
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Price
                    </th>
                    <th className="p-4 text-left font-medium text-sm text-gray-500">
                      Stock
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
                {isLoadingProducts ? (
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
                        onRetry={refetchProducts}
                      />
                    </td>
                  </tr>
                ) : !products?.length ? (
                  <tr>
                    <td colSpan={8}>
                      <Empty
                        title="No products available."
                        icon={<ArchiveX size={80} className="text-blue-500" />}
                        description="Get started by adding products."
                        action={{
                          label: "Add new Product",
                          onClick: () => router.push("/products/new"),
                        }}
                      />
                    </td>
                  </tr>
                ) : (
                  products?.map((product) => (
                    <Product
                      key={product.id}
                      product={product as ProductTypes}
                      checked={isAllSelected}
                      removeFromDeleteList={removeFromDeleteList}
                    />
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Modal */}
      <Modal
        isVisible={isModalVisible}
        title="Confirm Deletion"
        description="Are you sure you want to delete the selected products? This action cannot be undone."
        confirmLable="Delete"
        onConfirm={handleDelete}
        onCancel={() => setIsModalVisible(false)}
      />
    </main>
  );
}

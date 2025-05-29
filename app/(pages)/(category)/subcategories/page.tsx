"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { ArchiveX, Plus, Search, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { useCategories } from "@/hooks/useCategories";
import Category from "@/components/categories/Category";
import Empty from "@/components/Empty";
import Error from "@/components/Error";
import { CategoryType, SubCategoryType } from "@/components/categories/type";
import Modal from "@/components/Modal";
import { useSubCategories } from "@/hooks/useSubCategories";
import SubCategory from "@/components/categories/SubCategory";

export default function SubCategories() {
  const router = useRouter();
  const {
    subCategories,
    isError,
    isLoadingSubCategories,
    refetchSubCategories,
    deleteSubCateogries,
  } = useSubCategories();
  const [isAllSelected, setIsSelectedAll] = useState<boolean>(false);
  const [deleteList, setDeleteList] = useState<number[]>([]);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const removeFromDeleteList = (id: number) => {
    setDeleteList((prevList) => prevList.filter((item) => item !== id));
    if (deleteList.length === 1) setIsSelectedAll(false);
  };

  const handleDelete = () => {
    deleteSubCateogries(deleteList);
    setDeleteList([]);
    setIsModalVisible(false);
    setIsSelectedAll(false);
  };

  return (
    <main className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-1">Categories</h2>
          <p className="text-gray-500">Manage your product categories.</p>
        </div>
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          onClick={() => router.push("/subcategories/new")}
        >
          <Plus className="mr-2 h-4 w-4 capitalize" /> Create New
        </Button>
      </div>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <input
                type="text"
                placeholder="Search categories..."
                className="pl-9 h-9 w-[250px] rounded-md border border-gray-200 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={
                  isError || isLoadingSubCategories || !subCategories?.length
                }
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 border-red-200"
              onClick={() => setIsModalVisible(true)}
              disabled={
                isError || isLoadingSubCategories || !subCategories?.length
              }
            >
              <Trash2 size={16} className="mr-2" /> Delete
            </Button>
            <Button
              variant="outline"
              size="sm"
              disabled={
                isError || isLoadingSubCategories || !subCategories?.length
              }
            >
              Export
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              {!isError && subCategories?.length ? (
                <thead>
                  {!isError && (
                    <tr className="border-b border-gray-100">
                      <th className="w-10 p-4">
                        <Checkbox
                          onClick={() => {
                            setIsSelectedAll((state) => !state);
                            if (!isAllSelected) {
                              setDeleteList(
                                subCategories?.map(
                                  (subcategory) => subcategory.id
                                ) || []
                              );
                            } else {
                              setDeleteList([]);
                            }
                          }}
                          checked={isAllSelected}
                        />
                      </th>
                      <th className="p-4 text-left font-medium text-sm text-gray-500">
                        Thumbnail
                      </th>
                      <th className="p-4 text-left font-medium text-sm text-gray-500">
                        Name
                      </th>
                      <th className="p-4 text-left font-medium text-sm text-gray-500">
                        Category
                      </th>
                      <th className="p-4 text-left font-medium text-sm text-gray-500">
                        Actions
                      </th>
                    </tr>
                  )}
                </thead>
              ) : null}

              <tbody>
                {isLoadingSubCategories ? (
                  <tr>
                    <td className="px-4 py-10" colSpan={7}>
                      <div className="flex justify-center items-center w-full">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                      </div>
                    </td>
                  </tr>
                ) : isError ? (
                  <tr>
                    <td colSpan={7}>
                      <Error
                        description="We encountered an error while fetching sub-categories. Please try again."
                        onRetry={refetchSubCategories}
                      />
                    </td>
                  </tr>
                ) : !subCategories?.length ? (
                  <tr>
                    <td colSpan={7}>
                      <Empty
                        title="No sub-categories available."
                        icon={<ArchiveX size={80} className="text-blue-500" />}
                        description="Get started by adding a new sub-category."
                        action={{
                          label: "Add new Sub-Category",
                          onClick: () => router.push("/subcategories/new"),
                        }}
                      />
                    </td>
                  </tr>
                ) : (
                  subCategories?.map((subcategory) => (
                    <SubCategory
                      key={subcategory.id}
                      subCategory={subcategory as SubCategoryType}
                      checked={deleteList.includes(subcategory.id)}
                      removeFromDeleteList={removeFromDeleteList}
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
          title="Confirm Delete"
          description="Are you sure you want to delete the selected sub-categories?"
          onConfirm={handleDelete}
          onCancel={() => setIsModalVisible(false)}
        />
      )}
    </main>
  );
}

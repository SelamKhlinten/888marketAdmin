"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Plus, Save, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useCategories } from "@/hooks/useCategories";
import { useSubCategories } from "@/hooks/useSubCategories";
import { useProducts } from "@/hooks/useProducts";
import SubmitButton from "../SubmitButton";
import { useSearchParams } from "next/navigation";
import ProductTypes from "./type";

export default function ProductForm() {
  const {
    products,
    isCreatingProduct,
    isUpdatingProduct,
    createProduct,
    updateProduct,
  } = useProducts();
  const searchParams = useSearchParams();
  const pid = searchParams.get("pid");
  const product = products?.find((p) => p.id === Number(pid));

  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: product,
  });

  const images =
    product?.imgUrls.map((p: ProductTypes) => {
      return { url: p };
    }) || [];

  const [imgs, setImgs] = useState<{ file: File; url: string }[]>(images);
  const file = useRef<HTMLInputElement | null>(null);
  const { categories } = useCategories();
  const { subCategories } = useSubCategories();

  const onSubmit = (formData: any) => {
    pid
      ? updateProduct({ ...formData, imgs })
      : createProduct({ ...formData, imgs });
  };

  return (
    <div className="max-w-7xl p-6 bg-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link
              href={"/products"}
              className="size-10 rounded-full hover:bg-blue-100 grid place-items-center"
            >
              <ArrowLeft className="h-5 w-5 text-gray-700" />
            </Link>
            <div className="flex items-center gap-2">
              <ShoppingBag className="h-5 w-5 text-gray-700" />
              <h1 className="text-xl font-medium text-gray-700">
                {pid ? "Edit Product" : "Add New Product"}
              </h1>
            </div>
          </div>
          <div className="flex gap-4">
            {!pid && (
              <Button variant="outline" className="gap-2 rounded-full">
                <Save className="h-5 w-5" />
                Save Draft
              </Button>
            )}

            <SubmitButton
              isLoading={pid ? isUpdatingProduct : isCreatingProduct}
              label={pid ? "Edit Product" : "Add Product"}
            />
          </div>
        </div>
        {/* main-content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4">General Information</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="productName" className="block mb-2">
                    Product Name
                  </Label>
                  <Input
                    id="productName"
                    className="bg-gray-100 border-0"
                    {...register("name")}
                    placeholder="...Product name"
                  />
                </div>

                <div>
                  <Label htmlFor="productDescription" className="block mb-2">
                    Product Description
                  </Label>
                  <Textarea
                    id="productDescription"
                    className="bg-gray-100 border-0 min-h-[120px]"
                    placeholder="...Description"
                    {...register("description")}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4">Pricing & Stock</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="basePrice" className="block mb-2">
                    Orignal Price
                  </Label>
                  <Input
                    id="basePrice"
                    className="bg-gray-100 border-0"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    placeholder="...amount"
                    {...register("price.orignal")}
                  />
                </div>
                <div>
                  <Label htmlFor="basePrice" className="block mb-2">
                    Discounted Price
                  </Label>
                  <Input
                    id="basePrice"
                    className="bg-gray-100 border-0"
                    type="number"
                    inputMode="decimal"
                    step="0.01"
                    placeholder="...amount"
                    {...register("price.discounted")}
                  />
                </div>

                <div>
                  <Label htmlFor="currency" className="block mb-2">
                    Currency
                  </Label>
                  <Input
                    id="currency"
                    className="bg-gray-100 border-0"
                    type="string"
                    placeholder="...currency"
                    {...register("price.currency")}
                  />
                </div>

                <div>
                  <Label htmlFor="stock" className="block mb-2">
                    Stock
                  </Label>
                  <Input
                    id="stock"
                    defaultValue={300}
                    type="number"
                    className="bg-gray-100 border-0"
                    {...register("stock")}
                  />
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4">Category Information</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 p-6 rounded-lg">
                  {/* <h2 className="text-lg font-medium mb-4">Category</h2> */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="productCategory" className="block mb-2">
                        Product Category
                      </Label>
                      <Controller
                        name="category.name"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              const cat = categories?.find(
                                (c) =>
                                  c.name.toLowerCase() === value.toLowerCase()
                              );
                              field.onChange(value); // <-- sync with react-hook-form
                              setValue("category.id", cat?.id);
                            }}
                          >
                            <SelectTrigger className="bg-gray-100 border-0">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories?.map((cat: any) => (
                                <SelectItem value={cat.name} key={cat.id}>
                                  {cat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>

                    {/* <Button className="w-full gap-2 bg-blue-200 text-blue-800 hover:bg-blue-300">
                    // Add Category
                  </Button> */}
                  </div>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg">
                  {/* <h2 className="text-lg font-medium mb-4">Sub-Category</h2> */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="productCategory" className="block mb-2">
                        Product Sub-Category
                      </Label>

                      <Controller
                        name="subcategory.name"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              const subCat = subCategories?.find(
                                (s) =>
                                  s.name.toLowerCase() === value.toLowerCase()
                              );
                              field.onChange(value); // <-- sync with react-hook-form
                              setValue("subcategory.id", subCat?.id);
                            }}
                          >
                            <SelectTrigger className="bg-gray-100 border-0">
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                              {subCategories?.map((subCat: any) => (
                                <SelectItem value={subCat.name} key={subCat.id}>
                                  {subCat.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-medium mb-4">Upload Image</h2>
              {/* main-image */}
              {imgs?.[0]?.url && (
                <div className="bg-white rounded-lg p-4 mb-4 relative items-center justify-center flex w-fit">
                  <Image
                    width={200}
                    height={200}
                    src={imgs[0].url}
                    alt="Blue puffer jacket"
                    className="object-contain"
                  />
                  <button
                    className="size-[20px] rounded-full border border-black/60 flex justify-center items-center absolute -top-[5px] right-5 text-xs hover:text-blue-500"
                    onClick={(e) => {
                      e.preventDefault();
                      setImgs(imgs.length > 1 ? imgs.slice(1) : []);
                    }}
                  >
                    X
                  </button>
                </div>
              )}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 relative">
                {/* supporting images */}
                {imgs?.slice(1)?.map((sup, i) => (
                  <div
                    className="border border-blue-200 rounded-lg p-2 min-w-[80px] h-[80px] flex items-center justify-center relative"
                    key={i}
                  >
                    <Image
                      width={40}
                      height={40}
                      src={sup.url}
                      alt="Thumbnail 1"
                      className="w-full h-full object-contain"
                    />
                    <button
                      className="size-[20px] rounded-full border border-black/60 flex justify-center items-center absolute top-0 right-0 text-xs hover:text-blue-500"
                      onClick={(e) => {
                        e.preventDefault();
                        const imgsCpy = imgs.map((img) => img);
                        imgsCpy.splice(i + 1, 1);
                        setImgs(imgsCpy);
                      }}
                    >
                      X
                    </button>
                  </div>
                ))}
                <Input
                  hidden={true}
                  type="file"
                  accept="image/*"
                  ref={file}
                  style={{ display: "none" }}
                  onChange={(e) => {
                    const files = Array.from(e.target.files || []).map(
                      (file) => ({ file, url: URL.createObjectURL(file) })
                    );
                    setImgs((prev) => [...prev, ...files]);
                  }}
                />
                <button
                  className="border border-gray-200 rounded-lg p-2 min-w-[80px] h-[80px] flex items-center justify-center bg-gray-50"
                  onClick={(e) => {
                    e.preventDefault();
                    file?.current?.click();
                  }}
                  type="button"
                >
                  <Plus className="h-6 w-6 text-gray-400" />
                </button>
                {/* Fade-out gradient cue for scroll */}
                {/* <div className="pointer-events-none absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-white via-white/80 to-transparent" /> */}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

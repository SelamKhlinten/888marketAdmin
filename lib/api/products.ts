import { uploadImages } from "@/utils/image";
import supabase from "../config/supabase";

interface Product {
  title: string;
  description: string;
  price: string;
  currency: string;
  category: { name: string; parent: number };
  categoryId: number;
  city: { name: string; region: string };
  cityId: number;
}

export const getProducts = async () => {
  try {
    const { data, error } = await supabase.from("products").select(`
      id,
      name,
      price,
      stock,
      img_urls,
      category:categories (
        id,
        name
      ),
      subcategory:subcategories (
        id,
        name
      )
    `);
    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    throw err;
  }
};

export const postProduct = async (product: any) => {
  try {
    const {
      name,
      price,
      stock,
      imgs,
      category: { id: category_id },
      subcategory: { id: subcategory_id },
      description,
    } = product;
    const img_urls = await uploadImages(imgs, "products");
    const { data, error } = await supabase.from("products").insert([
      {
        name,
        price,
        stock,
        img_urls,
        category_id,
        subcategory_id,
        description,
      },
    ]);
    if (error) throw new Error(error.message);
    return data;
  } catch (err: any) {
    console.error(err.message);
  }
};

export const deleteProduct = async (id: string) => {
  try {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw new Error(error?.message);
    return true;
  } catch (err) {
    console.error("Error deleting product:", err);
    return false;
  }
};

export const updateProduct = async (product: any) => {
  try {
    const {
      id,
      name,
      price,
      stock,
      imgs,
      category: { id: category_id },
      subcategory: { id: subcategory_id },
      description,
    } = product;
    const img_urls = await uploadImages(imgs, "products");
    const { data, error } = await supabase
      .from("products")
      .update({
        name,
        price,
        stock,
        img_urls,
        category_id,
        subcategory_id,
        description,
      })
      .eq("id", id);
    if (error) throw new Error(error?.message);
    return data;
  } catch (err) {
    console.error("Error updating product:", err);
    return false;
  }
};

import { uploadImages } from "@/utils/image";
import supabase from "../config/supabase";

export const getCustomers = async () => {
  try {
    const { data, error } = await supabase.from("customers").select(`
      id,
      name,
      location,
      orders,
      status,
    `);

    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error fetching customers:", err);
    return [];
  }
};

export const createCustomer = async (product: any) => {
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

export const deleteCustomer = async (id: string) => {
  try {
    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) throw new Error(error?.message);
    return true;
  } catch (err) {
    console.error("Error deleting product:", err);
    return false;
  }
};

export const updateCustomer = async (product: any) => {
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
    const img_urls = await uploadImages(imgs, "customers");
    const { data, error } = await supabase
      .from("customers")
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

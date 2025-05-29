import { deleteImage, uploadImages } from "@/utils/image";
import supabase from "../config/supabase";

export const getCustomers = async () => {
  try {
    const { data, error } = await supabase.from("customers").select(`*`);

    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error fetching customers:", err);
    throw err;
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
    throw err;
  }
};

export const deleteCustomer = async (id: number) => {
  try {
    const { data, error: fetchError } = await supabase
      .from("customers")
      .select("img_url")
      .eq("id", id)
      .single();
    if (fetchError) throw new Error(fetchError?.message);
    const imgUrl = data?.img_url;
    if (imgUrl) await deleteImage(imgUrl, "customers");

    const { error } = await supabase.from("customers").delete().eq("id", id);
    if (error) throw new Error(error?.message);
    return true;
  } catch (err) {
    console.error("Error deleting customer:", err);
    throw err;
  }
};

export const deleteMultipleCustomers = async (ids: number[]) => {
  try {
    // Fetch image URLs of the customers
    const { data, error: fetchError } = await supabase
      .from("customers")
      .select("img_url")
      .in("id", ids);

    if (fetchError) throw new Error(fetchError.message);

    // Delete associated images (each is a single URL)
    for (const customer of data || []) {
      const url = customer.img_url;
      if (url) {
        await deleteImage(url, "customers");
      }
    }

    // Delete customers from the table
    const { data: deletedCustomers, error } = await supabase
      .from("customers")
      .delete()
      .in("id", ids)
      .select();

    if (error) throw new Error(error.message);

    return deletedCustomers;
  } catch (err) {
    console.error("Error deleting multiple customers:", err);
    throw err;
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
    throw err;
  }
};

import { uploadImage } from "@/utils/image";
import supabase from "../config/supabase";

export const getCategories = async () => {
  try {
    const { data, error } = await supabase.from("categories").select(`
      id,
      name,
      img_url
    `);
    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

export const postCategory = async (category: any) => {
  try {
    const { name, img } = category;
    console.log(name, img);
    const img_url = await uploadImage(img, "categories");
    console.log(img_url);
    const { data, error } = await supabase
      .from("categories")
      .insert([{ name, img_url }])
      .select();

    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error creating category:", err);
    return null;
  }
};

export const deleteCategory = async (id: string) => {
  try {
    const { error } = await supabase.from("categories").delete().eq("id", id);

    if (error) throw new Error(error?.message);

    return true;
  } catch (err) {
    console.error("Error deleting category:", err);
    return false;
  }
};

export const updateCategory = async (category: any) => {
  try {
    const { id, name, img } = category;
    const img_url = await uploadImage(img, "categories");
    const { data, error } = await supabase
      .from("categories")
      .update({ name, img_url })
      .eq("id", id);

    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error updating category:", err);
    return null;
  }
};

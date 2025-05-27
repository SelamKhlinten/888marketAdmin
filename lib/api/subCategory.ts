import { uploadImage } from "@/utils/image";
import supabase from "../config/supabase";

export const getSubCategories = async () => {
  try {
    const { data, error } = await supabase.from("subcategories").select(`
      id,
      name,
      img_url,
      category:categories ( 
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

export const postSubCategory = async (subCategory: any) => {
  try {
    const { name, img, category_id } = subCategory;
    const img_url = await uploadImage(img, "subcategories");
    const { data, error } = await supabase
      .from("subcategories")
      .insert([{ name, img_url, category_id }])
      .select();

    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error creating category:", err);
    return err;
  }
};

export const deleteSubCategory = async (id: string) => {
  try {
    const { error } = await supabase
      .from("subcategories")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error?.message);

    return true;
  } catch (err) {
    console.error("Error deleting category:", err);
    return err;
  }
};

export const updateSubCategory = async (subCategory: any) => {
  try {
    const { id, name, img, category_id } = subCategory;
    const img_url = await uploadImage(img, "subcategories");
    const { data, error } = await supabase
      .from("subcategories")
      .update({ name, img_url, category_id })
      .eq("id", id)
      .select();

    if (error) throw new Error(error?.message);

    return data;
  } catch (err) {
    console.error("Error updating category:", err);
    return err;
  }
};

import { deleteImage, uploadImages } from "@/utils/image";
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
      description,
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
    throw err;
  }
};

export const deleteProduct = async (id: number) => {
  try {
    const { data, error: fetchError } = await supabase
      .from("products")
      .select("img_urls")
      .eq("id", id)
      .single();
    if (fetchError) throw new Error(fetchError?.message);
    const imgUrls = data?.img_urls || [];
    if (imgUrls.length) {
      for (const url of imgUrls) {
        await deleteImage(url, "products");
      }
    }
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) throw new Error(error?.message);
    return true;
  } catch (err) {
    console.error("Error deleting product:", err);
    throw err;
  }
};

export const deleteMultipleProducts = async (ids: number[]) => {
  try {
    const { data, error: fetchError } = await supabase
      .from("products")
      .select("img_urls")
      .in("id", ids);
    if (fetchError) throw new Error(fetchError?.message);

    for (const product of data || []) {
      const imgUrls = product.img_urls || [];
      if (imgUrls.length) {
        for (const url of imgUrls) {
          await deleteImage(url, "products");
        }
      }
    }

    const { data: deletedProducts, error } = await supabase
      .from("products")
      .delete()
      .in("id", ids)
      .select();
    if (error) throw new Error(error?.message);
    return deletedProducts;
  } catch (err) {
    console.error("Error deleting multiple products:", err);
    throw err;
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
      imgUrls,
      category: { id: category_id },
      subcategory: { id: subcategory_id },
      description,
    } = product;
    // console.log(product);
    // console.log(imgUrls);
    // console.log(imgs);

    const toBeDeleted = imgUrls.filter((url: string) => {
      const del = imgs.some((img: any) => img.url === url);
      return !del;
    });
    await Promise.all(
      toBeDeleted.map((url: string) => deleteImage(url, "products"))
    );
    const imgsToUpload = imgs.filter((img: any) =>
      Object.keys(img).includes("file")
    );
    console.log("Images to upload:", imgsToUpload);

    const img_urls = await uploadImages(imgsToUpload, "products");
    console.log(img_urls);
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
    throw err;
  }
};

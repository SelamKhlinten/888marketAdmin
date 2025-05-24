import { getProducts, postProduct } from "@/lib/api/products";
import camelCase from "@/utils/camelCase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useProducts() {
  const queryClient = useQueryClient();

  const { mutate: createProduct, isPending: isCreatingProduct } = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product succesfully created.");
    },
    onError: (err: any) => {
      console.error("Login Error:", err?.message || "Unknown Error");
      toast.error("An error occured while trying to create the product.");
    },
  });

  const {
    isLoading: isLoadingProducts,
    data,
    isError,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const products = data?.map((product: any) => {
    return camelCase(product);
  });

  return {
    createProduct,
    isLoadingProducts,
    isCreatingProduct,
    products,
    isError,
  };
}

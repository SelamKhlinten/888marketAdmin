import {
  getProducts,
  postProduct,
  deleteProduct as removeProduct,
} from "@/lib/api/products";
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

  const { mutate: deleteProduct, isPending: isDeletingProduct } = useMutation({
    mutationFn: removeProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product succesfully deleted.");
    },
    onError: (err: any) => {
      console.error("Login Error:", err?.message || "Unknown Error");
      toast.error("An error occured while trying to delete the product.");
    },
  });

  const {
    isLoading: isLoadingProducts,
    data,
    isError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
  const products = data?.map((product: any) => {
    return camelCase(product);
  });

  return {
    createProduct,
    refetchProducts,
    deleteProduct,
    isLoadingProducts,
    isCreatingProduct,
    products,
    isError,
  };
}

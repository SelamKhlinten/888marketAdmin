import {
  deleteMultipleProducts,
  getProducts,
  postProduct,
  deleteProduct as removeProduct,
} from "@/lib/api/products";
import camelCase from "@/utils/camelCase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export function useProducts() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: createProduct, isPending: isCreatingProduct } = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      router.push("/products");
      toast.success("Product succesfully created.");
    },
    onError: (err: any) => {
      console.error("Login Error:", err?.message || "Unknown Error");
      toast.error("An error occured while trying to create the product.");
    },
  });

  const { mutate: deleteProduct, isPending: isDeletingProduct } = useMutation({
    mutationFn: removeProduct,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(`"Product succesfully deleted."`);
    },
    onError: (err: any) => {
      console.error("Login Error:", err?.message || "Unknown Error");
      toast.error("An error occured while trying to delete the product.");
    },
  });

  const { mutate: deleteProducts, isPending: isDeletingProducts } = useMutation(
    {
      mutationFn: deleteMultipleProducts,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success(`${data?.length} Products succesfully deleted.`);
      },
      onError: (err: any) => {
        console.error("Login Error:", err?.message || "Unknown Error");
        toast.error("An error occured while trying to delete the products.");
      },
    }
  );
  const { mutate: updateProduct, isPending: isUpdating } = useMutation({
    mutationFn: deleteMultipleProducts,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success(`${data?.length} Products succesfully deleted.`);
    },
    onError: (err: any) => {
      console.error("Login Error:", err?.message || "Unknown Error");
      toast.error("An error occured while trying to delete the products.");
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
    deleteProducts,
    updateProduct,
    isUpdating,
    isDeletingProducts,
    isDeletingProduct,
    isLoadingProducts,
    isCreatingProduct,
    products,
    isError,
  };
}

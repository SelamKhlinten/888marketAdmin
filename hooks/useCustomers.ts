import { getProducts, postProduct } from "@/lib/api/products";
import camelCase from "@/utils/camelCase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createCustomer as crCustomer } from "@/lib/api/customer";

export function useCustomers() {
  const queryClient = useQueryClient();

  const { mutate: createCustomer, isPending: isCreatingCustomer } = useMutation(
    {
      mutationFn: crCustomer,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product succesfully created.");
      },
      onError: (err: any) => {
        console.error("Login Error:", err?.message || "Unknown Error");
        toast.error("An error occured while trying to create the product.");
      },
    }
  );

  const { mutate: deleteCustomer, isPending: isDeletingCustomer } = useMutation(
    {
      mutationFn: postProduct,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        toast.success("Product succesfully created.");
      },
      onError: (err: any) => {
        console.error("Login Error:", err?.message || "Unknown Error");
        toast.error("An error occured while trying to create the product.");
      },
    }
  );

  const {
    isLoading: isLoadingCustomers,
    data,
    isError,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getProducts,
  });
  const customers = data?.map((product: any) => {
    return camelCase(product);
  });

  return {
    createCustomer,
    deleteCustomer,
    isLoadingCustomers,
    isCreatingCustomer,
    isDeletingCustomer,
    customers,
    isError,
  };
}

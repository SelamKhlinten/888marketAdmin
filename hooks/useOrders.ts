import { getProducts, postProduct } from "@/lib/api/products";
import camelCase from "@/utils/camelCase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// to avoid naming conflict
import {
  createOrder as crOrder,
  deleteOrder as removeOrder,
} from "@/lib/api/order";

export function useOrders() {
  const queryClient = useQueryClient();

  const { mutate: createCustomer, isPending: isCreatingOrder } = useMutation({
    mutationFn: crOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product succesfully created.");
    },
    onError: (err: any) => {
      console.error("Login Error:", err?.message || "Unknown Error");
      toast.error("An error occured while trying to create the product.");
    },
  });

  const { mutate: deleteOrder, isPending: isDeletingOrder } = useMutation({
    mutationFn: removeOrder,
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
    isLoading: isLoadingOrders,
    data,
    isError,
  } = useQuery({
    queryKey: ["orders"],
    queryFn: getProducts,
  });
  const orders = data?.map((product: any) => {
    return camelCase(product);
  });

  return {
    createCustomer,
    deleteOrder,
    isLoadingOrders,
    isCreatingOrder,
    isDeletingOrder,
    orders,
    isError,
  };
}

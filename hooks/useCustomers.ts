import camelCase from "@/utils/camelCase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createCustomer as crCustomer,
  deleteMultipleCustomers,
  getCustomers,
  deleteCustomer as removeCustomer,
} from "@/lib/api/customer";

export function useCustomers() {
  const queryClient = useQueryClient();

  const { mutate: createCustomer, isPending: isCreatingCustomer } = useMutation(
    {
      mutationFn: crCustomer,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["customers"] });
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
      mutationFn: removeCustomer,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        toast.success("Customer removed succesfully.");
      },
      onError: (err: any) => {
        console.error("Login Error:", err?.message || "Unknown Error");
        toast.error("An error occured while trying to delete customer.");
      },
    }
  );
  const { mutate: deleteCustomers, isPending: isDeletingCustomers } =
    useMutation({
      mutationFn: deleteMultipleCustomers,
      onSuccess: (data: any[]) => {
        queryClient.invalidateQueries({ queryKey: ["customers"] });
        toast.success(`${data?.length ?? 0} Customers successfully deleted.`);
      },
      onError: (err: any) => {
        console.error("Bulk Delete Error:", err?.message || "Unknown Error");
        toast.error("An error occurred while deleting multiple customers.");
      },
    });
  const {
    isLoading: isLoadingCustomers,
    data,
    isError,
    refetch: refetchCustomers,
  } = useQuery({
    queryKey: ["customers"],
    queryFn: getCustomers,
  });
  const customers = data?.map((customer: any) => {
    return camelCase(customer);
  });

  return {
    createCustomer,
    deleteCustomer,
    refetchCustomers,
    deleteCustomers,
    isDeletingCustomers,
    isLoadingCustomers,
    isCreatingCustomer,
    isDeletingCustomer,
    customers,
    isError,
  };
}

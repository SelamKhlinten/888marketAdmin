import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  getCategories,
  postCategory,
  deleteCategory as removeCategories,
} from "@/lib/api/category";
import camelCase from "@/utils/camelCase";

export function useCategories() {
  const queryClient = useQueryClient();

  const { mutate: createCagetory, isPending: isCreatingCategory } = useMutation(
    {
      mutationFn: postCategory,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["categories"] });

        toast.success("Category created successfully");
      },
      onError: (err: any) => {
        console.error("Login Error:", err?.message || "Unknown Error");
        toast.error("Error creating category");
      },
    }
  );

  const {
    isLoading: isLoadingCategories,
    data,
    isError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
  const categories = data?.map((category: any) => {
    return camelCase(category);
  });

  const { mutate: deleteCategory } = useMutation({
    mutationFn: removeCategories,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      toast.success("Product succesfully deleted.");
    },
    onError: (err: any) => {
      console.error("Login Error:", err?.message || "Unknown Error");
      toast.error("An error occured while trying to delete the product.");
    },
  });

  return {
    isLoadingCategories,
    categories,
    isError,
    isCreatingCategory,
    createCagetory,
    refetchCategories,
    deleteCategory,
  };
}

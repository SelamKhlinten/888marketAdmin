import { getSubCategories, postSubCategory } from "@/lib/api/subCategory";
import camelCase from "@/utils/camelCase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useSubCategories() {
  const queryClient = useQueryClient();

  const { mutate: createSubCat, isPending: isCreatingSubCat } = useMutation({
    mutationFn: postSubCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
      queryClient.invalidateQueries({ queryKey: ["sub-categories"] });
      toast.success("SubCategory created successfully");
    },
    onError: (err: any) => {
      console.error("Login Error:", err?.message || "Unknown Error");
      toast.error("Error creating subcategory");
    },
  });

  const {
    isLoading: isLoadingSubCategories,
    data,
    isError,
    refetch: refetchSubCategories,
  } = useQuery({
    queryKey: ["sub-categories"],
    queryFn: getSubCategories,
  });
  const subCategories = data?.map((subCategory: any) => {
    return camelCase(subCategory);
  });

  return {
    isLoadingSubCategories,
    subCategories,
    isError,
    isCreatingSubCat,
    createSubCat,
    refetchSubCategories,
  };
}
